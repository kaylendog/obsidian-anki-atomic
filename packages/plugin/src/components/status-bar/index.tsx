import { useDeckQuery } from "anki-query";

import styles from "./styles.module.css";

export const PluginStatusBarItem: React.FC = () => {
	const { data } = useDeckQuery("deckNames", undefined);

	// if no data, Anki is not running
	if (data === undefined) {
		return <span className={styles.StatusBar}>Anki Atomic 🚫</span>;
	}

	return <span className={styles.StatusBar}>Anki Atomic ⚡</span>;
};
