import * as Preact from "preact";

import { SettingsContext } from "./context";

export const Settings: Preact.FunctionComponent<{
	ref: HTMLElement;
	children: Preact.ComponentChildren;
}> = ({ ref, children }) => {
	return <SettingsContext.Provider value={ref}>{children}</SettingsContext.Provider>;
};
