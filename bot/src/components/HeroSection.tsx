import React from "react";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { HeroHighlight } from "@/components/ui/HeroHighlight";

export default function HeroSection() {
  return (
    <section id="home" className="w-full flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-8 md:gap-0 relative overflow-hidden">
      <HeroHighlight containerClassName="absolute inset-0 z-0 pointer-events-none"><div /></HeroHighlight>
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-12 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
          Let&apos;s bring<br />
          your vision<br />
          to <span className="bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 bg-clip-text text-transparent">life</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
          I&apos;m an independent <span className="font-semibold text-primary">graphic artist</span> dedicated to integrating web-based interactive design and creative solutions for personal or professional projects.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-56 h-72 rounded-full flex items-center justify-center">
          <EvervaultCard text="GeneGuard" />
        </div>
      </div>
    </section>
  );
} 