'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export default function StickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <button
      onClick={handleOpenBooking}
      className={`fixed bottom-6 left-6 z-40 md:z-30 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-indigo-400/20 ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0 pointer-events-none'
      }`}
    >
      <Calendar className="w-5 h-5" />
      <span>Book Appointment</span>
    </button>
  );
}
