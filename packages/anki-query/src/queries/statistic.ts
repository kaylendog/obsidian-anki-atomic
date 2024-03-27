/* eslint-disable @typescript-eslint/naming-convention */
import { Query, useAnkiMutation, useAnkiQuery } from "../query";

export interface StatisticQueries {
	getNumCardsReviewedToday: Query<undefined, number>;
	getNumCardsReviewedByDay: Query<undefined, [string, number][]>;
	getCollectionStatsHTML: Query<
		{
			wholeCollection: boolean;
		},
		string
	>;
	cardReviews: Query<
		{
			deck: string;
			startID: number;
		},
		[number, number, number, number, number, number, number, number, number][]
	>;
	getReviewsOfCards: Query<
		{ cards: string[] },
		Record<
			string,
			{
				id: number;
				usn: number;
				ease: number;
				ivl: number;
				lastIvl: number;
				factor: number;
				time: number;
				type: number;
			}[]
		>
	>;
	getLatestReviewID: Query<
		{
			deck: string;
		},
		number
	>;
}

export type StatisticQueryKey = keyof StatisticQueries;

export interface StatisticMutations {
	insertReviews: Query<
		{
			reviews: [number, number, number, number, number, number, number, number, number][];
		},
		null
	>;
}

export type StatisticMutationKey = keyof StatisticMutations;

export type StatisticQueryRequestPayload<T extends StatisticQueryKey> =
	StatisticQueries[T]["request"];
export type StatisticQueryResponsePayload<T extends StatisticQueryKey> =
	StatisticQueries[T]["response"];
export type StatisticQueryResponseResult<T extends StatisticQueryKey> = Exclude<
	StatisticQueryResponsePayload<T>["result"],
	null
>;

export type StatisticMutationRequestPayload<T extends StatisticMutationKey> =
	StatisticMutations[T]["request"];
export type StatisticMutationResponsePayload<T extends StatisticMutationKey> =
	StatisticMutations[T]["response"];
export type StatisticMutationResponseResult<T extends StatisticMutationKey> = Exclude<
	StatisticMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useStatisticQuery = <K extends StatisticQueryKey>(
	key: K,
	params: StatisticQueryRequestPayload<K>
) =>
	useAnkiQuery<
		K,
		StatisticQueryRequestPayload<K>,
		StatisticQueryResponsePayload<K>,
		StatisticQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Statistics in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useStatisticMutation = <K extends StatisticMutationKey>(
	key: K,
	params: StatisticMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		StatisticMutationRequestPayload<K>,
		StatisticMutationResponsePayload<K>,
		StatisticMutationResponseResult<K>
	>(key, params);
