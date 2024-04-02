import { QueryClient } from "@tanstack/react-query";
import { AnkiQueryProvider } from "anki-query";
import { Plugin } from "obsidian";
import ReactDOM from "react-dom/client";

import { AnkiAtomicSettingTab } from "./components/settings";
import { PluginStatusBarItem } from "./components/status-bar";
import { PluginContext } from "./context/plugin";
import { debug } from "./util/log";

interface ObsidianAnkiAtomicSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ObsidianAnkiAtomicSettings = {
	mySetting: "default",
};

export default class ObsidianAnkiAtomic extends Plugin {
	private settings: ObsidianAnkiAtomicSettings = DEFAULT_SETTINGS;
	private queryClient = new QueryClient();

	async onload() {
		await this.loadSettings();

		// setup settings
		this.addSettingTab(new AnkiAtomicSettingTab(this));
		// mount status bar
		this.mountComponent(<PluginStatusBarItem />, this.addStatusBarItem());

		debug("Plugin loaded.");
	}

	onunload() {
		// unmount all React components
		debug("Unmounting React components...");
		this.memoizedRoots.forEach((root) => root.unmount());

		// destroy the query client
		this.queryClient.cancelQueries();
		this.queryClient.removeQueries();

		// save settings
		this.saveSettings();

		// done!
		debug("Plugin unloaded - goodbye!");
	}

	async loadSettings() {
		debug("Loading settings...");
		this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
		debug("Settings loaded:", this.settings);
	}

	async saveSettings() {
		debug("Saving settings...");
		await this.saveData(this.settings);
	}

	private memoizedRoots = new Map<HTMLElement, ReactDOM.Root>();

	/**
	 * Retrieve a component root from a DOM container.
	 * @param container
	 * @returns
	 */
	fetchComponentRoot(container: HTMLElement) {
		const root = this.memoizedRoots.get(container);
		if (root !== undefined) {
			return { root, exists: true };
		}
		return { root: ReactDOM.createRoot(container), exists: false };
	}

	/**
	 * Mount a component to a DOM container.
	 * @param Component
	 * @param container
	 * @returns
	 */
	mountComponent(children: React.ReactNode, container: HTMLElement) {
		const { root, exists } = this.fetchComponentRoot(container);
		// unmount any existing component
		if (exists) {
			root.unmount();
		}
		// render the new component
		root.render(
			<AnkiQueryProvider queryClient={this.queryClient} endpoint="http://localhost:8179">
				<PluginContext.Provider value={this}>{children}</PluginContext.Provider>
			</AnkiQueryProvider>
		);
	}
}
