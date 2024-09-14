import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/lib/hooks/users/use-create-order";
import { useVerifyPayment } from "@/lib/hooks/users/user-verify-order";

const Upgrade = () => {
  const createOrderMutation = useCreateOrder();
  const verifyOrderMutation = useVerifyPayment();

  const onPayment = async () => {};

  return (
    <div>
      <Button onClick={onPayment} className="w-full mt-10">
        Upgrade
      </Button>
    </div>
  );
};

export default Upgrade;
