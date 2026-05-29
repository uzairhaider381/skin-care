'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  title: string;
  treatment: string;
  beforeImg: string;
  afterImg: string;
  details: string;
}

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<'all' | 'laser' | 'acne' | 'anti-aging'>('all');

  const galleryItems: GalleryItem[] = [
    {
      title: 'Hormonal Acne Clearing',
      treatment: 'Clinical Acne Therapy',
      beforeImg: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
      afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800',
      details: 'Patient treated for active cystic acne. Results after 12 weeks of clinical peeling and laser sessions.'
    },
    {
      title: 'Wrinkle Reduction',
      treatment: 'Anti-Aging & Botox',
      beforeImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
      afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800',
      details: 'Restored loss of volume and ironed out fine lines using premium micro-infusions and dermal fillers.'
    },
    {
      title: 'Hyperpigmentation Erasure',
      treatment: 'Laser & Chemical Peeling',
      beforeImg: 'https://images.unsplash.com/photo-1508751119619-6598f48a6cd3?q=80&w=800',
      afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800',
      details: 'Removed years of deep sun spots and stubborn melasma on the cheeks after 4 sessions of customized Erbium laser.'
    }
  ];

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Before & After Skin Gallery
          </h2>
          <div className="h-1.5 w-20 bg-indigo-500 rounded-full mx-auto"></div>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            See the transformative power of our science-backed clinical treatments. These are real results from our satisfied clinical patients.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden border shadow-premium shadow-premium-hover transition-all duration-300 flex flex-col"
            >
              {/* Image Split Container */}
              <div className="grid grid-cols-2 gap-0.5 relative group bg-slate-200 dark:bg-slate-800">
                {/* Before Image */}
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={item.beforeImg}
                    alt={`${item.title} Before`}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-xs text-white text-3xs font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                    Before
                  </div>
                </div>

                {/* After Image */}
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={item.afterImg}
                    alt={`${item.title} After`}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-xs text-white text-3xs font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                    After
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex flex-col gap-2">
                <span className="text-2xs font-semibold text-indigo-500 dark:text-indigo-400 tracking-wider uppercase">
                  {item.treatment}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed mt-1">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
