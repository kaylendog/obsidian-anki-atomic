import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnkiQueryContext } from "./context";

export * from "./queries";

/**
 * The provider for AnkiConnect queries.
 * @param param0
 * @returns
 */
export const AnkiQueryProvider: React.FC<{
	children: React.ReactNode;
	endpoint: string;
	queryClient: QueryClient;
}> = ({ children, endpoint, queryClient }) => {
	return (
		<AnkiQueryContext.Provider value={{ endpoint }}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</AnkiQueryContext.Provider>
	);
};
