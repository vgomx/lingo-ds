// Maps `react/jsx-runtime` onto the page's React for the browser bundle.
//
// tsconfig.json sets jsx: "react-jsx", and esbuild honours the tsconfig over its
// own jsx option for .tsx files, so the compiled output calls jsx()/jsxs() from
// this module rather than React.createElement. Aliasing `react` alone is not
// enough — esbuild would rewrite the subpath to a directory under the react shim
// and fail to resolve it.
//
// The automatic runtime's signature is jsx(type, props, key). createElement reads
// children and key straight off the config object it is given, so forwarding the
// props with key folded in reproduces it exactly. jsxs is the same function; it
// differs only in that the caller guarantees a static children array.

const React = globalThis.React;

if (!React) {
  throw new Error(
    'lingo-ds browser bundle: window.React is missing. Load React before this ' +
    'script — the bundle deliberately does not carry its own copy.',
  );
}

function jsx(type, props, key) {
  return React.createElement(type, key === undefined || key === null ? props : { ...props, key });
}

module.exports = {
  Fragment: React.Fragment,
  jsx,
  jsxs: jsx,
  jsxDEV: jsx,
};
