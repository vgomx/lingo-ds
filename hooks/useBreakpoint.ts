import * as React from 'react';

/**
 * Breakpoints, matching the `--bp-*` tokens.
 *
 * Two of them, not five. The system has one layout that changes shape — the app
 * shell — and it changes twice: when the deck sidebar stops fitting beside the
 * content, and when the tool rail stops being worth 72px of a phone. Everything
 * else is fluid and needs no breakpoint at all.
 */
export const BREAKPOINTS = { tablet: 768, desktop: 1024 } as const;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const query = (bp: Breakpoint) => (bp === 'desktop'
  ? `(min-width: ${BREAKPOINTS.desktop}px)`
  : `(min-width: ${BREAKPOINTS.tablet}px)`);

function read(): Breakpoint {
  if (typeof window === 'undefined' || !window.matchMedia) return 'desktop';
  if (window.matchMedia(query('desktop')).matches) return 'desktop';
  if (window.matchMedia(query('tablet')).matches) return 'tablet';
  return 'mobile';
}

/**
 * The current breakpoint, updated on resize and on rotation.
 *
 * A hook rather than CSS because the shell does not merely restyle across these
 * points — it changes what exists. A rail that becomes a drawer is a different
 * tree, not a different width, and `display: none` on a nav that still traps
 * focus and still renders its contents is not the same thing as not having one.
 *
 * matchMedia rather than a resize listener: it fires only when a boundary is
 * actually crossed, instead of on every pixel of a drag.
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>(read);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const lists = [window.matchMedia(query('tablet')), window.matchMedia(query('desktop'))];
    const onChange = () => setBp(read());
    lists.forEach((l) => l.addEventListener('change', onChange));
    // The first client render may have read a stale value; settle it now.
    onChange();
    return () => lists.forEach((l) => l.removeEventListener('change', onChange));
  }, []);

  return bp;
}

/** Convenience for the common "phone or not" question. */
export function useIsMobile(): boolean {
  return useBreakpoint() === 'mobile';
}

/**
 * Whether the primary pointer is a finger.
 *
 * Separate from `useBreakpoint`, because the two questions are different and
 * conflating them gets tablets wrong: layout is a question about *width* (does
 * the sidebar fit?), target size is a question about *pointer* (can a fingertip
 * hit it?). A 768px iPad needs 44px targets and a 900px laptop window does not,
 * and only `pointer: coarse` tells them apart.
 */
export function useIsTouch(): boolean {
  const [touch, setTouch] = React.useState(() => (
    typeof window !== 'undefined' && !!window.matchMedia
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  ));

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const list = window.matchMedia('(pointer: coarse)');
    const onChange = () => setTouch(list.matches);
    list.addEventListener('change', onChange);
    onChange();
    return () => list.removeEventListener('change', onChange);
  }, []);

  return touch;
}

/**
 * Whether the reader has asked for less motion.
 *
 * `tokens/motion.css` zeroes every duration under this query, which is right for
 * a transition but not for an effect that has no duration to zero — a card that
 * tilts instantly instead of smoothly is worse, not calmer. Anything that moves
 * because the pointer moved has to check this and simply not run.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(() => (
    typeof window !== 'undefined' && !!window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ));

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const list = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(list.matches);
    list.addEventListener('change', onChange);
    onChange();
    return () => list.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
