"use server";

import { mockChatAPI } from "@/lib/ChatAPI";

export async function sendMessageAction(message: string) {
  try {
    const response = await mockChatAPI.generateResponse(message);

    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process that request.";
  }
}
