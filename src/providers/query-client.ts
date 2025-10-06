import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data stays "fresh" before React Query marks it as stale (5 min)
      staleTime: 1000 * 60 * 5, 

      // How long unused (inactive) data stays in cache before garbage collection (30 min)
      gcTime: 1000 * 60 * 30, 

      // Number of retry attempts before failing (useful for flaky networks)
      retry: 1, 

      // Prevent auto-refetch every time the user switches back to the window
      refetchOnWindowFocus: false, 

      // Allow refetching if network reconnects (useful for mobile/unstable internet)
      refetchOnReconnect: true, 
    },
    mutations: {
      // Retry failed mutations only once to avoid duplicate actions (e.g., duplicate orders)
      retry: 1, 
    },
  },
});
