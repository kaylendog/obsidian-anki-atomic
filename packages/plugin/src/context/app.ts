import { usePlugin } from "./plugin";

export const useApp = () => {
	const plugin = usePlugin();
	return plugin.app;
};
