import alias from 'rollup-plugin-alias'
import resolve from 'rollup-plugin-node-resolve'
import typescript2 from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.ts',
    output: {
        file: 'index.js',
        format: 'es'
    },
    plugins: [
        typescript2(),
        resolve({
            extensions: [ '.ts' ],
            main: true,
            module: true,
            preferBuiltins: true
        }),
        alias({
            '@': './src/'
        })
    ]
}
