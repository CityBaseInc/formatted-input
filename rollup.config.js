import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import visualizer from "rollup-plugin-visualizer";
import pkg from "./package.json";

const globals = {
  react: "React"
};

const plugins = [
  resolve(),
  babel({
    exclude: "node_modules/**",
    presets: ["@babel/env", "@babel/preset-react"]
  }),
  commonjs(),
  visualizer()
];

const external = [...Object.keys(pkg.peerDependencies || {})];

const output_data = [
  {
    file: pkg.main,
    format: "cjs"
  },
  {
    file: pkg.module,
    format: "esm"
  }
];

export default output_data.map(({ file, format }) => ({
  input: "src/index.js",
  output: {
    file,
    format,
    globals
  },
  plugins,
  external
}));
