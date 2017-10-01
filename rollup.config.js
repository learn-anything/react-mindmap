import npm from 'rollup-plugin-node-resolve';

export default {
  input: './d3.bundle.js',

  output: {
    file: './dist/d3.js',
    format: 'umd',
    name: 'd3',
  },

  plugins: [npm({ jsnext: true })],
};
