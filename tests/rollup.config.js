import istanbul from 'rollup-plugin-istanbul';

import multiEntry from 'rollup-plugin-multi-entry';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'tests/attributes-test.js',
  external: ['ava'],
  plugins: [multiEntry(), istanbul({
    exclude: ['tests/**/*-test.js']
  }), resolve(), commonjs()],
  output: {
    file: 'build/attributes-test.js',
    format: 'cjs',
    sourcemap: true
  }
};
