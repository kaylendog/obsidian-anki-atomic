/**
 * Log a message to the console, using the provided method.
 * @param message
 * @param method
 */
const useLog =
	(method: (...message: unknown[]) => void) =>
	(...message: unknown[]) => {
		method("%c[anki-atomic]", "color: #ff00ff", ...message);
	};

/**
 * Log a message to the console.
 */
export const log = useLog(console.log);

/**
 * Log a warning to the console.
 */
export const warn = useLog(console.warn);

/**
 * Log an error to the console.
 */
export const error = useLog(console.error);

/**
 * Log a debug message to the console.
 */
export const debug = useLog(console.debug);
