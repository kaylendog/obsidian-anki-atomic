import { Plugin } from "obsidian";
import ReactDOM from "react-dom/client";

import { PluginContext } from "./context/plugin";
import { AnkiAtomicSettingTab } from "./settings";
import { PluginStatusBarItem } from "./status-bar";

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

	/**
	 * Mount a component to a DOM container.
	 * @param Component
	 * @param container
	 * @returns
	 */
	mountComponent = (children: React.ReactNode, container: HTMLElement) => {
		const root = ReactDOM.createRoot(container);
		root.render(<PluginContext.Provider value={this}>{children}</PluginContext.Provider>);
	};
}
