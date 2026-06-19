'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { citiesData } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  Mail,
  DollarSign,
  Star,
  Plus,
  Send,
  MapPin,
  ArrowUpRight,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  ArrowRight,
  Activity,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export default function DashboardOverview() {
  const {
    businesses,
    leads,
    reviews,
    users,
    setCurrentTab,
    updateBusinessStatus,
    setSelectedBusinessId
  } = useApp();

  const [selectedCity, setSelectedCity] = useState<string | null>('Mumbai');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('month');

  // Carousel states
  const [premiumIndex, setPremiumIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  // Auto-play for insight carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % platformInsights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Metrics calculations
  const totalBusinesses = businesses.length + 25431;
  const totalUsers = users.length + 18320;
  const activeListings = businesses.filter(b => b.status !== 'Suspended').length + 24200;
  const pendingVerification = businesses.filter(b => b.status === 'Pending').length;
  const totalLeads = leads.length + 4515;
  const totalRevenue = businesses.reduce((acc, b) => acc + (b.revenue || 0), 0) + 185000;
  const premiumBusinesses = businesses.filter(b => b.status === 'Premium' || b.status === 'Featured').length;
  const totalReviews = reviews.length + 8420;

  // Filter scaling factors
  const multiplier = timeFilter === 'today' ? 0.05 : timeFilter === 'week' ? 0.25 : 1;

  // Chart Data
  const revenueChartData = [
    { month: 'Jan', revenue: 42000 * multiplier, ads: 12000 * multiplier },
    { month: 'Feb', revenue: 48000 * multiplier, ads: 15000 * multiplier },
    { month: 'Mar', revenue: 55000 * multiplier, ads: 18000 * multiplier },
    { month: 'Apr', revenue: 68000 * multiplier, ads: 24000 * multiplier },
    { month: 'May', revenue: 78000 * multiplier, ads: 29000 * multiplier },
    { month: 'Jun', revenue: totalRevenue * multiplier, ads: 38000 * multiplier }
  ];

  const leadsTrendData = [
    { day: 'Mon', leads: Math.round(420 * multiplier), converted: Math.round(310 * multiplier) },
    { day: 'Tue', leads: Math.round(480 * multiplier), converted: Math.round(360 * multiplier) },
    { day: 'Wed', leads: Math.round(510 * multiplier), converted: Math.round(400 * multiplier) },
    { day: 'Thu', leads: Math.round(490 * multiplier), converted: Math.round(390 * multiplier) },
    { day: 'Fri', leads: Math.round(550 * multiplier), converted: Math.round(440 * multiplier) },
    { day: 'Sat', leads: Math.round(380 * multiplier), converted: Math.round(290 * multiplier) },
    { day: 'Sun', leads: Math.round(410 * multiplier), converted: Math.round(320 * multiplier) }
  ];

  const categoryDistributionData = [
    { name: 'Packers & Movers', value: 3400, color: '#6366f1' }, // Indigo
    { name: 'Dentists', value: 2200, color: '#3b82f6' },        // Blue
    { name: 'Hotels', value: 4100, color: '#06b6d4' },          // Cyan
    { name: 'Restaurants', value: 6800, color: '#10b981' },     // Emerald
    { name: 'Electronics', value: 1800, color: '#f59e0b' }      // Amber
  ];

  // Premium Listings list
  const premiumListingsList = businesses.filter(b => b.status === 'Premium' || b.status === 'Featured' || b.status === 'Verified');

  // Platform Insights Data for Carousel
  const platformInsights = [
    {
      title: 'Monthly Review Milestone',
      description: 'Reviews crossed 8.4k with an average rating of 4.6 stars. High engagement detected in food and hospitality.',
      metric: '8,420 Reviews',
      badge: 'Engagement Bloom',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Top Performing City',
      description: 'Mumbai is currently leading all states in subscription conversions and lead counts, contributing 24.5% overall.',
      metric: 'Mumbai Hub',
      badge: 'Geo Growth',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Lead Conversion Rate',
      description: 'Our lead-to-conversion efficiency increased by 8.4% since last month due to the new smart SMS matching system.',
      metric: '78.5% Success',
      badge: 'Productivity Peak',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Developer Note: SEO Boost',
      description: 'Sitemaps regenerated successfully. Google Search Console clicks up 15% for local packers & movers queries.',
      metric: '+15.2% Traffic',
      badge: 'SEO Health',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Map selection city stats
  const activeCityStats = citiesData.find(c => c.name === selectedCity) || citiesData[0];

  const handleRecentListingClick = (id: string) => {
    setSelectedBusinessId(id);
    setCurrentTab('all-businesses');
  };

  // Carousel handlers
  const prevPremium = () => {
    setPremiumIndex((prev) => (prev === 0 ? premiumListingsList.length - 1 : prev - 1));
  };
  const nextPremium = () => {
    setPremiumIndex((prev) => (prev === premiumListingsList.length - 1 ? 0 : prev + 1));
  };

  const prevInsight = () => {
    setInsightIndex((prev) => (prev === 0 ? platformInsights.length - 1 : prev - 1));
  };
  const nextInsight = () => {
    setInsightIndex((prev) => (prev === platformInsights.length - 1 ? 0 : prev + 1));
  };

  // Custom glassmorphic tooltip for charts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs">
          <p className="font-bold mb-1.5 text-slate-300">{label}</p>
          <div className="space-y-1">
            {payload.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.stroke }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-100">
                  {item.name.toLowerCase().includes('revenue') ? `₹${item.value.toLocaleString()}` : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Framer Motion Animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Hero Section with Animated Mesh Blobs */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-900 text-white rounded-3xl p-8 shadow-xl shadow-blue-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* Animated Background Mesh Shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mb-16 animate-pulse duration-[8000ms]" />

        <div className="relative z-10 space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10 text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-spin" />
            <span>Platform Status: Live & Optimized</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome Back, Admin 👋</h2>
          <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
            Platform operations are running smoothly. You have <span className="font-bold text-white underline decoration-amber-400 decoration-2 underline-offset-4">{totalBusinesses.toLocaleString()}</span> active businesses and <span className="font-bold text-white underline decoration-emerald-400 decoration-2 underline-offset-4">4,520</span> user searches today.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentTab('add-business')}
            className="px-5 py-3 bg-white text-blue-600 font-bold rounded-2xl text-xs hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Business</span>
          </button>
          <button
            onClick={() => setCurrentTab('push-notifications')}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md border border-white/10 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </motion.div>

      {/* Interactive Filters Panel */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-slate-800 text-sm">Dashboard Activity Metrics</span>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(['today', 'week', 'month'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize cursor-pointer ${
                timeFilter === filter
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top 8 Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            title: 'Total Businesses',
            value: totalBusinesses.toLocaleString(),
            trend: '+12% MoM',
            trendUp: true,
            icon: Briefcase,
            bg: 'bg-blue-500/10 text-blue-600',
            color: 'blue'
          },
          {
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            trend: '+18.4%',
            trendUp: true,
            icon: Users,
            bg: 'bg-indigo-500/10 text-indigo-600',
            color: 'indigo'
          },
          {
            title: 'Active Listings',
            value: activeListings.toLocaleString(),
            trend: '98.2% Rate',
            trendUp: true,
            icon: CheckCircle,
            bg: 'bg-emerald-500/10 text-emerald-600',
            color: 'emerald'
          },
          {
            title: 'Pending Verification',
            value: pendingVerification,
            trend: 'Needs Attention',
            trendUp: false,
            action: () => setCurrentTab('pending-approval'),
            icon: Clock,
            bg: 'bg-amber-500/10 text-amber-600',
            color: 'amber'
          },
          {
            title: 'Total Leads',
            value: totalLeads.toLocaleString(),
            trend: '+8.3%',
            trendUp: true,
            icon: Mail,
            bg: 'bg-cyan-500/10 text-cyan-600',
            color: 'cyan'
          },
          {
            title: 'Platform Revenue',
            value: `₹${(totalRevenue * 10 * multiplier).toLocaleString()}`,
            trend: '+24% MoM',
            trendUp: true,
            icon: DollarSign,
            bg: 'bg-green-500/10 text-green-600',
            color: 'green'
          },
          {
            title: 'Premium Accounts',
            value: premiumBusinesses,
            trend: 'Gold/Plat Tier',
            trendUp: true,
            icon: Star,
            bg: 'bg-yellow-500/10 text-yellow-600',
            color: 'yellow'
          },
          {
            title: 'Total Reviews',
            value: totalReviews.toLocaleString(),
            trend: 'Avg 4.6 Stars',
            trendUp: true,
            icon: Star,
            bg: 'bg-pink-500/10 text-pink-600',
            color: 'pink',
            fillIcon: true
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between transition-colors relative overflow-hidden group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.title}</p>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} transition-all group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${stat.fillIcon ? 'fill-current' : ''}`} />
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                {stat.action ? (
                  <button
                    onClick={stat.action}
                    className="text-[10px] text-indigo-600 font-extrabold hover:underline flex items-center gap-0.5"
                  >
                    <span>{stat.trend}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                ) : (
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
                    stat.trendUp ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : null}
                    {stat.trend}
                  </span>
                )}
              </div>
              
              {/* Bottom decorative color border line */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Charts Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Revenue Area Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Revenue Analytics</h3>
              <p className="text-xs text-slate-500">Subscription plans vs advertising campaign inflows</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Subscriptions
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Banner Ads
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="ads" name="Ads Sales" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorAds)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads Trend Line Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Leads Conversion Trend</h3>
            <p className="text-xs text-slate-500">Weekly conversion path tracking</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Line type="monotone" dataKey="leads" name="Total Leads" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="converted" name="Converted Leads" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* NEW SECTION: Premium Listings & Platform Insights Carousels */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Carousel 1: Premium & Featured Listings Showcase */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[340px] relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                <h3 className="font-bold text-slate-800 text-base">Premium Partners Carousel</h3>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={prevPremium}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextPremium}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden h-48 bg-slate-50/80 rounded-2xl border border-slate-100 p-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={premiumIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 h-full flex flex-col justify-between"
                >
                  {premiumListingsList.length > 0 ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-3xl shadow-sm">
                            {premiumListingsList[premiumIndex].logo}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 leading-tight">
                              {premiumListingsList[premiumIndex].name}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {premiumListingsList[premiumIndex].category} • {premiumListingsList[premiumIndex].location.city}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          premiumListingsList[premiumIndex].status === 'Premium'
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {premiumListingsList[premiumIndex].status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2">
                        <div className="text-center bg-white p-1.5 rounded-lg border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400">Rating</p>
                          <p className="text-xs font-black text-amber-500 mt-0.5 flex items-center justify-center gap-0.5">
                            <Star className="w-3 h-3 fill-current" /> {premiumListingsList[premiumIndex].rating || '4.5'}
                          </p>
                        </div>
                        <div className="text-center bg-white p-1.5 rounded-lg border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400">Leads Received</p>
                          <p className="text-xs font-black text-slate-800 mt-0.5">
                            {premiumListingsList[premiumIndex].leadsCount || 42}
                          </p>
                        </div>
                        <div className="text-center bg-white p-1.5 rounded-lg border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400">Revenue</p>
                          <p className="text-xs font-black text-emerald-600 mt-0.5">
                            ₹{(premiumListingsList[premiumIndex].revenue || 1200).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                        <span>Owner: {premiumListingsList[premiumIndex].owner || 'Verified Partner'}</span>
                        <button
                          onClick={() => handleRecentListingClick(premiumListingsList[premiumIndex].id)}
                          className="text-[11px] text-indigo-600 font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Manage Page</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                      No Premium listings found.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {premiumListingsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPremiumIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  premiumIndex === idx ? 'bg-indigo-600 w-5' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel 2: Platform Insights & Milestones */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[340px] relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600/10" />
                <h3 className="font-bold text-slate-800 text-base">Interactive Insights Feed</h3>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={prevInsight}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextInsight}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden h-48 bg-slate-50/80 rounded-2xl border border-slate-100 p-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={insightIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                      {platformInsights[insightIndex].badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Milestone Alert</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-800">
                      {platformInsights[insightIndex].title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {platformInsights[insightIndex].description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-400">Current Key Stat:</span>
                    <span className="text-sm font-black text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-lg">
                      {platformInsights[insightIndex].metric}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {platformInsights.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setInsightIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  insightIndex === idx ? 'bg-indigo-600 w-5' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Row 2: India Map & Category Pie */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* India Map Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Interactive India Map</h3>
              <p className="text-xs text-slate-500">Click a city node to inspect premium listings & lead generation counts</p>
            </div>
            {selectedCity && (
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-xl border border-indigo-100/50">
                Selected: {selectedCity}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SVG MAP Representation */}
            <div className="h-80 border border-slate-100 rounded-2xl bg-slate-50/50 relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 500 500" className="w-full h-full text-slate-200">
                {/* Simulated India Outline */}
                <path
                  d="M170,100 L210,120 L220,90 L240,110 L250,70 L280,100 L300,120 L310,90 L340,130 L360,160 L380,190 L390,240 L410,270 L380,260 L360,280 L350,300 L320,330 L270,350 L250,380 L230,420 L210,470 L200,480 L190,460 L180,420 L195,380 L180,350 L140,310 L120,290 L110,250 L100,220 L130,190 L140,170 L150,150 L150,120 Z"
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth="2.5"
                />
                
                {/* City Pins */}
                {citiesData.map((c) => (
                  <g
                    key={c.name}
                    className="cursor-pointer group"
                    onClick={() => setSelectedCity(c.name)}
                  >
                    <circle
                      cx={c.cx}
                      cy={c.cy}
                      r={selectedCity === c.name ? 10 : 6}
                      fill={selectedCity === c.name ? '#10b981' : '#4f46e5'}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={c.cx}
                      cy={c.cy}
                      r={selectedCity === c.name ? 18 : 11}
                      fill="none"
                      stroke={selectedCity === c.name ? '#10b981' : '#4f46e5'}
                      strokeWidth="2"
                      className="opacity-30 animate-pulse"
                    />
                    <text
                      x={c.cx + 12}
                      y={c.cy + 4}
                      fill="#475569"
                      fontSize="10"
                      fontWeight="800"
                      className="select-none transition-colors group-hover:fill-indigo-600"
                    >
                      {c.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* City Stats Details Panel */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="p-5 bg-slate-50/80 border border-slate-200/60 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span className="font-extrabold text-slate-800 text-sm">{activeCityStats.name} Hub Details</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 border border-slate-100 rounded-xl text-center shadow-sm">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Listings</p>
                    <p className="text-base font-black text-slate-800 mt-1">{activeCityStats.businesses}</p>
                  </div>
                  <div className="bg-white p-3.5 border border-slate-100 rounded-xl text-center shadow-sm">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Leads</p>
                    <p className="text-base font-black text-slate-800 mt-1">{activeCityStats.leads}</p>
                  </div>
                  <div className="bg-white p-3.5 border border-slate-100 rounded-xl text-center shadow-sm">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Premium</p>
                    <p className="text-base font-black text-amber-600 mt-1">{activeCityStats.premium}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 text-xs text-indigo-900 leading-relaxed">
                <strong>Location Focus:</strong> {activeCityStats.name} contributes to {((activeCityStats.leads / totalLeads) * 100).toFixed(1)}% of total leads globally. Premium accounts are renewing at a 94.2% rate.
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Category Distribution</h3>
            <p className="text-xs text-slate-500">Listings allocation across primary sectors</p>
          </div>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-slate-800">18.3K</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Total Tags</span>
            </div>
          </div>
          <div className="space-y-2">
            {categoryDistributionData.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="font-semibold">{c.name}</span>
                </span>
                <span className="font-extrabold text-slate-800">{(c.value).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Row 3: Recent Listings & Approvals */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Pending Approvals */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Pending Approvals</h3>
              <p className="text-xs text-slate-500">Newly registered business accounts awaiting audit</p>
            </div>
            <button
              onClick={() => setCurrentTab('pending-approval')}
              className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer"
            >
              See All
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {businesses.filter(b => b.status === 'Pending').map(b => (
              <div key={b.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-3 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-3xl bg-slate-50 w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100">{b.logo}</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{b.name}</h4>
                    <p className="text-[10px] text-slate-500">{b.category} • {b.location.city}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateBusinessStatus(b.id, 'Verified')}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-xl border border-emerald-100/50 transition-all cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateBusinessStatus(b.id, 'Suspended')}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold rounded-xl border border-rose-100/50 transition-all cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {businesses.filter(b => b.status === 'Pending').length === 0 && (
              <div className="py-8 text-center text-xs text-slate-400">
                All business listing requests have been audited!
              </div>
            )}
          </div>
        </div>

        {/* Recent Registered Listings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Recent Listings</h3>
              <p className="text-xs text-slate-500">Latest active local business pages on the directory</p>
            </div>
            <button
              onClick={() => setCurrentTab('all-businesses')}
              className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer"
            >
              Manage Listings
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {businesses.slice(0, 4).map(b => (
              <div
                key={b.id}
                onClick={() => handleRecentListingClick(b.id)}
                className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-3 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl bg-slate-50 w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100">{b.logo}</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{b.name}</h4>
                    <p className="text-[10px] text-slate-500">{b.category} • {b.location.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === 'Premium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    b.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {b.status}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
