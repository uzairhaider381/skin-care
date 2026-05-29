'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
      setEmail('');
    }, 1200);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950/20 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border shadow-premium relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Background Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>

          {subscribed ? (
            <div className="flex flex-col items-center gap-4 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                You're Subscribed!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Thank you for subscribing to Luxe Skin newsletter. You will receive exclusive aesthetic skincare tips, dermatology advice, and clinic offers soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-2xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3 h-3" />
                <span>WEEKLY SKINCARE INSIGHTS</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Subscribe to Our Newsletter
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 max-w-lg mb-4">
                Join our premium community to receive dermatologist-backed skin science, healthy skin routines, and exclusive VIP clinic offers directly to your inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all duration-300 disabled:opacity-50 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300 disabled:opacity-50 shrink-0 text-sm flex items-center justify-center min-w-[120px]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
              <p className="text-3xs text-slate-400 dark:text-slate-500 mt-2">
                We value your privacy. Unsubscribe at any time.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
