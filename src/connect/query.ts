import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { ankiUrlAtom } from ".";

/**
 * General type wrapper around AnkiConnect queries.
 */
export interface Query<I, O, Err = string | null> {
	request: I;
	response: Response<O, Err>;
}

interface Response<T, Err = string | null> {
	result: T | null;
	error: Err;
}

/**
 * Wrapper around useQuery that fetches data from AnkiConnect.
 * @param key The query to perform.
 * @param params The parameters for the query.
 * @returns
 */
export const useAnkiQuery = <K, Req, Res extends Response<unknown>, Result>(
	key: K,
	params: Req
) => {
	const [url] = useAtom(ankiUrlAtom);
	return useQuery({
		queryKey: [key],
		queryFn: () =>
			fetch(url, {
				method: "POST",
				body: JSON.stringify({
					action: key,
					params,
					version: 6,
				}),
			})
				.then((res) => res.json() as Promise<Res>)
				.then((res) => {
					if (res.error !== null) {
						throw new Error(res.error);
					}
					return res.result as Result;
				}),
	});
};

/**
 * Wrapper around useMutation that performs mutations on AnkiConnect.
 * @param key The mutation to perform.
 * @param params The parameters for the mutation.
 * @returns
 */
export const useAnkiMutation = <K, Req, Res extends Response<unknown>, Result>(
	key: K,
	params: Req
) =>
	useMutation({
		mutationKey: [key],
		mutationFn: () =>
			fetch("ankiUrl", {
				method: "POST",
				body: JSON.stringify({
					action: key,
					params,
					version: 6,
				}),
			})
				.then((res) => res.json() as Promise<Res>)
				.then((res) => {
					if (res.error !== null) {
						throw new Error(res.error);
					}
					return res.result as Result;
				}),
	});
