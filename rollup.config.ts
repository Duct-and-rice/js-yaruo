import resolve from 'rollup-plugin-node-resolve'
import typescript2 from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.ts',
    output: {
        file: 'index.js',
        format: 'umd',
        sourcemap: false,
        name: 'js-yaruo'
    },
    external: ['canvas'],
    plugins: [
        typescript2({
        }),
        resolve({
            extensions: [ '.ts', '.js' ],
            main: true,
            module: true,
            preferBuiltins: true
        })
    ]

}
