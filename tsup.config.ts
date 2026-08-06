import { defineConfig } from 'tsup';

export default defineConfig([
  // The package consumers install.
  {
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
  },

  /**
   * The browser bundle the specimen cards and UI kits run on.
   *
   * This used to be a checked-in artefact from the original export, carrying its
   * own frozen copy of every component. That meant two implementations of the
   * library: the one consumers install, and the one the published showcase
   * renders — and six separate fixes had to be applied to both by hand. Building
   * it from the same entry point as the package means the showcase can only ever
   * demonstrate what actually ships.
   *
   * Both `react` and `react/jsx-runtime` are aliased to the page's global. The
   * subpath needs its own entry: esbuild's alias matches by prefix, so aliasing
   * `react` alone rewrites `react/jsx-runtime` into a directory under the shim
   * and fails to resolve.
   *
   * Written to dist/ and copied into place by scripts/write-ds-bundle.mjs —
   * pointing outDir at the repo root would put a `clean` away from deleting it.
   */
  {
    entry: { 'ds-bundle': 'index.ts' },
    format: ['iife'],
    globalName: 'LingoToolboxDesignSystem_898611',
    outDir: 'dist',
    dts: false,
    sourcemap: false,
    clean: false,
    esbuildOptions(options) {
      options.alias = {
        ...options.alias,
        'react/jsx-runtime': './scripts/react-jsx-runtime-global.cjs',
        react: './scripts/react-global.cjs',
        'react-dom': './scripts/react-dom-global.cjs',
      };
    },
  },
]);
