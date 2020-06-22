import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "index",
      file: pkg.main,
      format: "umd",
      globals: {
        react: "React"
      }
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/env", "@babel/preset-react"]
      }),
      commonjs()
    ],
    external: ["react", "prop-types"]
  }
];

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import visualizer from "rollup-plugin-visualizer";
import pkg from "./package.json";

import * as formattedInput from "formatted-input";

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
};

const plugins = [
  resolve({ preferBuiltins: false }),
  babel({
    exclude: "node_modules/**",
    presets: ["@babel/env", "@babel/preset-react"]
  }),
  json(),
  commonjs({
    include: "node_modules/**",
    namedExports: {
      "formatted-input": Object.keys(formattedInput)
    }
  }),
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
