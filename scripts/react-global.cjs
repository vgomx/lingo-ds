// Maps `react` onto the page's own React for the browser bundle.
//
// The specimen cards load React from a UMD <script> tag and then render their own
// JSX in the page. If the bundle carried its own copy of React, the page would
// have two — and only one of them gets wired up as the active hook dispatcher, so
// every component using a hook would throw. Aliasing the import to the global is
// what keeps them on the same instance.
//
// CommonJS on purpose: `import * as React from 'react'` then resolves to the
// global's own exports rather than a wrapper around them.

const React = globalThis.React;

if (!React) {
  throw new Error(
    'lingo-ds browser bundle: window.React is missing. Load React before this ' +
    'script — the bundle deliberately does not carry its own copy.',
  );
}

module.exports = React;
