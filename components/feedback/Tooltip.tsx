import * as React from 'react';

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

/** Dark label on hover/focus. Wrap the trigger; nothing renders until hovered. */
export function Tooltip({ children, label, side = 'top', shortcut, style, ...rest }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const pos: React.CSSProperties = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%,8px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px,-50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px,-50%)' },
  }[side];
  return (
    <span
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          // A tooltip stays dark on a light page — that is the convention, and the
          // rail does the same. Declaring it a dark island is what makes that safe:
          // the surface and the label then resolve against each other instead of
          // pairing an ink background with the light scope's dark text.
          data-theme="dark"
          style={{
            position: 'absolute', ...pos, zIndex: 50, whiteSpace: 'nowrap', pointerEvents: 'none',
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
      )}
    </span>
  );
}
