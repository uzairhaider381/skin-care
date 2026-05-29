'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, KeyRound, LogOut, Calendar, Users, 
  Clock, CheckCircle, Trash2, Search, Filter, RefreshCw, 
  CheckCircle2, XCircle, AlertCircle, CalendarRange, Heart
} from 'lucide-react';
import { getAppointments, updateAppointmentStatus, deleteAppointment, Appointment } from '@/app/actions/appointment';
import { verifyAdminPassword, checkAdminSession, logoutAdmin } from '@/app/actions/admin';
import { isSupabaseConfigured } from '@/lib/supabase';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

function DashboardContent() {
  const { theme, toggleTheme } = useTheme();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Appointments database state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const isDemoMode = false; // Demo mode disabled

  // Load Admin Session
  useEffect(() => {
    async function initSession() {
      const active = await checkAdminSession();
      setIsAuthenticated(active);
      if (active) {
        await loadAppointments();
      } else {
        setLoading(false);
      }
    }
    initSession();
  }, []);

  // Fetch appointments
  async function loadAppointments() {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  }

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await verifyAdminPassword(password);
      if (res.success) {
        setIsAuthenticated(true);
        await loadAppointments();
      } else {
        setAuthError(res.error || 'Login failed.');
      }
    } catch (err) {
      setAuthError('Connection error occurred.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setAppointments([]);
    setPassword('');
  };

  // Handle Status Update
  const handleStatusUpdate = async (id: string, nextStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const res = await updateAppointmentStatus(id, nextStatus);
      if (res.success) {
        // Update state locally
        setAppointments((prev) => 
          prev.map((app) => (app.id === id ? { ...app, status: nextStatus } : app))
        );
      } else {
        alert(res.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this appointment?')) return;
    try {
      const res = await deleteAppointment(id);
      if (res.success) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
      } else {
        alert(res.error || 'Failed to delete appointment.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Services list for filters
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

  // Filtering Logic
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
      
    const matchesService = selectedService ? app.service === selectedService : true;
    const matchesStatus = selectedStatus 
      ? app.status === selectedStatus 
      : activeTab !== 'all' 
        ? app.status === activeTab 
        : true;
        
    const matchesDate = selectedDate ? app.appointment_date === selectedDate : true;

    return matchesSearch && matchesService && matchesStatus && matchesDate;
  });

  // Analytics Math
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  
  // Today's appointments count (matching today's date in local server time format YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysCount = appointments.filter((a) => a.appointment_date === todayStr).length;

  // Render Loader during session check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <span className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
      </div>
    );
  }

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-luxe-gradient flex items-center justify-center px-4">
        <div className="glass-card w-full max-w-md rounded-3xl p-8 border shadow-2xl relative overflow-hidden">
          
          {/* Top aesthetic glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
          
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-650 text-white shadow-lg shadow-indigo-600/20 mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Luxe Skin Admin
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs -mt-1">
              Please enter the administrator passcode to access the dermatology clinic dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-8">
            {authError && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-455 border border-rose-100 dark:border-rose-900/50 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={authLoading}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-300 disabled:opacity-50 text-sm"
            >
              {authLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Hint for developer */}
          <div className="mt-8 text-center text-3xs text-slate-400 dark:text-slate-500 border-t pt-4">
            Default passcode is <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-bold">admin123</code>. You can change this in your `.env.local` file under <code className="bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded">ADMIN_PASSWORD</code>.
          </div>
        </div>
      </div>
    );
  }

  // Render Full Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-slate-850 dark:text-slate-100">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-450 border-r border-slate-850 flex flex-col justify-between shrink-0">
        
        {/* Top Header */}
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-650 text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-white uppercase">
              Luxe Admin
            </span>
          </div>

          <div className="h-px bg-slate-800 w-full"></div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => {}}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/90 text-white font-semibold text-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </button>
            
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Go to Site</span>
            </a>
          </nav>
        </div>

        {/* Bottom stats / Logout */}
        <div className="p-6 flex flex-col gap-4 border-t border-slate-850">
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></div>
            <span className="text-3xs uppercase tracking-wider font-bold text-slate-400">
              {isDemoMode ? 'Demo File DB Mode' : 'Supabase Live Connected'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        
        {/* TOP BAR */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Dermatology Appointments
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync DB Button */}
            <button
              onClick={loadAppointments}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            {/* Quick Time display */}
            <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-medium">
              Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="p-6 flex flex-col gap-6">
          
          {/* ANALYTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</p>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{totalCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Pending Review</p>
                <p className="text-2xl font-black text-amber-500 mt-1">{pendingCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Confirmed</p>
                <p className="text-2xl font-black text-emerald-500 mt-1">{confirmedCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Scheduled Today</p>
                <p className="text-2xl font-black text-purple-500 mt-1">{todaysCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-650 dark:text-purple-400 flex items-center justify-center">
                <CalendarRange className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* ADVANCED FILTER BOX */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b pb-2">
              <Filter className="w-4 h-4 text-indigo-500" />
              <span>Search & Filter Appointments</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-250 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm"
                />
              </div>

              {/* Service */}
              <div>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-250 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm"
                >
                  <option value="">All Services (Filter)</option>
                  {services.map((svc) => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-250 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm"
                >
                  <option value="">All Statuses (Filter)</option>
                  <option value="pending">Pending Review</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-855 dark:text-slate-250 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm"
                />
              </div>
            </div>
            
            {/* Quick Tabs */}
            <div className="flex items-center gap-2 mt-1 border-t border-slate-100 dark:border-slate-800/80 pt-4 flex-wrap">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 mr-2">Tab View:</span>
              {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedStatus(''); // clear select status to prevent override conflict
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-xs' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab} ({appointments.filter(a => tab === 'all' ? true : a.status === tab).length})
                </button>
              ))}
            </div>
          </div>

          {/* APPOINTMENTS LIST CONTAINER */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            
            {loading ? (
              /* Loader */
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <span className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-650 rounded-full animate-spin"></span>
                <p className="text-xs text-slate-405 dark:text-slate-500 font-semibold">Fetching latest slots...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              /* Empty state */
              <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">No appointments found</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 max-w-xs mt-1 mx-auto">
                    We couldn't find any bookings matching your current filter settings. Try clearing active inputs.
                  </p>
                </div>
              </div>
            ) : (
              /* Grid of items (responsive beautiful card list layout) */
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredAppointments.map((app) => (
                  <div 
                    key={app.id} 
                    className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Col 1: Patient Profile & Treatment */}
                    <div className="flex flex-col gap-3 max-w-md">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                            {app.full_name}
                          </h4>
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                            {app.gender}, {app.age} yrs
                          </span>
                        </div>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs mt-0.5">
                          {app.service}
                        </p>
                      </div>

                      {/* Contact items */}
                      <div className="flex flex-col gap-1 text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                        <p>Email: <a href={`mailto:${app.email}`} className="hover:underline font-medium text-slate-700 dark:text-slate-300">{app.email}</a></p>
                        <p>Phone: <a href={`tel:${app.phone}`} className="hover:underline font-medium text-slate-700 dark:text-slate-300">{app.phone}</a></p>
                      </div>
                    </div>

                    {/* Col 2: Date, Time & Message */}
                    <div className="flex-1 flex flex-col gap-2 max-w-lg lg:px-4">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          {app.appointment_date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          {app.appointment_time}
                        </span>
                      </div>
                      
                      {app.message ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 italic">
                          "{app.message}"
                        </p>
                      ) : (
                        <span className="text-3xs text-slate-400 italic">No notes provided.</span>
                      )}
                    </div>

                    {/* Col 3: Actions & Status */}
                    <div className="flex items-center gap-4 self-end lg:self-center shrink-0">
                      
                      {/* Status select dropdown */}
                      <div className="flex flex-col gap-1">
                        <span className="text-3xs font-semibold text-slate-400 uppercase tracking-wider">Booking Status</span>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-xs focus:outline-hidden ${
                            app.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
                              : app.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30'
                                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30'
                          }`}
                        >
                          <option value="pending">⚙ Pending</option>
                          <option value="confirmed">✓ Confirmed</option>
                          <option value="cancelled">✗ Cancelled</option>
                        </select>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/20 rounded-xl transition-all border dark:border-slate-700 mt-4"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom count display */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 flex items-center justify-between">
              <span>Showing {filteredAppointments.length} of {totalCount} appointments</span>
              {isDemoMode && <span className="text-amber-600 dark:text-amber-400">📝 Demo Mode (Mock Local DB file)</span>}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
