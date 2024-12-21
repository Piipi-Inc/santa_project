import { ConfigEnv, defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { readdirSync } from 'fs';

export default () => {
  return defineConfig({
    base: '/',
    server: {
      host: '127.0.0.1',
      port: 5173
    },
    build: {
      sourcemap: false,
      outDir: 'build',
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari12']
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: [...getSrcAliases()]
    }
  });
};

function getSrcAliases() {
  const srcDir = path.resolve(__dirname, 'src');
  const srcDirectories = readdirSync(srcDir, { withFileTypes: true }).filter((dir) => dir.isDirectory());

  return srcDirectories.map((dir) => ({ find: `${dir.name}`, replacement: `${path.resolve(srcDir, dir.name)}` }));
}
