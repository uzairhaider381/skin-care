'use client';

import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
}

export default function Stats() {
  const statsList: StatItem[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '5000+',
      label: 'Happy Patients',
      detail: 'Successful skincare journeys'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      value: '10+',
      label: 'Years Experience',
      detail: 'Clinical board certified excellence'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      value: '25+',
      label: 'Clinical Treatments',
      detail: 'Tailored cosmetic & medical solutions'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: '4.9',
      label: 'Google Rating',
      detail: 'Outstanding patient feedback'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-900 dark:bg-slate-950 border-y border-indigo-950 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {statsList.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white/5 dark:bg-white/3 backdrop-blur-xs rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white">
              {stat.icon}
            </div>
            
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              {stat.value}
            </p>
            
            <p className="text-base font-bold text-indigo-200 dark:text-indigo-300">
              {stat.label}
            </p>
            
            <p className="text-xs text-indigo-300/80 dark:text-slate-400 mt-1 font-medium">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
