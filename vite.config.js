// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1000,
        outDir: "dist",
        sourcemap: true,
    },
    resolve: {
        alias: {
            global: "global-this",
            crypto: "crypto-browserify",
            stream: "stream-browserify",
            assert: "assert",
            http: "stream-http",
            https: "https-browserify",
            os: "os-browserify/browser",
            url: "url",
        },
    },
});
