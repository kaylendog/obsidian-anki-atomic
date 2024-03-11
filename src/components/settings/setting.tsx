import { useEffect } from "react";
import { Setting as ObsidianSetting } from "obsidian";

import { useSettings } from "./context";

export const Setting: React.FC<{
	name: string;
	description: string;
	builder: (setting: ObsidianSetting) => ObsidianSetting;
}> = ({ name, description, builder }) => {
	const el = useSettings();

	useEffect(() => {
		if (parent === null) {
			return;
		}
		const setting = builder(new ObsidianSetting(el).setName(name).setDesc(description));
		return () => {
			setting.clear();
		};
	}, [parent]);

	return null;
};
