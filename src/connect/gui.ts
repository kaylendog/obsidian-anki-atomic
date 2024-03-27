import { Query, useAnkiMutation, useAnkiQuery } from "./query";

export interface GuiQueries {
	guiBrowse: Query<
		{
			query: string;
			reorderCards: {
				order: "ascending" | "descending";
				columnId: string;
			};
		},
		number[]
	>;

	guiSelectedNotes: Query<undefined, number[]>;
	guiCurrentCard: Query<
		undefined,
		{
			answer: string;
			question: string;
			deckName: string;
			modelName: string;
			fieldOrder: number;
			fields: Record<string, { value: string; order: number }>;
			template: string;
			cardId: number;
			buttons: number[];
			nextReviews: string[];
		}
	>;
}

export type GuiQueryKey = keyof GuiQueries;

export interface GuiMutations {
	guiAddCards: Query<
		{
			deckName: string;
			modelName: string;
			fields: Record<string, string>;
			tags: string[];
			picture: {
				url: string;
				filename: string;
				fields: string[];
			}[];
		},
		number
	>;
	guiSelectNote: Query<{ note: number }, boolean>;
	guiEditNote: Query<
		{
			note: number;
		},
		null
	>;
	guiStartCardTimer: Query<undefined, true>;
	guiShowQuestion: Query<undefined, boolean>;
	guiShowAnswer: Query<undefined, boolean>;
	guiAnswerCard: Query<{ ease: number }, boolean>;
	guiUndo: Query<undefined, boolean>;
	guiDeckOverview: Query<{ name: string }, boolean>;
	guiDeckBrowser: Query<undefined, true>;
	guiDeckReview: Query<{ name: string }, boolean>;
	guiImportFile: Query<{ path: string }, null>;
	guiExitAnki: Query<undefined, null>;
	guiCheckDatabase: Query<undefined, true>;
}

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
