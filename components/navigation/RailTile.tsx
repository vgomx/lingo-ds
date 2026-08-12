import * as React from 'react';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface RailTileOwnProps {
  /** What the press sounds like. Defaults to `tap`; `false` where the caller has its own. */
  sound?: SoundName | false;
  label: string;
  /** Icon element, e.g. <Icon name="layers" size={20} /> — use for tool tiles. */
  icon?: React.ReactNode;
  /** Country-flag emoji (preferred) or a 2-letter code, shown when no image is given. */
  flag?: string;
  src?: string;
  /** Fill colour when active — use the workspace's accent token. */
  color?: string;
  /**
   * The glyph's colour while active, which has to answer whatever `color` is.
   *
   * Defaults to --text-on-brand, which is right for the accent fills `color` is
   * documented for. A rail that fills with a *surface* instead needs its theme's
   * own ink: white on a near-white tile measures 1.07, which is what a light
   * rail got when this was hard-coded to #fff.
   */
  onColor?: string;
  /** Tile edge length in px. Default 46. */
  size?: number;
  /** Transparent at rest — lighter visual weight for tool rails. */
  quiet?: boolean;
  active?: boolean;
  unread?: number;
  /** Renders the language name in small type under the tile. On by default in the app rail. */
  showLabel?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface RailTileProps
  extends RailTileOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof RailTileOwnProps> {}

/**
 * Tile in the far-left rail — one per tool (icon) or language workspace (flag).
 * Squircle at rest, rounds toward a squarer radius and grows a left pip when active.
 * `showLabel` puts the language name in small type underneath.
 */
export function RailTile({ label, icon, flag, src, color = 'var(--brand)', onColor = 'var(--text-on-brand)', size = 46, quiet = false, active = false, unread = 0, showLabel = false, sound = 'tap', onClick, style, ...rest }: RailTileProps) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  const isEmoji = flag && !/^[A-Za-z]{1,3}$/.test(flag);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', ...style }} {...rest}>
      {/* The active pip is sized against the glyph inside the tile rather than the
          tile itself — at 0.48 it comes out level with an 18px icon in the default
          38px tile, so the two read as one mark. Spanning most of the tile height,
          as it used to, made it the loudest thing in the rail.
          Anchored by its centre rather than its top edge: `height` is what animates,
          so pinning `top` grew the pip downward from a fixed top and left it riding
          high above the icon for the whole transition — visible on every navigation.
          translateY(-50%) keeps the midpoint fixed, so it opens symmetrically and is
          level with the icon at every frame, whatever `size` is set to. */}
      <span
        style={{
          // Anchored to the tile, not to this box. The root is width:100% of
          // whatever wraps it, and a rail wrapping tiles in a shrink-to-fit
          // element gets a box as wide as the *label* — so `left: 0` put the pip
          // a little further left on every tile with a longer word under it, and
          // well out of line on the longest. The tiles are all in the same
          // column; the pip now is too.
          position: 'absolute', left: `calc(50% - ${size / 2}px)`, top: size / 2, transform: 'translateY(-50%)',
          width: 4, height: active ? size * 0.48 : 0,
          borderRadius: '0 4px 4px 0', background: 'var(--text-strong)',
          transition: 'height var(--dur-base) var(--ease-spring)',
        }}
      />
      <button
        type="button"
        title={label}
        aria-label={label}
        // Before the handler, which navigates away — the same order Button uses,
        // and for the same reason: the press is acknowledged even if the screen
        // it was on is already gone. playSound is a no-op when sound is off.
        onClick={() => { if (sound) playSound(sound); onClick && onClick(); }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: size, height: size, border: 'none', cursor: 'pointer', padding: 0,
          display: 'grid', placeItems: 'center', overflow: 'hidden',
          borderRadius: lit ? 'var(--radius-lg)' : 'var(--radius-xl)',
          // backgroundColor, not the `background` shorthand: the longhands below
          // set the tile's image, and a shorthand re-rendering alongside them
          // resets those (React warns about the mix, and a tile with `src` loses
          // its image on hover).
          backgroundColor: active ? color : hover ? 'var(--surface-card)' : quiet ? 'transparent' : 'var(--surface-card)',
          color: active ? onColor : hover ? 'var(--text-strong)' : 'var(--text-muted)',
          boxShadow: active && hover ? '0 0 0 3px color-mix(in oklab, ' + color + ' 28%, transparent)' : 'none',
          fontFamily: isEmoji ? 'inherit' : 'var(--font-display)',
          fontSize: isEmoji ? '26px' : 'var(--fs-16)',
          fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], lineHeight: 1,
          backgroundImage: src ? 'url(' + src + ')' : undefined, backgroundSize: '62%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          transition: 'border-radius var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        }}
      >
        {icon || (!src && (flag || label.slice(0, 2).toUpperCase()))}
      </button>
      {showLabel && (
        <span
          style={{
            // 64, not 60: a 72px rail has the room, and 60 was cutting a single
            // pixel off eleven-character labels — "Conjugation" measures 61 —
            // which spends an ellipsis to save nothing.
            maxWidth: 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-10)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
            letterSpacing: 'var(--ls-wide)', textAlign: 'center',
            // --text-muted, not --text-faint: at --fs-10 this is small text needing
            // 4.5:1, and faint on the rail surface measures 3.14. Muted gives 5.88 —
            // and is already what the inactive icon above it uses, so the two match.
            color: active || hover ? 'var(--text-strong)' : 'var(--text-muted)',
            transition: 'color var(--dur-fast) var(--ease-standard)',
          }}
        >
          {label}
        </span>
      )}
      {unread > 0 && (
        <span
          style={{
            position: 'absolute', right: 4, top: size - 12, minWidth: 18, height: 18, padding: '0 5px',
            display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
            background: 'var(--danger)', color: 'var(--on-danger)', boxShadow: '0 0 0 3px var(--surface-rail)',
            fontFamily: 'var(--font-display)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
          }}
        >
          {unread}
        </span>
      )}
    </div>
  );
}
