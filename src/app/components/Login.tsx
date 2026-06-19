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
    setOtp('123456');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (activeTab === 'email') {
        if (email === 'admin@localhub.com' && password === 'admin123') {
          const adminUser = users.find(u => u.role === 'Super Admin') || users[0];
          setCurrentUser(adminUser);
          setIsLoggedIn(true);
        } else {
          setError('Invalid email or password. Click the Demo Autofill button below!');
          setLoading(false);
        }
      } else {
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-55 font-sans">
      {/* Light Ambient Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"
        />
      </div>

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/95 border border-slate-200 shadow-2xl rounded-3xl p-8 text-black">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.05, 1] }}
              transition={{ duration: 0.4 }}
              src="/logo.png"
              className="w-20 h-20 rounded-2xl shadow-sm mb-3 object-contain border border-slate-100 bg-white p-1"
              alt="Meganods Logo"
            />
            <h1 className="text-2xl font-black tracking-tight text-black">
              Meganods Console
            </h1>
            <p className="text-xs text-black font-semibold mt-1">Enterprise Directory & CRM System Login</p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200/50">
            <button
              onClick={() => { setActiveTab('email'); setError(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => { setActiveTab('mobile'); setError(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Mobile & OTP
            </button>
          </div>

          {/* Error Feed */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-rose-50 border border-rose-200 text-black text-xs p-3.5 rounded-xl mb-4 flex items-center gap-2 font-semibold"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-4">
            {activeTab === 'email' ? (
              <>
                {/* Email input field */}
                <div>
                  <label className="block text-[11px] font-black text-black mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/60">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@localhub.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white transition-all font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Password input field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-black text-black">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Use: admin123"); }} className="text-xs text-black font-black hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/60">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white transition-all font-semibold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-black/60 hover:text-black"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Mobile and OTP inputs */}
                <div>
                  <label className="block text-[11px] font-black text-black mb-1.5">Mobile Number</label>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/60 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white transition-all font-semibold"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={timer > 0}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-black border border-slate-200 text-xs font-bold rounded-xl disabled:opacity-50 transition-all whitespace-nowrap cursor-pointer"
                    >
                      {timer > 0 ? `Resend (${timer}s)` : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1.5"
                  >
                    <label className="block text-[11px] font-black text-black">Enter 6-Digit OTP</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/60">
                        <Key className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black focus:bg-white transition-all font-semibold"
                        required
                      />
                    </div>
                    <p className="text-[10px] text-black font-bold">Mock OTP code "123456" auto-filled for sandbox bypass.</p>
                  </motion.div>
                )}
              </>
            )}

            {/* Remember Me selection details */}
            <div className="flex items-center justify-between text-xs text-black pt-1 select-none font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-black focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <div className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-black" />
                <span>Light Mode Active</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-black hover:bg-slate-900 text-xs font-bold rounded-xl shadow-lg shadow-black/10 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
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

          {/* Quick Demo Autofill section */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-black text-xs font-bold rounded-xl border border-slate-350 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Demo Quick-Login (Autofill)</span>
            </button>
            <div className="text-[10px] text-center text-black font-semibold leading-normal">
              Super Admin: <span className="text-black font-black">admin@localhub.com</span> | Password: <span className="text-black font-black">admin123</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
