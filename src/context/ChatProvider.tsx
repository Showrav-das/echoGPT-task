"use client";

import { ChatContextType, Chat, Message } from "@/lib/type";
import { createContext, useContext, useState, ReactNode } from "react";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [firstTimeChat, setFirstTimeChat] = useState<boolean>(false);
  const [activeChatIndex, setActiveChatIndex] = useState<number>(0);

  const handleNewChat = () => {
    setFirstTimeChat(true);
    setMessages([]);

    //new chat
    const newChat = {
      id: Date.now().toString(),
      messages: [],
    };

    // set allchats
    setAllChats((prev) => [...prev, newChat]);

    setActiveChatIndex(allChats.length);
  };

  const handleSwitchChat = (index: number) => {
    // Set active chat index
    setActiveChatIndex(index);

    setMessages(allChats[index].messages);
  };

  return (
    <ChatContext.Provider
      value={{
        allChats,
        setMessages,
        messages,
        setAllChats,
        firstTimeChat,
        setFirstTimeChat,
        activeChatIndex,
        setActiveChatIndex,
        handleNewChat,
        handleSwitchChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
