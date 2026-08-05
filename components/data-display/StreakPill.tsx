import * as React from 'react';
import { Icon } from '../icon/Icon';

export type StreakPillSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Heights match the control ramp (--control-h-*), so a streak can sit flush
 * beside a Button of the same size. They previously ran 28/36 under the names
 * md/lg, which meant a "large" streak was the height of a *medium* button and no
 * pairing of the two components could ever line up.
 */
const SIZES: Record<StreakPillSize, {
  height: number; padding: string; gap: number; icon: number; value: string; unit: string;
}> = {
  sm: { height: 28, padding: '0 10px', gap: 6, icon: 15, value: 'var(--fs-14)', unit: 'var(--fs-11)' },
  md: { height: 36, padding: '0 14px', gap: 8, icon: 20, value: 'var(--fs-18)', unit: 'var(--fs-13)' },
  lg: { height: 44, padding: '0 16px', gap: 9, icon: 22, value: 'var(--fs-20)', unit: 'var(--fs-13)' },
  xl: { height: 52, padding: '0 20px', gap: 10, icon: 26, value: 'var(--fs-24)', unit: 'var(--fs-14)' },
};

export interface StreakPillOwnProps {
  days?: number;
  /** Amber + glow when true; greyed when the streak is broken. */
  active?: boolean;
  /** Matches Button's ramp — an `xl` pill is exactly as tall as an `xl` button. */
  size?: StreakPillSize;
  style?: React.CSSProperties;
}

export interface StreakPillProps
  extends StreakPillOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof StreakPillOwnProps> {}

/** Streak counter — amber flame plus day count. The one place a glow is allowed. */
export function StreakPill({ days = 0, active = true, size = 'md', style, ...rest }: StreakPillProps) {
  const s = SIZES[size] || SIZES.md;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: s.gap,
        height: s.height, padding: s.padding,
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--warning-subtle)' : 'var(--surface-raised)',
        boxShadow: active ? 'inset 0 0 0 1px color-mix(in oklab, var(--streak) 35%, transparent)' : 'none',
        // --text-muted for the broken state: faint measured 3.06 against
        // --surface-raised, and "0 days" is text, not decoration.
        color: active ? 'var(--streak-text)' : 'var(--text-muted)',
        fontFamily: 'var(--font-display)', fontSize: s.value,
        fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
        ...style,
      }}
      {...rest}
    >
      <Icon name="flame" size={s.icon} style={{ filter: active ? 'drop-shadow(0 0 6px rgba(255,176,32,.6))' : 'none' }} />
      {days}
      <span
        style={{
          fontFamily: 'var(--font-ui)', fontSize: s.unit,
          fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
          letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', opacity: 0.75,
        }}
      >
        {days === 1 ? 'day' : 'days'}
      </span>
    </span>
  );
}
