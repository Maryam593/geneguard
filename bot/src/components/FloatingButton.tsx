"use client"
import React from "react";

// Corrected prop destructuring for FloatingButton
const FloatingButton = ({ onTop, children }: { onTop: () => void; children: React.ReactNode }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50"> {/* Added z-50 for layering */}
            <button 
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                onClick={onTop}
                aria-label="Scroll to top" // Added for accessibility
            >
                {children}
            </button>
        </div>
    );
}

export default FloatingButton;
