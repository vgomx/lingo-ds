import * as React from 'react';

export type LogoVariant =
  | 'wordmark-white' | 'wordmark-black' | 'wordmark-violet'
  | 'icon-dark' | 'icon-light' | 'icon-violet'
  | 'mark-dark' | 'mark-light' | 'mark-violet'
  | 'stack-dark' | 'stack-light' | 'stack-violet' | 'stack-brand';

const FILES: Record<LogoVariant, string> = {
  'wordmark-white': 'logo-wordmark-white.svg',
  'wordmark-black': 'logo-wordmark-black.svg',
  'wordmark-violet': 'logo-wordmark-violet.svg',
  'icon-dark': 'app-icon-dark.svg',
  'icon-light': 'app-icon-light.svg',
  'icon-violet': 'app-icon-violet.svg',
  'mark-dark': 'mark-dark.svg',
  'mark-light': 'mark-light.svg',
  'mark-violet': 'mark-violet.svg',
  // The reduced mark with TOOLBOX beneath it, for square-ish space where the
  // horizontal wordmark would have to be set too small to read: a splash, an
  // about screen, or the app's own tool rail. `stack-brand` takes its fill from
  // currentColor. Comfortable from 96px tall; 60px is the floor, below which the
  // lettering closes up and only the mark still reads. Under that, use mark-*.
  'stack-dark': 'stack-dark.svg',
  'stack-light': 'stack-light.svg',
  'stack-violet': 'stack-violet.svg',
  'stack-brand': 'stack-brand.svg',
};

export interface LogoOwnProps {
  variant?: LogoVariant;
  height?: number;
  /** Path from the consuming page to the design-system root, e.g. "../..". */
  base?: string;
  title?: string;
  style?: React.CSSProperties;
}

export interface LogoProps
  extends LogoOwnProps,
    Omit<React.ComponentPropsWithoutRef<'img'>, keyof LogoOwnProps> {}

/**
 * Renders an approved Lingo Toolbox lockup from assets/logo/.
 * `base` is the path from the consuming page to the design-system root.
 */
export function Logo({ variant = 'wordmark-white', height = 40, base = '', title = 'Lingo Toolbox', style, ...rest }: LogoProps) {
  const file = FILES[variant] || FILES['wordmark-white'];
  const prefix = base ? base.replace(/\/$/, '') + '/' : '';
  return (
    <img
      src={prefix + 'assets/logo/' + file}
      alt={title}
      style={{ height, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}
