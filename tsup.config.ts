import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  format: ['cjs'],
  legacyOutput: false,
  minify: true,
  noExternal: [/.*/],
  outDir: './dist',
  outExtension: () => ({ js: '.js' }),
  platform: 'node',
  silent: false,
  sourcemap: false,
  splitting: false,
  target: 'node22',
  tsconfig: './tsconfig.json',
});
