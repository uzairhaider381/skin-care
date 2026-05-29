'use client';

import React from 'react';
import { Sparkles, Zap, Layers, Activity, RefreshCw, Hourglass, ShieldAlert, Heart, ArrowRight } from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

export default function Services() {
  const handleOpenBooking = (serviceName: string) => {
    // Custom event carrying the pre-selected service details
    window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: { service: serviceName } }));
  };

  const servicesList: ServiceItem[] = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Acne Treatment',
      description: 'Advanced therapy targeting root causes of acne. Relieve active outbreaks, minimize scars, and restore your skin\'s clarity.',
      category: 'Clinical Dermatology'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Laser Therapy',
      description: 'High-precision medical lasers to treat pigmentation, vascular lesions, tattoos, and stimulate collagen for smooth texture.',
      category: 'Advanced Lasers'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Skin Whitening',
      description: 'Customized brightening and whitening infusions designed to treat melasma, sun spots, and uneven complexion gracefully.',
      category: 'Aesthetics'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Hair Fall Treatment',
      description: 'PRP therapies, scalp micro-needling, and targeted medical plans to combat hair loss and stimulate natural follicle regrowth.',
      category: 'Trichology'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Chemical Peeling',
      description: 'Medical-grade chemical peels designed to gently exfoliate dead skin, treat dark spots, hyperpigmentation, and fine lines.',
      category: 'Exfoliation'
    },
    {
      icon: <Hourglass className="w-6 h-6" />,
      title: 'Anti Aging Treatment',
      description: 'Holistic anti-aging protocols utilizing micro-needling, serums, and RF technology to restore firm contours and natural bounce.',
      category: 'Anti-Aging'
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: 'Skin Allergy Treatment',
      description: 'Expert diagnostics and therapies for eczema, psoriasis, dermatitis, and severe acute skin allergies or chronic rashes.',
      category: 'Clinical Dermatology'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Botox & Fillers',
      description: 'Premium FDA-approved injectables to smooth dynamic wrinkles, restore lost volume, and refine contours with subtle elegance.',
      category: 'Injectables'
    }
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Advanced Skin & Clinical Dermatology Services
          </h2>
          <div className="h-1.5 w-20 bg-indigo-500 rounded-full mx-auto"></div>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Our board-certified experts deliver clinical dermatology and high-end aesthetic procedures designed to promote healthy, radiant, and glowing skin.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl p-6 flex flex-col justify-between shadow-premium shadow-premium-hover transition-all duration-300 relative border overflow-hidden"
            >
              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-full group-hover:bg-indigo-500/10 transition-colors duration-300"></div>
              
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:text-white">
                  {service.icon}
                </div>
                
                <span className="text-2xs font-semibold text-indigo-500 dark:text-indigo-400 tracking-wider uppercase">
                  {service.category}
                </span>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                <button
                  onClick={() => handleOpenBooking(service.title)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-all duration-300 group/btn"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleOpenBooking(service.title)}
                  className="text-2xs text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
