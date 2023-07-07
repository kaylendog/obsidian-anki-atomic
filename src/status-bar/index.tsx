import * as Preact from "preact";

import styles from "./styles.module.css";

export const PluginStatusBarItem: Preact.FunctionComponent = () => (
	<span className={styles.StatusBar}>Anki Atomic</span>
);
