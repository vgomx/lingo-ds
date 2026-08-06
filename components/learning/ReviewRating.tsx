import * as React from 'react';
import { useIsMobile } from '../../hooks/useBreakpoint';
import { Button, type ButtonVariant } from '../actions/Button';

export interface ReviewGrade { key: string; label: string; due?: string; variant?: ButtonVariant; shortcut?: string }

const GRADES: ReviewGrade[] = [
  { key: 'again', label: 'Again', due: '<1m', variant: 'danger', shortcut: '1' },
  { key: 'hard', label: 'Hard', due: '6m', variant: 'secondary', shortcut: '2' },
  { key: 'good', label: 'Good', due: '1d', variant: 'success', shortcut: '3' },
  { key: 'easy', label: 'Easy', due: '4d', variant: 'primary', shortcut: '4' },
];

export interface ReviewRatingOwnProps {
  /** Defaults to Again / Hard / Good / Easy with 1-4 shortcuts. */
  grades?: ReviewGrade[];
  onGrade?: (key: string) => void;
  showDue?: boolean;
  showShortcuts?: boolean;
  style?: React.CSSProperties;
}

export interface ReviewRatingProps
  extends ReviewRatingOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ReviewRatingOwnProps> {}

/** The four-grade spaced-repetition answer row shown once a card is flipped. */
export function ReviewRating({ grades = GRADES, onGrade, showDue = true, showShortcuts = true, style, ...rest }: ReviewRatingProps) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'grid', // minmax(0,1fr), not 1fr: a bare 1fr floors at the content width, so in a
      // narrow container — the landing page's product island at 283px — the four
      // buttons refused to shrink and overflowed instead.
      gridTemplateColumns: isMobile ? 'repeat(2,minmax(0,1fr))' : `repeat(${grades.length},minmax(0,1fr))`, gap: 'var(--space-4)', width: '100%', ...style }} {...rest}>
      {grades.map((g) => (
        <div key={g.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* The grade itself has a voice — see SOUNDS.gradeAgain and friends. */}
          <Button variant={g.variant} size="lg" block sound={false} onClick={() => onGrade && onGrade(g.key)}>
            {g.label}
            {showShortcuts && (
              <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', opacity: 0.7, marginLeft: 2 }}>{g.shortcut}</kbd>
            )}
          </Button>
          {showDue && (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-bold)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-wide)', color: 'var(--text-muted)' }}>{g.due}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export { GRADES as DEFAULT_GRADES };
