import * as React from 'react';
import { createPortal } from 'react-dom';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipOwnProps {
  children?: React.ReactNode;
  /**
   * Where it opens, when there is room. When there is not it takes the opposite
   * side rather than opening off the screen — see the note on the component.
   */
  side?: TooltipSide;
  label?: React.ReactNode;
  /** Keyboard hint rendered as a <kbd> chip. */
  shortcut?: string;
  style?: React.CSSProperties;
}

export interface TooltipProps
  extends TooltipOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof TooltipOwnProps> {}

/** Between the trigger and the tip, on whichever side it ends up. */
const GAP = 8;
/** Closest the tip may sit to the edge of the viewport. */
const MARGIN = 8;

const OPPOSITE: Record<TooltipSide, TooltipSide> = {
  top: 'bottom', bottom: 'top', left: 'right', right: 'left',
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * Dark label on hover/focus. Wrap the trigger; nothing renders until hovered.
 *
 * Portalled to the body rather than positioned inside the trigger. Absolute
 * positioning works right up until a trigger sits in something that scrolls: a
 * scroll container clips on both axes, and the app rail is 72px wide and
 * `overflow-y: auto` so its foot stays reachable, so it cut every one of its
 * tooltips down to the sliver that fitted.
 *
 * `side` is a preference, not an instruction. A control in a 48px top bar asking
 * for `top` has nowhere to put one — the tip would open above the top of the
 * window — so it takes `bottom` instead. Along the other axis it is clamped into
 * the viewport, which is what keeps a tooltip on a control near the right edge
 * from running off it. A tooltip that cannot be read is the same as no tooltip,
 * and worse than one slightly off-centre.
 */
export function Tooltip({ children, label, side = 'top', shortcut, style, ...rest }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const tipRef = React.useRef<HTMLSpanElement>(null);
  const [box, setBox] = React.useState<DOMRect | null>(null);
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null);

  React.useLayoutEffect(() => {
    if (!open) { setBox(null); setSize(null); return undefined; }
    const measure = () => {
      const el = anchorRef.current;
      if (el) setBox(el.getBoundingClientRect());
    };
    measure();
    // Capture, so a scroll of the container the trigger sits in counts and not
    // just the window's — which is the case the portal exists for.
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open]);

  // The tip's own size, which decides whether the preferred side has room. It is
  // rendered hidden for one frame to be measured; `whiteSpace: nowrap` means the
  // size does not depend on where it ends up, so measuring once is enough.
  React.useLayoutEffect(() => {
    if (!open) return;
    const el = tipRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSize((prev) => (prev && prev.w === r.width && prev.h === r.height ? prev : { w: r.width, h: r.height }));
  }, [open, box, label, shortcut]);

  const placed = React.useMemo(() => {
    if (!box || !size) return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fits: Record<TooltipSide, boolean> = {
      top: box.top - GAP - size.h >= MARGIN,
      bottom: box.bottom + GAP + size.h <= vh - MARGIN,
      left: box.left - GAP - size.w >= MARGIN,
      right: box.right + GAP + size.w <= vw - MARGIN,
    };
    // The preferred side, or its opposite when the preferred one has no room.
    // If neither fits it stays on the preferred one and the clamp below keeps it
    // on screen, overlapping the trigger rather than disappearing past an edge.
    const s = fits[side] || !fits[OPPOSITE[side]] ? side : OPPOSITE[side];

    if (s === 'top' || s === 'bottom') {
      return {
        left: clamp(box.left + box.width / 2 - size.w / 2, MARGIN, Math.max(MARGIN, vw - MARGIN - size.w)),
        top: s === 'top' ? box.top - GAP - size.h : box.bottom + GAP,
      };
    }
    return {
      left: s === 'left' ? box.left - GAP - size.w : box.right + GAP,
      top: clamp(box.top + box.height / 2 - size.h / 2, MARGIN, Math.max(MARGIN, vh - MARGIN - size.h)),
    };
  }, [box, size, side]);

  const tip = (
    <span
      ref={tipRef}
      role="tooltip"
      // A tooltip stays dark on a light page — that is the convention. Declaring
      // it a dark island is what makes that safe: the surface and the label
      // resolve against each other instead of pairing an ink background with the
      // light scope's dark text. It is also why --surface-rail still reads as ink
      // here now that the light scope's rail is paper.
      data-theme="dark"
      style={{
        position: 'fixed',
        left: placed ? placed.left : 0,
        top: placed ? placed.top : 0,
        // Hidden rather than unmounted for the frame it takes to measure itself,
        // so it is never seen at the corner it was measured in.
        visibility: placed ? 'visible' : 'hidden',
        zIndex: 50, whiteSpace: 'nowrap', pointerEvents: 'none',
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
      {open && createPortal(tip, document.body)}
    </span>
  );
}
