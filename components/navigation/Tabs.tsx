import * as React from 'react';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface TabItem { value: string; label: React.ReactNode; icon?: React.ReactNode; count?: number }

export interface TabsOwnProps {
  /** What a tab press sounds like. Defaults to `tap`; `false` where the caller has its own. */
  sound?: SoundName | false;
  items?: (string | TabItem)[];
  value?: string;
  onChange?: (value: string) => void;
  /** `underline` for page-level views, `pill` for in-card filters. */
  variant?: 'underline' | 'pill';
  style?: React.CSSProperties;
}

export interface TabsProps
  extends TabsOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof TabsOwnProps> {}

/** Underline tab bar for switching views inside a pane. */
export function Tabs({ items = [], value, onChange, variant = 'underline', sound = 'tap', style, ...rest }: TabsProps) {
  const pill = variant === 'pill';
  return (
    <div
      role="tablist"
      style={{
        display: 'flex', gap: pill ? 4 : 'var(--space-6)', alignItems: 'center',
        padding: pill ? 4 : 0, borderRadius: pill ? 'var(--radius-pill)' : 0,
        background: pill ? 'var(--surface-sunken)' : 'transparent',
        boxShadow: pill ? 'none' : 'inset 0 -1px 0 var(--divider)',
        ...style,
      }}
      {...rest}
    >
      {items.map((raw) => {
        const item: TabItem = typeof raw === 'string' ? { value: raw, label: raw } : raw;
        const on = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={on}
            // On the press, not on the change: pressing the tab you are already
            // on is still a press, and a control that answers only sometimes
            // reads as one that missed.
            onClick={() => { if (sound) playSound(sound); onChange && onChange(item.value); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', cursor: 'pointer',
              background: pill && on ? 'var(--surface-raised)' : 'transparent',
              padding: pill ? '0 14px' : '0 0 10px', height: pill ? 28 : 34,
              borderRadius: pill ? 'var(--radius-pill)' : 0,
              boxShadow: !pill && on ? 'inset 0 -3px 0 var(--brand)' : 'none',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'],
              color: on ? 'var(--text-strong)' : 'var(--text-muted)',
              transition: 'var(--transition-control)',
            }}
          >
            {item.icon}
            {item.label}
            {item.count !== undefined && (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], padding: '1px 6px', borderRadius: 'var(--radius-pill)', background: on ? 'var(--brand-subtle)' : 'var(--surface-raised)', color: on ? 'var(--violet-200)' : 'var(--text-muted)' }}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
