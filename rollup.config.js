import executable from 'rollup-plugin-executable';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  plugins: [],

  output: {
    file: pkg.main,
    format: 'cjs'
  },

  external: [],
  input: pkg.module
};
