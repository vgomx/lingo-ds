// Maps `react-dom` onto the page's own ReactDOM for the browser bundle.
//
// Same reason as react-global.cjs, plus a size one: without this alias, esbuild
// resolves react-dom from node_modules and bundles the whole renderer, which
// took _ds_bundle.js from 101 KB to 1.3 MB the moment Dialog started using
// createPortal. The specimen cards already load react-dom from a UMD <script>,
// so the global is there to borrow.

const ReactDOM = globalThis.ReactDOM;

if (!ReactDOM) {
  throw new Error(
    'lingo-ds browser bundle: window.ReactDOM is missing. Load react-dom before ' +
    'this script — the bundle deliberately does not carry its own copy.',
  );
}

module.exports = ReactDOM;
