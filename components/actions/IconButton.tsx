import * as React from 'react';
import { useIsTouch } from '../../hooks/useBreakpoint';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'ghost' | 'solid' | 'brand' | 'danger';

const SIZES: Record<IconButtonSize, number> = { sm: 28, md: 36, lg: 44 };

export interface IconButtonOwnProps {
  /** What it sounds like. Defaults to `tap`; `false` where the caller has its own. */
  sound?: SoundName | false;
  /** Exactly one <Icon /> (or 16-20px glyph). */
  children?: React.ReactNode;
  /** Required — becomes aria-label and the tooltip title. */
  label: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  shape?: 'rounded' | 'circle';
  /** Persistent selected state (toolbar toggles, rail items). */
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export interface IconButtonProps
  extends IconButtonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof IconButtonOwnProps> {}

/** Square/round icon-only control for toolbars, card corners and the app rail. */
export function IconButton({
  children, label, size = 'md', variant = 'ghost', shape = 'rounded', active = false,
  disabled = false, sound = 'tap', onClick, style, ...rest
}: IconButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  // 44px is the guide's floor for anything touchable, and sm/md sit below it.
  // The glyph keeps its size; only the box the finger has to hit grows.
  const isTouch = useIsTouch();
  const px = Math.max(SIZES[size] || SIZES.md, isTouch ? SIZES.lg : 0);

  const variants: Record<IconButtonVariant, React.CSSProperties> = {
    ghost: { background: active ? 'var(--surface-active)' : 'transparent', color: active ? 'var(--text-strong)' : 'var(--text-muted)' },
    solid: { background: 'var(--surface-raised)', color: 'var(--text-strong)' },
    brand: { background: 'var(--brand)', color: 'var(--text-on-brand)' },
    danger: { background: 'transparent', color: 'var(--danger)' },
  };
  const hovers: Record<IconButtonVariant, React.CSSProperties> = {
    ghost: { background: 'var(--surface-hover)', color: 'var(--text-strong)' },
    solid: { background: 'var(--surface-raised-hover)' },
    brand: { background: 'var(--brand-hover)' },
    danger: { background: 'var(--danger-subtle)' },
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        if (sound) playSound(sound);
        onClick && onClick(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: px, height: px, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: shape === 'circle' ? 'var(--radius-pill)' : 'var(--radius-control)',
        transition: 'var(--transition-control)',
        ...variants[variant],
        ...(hover && !disabled ? hovers[variant] : null),
        ...(press && !disabled ? { transform: 'scale(var(--press-scale))' } : null),
        ...(disabled ? { opacity: 0.4 } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
