import { Setting as ObsidianSetting } from "obsidian";
import * as Preact from "preact";
import { useEffect } from "preact/hooks";

import { usePlugin } from "../../context/plugin";
import { useSettings } from "./context";

export const Setting: Preact.FunctionComponent<{
	name: string;
	description: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}> = ({ name, description, placeholder, value, onChange }) => {
	const el = useSettings();
	const plugin = usePlugin();

	useEffect(() => {
		if (parent === null) {
			return;
		}
		const setting = new ObsidianSetting(el);
		setting
			.setName(name)
			.setDesc(description)
			.addText((text) => {
				if (placeholder !== undefined) {
					text.setPlaceholder(placeholder);
				}
				text.setValue(value).onChange(onChange);

				plugin;
			});

		return () => {
			setting.clear();
		};
	}, [parent]);

	return <></>;
};
