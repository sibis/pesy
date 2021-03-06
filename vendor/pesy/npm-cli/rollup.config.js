// rollup.config.js
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
  input: "src/Pesy.bs.js",
  output: {
    file: "pesy.bundle.js",
    format: "cjs"
  },
  plugins: [
    nodeResolve(),
    commonjs({
      ignore: ["child_process"]
    })
  ],
  external: ["child_process", "fs", "process"]
};
