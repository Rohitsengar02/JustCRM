'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle,
  Send,
  Calendar,
  ChevronRight,
  Inbox,
  Sparkles,
  Download,
  RefreshCw,
  CreditCard,
  CheckCircle,
  Clock,
  CheckSquare,
  ShieldAlert,
  Smartphone
} from 'lucide-react';

export default function RightSidebar() {
  const { activities, leads, setCurrentTab, setSelectedLeadId, addActivity } = useApp();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Verify Rajputana listing doc', completed: false },
    { id: 2, text: 'Audit reported negative review', completed: true },
    { id: 3, text: 'Allocate campaign for dentists', completed: false },
    { id: 4, text: 'Check gateway payout reports', completed: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleLeadClick = (id: string) => {
    setSelectedLeadId(id);
    setCurrentTab('all-leads');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  const triggerExport = () => {
    alert("Leads directory exported successfully as CSV!");
    addActivity("Exported leads spreadsheet report", "support");
  };

  const triggerSitemap = () => {
    alert("Sitemap rebuild triggered! Google Search Console pinged.");
    addActivity("Rebuilt XML Sitemap structure", "business");
  };

  const triggerPayout = () => {
    alert("Subscription gateway payouts reconciled successfully.");
    addActivity("Reconciled ad banner invoice ledger", "subscription");
  };

  return (
    <aside className="w-80 bg-white/95 border-l border-slate-200/80 h-[calc(100vh-64px)] fixed right-0 top-16 z-30 overflow-y-auto hidden xl:block p-5 space-y-6 backdrop-blur-md shadow-sm">
      
      {/* 0. Premium System Status Banner Card with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-4.5 shadow-md shadow-indigo-950/10 border border-slate-800">
        <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3.5">
          <div className="flex justify-between items-center">
            <span className="text-[9px] bg-white/10 border border-white/10 backdrop-blur-md px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Meganods Admin</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-wider">ONLINE</span>
            </div>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-tight leading-tight">Welcome, Super Admin</h4>
            <p className="text-[10px] text-indigo-200/80 mt-0.5">Console Control Center</p>
          </div>
        </div>
      </div>

      {/* 1. Advanced Quick Actions Console */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Operations Console</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setCurrentTab('add-business')}
            className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-indigo-650 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-slate-750">Add Listing</span>
          </button>
          
          <button
            onClick={() => setCurrentTab('push-notifications')}
            className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group cursor-pointer"
          >
            <Send className="w-5 h-5 text-indigo-650 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-slate-750">Send Alert</span>
          </button>

          <button
            onClick={triggerExport}
            className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group cursor-pointer"
          >
            <Download className="w-4 h-4 text-indigo-650 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-slate-750">Export Leads</span>
          </button>

          <button
            onClick={triggerSitemap}
            className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-indigo-650 mb-1.5 group-hover:scale-110 transition-transform animate-spin-slow" />
            <span className="text-[10px] font-black text-slate-750">SEO rebuild</span>
          </button>
        </div>

        <button
          onClick={triggerPayout}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-black rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <CreditCard className="w-3.5 h-3.5 text-black" />
          <span>Reconcile Gateway Payments</span>
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* 2. Interactive Calendar Timeline */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800">Operational Audits</span>
          <Calendar className="w-4 h-4 text-black" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-bold">Next Scheduled Category Audit:</p>
          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-black rounded-full animate-ping shrink-0" />
            Today at 04:30 PM (IST)
          </p>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* 3. Task Checklist with Completion Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pending Tasks</h3>
          <span className="text-[10px] bg-slate-100 text-black border border-slate-200 px-2 py-0.5 rounded-full font-bold">
            {completionPercentage}% Done
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
        </div>

        <div className="space-y-2">
          {tasks.map(t => (
            <label
              key={t.id}
              className={`flex items-start gap-2.5 p-3 rounded-2xl cursor-pointer transition-all border ${
                t.completed 
                  ? 'border-transparent bg-slate-50 text-slate-400 line-through font-semibold' 
                  : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50 hover:border-slate-300 font-bold'
              }`}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
                className="mt-0.5 rounded border-slate-300 text-black focus:ring-0 cursor-pointer"
              />
              <span className="text-xs leading-normal">{t.text}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* 4. Recent Leads */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Recent Inbound Leads</h3>
          <button
            onClick={() => setCurrentTab('all-leads')}
            className="text-[10px] text-black hover:underline flex items-center font-black cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-2.5">
          {leads.slice(0, 3).map(l => (
            <div
              key={l.id}
              onClick={() => handleLeadClick(l.id)}
              className="p-3 border border-slate-200 bg-white hover:border-black rounded-2xl cursor-pointer transition-all flex gap-3 items-center"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-black flex items-center justify-center shrink-0 border border-slate-200">
                <Inbox className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 font-bold">
                <p className="text-xs text-slate-800 truncate">{l.userName}</p>
                <p className="text-[10px] text-slate-450 truncate mt-0.5">{l.businessName}</p>
              </div>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full border border-slate-250 bg-slate-50 text-slate-800 shrink-0">
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Activities Feed */}
      <hr className="border-slate-100" />
      <div className="space-y-3.5">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Recent Activity Log</h3>
        <div className="space-y-4 relative pl-4 border-l border-slate-200 ml-2">
          {activities.slice(0, 4).map(act => (
            <div key={act.id} className="relative">
              <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-black border-2 border-white ring-2 ring-slate-150" />
              <p className="text-xs text-slate-700 font-bold leading-relaxed">{act.message}</p>
              <span className="text-[9px] text-slate-400 font-semibold">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
