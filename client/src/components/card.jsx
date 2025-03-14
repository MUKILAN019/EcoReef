import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Card Component
const Card = ({ className = "", children, glassEffect = true }) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 transition-all duration-500",
        glassEffect ? "glass-card" : "bg-white border border-border shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
