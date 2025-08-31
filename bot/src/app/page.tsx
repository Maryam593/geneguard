"use client"
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesOffered from '../components/ServicesOffered';
import ChatSection from '../components/ChatSection';
import ContactSection from '../components/ContactSection';
import FloatingButton from '@/components/FloatingButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);
  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return(
      <>
       <FloatingButton onTop={onTop}>
        <FaArrowDown/>
       </FloatingButton>
      </>
    )
  }
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ChatSection />
      <ServicesOffered />
      <ContactSection />
      {isVisible && <FloatingButton onTop={onTop}>  
        <FaArrowUp/>
      </FloatingButton>}
    </main>
  );
} 