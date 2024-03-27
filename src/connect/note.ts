/* eslint-disable @typescript-eslint/naming-convention */
import { Query, useAnkiMutation, useAnkiQuery } from "./query";

export interface NoteQueries {
	canAddNotes: Query<
		{
			deckName: string;
			modelName: string;
			fields: Record<string, string>;
			tags: string[];
		}[],
		boolean[]
	>;
	canAddNotesWithErrorDetails: Query<
		{
			deckName: string;
			modelName: string;
			fields: Record<string, string>;
			tags: string[];
		}[],
		(
			| {
					canAdd: false;
					error: string;
			  }
			| {
					canAdd: true;
			  }
		)[]
	>;
	getNoteTags: Query<{ note: number }, string[]>;
	getTags: Query<undefined, string[]>;
	findNotes: Query<{ query: string }, number[]>;
	notesInfo: Query<
		{ notes: number[] },
		{
			noteId: number;
			modelName: string;
			tags: string[];
			fields: Record<string, { value: string; order: number }>;
		}[]
	>;
	deleteNotes: Query<{ notes: number[] }, null>;
	removeEmptyNotes: Query<undefined, null>;
}

export type NoteQueryKey = keyof NoteQueries;

export interface NoteAudio {
	url: string;
	filename: string;
	skipHash: string;
	fields: string[];
}

export interface NoteVideo {
	url: string;
	filename: string;
	skipHash: string;
	fields: string[];
}

export interface NotePicture {
	url: string;
	filename: string;
	skipHash: string;
	fields: string[];
}

interface Note {
	deckName: string;
	modelName: string;
	fields: Record<string, string>;
	options: {
		allowDuplicate: boolean;
		duplicateScope: string;
		duplicateScopeOptions: {
			deckName: string;
			checkChildren: boolean;
			checkAllModels: boolean;
		};
	};
	tags: string[];
	audio: NoteAudio[];
	video: NoteVideo[];
	picture: NotePicture[];
}

export interface NoteMutations {
	addNote: Query<
		{
			note: Note;
		},
		number
	>;
	addNotes: Query<
		{
			notes: Note[];
		},
		number[]
	>;
	updateNoteFields: Query<
		{
			note: {
				id: number;
				fields: Record<string, string>;
				audio: NoteAudio[];
			};
		},
		null
	>;
	updateNote: Query<
		{
			note: {
				id: number;
				fields: Record<string, string>;
				tags: string[];
			};
		},
		null
	>;
	updateNoteTags: Query<
		{
			note: number;
			tags: string[];
		},
		null
	>;
	addTags: Query<
		{
			notes: number[];
			tags: string;
		},
		null
	>;
	removeTags: Query<
		{
			notes: number[];
			tags: string;
		},
		null
	>;
	clearUnusedTags: Query<undefined, null>;
	replaceTags: Query<
		{
			notes: number[];
			tag_to_replace: string;
			replace_with_tag: string;
		},
		null
	>;
	replaceTagsInAllNotes: Query<
		{
			tag_to_replace: string;
			replace_with_tag: string;
		},
		null
	>;
}

export type NoteMutationKey = keyof NoteMutations;

export type NoteQueryRequestPayload<T extends NoteQueryKey> = NoteQueries[T]["request"];
export type NoteQueryResponsePayload<T extends NoteQueryKey> = NoteQueries[T]["response"];
export type NoteQueryResponseResult<T extends NoteQueryKey> = Exclude<
	NoteQueryResponsePayload<T>["result"],
	null
>;

export type NoteMutationRequestPayload<T extends NoteMutationKey> = NoteMutations[T]["request"];
export type NoteMutationResponsePayload<T extends NoteMutationKey> = NoteMutations[T]["response"];
export type NoteMutationResponseResult<T extends NoteMutationKey> = Exclude<
	NoteMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useNoteQuery = <K extends NoteQueryKey>(key: K, params: NoteQueryRequestPayload<K>) =>
	useAnkiQuery<
		K,
		NoteQueryRequestPayload<K>,
		NoteQueryResponsePayload<K>,
		NoteQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Notes in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useNoteMutation = <K extends NoteMutationKey>(
	key: K,
	params: NoteMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		NoteMutationRequestPayload<K>,
		NoteMutationResponsePayload<K>,
		NoteMutationResponseResult<K>
	>(key, params);
