import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.payments)["verify-payment"]["$post"],
  200
>;

type RequestType = Parameters<
  (typeof client.api.payments)["verify-payment"]["$post"]
>[0]["json"];

export const useVerifyPayment = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      try {
        const response = await client.api.payments["verify-payment"].$post({
          json,
        });

        if (!response.ok) {
          throw new Error(response.statusText || "Error in response");
        }

        const returnData: ResponseType = await response.json();
        return returnData;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || "Error verifying order");
    },
    onSuccess: () => {
      toast.success("Payment verified successfully");
    },
  });

  return mutation;
};
