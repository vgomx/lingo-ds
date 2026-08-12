import * as React from 'react';
import { useIsTouch } from '../../hooks/useBreakpoint';
import { playSound } from '../../sound/sounds';
import type { SoundName } from '../../sound/sounds';

export interface MenuItemProps {
  /** What the press sounds like. Defaults to `tap`; `false` where the caller has its own. */
  sound?: SoundName | false;
  children: React.ReactNode;
  /** Marks the current choice — the language you are in, not the one under the cursor. */
  selected?: boolean;
  onClick?: () => void;
  /**
   * A row that opens a menu rather than being one. It keeps the appearance and
   * the hover, and drops `role="menuitem"` — which would have promised a menu it
   * is a member of, when what it has is one it opens.
   */
  opensMenu?: boolean;
  expanded?: boolean;
  label?: string;
}

/**
 * One row in a dropdown.
 *
 * It began in the product as a way of stopping two menus drawing their own rows
 * and drifting apart — only one of them dressed the selected state. By the time
 * a third and fourth menu wanted it, and a Select in here grew rows with the
 * same touch-target problem, keeping it over there meant the design system and
 * the app were solving one problem twice. Its own note said as much: if a third
 * menu appears, this belongs beside `SidebarItem`. There are four.
 *
 * Hover and focus resolve to the same appearance on purpose. A menu is opened as
 * often by keyboard as by mouse, and a keyboard user arrowing through rows that
 * look identical has no idea which one Enter will take.
 *
 * `SidebarItem` is the same idea in a different context — a persistent list you
 * navigate — where this is a transient list you pick from and dismiss.
 */
export function MenuItem({ children, selected = false, sound = 'tap', onClick, opensMenu = false, expanded, label }: MenuItemProps) {
  const [active, setActive] = React.useState(false);
  /*
   * Bigger under a thumb than under a cursor.
   *
   * 38px is comfortable to click and under the 44px anyone designing for touch
   * aims at — and these rows are stacked, so the miss lands on the neighbour
   * rather than on nothing. That matters most in the dock's More sheet, where
   * the rows are the only way to reach half the app on a phone.
   *
   * Keyed on touch rather than on width: a narrow desktop window is still a
   * mouse, and does not need the extra height.
   */
  const touch = useIsTouch();

  return (
    <button
      type="button"
      role={opensMenu ? undefined : 'menuitem'}
      aria-haspopup={opensMenu || undefined}
      aria-expanded={opensMenu ? expanded : undefined}
      aria-label={label}
      aria-current={selected || undefined}
      onClick={() => { if (sound) playSound(sound); onClick && onClick(); }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: touch ? 12 : 10, width: '100%',
        height: touch ? 48 : 38, padding: touch ? '0 14px' : '0 10px', border: 'none', cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        // Selected is a state of the data; active is a state of the pointer. A
        // selected row still has to answer the cursor, so it gets the brighter
        // step rather than being frozen at its resting fill.
        background: selected
          ? (active ? 'var(--surface-raised-hover)' : 'var(--surface-card)')
          : (active ? 'var(--surface-hover)' : 'transparent'),
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 800, textAlign: 'left',
        transition: 'var(--transition-control)',
      }}
    >
      {children}
    </button>
  );
}
