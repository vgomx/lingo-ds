import * as React from 'react';
import { Icon } from '../icon/Icon';

export interface StreakPillOwnProps {
  days?: number;
  /** Amber + glow when true; greyed when the streak is broken. */
  active?: boolean;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}

export interface StreakPillProps
  extends StreakPillOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof StreakPillOwnProps> {}

/** Streak counter — amber flame plus day count. The one place a glow is allowed. */
export function StreakPill({ days = 0, active = true, size = 'md', style, ...rest }: StreakPillProps) {
  const lg = size === 'lg';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: lg ? 8 : 6,
        height: lg ? 36 : 28, padding: lg ? '0 14px' : '0 10px',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--warning-subtle)' : 'var(--surface-raised)',
        boxShadow: active ? 'inset 0 0 0 1px color-mix(in oklab, var(--streak) 35%, transparent)' : 'none',
        color: active ? 'var(--streak-text)' : 'var(--text-faint)',
        fontFamily: 'var(--font-display)', fontSize: lg ? 'var(--fs-18)' : 'var(--fs-14)',
        fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
        ...style,
      }}
      {...rest}
    >
      <Icon name="flame" size={lg ? 20 : 15} style={{ filter: active ? 'drop-shadow(0 0 6px rgba(255,176,32,.6))' : 'none' }} />
      {days}
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: lg ? 'var(--fs-13)' : 'var(--fs-11)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', opacity: 0.75 }}>
        {days === 1 ? 'day' : 'days'}
      </span>
    </span>
  );
}
