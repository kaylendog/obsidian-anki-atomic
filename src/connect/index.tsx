import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export { useCardQuery, useCardMutation } from "./cards";
export { useDeckQuery, useDeckMutation } from "./decks";
export { useGuiQuery, useGuiMutation } from "./gui";
export { useMediaQuery, useMediaMutation } from "./media";
export { useMiscQuery, useMiscMutation } from "./misc";
export { useModelQuery, useModelMutation } from "./model";
export { useNoteQuery, useNoteMutation } from "./note";
export { useStatisticQuery, useStatisticMutation } from "./statistic";

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
