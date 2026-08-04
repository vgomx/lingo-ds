import * as React from 'react';

export interface TagOwnProps {
  children?: React.ReactNode;
  /** Any CSS colour — pass a --tool-* or accent token, not a raw hex. */
  color?: string;
  variant?: 'soft' | 'solid';
  icon?: React.ReactNode;
  /** Renders a trailing x. */
  onRemove?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export interface TagProps
  extends TagOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof TagOwnProps> {}

/** Content label — deck topics, part of speech, source language. Removable when interactive. */
export function Tag({ children, color = 'var(--brand)', variant = 'soft', icon = null, onRemove, style, ...rest }: TagProps) {
  const solid = variant === 'solid';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: onRemove ? '0 6px 0 10px' : '0 10px',
        borderRadius: 'var(--radius-tag)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)',
        fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], whiteSpace: 'nowrap',
        background: solid ? color : 'color-mix(in oklab, ' + color + ' 18%, transparent)',
        color: solid ? '#fff' : color,
        boxShadow: solid ? 'none' : 'inset 0 0 0 1px color-mix(in oklab, ' + color + ' 35%, transparent)',
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{ display: 'grid', placeItems: 'center', width: 16, height: 16, border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%', background: 'transparent', color: 'inherit', opacity: 0.7 }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </span>
  );
}
