'use client';

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export default function BlogPlaceholder() {
  const posts: BlogPost[] = [
    {
      title: 'The Ultimate Guide to Treating Hormonal Acne',
      excerpt: 'Struggling with persistent breakouts? Learn the clinical causes of adult hormonal acne and the most effective dermatological treatments.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
      date: 'May 15, 2026',
      author: 'Dr. Sarah Ahmed',
      category: 'Acne Care'
    },
    {
      title: 'Demystifying Chemical Peels: What to Expect',
      excerpt: 'From superficial peels to deep resurfacing, we break down how medical chemical peels work and how to choose the right one for your skin type.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800',
      date: 'May 10, 2026',
      author: 'Dr. Sarah Ahmed',
      category: 'Exfoliation'
    },
    {
      title: 'Top 5 Anti-Aging Secrets Recommended by Dermatologists',
      excerpt: 'Retinoids, peptides, vitamin C, or injectables? Discover the scientifically proven ingredients that keep your skin youthful and firm.',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800',
      date: 'May 04, 2026',
      author: 'Skin Care Desk',
      category: 'Anti-Aging'
    }
  ];

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Skincare Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Dermatology & Skin Care Blog
          </h2>
          <div className="h-1.5 w-16 bg-indigo-500 rounded-full mx-auto"></div>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Stay informed with the latest insights, skincare tips, and medical dermatology articles written by certified skin specialists.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="glass-card rounded-3xl overflow-hidden border shadow-premium shadow-premium-hover transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-indigo-600/90 text-white text-3xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-3">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-2xs text-slate-450 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer group">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
