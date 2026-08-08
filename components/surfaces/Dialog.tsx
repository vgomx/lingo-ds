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

  /*
   * Escape closes it.
   *
   * This was missing for as long as the component existed, and the gap hid
   * behind the mouse: clicking the scrim worked, so nobody pressed the key.
   * A modal that takes the whole screen and cannot be dismissed from the
   * keyboard is a trap for anyone not using a pointer.
   *
   * Above the early returns because it is a hook, and `keydown` rather than
   * `keyup` so a control inside the dialog cannot swallow the key first.
   * Anything that wants Escape for itself — an open Select menu — stops the
   * event before it reaches here.
   */
  React.useEffect(() => {
    if (!open || !onClose) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, display: 'grid',
        // minmax(0, 1fr), not the implicit `auto`. An auto column sizes to its
        // item, so the panel's own `maxWidth: 100%` resolved against a column
        // that had already grown to fit it — 460px of dialog sat on a 375px
        // screen with 97 of it off the right edge, and the cap that was supposed
        // to prevent exactly that was measuring itself.
        gridTemplateColumns: 'minmax(0, 1fr)',
        // Full-bleed on a phone: a dialog this tall has nowhere to be inset to,
        // and the scrim around it was only ever a hairline of blur.
        placeItems: isMobile ? 'stretch' : 'center',
        padding: isMobile ? 0 : 'var(--space-8)',
        // Above the app's own chrome — a bottom dock or tab bar sits in the 40s
        // and was painting over the footer — and below tooltips at 50, so a
        // tooltip raised from inside a dialog still lands on top of it.
        background: 'var(--surface-overlay)', backdropFilter: 'var(--blur-scrim)', zIndex: 48,
        animation: 'lt-fade var(--dur-base) var(--ease-out)',
      }}
      onClick={onClose}
    >
      <style>
        {'@keyframes lt-fade{from{opacity:0}to{opacity:1}}'
          + '@keyframes lt-pop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}'
          // Full-bleed, so it comes up from the edge it is attached to
          // rather than growing out of the middle of the screen.
          + '@keyframes lt-sheet{from{transform:translateY(100%)}to{transform:none}}'}
      </style>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isMobile ? '100%' : width,
          maxWidth: '100%',
          height: isMobile ? '100%' : undefined,
          maxHeight: '100%',
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface-app)',
          borderRadius: isMobile ? 0 : 'var(--radius-dialog)',
          boxShadow: isMobile ? 'none' : 'var(--shadow-xl)',
          animation: isMobile
            ? 'lt-sheet var(--dur-slow) var(--ease-out)'
            : 'lt-pop var(--dur-slow) var(--ease-spring)',
          overflow: 'hidden',
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)',
            padding: 'var(--pad-dialog)', paddingBottom: 'var(--space-4)',
            // Full-bleed puts the title where the notch is, and the scrim cannot
            // carry that: it is the panel that reaches the top edge.
            //
            // Both arms are spelled out. `undefined` here does not fall back to
            // the shorthand above — it replaces its top value in the object and
            // React then skips the property, so every dialog on a desktop lost
            // its top padding entirely and sat its title on the panel's edge.
            paddingTop: isMobile
              ? 'calc(var(--pad-dialog) + env(safe-area-inset-top, 0px))'
              : 'var(--pad-dialog)',
          }}
        >
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
        {children && (
          <div style={{ padding: '0 var(--pad-dialog)', overflowY: 'auto', flex: isMobile ? 1 : undefined, minHeight: 0 }}>
            {children}
          </div>
        )}
        {footer && (
          <div
            style={{
              display: 'flex', justifyContent: 'flex-end', gap: 'var(--gap-inline)',
              padding: 'var(--pad-dialog)', marginTop: 'var(--space-4)',
              background: 'var(--surface-sidebar)',
              // flex-none so the body scrolls and the actions stay reachable
              // rather than being pushed off a full-height sheet.
              flex: 'none',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
