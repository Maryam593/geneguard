import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

export default function AboutSection() {
  return (
    <section id="aboutus" className="w-full flex flex-col items-center py-10 md:py-16 px-4 md:px-0">
      <div className="flex items-center gap-3 mb-4">
        <FaUserAstronaut className="text-2xl text-primary" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold">About Me</h2>
      </div>
      <TextGenerateEffect
        words={
          "I am GeneGuard, a virtual medical assistant designed to help you understand your health concerns better. My purpose is to listen to your symptoms, ask relevant questions, and provide preliminary insights to guide you towards better health decisions. I'm here to support you in navigating your health journey with clarity and care."
        }
        className="max-w-2xl text-center text-lg md:text-xl text-muted-foreground"
      />
    </section>
  );
} 