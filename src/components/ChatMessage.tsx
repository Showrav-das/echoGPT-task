import { Message } from "@/lib/type";

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`px-4 py-2 rounded-lg ${
          message.role === "user" ? "bg-gray-200 text-white" : "bg-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
