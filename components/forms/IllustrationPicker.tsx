import * as React from 'react';
import { Icon } from '../icon/Icon';
import { useIsTouch } from '../../hooks/useBreakpoint';
import { fieldFontSize } from './fieldFont';

export interface IllustrationItem {
  /** Stable identity — this is what `value` and `onChange` speak in. */
  id: string;
  /** Resolved URL of the glyph. */
  src: string;
  /** Written out in full: the alt text, the tooltip, and half the search index. */
  name: string;
  group?: string;
  /** Extra search terms beyond the words already in `name`. */
  keywords?: string[];
}

export interface IllustrationPickerGroup {
  id: string;
  label: string;
}

export interface IllustrationPickerOwnProps {
  items: IllustrationItem[];
  /** Section headings, in order. Items whose `group` matches are filed under one. */
  groups?: IllustrationPickerGroup[];
  /** Selected item id, or null for none. */
  value?: string | null;
  onChange?: (id: string | null) => void;
  /** Uppercase micro-label above the field, as on Input. */
  label?: string;
  hint?: string;
  /** Height of the scrolling grid. The search field and clear row sit outside it. */
  height?: number;
  /** Glyph edge length in px; the cell is sized around it. */
  glyphSize?: number;
  searchPlaceholder?: string;
  /** Wording for the choice that clears the selection. */
  clearLabel?: string;
  style?: React.CSSProperties;
}

export interface IllustrationPickerProps
  extends IllustrationPickerOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof IllustrationPickerOwnProps | 'onChange'> {}

/**
 * Grid picker for a set of illustrations, with search and section headings.
 *
 * Deliberately knows nothing about where the glyphs come from — it takes
 * `items` with resolved `src` URLs. The design system holds only a sample set as
 * an example of the treatment; the full set is vendored in the product repo, and
 * a picker that reached for it would drag those assets back in here.
 *
 * The grid is the sanctioned exception to "one illustration per surface": these
 * are a grid of equals being chosen between, not decoration.
 */
export function IllustrationPicker({
  items, groups, value = null, onChange, label, hint, height = 236, glyphSize = 34,
  searchPlaceholder = 'Search illustrations', clearLabel = 'No illustration', style, ...rest
}: IllustrationPickerProps) {
  const [query, setQuery] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const touch = useIsTouch();
  const scroller = React.useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const matches = React.useMemo(() => {
    if (!q) return items;
    // Every space-separated term has to hit something, so "red car" narrows
    // rather than widening to everything red plus every car.
    const terms = q.split(/\s+/);
    return items.filter((it) => {
      const hay = `${it.name} ${(it.keywords || []).join(' ')}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, q]);

  /** Sections in `groups` order; anything unfiled lands in a trailing catch-all. */
  const sections = React.useMemo(() => {
    if (!groups?.length) return [{ id: '', label: '', items: matches }];
    const byGroup = new Map<string, IllustrationItem[]>();
    for (const it of matches) {
      const key = it.group ?? '';
      const list = byGroup.get(key);
      if (list) list.push(it); else byGroup.set(key, [it]);
    }
    const out = groups
      .map((g) => ({ id: g.id, label: g.label, items: byGroup.get(g.id) ?? [] }))
      .filter((s) => s.items.length > 0);
    const loose = [...byGroup.entries()].filter(([k]) => !groups.some((g) => g.id === k));
    if (loose.length) out.push({ id: '', label: 'Other', items: loose.flatMap(([, v]) => v) });
    return out;
  }, [groups, matches]);

  // A new search should be read from the top; without this the scroll position
  // survives and a one-row result set can land off-screen.
  React.useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [q]);

  const cell = glyphSize + 12;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }} {...rest}>
      {(label || value) && (
        <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          {label && (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {label}
            </span>
          )}
          {/*
            * Clearing the selection belongs up here with the thing it clears,
            * not inside the search box.
            *
            * It used to be a ✕ at the end of the search field, which is the one
            * place that glyph already means something else: inside a search
            * input it means "clear what I typed". It also appeared and
            * disappeared with the *selection*, so the usual sight of it was a ✕
            * sitting in an empty box next to placeholder text — and pressing it
            * to clear a search threw away the illustration instead.
            *
            * Words rather than a glyph, because this is the rarer action and it
            * is worth being unambiguous about which of the two things it drops.
            */}
          {value && onChange && (
            <button
              type="button"
              onClick={() => onChange(null)}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer', padding: '2px 0',
                fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)',
                fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--text-link)',
              }}
            >
              {clearLabel}
            </button>
          )}
        </span>
      )}

      <span
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          /*
           * The same height as an Input, because that is what it sits beside.
           * It was --control-h-sm: 28px in a card editor whose other four
           * fields are 36, reading as a thinner, lesser kind of field for no
           * reason anyone could act on. On touch it stayed 28 while they
           * stepped to 44, which is a search box a finger cannot reliably hit.
           */
          height: touch ? 'var(--control-h-lg)' : 'var(--control-h-md)', padding: '0 12px',
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          color: 'var(--text-faint)', /* faint-ok: inherited by the search Icon; the input sets its own colour */ transition: 'var(--transition-control)',
        }}
      >
        <Icon name="search" size={15} />
        <input
          // The shell around this paints the focus treatment; without this the
          // global :focus-visible ring draws a second one inside it.
          data-focus-ring="delegated"
          type="search"
          value={query}
          placeholder={searchPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-ui)', fontSize: fieldFontSize(touch),
            fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)',
          }}
        />
        {/* Now what a ✕ in a search field is expected to be: it clears the
            query, and it is only here when there is a query to clear. Bigger
            than the 22px it was, which was a small target in a field that is
            44px tall on touch. */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            // Kept off touch: iOS raises a `title` as a long-press callout,
            // which is the same hover-hint-on-a-device-that-cannot-hover
            // problem the Tooltip had. aria-label carries the name regardless.
            title={touch ? undefined : 'Clear search'}
            aria-label="Clear search"
            style={{
              display: 'grid', placeItems: 'center', flex: 'none',
              width: touch ? 32 : 26, height: touch ? 32 : 26,
              border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              background: 'var(--surface-raised)', color: 'var(--text-muted)',
            }}
          >
            <Icon name="x" size={touch ? 16 : 14} />
          </button>
        )}
      </span>

      {/* The frame and the scroller are two boxes on purpose.

          A sticky heading offsets from the scrollport, which is the scroller's
          *padding* box — so any padding-top here parks it that far down and
          leaves a band above it for glyphs to scroll through. It was 4px of
          emoji sliding past above the group name.

          Dropping the padding alone would fix the gap and break something else:
          the heading spans the content width, so its background would paint over
          the middle of the 1px ring and leave the frame looking topless while
          scrolled. The ring lives on this outer box now, one pixel out of the
          scroller's reach, and the heading can sit flush against the top. */}
      <div
        style={{
          height, padding: 1, overflow: 'hidden',
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: 'inset 0 0 0 1px var(--border)',
        }}
      >
      <div
        ref={scroller}
        style={{ height: '100%', overflowY: 'auto', padding: '0 3px 8px' }}
      >
        {sections.length === 0 ? (
          <p style={{ margin: 0, padding: '20px 12px', textAlign: 'center', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>
            Nothing matches “{query.trim()}”.
          </p>
        ) : sections.map((section) => (
          <section key={section.id || section.label}>
            {section.label && (
              <h4
                style={{
                  // Sticky so the heading is still there once a long section is
                  // scrolled into — otherwise everything below the fold is
                  // unlabelled and the grid reads as one undifferentiated mass.
                  position: 'sticky', top: 0, zIndex: 1, margin: 0,
                  padding: '8px 8px 5px', background: 'var(--surface-input)',
                  fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-10)',
                  fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
                  letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
                  // --text-muted, not --text-faint: at --fs-10 this is small text
                  // needing 4.5:1, and faint on the input well measures 3.27 in
                  // light and 2.99 in dark. Muted clears it in both.
                  color: 'var(--text-muted)',
                }}
              >
                {section.label}
              </h4>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${cell}px, 1fr))`, gap: 2 }}>
              {section.items.map((it) => {
                const selected = it.id === value;
                return (
                  <button
                    key={it.id}
                    type="button"
                    // See the clear button. Dropping `title` outright would
                    // cost a mouse the name of 500-odd glyphs it can only
                    // otherwise guess at, so it goes on the pointer that can
                    // hover and off the one that cannot.
                    title={touch ? undefined : it.name}
                    aria-label={it.name}
                    aria-pressed={selected}
                    onClick={() => onChange && onChange(selected ? null : it.id)}
                    style={{
                      display: 'grid', placeItems: 'center', height: cell, padding: 0,
                      border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)',
                      background: selected ? 'var(--brand)' : 'transparent',
                      boxShadow: selected ? 'var(--ring-focus)' : 'none',
                      transition: 'background var(--dur-fast) var(--ease-standard)',
                    }}
                  >
                    <img
                      src={it.src}
                      alt=""
                      // The set runs to hundreds; without this every glyph in
                      // every section is fetched the moment the picker opens.
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{ width: glyphSize, height: glyphSize, display: 'block' }}
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      </div>

      {hint && (
        // --text-muted for the same reason as Input's hint: 12px is small text
        // needing 4.5:1, and faint measures 3.27 light / 2.53 dark here.
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: 'var(--text-muted)' }}>{hint}</span>
      )}
    </div>
  );
}
