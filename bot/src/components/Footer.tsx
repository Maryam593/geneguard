import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FloatingDock } from "@/components/ui/FloatingDock";

const socials = [
  {
    icon: <FaInstagram className="text-xl text-pink-500" />,
    name: "Instagram",
    href: "https://instagram.com/yourprofile",
  },
  {
    icon: <FaTwitter className="text-xl text-blue-400" />,
    name: "Twitter",
    href: "https://twitter.com/yourprofile",
  },
  {
    icon: <FaLinkedin className="text-xl text-blue-700" />,
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
  },
];

export default function Footer() {
  return (
    <footer className="w-full py-4 flex flex-col items-center justify-center border-t border-border mt-8 gap-2">
      <FloatingDock
        items={socials.map((s) => ({
          title: s.name,
          icon: s.icon,
          href: s.href,
        }))}
      />
      <span className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-blue-500">GeneGuard</span>. All rights reserved.
      </span>
    </footer>
  );
} 