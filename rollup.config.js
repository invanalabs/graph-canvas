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
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import packageJson from "./package.json" assert {type: "json"};

const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-scripts': 'ReactScripts',
    "react/jsx-runtime": "react/jsx-runtime"
};

const ModuleName = "GraphCanvas"

const getPluginsConfig = (prod, mini) => {
    let plugins = [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({tsconfig: "./tsconfig.json"}),
        postcss({
            minimize: true,
            extract: true,
            // modules: true,
        }),

        terser(),
        // image()
        babel({
            babelHelpers: 'bundled',
            presets: [
                ["@babel/preset-react", {
                    runtime: 'classic',
                    useBuiltIns: "usage",
                    forceAllTransforms: true,
                }]
            ],
        })
    ]
    if (!prod) {

        plugins.push(serve({
            open: true,
            verbose: true,
            contentBase: ["", "examples/html-umd/"],
            host: "localhost",
            port: 3000,
        }))
        plugins.push(livereload({watch: "dist"}))
    }
    return plugins
}

export default CLIArgs => {
    const prod = !!CLIArgs.prod;
    const mini = !!CLIArgs.mini;
    const bundle = [
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
                }, {
                    file: "dist/umd/bundle.js",
                    format: "umd",
                    exports: "named",
                    extend: true,
                    name: ModuleName,
                    sourcemap: true,
                },
            ],
            plugins: []
        },
        {
            input: "dist/esm/types/index.d.ts",
            output: [{file: "dist/index.d.ts", format: "esm"}],
            plugins: [dts()],

            external: [/\.css$/, /\.scss$/], // telling rollup anything that is .css aren't part of type exports
        },
    ]
    bundle[0].plugins = getPluginsConfig(prod, mini)
    return bundle
}