import * as React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

const HEIGHTS: Record<InputSize, string> = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)',
};

export interface InputOwnProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  size?: InputSize;
  /** Uppercase micro-label above the field. */
  label?: string;
  hint?: string;
  /** Error text; also switches the ring to danger red. */
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  block?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export interface InputProps
  extends InputOwnProps,
    Omit<React.ComponentPropsWithoutRef<'input'>, keyof InputOwnProps> {}

/** Single-line text field. Sunken well on dark surfaces, hairline box on light. */
export function Input({
  value, defaultValue, placeholder, type = 'text', size = 'md', label, hint, error,
  iconLeft = null, iconRight = null, disabled = false, block = true, onChange, style, ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: block ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 'var(--space-3)', width: block ? '100%' : undefined }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <span
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          height: HEIGHTS[size] || HEIGHTS.md, padding: '0 12px',
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: error
            ? 'inset 0 0 0 1.5px var(--danger)'
            : focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          color: 'var(--text-faint)', /* faint-ok: inherited by iconLeft/iconRight; the input sets its own colour */ transition: 'var(--transition-control)',
          opacity: disabled ? 0.5 : 1, ...style,
        }}
      >
        {iconLeft}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            font: 'inherit', fontFamily: 'var(--font-ui)', fontSize: size === 'sm' ? 'var(--fs-13)' : 'var(--fs-14)',
            fontWeight: 'var(--fw-medium)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)',
          }}
          {...rest}
        />
        {iconRight}
      </span>
      {/* --text-muted, not --text-faint: a hint is 12px, so it is small text and
          has to clear 4.5:1. Faint measured 3.27 in light and 2.53 in dark against
          the surfaces these controls actually sit on. Checkbox, Radio and Switch
          carry the same hint and the same fix. */}
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
