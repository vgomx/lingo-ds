import * as React from 'react';

export interface SwitchOwnProps {
  checked?: boolean;
  defaultChecked?: boolean;
  /** Settings-row label; the switch right-aligns itself against it. */
  label?: string;
  hint?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  style?: React.CSSProperties;
}

export interface SwitchProps
  extends SwitchOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof SwitchOwnProps | 'onChange'> {}

/**
 * Pill toggle for settings rows. Track goes mint when on — never violet.
 *
 * A real `<button role="switch">`, not a `<label>` with a click handler. As a
 * label it was unreachable by keyboard and absent from the accessibility tree
 * entirely — a settings control that only a mouse could find.
 */
export function Switch({ checked, defaultChecked, label, hint, size = 'md', disabled = false, onChange, style, ...rest }: SwitchProps) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked === undefined ? inner : checked;
  const w = size === 'sm' ? 34 : 44;
  const h = size === 'sm' ? 20 : 26;
  const knob = h - 8;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!isOn);
    onChange && onChange(!isOn);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-5)', justifyContent: 'space-between',
        width: '100%', padding: 0, border: 'none', background: 'transparent', textAlign: 'left',
        font: 'inherit', borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      {...rest}
    >
      {(label || hint) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)' }}>{label}</span>}
          {hint && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: 'var(--text-muted)' }}>{hint}</span>}
        </span>
      )}
      <span
        style={{
          width: w, height: h, flex: 'none', borderRadius: 'var(--radius-pill)', position: 'relative',
          background: isOn ? 'var(--success)' : 'var(--border-strong)',
          transition: 'background-color var(--dur-base) var(--ease-standard)',
        }}
      >
        <span
          style={{
            position: 'absolute', top: 4, left: isOn ? w - knob - 4 : 4, width: knob, height: knob,
            borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--dur-base) var(--ease-spring)',
          }}
        />
      </span>
    </button>
  );
}
