import * as React from 'react';
import { createPortal } from 'react-dom';

export interface SelectOption { value: string; label: string }

export interface SelectProps {
  value?: string;
  /** Strings or {value,label} pairs. */
  options?: (string | SelectOption)[];
  label?: string;
  /** Shown when `value` matches no option — an unset select rather than a blank one. */
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  block?: boolean;
  /**
   * The chosen value, not an event. There is no `<select>` under this any more,
   * so a `ChangeEvent<HTMLSelectElement>` would have been a shape invented to
   * look like something that is not there.
   */
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

const GAP = 6;
const MARGIN = 8;
const MAX_MENU_H = 280;

/** How long a run of keystrokes counts as one word for type-ahead. */
const TYPEAHEAD_MS = 600;

/**
 * A listbox we draw ourselves, in place of the native control.
 *
 * The native `<select>` could be styled down to its well and chevron but never
 * past them: the popup itself belongs to the OS, so it arrived in the system
 * font at the system size with the system highlight, ignoring every token in
 * here. On one screen the closed control matched the app and the open one did
 * not, which is the one moment anybody is actually looking at it.
 *
 * What that costs, and it is a real cost: on a phone the native control opens
 * the platform's own picker — the iOS wheel — which is a better thing to use
 * with a thumb than a list of 44px rows, and it comes with the platform's
 * scrolling, dismissal and accessibility behaviour for free. This trades that
 * away for consistency. If a long list ever turns up on mobile, rendering the
 * native element below some breakpoint is the escape hatch, and the props here
 * are deliberately a subset of what `<select>` takes so that stays possible.
 *
 * Focus does not move into the list. The trigger keeps it and points at the
 * active row with `aria-activedescendant`, which is what lets Escape and Tab
 * behave — there is no focus to restore because none was taken.
 */
export function Select({
  value,
  options = [],
  label,
  placeholder = 'Select…',
  size = 'md',
  disabled = false,
  block = true,
  onChange,
  style,
}: SelectProps) {
  const items = React.useMemo(
    () => options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)),
    [options],
  );

  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [box, setBox] = React.useState<DOMRect | null>(null);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const typed = React.useRef<{ text: string; at: number }>({ text: '', at: 0 });

  const uid = React.useId();
  const listId = `${uid}-list`;
  const labelId = `${uid}-label`;

  const selected = items.findIndex((o) => o.value === value);
  const height = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  const fontSize = size === 'sm' ? 'var(--fs-13)' : 'var(--fs-14)';

  // Where the trigger is, tracked while the menu is up. Capture on the scroll
  // listener for the same reason Tooltip needs it: the thing that moves is
  // usually a scrolling panel the trigger sits in, not the window.
  React.useLayoutEffect(() => {
    if (!open) { setBox(null); return undefined; }
    const measure = () => {
      const el = triggerRef.current;
      if (el) setBox(el.getBoundingClientRect());
    };
    measure();
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open]);

  // Anywhere else closes it. pointerdown rather than click, so it goes away on
  // the press instead of waiting for a release that may land somewhere else.
  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [open]);

  // Keep the active row in view — including when the menu first opens on a
  // selection far down a long list.
  React.useLayoutEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, active, box]);

  const commit = (i: number) => {
    const opt = items[i];
    setOpen(false);
    triggerRef.current?.focus();
    if (opt && opt.value !== value) onChange?.(opt.value);
  };

  const openWith = (i: number) => {
    setActive(Math.max(0, Math.min(items.length - 1, i)));
    setOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || items.length === 0) return;

    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWith(selected >= 0 ? selected : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        // Or the dialog this select is sitting in would close along with it.
        e.stopPropagation();
        setOpen(false);
        return;
      case 'Tab':
        // Let focus move — but do not leave a menu hanging over the page.
        setOpen(false);
        return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commit(active);
        return;
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => Math.min(items.length - 1, i + 1));
        return;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        return;
      case 'Home':
        e.preventDefault();
        setActive(0);
        return;
      case 'End':
        e.preventDefault();
        setActive(items.length - 1);
        return;
      default:
        break;
    }

    // Type-ahead. The native control does this and people use it without
    // knowing they do — typing "du" in a language list should land on Dutch.
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = e.timeStamp;
      const text = now - typed.current.at < TYPEAHEAD_MS ? typed.current.text + e.key : e.key;
      typed.current = { text, at: now };
      const hit = items.findIndex((o) => o.label.toLowerCase().startsWith(text.toLowerCase()));
      if (hit >= 0) { e.preventDefault(); setActive(hit); }
    }
  };

  // Below the trigger, or above it when below has no room and above has more.
  // Height is capped to whatever side it lands on, so a list near an edge
  // scrolls rather than running off the screen.
  const placed = React.useMemo(() => {
    if (!box) return null;
    const vh = window.innerHeight;
    const below = vh - box.bottom - GAP - MARGIN;
    const above = box.top - GAP - MARGIN;
    const up = below < Math.min(MAX_MENU_H, above) && above > below;
    return {
      left: Math.max(MARGIN, Math.min(box.left, window.innerWidth - MARGIN - box.width)),
      top: up ? undefined : box.bottom + GAP,
      bottom: up ? vh - box.top + GAP : undefined,
      width: box.width,
      maxHeight: Math.max(96, Math.min(MAX_MENU_H, up ? above : below)),
    };
  }, [box]);

  const menu = placed && (
    <div
      ref={listRef}
      id={listId}
      role="listbox"
      aria-labelledby={label ? labelId : undefined}
      style={{
        position: 'fixed',
        left: placed.left,
        top: placed.top,
        bottom: placed.bottom,
        width: placed.width,
        maxHeight: placed.maxHeight,
        overflowY: 'auto',
        padding: 'var(--space-2)',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'inset 0 0 0 1px var(--border), var(--shadow-xl)',
        // Above a dialog's scrim at 48, since selects are used inside dialogs,
        // and below tooltips at 50.
        zIndex: 49,
        animation: 'lt-select-in var(--dur-fast) var(--ease-out)',
      }}
    >
      <style>{'@keyframes lt-select-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}'}</style>
      {items.map((o, i) => {
        const isSelected = i === selected;
        const isActive = i === active;
        return (
          <div
            key={o.value}
            id={`${listId}-${i}`}
            data-i={i}
            role="option"
            aria-selected={isSelected}
            // Pointer, not mouse: the same handler then covers a finger.
            onPointerEnter={() => setActive(i)}
            onClick={() => commit(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              height: 'var(--control-h-sm)', padding: '0 var(--space-4)',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              fontFamily: 'var(--font-ui)', fontSize,
              fontWeight: isSelected
                ? ('var(--fw-black)' as React.CSSProperties['fontWeight'])
                : ('var(--fw-semibold)' as React.CSSProperties['fontWeight']),
              color: isSelected ? 'var(--text-strong)' : 'var(--text-body)',
              /*
               * The brand tint, not --surface-hover.
               *
               * Hover was 4% black on white — invisible, which is survivable
               * for a pointer because the cursor is already telling you where
               * you are, and not survivable for the keyboard, where this
               * highlight is the only thing saying which row Enter will take.
               * --surface-selected is what the sidebar uses to mean "this is
               * the row in question", so it is the same idea in the same paint.
               */
              background: isActive ? 'var(--surface-selected)' : 'transparent',
            }}
          >
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {o.label}
            </span>
            {/* A tick rather than a coloured row: which one is selected and
                which one the keyboard is on are different questions, and the
                highlight is already answering the second. */}
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', color: 'var(--brand)' }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: block ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 'var(--space-3)', width: block ? '100%' : undefined }}>
      {label && (
        <span id={labelId} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={label ? labelId : undefined}
        // On the focused element, which is this button — the list never takes
        // focus. Putting it on the listbox instead, as this first did, points
        // at the active row from an element no screen reader is looking at.
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled}
        // This paints its own focus treatment; without this the global
        // :focus-visible ring draws a second one inside it.
        data-focus-ring="delegated"
        onClick={() => (open ? setOpen(false) : openWith(selected >= 0 ? selected : 0))}
        onKeyDown={onKeyDown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          width: '100%', height, padding: '0 10px 0 12px', border: 'none', outline: 'none',
          textAlign: 'left', cursor: disabled ? 'not-allowed' : 'pointer',
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: focus || open ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          opacity: disabled ? 0.5 : 1, transition: 'var(--transition-control)',
          fontFamily: 'var(--font-ui)', fontSize,
          fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'],
          color: selected >= 0 ? 'var(--text-strong)' : 'var(--text-muted)',
          ...style,
        }}
      >
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected >= 0 ? items[selected].label : placeholder}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            flex: 'none', color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--dur-fast) var(--ease-out)',
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && typeof document !== 'undefined' && createPortal(menu, document.body)}
    </div>
  );
}
