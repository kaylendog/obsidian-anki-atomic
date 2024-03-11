import { useAnkiMutation, useAnkiQuery } from "./query";

export interface GuiQueries {}

export type GuiQueryKey = keyof GuiQueries;

export interface GuiMutations {}

export type GuiMutationKey = keyof GuiMutations;

export type GuiQueryRequestPayload<T extends GuiQueryKey> = GuiQueries[T]["request"];
export type GuiQueryResponsePayload<T extends GuiQueryKey> = GuiQueries[T]["response"];
export type GuiQueryResponseResult<T extends GuiQueryKey> = Exclude<
	GuiQueryResponsePayload<T>["result"],
	null
>;

export type GuiMutationRequestPayload<T extends GuiMutationKey> = GuiMutations[T]["request"];
export type GuiMutationResponsePayload<T extends GuiMutationKey> = GuiMutations[T]["response"];
export type GuiMutationResponseResult<T extends GuiMutationKey> = Exclude<
	GuiMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useGuiQuery = <K extends GuiQueryKey>(key: K, params: GuiQueryRequestPayload<K>) =>
	useAnkiQuery<K, GuiQueryRequestPayload<K>, GuiQueryResponsePayload<K>, GuiQueryResponseResult<K>>(
		key,
		params
	);

/**
 * Perform a mutation on Guis in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useGuiMutation = <K extends GuiMutationKey>(
	key: K,
	params: GuiMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		GuiMutationRequestPayload<K>,
		GuiMutationResponsePayload<K>,
		GuiMutationResponseResult<K>
	>(key, params);
