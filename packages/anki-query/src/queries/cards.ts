import { Query, useAnkiMutation, useAnkiQuery } from "../query";

export interface CardQueries {
	getEaseFactors: Query<{ cards: number[] }, number[]>;
	suspended: Query<{ card: number }, boolean>;
	areSuspended: Query<{ cards: number[] }, (boolean | null)[]>;
	areDue: Query<{ cards: number[] }, boolean[]>;
	getIntervals:
		| Query<{ cards: number[] }, number[]>
		| Query<{ cards: number[]; complete: boolean }, number[][]>;
	findCards: Query<{ query: string }, number[]>;
	cardsToNotes: Query<{ cards: number[] }, number[]>;
	cardsModTime: Query<{ cards: number[] }, { cardId: number; mod: number }[]>;
	cardsInfo: Query<
		{ cards: number[] },
		{
			answer: string;
			question: string;
			deckName: string;
			modelName: string;
			fieldOrder: number;
			fields: Record<string, { value: string; order: number }>;
			css: string;
			cardId: number;
			interval: number;
			note: number;
			ord: 1;
			type: number;
			queue: number;
			due: number;
			reps: number;
			lapses: number;
			left: number;
		}[]
	>;
}

export type CardQueryKey = keyof CardQueries;

export interface CardMutations {
	setEaseFactors: Query<
		{
			cards: number[];
			easeFactors: number[];
		},
		boolean[]
	>;
	setSpecificValueOfCard: Query<
		{
			card: number;
			keys: string[];
			newValues: string[];
		},
		boolean[]
	>;
	suspend: Query<{ cards: number[] }, boolean>;
	unsuspend: Query<{ cards: number[] }, boolean>;
	forgetCards: Query<{ cards: number[] }, null>;
	relearnCards: Query<{ cards: number[] }, null>;
	answerCards: Query<{ answers: { cardId: number; ease: number }[] }, boolean[]>;
}

export type CardMutationKey = keyof CardMutations;

export type CardQueryRequestPayload<T extends CardQueryKey> = CardQueries[T]["request"];
export type CardQueryResponsePayload<T extends CardQueryKey> = CardQueries[T]["response"];
export type CardQueryResponseResult<T extends CardQueryKey> = Exclude<
	CardQueryResponsePayload<T>["result"],
	null
>;

export type CardMutationRequestPayload<T extends CardMutationKey> = CardMutations[T]["request"];
export type CardMutationResponsePayload<T extends CardMutationKey> = CardMutations[T]["response"];
export type CardMutationResponseResult<T extends CardMutationKey> = Exclude<
	CardMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useCardQuery = <K extends CardQueryKey>(key: K, params: CardQueryRequestPayload<K>) =>
	useAnkiQuery<
		K,
		CardQueryRequestPayload<K>,
		CardQueryResponsePayload<K>,
		CardQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on cards in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useCardMutation = <K extends CardMutationKey>(
	key: K,
	params: CardMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		CardMutationRequestPayload<K>,
		CardMutationResponsePayload<K>,
		CardMutationResponseResult<K>
	>(key, params);
