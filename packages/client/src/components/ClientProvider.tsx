import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNotionAPIKey } from "../authentication/hooks/useNotionAPIKey";

export const ClientProvider = ({ children }: PropsWithChildren<{}>) => {
  const notionAPIKey = useNotionAPIKey();
  const apiKeyRef = useRef<string>(notionAPIKey);
  useEffect(() => {
    apiKeyRef.current = notionAPIKey;
  }, [notionAPIKey]);
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
