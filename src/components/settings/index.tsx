import { SettingsContext } from "./context";

export const Settings: React.FC<{
	ref: HTMLElement;
	children: React.ReactNode;
}> = ({ ref, children }) => {
	return <SettingsContext.Provider value={ref}>{children}</SettingsContext.Provider>;
};
