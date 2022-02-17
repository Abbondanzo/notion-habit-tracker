import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNotionAPIKey } from "../../authentication/hooks/useNotionAPIKey";
import { trpc } from "../constants/trpc";

export const TRPCProvider = ({ children }: PropsWithChildren<{}>) => {
  const notionAPIKey = useNotionAPIKey();
  const apiKeyRef = useRef<string>(notionAPIKey);
  useEffect(() => {
    apiKeyRef.current = notionAPIKey;
  }, [notionAPIKey]);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4000/trpc",

      // optional
      headers() {
        return {
          authorization: apiKeyRef.current,
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
