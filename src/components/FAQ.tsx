'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What treatments do you offer for active acne and acne scars?',
      answer: 'We provide a comprehensive medical approach to acne. For active acne, we offer specialized chemical peels, topical prescriptions, and antibacterial light therapies. For acne scarring, we utilize state-of-the-art fractional lasers and RF micro-needling to stimulate fresh collagen and resurface the skin.'
    },
    {
      question: 'How long does a standard chemical peel session take, and is there downtime?',
      answer: 'A standard chemical peeling session takes about 30 to 45 minutes. The downtime depends on the type of peel: a light superficial "lunchtime" peel has virtually zero downtime, whereas a medium medical-grade peel might cause mild skin shedding and redness for 3 to 5 days.'
    },
    {
      question: 'Is laser skin therapy safe for all skin types?',
      answer: 'Yes! At Luxe Skin Clinic, we use advanced FDA-approved medical laser platforms that are specifically calibrated to be completely safe and highly effective across all skin tones and phototypes (Fitzpatrick scale I-VI).'
    },
    {
      question: 'How long do Botox and dermal filler results typically last?',
      answer: 'Botox results typically last between 3 to 6 months depending on dynamic muscle activity. Premium dermal fillers (Hyaluronic Acid) last longer, generally between 9 to 18 months, depending on the treatment area and individual metabolism.'
    },
    {
      question: 'How can I schedule an appointment with Dr. Sarah Ahmed?',
      answer: 'Scheduling is easy! You can book an appointment directly through our online Booking System on this website. Simply select your preferred service, date, and time, and our clinic desk will send you a text or email confirmation.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950/40 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Got Questions? We Have Answers
          </h2>
          <div className="h-1.5 w-16 bg-indigo-500 rounded-full mx-auto"></div>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                {/* Expandable Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-slate-100 dark:border-slate-800/80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed bg-white/30 dark:bg-slate-900/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
