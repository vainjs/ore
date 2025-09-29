import { defineConfig } from 'rolldown'
import pkg from './package.json' with { type: 'json' }

const external = Object.keys(pkg.peerDependencies || {})

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      entryFileNames: '[name].js',
      dir: 'dist/es',
      format: 'es',
      minify: true,
    },
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      entryFileNames: '[name].cjs',
      dir: 'dist/cjs',
      format: 'cjs',
      minify: true,
    },
    external,
  },
])
