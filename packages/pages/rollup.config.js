import { nodeResolve }  from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import postcss from 'rollup-plugin-postcss'
import path from 'path'
export default {
  input: "src/index.ts",
  acornInjectPlugins: [jsx()],

  plugins: [
    postcss({
      plugins: [],
      extract: true,
      modules: true,
    }),
    nodeResolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      jsx: 'preserve',
      declaration:true,  
  }),
    babel({ 
      presets: ['@babel/preset-react'], 
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'] 
    })
  ],
  output: {
    dir:path.join(__dirname,'dist'),
    format: 'cjs',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      })
    ]
  },
  external: ['react','axios'] // 增加了这一行。
}





