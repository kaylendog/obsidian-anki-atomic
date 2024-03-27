import { Query, useAnkiMutation, useAnkiQuery } from "../query";

export interface Model {
	id: number;
	name: string;
	type: number;
	mod: number;
	usn: number;
	sortf: number;
	did: null;
	tmpls: ModelTemplate[];
	flds: ModelField[];
	css: string;
	latexPre: string;
	latexPost: string;
	latexsvg: boolean;
	req: [number, string, number[]][];
	originalStockKind: number;
}

export interface ModelTemplate {
	name: string;
	ord: number;
	qfmt: string;
	afmt: string;
	bqfmt: string;
	bafmt: string;
	did: null;
	bfont: string;
	bsize: number;
	id: number;
}

export interface ModelField {
	name: string;
	ord: number;
	sticky: boolean;
	rtl: boolean;
	font: string;
	size: number;
	description: string;
	plainText: boolean;
	collapsed: boolean;
	excludeFromSearch: boolean;
	id: number;
	tag: string | null;
	preventDeletion: boolean;
}

export interface ModelQueries {
	modelNames: Query<undefined, string[]>;
	modelNamesAndIds: Query<undefined, Record<string, number>>;
	findModelsById: Query<{ modelIds: number[] }, Model[]>;
	findModelsByName: Query<{ modelNames: string[] }, Model[]>;
	modelFieldNames: Query<{ modelName: string }, string[]>;
	modelFieldDescription: Query<{ modelName: string }, string[]>;
	modelFieldFonts: Query<{ modelName: string }, Record<string, { font: string; size: number }>>;
	modelFieldsOnTemplates: Query<{ modelName: string }, Record<string, string[][]>>;
	modelTemplates: Query<{ modelName: string }, Record<string, string>[]>;
	modelStyling: Query<{ modelName: string }, { css: string }>;
}

export type ModelQueryKey = keyof ModelQueries;

export interface ModelMutations {
	createModel: Query<
		{
			modelName: string;
			inOrderFields: string[];
			css: string;
			isCloze: boolean;
			cardTemplates: Record<string, string>[];
		},
		Model
	>;
	updateModelTemplates: Query<
		{
			model: {
				name: string;
				templates: Record<string, Record<string, string>>;
			};
		},
		null
	>;
	updateModelStyling: Query<{ model: { name: string; css: string } }, null>;
	findAndReplaceInModels: Query<
		{
			modelName: string;
			findText: string;
			replaceText: string;
			front: boolean;
			back: boolean;
			css: boolean;
		},
		number
	>;
	modelTemplateRename: Query<
		{
			modelName: string;
			oldTemplateName: string;
			newTemplateName: string;
		},
		null
	>;
	modelTemplateReport: Query<
		{
			modelName: string;
			templateName: string;
			index: number;
		},
		null
	>;
	modelTemplateAdd: Query<
		{
			modelName: string;
			template: Record<string, string>;
		},
		null
	>;
	modelTemplateRemove: Query<
		{
			modelName: string;
			templateName: string;
		},
		null
	>;
	modelFieldRename: Query<
		{
			modelName: string;
			oldFieldName: string;
			newFieldName: string;
		},
		null
	>;
	modelFieldReposition: Query<
		{
			modelName: string;
			fieldName: string;
			index: number;
		},
		null
	>;
	modelFieldAdd: Query<
		{
			modelName: string;
			fieldName: string;
			index: number;
		},
		null
	>;
	modelFieldRemove: Query<
		{
			modelName: string;
			fieldName: string;
		},
		null
	>;
	modelFieldSetFont: Query<
		{
			modelName: string;
			fieldName: string;
			font: string;
		},
		null
	>;
	modelFieldSetFontSize: Query<
		{
			modelName: string;
			fieldName: string;
			fontSize: number;
		},
		null
	>;
	modelFieldSetDescription: Query<
		{
			modelName: string;
			fieldName: string;
			description: string;
		},
		boolean
	>;
}

export type ModelMutationKey = keyof ModelMutations;

export type ModelQueryRequestPayload<T extends ModelQueryKey> = ModelQueries[T]["request"];
export type ModelQueryResponsePayload<T extends ModelQueryKey> = ModelQueries[T]["response"];
export type ModelQueryResponseResult<T extends ModelQueryKey> = Exclude<
	ModelQueryResponsePayload<T>["result"],
	null
>;

export type ModelMutationRequestPayload<T extends ModelMutationKey> = ModelMutations[T]["request"];
export type ModelMutationResponsePayload<T extends ModelMutationKey> =
	ModelMutations[T]["response"];
export type ModelMutationResponseResult<T extends ModelMutationKey> = Exclude<
	ModelMutationResponsePayload<T>["result"],
	null
>;

/**
 * Fetch data from AnkiConnect.
 * @param key
 * @param params
 * @returns
 */
export const useModelQuery = <K extends ModelQueryKey>(
	key: K,
	params: ModelQueryRequestPayload<K>
) =>
	useAnkiQuery<
		K,
		ModelQueryRequestPayload<K>,
		ModelQueryResponsePayload<K>,
		ModelQueryResponseResult<K>
	>(key, params);

/**
 * Perform a mutation on Models in AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useModelMutation = <K extends ModelMutationKey>(
	key: K,
	params: ModelMutationRequestPayload<K>
) =>
	useAnkiMutation<
		K,
		ModelMutationRequestPayload<K>,
		ModelMutationResponsePayload<K>,
		ModelMutationResponseResult<K>
	>(key, params);
