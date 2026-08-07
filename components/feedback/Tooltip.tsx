import * as React from 'react';
import { createPortal } from 'react-dom';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipOwnProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  side?: TooltipSide;
  /** Keyboard hint rendered as a <kbd> chip. */
  shortcut?: string;
  style?: React.CSSProperties;
}

export interface TooltipProps
  extends TooltipOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof TooltipOwnProps> {}

/** 8px between the trigger and the tip, on whichever side it opens. */
const GAP = 8;

/**
 * Dark label on hover/focus. Wrap the trigger; nothing renders until hovered.
 *
 * The tip is portalled to the body rather than positioned inside the trigger.
 * It used to be absolutely positioned, which works right up until a trigger
 * sits inside something that scrolls — a scroll container clips on both axes,
 * so the app rail, 72px wide and `overflow-y: auto` so its foot stays reachable
 * on a short window, cut every one of its tooltips down to the ~9px that fitted.
 * They had been that way unnoticed for as long as the rail has scrolled: the tip
 * is dark, and so was the rail, so the sliver did not show until the rail wasn't.
 */
export function Tooltip({ children, label, side = 'top', shortcut, style, ...rest }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const [box, setBox] = React.useState<DOMRect | null>(null);

  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const measure = () => {
      const el = anchorRef.current;
      if (el) setBox(el.getBoundingClientRect());
    };
    measure();
    // Capture, so a scroll of the container the trigger sits in counts, not just
    // the window's — which is the case this exists for.
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open]);

  /** Fixed coordinates off the trigger, since the tip no longer shares its box. */
  const place = (r: DOMRect): React.CSSProperties => ({
    top: {
      top: r.top - GAP, left: r.left + r.width / 2, transform: 'translate(-50%,-100%)',
    },
    bottom: {
      top: r.bottom + GAP, left: r.left + r.width / 2, transform: 'translate(-50%,0)',
    },
    left: {
      top: r.top + r.height / 2, left: r.left - GAP, transform: 'translate(-100%,-50%)',
    },
    right: {
      top: r.top + r.height / 2, left: r.right + GAP, transform: 'translate(0,-50%)',
    },
  }[side]);

  const tip = box && (
    <span
      role="tooltip"
      // A tooltip stays dark on a light page — that is the convention. Declaring
      // it a dark island is what makes that safe: the surface and the label
      // resolve against each other instead of pairing an ink background with the
      // light scope's dark text. It is also why --surface-rail still reads as ink
      // here now that the light scope's rail is paper.
      data-theme="dark"
      style={{
        position: 'fixed', ...place(box), zIndex: 50, whiteSpace: 'nowrap', pointerEvents: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px',
        background: 'var(--surface-rail)', color: 'var(--text-strong)', borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)',
        fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], animation: 'lt-tip var(--dur-fast) var(--ease-out)',
      }}
    >
      <style>{'@keyframes lt-tip{from{opacity:0}to{opacity:1}}'}</style>
      {label}
      {shortcut && (
        <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', color: 'var(--text-muted)', background: 'var(--surface-raised)', borderRadius: 'var(--radius-xs)', padding: '1px 4px' }}>
          {shortcut}
        </kbd>
      )}
    </span>
  );

  return (
    <span
      ref={anchorRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      {open && tip && createPortal(tip, document.body)}
    </span>
  );
}
