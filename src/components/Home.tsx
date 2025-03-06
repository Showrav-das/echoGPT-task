"use client";
import { Chat, Message } from "@/lib/type";
import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/context/ChatProvider";
import { sendMessageAction } from "@/app/actions/sendMessageAction";
import { Card, CardContent } from "./ui/card";
import { Paperclip, Mic, Send, Plus, Clock } from "lucide-react";
import Image from "next/image";
export default function Home() {
  const {
    messages,
    setMessages,
    setAllChats,
    allChats,
    setFirstTimeChat,
    setActiveChatIndex,
    firstTimeChat,
    activeChatIndex,
  }: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setAllChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    allChats: Chat[];
    setFirstTimeChat: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    firstTimeChat: boolean;
    activeChatIndex: number;
  } = useChat();

  const [loading, setLoading] = useState(false);
  // Default to the first chat

  console.log("alll", allChats);

  const handleSendMessage = async (content: string) => {
    try {
      setLoading(true);

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        content,
        role: "user" as const,
      };

      // Update messages state with user message
      setMessages((prev) => [...prev, userMessage]);

      // Get AI response
      const response = await fetch(
        "https://api.echogpt.live/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "echogpt-TeztFyts-3-OeVXx8hPZQ-keR7_0OTk6-ACrdktncI5-kzKQBPu5Qh5XNqsNSgD0ylZj",
          },
          body: JSON.stringify({
            messages: [{ role: "system", content: content }],
            model: "EchoGPT",
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data:", data.choices[0].message.role);
          // Create AI message
          const aiMessage = {
            id: (Date.now() + 1).toString(),
            content: data.choices[0]?.message?.content,
            role: data.choices[0]?.message?.role,
          };

          // Update messages with AI response
          setMessages((prev) => [...prev, aiMessage]);
          console.log("first,", aiMessage);
          // Update allChats with the new messages for the active chat
          setAllChats((prev) => {
            return prev.map((chat, index) =>
              index === activeChatIndex
                ? {
                    ...chat,
                    messages: [...chat.messages, userMessage, aiMessage],
                  }
                : chat
            );
          });
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setFirstTimeChat(true);
    setMessages([]);

    // Create a new chat object
    const newChat = {
      id: Date.now().toString(),
      messages: [],
    };

    // Add the new chat to the end of the allChats array
    setAllChats((prev) => [...prev, newChat]);

    // Set the active chat index to the new chat's index
    setActiveChatIndex(allChats.length); // New chat is added at the end
  };

  return (
    <div className="flex flex-col h-screen  overflow-hidden ">
      <div className="flex-1 overflow-y-auto px-4 relative">
        <div className="space-y-4  overflow-y-auto">
          {messages.length > 0 && (
            <p className="text-center mb-5 mt-4 font-semibold sticky top-0">
              New Chat
            </p>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="">
        {/* {!firstTimeChat && (
          <div className="flex justify-center items-center">
            {messages.length === 0 && (
              <div>
                <div>
                  <Card
                    onClick={handleNewChat}
                    className="w-full max-w-md bg-white/70 mb-6 backdrop-blur-sm border-0 shadow-sm cursor-pointer"
                  >
                    <CardContent className="p-8">
                      <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-500">
                          Start Now
                        </h2>
                        <div className="space-y-1">
                          <p className="text-gray-600 text-lg">
                            Free access to Chat Application.
                          </p>
                          <p className="text-gray-500">What can I help with?</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )} */}
        <div className="flex flex-col ">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Image
                src="https://echogptlive.s3.amazonaws.com/models/92688003-9af5-43e8-ad30-0c51d21a171f-logo.svg"
                width={80}
                height={80}
                className="mb-4"
                alt=""
              />
              <h2 className="text-2xl font-bold mb-2">EchoGPT</h2>
              <p className="text-center text-gray-500 max-w-md">
                How can I help you today?
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 p-4 scroll-hidden">
            <div className="relative">
              <div className=" items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-gray-200 mb-10">
                <MessageInput
                  loading={loading}
                  handleSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
        {/* {firstTimeChat && (
          <MessageInput
            loading={loading}
            handleSendMessage={handleSendMessage}
          />
        )} */}

        {/* <button onClick={handleNewChat} className="mt-4 w-full ">
          New Chat
        </button> */}
      </div>
    </div>
  );
}
