import * as React from 'react';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface RadioOwnProps {
  /** What the choice sounds like. `toggle`, like every control that flips a state. */
  sound?: SoundName | false;
  checked?: boolean;
  label?: React.ReactNode;
  hint?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
  style?: React.CSSProperties;
}

export interface RadioProps
  extends RadioOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof RadioOwnProps | 'onChange'> {}

/**
 * Single choice within a RadioGroup — also usable standalone.
 *
 * A `<button role="radio">` rather than a `<label>` with a click handler, which
 * no keyboard could reach. Unchecked radios stay focusable: a group where only
 * the selected option can be tabbed to is a group you cannot change by keyboard.
 */
export function Radio({ checked = false, label, hint, name, value, disabled = false, sound = 'toggle', onChange, style, ...rest }: RadioProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        if (sound) playSound(sound);
        onChange && onChange(value);
      }}
      style={{
        display: 'inline-flex', alignItems: hint ? 'flex-start' : 'center', gap: 'var(--space-4)',
        padding: 0, border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      data-name={name}
      {...rest}
    >
      <span
        style={{
          width: 20, height: 20, flex: 'none', borderRadius: 'var(--radius-pill)',
          display: 'grid', placeItems: 'center', marginTop: hint ? 2 : 0,
          background: 'var(--surface-input)',
          boxShadow: checked ? 'inset 0 0 0 6px var(--brand)' : 'inset 0 0 0 1.5px var(--border-strong)',
          transition: 'var(--transition-control)',
        }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)' }}>{label}</span>
        {hint && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', color: 'var(--text-muted)' }}>{hint}</span>}
      </span>
    </button>
  );
}
