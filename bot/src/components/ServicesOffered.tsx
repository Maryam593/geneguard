import React from "react";
import { FaPalette, FaCode, FaMagic } from "react-icons/fa";
import { GridBackground } from "@/components/ui/GridBackground";

const services = [
  {
    icon: <FaPalette className="text-3xl text-primary mb-2" />,
    title: "Brand & Visual Design",
    desc: "Logos, color systems, and brand assets for a unique identity.",
  },
  {
    icon: <FaCode className="text-3xl text-secondary mb-2" />,
    title: "Web & Interactive UI",
    desc: "Modern, responsive websites and engaging user interfaces.",
  },
  {
    icon: <FaMagic className="text-3xl text-accent mb-2" />,
    title: "Motion & Animation",
    desc: "Micro-interactions, hero animations, and creative effects.",
  },
];

export default function ServicesOffered() {
  return (
    <section id="services" className="w-full py-10 md:py-16 px-4 md:px-0 flex flex-col items-center relative overflow-hidden">
      <GridBackground />
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 relative z-10">Services Offered</h2>
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl shadow-lg bg-background border border-border flex flex-col items-center p-6 transition-transform hover:scale-105 text-center"
          >
            {service.icon}
            <h3 className="font-heading text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 