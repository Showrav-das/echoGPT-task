import { ArrowRight } from "lucide-react";
import React from "react";

interface WelcomeScreenProps {
  handleNewChat: () => void;
}

export default function WelcomeScreen({ handleNewChat }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute top-8 left-8 fade-in">{/* <Logo /> */}</div>

      <div className="max-w-3xl w-full text-center space-y-3">
        <h1 className="text-display-sm md:text-display font-bold tracking-tight fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Experience the Future of AI Assistance
          </span>
        </h1>

        <p className="text-base text-gray-600 max-w-2xl mx-auto fade-in-delay-1">
          Welcome to EchoGPT, your intelligent companion for creativity and
          productivity. Get personalized help with writing, analysis, coding,
          and more - all in one powerful, free AI platform.
        </p>

        <div className=" fade-in-delay-2">
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
    </div>
  );
}
