"use client";

import { GiBrainTentacle } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isIOSReactNativeWebView } from "@/utils/platform";

const Logo = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <div
      className="group cursor-pointer w-[32px] h-[32px] hover:bg-white bg-[#909090] flex justify-center items-center rounded-lg transition-transform duration-150 scale-100"
      onClick={() => {
        if (isSignedIn || !isIOSReactNativeWebView()) {
          router.push("/chat");
        }
      }}
    >
      <GiBrainTentacle
        className="transition-colors duration-150 group-hover:text-[#1A8F70] text-white"
        size={26}
      />
    </div>
  );
};

export default Logo;
