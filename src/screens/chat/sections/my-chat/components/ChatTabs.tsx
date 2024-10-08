"use client";

import { useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { PiChatsCircleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind";
import { useChatSideBarStore } from "@/zustand/useChatSideBarStore";

const ChatTabs = () => {
  const { chats } = useChatSideBarStore((state) => state);
  const [activeTab, setActiveTab] = useState("chats");

  const buttonWidth = 135.5;
  const gapBetweenButtons = 10;

  return (
    <div className="bg-[#EEE] rounded-xl border-[0.6px] border-[#E2E2E2] h-[48px] flex gap-[10px] flex-shrink-0 p-[4px] relative">
      <motion.div
        className="absolute top-[4px] bottom-[4px] left-[4px] w-[135.5px] bg-white rounded-lg shadow-lg"
        initial={false}
        animate={{
          x: activeTab === "chats" ? 0 : buttonWidth + gapBetweenButtons,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        className={cn(
          "relative z-10 w-[135.5px] flex gap-[6px] h-full items-center justify-center",
          {
            "text-[#14B48D] font-semibold": activeTab === "chats",
            "text-[#3B3B3B]": activeTab !== "chats",
          }
        )}
        onClick={() => setActiveTab("chats")}
      >
        <PiChatsCircleFill
          size={14}
          color={activeTab === "chats" ? "#14B48D" : "#3B3B3B"}
        />
        <span className="uppercase text-[12px]">Chats</span>
        <span
          className={cn("rounded px-[4px] py-[2px] text-[10px] font-semibold", {
            "bg-[#14B48D]/[0.15]": activeTab === "chats",
            "bg-[#3B3B3B]/[0.11]": activeTab !== "chats",
          })}
        >
          {chats.length || 0}
        </span>
      </button>

      <button
        className={cn(
          "relative z-10 w-[135.5px] flex gap-[6px] h-full items-center justify-center",
          {
            "text-[#14B48D] font-semibold": activeTab === "saved",
            "text-[#3B3B3B]": activeTab !== "saved",
          }
        )}
        onClick={() => setActiveTab("saved")}
      >
        <IoBookmark
          size={14}
          color={activeTab === "saved" ? "#14B48D" : "#3B3B3B"}
        />
        <span className="uppercase text-[12px]">Saved</span>
        <span
          className={cn("rounded px-[4px] py-[2px] text-[10px] font-semibold", {
            "bg-[#14B48D]/[0.15]": activeTab === "saved",
            "bg-[#3B3B3B]/[0.11]": activeTab !== "saved",
          })}
        >
          0
        </span>
      </button>
    </div>
  );
};

export default ChatTabs;
