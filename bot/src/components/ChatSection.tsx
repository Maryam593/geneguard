import React from "react";
import { LampEffect } from "@/components/ui/LampEffect";
import Link from "next/link";

export default function ChatSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <LampEffect>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-center text-white drop-shadow-lg">Let's sort it out together.</h2>
        <p className="text-lg text-center mb-4 text-white/80 max-w-xl">Have questions, ideas, or want to collaborate? Start a chat and let's make something amazing happen!</p>
      </LampEffect>
      <Link
        href="/chat"
        className="mt-8 px-8 py-3 rounded-full bg-white text-black font-semibold text-lg shadow-lg z-10 mb-[150px] inline-block text-center mt-[-200px]"
      >
        Let's Talk!
      </Link>
    </div>
  );
} 