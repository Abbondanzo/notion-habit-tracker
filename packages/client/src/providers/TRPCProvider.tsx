import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "../constants/trpc";

export const TRPCProvider = ({ children }: PropsWithChildren<{}>) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4000/trpc",

      // optional
      headers() {
        return {
          authorization: "cookie",
        };
      },
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
