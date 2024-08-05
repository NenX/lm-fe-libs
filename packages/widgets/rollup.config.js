import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import jsx from 'acorn-jsx'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import path from 'path'

export default {
    input: 'src/index.tsx',
    acornInjectPlugins: [jsx()],

    plugins: [
        postcss({
            use: [['less', { javascriptEnabled: true, math: 'always' }]],
            plugins: [],
            extract: true, //true：分离出css文件，false：会在style里插入css
        }),
        nodeResolve(),
        commonjs(),
        typescript({
            jsx: 'preserve',
            declaration: true,
            tsconfig: './tsconfig.json',
            outputToFilesystem: false,
            keyofStringsOnly: true,
        }),
        babel({
            presets: ['@babel/preset-react'],
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
        }),
        json(),
    ],
    output: {
        dir: path.resolve(__dirname, 'dist'),
        format: 'esm',
        plugins: [
            getBabelOutputPlugin({
                presets: ['@babel/preset-env'],
            }),
        ],
    },
    external: [
        'react',
        'react-dom',
        'axios',
        'antd',
        'store',
        'lodash',
        'moment',
        '@lm_fe/utils',
        '@lm_fe/components',
        '@ant-design/icons',
    ], // 增加了这一行。
}
