import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
// import { InferResponseType } from "hono";

// type ResponseType = InferResponseType<
//   (typeof client.api.user)["isPremium"]["$get"]
// >;

// type RequestType = InferResponseType<
//   (typeof client.api.user)["isPremium"]["$get"]
// >;

export const useCheckPremium = (IFrameUrl: string) => {
  const query = useQuery({
    queryKey: ["signedUrl"],
    queryFn: async () => {
      const response = await client.api.video["get-signed-url"]["$get"]({
        query: {
          iFrameUrl: IFrameUrl,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data.signedUrl;
    },
  });
  return query;
};
