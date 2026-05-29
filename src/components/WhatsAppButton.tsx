'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '15550199'; // Clinic WhatsApp number
  const message = 'Hello Luxe Skin Clinic, I would like to inquire about your skin treatments and dermatology services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping group-hover:animate-none -z-10"></span>
      
      <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      
      {/* Tooltip */}
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with a specialist
      </span>
    </a>
  );
}
