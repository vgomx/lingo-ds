import * as React from 'react';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

const TONES: Record<BadgeTone, React.CSSProperties> = {
  neutral: { background: 'var(--surface-raised)', color: 'var(--text-body)' },
  brand: { background: 'var(--brand)', color: 'var(--text-on-brand)' },
  success: { background: 'var(--success-subtle)', color: 'var(--success-text)' },
  warning: { background: 'var(--warning-subtle)', color: 'var(--warning-text)' },
  danger: { background: 'var(--danger-subtle)', color: 'var(--danger-text)' },
  info: { background: 'var(--info-subtle)', color: 'var(--info-text)' },
};

export interface BadgeOwnProps {
  children?: React.ReactNode;
  tone?: BadgeTone;
  /** Leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}

export interface BadgeProps
  extends BadgeOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof BadgeOwnProps> {}

/** Small status marker: counts, "new", mastery level. Pill, uppercase, tiny. */
export function Badge({ children, tone = 'neutral', dot = false, style, ...rest }: BadgeProps) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5, height: 20, padding: dot ? '0 8px 0 6px' : '0 8px',
        borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)',
        fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
        whiteSpace: 'nowrap', ...t, ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}
