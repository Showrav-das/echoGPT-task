// import { Logo } from "@/components/Logo";
// import { StartButton } from "@/components/StartButton";

import { useChat } from "@/context/ChatProvider";
import { ArrowRight } from "lucide-react";

const ChatInterface = () => {
  const {
    allChats,
    setFirstTimeChat,
    setMessages,
    setAllChats,
    setActiveChatIndex,
  } = useChat();

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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="absolute top-8 left-8 fade-in">{/* <Logo /> */}</div>

      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-display-sm md:text-display font-bold tracking-tight fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Simplicity is the ultimate sophistication
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto fade-in-delay-1">
          Experience the perfect balance of form and function. Clean design that
          puts your content first, with attention to every detail.
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
  );
};

export default ChatInterface;
