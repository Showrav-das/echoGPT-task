"use client";
import { Calendar, Inbox, Plus, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  History,
  ShoppingBag,
  LayoutGrid,
  MessageCircle,
  CreditCard,
  Code2,
  Home,
  Sparkles,
  Settings,
  Sun,
  Info,
} from "lucide-react";
import { useChat } from "@/context/ChatProvider";
import Link from "next/link";

export function AppSidebar() {
  const { allChats, handleNewChat, activeChatIndex, handleSwitchChat } =
    useChat();

  return (
    <div className="w-64 bg-[#f8f6fe] flex flex-col h-screen">
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
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7c3aed]"
          >
            <path d="M12 5l7 7-7 7"></path>
            <path d="M5 12h14"></path>
          </svg>
          New Chat
        </button>
      </div>
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
          Chat {index + 1}
        </button>
      ))}
      {/* <div className="mt-4 px-4">
        <p className="text-sm font-medium text-gray-500 mb-2">Engagement</p>
        <nav className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <History className="h-5 w-5 text-gray-500" />
            History
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <ShoppingBag className="h-5 w-5 text-gray-500" />
            Store
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <LayoutGrid className="h-5 w-5 text-gray-500" />
            AI Tasks
          </Link>
        </nav>
      </div> */}
    </div>
  );
}
