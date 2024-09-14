import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.payments)["create-order"]["$post"],
  200
>;

type RequestType = InferResponseType<
  (typeof client.api.payments)["create-order"]["$post"],
  200
>["json"];

export const useCreateOrder = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.payments["create-order"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const returnData = await response.json();

      return returnData;
    },
    onError: () => {
      toast.error("Error creating order");
    },
    onSuccess: () => {
      toast.success("Order created successfully");
    },
  });
};
