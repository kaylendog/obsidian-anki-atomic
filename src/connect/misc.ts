import { Query, useAnkiMutation, useAnkiQuery } from "./query";

export interface MiscQueries {
	version: Query<undefined, number>;
	apiReflect: Query<
		{
			scopes: string[];
			actions: string[] | null;
		},
		boolean
	>;
	getProfiles: Query<undefined, string[]>;
}

export type MiscQueryKey = keyof MiscQueries;

export interface MiscMutations {
	requestPermission: Query<
		undefined,
		| {
				permission: "denied";
		  }
		| {
				permission: "granted";
				requireApiKey: boolean;
				version: number;
		  }
	>;
	sync: Query<undefined, null>;
	loadProfile: Query<{ name: string }, boolean>;
	// multi: Query<{ actions: unknown[] }, {}>;
	exportPackage: Query<{ deck: string; path: string; includeSched: boolean }, boolean>;
	importPackage: Query<{ path: string }, boolean>;
	reloadCollection: Query<undefined, null>;
}

export type MiscMutationKey = keyof MiscMutations;

export type MiscQueryRequestPayload<T extends MiscQueryKey> = MiscQueries[T]["request"];
export type MiscQueryResponsePayload<T extends MiscQueryKey> = MiscQueries[T]["response"];
export type MiscQueryResponseResult<T extends MiscQueryKey> = Exclude<
	MiscQueryResponsePayload<T>["result"],
	null
>;

export type MiscMutationRequestPayload<T extends MiscMutationKey> = MiscMutations[T]["request"];
export type MiscMutationResponsePayload<T extends MiscMutationKey> = MiscMutations[T]["response"];
export type MiscMutationResponseResult<T extends MiscMutationKey> = Exclude<
	MiscMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useMiscQuery = <K extends MiscQueryKey>(key: K, params: MiscQueryRequestPayload<K>) =>
	useAnkiQuery<
		K,
		MiscQueryRequestPayload<K>,
		MiscQueryResponsePayload<K>,
		MiscQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Miscs in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useMiscMutation = <K extends MiscMutationKey>(
	key: K,
	params: MiscMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		MiscMutationRequestPayload<K>,
		MiscMutationResponsePayload<K>,
		MiscMutationResponseResult<K>
	>(key, params);
