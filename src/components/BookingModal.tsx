'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, Heart, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { createAppointment } from '@/app/actions/appointment';
import confetti from 'canvas-confetti';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    service: '',
    appointment_date: '',
    appointment_time: '',
    message: ''
  });

  const services = [
    'Acne Treatment',
    'Laser Therapy',
    'Skin Whitening',
    'Hair Fall Treatment',
    'Chemical Peeling',
    'Anti Aging Treatment',
    'Skin Allergy Treatment',
    'Botox & Fillers'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.service) {
        setFormData((prev) => ({ ...prev, service: customEvent.detail.service }));
      }
      setIsOpen(true);
      setSuccess(false);
      setError(null);
    };

    window.addEventListener('open-booking-modal', handleOpenModal);
    return () => window.removeEventListener('open-booking-modal', handleOpenModal);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (loading) return;
    setIsOpen(false);
    // Reset form after closing if it was successful
    if (success) {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        service: '',
        appointment_date: '',
        appointment_time: '',
        message: ''
      });
      setSuccess(false);
      setSubmittedData(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const parsedAge = parseInt(formData.age, 10);
      const submission = {
        ...formData,
        age: isNaN(parsedAge) ? 0 : parsedAge
      };

      const result = await createAppointment(submission);

      if (result.success) {
        setSuccess(true);
        // No demo mode flag needed
        setSubmittedData(result.appointment);
        
        // Trigger celebratory confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setError(result.error || 'Something went wrong. Please check your inputs.');
      }
    } catch (err) {
      console.error(err);
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-800 dark:text-slate-100">
              Book Skincare Consultation
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {success ? (
            <div className="flex flex-col items-center text-center gap-6 py-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  Appointment Request Sent!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-450 mt-1 max-w-md mx-auto">
                  Thank you for booking with Luxe Skin Clinic. We have received your request and our desk team will contact you shortly to confirm.
                </p>
              </div>



              {/* Summary Card */}
              {submittedData && (
                <div className="w-full max-w-md bg-slate-50 dark:bg-slate-800/40 rounded-2xl border p-5 text-left text-sm flex flex-col gap-3">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 border-b pb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>Booking Summary</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <p className="text-slate-400 text-2xs uppercase tracking-wider font-semibold">Patient</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{submittedData.full_name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-2xs uppercase tracking-wider font-semibold">Requested Service</p>
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{submittedData.service}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-2xs uppercase tracking-wider font-semibold">Date</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{submittedData.appointment_date}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-2xs uppercase tracking-wider font-semibold">Time Slot</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{submittedData.appointment_time}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {error && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-450 border border-rose-100 dark:border-rose-900/50 rounded-2xl text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* 2 Cols - Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* 3 Cols - Phone, Gender, Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Gender *</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Age *</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 28"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose Service *</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                >
                  <option value="" disabled>Select Skin Treatment</option>
                  {services.map((svc) => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Appointment Date *</span>
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    min={new Date().toISOString().split('T')[0]} // Block past dates
                    value={formData.appointment_date}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Appointment Time *</span>
                  </label>
                  <select
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
                  >
                    <option value="" disabled>Select Time Slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>Additional Message / Notes (Optional)</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your skin issues, skin history, or previous procedures..."
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50 resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300 disabled:opacity-50 text-sm mt-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
