'use client';

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

export default function Button({ 
  href, 
  onClick, 
  children, 
  variant = 'primary', 
  className = "" 
}: ButtonProps) {
  
  const baseStyles = "px-8 py-2 lg:py-4 md:py-3 rounded-full font-bold transition-all duration-200 active:scale-95 inline-block text-center";
  
  const variants = {
    primary: "bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg",
    outline: "bg-white/10 backdrop-blur-md text-green-950 border border-green-700/30 hover:bg-white/30 hover:ease-in",
    ghost: "bg-transparent text-green-700 hover:bg-green-50"
  };

  // FIX: Use a simple array join to avoid accidental double spaces
  const combinedClasses = [baseStyles, variants[variant], className].filter(Boolean).join(" ").trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} type="button">
      {children}
    </button>
  );
}