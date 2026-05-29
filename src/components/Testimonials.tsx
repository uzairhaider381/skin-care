'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  treatment: string;
  rating: number;
  content: string;
  date: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Jessica Williams',
      treatment: 'Acne Treatment',
      rating: 5,
      content: 'I had been struggling with severe hormonal acne for over 5 years. Dr. Sarah designed a personalized chemical peeling and skincare routine for me, and within 3 months, my skin has cleared up completely! The clinic is beautiful and extremely professional.',
      date: '2 weeks ago'
    },
    {
      name: 'Michael Chang',
      treatment: 'Laser Therapy & Resurfacing',
      rating: 5,
      content: 'Absolutely incredible experience. The advanced laser resurfacing did wonders for my deep acne scars. The treatment was comfortable, and the post-care instructions were very detailed. Highly recommend Luxe Skin Clinic!',
      date: '1 month ago'
    },
    {
      name: 'Sophia Miller',
      treatment: 'Botox & Fillers',
      rating: 5,
      content: 'I was hesitant about getting Botox, but Dr. Sarah Ahmed was so patient and explained everything. The results are extremely natural and elegant - just what I wanted! No one can tell I had anything done, they just say I look well-rested.',
      date: '3 weeks ago'
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 relative overflow-hidden">
      {/* Background soft purple circle */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-100 dark:bg-purple-950/20 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            What Our Patients Say
          </h2>
          <div className="h-1.5 w-16 bg-indigo-500 rounded-full mx-auto"></div>
        </div>

        {/* Carousel Box */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-12 border shadow-premium">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-8 sm:left-12 w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Quote className="w-5 h-5 fill-white stroke-none" />
          </div>

          {/* Testimonial Active Slide */}
          <div className="flex flex-col gap-6 mt-2">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500 stroke-none" />
              ))}
            </div>

            {/* Content */}
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
              "{testimonials[activeIndex].content}"
            </p>

            {/* Divider */}
            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full my-1"></div>

            {/* Patient Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase mt-0.5 tracking-wider">
                  {testimonials[activeIndex].treatment}
                </p>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {testimonials[activeIndex].date}
              </span>
            </div>
          </div>

          {/* Slider navigation buttons */}
          <div className="absolute right-8 bottom-8 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-300 dark:bg-slate-750'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
}
