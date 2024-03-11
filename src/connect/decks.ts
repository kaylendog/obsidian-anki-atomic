/* eslint-disable @typescript-eslint/naming-convention */
import { Query, useAnkiMutation, useAnkiQuery } from "./query";

interface DeckConfig {
	lapse: {
		leechFails: number;
		delays: number[];
		minInt: number;
		leechAction: number;
		mult: number;
	};
	dyn: boolean;
	autoplay: boolean;
	mod: number;
	id: number;
	maxTaken: number;
	new: {
		bury: boolean;
		order: number;
		initialFactor: number;
		perDay: number;
		delays: number[];
		separate: boolean;
		ints: number[];
	};
	name: string;
	rev: {
		bury: boolean;
		ivlFct: number;
		ease4: number;
		maxIvl: number;
		perDay: number;
		minSpace: number;
		fuzz: number;
	};
	timer: number;
	replayq: boolean;
	usn: number;
}

export interface DeckQueries {
	deckNames: Query<undefined, string[]>;
	deckNamesAndIds: Query<undefined, { name: string; id: number }[]>;
	getDecksConfig: Query<{ cards: number[] }, Record<string, number[]>[]>;
	getDeckConfig: Query<{ deck: string }, DeckConfig>;
	getDeckStats: Query<
		{ decks: string[] },
		Record<
			string,
			{
				deck_id: number;
				name: string;
				new_count: number;
				learn_count: number;
				review_count: number;
				total_in_deck: number;
			}
		>
	>;
}

export type DeckQueryKey = keyof DeckQueries;

export interface DeckMutations {
	createDeck: Query<{ deck: string }, number>;
	changeDeck: Query<{ deck: string; cards: number[] }, null>;
	deleteDecks: Query<{ decks: string[]; cardsToo: boolean }, null>;
	saveDeckConfig: Query<{ config: DeckConfig }, null>;
	setDeckConfigId: Query<{ decks: string[]; configId: number }, boolean>;
	cloneDeckConfigId: Query<{ name: string; cloneFrom: number }, number>;
	removeDeckConfigId: Query<{ configId: string }, boolean>;
}

export type DeckMutationKey = keyof DeckMutations;

export type DeckQueryRequestPayload<T extends DeckQueryKey> = DeckQueries[T]["request"];
export type DeckQueryResponsePayload<T extends DeckQueryKey> = DeckQueries[T]["response"];
export type DeckQueryResponseResult<T extends DeckQueryKey> = Exclude<
	DeckQueryResponsePayload<T>["result"],
	null
>;

export type DeckMutationRequestPayload<T extends DeckMutationKey> = DeckMutations[T]["request"];
export type DeckMutationResponsePayload<T extends DeckMutationKey> = DeckMutations[T]["response"];
export type DeckMutationResponseResult<T extends DeckMutationKey> = Exclude<
	DeckMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useDeckQuery = <K extends DeckQueryKey>(key: K, params: DeckQueryRequestPayload<K>) =>
	useAnkiQuery<
		K,
		DeckQueryRequestPayload<K>,
		DeckQueryResponsePayload<K>,
		DeckQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Decks in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useDeckMutation = <K extends DeckMutationKey>(
	key: K,
	params: DeckMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		DeckMutationRequestPayload<K>,
		DeckMutationResponsePayload<K>,
		DeckMutationResponseResult<K>
	>(key, params);
