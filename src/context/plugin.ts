import { createContext } from "preact";
import { useContext } from "preact/hooks";
import ObsidianAnkiAtomic from "src/main";

export const PluginContext = createContext<ObsidianAnkiAtomic | null>(null);

export const usePlugin = () => {
	const plugin = useContext(PluginContext);
	if (!plugin) {
		throw new Error("PluginContext not found");
	}
	return plugin;
};
