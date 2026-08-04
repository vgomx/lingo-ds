import * as React from 'react';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'brand';

const TONES: Record<ToastTone, { accent: string; icon: string }> = {
  neutral: { accent: 'var(--text-faint)', icon: 'info' },
  success: { accent: 'var(--success)', icon: 'circle-check' },
  warning: { accent: 'var(--warning)', icon: 'triangle-alert' },
  danger: { accent: 'var(--danger)', icon: 'circle-x' },
  brand: { accent: 'var(--brand)', icon: 'sparkles' },
};

export interface ToastOwnProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface ToastProps
  extends ToastOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ToastOwnProps> {}

/** Transient confirmation. Slides up from the bottom-centre; auto-dismisses. */
export function Toast({ title, description, tone = 'success', icon, action, onClose, style, ...rest }: ToastProps) {
  const t = TONES[tone] || TONES.success;
  return (
    <div
      role="status"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', width: 340, maxWidth: '100%',
        padding: '14px', background: 'var(--ink-800)', borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg), var(--ring-inset)',
        animation: 'lt-toast var(--dur-slow) var(--ease-spring)', ...style,
      }}
      {...rest}
    >
      <style>{'@keyframes lt-toast{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}'}</style>
      {icon && (
        <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'color-mix(in oklab, ' + t.accent + ' 20%, transparent)', color: t.accent }}>
          {icon}
        </span>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)' }}>{title}</span>
        {description && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-13)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</span>}
      </div>
      {action}
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)', padding: 0, marginTop: 2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
