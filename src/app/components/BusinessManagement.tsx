'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Business } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Eye,
  Settings,
  ArrowLeft,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  Inbox,
  User,
  Plus,
  LayoutGrid,
  List,
  Sparkles,
  DollarSign,
  Award,
  Globe,
  Grid,
  FileText
} from 'lucide-react';

export default function BusinessManagement() {
  const {
    businesses,
    leads,
    reviews,
    currentTab,
    setCurrentTab,
    selectedBusinessId,
    setSelectedBusinessId,
    updateBusinessStatus,
    deleteBusiness,
    addBusiness
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Tabs for the detail screen
  const [detailTab, setDetailTab] = useState<'overview' | 'leads' | 'reviews'>('overview');

  // Form states for new business
  const [newBizName, setNewBizName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Packers & Movers');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newArea, setNewArea] = useState('Andheri East');
  const [newLocality, setNewLocality] = useState('Marol Naka');
  const [newAddress, setNewAddress] = useState('');
  const [newAbout, setNewAbout] = useState('');
  const [newHours, setNewHours] = useState('09:00 AM - 08:00 PM');
  const [newSubscription, setNewSubscription] = useState<'Free' | 'Silver' | 'Gold' | 'Platinum'>('Free');

  // Cover image generator/fallback using index to vary unsplash images nicely
  const getCoverImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60', // packers & movers / industrial
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=60', // medical / dental
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60', // hotels
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60', // restaurants
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60'  // electronics
    ];
    return images[index % images.length];
  };

  // Filter based on active tab
  const getFilteredBusinesses = () => {
    let list = [...businesses];
    
    // Status filters based on sidebar tab click
    if (currentTab === 'pending-approval') {
      list = list.filter(b => b.status === 'Pending');
    } else if (currentTab === 'verified-businesses') {
      list = list.filter(b => b.status === 'Verified');
    } else if (currentTab === 'featured-businesses') {
      list = list.filter(b => b.status === 'Featured');
    } else if (currentTab === 'premium-businesses') {
      list = list.filter(b => b.status === 'Premium');
    } else if (currentTab === 'suspended-listings') {
      list = list.filter(b => b.status === 'Suspended');
    }

    // Keyword Search
    if (searchQuery.trim()) {
      list = list.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Selector
    if (categoryFilter !== 'All') {
      list = list.filter(b => b.category === categoryFilter);
    }

    // City Selector
    if (cityFilter !== 'All') {
      list = list.filter(b => b.location.city === cityFilter);
    }

    return list;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBusiness({
      name: newBizName,
      owner: newOwner,
      email: newEmail,
      phone: newPhone,
      category: newCategory,
      location: {
        city: newCity,
        area: newArea,
        locality: newLocality,
        address: newAddress
      },
      status: 'Pending',
      subscription: newSubscription,
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60'
      ],
      logo: '🏢',
      about: newAbout,
      services: ['General Services', 'Customer Care Support'],
      products: ['Standard Package Accessories'],
      businessHours: newHours
    });

    // Reset Form & switch tab
    setIsAdding(false);
    setNewBizName('');
    setNewOwner('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
    setNewAbout('');
    setCurrentTab('all-businesses');
  };

  const activeList = getFilteredBusinesses();
  const selectedBiz = businesses.find(b => b.id === selectedBusinessId);

  // Framer Motion configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  // If a business detail page is requested
  if (selectedBiz) {
    const bizLeads = leads.filter(l => l.businessId === selectedBiz.id);
    const bizReviews = reviews.filter(r => r.businessId === selectedBiz.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Detail Header Back bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5">
          <button
            onClick={() => setSelectedBusinessId(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </button>
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-3.5 py-1 rounded-full border ${
              selectedBiz.status === 'Premium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
              selectedBiz.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
              selectedBiz.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {selectedBiz.status} Status
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-3.5 py-1 rounded-full border border-blue-100">
              {selectedBiz.subscription} Tier
            </span>
          </div>
        </div>

        {/* Business Detailed Profile Console */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT SIDEBAR: Info, Contacts, Location */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 self-start">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl p-5 bg-slate-50 border border-slate-100 rounded-3xl mb-4 shadow-sm">
                {selectedBiz.logo}
              </span>
              <h2 className="font-black text-slate-800 text-lg leading-snug">{selectedBiz.name}</h2>
              <p className="text-xs text-indigo-600 font-bold mt-1 bg-indigo-50 px-3 py-1 rounded-lg">
                {selectedBiz.category}
              </p>
              
              <div className="flex items-center gap-1.5 mt-4 text-xs font-black text-slate-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{selectedBiz.rating} / 5.0 Rating</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Contact Profile</h3>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{selectedBiz.owner}</p>
                    <p className="text-[10px] text-slate-400">Business Owner</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-700">{selectedBiz.phone}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate font-semibold text-slate-700">{selectedBiz.email}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location Address</h3>
              <div className="flex gap-3 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{selectedBiz.location.address}</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Business Timing</h3>
              <div className="flex gap-3 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-semibold">{selectedBiz.businessHours}</span>
              </div>
            </div>
          </div>

          {/* MAIN COLUMN: Animated Tabbed Content Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Cover Hero Banner */}
            <div className="relative h-44 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={getCoverImage(businesses.indexOf(selectedBiz))}
                alt="business banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">Listing Dashboard</p>
                <h3 className="text-lg font-black mt-0.5">{selectedBiz.name}</h3>
              </div>
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex border-b border-slate-200 bg-white p-1 rounded-2xl shadow-sm">
              {[
                { id: 'overview', name: 'Overview & Services', icon: FileText },
                { id: 'leads', name: `Inbound Leads (${bizLeads.length})`, icon: Inbox },
                { id: 'reviews', name: `User Reviews (${bizReviews.length})`, icon: Star }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const active = detailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id as any)}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS WITH ANIMATIONS */}
            <AnimatePresence mode="wait">
              {detailTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* About Description */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">About / Description</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{selectedBiz.about}</p>
                    
                    {/* Additional Photo Gallery */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <img
                        src={getCoverImage(businesses.indexOf(selectedBiz) + 1)}
                        alt="Interior"
                        className="w-full h-36 object-cover rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform"
                      />
                      <img
                        src={getCoverImage(businesses.indexOf(selectedBiz) + 2)}
                        alt="Workplace"
                        className="w-full h-36 object-cover rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform"
                      />
                    </div>
                  </div>

                  {/* Services & Catalog */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Services Offerings</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBiz.services.map((ser, i) => (
                        <span key={i} className="text-xs bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-xl font-bold text-slate-600 shadow-sm">
                          {ser}
                        </span>
                      ))}
                    </div>

                    {selectedBiz.products && selectedBiz.products.length > 0 && (
                      <>
                        <h4 className="text-xs font-black text-slate-700 pt-3">Product Catalog</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedBiz.products.map((pro, i) => (
                            <span key={i} className="text-xs bg-indigo-50/50 border border-indigo-100/50 px-3.5 py-1.5 rounded-xl font-bold text-indigo-700 shadow-sm">
                              {pro}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {detailTab === 'leads' && (
                <motion.div
                  key="leads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
                >
                  <h3 className="font-bold text-slate-800 text-sm">Lead Conversion Log</h3>
                  <p className="text-xs text-slate-400">Leads generated via JustDial dashboard matching algorithms</p>
                  
                  <div className="divide-y divide-slate-100">
                    {bizLeads.map((l) => (
                      <div key={l.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50/30 px-2 rounded-xl transition-all">
                        <div>
                          <p className="font-bold text-xs text-slate-800">{l.userName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{l.userPhone} • {l.userEmail}</p>
                          <p className="text-[9px] text-slate-400 mt-1">Source: <strong className="text-slate-600">{l.source}</strong></p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border ${
                            l.status === 'Converted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            l.status === 'Lost' ? 'bg-slate-50 text-slate-500 border-slate-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                          }`}>
                            {l.status}
                          </span>
                          <span className="text-[9px] text-slate-400">{l.createdDate}</span>
                        </div>
                      </div>
                    ))}
                    {bizLeads.length === 0 && (
                      <p className="text-xs text-slate-400 py-6 text-center">No matching leads recorded for this listing.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {detailTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
                >
                  <h3 className="font-bold text-slate-800 text-sm">Customer Feedback</h3>
                  <div className="divide-y divide-slate-100">
                    {bizReviews.map((rev) => (
                      <div key={rev.id} className="py-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800">{rev.userName}</span>
                          <div className="flex gap-0.5 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                            {Array.from({ length: Math.round(rev.rating) }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.content}"</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[9px] text-slate-400">{rev.createdDate}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                            rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>{rev.status}</span>
                        </div>
                      </div>
                    ))}
                    {bizReviews.length === 0 && (
                      <p className="text-xs text-slate-400 py-6 text-center">No reviews submitted yet for this listing.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR: Controls, Analytics, Progress Bars */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 self-start">
            {/* Moderator Action Controls */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Moderation Controls</h3>
              <div className="space-y-2">
                <button
                  onClick={() => updateBusinessStatus(selectedBiz.id, 'Verified')}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Verify Listing
                </button>
                <button
                  onClick={() => updateBusinessStatus(selectedBiz.id, 'Premium')}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Promote to Premium
                </button>
                <button
                  onClick={() => updateBusinessStatus(selectedBiz.id, 'Suspended')}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Suspend Account
                </button>
                <button
                  onClick={() => {
                    deleteBusiness(selectedBiz.id);
                    setSelectedBusinessId(null);
                  }}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Delete Listing
                </button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Performance metrics */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Dashboard Analytics</h3>
              <div className="space-y-3.5">
                <div className="p-3.5 bg-slate-50/50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Est. Revenue</span>
                    <span className="text-sm font-black text-slate-800 mt-1 block">₹{(selectedBiz.revenue * 10).toLocaleString()}</span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="p-3.5 bg-slate-50/50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Inbound Leads</span>
                    <span className="text-sm font-black text-slate-800 mt-1 block">{selectedBiz.leadsCount}</span>
                  </div>
                  <Inbox className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Rating breakdown details */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">Reviews Matrix</h3>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const key = `stars${stars}` as keyof typeof selectedBiz.ratingAnalytics;
                  const count = selectedBiz.ratingAnalytics[key] || 0;
                  const total = Object.values(selectedBiz.ratingAnalytics).reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? (count / total) * 100 : 0;

                  return (
                    <div key={stars} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <span className="w-7 text-right text-slate-500 font-bold">{stars} ★</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="w-6 text-right text-slate-400 font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    );
  }

  // If creating new business form is toggled
  if (isAdding || currentTab === 'add-business') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-black text-slate-800 text-lg">Add New Business Listing</h2>
            <p className="text-xs text-slate-400 mt-1">Register a new local business owner into the directory</p>
          </div>
          <button
            onClick={() => {
              setIsAdding(false);
              setCurrentTab('all-businesses');
            }}
            className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
              <input
                type="text"
                value={newBizName}
                onChange={(e) => setNewBizName(e.target.value)}
                placeholder="e.g. Apollo Pharmacy Store"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Owner Full Name</label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="owner@domain.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+91 99887 76655"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="Packers & Movers">Packers & Movers</option>
                <option value="Dentists">Dentists</option>
                <option value="Hotels">Hotels</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Electronic Goods Dealers">Electronic Goods Dealers</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Subscription Package</label>
              <select
                value={newSubscription}
                onChange={(e) => setNewSubscription(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="Free">Free Listing</option>
                <option value="Silver">Silver Plan</option>
                <option value="Gold">Gold Plan</option>
                <option value="Platinum">Platinum Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Business Hours</label>
              <input
                type="text"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                placeholder="09:00 AM - 08:00 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Postal Address</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Shop No, Building, Area Road, Pincode"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">About Company / Description</label>
            <textarea
              rows={3}
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
              placeholder="Write a brief overview..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
          >
            Create Verification Listing
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Workspace Header actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-black text-slate-800 text-lg">Business Listings Console</h2>
          <p className="text-xs text-slate-400 mt-1">Manage details, verify, and moderate local discovery accounts</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Business</span>
        </button>
      </div>

      {/* Table Filters Panel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search business name or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Category selector */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Packers & Movers">Packers & Movers</option>
            <option value="Dentists">Dentists</option>
            <option value="Hotels">Hotels</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Electronic Goods Dealers">Electronic Goods Dealers</option>
          </select>
        </div>

        {/* City selector */}
        <div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 focus:outline-none"
          >
            <option value="All">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>

        {/* Toggle List / Grid Layout View */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RENDER GRID / CARD VIEW */}
      {viewMode === 'grid' ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeList.map((b, idx) => (
            <motion.div
              key={b.id}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.08)' }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Cover Image banner */}
                <div className="h-32 bg-slate-100 relative">
                  <img
                    src={getCoverImage(idx)}
                    alt={b.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${
                      b.status === 'Premium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      b.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                      b.status === 'Pending' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
                      {b.logo}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-tight line-clamp-1">{b.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold mt-0.5">{b.category}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {b.about || 'No details provided.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {b.location.city}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {b.rating}
                    </span>
                    <span className="font-bold bg-slate-50 px-2 py-0.5 border border-slate-100 rounded-md text-slate-700">
                      Leads: {b.leadsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-50/60 bg-slate-50/30 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Created: {b.createdDate}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedBusinessId(b.id)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100/50 text-[10px] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Page</span>
                  </button>
                  <button
                    onClick={() => deleteBusiness(b.id)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-500 rounded-xl transition-all cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* RENDER COMPACT TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
                <tr>
                  <th className="p-4">Business Name</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Subscription</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Leads</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeList.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-xl">{b.logo}</span>
                      <span>{b.name}</span>
                    </td>
                    <td className="p-4 text-slate-600 font-semibold">{b.owner}</td>
                    <td className="p-4 text-slate-600">{b.category}</td>
                    <td className="p-4 text-slate-600">{b.location.city}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        b.status === 'Premium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        b.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        b.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        b.status === 'Suspended' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-600">{b.subscription}</td>
                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-1 font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{b.rating}</span>
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">{b.leadsCount}</td>
                    <td className="p-4 text-slate-500">{b.createdDate}</td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedBusinessId(b.id)}
                        title="View Details"
                        className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => updateBusinessStatus(b.id, 'Verified')}
                          title="Verify / Approve"
                          className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {b.status !== 'Suspended' && (
                        <button
                          onClick={() => updateBusinessStatus(b.id, 'Suspended')}
                          title="Suspend Listing"
                          className="p-1.5 hover:bg-amber-50 text-amber-500 rounded-lg transition-all cursor-pointer"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteBusiness(b.id)}
                        title="Delete Listing"
                        className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeList.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
          No business listings match the selected filters.
        </div>
      )}
    </div>
  );
}
