'use client';

import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const handleOpenBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-luxe-gradient overflow-hidden"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-200 dark:bg-indigo-950/30 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-200 dark:bg-purple-950/30 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCELLENCE IN CLINICAL AESTHETICS</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Advanced Skin Care & <br className="hidden sm:inline" />
            <span className="text-gradient">Dermatology Clinic</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            Professional skin treatments with advanced dermatology solutions for glowing, healthy, and rejuvenated skin. Experience customized medical-grade care tailored precisely to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={handleOpenBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto flex items-center justify-center gap-1 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-md"
            >
              <span>View Services</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Hero Badges */}
          <div className="flex items-center gap-6 mt-6 flex-wrap justify-center lg:justify-start text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <span>FDA Approved Tech</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>4.9 Rated Clinic</span>
            </div>
          </div>
        </div>

        {/* Right Imagery Column with Floating Elements */}
        <div className="relative flex items-center justify-center w-full max-w-lg lg:max-w-none mx-auto">
          
          {/* Main Image Container with luxury border and glow */}
          <div className="relative w-[320px] h-[380px] sm:w-[400px] sm:h-[460px] rounded-3xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl transition-all duration-500 hover:scale-[1.01] group">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000"
              alt="Professional Skin Specialist Dermatologist"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
          </div>

          {/* Floating Element 1: Stat Box */}
          <div className="absolute top-12 -left-4 sm:-left-8 glass-card rounded-2xl p-4 shadow-xl border flex items-center gap-3 animate-float max-w-[180px]">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500 text-white shadow-md">
              <Star className="w-5 h-5 fill-white stroke-none" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rating</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">4.9 / 5.0 (Clinics)</p>
            </div>
          </div>

          {/* Floating Element 2: Speciality Badge */}
          <div className="absolute bottom-16 -right-4 sm:-right-8 glass-card rounded-2xl p-4 shadow-xl border flex items-center gap-3 animate-float-delayed max-w-[200px]">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500 text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Experience</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">10+ Years Board Certified</p>
            </div>
          </div>
          
          {/* Background Decorative Rings */}
          <div className="absolute -z-10 inset-0 border-2 border-indigo-500/10 rounded-full scale-110 pointer-events-none"></div>
          <div className="absolute -z-10 inset-0 border border-purple-500/5 rounded-full scale-125 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
