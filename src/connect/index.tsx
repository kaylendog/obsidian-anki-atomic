import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { atom } from "jotai";

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
 * The URL for AnkiConnect.
 */
export const ankiUrlAtom = atom("http://localhost:8765");

/**
 * The provider for AnkiConnect queries.
 * @param param0
 * @returns
 */
export const AnkiConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
