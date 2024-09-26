import Button from "@/components/v2/Button";
import CardContent from "@/components/v2/CardContent";
import GreenWhiteLayout from "@/layouts/GreenWhiteLayout";
import { LuCheckCircle, LuCoins, LuCreditCard } from "react-icons/lu";

const PaymentSuccessScreen = () => {
  return (
    <GreenWhiteLayout>
      <div className="w-full flex items-center justify-center p-4">
        <CardContent overrideStyles="w-full max-w-md flex flex-col items-center gap-8 p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#E7E7E8] w-16 h-16 rounded-full flex items-center justify-center">
              <LuCheckCircle size="36" />
            </div>
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <p className="text-[#72717A]">
              Thank you for your purchase. Your token credits have been added to
              your account.
            </p>
            <div className="bg-[#F4F4F5] p-4 flex flex-col gap-2 w-full rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-[#18181B]">
                  <LuCoins size={20} />
                  <span>Token Credits</span>
                </div>
                <span className="font-semibold">10,000 credits</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-[#18181B]">
                  <LuCreditCard size={20} />
                  <span>Amount Paid</span>
                </div>
                <span className="font-semibold">$99.99</span>
              </div>
            </div>
          </div>

          <Button className="w-full">Return to Settings</Button>
        </CardContent>
      </div>
    </GreenWhiteLayout>
  );
};

export default PaymentSuccessScreen;