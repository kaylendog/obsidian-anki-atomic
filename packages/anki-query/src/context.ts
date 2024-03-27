import { createContext } from "react";

/**
 * Context for AnkiConnect queries.
 */
export const AnkiQueryContext = createContext({
	endpoint: "http://localhost:8765",
});
