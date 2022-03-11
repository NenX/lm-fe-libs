// import { nodeResolve }  from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
// import typescript from '@rollup/plugin-typescript';
// import jsx from 'acorn-jsx';
// import postcss from 'rollup-plugin-postcss'

// export default {
//   input: "src/index.ts",
//   acornInjectPlugins: [jsx()],

//   plugins: [
//     postcss({
//       plugins: [],
//       extract: true,
//       modules: true,
//     }),
//     nodeResolve(),
//     commonjs(),
//     typescript({ jsx: 'preserve',declaration:true }),
//     babel({ 
//       presets: ['@babel/preset-react'], 
//       babelHelpers: 'bundled',
//       extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'] 
//     })
//   ],
//   output: {
//     file: 'dist/bundle.js',
//     format: 'esm',
//     plugins: [
//       getBabelOutputPlugin({
//         presets: ['@babel/preset-env'],
//       })
//     ]
//   },
//   external: ['react'] // 增加了这一行。
// }





