'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, HelpCircle, ArrowRight, Sun, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { setIsLoggedIn, setCurrentUser, users } = useApp();
  const [activeTab, setActiveTab] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleAutofill = () => {
    setEmail('admin@localhub.com');
    setPassword('admin123');
    setError('');
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setOtpSent(true);
    setTimer(60);
    setOtp('123456'); // Pre-fill mock OTP for easy demo
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (activeTab === 'email') {
        if (email === 'admin@localhub.com' && password === 'admin123') {
          // Success
          const adminUser = users.find(u => u.role === 'Super Admin') || users[0];
          setCurrentUser(adminUser);
          setIsLoggedIn(true);
        } else {
          setError('Invalid email or password. Use the autofill helper below!');
          setLoading(false);
        }
      } else {
        // OTP Login
        if (otp === '123456') {
          const adminUser = users.find(u => u.role === 'Super Admin') || users[0];
          setCurrentUser(adminUser);
          setIsLoggedIn(true);
        } else {
          setError('Invalid OTP code. Enter 123456 to bypass.');
          setLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900 font-sans">
      {/* Animated Floating Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/25 blur-3xl"
        />
      </div>

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card rounded-2xl shadow-2xl p-8 border border-slate-700/50 bg-slate-800/80 text-white">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3"
            >
              <ShieldCheck className="w-9 h-9 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Justdial Admin Panel
            </h1>
            <p className="text-sm text-slate-400 mt-1">Enterprise Directory & CRM Console</p>
          </div>

          {/* Login Mode Tabs */}
          <div className="grid grid-cols-2 bg-slate-900/60 p-1.5 rounded-lg border border-slate-700/30 mb-6">
            <button
              onClick={() => { setActiveTab('email'); setError(''); }}
              className={`py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'email'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => { setActiveTab('mobile'); setError(''); }}
              className={`py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile & OTP
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs p-3 rounded-lg mb-4 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-4">
            {activeTab === 'email' ? (
              <>
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@localhub.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-medium text-slate-300">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Enter: admin123"); }} className="text-xs text-blue-400 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-900/50 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Mobile Phone Field */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Mobile Number</label>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={timer > 0}
                      className="px-4 py-2.5 bg-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-600 disabled:opacity-50 text-white transition-all whitespace-nowrap"
                    >
                      {timer > 0 ? `Resend (${timer}s)` : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {/* OTP Code Field */}
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Enter 6-Digit OTP</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                        <Key className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-emerald-400 mt-1">Mock OTP code "123456" has been auto-filled!</p>
                  </motion.div>
                )}
              </>
            )}

            {/* Remember Me & Controls */}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <div className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-slate-400" />
                <span>Light Theme default</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="glow-btn w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 text-white flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Access Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-6 border-t border-slate-700/50 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full py-2 bg-slate-900 hover:bg-slate-950 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Demo Quick-Login (Autofill)</span>
            </button>
            <div className="text-[10px] text-center text-slate-500 mt-1">
              Admin: <span className="text-slate-400">admin@localhub.com</span> | Password: <span className="text-slate-400">admin123</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
