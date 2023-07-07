import { createContext } from "preact";
import { useContext } from "preact/hooks";

export const SettingsContext = createContext<HTMLElement | null>(null);

export const useSettings = () => {
	const settings = useContext(SettingsContext);
	if (!settings) {
		throw new Error("SettingsContext not found");
	}
	return settings;
};
