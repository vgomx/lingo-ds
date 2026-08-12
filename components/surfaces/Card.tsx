import * as React from 'react';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface CardOwnProps {
  /**
   * What a press sounds like, for an `interactive` card only — a card that is
   * just a container is not a control and does not click. Defaults to `tap`.
   */
  sound?: SoundName | false;
  children?: React.ReactNode;
  /** Display-font heading rendered inside the card. */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** CSS colour for a 3px top accent stripe — use a --tool-* token. */
  accent?: string;
  /** Buttons/IconButtons pinned to the header's right edge. */
  actions?: React.ReactNode;
  padding?: string;
  /** Lifts 2px on hover, casts a shadow while lifted, and takes a pointer cursor. */
  interactive?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export interface CardProps
  extends CardOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof CardOwnProps> {}

/** Raised content container: 12px radius, flat fill, hairline inset, no glow. */
export function Card({
  children, title, subtitle, accent, actions, padding = 'var(--pad-card)',
  interactive = false, selected = false, sound = 'tap', onClick, style, ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);

  // The ring is the card's own edge and is always there; the drop shadow only
  // exists while the card is lifted. That is the rule the guide already sets —
  // shadows are for things that actually float, and a resting surface gets none —
  // so the 2px lift and the shadow are the same event rather than two effects.
  // A glow would be the wrong instrument: it is spent, exactly once, on the
  // streak flame.
  const ring = selected ? 'inset 0 0 0 1.5px var(--brand)' : 'var(--ring-inset)';
  const lifted = interactive && hover;

  return (
    <div
      onClick={(e) => {
        /*
         * The card's own press, not one on its way past.
         *
         * An interactive card is usually wrapped in a Link rather than given an
         * onClick, so the sound cannot hang off the handler — it hangs off the
         * card being declared interactive at all. But a Button inside the card
         * bubbles through here too, and it has already spoken: `contains` is
         * what separates a control the card holds from the anchor that holds
         * the card, which `closest` alone would find and silence everything.
         */
        const control = (e.target as HTMLElement).closest('button, a, [role="button"]');
        const nested = !!control && e.currentTarget.contains(control);
        if (interactive && sound && !nested) playSound(sound);
        onClick && onClick(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)',
        background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding,
        boxShadow: lifted ? `${ring}, var(--shadow-md)` : ring,
        cursor: interactive ? 'pointer' : undefined,
        transform: lifted ? 'translateY(-2px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
        overflow: 'hidden', ...style,
      }}
      {...rest}
    >
      {accent && <span style={{ position: 'absolute', inset: '0 0 auto 0', height: 3, background: accent }} />}
      {(title || actions) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {title && <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-18)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)', lineHeight: 1.2 }}>{title}</span>}
            {subtitle && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>{subtitle}</span>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 'var(--gap-inline)', flex: 'none' }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
