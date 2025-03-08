const MOCK_DELAY = 5000;

type ChatResponse = {
  keywords: string[];
  response: string;
};

const CHAT_RESPONSES: ChatResponse[] = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello! How can I help you today?",
  },
  {
    keywords: ["how are you", "how do you do"],
    response: "I'm doing great! Thanks for asking. How can I assist you?",
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    response: "Goodbye! Have a great day!",
  },
  {
    keywords: ["help", "assist", "support"],
    response:
      "I'm here to help! Please let me know what you need assistance with.",
  },
  {
    keywords: ["weather", "temperature"],
    response:
      "I'm sorry, I cannot provide real-time weather information. Please check a weather service.",
  },
];

const DEFAULT_RESPONSE =
  "I'm not sure how to respond to that. Could you please rephrase or ask something else?";

export const mockChatAPI = {
  async generateResponse(message: string) {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

    const lowerMessage = message.toLowerCase();

    const matchedResponse = CHAT_RESPONSES.find((item) =>
      item.keywords.some((keyword) => lowerMessage.includes(keyword))
    );

    return matchedResponse?.response || DEFAULT_RESPONSE;
  },
};
