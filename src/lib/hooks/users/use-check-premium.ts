import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
// import { InferResponseType } from "hono";

// type ResponseType = InferResponseType<
//   (typeof client.api.user)["isPremium"]["$get"]
// >;

// type RequestType = InferResponseType<
//   (typeof client.api.user)["isPremium"]["$get"]
// >;

export const useCheckPremium = () => {
  const query = useQuery({
    queryKey: ["isPremium"],
    queryFn: async () => {
      const response = await client.api.user["isPremium"]["$get"]();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data.isPremium;
    },
  });
  return query;
};
