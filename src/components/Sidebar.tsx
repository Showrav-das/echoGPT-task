"use client";
import { MessageCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useChat } from "@/context/ChatProvider";

export function AppSidebar() {
  const { allChats, handleNewChat, activeChatIndex, handleSwitchChat } =
    useChat();
  console.log("allChats from sidebar", allChats);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="">
          <div className="p-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7c3aed] rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                <path d="M16.5 7.5C18 9 18 12 16.5 13.5C15 15 12 15 10.5 13.5C9 12 9 9 10.5 7.5C12 6 15 6 16.5 7.5Z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-medium text-[#7c3aed]">EchoGPT</h1>
          </div>

          <div className="px-4 py-2">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-start gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5 text-gray-500" />
              New Chat
            </button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {allChats.map((chat, index) => (
                <button
                  key={chat.id}
                  onClick={() => handleSwitchChat(index)}
                  className={`px-4 py-2 text-left rounded-md w-full ${
                    activeChatIndex === index
                      ? "bg-gray-100 text-gray-700"
                      : "bg-transparent"
                  }`}
                >
                  {chat?.messages[0]?.content
                    ? chat?.messages[0]?.content
                    : "New Chat"}
                </button>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
