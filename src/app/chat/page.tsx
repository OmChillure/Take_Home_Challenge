"use client";
import React, { useState, useEffect } from "react";
import { textTotext } from "../../utils/gemini";
import {
  Bot,
  BotMessageSquareIcon,
  MessageSquareReply,
  MicIcon,
  UserSquare,
} from "lucide-react";
import Header from "~/components/Header/Header";

type ChatHistoryType = { userMessage: string; llmMessage: string };

export default function page() {
  const [data, setData] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);

  const handleChatResponse = async () => {
    const llmResponse = await textTotext(data);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { userMessage: data, llmMessage: llmResponse },
    ]);
    setData("");
  };

  return (
    <>
    <Header />
      <div className="container relative flex h-[130vh] flex-col items-center justify-center gap-2 overflow-hidden">
        <div className="bottom-[18%] right-[3%] flex h-[75%] w-[80%] justify-center rounded-lg bg-[#464545] pt-[rem] font-sans text-2xl text-black">
          <div className="flex w-[90%] flex-col gap-2 font-sans">
            <div className="ml-1.5 h-[90%] w-[100%] rounded-md text-sm text-white">
              {chatHistory.map((message, index) => (
                <div key={index}>
                  <div className="mb-3 flex pt-4">
                    <span className="text-blue-500">
                      <UserSquare className="h-[8vh] w-[7vh]" />
                    </span>
                    <div className="ml-2 h-[10vh] w-[35vw] rounded-md bg-black p-4">
                      {message.userMessage}
                    </div>
                    <div className="mt-[9%] flex justify-end gap-3 text-white">
                      <div className="h-auto w-[35vw] rounded-md bg-[#b2468cdb] p-4">
                        {message.llmMessage}
                      </div>
                      <span className="text-md text-blue-500">
                        <Bot className="h-[8vh] w-[8vh]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-[80%] ">
          <div className="flex w-[100%] gap-2">
            <input
              className="w-[100%] rounded-md pl-1 text-sm text-white"
              placeholder="Type your message..."
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <button
              className="w-[3%] rounded-md bg-cyan-500 p-1 text-sm"
              onClick={handleChatResponse}
            >
              <MessageSquareReply />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
