import * as React from 'react';

export interface TextareaOwnProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Uppercase micro-label above the field. */
  label?: string;
  hint?: string;
  /** Error text; also switches the ring to danger red. */
  error?: string;
  /** How many lines it shows before it needs to grow or scroll. */
  rows?: number;
  /**
   * Grow with the text instead of scrolling, up to `maxRows`.
   *
   * On by default: these fields hold prose, and a box that scrolls a paragraph
   * out of sight while you are still writing it hides the thing you are trying
   * to read back.
   */
  autoGrow?: boolean;
  maxRows?: number;
  disabled?: boolean;
  block?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

export interface TextareaProps
  extends TextareaOwnProps,
    Omit<React.ComponentPropsWithoutRef<'textarea'>, keyof TextareaOwnProps> {}

/** Roughly a line, for turning `rows` into a height without measuring text. */
const LINE = 22;
const PAD_Y = 10;

/**
 * Multi-line text, matching `Input` in every other respect.
 *
 * It exists because a note's body was being collected in an `Input` whose own
 * hint said "leave a blank line between paragraphs" — advice a single-line field
 * cannot take. The stored notes had paragraphs; there was simply no way to type
 * one, and the text you did have scrolled sideways out of a 36px box.
 *
 * Height is set from `rows` rather than left to the browser's default of 2, and
 * grows with the content up to `maxRows` before it starts scrolling. Resize is
 * left on vertically, because someone writing six paragraphs knows better than
 * `maxRows` does.
 */
export function Textarea({
  value, defaultValue, placeholder, label, hint, error, rows = 4, autoGrow = true,
  maxRows = 14, disabled = false, block = true, onChange, style, ...rest
}: TextareaProps) {
  const [focus, setFocus] = React.useState(false);
  const ref = React.useRef<HTMLTextAreaElement>(null);

  /*
   * Grow to fit, measured rather than counted.
   *
   * Reset to `auto` first: scrollHeight only ever reports the content's height
   * when the box is not already taller than it, so without the reset a field
   * that grew once can never shrink back.
   */
  const fit = React.useCallback(() => {
    const el = ref.current;
    if (!el || !autoGrow) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxRows * LINE + PAD_Y * 2)}px`;
  }, [autoGrow, maxRows]);

  // On value as well as on mount: a dialog that opens with existing text has to
  // arrive at the right height, not grow to it on the first keystroke.
  React.useLayoutEffect(fit, [fit, value]);

  return (
    <label style={{ display: block ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 'var(--space-3)', width: block ? '100%' : undefined }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <span
        style={{
          display: 'flex', padding: `${PAD_Y}px 12px`,
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: error
            ? 'inset 0 0 0 1.5px var(--danger)'
            : focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          transition: 'var(--transition-control)',
          opacity: disabled ? 0.5 : 1, ...style,
        }}
      >
        <textarea
          ref={ref}
          // The shell around this paints the focus treatment; without this the
          // global :focus-visible ring draws a second one inside it.
          data-focus-ring="delegated"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          onChange={(e) => { fit(); onChange?.(e); }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            font: 'inherit', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)',
            fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)',
            lineHeight: `${LINE}px`,
            // Height comes from `rows` and then from the content; the handle is
            // still there for anyone who wants more than maxRows allows.
            resize: 'vertical',
            minHeight: rows * LINE,
            display: 'block',
          }}
          {...rest}
        />
      </span>
      {/* --text-muted, not --text-faint: a hint is 12px, so it is small text and
          has to clear 4.5:1. Same fix as Input and the three toggles. */}
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
