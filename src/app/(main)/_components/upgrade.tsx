import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/lib/hooks/users/use-create-order";
import { useVerifyPayment } from "@/lib/hooks/users/user-verify-order";
import { loadScript } from "@/lib/loadscript";
import { useEffect } from "react";

const Upgrade = () => {
  const createOrderMutation = useCreateOrder();
  const verifyOrderMutation = useVerifyPayment();

  const verifyPayment = async (orderData: any) => {
    verifyOrderMutation.mutate(
      {
        orderId: orderData.razorpay_order_id,
        paymentId: orderData.razorpay_payment_id,
        signature: orderData.razorpay_signature,
      },
      {
        onSuccess: async () => {
          console.log("Payment Success");
        },
        onError: async () => {
          console.log("Payment Failed");
        },
      }
    );
  };

  const onPayment = async () => {
    let orderData;
    createOrderMutation.mutate(
      {
        planId: "premium",
      },
      {
        onSuccess: async (data) => {
          const paymentObject = new (window as any).Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: data.data.id,
            ...data.data,
            handler: async function (response: any) {
              console.log(response);

              orderData = response;
              await verifyPayment(orderData);
            },
          });
          await paymentObject.open();
        },
      }
    );
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <div>
      <Button onClick={onPayment} className="w-full mt-10">
        Upgrade
      </Button>
    </div>
  );
};

export default Upgrade;
