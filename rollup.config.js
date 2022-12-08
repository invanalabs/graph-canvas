import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// To handle css files
import postcss from "rollup-plugin-postcss";
import babel from '@rollup/plugin-babel';

import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import image from '@rollup/plugin-image';


import packageJson from "./package.json" assert {type: "json"};

const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-scripts': 'ReactScripts',
    "react/jsx-runtime": "react/jsx-runtime"
};

export default [
    {
        input: "src/index.ts",
        external: Object.keys(externals),
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                "exports": "named",
                file: packageJson.module,
                // dir: 'esm/',
                format: "esm",
                sourcemap: true,
                preserveModules: false,
            },  {
                file: "dist/umd/bundle.js",
                format: "umd",
                exports: "named",
                extend: true,
                name: "HelloApp",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            // typescript(),
            // postcss(),

            // terser(),
            // image()
            babel({
                // exclude: 'node_modules/**',
                presets: ["@babel/preset-react", {runtime: 'classic'}],
                // presets: ["@babel/preset-react"],
            }),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],

        external: [/\.css$/], // telling rollup anything that is .css aren't part of type exports
    },
]