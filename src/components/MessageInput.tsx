"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpIcon } from "lucide-react";

type MessageInputProps = {
  handleSendMessage: (message: string) => void;
  loading: boolean;
};

export function MessageInput({
  handleSendMessage,
  loading,
}: MessageInputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className=" border-0 bg-transparent p-1 w-full text-sm focus:outline-none"
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={(e: any) => {
          if (!loading && e.key === "Enter") {
            handleSendMessage(input);
            setInput("");
          }
        }}
        type="text"
      />
      <div className="flex items-center gap-2">
        <button
          disabled={loading}
          onClick={() => {
            handleSendMessage(input);
            setInput("");
          }}
          className="p-2 rounded-full hover:bg-gray-300 bg-gray-200"
        >
          <ArrowUpIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
