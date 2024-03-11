import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		emptyOutDir: false,
		watch: {
			include: ["src/**"],
			exclude: ["./main.js", "./styles.css"],
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
