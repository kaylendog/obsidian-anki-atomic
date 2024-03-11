/* eslint-disable @typescript-eslint/naming-convention */
import { PluginSettingTab } from "obsidian";

import ObsidianAnkiAtomic from "./main";
import { Settings } from "./components/settings";

export class AnkiAtomicSettingTab extends PluginSettingTab {
	constructor(private readonly plugin: ObsidianAnkiAtomic) {
		super(plugin.app, plugin);
	}

	display() {
		const { containerEl } = this;

		// empty container, then mount settings component
		containerEl.empty();
		this.plugin.mountComponent(<Settings parent={containerEl} />, containerEl);
	}
}
