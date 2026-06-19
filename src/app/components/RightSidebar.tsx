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
  CheckSquare
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
      
      {/* 1. Advanced Quick Actions Console */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Operations Console</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setCurrentTab('add-business')}
            className="flex flex-col items-center justify-center p-3.5 bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-150/40 rounded-2xl transition-all group cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold text-slate-700">Add Listing</span>
          </button>
          
          <button
            onClick={() => setCurrentTab('push-notifications')}
            className="flex flex-col items-center justify-center p-3.5 bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-150/40 rounded-2xl transition-all group cursor-pointer"
          >
            <Send className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold text-slate-700">Send Alert</span>
          </button>

          <button
            onClick={triggerExport}
            className="flex flex-col items-center justify-center p-3.5 bg-blue-50/40 hover:bg-blue-50 border border-blue-150/40 rounded-2xl transition-all group cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold text-slate-700">Export Leads</span>
          </button>

          <button
            onClick={triggerSitemap}
            className="flex flex-col items-center justify-center p-3.5 bg-amber-50/40 hover:bg-amber-50 border border-amber-150/40 rounded-2xl transition-all group cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold text-slate-700">SEO rebuild</span>
          </button>
        </div>

        <button
          onClick={triggerPayout}
          className="w-full py-2.5 bg-slate-55/10 hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <CreditCard className="w-3.5 h-3.5 text-slate-500" />
          <span>Reconcile Gateway Payments</span>
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* 2. Interactive Calendar Timeline */}
      <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-3xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Operational Audits</span>
          <Calendar className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400">Next Scheduled Category Audit:</p>
          <p className="text-xs font-black text-slate-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            Today at 04:30 PM (IST)
          </p>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* 3. Task Checklist with Completion Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pending Tasks</h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
            {completionPercentage}% Done
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
        </div>

        <div className="space-y-2">
          {tasks.map(t => (
            <label
              key={t.id}
              className={`flex items-start gap-2.5 p-3 rounded-2xl cursor-pointer transition-all border ${
                t.completed 
                  ? 'border-transparent bg-slate-50/40 text-slate-400 line-through' 
                  : 'border-slate-150/70 bg-white text-slate-700 hover:bg-slate-50/60'
              }`}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-semibold leading-normal">{t.text}</span>
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
            className="text-[10px] text-indigo-600 hover:underline flex items-center font-bold cursor-pointer"
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
              className="p-3 border border-slate-150/70 bg-white hover:border-indigo-100 hover:shadow-sm rounded-2xl cursor-pointer transition-all flex gap-3 items-center"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Inbox className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{l.userName}</p>
                <p className="text-[10px] text-slate-550 truncate">{l.businessName}</p>
              </div>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                l.status === 'New' ? 'bg-blue-50 text-blue-700' :
                l.status === 'Converted' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-650'
              }`}>
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* 5. Activities Feed */}
      <div className="space-y-3.5">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Recent Activity Log</h3>
        <div className="space-y-4 relative pl-4 border-l border-slate-100/90 ml-2">
          {activities.slice(0, 4).map(act => (
            <div key={act.id} className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white ring-2 ring-slate-100/30" />
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">{act.message}</p>
              <span className="text-[9px] text-slate-400">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
