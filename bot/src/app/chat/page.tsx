"use client"
import React, { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { FaShieldAlt } from "react-icons/fa";

export default function ChatPage() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi, I am GeneGuard. I am here to help you." },
  ]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setWaiting(true);
    const userInput = input;
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: data.text || "Sorry, I couldn't get a response." },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: "Sorry, something went wrong." },
      ]);
    }
    setWaiting(false);
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <main className="flex flex-col max-w-2xl w-full mx-auto my-8 overflow-hidden rounded-xl shadow-xl" style={{ background: "linear-gradient(90deg, #ef4444 0%, #1e293b 50%, #3b82f6 100%)" }}>
        {/* Chat area */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-base shadow-md bg-black ${
                  msg.from === "user"
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
                  {msg.text}
                </span>
              </div>
            </div>
          ))}
          {waiting && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-2xl text-base shadow-md bg-black rounded-bl-none opacity-60 animate-pulse">
                ...
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <form onSubmit={handleSend} className="w-full px-4 py-4 bg-black/90 border-t border-gray-800 flex items-center gap-2 sticky bottom-0 z-20 rounded-b-xl">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={waiting}
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={waiting}
          >
            <PaperPlaneIcon className="w-5 h-5" />
          </button>
        </form>
      </main>
    </div>
  );
} 