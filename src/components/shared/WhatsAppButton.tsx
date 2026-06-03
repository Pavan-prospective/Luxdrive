"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WhatsAppButton = () => {
  const pathname = usePathname();

  // Hide WhatsAppButton on authentication or dashboard paths
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  // Using a dummy number since none was provided
  const whatsappNumber = "+1234567890";
  const message = encodeURIComponent("Hello! I am interested in buying/selling a car on LuxDrive.");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link 
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
          <path d="M9.5 13.5c1.5 1 3.5 1 5 0" />
        </svg>
      </Link>
    </div>
  );
};

export default WhatsAppButton;
