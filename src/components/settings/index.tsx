/* eslint-disable @typescript-eslint/naming-convention */
import { atom } from "jotai";
import { PluginSettingTab } from "obsidian";
import ObsidianAnkiAtomic from "src/main";

import { Settings } from "./settings";

export const pluginEnabledAtom = atom(true);
export const ankiEndpointAtom = atom("http://localhost:8765");

export const settingsAtom = atom((get) => ({
	enabled: get(pluginEnabledAtom),
	ankiEndpoint: get(ankiEndpointAtom),
}));

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
