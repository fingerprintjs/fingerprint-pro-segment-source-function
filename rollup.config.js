import typescript from '@rollup/plugin-typescript'
import jsonPlugin from '@rollup/plugin-json'
import licensePlugin from 'rollup-plugin-license'
import { join } from 'path'

const commonBanner = licensePlugin({
  banner: {
    content: {
      file: join(__dirname, 'resources', 'license_banner.txt'),
    },
  },
})

export default [
  {
    input: 'src/index.ts',
    plugins: [jsonPlugin(), typescript(), commonBanner],
    output: [
      {
        name: 'onRequest',
        exports: 'default',
        file: 'dist/fingerprint-pro-segment-source-function.js',
        format: 'iife',
      },
    ],
  },
]
