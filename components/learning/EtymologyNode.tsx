import * as React from 'react';

export interface EtymologyNodeOwnProps {
  word?: React.ReactNode;
  /** Source language, rendered as an uppercase stamp in the accent colour. */
  language?: string;
  gloss?: React.ReactNode;
  /** Date range, e.g. "c. 1300". */
  era?: string;
  color?: string;
  /** Highlights this node as the word being looked up. */
  current?: boolean;
  /** Draws the descent line down to the next node. Set false on the last one. */
  connector?: boolean;
  style?: React.CSSProperties;
}

export interface EtymologyNodeProps
  extends EtymologyNodeOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof EtymologyNodeOwnProps> {}

/**
 * One node in the Etymology Explorer chain: a language-stamped word with its gloss.
 * Chain them vertically with `connector` to draw the descent line.
 */
export function EtymologyNode({ word, language, gloss, era, color = 'var(--tool-etymology)', current = false, connector = true, style, ...rest }: EtymologyNodeProps) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: 14 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: current ? color : 'var(--surface-raised)', boxShadow: current ? '0 0 0 4px color-mix(in oklab,' + color + ' 22%, transparent)' : 'inset 0 0 0 1.5px var(--border-strong)', marginTop: 6, flex: 'none' }} />
        {connector && <span style={{ flex: 1, width: 2, background: 'linear-gradient(to bottom,var(--border-strong),transparent)', marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: connector ? 'var(--space-7)' : 0, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], color: current ? 'var(--text-strong)' : 'var(--text-body)', lineHeight: 1.1 }}>
            {word}
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: color }}>
            {language}
          </span>
          {era && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', color: 'var(--text-muted)' }}>{era}</span>}
        </div>
        {gloss && (
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
            {gloss}
          </p>
        )}
      </div>
    </div>
  );
}
