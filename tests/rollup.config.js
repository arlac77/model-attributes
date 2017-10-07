export default {
  input: 'tests/attributes-test.js',
  external: ['ava'],
  plugins: [],
  output: {
    file: 'build/attributes-test.js',
    format: 'cjs',
    sourcemap: true
  }
};
