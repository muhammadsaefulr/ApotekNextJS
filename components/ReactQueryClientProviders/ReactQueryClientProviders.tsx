// ReactQueryClientProvider.ts
"use client"
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query"
import { ReactNode } from "react"

interface ReactQueryClientProvidersProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

const ReactQueryClientProviders = ({ children, dehydratedState }: ReactQueryClientProvidersProps) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
                {children}
            </Hydrate>
        </QueryClientProvider>
    )
}

export default ReactQueryClientProviders
