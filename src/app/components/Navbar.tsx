'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, ShieldCheck, Mail, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Navbar() {
  const { activities, setCurrentTab, businesses, setSelectedBusinessId } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState<typeof businesses>([]);

  // Filter businesses as user types
  const handleSearch = (val: string) => {
    setSearchVal(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = businesses.filter(b => 
      b.name.toLowerCase().includes(val.toLowerCase()) || 
      b.category.toLowerCase().includes(val.toLowerCase()) ||
      b.location.city.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5));
  };

  const handleResultClick = (bizId: string) => {
    setSelectedBusinessId(bizId);
    setCurrentTab('all-businesses');
    setSearchVal('');
    setSearchResults([]);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">Justdial</span>
          <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full ml-2">Console</span>
        </div>
      </div>

      {/* Global Listing Search */}
      <div className="relative w-full max-w-md hidden md:block">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search listing name, category, or city..."
          value={searchVal}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
        />

        {/* Dropdown Results */}
        {searchResults.length > 0 && (
          <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-4 py-1.5 tracking-wider">Quick Match Listings</p>
            {searchResults.map(b => (
              <button
                key={b.id}
                onClick={() => handleResultClick(b.id)}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-all"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">{b.name}</p>
                  <p className="text-[10px] text-slate-500">{b.category} • {b.location.city}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  b.status === 'Premium' ? 'bg-amber-100 text-amber-700' :
                  b.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                  b.status === 'Pending' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {b.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon & Panel */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-50 text-slate-500 hover:text-blue-600 rounded-xl transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Notifications Feed</span>
                  <button 
                    onClick={() => { setCurrentTab('tickets'); setShowNotifications(false); }} 
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    View Tickets
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {activities.slice(0, 5).map((act) => {
                    return (
                      <div key={act.id} className="px-4 py-2.5 hover:bg-slate-50 border-b border-slate-50 flex gap-3 items-start transition-all">
                        <div className="mt-0.5">
                          {act.type === 'business' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> :
                           act.type === 'lead' ? <Mail className="w-3.5 h-3.5 text-blue-500" /> :
                           act.type === 'review' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> :
                           <Clock className="w-3.5 h-3.5 text-indigo-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-700 leading-normal">{act.message}</p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{act.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-1.5 text-center border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">Updates live dynamically</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Date Display */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>June 19, 2026</span>
        </div>
      </div>
    </header>
  );
}
