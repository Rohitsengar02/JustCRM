'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Send, MessageSquare, CheckSquare, Calendar, ChevronRight, Inbox } from 'lucide-react';

export default function RightSidebar() {
  const { activities, leads, setCurrentTab, setSelectedLeadId } = useApp();
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

  return (
    <aside className="w-80 bg-white border-l border-slate-200 h-[calc(100vh-64px)] fixed right-0 top-16 z-30 overflow-y-auto hidden xl:block p-4 space-y-6">
      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCurrentTab('add-business')}
            className="flex flex-col items-center justify-center p-3 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-xl transition-all group"
          >
            <PlusCircle className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-700">Add Business</span>
          </button>
          <button
            onClick={() => setCurrentTab('push-notifications')}
            className="flex flex-col items-center justify-center p-3 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-xl transition-all group"
          >
            <Send className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-700">Notify Users</span>
          </button>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800">Review Calendar</span>
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <p className="text-[10px] text-slate-500">Next Scheduled Call Audit:</p>
        <p className="text-xs font-semibold text-slate-700 mt-0.5">Today at 04:30 PM (IST)</p>
      </div>

      {/* Pending Tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Tasks</h3>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
            {tasks.filter(t => !t.completed).length} Left
          </span>
        </div>
        <div className="space-y-2">
          {tasks.map(t => (
            <label
              key={t.id}
              className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all border ${
                t.completed 
                  ? 'border-transparent bg-slate-50/40 text-slate-400 line-through' 
                  : 'border-slate-100 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-0"
              />
              <span className="text-xs font-medium leading-normal">{t.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Recent Leads Widget */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Leads</h3>
          <button
            onClick={() => setCurrentTab('all-leads')}
            className="text-[10px] text-blue-600 hover:underline flex items-center font-bold"
          >
            <span>All Leads</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2.5">
          {leads.slice(0, 3).map(l => (
            <div
              key={l.id}
              onClick={() => handleLeadClick(l.id)}
              className="p-3 border border-slate-100 bg-white hover:border-blue-100 hover:shadow-sm rounded-xl cursor-pointer transition-all flex gap-3 items-center"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{l.userName}</p>
                <p className="text-[10px] text-slate-500 truncate">{l.businessName}</p>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                l.status === 'New' ? 'bg-blue-100 text-blue-700' :
                l.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activities Feed */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Activity</h3>
        <div className="space-y-3.5 relative pl-4 border-l border-slate-100 ml-2">
          {activities.slice(0, 4).map(act => (
            <div key={act.id} className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white ring-2 ring-slate-100" />
              <p className="text-xs text-slate-700 font-medium">{act.message}</p>
              <span className="text-[9px] text-slate-400">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
