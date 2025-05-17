"use client";
import { Chat, Message } from "@/lib/type";
import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/context/ChatProvider";
import { sendMessageAction } from "@/app/actions/sendMessageAction";
import { Card, CardContent } from "./ui/card";
import { Paperclip, Mic, Send, Plus, Clock, ArrowRight } from "lucide-react";
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

  // const handleSendMessage = async (content: string) => {
  //   try {
  //     setLoading(true);
  //     const userMessage = {
  //       id: Date.now().toString(),
  //       content,
  //       role: "user" as const,
  //     };

  //     setMessages((prev) => [...prev, userMessage]);

  //     const response = await fetch(
  //       "https://api.echogpt.live/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key":
  //             "echogpt-TeztFyts-3-OeVXx8hPZQ-keR7_0OTk6-ACrdktncI5-kzKQBPu5Qh5XNqsNSgD0ylZj",
  //         },
  //         body: JSON.stringify({
  //           messages: [{ role: "system", content: content }],
  //           model: "EchoGPT",
  //         }),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // const aiMessage = {
  //         //   id: (Date.now() + 1).toString(),
  //         //   content: data.choices[0]?.message?.content,
  //         //   role: data.choices[0]?.message?.role,
  //         // };
  //         const aiMessage = {
  //           id: (Date.now() + 1).toString(),
  //           content: data.choices[0]?.message?.content,
  //           role: data.choices[0]?.message?.role,
  //         };

  //         setMessages((prev) => [...prev, aiMessage]);
  //         console.log("message", messages.length);
  //         if (firstTimeChat || allChats.length === 0) {
  //           const newChat = {
  //             id: Date.now().toString(),
  //             messages: [],
  //           };

  //           setAllChats((prev) => [...prev, newChat]);

  //           setFirstTimeChat(false);
  //         } else {
  //           setAllChats((prev) => {
  //             return prev.map((chat, index) =>
  //               index === activeChatIndex
  //                 ? {
  //                     ...chat,
  //                     messages: [...chat.messages, userMessage, aiMessage],
  //                   }
  //                 : chat
  //             );
  //           });
  //         }
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      );
      const data = await response.json();
      console.log("data", data);
      // Create AI message
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0]?.message?.content,
        role: data.choices[0]?.message?.role,
      };
      // Update messages with AI response
      setMessages((prev) => [...prev, aiMessage]);

      if (firstTimeChat) {
        console.log("firstTimeChat", firstTimeChat);
        // If it's the first chat, create a new chat and add it to allChats
        const newChat = {
          id: Date.now().toString(),
          messages: [userMessage, aiMessage],
        };
        setAllChats((prev) => [...prev, newChat]);
        setFirstTimeChat(false); // Set firstTimeChat to false after saving
        console.log("allchats from home: ", allChats);
        setActiveChatIndex(allChats.length); // Set active chat to the new chat
      } else {
        // Update existing chat
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
      }
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
    <div className="flex flex-col h-screen  overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 relative">
        <div className="space-y-4  overflow-y-auto">
          {!messages && firstTimeChat && (
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
        <div className="flex flex-col ">
          {!firstTimeChat && (
            <div>
              {messages.length === 0 && (
                <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
                  <div className="absolute top-8 left-8 fade-in">
                    {/* <Logo /> */}
                  </div>

                  <div className="max-w-3xl w-full text-center space-y-8">
                    <h1 className="text-display-sm md:text-display font-bold tracking-tight fade-in">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Simplicity is the ultimate sophistication
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto fade-in-delay-1">
                      Experience the perfect balance of form and function. Clean
                      design that puts your content first, with attention to
                      every detail.
                    </p>

                    <div className="pt-4 fade-in-delay-2">
                      <button
                        onClick={handleNewChat}
                        className="group relative overflow-hidden rounded-full bg-black px-6 py-3 text-white transition-all duration-300 ease-out hover:bg-gray-800 hover:pr-9 animate-button-glow hover-pulse"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                          Start Now
                          <ArrowRight className="inline-block h-4 w-0 opacity-0 transition-all duration-300 ease-in-out group-hover:w-4 group-hover:opacity-100" />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-8 text-center text-gray-500 fade-in-delay-2">
                    <p className="text-sm">Designed by Leonardo da Vinci</p>
                  </div>
                </div>
                // <div className="flex-1 flex flex-col items-center justify-center p-6">
                //   <Image
                //     src="https://echogptlive.s3.amazonaws.com/models/92688003-9af5-43e8-ad30-0c51d21a171f-logo.svg"
                //     width={80}
                //     height={80}
                //     className="mb-4"
                //     alt=""
                //   />
                //   <h2 className="text-2xl font-bold mb-2">EchoGPT</h2>
                //   <p className="text-center text-gray-500 max-w-md">
                //     How can I help you today?
                //   </p>
                // </div>
              )}
            </div>
          )}

          {firstTimeChat && (
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
          )}
        </div>
      </div>
    </div>
  );
}
