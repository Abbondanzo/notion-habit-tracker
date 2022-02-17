import { APIResponseError } from "@notionhq/client";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/dist/declarations/src/rpc/codes";

const isNotionError = (error: any): error is APIResponseError => {
  return error && error.name === "APIResponseError";
};

const notionToTRPCError = (error: APIResponseError): TRPCError => {
  const code = ((): TRPC_ERROR_CODE_KEY => {
    // https://developers.notion.com/reference/errors
    switch (error.code) {
      case "unauthorized":
        return "UNAUTHORIZED";
      case "invalid_json":
      case "invalid_request_url":
      case "invalid_request":
        return "BAD_REQUEST";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  })();
  return new TRPCError({ cause: error, message: error.message, code });
};

export const trpcErrorHandler = (error: any) => {
  if (isNotionError(error)) {
    throw notionToTRPCError(error);
  } else {
    throw error;
  }
};
