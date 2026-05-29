'use client';

import React from 'react';
import { Award, GraduationCap, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AboutDoctor() {
  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const bioPoints = [
    'Board Certified Specialist with a fellowship in Clinical & Esthetic Dermatology.',
    'Over 10 years of clinical experience in treating complex skin, hair, and scalp disorders.',
    'Pioneer in advanced laser resurfacing therapies and micro-needling RF treatments.',
    'Dedicated to delivering natural-looking, radiant, and scientifically sound results.'
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Image Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-[400px] h-[500px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 dark:border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=1000"
                alt="Dr. Sarah Ahmed - Skin Specialist"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
            </div>

            {/* Experience overlay badge */}
            <div className="absolute bottom-6 right-6 lg:-right-6 bg-indigo-600 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <Clock className="w-8 h-8 text-white/90" />
              <div>
                <p className="text-2xl font-bold leading-none">10+</p>
                <p className="text-2xs text-white/80 font-medium tracking-wide uppercase mt-1">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Doctor Bio Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              MEET THE SPECIALIST
            </span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Dr. Sarah Ahmed
              </h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-1">
                Certified Dermatologist & Skin Specialist
              </p>
            </div>
            <div className="h-1.5 w-16 bg-indigo-500 rounded-full"></div>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Dr. Sarah Ahmed is an internationally acclaimed board-certified dermatologist and founder of Luxe Skin Clinic. She is passionately committed to elevating skin health using state-of-the-art diagnostic protocols and modern laser aesthetic treatments. She believes in creating individualized journeys toward skin restoration that emphasize clinical purity and client confidence.
            </p>

            {/* Bio Points */}
            <div className="flex flex-col gap-3 my-2">
              {bioPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{point}</span>
                </div>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Board Certified</p>
                  <p className="text-2xs text-slate-500 dark:text-slate-400">Aesthetic Medicine Association</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Harvard Fellow</p>
                  <p className="text-2xs text-slate-500 dark:text-slate-400">Clinical Dermatology</p>
                </div>
              </div>
            </div>

            {/* Book with Doctor CTA */}
            <div className="mt-4">
              <button
                onClick={handleOpenBooking}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
