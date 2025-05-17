"use client";
import ChatInterface from "@/components/ChatInterface";
import Home from "@/components/Home";
import { useChat } from "@/context/ChatProvider";

export default function Page() {
  const { messages, firstTimeChat } = useChat();
  return (
    <main className="container mx-auto max-w-3xl p-4">
      {/* {!firstTimeChat && ( */}
      {/* <div>{messages.length === 0 ? <Home /> : <ChatInterface />}</div> */}
      {/* )} */}
      <Home />
      
    </main>
  );
}
