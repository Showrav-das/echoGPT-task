export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: string;
  messages: Message[];
  // createdAt: Date;
};

export type ChatContextType = {
  allChats: Chat[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
  setAllChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setFirstTimeChat: React.Dispatch<React.SetStateAction<boolean>>;
  firstTimeChat: boolean;
  handleNewChat: () => void;
  activeChatIndex: number;
  setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSwitchChat: (index: number) => void;
};
