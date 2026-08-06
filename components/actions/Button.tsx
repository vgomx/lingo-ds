import * as React from 'react';
import { useIsTouch } from '../../hooks/useBreakpoint';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<ButtonSize, { height: string; padding: string; fontSize: string; gap: string; icon: number }> = {
  sm: { height: 'var(--control-h-sm)', padding: '0 12px', fontSize: 'var(--fs-13)', gap: '6px', icon: 14 },
  md: { height: 'var(--control-h-md)', padding: '0 16px', fontSize: 'var(--fs-14)', gap: '8px', icon: 16 },
  lg: { height: 'var(--control-h-lg)', padding: '0 22px', fontSize: 'var(--fs-16)', gap: '8px', icon: 18 },
  xl: { height: 'var(--control-h-xl)', padding: '0 28px', fontSize: 'var(--fs-18)', gap: '10px', icon: 20 },
};

const VARIANTS: Record<ButtonVariant, { rest: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    rest: { background: 'var(--brand)', color: 'var(--text-on-brand)', boxShadow: 'var(--shadow-chunk)' },
    hover: { background: 'var(--brand-hover)' },
  },
  secondary: {
    rest: { background: 'var(--surface-raised)', color: 'var(--text-strong)', boxShadow: 'var(--shadow-chunk-neutral)' },
    hover: { background: 'var(--surface-raised-hover)' },
  },
  ghost: {
    rest: { background: 'transparent', color: 'var(--text-body)' },
    hover: { background: 'var(--surface-hover)', color: 'var(--text-strong)' },
  },
  outline: {
    rest: { background: 'transparent', color: 'var(--text-strong)', boxShadow: 'inset 0 0 0 1.5px var(--border-strong)' },
    hover: { background: 'var(--surface-hover)', boxShadow: 'inset 0 0 0 1.5px var(--text-faint)' },
  },
  success: {
    rest: { background: 'var(--success)', color: 'var(--on-success)', boxShadow: '0 3px 0 var(--mint-700)' },
    hover: { background: 'color-mix(in oklab, var(--success) 82%, #fff)' },
  },
  danger: {
    rest: { background: 'var(--danger)', color: 'var(--on-danger)', boxShadow: '0 3px 0 var(--red-700)' },
    hover: { background: 'color-mix(in oklab, var(--danger) 82%, #fff)' },
  },
  link: {
    rest: { background: 'transparent', color: 'var(--text-link)', padding: 0, height: 'auto' },
    hover: { color: 'var(--text-strong)', textDecoration: 'underline' },
  },
};

export interface ButtonOwnProps {
  /**
   * What this button sounds like. Defaults to `tap`; pass `false` where the
   * caller plays its own — a grade button and a card flip already have a voice,
   * and two sounds on one press is one too many.
   */
  sound?: SoundName | false;
  children?: React.ReactNode;
  /** Visual role. `primary` is the only violet fill on a screen. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Fully rounded ends — used for hero CTAs and filter chips. */
  pill?: boolean;
  block?: boolean;
  disabled?: boolean;
  /** Swaps the left icon for a spinner and blocks interaction. */
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export interface ButtonProps
  extends ButtonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps> {}

/** Primary action control. Chunky bottom edge + 1px press travel is the brand's signature. */
export function Button({
  children, variant = 'primary', size = 'md', pill = false, block = false, disabled = false,
  loading = false, iconLeft = null, iconRight = null, type = 'button', sound = 'tap', onClick, style, ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  // "44px is the floor for anything touchable" — the guide's own rule. sm (28)
  // and md (36) are below it, so on touch the control keeps its type and padding
  // but grows to meet the floor rather than the layout having to remember.
  const isTouch = useIsTouch();
  const minHeight = isTouch && (size === 'sm' || size === 'md') ? 'var(--control-h-lg)' : undefined;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const isFlat = variant === 'ghost' || variant === 'link' || variant === 'outline';

  const buttonStyle: React.CSSProperties = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height, minHeight,
    padding: s.padding,
    border: 'none',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-button)',
    fontFamily: 'var(--font-ui)',
    fontSize: s.fontSize,
    fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
    lineHeight: 1,
    letterSpacing: 'var(--ls-normal)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'var(--transition-control)',
    ...v.rest,
    ...(hover && !disabled && !loading ? v.hover : null),
    ...(press && !disabled && !loading && !isFlat
      ? { transform: 'translateY(var(--press-translate))', boxShadow: variant === 'primary' ? 'var(--shadow-chunk-pressed)' : '0 1px 0 rgba(0,0,0,.35)' }
      : null),
    ...(press && !disabled && isFlat ? { transform: 'scale(var(--press-scale))' } : null),
    ...(disabled ? { opacity: 0.45, boxShadow: 'none' } : null),
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={(e) => {
        // Before the handler, so the press is acknowledged even when the handler
        // navigates away. playSound is a no-op when sound is off.
        if (sound) playSound(sound);
        onClick && onClick(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={buttonStyle}
      {...rest}
    >
      {loading ? <Spinner size={s.icon} /> : iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

function Spinner({ size }: { size: number }) {
  return (
    <span
      style={{
        width: size, height: size, borderRadius: '50%', display: 'inline-block',
        border: '2px solid currentColor', borderTopColor: 'transparent',
        animation: 'lt-spin .7s linear infinite',
      }}
    >
      <style>{'@keyframes lt-spin{to{transform:rotate(360deg)}}'}</style>
    </span>
  );
}
