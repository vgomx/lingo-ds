/* @ds-bundle: {"format":4,"namespace":"LingoToolboxDesignSystem_898611","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/data-display/ProgressBar.jsx"},{"name":"StreakPill","sourcePath":"components/data-display/StreakPill.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"ICON_PATHS","sourcePath":"components/icon/iconPaths.js"},{"name":"ICON_NAMES","sourcePath":"components/icon/iconPaths.js"},{"name":"EtymologyNode","sourcePath":"components/learning/EtymologyNode.jsx"},{"name":"Flashcard","sourcePath":"components/learning/Flashcard.jsx"},{"name":"ReviewRating","sourcePath":"components/learning/ReviewRating.jsx"},{"name":"RailTile","sourcePath":"components/navigation/RailTile.jsx"},{"name":"SidebarItem","sourcePath":"components/navigation/SidebarItem.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Dialog","sourcePath":"components/surfaces/Dialog.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"4ea39f7f05f9","components/actions/IconButton.jsx":"c1bf64d5bc22","components/brand/Logo.jsx":"11901647350e","components/data-display/Avatar.jsx":"204d13615a79","components/data-display/Badge.jsx":"94f19840a886","components/data-display/ProgressBar.jsx":"978ab2a263bf","components/data-display/StreakPill.jsx":"c740ada2efd9","components/data-display/Tag.jsx":"7e448c7eaade","components/feedback/Toast.jsx":"6dc7c2e88dae","components/feedback/Tooltip.jsx":"694789b033f7","components/forms/Checkbox.jsx":"6a84786b609c","components/forms/Input.jsx":"5e3521b68f23","components/forms/Radio.jsx":"47f40018a516","components/forms/Select.jsx":"eb6fb66e390a","components/forms/Switch.jsx":"5ed508b8e434","components/icon/Icon.jsx":"d10f13aff44e","components/icon/iconPaths.js":"4d2b08ada65c","components/learning/EtymologyNode.jsx":"788d63d644a6","components/learning/Flashcard.jsx":"477a6dae947c","components/learning/ReviewRating.jsx":"c7e8a260361e","components/navigation/RailTile.jsx":"922829474c96","components/navigation/SidebarItem.jsx":"7fa6e3013bb4","components/navigation/Tabs.jsx":"530cbf737cec","components/surfaces/Card.jsx":"ec57feb15f8e","components/surfaces/Dialog.jsx":"50659737f136","ui_kits/app/AppShell.jsx":"409cb9f373ea","ui_kits/app/EtymologyScreen.jsx":"a3430ad56665","ui_kits/app/HomeScreen.jsx":"f3cd51a9f14f","ui_kits/app/LibraryScreen.jsx":"2871a60fb64a","ui_kits/app/ReviewScreen.jsx":"be0a322ac0d6","ui_kits/app/SettingsScreen.jsx":"54120e5390a8","ui_kits/marketing/MarketingFooter.jsx":"c45aadc22200","ui_kits/marketing/MarketingHero.jsx":"80e3443f7481","ui_kits/marketing/MarketingNav.jsx":"f41ef9a26e20","ui_kits/marketing/MarketingOpenSource.jsx":"3ad5752156f6","ui_kits/marketing/MarketingTools.jsx":"4916fc172be7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LingoToolboxDesignSystem_898611 = window.LingoToolboxDesignSystem_898611 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 'var(--control-h-sm)',
    padding: '0 12px',
    fontSize: 'var(--fs-13)',
    gap: '6px',
    icon: 14
  },
  md: {
    height: 'var(--control-h-md)',
    padding: '0 16px',
    fontSize: 'var(--fs-14)',
    gap: '8px',
    icon: 16
  },
  lg: {
    height: 'var(--control-h-lg)',
    padding: '0 22px',
    fontSize: 'var(--fs-16)',
    gap: '8px',
    icon: 18
  },
  xl: {
    height: 'var(--control-h-xl)',
    padding: '0 28px',
    fontSize: 'var(--fs-18)',
    gap: '10px',
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    rest: {
      background: 'var(--brand)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-chunk)'
    },
    hover: {
      background: 'var(--brand-hover)'
    }
  },
  secondary: {
    rest: {
      background: 'var(--surface-raised)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--shadow-chunk-neutral)'
    },
    hover: {
      background: 'var(--ink-400)'
    }
  },
  ghost: {
    rest: {
      background: 'transparent',
      color: 'var(--text-body)'
    },
    hover: {
      background: 'var(--surface-hover)',
      color: 'var(--text-strong)'
    }
  },
  outline: {
    rest: {
      background: 'transparent',
      color: 'var(--text-strong)',
      boxShadow: 'inset 0 0 0 1.5px var(--border-strong)'
    },
    hover: {
      background: 'var(--surface-hover)',
      boxShadow: 'inset 0 0 0 1.5px var(--text-faint)'
    }
  },
  success: {
    rest: {
      background: 'var(--success)',
      color: 'var(--on-success)',
      boxShadow: '0 3px 0 var(--mint-700)'
    },
    hover: {
      background: 'color-mix(in oklab, var(--success) 82%, #fff)'
    }
  },
  danger: {
    rest: {
      background: 'var(--danger)',
      color: '#fff',
      boxShadow: '0 3px 0 var(--red-700)'
    },
    hover: {
      background: 'color-mix(in oklab, var(--danger) 82%, #fff)'
    }
  },
  link: {
    rest: {
      background: 'transparent',
      color: 'var(--text-link)',
      padding: 0,
      height: 'auto'
    },
    hover: {
      color: 'var(--text-strong)',
      textDecoration: 'underline'
    }
  }
};

/** Primary action control. Chunky bottom edge + 1px press travel is the brand's signature. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const isFlat = variant === 'ghost' || variant === 'link' || variant === 'outline';
  const buttonStyle = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    border: 'none',
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-button)',
    fontFamily: 'var(--font-ui)',
    fontSize: s.fontSize,
    fontWeight: 'var(--fw-bold)',
    lineHeight: 1,
    letterSpacing: 'var(--ls-normal)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'var(--transition-control)',
    ...v.rest,
    ...(hover && !disabled && !loading ? v.hover : null),
    ...(press && !disabled && !loading && !isFlat ? {
      transform: 'translateY(var(--press-translate))',
      boxShadow: variant === 'primary' ? 'var(--shadow-chunk-pressed)' : '0 1px 0 rgba(0,0,0,.35)'
    } : null),
    ...(press && !disabled && isFlat ? {
      transform: 'scale(var(--press-scale))'
    } : null),
    ...(disabled ? {
      opacity: 0.45,
      boxShadow: 'none'
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled || loading,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: buttonStyle
  }, rest), loading ? /*#__PURE__*/React.createElement(Spinner, {
    size: s.icon
  }) : iconLeft, children, iconRight);
}
function Spinner({
  size
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'inline-block',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'lt-spin .7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes lt-spin{to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 28,
  md: 36,
  lg: 44
};

/** Square/round icon-only control for toolbars, card corners and the app rail. */
function IconButton({
  children,
  label,
  size = 'md',
  variant = 'ghost',
  shape = 'rounded',
  active = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const variants = {
    ghost: {
      background: active ? 'var(--surface-active)' : 'transparent',
      color: active ? 'var(--text-strong)' : 'var(--text-muted)'
    },
    solid: {
      background: 'var(--surface-raised)',
      color: 'var(--text-strong)'
    },
    brand: {
      background: 'var(--brand)',
      color: 'var(--text-on-brand)'
    },
    danger: {
      background: 'transparent',
      color: 'var(--danger)'
    }
  };
  const hovers = {
    ghost: {
      background: 'var(--surface-hover)',
      color: 'var(--text-strong)'
    },
    solid: {
      background: 'var(--ink-400)'
    },
    brand: {
      background: 'var(--brand-hover)'
    },
    danger: {
      background: 'var(--danger-subtle)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      width: px,
      height: px,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: shape === 'circle' ? 'var(--radius-pill)' : 'var(--radius-control)',
      transition: 'var(--transition-control)',
      ...variants[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      ...(press && !disabled ? {
        transform: 'scale(var(--press-scale))'
      } : null),
      ...(disabled ? {
        opacity: 0.4
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FILES = {
  'wordmark-white': 'logo-wordmark-white.svg',
  'wordmark-black': 'logo-wordmark-black.svg',
  'wordmark-violet': 'logo-wordmark-violet.svg',
  'icon-dark': 'app-icon-dark.svg',
  'icon-light': 'app-icon-light.svg',
  'icon-violet': 'app-icon-violet.svg',
  'mark-dark': 'mark-dark.svg',
  'mark-light': 'mark-light.svg',
  'mark-violet': 'mark-violet.svg'
};

/**
 * Renders an approved Lingo Toolbox lockup from assets/logo/.
 * `base` is the path from the consuming page to the design-system root.
 */
function Logo({
  variant = 'wordmark-white',
  height = 40,
  base = '',
  title = 'Lingo Toolbox',
  style,
  ...rest
}) {
  const file = FILES[variant] || FILES['wordmark-white'];
  const prefix = base ? base.replace(/\/$/, '') + '/' : '';
  return /*#__PURE__*/React.createElement("img", _extends({
    src: prefix + 'assets/logo/' + file,
    alt: title,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 48,
  xl: 72
};
const RING = {
  online: 'var(--success)',
  idle: 'var(--warning)',
  offline: 'var(--ink-400)'
};

/** Round member/language avatar. Initials fallback uses a deterministic accent hue. */
function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  flag,
  style,
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const hues = ['var(--violet-500)', 'var(--cyan-500)', 'var(--mint-500)', 'var(--coral-500)', 'var(--pink-500)', 'var(--amber-500)'];
  const bg = hues[(name.charCodeAt(0) || 0) % hues.length];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: px,
      height: px,
      borderRadius: 'var(--radius-avatar)',
      display: 'grid',
      placeItems: 'center',
      background: src ? 'center/cover no-repeat url(' + src + ')' : bg,
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: Math.max(10, Math.round(px * 0.38)),
      overflow: 'hidden'
    }
  }, !src && (flag || initials)), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: Math.max(8, px * 0.28),
      height: Math.max(8, px * 0.28),
      borderRadius: '50%',
      background: RING[status],
      boxShadow: '0 0 0 2.5px var(--surface-sidebar)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    background: 'var(--surface-raised)',
    color: 'var(--text-body)'
  },
  brand: {
    background: 'var(--brand)',
    color: 'var(--text-on-brand)'
  },
  success: {
    background: 'var(--success-subtle)',
    color: 'var(--success-text)'
  },
  warning: {
    background: 'var(--warning-subtle)',
    color: 'var(--warning-text)'
  },
  danger: {
    background: 'var(--danger-subtle)',
    color: 'var(--danger-text)'
  },
  info: {
    background: 'var(--info-subtle)',
    color: 'var(--info-text)'
  }
};

/** Small status marker: counts, "new", mastery level. Pill, uppercase, tiny. */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 20,
      padding: dot ? '0 8px 0 6px' : '0 8px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...t,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Deck / session / mastery progress. Rounded track, flat fill, optional segments. */
function ProgressBar({
  value = 0,
  max = 100,
  color = 'var(--brand)',
  height = 8,
  label,
  valueLabel,
  segments,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      width: '100%',
      ...style
    }
  }, rest), (label || valueLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--space-4)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-muted)'
    }
  }, label), valueLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, valueLabel)), segments ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      height
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: s.weight || 1,
      borderRadius: 'var(--radius-pill)',
      background: s.color || 'var(--surface-raised)'
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: color,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Content label — deck topics, part of speech, source language. Removable when interactive. */
function Tag({
  children,
  color = 'var(--brand)',
  variant = 'soft',
  icon = null,
  onRemove,
  style,
  ...rest
}) {
  const solid = variant === 'solid';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: onRemove ? '0 6px 0 10px' : '0 10px',
      borderRadius: 'var(--radius-tag)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-bold)',
      whiteSpace: 'nowrap',
      background: solid ? color : 'color-mix(in oklab, ' + color + ' 18%, transparent)',
      color: solid ? '#fff' : color,
      boxShadow: solid ? 'none' : 'inset 0 0 0 1px color-mix(in oklab, ' + color + ' 35%, transparent)',
      ...style
    }
  }, rest), icon, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 16,
      height: 16,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      borderRadius: '50%',
      background: 'transparent',
      color: 'inherit',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    accent: 'var(--text-faint)',
    icon: 'info'
  },
  success: {
    accent: 'var(--success)',
    icon: 'circle-check'
  },
  warning: {
    accent: 'var(--warning)',
    icon: 'triangle-alert'
  },
  danger: {
    accent: 'var(--danger)',
    icon: 'circle-x'
  },
  brand: {
    accent: 'var(--brand)',
    icon: 'sparkles'
  }
};

/** Transient confirmation. Slides up from the bottom-centre; auto-dismisses. */
function Toast({
  title,
  description,
  tone = 'success',
  icon,
  action,
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.success;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      width: 340,
      maxWidth: '100%',
      padding: '14px',
      background: 'var(--ink-800)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg), var(--ring-inset)',
      animation: 'lt-toast var(--dur-slow) var(--ease-spring)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, '@keyframes lt-toast{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}'), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-md)',
      display: 'grid',
      placeItems: 'center',
      background: 'color-mix(in oklab, ' + t.accent + ' 20%, transparent)',
      color: t.accent
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-13)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-normal)'
    }
  }, description)), action, onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      padding: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark label on hover/focus. Wrap the trigger; nothing renders until hovered. */
function Tooltip({
  children,
  label,
  side = 'top',
  shortcut,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,8px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-8px,-50%)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(8px,-50%)'
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, rest), children, open && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 50,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 10px',
      background: 'var(--ink-1000)',
      color: 'var(--text-strong)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-bold)',
      animation: 'lt-tip var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes lt-tip{from{opacity:0}to{opacity:1}}'), label, shortcut && /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-11)',
      color: 'var(--text-faint)',
      background: 'var(--surface-raised)',
      borderRadius: 'var(--radius-xs)',
      padding: '1px 4px'
    }
  }, shortcut)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with a rounded 20px box and a spring-in tick. */
function Checkbox({
  checked,
  defaultChecked,
  label,
  hint,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked === undefined ? inner : checked;
  const toggle = e => {
    if (disabled) return;
    if (checked === undefined) setInner(!isOn);
    onChange && onChange(e, !isOn);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: hint ? 'flex-start' : 'center',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-sm)',
      display: 'grid',
      placeItems: 'center',
      background: isOn ? 'var(--brand)' : 'var(--surface-input)',
      boxShadow: isOn ? 'none' : 'inset 0 0 0 1.5px var(--border-strong)',
      transition: 'var(--transition-control)',
      marginTop: hint ? 2 : 0
    }
  }, isOn && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      color: 'var(--text-faint)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HEIGHTS = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)'
};

/** Single-line text field. Sunken well on dark surfaces, hairline box on light. */
function Input({
  value,
  defaultValue,
  placeholder,
  type = 'text',
  size = 'md',
  label,
  hint,
  error,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  block = true,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: block ? 'flex' : 'inline-flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      width: block ? '100%' : undefined
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      height: HEIGHTS[size] || HEIGHTS.md,
      padding: '0 12px',
      background: 'var(--surface-input)',
      borderRadius: 'var(--radius-control)',
      boxShadow: error ? 'inset 0 0 0 1.5px var(--danger)' : focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
      color: 'var(--text-faint)',
      transition: 'var(--transition-control)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, iconLeft, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'inherit',
      fontFamily: 'var(--font-ui)',
      fontSize: size === 'sm' ? 'var(--fs-13)' : 'var(--fs-14)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)'
    }
  }, rest)), iconRight), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      color: error ? 'var(--danger)' : 'var(--text-faint)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Single choice within a RadioGroup — also usable standalone. */
function Radio({
  checked = false,
  label,
  hint,
  name,
  value,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: () => !disabled && onChange && onChange(value),
    style: {
      display: 'inline-flex',
      alignItems: hint ? 'flex-start' : 'center',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    },
    "data-name": name
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      display: 'grid',
      placeItems: 'center',
      marginTop: hint ? 2 : 0,
      background: 'var(--surface-input)',
      boxShadow: checked ? 'inset 0 0 0 6px var(--brand)' : 'inset 0 0 0 1.5px var(--border-strong)',
      transition: 'var(--transition-control)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      color: 'var(--text-faint)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled as a sunken well with a chevron affordance. */
function Select({
  value,
  defaultValue,
  options = [],
  label,
  size = 'md',
  disabled = false,
  block = true,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: block ? 'flex' : 'inline-flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      width: block ? '100%' : undefined
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height,
      background: 'var(--surface-input)',
      borderRadius: 'var(--radius-control)',
      boxShadow: focus ? 'inset 0 0 0 1.5px var(--brand), var(--ring-focus)' : 'inset 0 0 0 1px var(--border)',
      opacity: disabled ? 0.5 : 1,
      transition: 'var(--transition-control)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      height: '100%',
      padding: '0 34px 0 12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: size === 'sm' ? 'var(--fs-13)' : 'var(--fs-14)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, rest), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 10,
      pointerEvents: 'none',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill toggle for settings rows. Track goes mint when on — never violet. */
function Switch({
  checked,
  defaultChecked,
  label,
  hint,
  size = 'md',
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked === undefined ? inner : checked;
  const w = size === 'sm' ? 34 : 44;
  const h = size === 'sm' ? 20 : 26;
  const knob = h - 8;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!isOn);
    onChange && onChange(!isOn);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      justifyContent: 'space-between',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, rest), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      color: 'var(--text-faint)'
    }
  }, hint)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      background: isOn ? 'var(--success)' : 'var(--ink-400)',
      transition: 'background-color var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      left: isOn ? w - knob - 4 : 4,
      width: knob,
      height: knob,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/icon/iconPaths.js
try { (() => {
// Lingo Toolbox icon set — Lucide 0.x (ISC), copied from lucide-icons/lucide@main.
// Inner markup only; stroke/fill inherit currentColor from the <svg> wrapper written by <Icon>.
const ICON_PATHS = {
  "arrow-left": "<path d=\"m12 19-7-7 7-7\"></path>  <path d=\"M19 12H5\"></path>",
  "arrow-right": "<path d=\"M5 12h14\"></path>  <path d=\"m12 5 7 7-7 7\"></path>",
  "at-sign": "<circle cx=\"12\" cy=\"12\" r=\"4\"></circle>  <path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"></path>",
  "bell": "<path d=\"M10.268 21a2 2 0 0 0 3.464 0\"></path>  <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\"></path>",
  "book-open": "<path d=\"M12 5v16\"></path>  <path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\"></path>",
  "bookmark": "<path d=\"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z\"></path>",
  "calendar": "<path d=\"M8 2v3\"></path>  <path d=\"M16 2v3\"></path>  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect>  <path d=\"M3 9h18\"></path>",
  "check": "<path d=\"M20 6 9 17l-5-5\"></path>",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\"></path>",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\"></path>",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\"></path>",
  "chevrons-up-down": "<path d=\"m7 15 5 5 5-5\"></path>  <path d=\"m7 9 5-5 5 5\"></path>",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"m9 12 2 2 4-4\"></path>",
  "circle-plus": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"M8 12h8\"></path>  <path d=\"M12 8v8\"></path>",
  "circle-question-mark": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path>  <path d=\"M12 17h.01\"></path>",
  "circle-x": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"m15 9-6 6\"></path>  <path d=\"m9 9 6 6\"></path>",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"M12 6v6l4 2\"></path>",
  "download": "<path d=\"M12 15V3\"></path>  <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>  <path d=\"m7 10 5 5 5-5\"></path>",
  "ellipsis": "<circle cx=\"12\" cy=\"12\" r=\"1\"></circle>  <circle cx=\"19\" cy=\"12\" r=\"1\"></circle>  <circle cx=\"5\" cy=\"12\" r=\"1\"></circle>",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"></path>  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
  "eye-off": "<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"></path>  <path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"></path>  <path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"></path>  <path d=\"m2 2 20 20\"></path>",
  "flame": "<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\"></path>",
  "folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"></path>",
  "funnel": "<path d=\"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z\"></path>",
  "git-branch": "<path d=\"M15 6a9 9 0 0 0-9 9V3\"></path>  <circle cx=\"18\" cy=\"6\" r=\"3\"></circle>  <circle cx=\"6\" cy=\"18\" r=\"3\"></circle>",
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"></path>  <path d=\"M2 12h20\"></path>",
  "graduation-cap": "<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\"></path>  <path d=\"M22 10v6\"></path>  <path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\"></path>",
  "grid-2x2": "<path d=\"M12 3v18\"></path>  <path d=\"M3 12h18\"></path>  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect>",
  "hash": "<line x1=\"4\" x2=\"20\" y1=\"9\" y2=\"9\"></line>  <line x1=\"4\" x2=\"20\" y1=\"15\" y2=\"15\"></line>  <line x1=\"10\" x2=\"8\" y1=\"3\" y2=\"21\"></line>  <line x1=\"16\" x2=\"14\" y1=\"3\" y2=\"21\"></line>",
  "headphones": "<path d=\"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3\"></path>",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"></path>",
  "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"></path>  <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <path d=\"M12 16v-4\"></path>  <path d=\"M12 8h.01\"></path>",
  "languages": "<path d=\"m5 8 6 6\"></path>  <path d=\"m4 14 6-6 2-3\"></path>  <path d=\"M2 5h12\"></path>  <path d=\"M7 2h1\"></path>  <path d=\"m22 22-5-10-5 10\"></path>  <path d=\"M14 18h6\"></path>",
  "layers": "<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"></path>  <path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"></path>  <path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"></path>",
  "library-big": "<rect width=\"8\" height=\"18\" x=\"3\" y=\"3\" rx=\"1\"></rect>  <path d=\"M7 3v18\"></path>  <path d=\"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z\"></path>",
  "lightbulb": "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"></path>  <path d=\"M9 18h6\"></path>  <path d=\"M10 22h4\"></path>",
  "list": "<path d=\"M3 5h.01\"></path>  <path d=\"M3 12h.01\"></path>  <path d=\"M3 19h.01\"></path>  <path d=\"M8 5h13\"></path>  <path d=\"M8 12h13\"></path>  <path d=\"M8 19h13\"></path>",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"></rect>  <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>",
  "log-in": "<path d=\"m10 17 5-5-5-5\"></path>  <path d=\"M15 12H3\"></path>  <path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"></path>",
  "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"></path>  <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"></rect>",
  "message-square-quote": "<path d=\"M14 14a2 2 0 0 0 2-2V8h-2\"></path>  <path d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\"></path>  <path d=\"M8 14a2 2 0 0 0 2-2V8H8\"></path>",
  "mic": "<path d=\"M12 19v3\"></path>  <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path>  <rect x=\"9\" y=\"2\" width=\"6\" height=\"13\" rx=\"3\"></rect>",
  "mic-off": "<path d=\"M12 19v3\"></path>  <path d=\"M15 9.34V5a3 3 0 0 0-5.68-1.33\"></path>  <path d=\"M16.95 16.95A7 7 0 0 1 5 12v-2\"></path>  <path d=\"M18.89 13.23A7 7 0 0 0 19 12v-2\"></path>  <path d=\"m2 2 20 20\"></path>  <path d=\"M9 9v3a3 3 0 0 0 5.12 2.12\"></path>",
  "moon": "<path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"></path>",
  "panel-left": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"></rect>  <path d=\"M9 3v18\"></path>",
  "pause": "<rect x=\"14\" y=\"3\" width=\"5\" height=\"18\" rx=\"1\"></rect>  <rect x=\"5\" y=\"3\" width=\"5\" height=\"18\" rx=\"1\"></rect>",
  "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"></path>  <path d=\"m15 5 4 4\"></path>",
  "play": "<path d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\"></path>",
  "plus": "<path d=\"M5 12h14\"></path>  <path d=\"M12 5v14\"></path>",
  "quote": "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"></path>  <path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"></path>",
  "repeat": "<path d=\"m17 2 4 4-4 4\"></path>  <path d=\"M3 11v-1a4 4 0 0 1 4-4h14\"></path>  <path d=\"m7 22-4-4 4-4\"></path>  <path d=\"M21 13v1a4 4 0 0 1-4 4H3\"></path>",
  "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path>  <path d=\"M3 3v5h5\"></path>",
  "scroll-text": "<path d=\"M15 12h-5\"></path>  <path d=\"M15 8h-5\"></path>  <path d=\"M19 17V5a2 2 0 0 0-2-2H4\"></path>  <path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\"></path>",
  "search": "<path d=\"m21 21-4.34-4.34\"></path>  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>",
  "settings": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\"></path>  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
  "share-2": "<circle cx=\"18\" cy=\"5\" r=\"3\"></circle>  <circle cx=\"6\" cy=\"12\" r=\"3\"></circle>  <circle cx=\"18\" cy=\"19\" r=\"3\"></circle>  <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"></line>  <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"></line>",
  "shuffle": "<path d=\"m18 14 4 4-4 4\"></path>  <path d=\"m18 2 4 4-4 4\"></path>  <path d=\"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22\"></path>  <path d=\"M2 6h1.972a4 4 0 0 1 3.6 2.2\"></path>  <path d=\"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45\"></path>",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path>  <path d=\"M20 2v4\"></path>  <path d=\"M22 4h-4\"></path>  <circle cx=\"4\" cy=\"20\" r=\"2\"></circle>",
  "spell-check": "<path d=\"m6 16 6-12 6 12\"></path>  <path d=\"M8 12h8\"></path>  <path d=\"m16 20 2 2 4-4\"></path>",
  "square-pen": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path>  <path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"></path>",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"></path>",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"></circle>  <path d=\"M12 2v2\"></path>  <path d=\"M12 20v2\"></path>  <path d=\"m4.93 4.93 1.41 1.41\"></path>  <path d=\"m17.66 17.66 1.41 1.41\"></path>  <path d=\"M2 12h2\"></path>  <path d=\"M20 12h2\"></path>  <path d=\"m6.34 17.66-1.41 1.41\"></path>  <path d=\"m19.07 4.93-1.41 1.41\"></path>",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>  <circle cx=\"12\" cy=\"12\" r=\"6\"></circle>  <circle cx=\"12\" cy=\"12\" r=\"2\"></circle>",
  "text-cursor-input": "<path d=\"M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6\"></path>  <path d=\"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7\"></path>  <path d=\"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1\"></path>  <path d=\"M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1\"></path>  <path d=\"M9 6v12\"></path>",
  "thumbs-up": "<path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\"></path>  <path d=\"M7 10v12\"></path>",
  "trash-2": "<path d=\"M10 11v6\"></path>  <path d=\"M14 11v6\"></path>  <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"></path>  <path d=\"M3 6h18\"></path>  <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>",
  "triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"></path>  <path d=\"M12 9v4\"></path>  <path d=\"M12 17h.01\"></path>",
  "trophy": "<path d=\"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2\"></path>  <path d=\"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2\"></path>  <path d=\"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3\"></path>  <path d=\"M4 22h16\"></path>  <path d=\"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z\"></path>  <path d=\"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3\"></path>",
  "undo-2": "<path d=\"M9 14 4 9l5-5\"></path>  <path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11\"></path>",
  "upload": "<path d=\"M12 3v12\"></path>  <path d=\"m17 8-5-5-5 5\"></path>  <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path>  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path>  <path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path>  <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path>  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>",
  "volume-2": "<path d=\"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z\"></path>  <path d=\"M16 9a5 5 0 0 1 0 6\"></path>  <path d=\"M19.364 18.364a9 9 0 0 0 0-12.728\"></path>",
  "x": "<path d=\"M18 6 6 18\"></path>  <path d=\"m6 6 12 12\"></path>",
  "zap": "<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\"></path>"
};
const ICON_NAMES = Object.keys(ICON_PATHS);
if (typeof window !== "undefined") {
  window.LingoIcons = ICON_PATHS;
}
Object.assign(__ds_scope, { ICON_PATHS, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/iconPaths.js", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lucide-derived 24x24 line icon, 2px stroke, round caps and joins.
 * Colour comes from `currentColor`; never hard-code a fill.
 */
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  style,
  ...rest
}) {
  const markup = __ds_scope.ICON_PATHS[name];
  if (!markup) {
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: size,
        height: size,
        display: 'inline-block',
        borderRadius: 3,
        boxShadow: 'inset 0 0 0 1.5px currentColor',
        opacity: 0.35,
        ...style
      },
      title: 'missing icon: ' + name
    });
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: markup
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StreakPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Streak counter — amber flame plus day count. The one place a glow is allowed. */
function StreakPill({
  days = 0,
  active = true,
  size = 'md',
  style,
  ...rest
}) {
  const lg = size === 'lg';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: lg ? 8 : 6,
      height: lg ? 36 : 28,
      padding: lg ? '0 14px' : '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'var(--warning-subtle)' : 'var(--surface-raised)',
      boxShadow: active ? 'inset 0 0 0 1px color-mix(in oklab, var(--streak) 35%, transparent)' : 'none',
      color: active ? 'var(--streak-text)' : 'var(--text-faint)',
      fontFamily: 'var(--font-display)',
      fontSize: lg ? 'var(--fs-18)' : 'var(--fs-14)',
      fontWeight: 'var(--fw-black)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "flame",
    size: lg ? 20 : 15,
    style: {
      filter: active ? 'drop-shadow(0 0 6px rgba(255,176,32,.6))' : 'none'
    }
  }), days, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: lg ? 'var(--fs-13)' : 'var(--fs-11)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      opacity: 0.75
    }
  }, days === 1 ? 'day' : 'days'));
}
Object.assign(__ds_scope, { StreakPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StreakPill.jsx", error: String((e && e.message) || e) }); }

// components/learning/EtymologyNode.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * One node in the Etymology Explorer chain: a language-stamped word with its gloss.
 * Chain them vertically with `connector` to draw the descent line.
 */
function EtymologyNode({
  word,
  language,
  gloss,
  era,
  color = 'var(--tool-etymology)',
  current = false,
  connector = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 'none',
      width: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: current ? color : 'var(--surface-raised)',
      boxShadow: current ? '0 0 0 4px color-mix(in oklab,' + color + ' 22%, transparent)' : 'inset 0 0 0 1.5px var(--border-strong)',
      marginTop: 6,
      flex: 'none'
    }
  }), connector && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 2,
      background: 'linear-gradient(to bottom,var(--border-strong),transparent)',
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: connector ? 'var(--space-7)' : 0,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-24)',
      fontWeight: 'var(--fw-black)',
      color: current ? 'var(--text-strong)' : 'var(--text-body)',
      lineHeight: 1.1
    }
  }, word), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: color
    }
  }, language), era && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-11)',
      color: 'var(--text-faint)'
    }
  }, era)), gloss && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, gloss)));
}
Object.assign(__ds_scope, { EtymologyNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/EtymologyNode.jsx", error: String((e && e.message) || e) }); }

// components/learning/Flashcard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The product's hero object: a two-faced review card that flips on click.
 * Front = prompt in the target language, back = meaning plus notes.
 */
function Flashcard({
  front,
  back,
  phonetic,
  language,
  tags,
  flipped,
  defaultFlipped = false,
  height = 300,
  hint = 'Click or press Space to flip',
  onFlip,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(defaultFlipped);
  const isFlipped = flipped === undefined ? inner : flipped;
  const flip = () => {
    if (flipped === undefined) setInner(!isFlipped);
    onFlip && onFlip(!isFlipped);
  };
  const face = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-5)',
    padding: 'var(--space-9)',
    borderRadius: 'var(--radius-flashcard)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    textAlign: 'center',
    transition: 'opacity var(--dur-fast) linear'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: flip,
    style: {
      perspective: 1400,
      height,
      cursor: 'pointer',
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transform: isFlipped ? 'rotateY(180deg)' : 'none',
      transition: 'transform var(--dur-flip) var(--ease-spring)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      opacity: isFlipped ? 0 : 1,
      background: 'var(--surface-card)',
      boxShadow: 'var(--ring-inset), var(--shadow-md)'
    }
  }, language && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 20,
      left: 24,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, language), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-48)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.05,
      color: 'var(--text-strong)'
    }
  }, front), phonetic && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-16)',
      color: 'var(--text-muted)'
    }
  }, phonetic), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 18,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-12)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-faint)'
    }
  }, hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      opacity: isFlipped ? 1 : 0,
      transform: 'rotateY(180deg)',
      background: 'var(--violet-800)',
      boxShadow: 'inset 0 0 0 1.5px var(--violet-600), var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-32)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.1,
      color: '#fff'
    }
  }, back), tags && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, tags))));
}
Object.assign(__ds_scope, { Flashcard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/Flashcard.jsx", error: String((e && e.message) || e) }); }

// components/learning/ReviewRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GRADES = [{
  key: 'again',
  label: 'Again',
  due: '<1m',
  variant: 'danger',
  shortcut: '1'
}, {
  key: 'hard',
  label: 'Hard',
  due: '6m',
  variant: 'secondary',
  shortcut: '2'
}, {
  key: 'good',
  label: 'Good',
  due: '1d',
  variant: 'success',
  shortcut: '3'
}, {
  key: 'easy',
  label: 'Easy',
  due: '4d',
  variant: 'primary',
  shortcut: '4'
}];

/** The four-grade spaced-repetition answer row shown once a card is flipped. */
function ReviewRating({
  grades = GRADES,
  onGrade,
  showDue = true,
  showShortcuts = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + grades.length + ',1fr)',
      gap: 'var(--space-4)',
      width: '100%',
      ...style
    }
  }, rest), grades.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.key,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: g.variant,
    size: "lg",
    block: true,
    onClick: () => onGrade && onGrade(g.key)
  }, g.label, showShortcuts && /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-11)',
      opacity: 0.7,
      marginLeft: 2
    }
  }, g.shortcut)), showDue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-wide)',
      color: 'var(--text-faint)'
    }
  }, g.due))));
}
Object.assign(__ds_scope, { ReviewRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/learning/ReviewRating.jsx", error: String((e && e.message) || e) }); }

// components/navigation/RailTile.jsx
try { (() => {
/**
 * Tile in the far-left rail — one per tool (icon) or language workspace (flag).
 * Squircle at rest, rounds toward a squarer radius and grows a left pip when active.
 * `showLabel` puts the language name in small type underneath.
 */
function RailTile({
  label,
  icon,
  flag,
  src,
  color = 'var(--brand)',
  size = 46,
  quiet = false,
  active = false,
  unread = 0,
  showLabel = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  const isEmoji = flag && !/^[A-Za-z]{1,3}$/.test(flag);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: size * 0.15,
      width: 4,
      height: active ? size * 0.7 : 0,
      borderRadius: '0 4px 4px 0',
      background: 'var(--text-strong)',
      transition: 'height var(--dur-base) var(--ease-spring)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: label,
    "aria-label": label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      borderRadius: lit ? 'var(--radius-lg)' : 'var(--radius-xl)',
      background: active ? color : hover ? 'var(--surface-card)' : quiet ? 'transparent' : 'var(--surface-card)',
      color: active ? '#fff' : hover ? 'var(--text-strong)' : 'var(--text-muted)',
      boxShadow: active && hover ? '0 0 0 3px color-mix(in oklab, ' + color + ' 28%, transparent)' : 'none',
      fontFamily: isEmoji ? 'inherit' : 'var(--font-display)',
      fontSize: isEmoji ? '26px' : 'var(--fs-16)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1,
      backgroundImage: src ? 'url(' + src + ')' : undefined,
      backgroundSize: '62%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'border-radius var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, icon || !src && (flag || label.slice(0, 2).toUpperCase())), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: 60,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-10)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-wide)',
      textAlign: 'center',
      color: active || hover ? 'var(--text-strong)' : 'var(--text-faint)',
      transition: 'color var(--dur-fast) var(--ease-standard)'
    }
  }, label), unread > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 4,
      top: size - 12,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--danger)',
      color: '#fff',
      boxShadow: '0 0 0 3px var(--surface-rail)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)'
    }
  }, unread));
}
Object.assign(__ds_scope, { RailTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/RailTile.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Row in the tool sidebar: icon + label, violet-tinted when selected. */
function SidebarItem({
  icon,
  label,
  meta,
  active = false,
  muted = false,
  badge,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      width: '100%',
      height: 34,
      padding: '0 8px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'var(--surface-selected)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: active ? 'var(--text-strong)' : muted ? 'var(--text-faint)' : hover ? 'var(--text-body)' : 'var(--text-muted)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      flex: 'none',
      opacity: active ? 1 : 0.8
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-bold)'
    }
  }, label), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-faint)'
    }
  }, meta), badge);
}
Object.assign(__ds_scope, { SidebarItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underline tab bar for switching views inside a pane. */
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  style,
  ...rest
}) {
  const pill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: pill ? 4 : 'var(--space-6)',
      alignItems: 'center',
      padding: pill ? 4 : 0,
      borderRadius: pill ? 'var(--radius-pill)' : 0,
      background: pill ? 'var(--surface-sunken)' : 'transparent',
      boxShadow: pill ? 'none' : 'inset 0 -1px 0 var(--divider)',
      ...style
    }
  }, rest), items.map(raw => {
    const item = typeof raw === 'string' ? {
      value: raw,
      label: raw
    } : raw;
    const on = item.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: item.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(item.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        border: 'none',
        cursor: 'pointer',
        background: pill && on ? 'var(--surface-raised)' : 'transparent',
        padding: pill ? '0 14px' : '0 0 10px',
        height: pill ? 28 : 34,
        borderRadius: pill ? 'var(--radius-pill)' : 0,
        boxShadow: !pill && on ? 'inset 0 -3px 0 var(--brand)' : 'none',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-14)',
        fontWeight: 'var(--fw-bold)',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        transition: 'var(--transition-control)'
      }
    }, item.icon, item.label, item.count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-12)',
        fontWeight: 'var(--fw-black)',
        padding: '1px 6px',
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--brand-subtle)' : 'var(--surface-raised)',
        color: on ? 'var(--violet-200)' : 'var(--text-faint)'
      }
    }, item.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Raised content container: 12px radius, flat fill, hairline inset, no glow. */
function Card({
  children,
  title,
  subtitle,
  accent,
  actions,
  padding = 'var(--pad-card)',
  interactive = false,
  selected = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-stack)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      padding,
      boxShadow: selected ? 'inset 0 0 0 1.5px var(--brand)' : 'var(--ring-inset)',
      cursor: interactive ? 'pointer' : undefined,
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
      overflow: 'hidden',
      ...style
    }
  }, rest), accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: '0 0 auto 0',
      height: 3,
      background: accent
    }
  }), (title || actions) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-18)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-13)',
      color: 'var(--text-muted)'
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--gap-inline)',
      flex: 'none'
    }
  }, actions)), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Centred modal over a blurred scrim. Body scrolls; header and footer stay put. */
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  width = 440,
  onClose,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-8)',
      background: 'var(--surface-overlay)',
      backdropFilter: 'var(--blur-scrim)',
      zIndex: 40,
      animation: 'lt-fade var(--dur-base) var(--ease-out)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes lt-fade{from{opacity:0}to{opacity:1}}@keyframes lt-pop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}'), /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--ink-700)',
      borderRadius: 'var(--radius-dialog)',
      boxShadow: 'var(--shadow-xl)',
      animation: 'lt-pop var(--dur-slow) var(--ease-spring)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-5)',
      padding: 'var(--pad-dialog)',
      paddingBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-24)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-strong)',
      lineHeight: 1.15
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-14)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, description)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--pad-dialog)',
      overflowY: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--gap-inline)',
      padding: 'var(--pad-dialog)',
      marginTop: 'var(--space-4)',
      background: 'var(--ink-800)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Dialog.jsx", error: String((e && e.message) || e) }); }

// --- exports hoisted above the ui_kits IIFEs: they read these off the namespace at
// --- definition time, so registering after them left every reference undefined.
__ds_ns.Button = __ds_scope.Button;
__ds_ns.IconButton = __ds_scope.IconButton;
__ds_ns.Logo = __ds_scope.Logo;
__ds_ns.Avatar = __ds_scope.Avatar;
__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.ProgressBar = __ds_scope.ProgressBar;
__ds_ns.StreakPill = __ds_scope.StreakPill;
__ds_ns.Tag = __ds_scope.Tag;
__ds_ns.Toast = __ds_scope.Toast;
__ds_ns.Tooltip = __ds_scope.Tooltip;
__ds_ns.Checkbox = __ds_scope.Checkbox;
__ds_ns.Input = __ds_scope.Input;
__ds_ns.Radio = __ds_scope.Radio;
__ds_ns.Select = __ds_scope.Select;
__ds_ns.Switch = __ds_scope.Switch;
__ds_ns.Icon = __ds_scope.Icon;
__ds_ns.ICON_PATHS = __ds_scope.ICON_PATHS;
__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;
__ds_ns.EtymologyNode = __ds_scope.EtymologyNode;
__ds_ns.Flashcard = __ds_scope.Flashcard;
__ds_ns.ReviewRating = __ds_scope.ReviewRating;
__ds_ns.RailTile = __ds_scope.RailTile;
__ds_ns.SidebarItem = __ds_scope.SidebarItem;
__ds_ns.Tabs = __ds_scope.Tabs;
__ds_ns.Card = __ds_scope.Card;
__ds_ns.Dialog = __ds_scope.Dialog;

// ui_kits/app/AppShell.jsx
try { (() => {
(function () {
  const AppShell_DS = window.LingoToolboxDesignSystem_898611;
  const Logo = AppShell_DS.Logo;
  const Icon = AppShell_DS.Icon;
  const RailTile = AppShell_DS.RailTile;
  const SidebarItem = AppShell_DS.SidebarItem;
  const Badge = AppShell_DS.Badge;
  const Avatar = AppShell_DS.Avatar;
  const StreakPill = AppShell_DS.StreakPill;
  const IconButton = AppShell_DS.IconButton;
  const Tooltip = AppShell_DS.Tooltip;
  const Input = AppShell_DS.Input;
  const LINGO_DATA = {
    workspaces: [{
      code: 'ES',
      name: 'Spanish',
      flag: '🇪🇸',
      color: 'var(--coral-500)',
      unread: 3
    }, {
      code: 'JA',
      name: 'Japanese',
      flag: '🇯🇵',
      color: 'var(--cyan-500)',
      unread: 0
    }, {
      code: 'TR',
      name: 'Turkish',
      flag: '🇹🇷',
      color: 'var(--mint-500)',
      unread: 0
    }],
    tools: [{
      id: 'home',
      label: 'Home',
      short: 'Home',
      icon: 'house'
    }, {
      id: 'review',
      label: 'Flashcards',
      short: 'Cards',
      icon: 'layers',
      meta: '50'
    }, {
      id: 'etymology',
      label: 'Etymology Explorer',
      short: 'Roots',
      icon: 'git-branch'
    }, {
      id: 'conjugation',
      label: 'Conjugation Drill',
      short: 'Verbs',
      icon: 'spell-check',
      badge: 'New'
    }, {
      id: 'phrasebook',
      label: 'Phrasebook',
      short: 'Phrases',
      icon: 'message-square-quote'
    }, {
      id: 'grammar',
      label: 'Grammar Notes',
      short: 'Grammar',
      icon: 'scroll-text'
    }],
    decks: [{
      id: 'kitchen',
      name: 'Kitchen Spanish',
      cards: 42,
      due: 12,
      accent: 'var(--tool-flashcards)',
      tags: ['food', 'A2'],
      mastery: 0.71
    }, {
      id: 'market',
      name: 'At the market',
      cards: 68,
      due: 4,
      accent: 'var(--cyan-500)',
      tags: ['shopping', 'A2'],
      mastery: 0.52
    }, {
      id: 'idioms',
      name: 'Idioms that lie',
      cards: 31,
      due: 0,
      accent: 'var(--coral-500)',
      tags: ['idiom', 'B2'],
      mastery: 0.88
    }, {
      id: 'verbs',
      name: 'Irregular verbs',
      cards: 120,
      due: 26,
      accent: 'var(--pink-500)',
      tags: ['verbs', 'B1'],
      mastery: 0.34
    }, {
      id: 'travel',
      name: 'Trains & tickets',
      cards: 24,
      due: 0,
      accent: 'var(--mint-500)',
      tags: ['travel', 'A1'],
      mastery: 0.95
    }, {
      id: 'work',
      name: 'Office small talk',
      cards: 55,
      due: 8,
      accent: 'var(--amber-500)',
      tags: ['work', 'B1'],
      mastery: 0.44
    }],
    cards: [{
      front: 'sobremesa',
      phonetic: '/so.bɾeˈme.sa/',
      back: 'the long talk after a meal',
      tags: ['noun', 'B1']
    }, {
      front: 'madrugar',
      phonetic: '/ma.ðɾuˈɣaɾ/',
      back: 'to get up very early',
      tags: ['verb', 'B1']
    }, {
      front: 'friolero',
      phonetic: '/fɾjoˈle.ɾo/',
      back: 'someone who feels the cold easily',
      tags: ['adj', 'B2']
    }]
  };
  const shellStyles = {
    frame: {
      display: 'flex',
      height: '100%',
      background: 'var(--surface-app)',
      fontFamily: 'var(--font-ui)',
      position: 'relative',
      overflow: 'hidden'
    },
    rail: {
      width: 'var(--rail-width)',
      flex: 'none',
      background: 'var(--surface-rail)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: '10px 0 12px'
    },
    sidebar: {
      width: 'var(--sidebar-width)',
      flex: 'none',
      background: 'var(--surface-sidebar)',
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarHead: {
      height: 'var(--topbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px 0 16px',
      boxShadow: 'var(--shadow-xs)',
      flex: 'none',
      cursor: 'pointer'
    },
    sectionLabel: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      padding: '0 8px',
      marginBottom: 4
    },
    userBar: {
      height: 56,
      flex: 'none',
      background: 'var(--ink-900)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '0 8px 0 10px'
    },
    main: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    },
    topbar: {
      height: 'var(--topbar-height)',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '0 16px',
      boxShadow: 'var(--shadow-xs)'
    },
    topTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-15)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-strong)'
    },
    body: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto'
    }
  };
  function LanguageMenu({
    ws,
    onWorkspace,
    onAdd
  }) {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      if (!open) return undefined;
      const close = () => setOpen(false);
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }, [open]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setOpen(o => !o),
      "aria-label": "Switch language",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 34,
        padding: '0 10px 0 8px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        background: open ? 'var(--surface-card)' : 'transparent',
        color: 'var(--text-strong)',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-13)',
        fontWeight: 'var(--fw-bold)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        lineHeight: 1
      }
    }, ws.flag), ws.name, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 14,
      style: {
        color: 'var(--text-muted)'
      }
    })), open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 40,
        right: 0,
        minWidth: 224,
        zIndex: 40,
        padding: 6,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-raised)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...shellStyles.sectionLabel,
        marginBottom: 2,
        padding: '6px 8px 2px'
      }
    }, "Language track"), LINGO_DATA.workspaces.map(w => /*#__PURE__*/React.createElement("button", {
      key: w.code,
      type: "button",
      onClick: () => {
        onWorkspace(w.code);
        setOpen(false);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 38,
        padding: '0 8px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        cursor: 'pointer',
        background: w.code === ws.code ? 'var(--surface-card)' : 'transparent',
        color: 'var(--text-strong)',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-14)',
        fontWeight: 'var(--fw-bold)',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        lineHeight: 1
      }
    }, w.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, w.name), w.unread > 0 && /*#__PURE__*/React.createElement(Badge, {
      tone: "danger"
    }, w.unread), w.code === ws.code && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16,
      style: {
        color: w.color
      }
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        height: 1,
        background: 'var(--border)',
        margin: '4px 0'
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        setOpen(false);
        onAdd && onAdd();
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 34,
        padding: '0 8px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        background: 'transparent',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-13)',
        fontWeight: 'var(--fw-bold)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Add a language")));
  }
  function AppShell({
    workspace,
    onWorkspace,
    tool,
    onTool,
    title,
    titleIcon,
    topRight,
    children,
    onNewDeck
  }) {
    const ws = LINGO_DATA.workspaces.find(w => w.code === workspace) || LINGO_DATA.workspaces[0];
    const activeTool = LINGO_DATA.tools.find(t => t.id === tool);
    return /*#__PURE__*/React.createElement("div", {
      style: shellStyles.frame
    }, /*#__PURE__*/React.createElement("nav", {
      style: shellStyles.rail
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/mark-violet.svg",
      alt: "Lingo Toolbox",
      style: {
        height: 43,
        width: 38
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 2,
        background: 'var(--border)',
        borderRadius: 2,
        margin: '4px 0 6px'
      }
    }), LINGO_DATA.tools.map(t => /*#__PURE__*/React.createElement(Tooltip, {
      key: t.id,
      label: t.label,
      side: "right"
    }, /*#__PURE__*/React.createElement(RailTile, {
      label: t.short || t.label,
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: t.icon,
        size: 18
      }),
      color: "var(--surface-raised)",
      size: 38,
      quiet: true,
      showLabel: true,
      active: tool === t.id,
      onClick: () => onTool(t.id)
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(IconButton, {
      label: "Settings",
      active: tool === 'settings',
      onClick: () => onTool('settings')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 20
    }))), /*#__PURE__*/React.createElement("aside", {
      style: shellStyles.sidebar
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...shellStyles.sidebarHead,
        cursor: 'default'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-18)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)'
      }
    }, activeTool ? activeTool.label : 'Lingo Toolbox'), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, ws.flag, " ", ws.code)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 8px 6px'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Search words, decks\u2026",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 14
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '6px 8px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...shellStyles.sectionLabel,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Decks"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onNewDeck,
      "aria-label": "New deck",
      style: {
        border: 'none',
        background: 'transparent',
        color: 'var(--text-faint)',
        cursor: 'pointer',
        padding: 0,
        display: 'grid'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, LINGO_DATA.decks.map(d => /*#__PURE__*/React.createElement(SidebarItem, {
      key: d.id,
      label: d.name,
      meta: d.due ? String(d.due) : '',
      muted: !d.due,
      icon: /*#__PURE__*/React.createElement("span", {
        style: {
          width: 8,
          height: 8,
          borderRadius: 3,
          background: d.accent,
          display: 'block'
        }
      }),
      onClick: () => onTool('library')
    })))), /*#__PURE__*/React.createElement("div", {
      style: shellStyles.userBar
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Mara Okafor",
      status: "online",
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, "Mara Okafor"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-11)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-faint)'
      }
    }, "Level 14 \xB7 4,208 XP")), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Mute audio"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Mute audio",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "volume-2",
      size: 16
    }))), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Settings"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Settings",
      size: "sm",
      onClick: () => onTool('settings')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 16
    }))))), /*#__PURE__*/React.createElement("main", {
      style: shellStyles.main
    }, /*#__PURE__*/React.createElement("header", {
      style: shellStyles.topbar
    }, /*#__PURE__*/React.createElement("span", {
      style: shellStyles.topTitle
    }, titleIcon && /*#__PURE__*/React.createElement(Icon, {
      name: titleIcon,
      size: 18,
      style: {
        color: 'var(--text-muted)'
      }
    }), title), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), topRight, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 4
      }
    }), /*#__PURE__*/React.createElement(LanguageMenu, {
      ws: ws,
      onWorkspace: onWorkspace,
      onAdd: onNewDeck
    }), /*#__PURE__*/React.createElement(StreakPill, {
      days: 26
    }), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Notifications"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Notifications"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    }))), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Help"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Help"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "circle-question-mark",
      size: 18
    })))), /*#__PURE__*/React.createElement("div", {
      style: shellStyles.body
    }, children)));
  }
  Object.assign(window, {
    AppShell,
    LINGO_DATA,
    shellStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/EtymologyScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  const EtymologyScreen_DS = window.LingoToolboxDesignSystem_898611;
  const EtymologyNode = EtymologyScreen_DS.EtymologyNode;
  const Input = EtymologyScreen_DS.Input;
  const Icon = EtymologyScreen_DS.Icon;
  const Button = EtymologyScreen_DS.Button;
  const Card = EtymologyScreen_DS.Card;
  const Tag = EtymologyScreen_DS.Tag;
  const Tabs = EtymologyScreen_DS.Tabs;
  const IconButton = EtymologyScreen_DS.IconButton;
  const Tooltip = EtymologyScreen_DS.Tooltip;
  const Badge = EtymologyScreen_DS.Badge;
  const etymStyles = {
    page: {
      display: 'grid',
      gridTemplateColumns: '1fr var(--panel-width)',
      height: '100%',
      minHeight: 0
    },
    left: {
      padding: '24px 32px 40px',
      overflowY: 'auto'
    },
    right: {
      borderLeft: '1px solid var(--border-subtle)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      overflowY: 'auto'
    },
    panelBlock: {
      flex: 'none'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    word: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-56)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1,
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-strong)'
    },
    phon: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-16)',
      color: 'var(--text-muted)'
    },
    chain: {
      marginTop: 'var(--space-8)',
      paddingLeft: 4
    }
  };
  const CHAIN = [{
    word: 'sobremesa',
    language: 'Spanish',
    era: 'c. 1600',
    gloss: 'the time spent at the table after eating, talking',
    current: true
  }, {
    word: 'sobre + mesa',
    language: 'Old Spanish',
    era: 'c. 1300',
    gloss: 'over + table — first attested as a compound in monastic records'
  }, {
    word: 'super mensam',
    language: 'Latin',
    era: 'classical',
    gloss: 'over the table; also "on account of"'
  }, {
    word: 'mensa',
    language: 'Latin',
    era: 'archaic',
    gloss: 'table, altar, the meal itself'
  }, {
    word: '*mens-',
    language: 'Proto-Indo-European',
    era: 'reconstructed',
    gloss: 'to measure out — the same root that gives month and moon',
    connector: false
  }];
  function EtymologyScreen() {
    const [tab, setTab] = React.useState('descent');
    return /*#__PURE__*/React.createElement("div", {
      style: etymStyles.page
    }, /*#__PURE__*/React.createElement("div", {
      style: etymStyles.left
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 560,
        marginBottom: 'var(--space-8)'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Trace a word \u2014 sobremesa, madrugar, tertulia\u2026",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 16
      }),
      iconRight: /*#__PURE__*/React.createElement("kbd", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-11)',
          color: 'var(--text-faint)',
          background: 'var(--surface-raised)',
          borderRadius: 'var(--radius-xs)',
          padding: '2px 5px'
        }
      }, "/"),
      defaultValue: "sobremesa",
      size: "lg"
    })), /*#__PURE__*/React.createElement("span", {
      style: etymStyles.eyebrow
    }, "Spanish \xB7 noun, feminine"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--space-5)',
        margin: '6px 0 10px',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: etymStyles.word
    }, "sobremesa"), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Play pronunciation"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Play pronunciation",
      variant: "solid",
      size: "lg"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "volume-2",
      size: 18
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: etymStyles.phon
    }, "/so.b\u027Ee\u02C8me.sa/"), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--tool-etymology)"
    }, "noun"), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--mint-500)"
    }, "B1"), /*#__PURE__*/React.createElement(Badge, {
      tone: "info",
      dot: true
    }, "In 2 of your decks")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-8)',
        maxWidth: 640
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      items: [{
        value: 'descent',
        label: 'Descent',
        count: 5
      }, {
        value: 'cognates',
        label: 'Cognates',
        count: 11
      }, {
        value: 'usage',
        label: 'Usage'
      }],
      value: tab,
      onChange: setTab
    })), tab === 'descent' && /*#__PURE__*/React.createElement("div", {
      style: {
        ...etymStyles.chain,
        maxWidth: 640
      }
    }, CHAIN.map(n => /*#__PURE__*/React.createElement(EtymologyNode, _extends({
      key: n.word
    }, n)))), tab === 'cognates' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-7)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 'var(--space-4)',
        maxWidth: 640
      }
    }, [['mesa', 'Spanish', 'table'], ['mensa', 'Italian', 'canteen'], ['mesa', 'Portuguese', 'table'], ['mensal', 'French', 'monthly'], ['month', 'English', 'lunar period'], ['Monat', 'German', 'month'], ['mās', 'Sanskrit', 'moon, month'], ['mensis', 'Latin', 'month'], ['μήνη', 'Greek', 'moon']].map(([w, l, g]) => /*#__PURE__*/React.createElement(Card, {
      key: w + l,
      padding: "14px"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-20)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)',
        lineHeight: 1.1
      }
    }, w), /*#__PURE__*/React.createElement("span", {
      style: {
        ...etymStyles.eyebrow,
        color: 'var(--tool-etymology)'
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)'
      }
    }, g)))), tab === 'usage' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-7)',
        maxWidth: 640,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }
    }, [['Nos quedamos de sobremesa hasta las cinco.', 'We stayed talking at the table until five.'], ['La sobremesa es sagrada en esta casa.', 'The after-lunch talk is sacred in this house.'], ['Hubo una sobremesa larguísima.', 'There was an extremely long sobremesa.']].map(([es, en]) => /*#__PURE__*/React.createElement(Card, {
      key: es,
      padding: "16px"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-16)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-strong)',
        lineHeight: 'var(--lh-relaxed)'
      }
    }, es), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--text-faint)'
      }
    }, en))))), /*#__PURE__*/React.createElement("aside", {
      style: etymStyles.right
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Add to a deck",
      padding: "16px",
      style: etymStyles.panelBlock
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)',
        lineHeight: 'var(--lh-relaxed)'
      }
    }, "Save the word with its gloss and the first two links of its descent."), /*#__PURE__*/React.createElement(Button, {
      block: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      })
    }, "Add to Kitchen Spanish"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      block: true
    }, "Choose another deck")), /*#__PURE__*/React.createElement("div", {
      style: etymStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: etymStyles.eyebrow
    }, "Root family"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 8
      }
    }, ['mesa', 'mensual', 'mes', 'comensal', 'mensajero'].map(w => /*#__PURE__*/React.createElement(Tag, {
      key: w,
      color: "var(--tool-etymology)"
    }, w)))), /*#__PURE__*/React.createElement("div", {
      style: etymStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: etymStyles.eyebrow
    }, "Recently traced"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 8
      }
    }, ['madrugar', 'tertulia', 'friolero', 'duende'].map(w => /*#__PURE__*/React.createElement("button", {
      key: w,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 34,
        padding: '0 8px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: 'transparent',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-14)',
        fontWeight: 'var(--fw-bold)'
      }
    }, w, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16
    })))))));
  }
  Object.assign(window, {
    EtymologyScreen,
    etymStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/EtymologyScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
(function () {
  const HomeScreen_DS = window.LingoToolboxDesignSystem_898611;
  const Card = HomeScreen_DS.Card;
  const Button = HomeScreen_DS.Button;
  const Icon = HomeScreen_DS.Icon;
  const Tag = HomeScreen_DS.Tag;
  const ProgressBar = HomeScreen_DS.ProgressBar;
  const Badge = HomeScreen_DS.Badge;
  const StreakPill = HomeScreen_DS.StreakPill;
  const homeStyles = {
    page: {
      padding: '28px 32px 48px',
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-section)'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    hero: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-8)'
    },
    h1: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-40)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.05,
      color: 'var(--text-strong)'
    },
    sub: {
      margin: '8px 0 0',
      fontSize: 'var(--fs-16)',
      color: 'var(--text-muted)',
      maxWidth: 460,
      lineHeight: 'var(--lh-relaxed)'
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 'var(--space-5)',
      alignItems: 'start'
    },
    stat: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-32)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-strong)',
      lineHeight: 1
    },
    toolTile: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 18,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--ring-inset)',
      cursor: 'pointer',
      border: 'none',
      textAlign: 'left',
      fontFamily: 'var(--font-ui)'
    }
  };
  function HomeScreen({
    onTool,
    onStart
  }) {
    const due = LINGO_DATA.decks.reduce((n, d) => n + d.due, 0);
    const tools = [{
      id: 'review',
      label: 'Flashcards',
      icon: 'layers',
      color: 'var(--tool-flashcards)',
      copy: '50 cards due today'
    }, {
      id: 'etymology',
      label: 'Etymology Explorer',
      icon: 'git-branch',
      color: 'var(--tool-etymology)',
      copy: 'Trace a word back'
    }, {
      id: 'conjugation',
      label: 'Conjugation Drill',
      icon: 'spell-check',
      color: 'var(--tool-conjugation)',
      copy: 'Preterite, 40 forms'
    }, {
      id: 'phrasebook',
      label: 'Phrasebook',
      icon: 'message-square-quote',
      color: 'var(--tool-phrasebook)',
      copy: '86 saved phrases'
    }, {
      id: 'grammar',
      label: 'Grammar Notes',
      icon: 'scroll-text',
      color: 'var(--tool-grammar)',
      copy: 'Subjunctive, part 2'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: homeStyles.page
    }, /*#__PURE__*/React.createElement("div", {
      style: homeStyles.hero
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: homeStyles.eyebrow
    }, "Spanish \xB7 intermediate"), /*#__PURE__*/React.createElement("h1", {
      style: homeStyles.h1
    }, "Good morning, Mara"), /*#__PURE__*/React.createElement("p", {
      style: homeStyles.sub
    }, due, " cards are due across six decks. Most are ones you rated Hard last week, so take them slowly.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(StreakPill, {
      days: 26,
      size: "lg"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "play",
        size: 18
      }),
      onClick: onStart
    }, "Start review"))), /*#__PURE__*/React.createElement("div", {
      style: homeStyles.grid3
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
      style: homeStyles.eyebrow
    }, "Due today"), /*#__PURE__*/React.createElement("span", {
      style: homeStyles.stat
    }, due), /*#__PURE__*/React.createElement(ProgressBar, {
      value: 18,
      max: 18 + due,
      valueLabel: "18 done",
      label: "Session progress"
    })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
      style: homeStyles.eyebrow
    }, "Words mastered"), /*#__PURE__*/React.createElement("span", {
      style: homeStyles.stat
    }, "1,204"), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Mastery mix",
      segments: [{
        weight: 62,
        color: 'var(--success)'
      }, {
        weight: 24,
        color: 'var(--warning)'
      }, {
        weight: 14,
        color: 'var(--surface-raised)'
      }]
    })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
      style: homeStyles.eyebrow
    }, "This week"), /*#__PURE__*/React.createElement("span", {
      style: homeStyles.stat
    }, "4h 12m"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 5,
        height: 34
      }
    }, [40, 62, 28, 80, 55, 96, 34].map((h, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: h + '%',
        background: i === 5 ? 'var(--brand)' : 'var(--surface-raised)',
        borderRadius: 3,
        display: 'block'
      }
    }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-24)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)'
      }
    }, "Your toolbox"), /*#__PURE__*/React.createElement(Button, {
      variant: "link",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 14
      })
    }, "Browse all tools")), /*#__PURE__*/React.createElement("div", {
      style: homeStyles.grid3
    }, tools.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      style: homeStyles.toolTile,
      onClick: () => onTool(t.id)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        background: 'color-mix(in oklab,' + t.color + ' 18%, transparent)',
        color: t.color
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-16)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)'
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)'
      }
    }, t.copy))))), /*#__PURE__*/React.createElement("div", {
      style: homeStyles.grid2
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '0 0 var(--space-5)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-24)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)'
      }
    }, "Pick up where you left off"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }
    }, LINGO_DATA.decks.slice(0, 3).map(d => /*#__PURE__*/React.createElement(Card, {
      key: d.id,
      accent: d.accent,
      interactive: true,
      padding: "16px",
      onClick: onStart
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-18)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)'
      }
    }, d.name), d.due > 0 && /*#__PURE__*/React.createElement(Badge, {
      tone: "warning"
    }, d.due, " due")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)'
      }
    }, d.cards, " cards \xB7 ", Math.round(d.mastery * 100), "% mastered")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 120,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      value: d.mastery * 100,
      height: 6,
      color: d.accent
    })), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 18,
      style: {
        color: 'var(--text-faint)'
      }
    })))))), /*#__PURE__*/React.createElement(Card, {
      title: "Word of the day",
      accent: "var(--tool-etymology)"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-32)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)',
        lineHeight: 1.05
      }
    }, "madrugada"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)'
      }
    }, "/ma.\xF0\u027Eu\u02C8\u0263a.\xF0a/"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--fs-14)',
        color: 'var(--text-body)',
        lineHeight: 'var(--lh-relaxed)'
      }
    }, "the small hours \u2014 the stretch of night that is already morning"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      color: "var(--cyan-500)"
    }, "noun"), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--amber-500)"
    }, "B1")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      block: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "git-branch",
        size: 14
      }),
      onClick: () => onTool('etymology')
    }, "Trace it back"))));
  }
  Object.assign(window, {
    HomeScreen,
    homeStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LibraryScreen.jsx
try { (() => {
(function () {
  const LibraryScreen_DS = window.LingoToolboxDesignSystem_898611;
  const Card = LibraryScreen_DS.Card;
  const Tabs = LibraryScreen_DS.Tabs;
  const Tag = LibraryScreen_DS.Tag;
  const Badge = LibraryScreen_DS.Badge;
  const Button = LibraryScreen_DS.Button;
  const Icon = LibraryScreen_DS.Icon;
  const IconButton = LibraryScreen_DS.IconButton;
  const ProgressBar = LibraryScreen_DS.ProgressBar;
  const Select = LibraryScreen_DS.Select;
  const Input = LibraryScreen_DS.Input;
  const Tooltip = LibraryScreen_DS.Tooltip;
  const libraryStyles = {
    page: {
      padding: '24px 32px 48px',
      maxWidth: 'var(--content-max)',
      margin: '0 auto'
    },
    head: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      marginBottom: 'var(--space-6)',
      flexWrap: 'wrap'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-6)'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  };
  function LibraryScreen({
    onNewDeck,
    onOpen
  }) {
    const [tab, setTab] = React.useState('mine');
    const [selected, setSelected] = React.useState('kitchen');
    return /*#__PURE__*/React.createElement("div", {
      style: libraryStyles.page
    }, /*#__PURE__*/React.createElement("div", {
      style: libraryStyles.head
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 260,
        maxWidth: 340
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Filter decks",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 16
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 160
      }
    }, /*#__PURE__*/React.createElement(Select, {
      options: ['Recently studied', 'Most due', 'A–Z'],
      size: "md"
    })), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Grid view"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Grid view",
      variant: "solid",
      active: true
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "grid-2x2",
      size: 16
    }))), /*#__PURE__*/React.createElement(Tooltip, {
      label: "List view"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "List view"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list",
      size: 16
    }))), /*#__PURE__*/React.createElement(Button, {
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }),
      onClick: onNewDeck
    }, "New deck")), /*#__PURE__*/React.createElement(Tabs, {
      items: [{
        value: 'mine',
        label: 'My decks',
        count: 6
      }, {
        value: 'shared',
        label: 'Shared with me',
        count: 2
      }, {
        value: 'community',
        label: 'Community'
      }],
      value: tab,
      onChange: setTab
    }), /*#__PURE__*/React.createElement("div", {
      style: libraryStyles.grid
    }, LINGO_DATA.decks.map(d => /*#__PURE__*/React.createElement(Card, {
      key: d.id,
      accent: d.accent,
      interactive: true,
      selected: selected === d.id,
      onClick: () => setSelected(d.id),
      title: d.name,
      subtitle: d.cards + ' cards · ' + Math.round(d.mastery * 100) + '% mastered',
      actions: /*#__PURE__*/React.createElement(IconButton, {
        label: "Deck options",
        size: "sm"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "ellipsis",
        size: 16
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap'
      }
    }, d.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      color: d.accent
    }, t)), d.due > 0 && /*#__PURE__*/React.createElement(Badge, {
      tone: "warning"
    }, d.due, " due"), d.due === 0 && /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Clear")), /*#__PURE__*/React.createElement(ProgressBar, {
      value: d.mastery * 100,
      height: 6,
      color: d.accent
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--gap-inline)',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      block: true,
      onClick: onOpen,
      disabled: d.due === 0
    }, d.due ? 'Review ' + d.due : 'Nothing due'), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 14
      })
    }, "Edit"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-9)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: libraryStyles.eyebrow
    }, "Recently added cards"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--ring-inset)'
      }
    }, [['sobremesa', 'the long talk after a meal', 'Kitchen Spanish', 'noun'], ['madrugar', 'to get up very early', 'Irregular verbs', 'verb'], ['friolero', 'someone who feels the cold easily', 'Idioms that lie', 'adj'], ['tertulia', 'a regular social gathering to talk', 'Office small talk', 'noun']].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: r[0],
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        padding: '12px 16px',
        background: i % 2 ? 'var(--surface-card)' : 'var(--ink-700)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 150,
        flex: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-18)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)'
      }
    }, r[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        fontSize: 'var(--fs-14)',
        color: 'var(--text-body)'
      }
    }, r[1]), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--cyan-500)"
    }, r[3]), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 150,
        flex: 'none',
        fontSize: 'var(--fs-13)',
        color: 'var(--text-faint)',
        textAlign: 'right'
      }
    }, r[2]), /*#__PURE__*/React.createElement(IconButton, {
      label: "Edit card",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 14
    })))))));
  }
  Object.assign(window, {
    LibraryScreen,
    libraryStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LibraryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ReviewScreen.jsx
try { (() => {
(function () {
  const ReviewScreen_DS = window.LingoToolboxDesignSystem_898611;
  const Flashcard = ReviewScreen_DS.Flashcard;
  const ReviewRating = ReviewScreen_DS.ReviewRating;
  const Button = ReviewScreen_DS.Button;
  const Icon = ReviewScreen_DS.Icon;
  const IconButton = ReviewScreen_DS.IconButton;
  const Tooltip = ReviewScreen_DS.Tooltip;
  const Tag = ReviewScreen_DS.Tag;
  const ProgressBar = ReviewScreen_DS.ProgressBar;
  const Card = ReviewScreen_DS.Card;
  const Badge = ReviewScreen_DS.Badge;
  const reviewStyles = {
    wrap: {
      display: 'flex',
      height: '100%',
      minHeight: 0
    },
    stage: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-7)',
      padding: '24px 32px 32px'
    },
    bar: {
      width: '100%',
      maxWidth: 620,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)'
    },
    panel: {
      width: 'var(--panel-width)',
      flex: 'none',
      borderLeft: '1px solid var(--border-subtle)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      overflowY: 'auto'
    },
    panelBlock: {
      flex: 'none'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    statRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontSize: 'var(--fs-13)',
      color: 'var(--text-muted)'
    },
    statVal: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-16)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-strong)'
    }
  };
  function ReviewScreen({
    onDone,
    onGraded
  }) {
    const [index, setIndex] = React.useState(0);
    const [flipped, setFlipped] = React.useState(false);
    const [done, setDone] = React.useState(18);
    const card = LINGO_DATA.cards[index % LINGO_DATA.cards.length];
    const grade = key => {
      setFlipped(false);
      setDone(d => d + 1);
      setIndex(i => i + 1);
      onGraded && onGraded(key);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.wrap
    }, /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.stage
    }, /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.bar
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...reviewStyles.eyebrow,
        flex: 'none'
      }
    }, "Kitchen Spanish"), /*#__PURE__*/React.createElement(ProgressBar, {
      value: done,
      max: 40,
      height: 6
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...reviewStyles.statVal,
        flex: 'none'
      }
    }, done, "/40")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 620
      }
    }, /*#__PURE__*/React.createElement(Flashcard, {
      language: "Spanish",
      front: card.front,
      phonetic: card.phonetic,
      back: card.back,
      flipped: flipped,
      onFlip: setFlipped,
      height: 280,
      hint: flipped ? 'Grade yourself below' : 'Click or press Space to flip',
      tags: card.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
        key: t,
        color: "var(--cyan-300)"
      }, t))
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 620,
        minHeight: 78
      }
    }, flipped ? /*#__PURE__*/React.createElement(ReviewRating, {
      onGrade: grade
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      label: "Play audio",
      shortcut: "P"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Play audio",
      variant: "solid",
      size: "lg"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "volume-2",
      size: 18
    }))), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "secondary",
      onClick: () => setFlipped(true),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "repeat",
        size: 16
      })
    }, "Show answer"), /*#__PURE__*/React.createElement(Tooltip, {
      label: "Skip card",
      shortcut: "\u2192"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Skip card",
      variant: "solid",
      size: "lg",
      onClick: () => setIndex(i => i + 1)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-5)',
        color: 'var(--text-faint)',
        fontSize: 'var(--fs-12)',
        fontWeight: 'var(--fw-semibold)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Space flip"), /*#__PURE__*/React.createElement("span", null, "1\u20134 grade"), /*#__PURE__*/React.createElement("span", null, "P audio"), /*#__PURE__*/React.createElement("span", null, "Esc end session"))), /*#__PURE__*/React.createElement("aside", {
      style: reviewStyles.panel
    }, /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.eyebrow
    }, "Session"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Reviewed"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, done)), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Correct"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, "86%")), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Time"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, "7m 20s")))), /*#__PURE__*/React.createElement(Card, {
      padding: "14px",
      style: reviewStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.eyebrow
    }, "This card"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Seen"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, "9 times")), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Lapses"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, "2")), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.statRow
    }, /*#__PURE__*/React.createElement("span", null, "Interval"), /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.statVal
    }, "4d")))), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.eyebrow
    }, "In context"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '8px 0 0',
        fontSize: 'var(--fs-14)',
        lineHeight: 'var(--lh-relaxed)',
        color: 'var(--text-body)'
      }
    }, "Nos quedamos de ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--violet-200)'
      }
    }, "sobremesa"), " hasta las cinco."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        fontSize: 'var(--fs-13)',
        color: 'var(--text-faint)'
      }
    }, "We stayed talking at the table until five.")), /*#__PURE__*/React.createElement("div", {
      style: reviewStyles.panelBlock
    }, /*#__PURE__*/React.createElement("span", {
      style: reviewStyles.eyebrow
    }, "Related"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 8
      }
    }, ['mesa', 'sobremesa', 'merienda', 'tertulia'].map(w => /*#__PURE__*/React.createElement(Tag, {
      key: w,
      color: "var(--violet-400)"
    }, w)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--gap-inline)',
        marginTop: 'auto',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 14
      })
    }, "Edit card"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: onDone,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "x",
        size: 14
      })
    }, "End session"))));
  }
  Object.assign(window, {
    ReviewScreen,
    reviewStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ReviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SettingsScreen.jsx
try { (() => {
(function () {
  const SettingsScreen_DS = window.LingoToolboxDesignSystem_898611;
  const Card = SettingsScreen_DS.Card;
  const Switch = SettingsScreen_DS.Switch;
  const Select = SettingsScreen_DS.Select;
  const Input = SettingsScreen_DS.Input;
  const Radio = SettingsScreen_DS.Radio;
  const Checkbox = SettingsScreen_DS.Checkbox;
  const Button = SettingsScreen_DS.Button;
  const Icon = SettingsScreen_DS.Icon;
  const Avatar = SettingsScreen_DS.Avatar;
  const Tag = SettingsScreen_DS.Tag;
  const Badge = SettingsScreen_DS.Badge;
  const settingsStyles = {
    page: {
      padding: '24px 32px 48px',
      maxWidth: 720,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-7)'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    divider: {
      height: 1,
      background: 'var(--divider)',
      margin: '2px 0'
    }
  };
  function SettingsScreen({
    onSaved
  }) {
    const [mode, setMode] = React.useState('srs');
    return /*#__PURE__*/React.createElement("div", {
      style: settingsStyles.page
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "18px"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Mara Okafor",
      size: "xl",
      status: "online"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-24)',
        fontWeight: 'var(--fw-black)',
        color: 'var(--text-strong)',
        lineHeight: 1.1
      }
    }, "Mara Okafor"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--text-muted)'
      }
    }, "mara@lingo.app \xB7 Level 14 \xB7 4,208 XP"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      color: "var(--coral-500)"
    }, "Spanish"), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--cyan-500)"
    }, "Japanese"), /*#__PURE__*/React.createElement(Tag, {
      color: "var(--mint-500)"
    }, "Turkish"))), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Edit profile"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: settingsStyles.eyebrow
    }, "Review"), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 'var(--space-4)'
      },
      padding: "18px"
    }, /*#__PURE__*/React.createElement(Switch, {
      label: "Autoplay audio",
      hint: "Plays the native recording when a card flips",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement("div", {
      style: settingsStyles.divider
    }), /*#__PURE__*/React.createElement(Switch, {
      label: "Show phonetics on the front",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement("div", {
      style: settingsStyles.divider
    }), /*#__PURE__*/React.createElement(Switch, {
      label: "Reverse cards occasionally",
      hint: "Asks you to produce the target word instead of recognising it"
    }), /*#__PURE__*/React.createElement("div", {
      style: settingsStyles.divider
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-6)',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 200
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Daily limit",
      options: ['20 cards', '40 cards', '80 cards', 'No limit'],
      defaultValue: "40 cards"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 200
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Session length",
      options: ['5 minutes', '10 minutes', '20 minutes'],
      defaultValue: "10 minutes"
    }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: settingsStyles.eyebrow
    }, "Scheduling"), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 'var(--space-4)'
      },
      padding: "18px"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Spaced repetition",
      hint: "Recommended \u2014 intervals grow as you get things right",
      value: "srs",
      checked: mode === 'srs',
      onChange: setMode
    }), /*#__PURE__*/React.createElement(Radio, {
      label: "Cram",
      hint: "Every card, every session, no intervals",
      value: "cram",
      checked: mode === 'cram',
      onChange: setMode
    }), /*#__PURE__*/React.createElement(Radio, {
      label: "Leeches only",
      hint: "Just the cards you keep forgetting",
      value: "leech",
      checked: mode === 'leech',
      onChange: setMode
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: settingsStyles.eyebrow
    }, "Reminders"), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 'var(--space-4)'
      },
      padding: "18px"
    }, /*#__PURE__*/React.createElement(Switch, {
      label: "Daily reminder",
      hint: "20:00, every day",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement("div", {
      style: settingsStyles.divider
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Email me a weekly summary",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Nudge me when a streak is about to break"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 260,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Reminder email",
      type: "email",
      defaultValue: "mara@lingo.app"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 'var(--gap-inline)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost"
    }, "Discard"), /*#__PURE__*/React.createElement(Button, {
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16
      }),
      onClick: onSaved
    }, "Save changes")));
  }
  Object.assign(window, {
    SettingsScreen,
    settingsStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingFooter.jsx
try { (() => {
(function () {
  const MarketingFooter_DS = window.LingoToolboxDesignSystem_898611;
  const Icon = MarketingFooter_DS.Icon;
  const Input = MarketingFooter_DS.Input;
  const Button = MarketingFooter_DS.Button;
  const Tag = MarketingFooter_DS.Tag;
  const footerStyles = {
    wrap: {
      background: 'var(--ink-900)',
      color: 'var(--ink-100)'
    },
    inner: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '56px 24px 32px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-9)'
    },
    head: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      marginBottom: 'var(--space-5)'
    },
    link: {
      fontSize: 'var(--fs-14)',
      color: 'var(--ink-100)',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    },
    bottom: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '20px 24px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)',
      flexWrap: 'wrap'
    },
    langs: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 'var(--space-5)'
    }
  };
  const LANGS = ['Spanish', 'Japanese', 'Turkish', 'French', 'German', 'Portuguese', 'Italian', 'Korean', 'Dutch', 'Polish', 'Greek', 'Swedish', 'Arabic', 'Hindi'];
  function MarketingFooter() {
    return /*#__PURE__*/React.createElement("footer", {
      style: footerStyles.wrap
    }, /*#__PURE__*/React.createElement("div", {
      style: footerStyles.inner
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/logo-wordmark-white.svg",
      alt: "Lingo Toolbox",
      style: {
        height: 38
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '16px 0 0',
        fontSize: 'var(--fs-14)',
        lineHeight: 'var(--lh-relaxed)',
        color: 'var(--ink-200)',
        maxWidth: 300
      }
    }, "The tools you open after the lesson. Built in the open, MIT licensed."), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 280,
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: footerStyles.head
    }, "Word of the day, by email"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "you@email.com",
      size: "md"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "md"
    }, "Join")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: footerStyles.head
    }, "Tools"), /*#__PURE__*/React.createElement("div", {
      style: footerStyles.col
    }, ['Flashcards', 'Etymology Explorer', 'Conjugation Drill', 'Phrasebook', 'Grammar Notes'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      style: footerStyles.link
    }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: footerStyles.head
    }, "Project"), /*#__PURE__*/React.createElement("div", {
      style: footerStyles.col
    }, ['About', 'Blog', 'Roadmap', 'Press kit', 'Contact'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      style: footerStyles.link
    }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: footerStyles.head
    }, "Support"), /*#__PURE__*/React.createElement("div", {
      style: footerStyles.col
    }, ['Docs', 'Self-hosting guide', 'Import from Anki', 'Issue tracker', 'Privacy'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      style: footerStyles.link
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: '0 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: footerStyles.head
    }, "14 languages"), /*#__PURE__*/React.createElement("div", {
      style: footerStyles.langs
    }, LANGS.map(l => /*#__PURE__*/React.createElement(Tag, {
      key: l,
      color: "var(--violet-300)"
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: footerStyles.bottom
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'var(--ink-300)',
        flex: 1
      }
    }, "\xA9 2026 Lingo Toolbox contributors \xB7 MIT licence"), ['globe', 'mail', 'share-2'].map(i => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        color: 'var(--ink-200)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: i,
      size: 18
    })))));
  }
  Object.assign(window, {
    MarketingFooter,
    footerStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingHero.jsx
try { (() => {
(function () {
  const MarketingHero_DS = window.LingoToolboxDesignSystem_898611;
  const Button = MarketingHero_DS.Button;
  const Icon = MarketingHero_DS.Icon;
  const Flashcard = MarketingHero_DS.Flashcard;
  const Tag = MarketingHero_DS.Tag;
  const ReviewRating = MarketingHero_DS.ReviewRating;
  const StreakPill = MarketingHero_DS.StreakPill;
  const heroStyles = {
    section: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px 24px 64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-11)',
      alignItems: 'center'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--violet-600)'
    },
    h1: {
      margin: '12px 0 0',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-72)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.02,
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-strong)'
    },
    lead: {
      margin: '20px 0 0',
      fontSize: 'var(--fs-18)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-muted)',
      maxWidth: 460
    },
    ctas: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-8)',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    proof: {
      display: 'flex',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-9)'
    },
    stat: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-32)',
      fontWeight: 'var(--fw-black)',
      color: 'var(--text-strong)',
      lineHeight: 1
    },
    statLabel: {
      fontSize: 'var(--fs-13)',
      color: 'var(--text-faint)'
    },
    stageWrap: {
      background: 'var(--violet-500)',
      borderRadius: 'var(--radius-2xl)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  };
  function MarketingHero({
    onCta
  }) {
    const [flipped, setFlipped] = React.useState(false);
    return /*#__PURE__*/React.createElement("section", {
      style: heroStyles.section
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: heroStyles.eyebrow
    }, "Open source \xB7 five tools \xB7 14 languages"), /*#__PURE__*/React.createElement("h1", {
      style: heroStyles.h1
    }, "Practise the words you nearly know."), /*#__PURE__*/React.createElement("p", {
      style: heroStyles.lead
    }, "Lingo Toolbox isn't another course. It's the set of tools you open after the lesson \u2014 flashcards that know when to ask, and an etymology explorer that makes a word stick for good."), /*#__PURE__*/React.createElement("div", {
      style: heroStyles.ctas
    }, /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      pill: true,
      onClick: onCta,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Open the app"), /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      pill: true,
      variant: "outline",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "play",
        size: 16
      })
    }, "See a review session")), /*#__PURE__*/React.createElement("div", {
      style: heroStyles.proof
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: heroStyles.stat
    }, "1.2M"), /*#__PURE__*/React.createElement("span", {
      style: heroStyles.statLabel
    }, "cards reviewed daily")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: heroStyles.stat
    }, "14"), /*#__PURE__*/React.createElement("span", {
      style: heroStyles.statLabel
    }, "languages")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: heroStyles.stat
    }, "MIT"), /*#__PURE__*/React.createElement("span", {
      style: heroStyles.statLabel
    }, "licensed, self-hostable")))), /*#__PURE__*/React.createElement("div", {
      style: heroStyles.stageWrap
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-11)',
        fontWeight: 'var(--fw-black)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,.75)'
      }
    }, "Kitchen Spanish \xB7 12 due"), /*#__PURE__*/React.createElement(StreakPill, {
      days: 26
    })), /*#__PURE__*/React.createElement("div", {
      "data-theme": "dark",
      style: {
        background: 'var(--ink-700)',
        borderRadius: 'var(--radius-xl)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Flashcard, {
      language: "Spanish",
      front: "sobremesa",
      phonetic: "/so.b\u027Ee\u02C8me.sa/",
      back: "the long talk after a meal",
      height: 210,
      flipped: flipped,
      onFlip: setFlipped,
      hint: flipped ? 'Grade yourself below' : 'Click to flip',
      tags: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tag, {
        color: "var(--cyan-300)"
      }, "noun"), /*#__PURE__*/React.createElement(Tag, {
        color: "var(--mint-300)"
      }, "B1"))
    }), /*#__PURE__*/React.createElement(ReviewRating, {
      onGrade: () => setFlipped(false),
      showDue: false
    }))));
  }
  Object.assign(window, {
    MarketingHero,
    heroStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingNav.jsx
try { (() => {
(function () {
  const MarketingNav_DS = window.LingoToolboxDesignSystem_898611;
  const Button = MarketingNav_DS.Button;
  const Icon = MarketingNav_DS.Icon;
  const Badge = MarketingNav_DS.Badge;
  const navStyles = {
    bar: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(255,255,255,.86)',
      backdropFilter: 'var(--blur-overlay)',
      boxShadow: 'inset 0 -1px 0 var(--border)'
    },
    inner: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      height: 68,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      padding: '0 24px'
    },
    links: {
      display: 'flex',
      gap: 'var(--space-7)',
      flex: 1
    },
    link: {
      fontSize: 'var(--fs-14)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-body)',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  };
  function MarketingNav({
    onCta
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: navStyles.bar
    }, /*#__PURE__*/React.createElement("div", {
      style: navStyles.inner
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/logo-wordmark-violet.svg",
      alt: "Lingo Toolbox",
      style: {
        height: 34
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: navStyles.links
    }, ['Tools', 'How it works', 'Languages', 'Open source'].map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      style: navStyles.link
    }, l))), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "md"
    }, "Log in"), /*#__PURE__*/React.createElement(Button, {
      size: "md",
      pill: true,
      onClick: onCta,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Open the app")));
  }
  Object.assign(window, {
    MarketingNav,
    navStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingOpenSource.jsx
try { (() => {
(function () {
  const MarketingOSS_DS = window.LingoToolboxDesignSystem_898611;
  const Card = MarketingOSS_DS.Card;
  const Button = MarketingOSS_DS.Button;
  const Icon = MarketingOSS_DS.Icon;
  const Badge = MarketingOSS_DS.Badge;
  const Tag = MarketingOSS_DS.Tag;
  const ossStyles = {
    section: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px 24px'
    },
    head: {
      textAlign: 'center',
      maxWidth: 620,
      margin: '0 auto var(--space-9)'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    h2: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-48)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.05,
      color: 'var(--text-strong)'
    },
    sub: {
      margin: '14px 0 0',
      fontSize: 'var(--fs-18)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-muted)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)',
      alignItems: 'start'
    },
    row: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      fontSize: 'var(--fs-14)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-normal)'
    },
    iconTile: {
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-md)',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--surface-sunken)',
      color: 'var(--text-body)'
    },
    cta: {
      background: 'var(--violet-500)',
      borderRadius: 'var(--radius-2xl)',
      padding: '56px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  };
  const WAYS = [{
    name: 'Run it hosted',
    icon: 'globe',
    copy: 'Use the community instance. Nothing to install, every tool unlocked.',
    cta: 'Open the app',
    variant: 'primary',
    badge: 'Easiest',
    points: ['All five tools, all 14 languages', 'Unlimited decks and cards', 'Your data exportable any time']
  }, {
    name: 'Self-host',
    icon: 'download',
    copy: 'One container, one Postgres. Keep every card on your own machine.',
    cta: 'Read the docs',
    variant: 'secondary',
    points: ['Docker compose in the repo', 'No telemetry, no accounts server', 'Import from CSV and Anki']
  }, {
    name: 'Contribute',
    icon: 'git-branch',
    copy: 'Add a tool, a language pack, or a better scheduler. Reviews are public.',
    cta: 'Good first issues',
    variant: 'secondary',
    points: ['MIT licensed, no CLA', 'Design system published here', 'Weekly community call']
  }];
  function MarketingOpenSource({
    onCta
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      style: ossStyles.section
    }, /*#__PURE__*/React.createElement("div", {
      style: ossStyles.head
    }, /*#__PURE__*/React.createElement("span", {
      style: ossStyles.eyebrow
    }, "Open source"), /*#__PURE__*/React.createElement("h2", {
      style: ossStyles.h2
    }, "Free, and yours to fork."), /*#__PURE__*/React.createElement("p", {
      style: ossStyles.sub
    }, "Lingo Toolbox is built in the open under the MIT licence. Use the hosted instance, run your own, or send a pull request \u2014 there is no paid tier to unlock.")), /*#__PURE__*/React.createElement("div", {
      style: ossStyles.grid
    }, WAYS.map(w => /*#__PURE__*/React.createElement(Card, {
      key: w.name,
      padding: "24px",
      selected: w.variant === 'primary'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: ossStyles.iconTile
    }, /*#__PURE__*/React.createElement(Icon, {
      name: w.icon,
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-20)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)',
        flex: 1
      }
    }, w.name), w.badge && /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, w.badge)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-14)',
        color: 'var(--text-muted)',
        lineHeight: 'var(--lh-relaxed)'
      }
    }, w.copy), /*#__PURE__*/React.createElement(Button, {
      block: true,
      size: "lg",
      variant: w.variant,
      onClick: onCta
    }, w.cta), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 4
      }
    }, w.points.map(p => /*#__PURE__*/React.createElement("span", {
      key: p,
      style: ossStyles.row
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--success)',
        flex: 'none',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    })), p)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        justifyContent: 'center',
        marginTop: 'var(--space-7)',
        flexWrap: 'wrap'
      }
    }, ['MIT licence', 'Self-hostable', 'No tracking', 'Data export', 'Community translated'].map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      color: "var(--violet-500)"
    }, t)))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...ossStyles.section,
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: ossStyles.cta
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/logo-wordmark-white.svg",
      alt: "Lingo Toolbox",
      style: {
        height: 72
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-32)',
        fontWeight: 'var(--fw-black)',
        color: '#fff',
        lineHeight: 1.1,
        maxWidth: 520
      }
    }, "Twelve cards a day is enough. Start with one."), /*#__PURE__*/React.createElement(Button, {
      size: "xl",
      pill: true,
      variant: "secondary",
      onClick: onCta,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Open the app"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-13)',
        color: 'rgba(255,255,255,.75)'
      }
    }, "MIT licensed \xB7 14 languages \xB7 self-host any time"))));
  }
  Object.assign(window, {
    MarketingOpenSource,
    ossStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingOpenSource.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingTools.jsx
try { (() => {
(function () {
  const MarketingTools_DS = window.LingoToolboxDesignSystem_898611;
  const Card = MarketingTools_DS.Card;
  const Icon = MarketingTools_DS.Icon;
  const Tag = MarketingTools_DS.Tag;
  const Button = MarketingTools_DS.Button;
  const EtymologyNode = MarketingTools_DS.EtymologyNode;
  const Badge = MarketingTools_DS.Badge;
  const ProgressBar = MarketingTools_DS.ProgressBar;
  const toolsStyles = {
    section: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '64px 24px'
    },
    head: {
      maxWidth: 640,
      marginBottom: 'var(--space-9)'
    },
    eyebrow: {
      fontSize: 'var(--fs-11)',
      fontWeight: 'var(--fw-black)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    },
    h2: {
      margin: '10px 0 0',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-48)',
      fontWeight: 'var(--fw-black)',
      lineHeight: 1.05,
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-strong)'
    },
    lead: {
      margin: '14px 0 0',
      fontSize: 'var(--fs-18)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-muted)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)'
    },
    feature: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-11)',
      alignItems: 'center',
      marginTop: 'var(--space-11)'
    },
    band: {
      background: 'var(--paper-50)',
      boxShadow: 'inset 0 1px 0 var(--border), inset 0 -1px 0 var(--border)'
    }
  };
  const TOOLS = [{
    label: 'Flashcards',
    icon: 'layers',
    color: 'var(--tool-flashcards)',
    copy: 'Spaced repetition that schedules itself around the words you keep dropping.'
  }, {
    label: 'Etymology Explorer',
    icon: 'git-branch',
    color: 'var(--tool-etymology)',
    copy: 'Follow a word back through every language it passed through.'
  }, {
    label: 'Conjugation Drill',
    icon: 'spell-check',
    color: 'var(--tool-conjugation)',
    copy: 'Forty forms in four minutes, weighted toward the ones you miss.'
  }, {
    label: 'Phrasebook',
    icon: 'message-square-quote',
    color: 'var(--tool-phrasebook)',
    copy: 'Save whole phrases where they were said, not just the words.'
  }, {
    label: 'Grammar Notes',
    icon: 'scroll-text',
    color: 'var(--tool-grammar)',
    copy: 'Short explanations you can pull up mid-review without losing your place.'
  }];
  function MarketingTools() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      style: toolsStyles.section
    }, /*#__PURE__*/React.createElement("div", {
      style: toolsStyles.head
    }, /*#__PURE__*/React.createElement("span", {
      style: toolsStyles.eyebrow
    }, "The toolbox"), /*#__PURE__*/React.createElement("h2", {
      style: toolsStyles.h2
    }, "Five tools, one workspace."), /*#__PURE__*/React.createElement("p", {
      style: toolsStyles.lead
    }, "Each tool does one thing well and shares the same deck of words, so nothing you save is stranded in a single exercise.")), /*#__PURE__*/React.createElement("div", {
      style: toolsStyles.grid
    }, TOOLS.map(t => /*#__PURE__*/React.createElement(Card, {
      key: t.label,
      accent: t.color,
      interactive: true
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        background: 'color-mix(in oklab,' + t.color + ' 16%, transparent)',
        color: t.color
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-20)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text-strong)'
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-14)',
        lineHeight: 'var(--lh-relaxed)',
        color: 'var(--text-muted)'
      }
    }, t.copy))))), /*#__PURE__*/React.createElement("div", {
      style: toolsStyles.band
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        ...toolsStyles.section,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...toolsStyles.feature,
        marginTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: toolsStyles.eyebrow
    }, "Etymology Explorer"), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...toolsStyles.h2,
        fontSize: 'var(--fs-40)'
      }
    }, "A word sticks once you know where it's been."), /*#__PURE__*/React.createElement("p", {
      style: toolsStyles.lead
    }, "Trace any word down to its root and pick up its cousins on the way. Add the whole chain to a deck in one click."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      pill: true,
      variant: "secondary",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Try it on a word"))), /*#__PURE__*/React.createElement(Card, {
      padding: "24px"
    }, /*#__PURE__*/React.createElement(EtymologyNode, {
      word: "sobremesa",
      language: "Spanish",
      era: "c. 1600",
      gloss: "the time spent at the table after eating",
      current: true
    }), /*#__PURE__*/React.createElement(EtymologyNode, {
      word: "super mensam",
      language: "Latin",
      era: "classical",
      gloss: "over the table"
    }), /*#__PURE__*/React.createElement(EtymologyNode, {
      word: "*mens-",
      language: "Proto-Indo-European",
      era: "reconstructed",
      gloss: "to measure out \u2014 also month, moon",
      connector: false
    }))), /*#__PURE__*/React.createElement("div", {
      style: toolsStyles.feature
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "24px"
    }, /*#__PURE__*/React.createElement("span", {
      style: toolsStyles.eyebrow
    }, "Today \xB7 Kitchen Spanish"), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Session",
      valueLabel: "18 / 40",
      value: 18,
      max: 40
    }), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Mastery mix",
      segments: [{
        weight: 62,
        color: 'var(--success)'
      }, {
        weight: 24,
        color: 'var(--warning)'
      }, {
        weight: 14,
        color: 'var(--paper-200)'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "62% mastered"), /*#__PURE__*/React.createElement(Badge, {
      tone: "warning"
    }, "24% learning"), /*#__PURE__*/React.createElement(Badge, null, "14% new"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: toolsStyles.eyebrow
    }, "Flashcards"), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...toolsStyles.h2,
        fontSize: 'var(--fs-40)'
      }
    }, "It asks you before you forget."), /*#__PURE__*/React.createElement("p", {
      style: toolsStyles.lead
    }, "Grade a card Again, Hard, Good or Easy and the schedule adjusts. Sessions end when you're done, not when a lesson says so."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        marginTop: 'var(--space-6)',
        flexWrap: 'wrap'
      }
    }, ['spaced repetition', 'reverse cards', 'audio on flip', 'leech rescue'].map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      color: "var(--violet-600)"
    }, t))))))));
  }
  Object.assign(window, {
    MarketingTools,
    toolsStyles
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingTools.jsx", error: String((e && e.message) || e) }); }


})();
