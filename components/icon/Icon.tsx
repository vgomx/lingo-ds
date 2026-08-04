import * as React from 'react';
import { ICON_PATHS } from './iconPaths';

export interface IconOwnProps {
  /** Lucide icon name, kebab-case (e.g. `flame`, `git-branch`, `volume-2`). See ICON_NAMES. */
  name: string;
  /** Rendered box in px. 16 inside dense UI, 20 default, 24+ for feature marks. */
  size?: number;
  /** 2 everywhere; 2.25 only for oversized display icons. */
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export interface IconProps
  extends IconOwnProps,
    Omit<React.ComponentPropsWithoutRef<'svg'>, keyof IconOwnProps> {}

/**
 * Lucide-derived 24x24 line icon, 2px stroke, round caps and joins.
 * Colour comes from `currentColor`; never hard-code a fill.
 */
export function Icon({ name, size = 20, strokeWidth = 2, style, ...rest }: IconProps) {
  const markup = ICON_PATHS[name];
  if (!markup) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size, display: 'inline-block', borderRadius: 3, boxShadow: 'inset 0 0 0 1.5px currentColor', opacity: 0.35, ...style }}
        title={'missing icon: ' + name}
      />
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flex: 'none', ...style }}
      dangerouslySetInnerHTML={{ __html: markup }}
      {...rest}
    />
  );
}
