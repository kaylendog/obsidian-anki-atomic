import { useState } from "react";
import { SettingsContext } from "./context";
import { Textbox } from "./textbox";
import { Toggle } from "./toggle";

export const Settings: React.FC<{
	parent: HTMLElement;
}> = ({ parent }) => {
	const [enabled, setEnabled] = useState(false);
	const [endpoint, setEndpoint] = useState("");

	return (
		<SettingsContext.Provider value={parent}>
			<h1>Anki Atomic</h1>
			<Toggle
				name="Enable Anki Sync"
				description="Enables syncing of atomic notes with Anki."
				value={enabled}
				onChange={setEnabled}
			/>
			<Textbox
				name="AnkiConnect Endpoint"
				description="The endpoint via which AnkiConnect is accessible."
				onChange={(value) => setEndpoint(value)}
				value={endpoint}
			/>
		</SettingsContext.Provider>
	);
};
