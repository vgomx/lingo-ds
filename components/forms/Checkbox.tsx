import * as React from 'react';

export interface CheckboxOwnProps {
  /** Controlled state; omit to let the component own it. */
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  hint?: string;
  disabled?: boolean;
  onChange?: (e: React.MouseEvent, next: boolean) => void;
  style?: React.CSSProperties;
}

export interface CheckboxProps
  extends CheckboxOwnProps,
    Omit<React.ComponentPropsWithoutRef<'label'>, keyof CheckboxOwnProps> {}

/** Checkbox with a rounded 20px box and a spring-in tick. */
export function Checkbox({ checked, defaultChecked, label, hint, disabled = false, onChange, style, ...rest }: CheckboxProps) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked === undefined ? inner : checked;
  const toggle = (e: React.MouseEvent) => {
    if (disabled) return;
    if (checked === undefined) setInner(!isOn);
    onChange && onChange(e, !isOn);
  };
  return (
    <label
      onClick={toggle}
      style={{
        display: 'inline-flex', alignItems: hint ? 'flex-start' : 'center', gap: 'var(--space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: 20, height: 20, flex: 'none', borderRadius: 'var(--radius-sm)',
          display: 'grid', placeItems: 'center',
          background: isOn ? 'var(--brand)' : 'var(--surface-input)',
          boxShadow: isOn ? 'none' : 'inset 0 0 0 1.5px var(--border-strong)',
          transition: 'var(--transition-control)', marginTop: hint ? 2 : 0,
        }}
      >
        {isOn && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)' }}>{label}</span>
        {hint && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: 'var(--text-faint)' }}>{hint}</span>}
      </span>
    </label>
  );
}
