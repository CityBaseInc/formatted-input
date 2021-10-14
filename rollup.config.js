import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "formatted-input",
      file: pkg.browser,
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
  },
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
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
