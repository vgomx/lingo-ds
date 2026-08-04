import * as React from 'react';

export interface ProgressSegment { weight?: number; color?: string }

export interface ProgressBarOwnProps {
  value?: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
  /** Right-aligned display-font readout, e.g. "18 / 40". */
  valueLabel?: string;
  /** Renders a proportional multi-colour bar instead of a single fill. */
  segments?: ProgressSegment[];
  style?: React.CSSProperties;
}

export interface ProgressBarProps
  extends ProgressBarOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ProgressBarOwnProps> {}

/** Deck / session / mastery progress. Rounded track, flat fill, optional segments. */
export function ProgressBar({ value = 0, max = 100, color = 'var(--brand)', height = 8, label, valueLabel, segments, style, ...rest }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', ...style }} {...rest}>
      {(label || valueLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-4)' }}>
          {label && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-muted)' }}>{label}</span>}
          {valueLabel && <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)' }}>{valueLabel}</span>}
        </div>
      )}
      {segments ? (
        <div style={{ display: 'flex', gap: 3, height }}>
          {segments.map((s, i) => (
            <span key={i} style={{ flex: s.weight || 1, borderRadius: 'var(--radius-pill)', background: s.color || 'var(--surface-raised)' }} />
          ))}
        </div>
      ) : (
        <div style={{ height, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
          <span style={{ display: 'block', width: pct + '%', height: '100%', borderRadius: 'var(--radius-pill)', background: color, transition: 'width var(--dur-slow) var(--ease-out)' }} />
        </div>
      )}
    </div>
  );
}
