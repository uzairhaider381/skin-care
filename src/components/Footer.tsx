'use client';

import React from 'react';
import { Sparkles, MessageCircle, Camera, Briefcase, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Doctor', href: '#about' },
    { name: 'Before & After', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const treatments = [
    'Acne Treatment',
    'Laser Therapy',
    'Chemical Peeling',
    'Anti Aging Treatment',
    'Botox & Fillers',
    'Skin Allergy Treatment'
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Clinic Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-650 text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LUXE<span className="font-light text-slate-455">SKIN</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Luxe Skin & Dermatology Clinic is a premier boutique medical aesthetic and clinical dermatology facility dedicated to advanced treatments that deliver healthy, radiant, and youthful skin.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-indigo-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {treatments.map((t, idx) => (
                <li key={idx}>
                  <a href="#services" className="hover:text-indigo-400 transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-sm">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <p className="leading-relaxed">
              Suite 402, Luxury Medical Heights,<br />
              5th Avenue, New York, NY 10011
            </p>
            <p className="mt-1">
              Phone: <a href="tel:+15550199" className="hover:text-white transition-colors">+1 (555) 0199</a><br />
              Email: <a href="mailto:info@luxeskinclinic.com" className="hover:text-white transition-colors">info@luxeskinclinic.com</a>
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Luxe Skin & Dermatology Clinic. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for luxury skincare aesthetics.
          </p>
        </div>
      </div>
    </footer>
  );
}
