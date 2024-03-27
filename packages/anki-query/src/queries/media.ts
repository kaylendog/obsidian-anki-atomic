import { Query, useAnkiMutation, useAnkiQuery } from "../query";

export interface MediaQueries {
	retrieveMediaFile: Query<{ filename: string }, string>;
	getMediaFilesNames: Query<{ pattern: string }, string[]>;
	getMediaDirPath: Query<undefined, string>;
}

export type MediaQueryKey = keyof MediaQueries;

export interface MediaMutations {
	storeMediaFile: Query<
		| { filename: string; data: string }
		| { filename: string; path: string }
		| { filename: string; url: string },
		string
	>;
	deleteMediaFile: Query<{ filename: string }, null>;
}

export type MediaMutationKey = keyof MediaMutations;

export type MediaQueryRequestPayload<T extends MediaQueryKey> = MediaQueries[T]["request"];
export type MediaQueryResponsePayload<T extends MediaQueryKey> = MediaQueries[T]["response"];
export type MediaQueryResponseResult<T extends MediaQueryKey> = Exclude<
	MediaQueryResponsePayload<T>["result"],
	null
>;

export type MediaMutationRequestPayload<T extends MediaMutationKey> = MediaMutations[T]["request"];
export type MediaMutationResponsePayload<T extends MediaMutationKey> =
	MediaMutations[T]["response"];
export type MediaMutationResponseResult<T extends MediaMutationKey> = Exclude<
	MediaMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useMediaQuery = <K extends MediaQueryKey>(
	key: K,
	params: MediaQueryRequestPayload<K>
) =>
	useAnkiQuery<
		K,
		MediaQueryRequestPayload<K>,
		MediaQueryResponsePayload<K>,
		MediaQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Medias in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useMediaMutation = <K extends MediaMutationKey>(
	key: K,
	params: MediaMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		MediaMutationRequestPayload<K>,
		MediaMutationResponsePayload<K>,
		MediaMutationResponseResult<K>
	>(key, params);
