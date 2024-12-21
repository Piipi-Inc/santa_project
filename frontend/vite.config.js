var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { readdirSync } from 'fs';
export default (function () {
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
            alias: __spreadArray([], getSrcAliases(), true)
        }
    });
});
function getSrcAliases() {
    var srcDir = path.resolve(__dirname, 'src');
    var srcDirectories = readdirSync(srcDir, { withFileTypes: true }).filter(function (dir) { return dir.isDirectory(); });
    return srcDirectories.map(function (dir) { return ({ find: "".concat(dir.name), replacement: "".concat(path.resolve(srcDir, dir.name)) }); });
}
