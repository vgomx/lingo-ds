import * as React from 'react';
import { useIsTouch } from '../../hooks/useBreakpoint';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface SwitchOwnProps {
  /**
   * What the flip sounds like. `toggle` rather than `tap` — the same click a
   * little lower and longer, which is what the palette keeps for a control that
   * changes state rather than one that goes somewhere.
   */
  sound?: SoundName | false;
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
export function Switch({ checked, defaultChecked, label, hint, size = 'md', disabled = false, sound = 'toggle', onChange, style, ...rest }: SwitchProps) {
  const isTouch = useIsTouch();
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked === undefined ? inner : checked;
  const w = size === 'sm' ? 34 : 44;
  const h = size === 'sm' ? 20 : 26;
  const knob = h - 8;
  const toggle = () => {
    if (disabled) return;
    // Before the handler, which is what the sound switch in the app depends on:
    // turning sound *off* still gets the click that confirms the press, because
    // it plays while sound is still on. Turning it on is silent here and is the
    // caller's to answer — playSound is a no-op while the setting is off.
    if (sound) playSound(sound);
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
        // A settings row is as touchable as a button; its height comes from the
        // label and hint, which lands at 41px — just under the 44 floor.
        minHeight: isTouch ? 'var(--control-h-lg)' : undefined,
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
