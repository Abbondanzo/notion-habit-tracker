import { api } from "./_client";

export const search = () => {
  return api.get(`/search`);
};
