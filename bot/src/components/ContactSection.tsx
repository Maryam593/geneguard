import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    icon: <FaInstagram className="text-2xl text-pink-500" />,
    name: "Instagram",
    href: "https://instagram.com/yourprofile",
  },
  {
    icon: <FaTwitter className="text-2xl text-blue-400" />,
    name: "Twitter",
    href: "https://twitter.com/yourprofile",
  },
  {
    icon: <FaLinkedin className="text-2xl text-blue-700" />,
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-10 md:py-16 px-4 md:px-0 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Let&apos;s Create Together</h2>
      {/* <div className="flex gap-6 mb-4">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="hover:scale-110 transition-transform"
          >
            {s.icon}
          </a>
        ))}
      </div> */}
      <p className="text-center text-muted-foreground max-w-xl">
        Reach out for collaborations, freelance projects, or just to say hello!
      </p>
    </section>
  );
} 