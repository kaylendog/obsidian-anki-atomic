import { resolve } from "path";
import { defineConfig } from "vite";

import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		outDir: ".",
		watch: {
			include: ["src/**"],
		},
		lib: {
			entry: resolve(__dirname, "./src/main.tsx"),
			name: "obsidian-anki-atomic",
			fileName: "main",
			formats: ["cjs"],
		},
		rollupOptions: {
			external: ["obsidian"],
			output: {
				assetFileNames: "styles.css",
			},
		},
	},
});
