import { Setting, SettingTab } from "obsidian";

import ObsidianAnkiAtomic from "./main";

export class AnkiAtomicSettingTab extends SettingTab {
	constructor(private readonly plugin: ObsidianAnkiAtomic) {
		super();
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) => text.setPlaceholder("Enter your secret").setValue("UWU"));
	}
}
