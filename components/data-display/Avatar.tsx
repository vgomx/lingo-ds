import * as React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'idle' | 'offline';

const SIZES: Record<AvatarSize, number> = { xs: 20, sm: 28, md: 36, lg: 48, xl: 72 };
const RING: Record<AvatarStatus, string> = { online: 'var(--success)', idle: 'var(--warning)', offline: 'var(--border-strong)' };

export interface AvatarOwnProps {
  /** Used for initials and to pick the deterministic fallback hue. */
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  /** Emoji flag or 1-2 chars shown instead of initials (language avatars). */
  flag?: string;
  style?: React.CSSProperties;
}

export interface AvatarProps
  extends AvatarOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof AvatarOwnProps> {}

/** Round member/language avatar. Initials fallback uses a deterministic accent hue. */
export function Avatar({ name = '', src, size = 'md', status, flag, style, ...rest }: AvatarProps) {
  const px = SIZES[size] || SIZES.md;
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const hues = ['var(--violet-500)', 'var(--cyan-500)', 'var(--mint-500)', 'var(--coral-500)', 'var(--pink-500)', 'var(--amber-500)'];
  const bg = hues[(name.charCodeAt(0) || 0) % hues.length];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none', ...style }} {...rest}>
      <span
        style={{
          width: px, height: px, borderRadius: 'var(--radius-avatar)', display: 'grid', placeItems: 'center',
          background: src ? 'center/cover no-repeat url(' + src + ')' : bg,
          color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
          fontSize: Math.max(10, Math.round(px * 0.38)), overflow: 'hidden',
        }}
      >
        {!src && (flag || initials)}
      </span>
      {status && (
        <span
          style={{
            position: 'absolute', right: -1, bottom: -1, width: Math.max(8, px * 0.28), height: Math.max(8, px * 0.28),
            borderRadius: '50%', background: RING[status], boxShadow: '0 0 0 2.5px var(--surface-sidebar)',
          }}
        />
      )}
    </span>
  );
}
