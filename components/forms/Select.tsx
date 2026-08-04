import * as React from 'react';

export interface SelectOption { value: string; label: string }

export interface SelectOwnProps {
  value?: string;
  defaultValue?: string;
  /** Strings or {value,label} pairs. */
  options?: (string | SelectOption)[];
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  block?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

export interface SelectProps
  extends SelectOwnProps,
    Omit<React.ComponentPropsWithoutRef<'select'>, keyof SelectOwnProps> {}

/** Native select styled as a sunken well with a chevron affordance. */
export function Select({ value, defaultValue, options = [], label, size = 'md', disabled = false, block = true, onChange, style, ...rest }: SelectProps) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  return (
    <label style={{ display: block ? 'flex' : 'inline-flex', flexDirection: 'column', gap: 'var(--space-3)', width: block ? '100%' : undefined }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <span
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', height,
          background: 'var(--surface-input)', borderRadius: 'var(--radius-control)',
          boxShadow: focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
          opacity: disabled ? 0.5 : 1, transition: 'var(--transition-control)', ...style,
        }}
      >
        <select
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none', border: 'none', outline: 'none', background: 'transparent',
            width: '100%', height: '100%', padding: '0 34px 0 12px', cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-ui)', fontSize: size === 'sm' ? 'var(--fs-13)' : 'var(--fs-14)',
            fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)',
          }}
          {...rest}
        >
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', right: 10, pointerEvents: 'none', color: 'var(--text-muted)' }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}
