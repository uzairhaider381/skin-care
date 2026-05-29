'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Clinic Address',
      details: 'Suite 402, Luxury Medical Heights, 5th Avenue, New York, NY 10011',
    },
    {
      icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Phone Number',
      details: '+1 (555) 0199 / +1 (555) 0188',
    },
    {
      icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Email Address',
      details: 'info@luxeskinclinic.com / support@luxeskinclinic.com',
    },
    {
      icon: <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: 'Opening Hours',
      details: 'Mon - Fri: 9:00 AM - 7:00 PM | Sat: 10:00 AM - 4:00 PM (Sunday Closed)',
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Contact Our Clinic
          </h2>
          <div className="h-1.5 w-16 bg-indigo-500 rounded-full mx-auto"></div>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Have questions about treatments or want to speak with our support staff? Contact us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Luxe Skin Clinic Details
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Reach out to us to schedule appointments, seek consultations, or clarify details about treatment procedures. Our patient desk is always happy to assist you.
              </p>
            </div>

            {/* List */}
            <div className="flex flex-col gap-5 my-2">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{info.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Container */}
            <div className="h-[200px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative shadow-sm">
              <iframe
                title="Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2388657682283!2d-73.9961603845943!3d40.734731879329124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d3023.2388657682283!2d-73.9961603845943!3d40.734731879329124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1653890100000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter dark:grayscale dark:invert"
              ></iframe>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border shadow-premium h-full flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    Thank you for contacting us. We have received your query, and a clinical representative will get back to you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-semibold text-indigo-650 dark:text-indigo-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Send Us A Message
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Skin Treatment Inquiry"
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message details here..."
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300 disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
