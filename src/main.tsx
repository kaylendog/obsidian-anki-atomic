import { Plugin } from "obsidian";
import ReactDOM from "react-dom/client";

import { AnkiAtomicSettingTab } from "./components/settings";
import { PluginStatusBarItem } from "./components/status-bar";
import { AnkiConnectProvider } from "./connect";
import { PluginContext } from "./context/plugin";

interface ObsidianAnkiAtomicSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ObsidianAnkiAtomicSettings = {
	mySetting: "default",
};

export default class ObsidianAnkiAtomic extends Plugin {
	private settings: ObsidianAnkiAtomicSettings = DEFAULT_SETTINGS;

	async onload() {
		// setup settings
		this.addSettingTab(new AnkiAtomicSettingTab(this));
		// mount status bar
		this.mountComponent(<PluginStatusBarItem />, this.addStatusBarItem());
	}

	onunload() {}

	async loadSettings() {
		this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
	}

	async saveSettings() {
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
			<AnkiConnectProvider>
				<PluginContext.Provider value={this}>{children}</PluginContext.Provider>
			</AnkiConnectProvider>
		);
	}
}
