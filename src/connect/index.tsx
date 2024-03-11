import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export { useCardQuery, useCardMutation } from "./cards";
export { useDeckQuery, useDeckMutation } from "./decks";
export { useGuiQuery, useGuiMutation } from "./gui";

/**
 * Internal query client for AnkiConnect.
 */
const queryClient = new QueryClient();

/**
 * The provider for AnkiConnect queries.
 * @param param0
 * @returns
 */
export const AnkiConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
