import * as React from 'react';

export interface SidebarItemOwnProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  /** Right-aligned count or timestamp. */
  meta?: React.ReactNode;
  active?: boolean;
  muted?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface SidebarItemProps
  extends SidebarItemOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof SidebarItemOwnProps> {}

/** Row in the tool sidebar: icon + label, violet-tinted when selected. */
export function SidebarItem({ icon, label, meta, active = false, muted = false, badge, onClick, style, ...rest }: SidebarItemProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '100%',
        height: 34, padding: '0 8px', border: 'none', cursor: 'pointer', textAlign: 'left',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--surface-selected)' : hover ? 'var(--surface-hover)' : 'transparent',
        color: active ? 'var(--text-strong)' : muted ? 'var(--text-faint)' : hover ? 'var(--text-body)' : 'var(--text-muted)',
        transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: 'grid', placeItems: 'center', flex: 'none', opacity: active ? 1 : 0.8 }}>{icon}</span>}
      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'] }}>
        {label}
      </span>
      {meta && <span style={{ flex: 'none', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], color: 'var(--text-faint)' }}>{meta}</span>}
      {badge}
    </button>
  );
}
