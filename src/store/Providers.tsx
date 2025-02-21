"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayerProvider } from "./PlayerContext";
import { PropsWithChildren } from "react";
import { Provider } from "jotai";

let queryClient = new QueryClient();
function Providers(props: PropsWithChildren) {
	return (
		<>
			<Provider>
				<QueryClientProvider client={queryClient}>
					<PlayerProvider>{props.children}</PlayerProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
}

export default Providers;
