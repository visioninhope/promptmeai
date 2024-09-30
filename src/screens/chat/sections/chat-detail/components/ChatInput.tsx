"use client";

import { continueConversation } from "@/actions/generateActions";
import { ModalWarning } from "@/components/v2/modals";
import { MODEL_NAMES } from "@/constants/modelNames";
import { Message, saveChat, updateChat } from "@/services/chatService";
import { isObjectEmpty } from "@/utils/object";
import { useChatSideBarStore } from "@/zustand/useChatSideBarStore";
import { useChatStore } from "@/zustand/useChatStore";
import useProfileStore, { UsageMode } from "@/zustand/useProfileStore";
import { useUser } from "@clerk/nextjs";
import { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { PiPaperPlaneTilt } from "react-icons/pi";

const ChatInput = () => {
  const router = useRouter();
  const { user } = useUser();
  const { profile, isDefaultData } = useProfileStore();
  const { messages, addMessage } = useChatStore();
  const { addChat, activeChatId, setActiveChatId } = useChatSideBarStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const showAlert =
    profile.usageMode === UsageMode.Credits
      ? profile.credits === 0
      : isObjectEmpty(profile.APIKeys);
  const alertCredits =
    "Your credit balance is exhausted. Please purchase more credits or provide your API keys to continue.";
  const alertAPIKeys =
    "API keys have not been set up yet. Please configure your API keys to proceed.";

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Automatically focus the input
    }
  }, []);

  const getAssistantResponse = useCallback(
    async (model: string, userMessage: CoreMessage) => {
      const currentMessages: CoreMessage[] = messages.flatMap((message) => [
        message.userMessage,
        ...Object.values(message.responses),
      ]);

      const result = await continueConversation(
        [...currentMessages, userMessage],
        model
      );

      for await (const content of readStreamableValue(result)) {
        useChatStore.getState().addResponse(model, {
          role: "assistant",
          content: content as string,
        });
      }
    },
    [messages]
  );

  const saveChatFunction = useCallback(
    async (messages: Message[]) => {
      if (user?.id) {
        try {
          if (activeChatId) {
            await updateChat(user.id, activeChatId, messages);
          } else {
            const chatData = await saveChat(
              user.id,
              user.fullName || "",
              messages
            );
            if (chatData?.id) {
              addChat(chatData);
              setActiveChatId(chatData.id, true);
            }
          }
        } catch (error) {
          console.error("Error saving or updating chat: ", error);
        }
      }
    },
    [activeChatId, addChat, setActiveChatId, user?.fullName, user?.id]
  );

  const submitHandler = async () => {
    if (!input) return;

    const newUserMessage: CoreMessage = { content: input, role: "user" };
    addMessage(newUserMessage);
    setInput("");

    try {
      await Promise.all(
        MODEL_NAMES.map((model) =>
          getAssistantResponse(model.value, newUserMessage)
        )
      );

      const updatedMessages: Message[] = useChatStore
        .getState()
        .messages.map((msg) => msg);

      await saveChatFunction(updatedMessages);
    } catch (error) {
      console.error("Error handling submission: ", error);
    }
  };

  return (
    <Fragment>
      <div className="self-end w-full max-w-[720px] h-[56px] flex-shrink-0 flex gap-[16px] justify-center items-center">
        <div className="w-full bg-white rounded-xl shadow px-[16px] py-[12px] flex gap-[12px] items-center">
          <input
            ref={inputRef}
            className="w-full text-[14px] text-[#A0A7BB] outline-none"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitHandler()}
          />
          <div className="flex items-center justify-center h-[32px] w-[32px] rounded-lg cursor-pointer flex-shrink-0 mr-[-4px]">
            <PiPaperPlaneTilt size={18} color="#ABABAB" />
          </div>
        </div>
      </div>
      <ModalWarning
        isOpen={!isDefaultData && showAlert}
        title={
          profile?.usageMode === UsageMode.Credits ? alertCredits : alertAPIKeys
        }
        confirmText="Go to settings page"
        onClose={() => router.push("/v2/settings")}
      />
    </Fragment>
  );
};

export default ChatInput;
