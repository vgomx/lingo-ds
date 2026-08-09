import * as React from 'react';

export type TagSize = 'sm' | 'md';

export interface TagOwnProps {
  children?: React.ReactNode;
  /**
   * `md` is the touch size, for a chip you are meant to hit rather than read.
   *
   * Added because three callers had reached past the component and set `height`
   * through `style` — a tag input's chips, its suggestions, and the cognate
   * chips in the product. Three overrides of the same property is the component
   * missing a prop.
   */
  size?: TagSize;
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
export function Tag({ children, size = 'sm', color = 'var(--brand)', variant = 'soft', icon = null, onRemove, style, ...rest }: TagProps) {
  const solid = variant === 'solid';
  const big = size === 'md';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: big ? 32 : 24,
        padding: big ? (onRemove ? '0 8px 0 12px' : '0 12px') : (onRemove ? '0 6px 0 10px' : '0 10px'),
        borderRadius: 'var(--radius-tag)', fontFamily: 'var(--font-ui)', fontSize: big ? 'var(--fs-13)' : 'var(--fs-12)',
        fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], whiteSpace: 'nowrap',
        background: solid ? color : 'color-mix(in oklab, ' + color + ' 18%, transparent)',
        // The accent is tuned to read on a dark surface. On a light one the same
        // step sits at 2.42 against its own 18% tint, so --tag-ink pulls it toward
        // ink there and is a no-op in dark. Both come from the theme scope, so a
        // Tag inside a nested light or dark island resolves against that island.
        color: solid ? '#fff' : 'color-mix(in oklab, ' + color + ', var(--tag-ink) var(--tag-ink-amount))',
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
