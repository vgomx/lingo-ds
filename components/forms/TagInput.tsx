import * as React from 'react';
import { Tag } from '../data-display/Tag';
import { useIsTouch } from '../../hooks/useBreakpoint';

export interface TagInputOwnProps {
  value?: string[];
  onChange?: (next: string[]) => void;
  /**
   * Words already in use elsewhere, offered as you type.
   *
   * The reason this component exists rather than a comma-separated `Input`.
   * Tags are only useful when two people — or the same person a month apart —
   * pick the same word, and a bare text field is how `verb` and `verbs` end up
   * both being real.
   */
  suggestions?: string[];
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  /** Any CSS colour, passed through to the chips. */
  color?: string;
  disabled?: boolean;
  block?: boolean;
  /** How many suggestions to show at once. */
  maxSuggestions?: number;
  style?: React.CSSProperties;
}

export type TagInputProps = TagInputOwnProps;

const norm = (s: string) => s.trim().toLowerCase();

/**
 * A field of chips rather than a line of commas.
 *
 * The comma-separated version worked and told you nothing: no feedback that a
 * tag had registered, no way to remove the middle one without editing a string,
 * and no hint that `particle` already existed when you were about to type
 * `particles`. Existing words are offered under the field, which is the part
 * that actually protects the vocabulary.
 *
 * Enter and comma both commit, because people reach for both. Backspace on an
 * empty field removes the last chip, which is the one convention every tag
 * field shares and the only way to undo a typo without the mouse.
 */
export function TagInput({
  value = [], onChange, suggestions = [], placeholder = 'Add a tag…', label, hint, error,
  color = 'var(--brand)', disabled = false, block = true, maxSuggestions = 6, style,
}: TagInputProps) {
  const [draft, setDraft] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const touch = useIsTouch();

  const has = React.useCallback((t: string) => value.some((v) => norm(v) === norm(t)), [value]);

  const add = (raw: string) => {
    const t = raw.trim();
    if (!t || has(t)) { setDraft(''); return; }
    onChange?.([...value, t]);
    setDraft('');
  };

  const removeAt = (i: number) => onChange?.(value.filter((_, n) => n !== i));

  const offered = React.useMemo(() => {
    const q = norm(draft);
    return suggestions
      .filter((s) => !has(s))
      .filter((s) => (q ? norm(s).includes(q) : true))
      .slice(0, maxSuggestions);
  }, [suggestions, draft, has, maxSuggestions]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      // Enter would otherwise submit the dialog this usually sits in, before
      // the tag being typed had been added to anything.
      e.preventDefault();
      add(draft);
      return;
    }
    if (e.key === 'Backspace' && !draft && value.length) {
      e.preventDefault();
      removeAt(value.length - 1);
    }
  };

  return (
    <div style={{ display: block ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 'var(--space-3)', width: block ? '100%' : undefined }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}

      {/* Clicking anywhere in the well puts the caret in the field — the chips
          fill most of it, so aiming at the remaining sliver would be the only
          way in otherwise. */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6,
          minHeight: 'var(--control-h-md)', padding: '6px 8px',
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: error
            ? 'inset 0 0 0 1.5px var(--danger)'
            : focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'var(--transition-control)',
          opacity: disabled ? 0.5 : 1, ...style,
        }}
      >
        {value.map((t, i) => (
          <Tag
            key={`${t}-${i}`}
            color={color}
            onRemove={disabled ? undefined : () => removeAt(i)}
            // A 24px chip carries a 14px x, which is not a target. Taller under
            // a thumb, the same everywhere else.
            style={touch ? { height: 32, fontSize: 'var(--fs-13)' } : undefined}
          >
            {t}
          </Tag>
        ))}
        <input
          ref={inputRef}
          data-focus-ring="delegated"
          value={draft}
          disabled={disabled}
          placeholder={value.length ? '' : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocus(true)}
          // Commit what is sitting there rather than discarding it: a field
          // left mid-word and then submitted should keep the word.
          onBlur={() => { setFocus(false); add(draft); }}
          style={{
            flex: 1, minWidth: 80, border: 'none', outline: 'none', background: 'transparent',
            font: 'inherit', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)',
            fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'],
            color: 'var(--text-strong)', height: touch ? 32 : 24,
          }}
        />
      </div>

      {offered.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', color: 'var(--text-muted)', marginRight: 2 }}>
            In use
          </span>
          {offered.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              disabled={disabled}
              style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', borderRadius: 'var(--radius-tag)' }}
            >
              <Tag color="var(--text-muted)" style={touch ? { height: 32, fontSize: 'var(--fs-13)' } : undefined}>
                {s}
              </Tag>
            </button>
          ))}
        </div>
      )}

      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
