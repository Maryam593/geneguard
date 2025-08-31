import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "AboutUs", href: "#aboutus" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 md:px-12 bg-transparent">
      <a href="/" className="flex items-center gap-2 select-none">
        <FaShieldAlt className="text-2xl text-primary" />
        <span className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-blue-500">
          GeneGuard
        </span>
      </a>
      <nav className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
} 