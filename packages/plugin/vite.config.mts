import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

console.log(process.env.NODE_ENV);
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
	},
	build: {
		emptyOutDir: false,
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
