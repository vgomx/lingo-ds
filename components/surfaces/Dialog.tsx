import * as React from 'react';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../../hooks/useBreakpoint';
import { IconButton } from '../actions/IconButton';

export interface DialogOwnProps {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer actions, right-aligned on the darker footer bar. */
  footer?: React.ReactNode;
  width?: number;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface DialogProps
  extends DialogOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof DialogOwnProps> {}

/**
 * Centred modal over a blurred scrim. Body scrolls; header and footer stay put.
 *
 * Portalled to <body>. It used to position itself `absolute`, which sizes the
 * scrim to the nearest positioned ancestor rather than to the screen — so a
 * dialog opened from anything inside a positioned element covered only that
 * element. Opening one from the top bar's help menu dimmed the top bar and
 * nothing else. `fixed` alone would not fix it either: the top bar has a
 * backdrop-filter, and that makes a containing block for fixed descendants too.
 * A modal should not be positioned by whatever happens to contain its trigger.
 */
export function Dialog({ open = true, title, description, children, footer, width = 440, onClose, style, ...rest }: DialogProps) {
  const isMobile = useIsMobile();
  if (!open) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        // --space-4 on a phone: 32px each side takes a sixth of a 375px screen
        // away from a dialog that already caps at 100%.
        position: 'fixed', inset: 0, display: 'grid', placeItems: 'center',
        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
        background: 'var(--surface-overlay)', backdropFilter: 'var(--blur-scrim)', zIndex: 40,
        animation: 'lt-fade var(--dur-base) var(--ease-out)',
      }}
      onClick={onClose}
    >
      <style>{'@keyframes lt-fade{from{opacity:0}to{opacity:1}}@keyframes lt-pop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}'}</style>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column',
          background: 'var(--surface-app)', borderRadius: 'var(--radius-dialog)', boxShadow: 'var(--shadow-xl)',
          animation: 'lt-pop var(--dur-slow) var(--ease-spring)', overflow: 'hidden', ...style,
        }}
        {...rest}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', padding: 'var(--pad-dialog)', paddingBottom: 'var(--space-4)' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], color: 'var(--text-strong)', lineHeight: 1.15 }}>{title}</h2>
            {description && <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>{description}</p>}
          </div>
          {onClose && (
            <IconButton label="Close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </IconButton>
          )}
        </div>
        {children && <div style={{ padding: '0 var(--pad-dialog)', overflowY: 'auto' }}>{children}</div>}
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--gap-inline)', padding: 'var(--pad-dialog)', marginTop: 'var(--space-4)', background: 'var(--surface-sidebar)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
