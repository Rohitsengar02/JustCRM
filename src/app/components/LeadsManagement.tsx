'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lead } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  User,
  Phone,
  Mail,
  FileText,
  Calendar,
  Plus,
  X,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckSquare,
  Search,
  Filter,
  Kanban,
  List,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const pipelineStages: Lead['status'][] = [
  'New',
  'Contacted',
  'Interested',
  'Quotation Sent',
  'Converted',
  'Lost'
];

const sourceConfig: Record<Lead['source'], { bg: string; text: string; icon: any }> = {
  'Web Search': { bg: 'bg-blue-50 text-blue-700 border-blue-100', text: 'text-blue-700', icon: Search },
  'Mobile App': { bg: 'bg-purple-50 text-purple-700 border-purple-100', text: 'text-purple-700', icon: Sparkles },
  'Direct Call': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', text: 'text-emerald-700', icon: Phone },
  'WhatsApp': { bg: 'bg-green-50 text-green-700 border-green-100', text: 'text-green-700', icon: MessageSquare },
  'Social Media': { bg: 'bg-pink-50 text-pink-700 border-pink-100', text: 'text-pink-700', icon: TrendingUp }
};

const stageColors: Record<Lead['status'], { border: string; dot: string; bg: string }> = {
  'New': { border: 'border-blue-200', dot: 'bg-blue-500', bg: 'bg-blue-50/40' },
  'Contacted': { border: 'border-amber-200', dot: 'bg-amber-500', bg: 'bg-amber-50/40' },
  'Interested': { border: 'border-indigo-200', dot: 'bg-indigo-500', bg: 'bg-indigo-50/40' },
  'Quotation Sent': { border: 'border-purple-200', dot: 'bg-purple-500', bg: 'bg-purple-50/40' },
  'Converted': { border: 'border-emerald-200', dot: 'bg-emerald-500', bg: 'bg-emerald-50/40' },
  'Lost': { border: 'border-rose-200', dot: 'bg-rose-500', bg: 'bg-rose-50/40' }
};

export default function LeadsManagement() {
  const {
    leads,
    updateLeadStatus,
    addLeadNote,
    addLeadFollowUp,
    toggleFollowUpDone,
    selectedLeadId,
    setSelectedLeadId,
    currentTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [drawerTab, setDrawerTab] = useState<'overview' | 'notes' | 'tasks'>('overview');

  // Form states inside drawer
  const [noteInput, setNoteInput] = useState('');
  const [followUpTask, setFollowUpTask] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = sourceFilter === 'All' || l.source === sourceFilter;

    let matchesTab = true;
    if (currentTab === 'new-leads') {
      matchesTab = l.status === 'New';
    } else if (currentTab === 'assigned-leads') {
      matchesTab = ['Contacted', 'Interested', 'Quotation Sent'].includes(l.status);
    } else if (currentTab === 'converted-leads') {
      matchesTab = l.status === 'Converted';
    } else if (currentTab === 'lost-leads') {
      matchesTab = l.status === 'Lost';
    }
    
    return matchesSearch && matchesSource && matchesTab;
  });

  // Dynamically determine pipeline stages to display based on the active tab
  let activeStages = pipelineStages;
  if (currentTab === 'new-leads') {
    activeStages = ['New'];
  } else if (currentTab === 'assigned-leads') {
    activeStages = ['Contacted', 'Interested', 'Quotation Sent'];
  } else if (currentTab === 'converted-leads') {
    activeStages = ['Converted'];
  } else if (currentTab === 'lost-leads') {
    activeStages = ['Lost'];
  }

  // Calculate statistics
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;
  const activeFollowups = leads.reduce((acc, l) => acc + l.followUps.filter(f => !f.done).length, 0);
  const conversionRate = totalLeads ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Source counter
  const sourceStats = leads.reduce((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSource = Object.entries(sourceStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Web Search';

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedLeadId) return;
    addLeadNote(selectedLeadId, noteInput);
    setNoteInput('');
  };

  const handleAddFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpTask.trim() || !followUpDate || !selectedLeadId) return;
    addLeadFollowUp(selectedLeadId, followUpTask, followUpDate);
    setFollowUpTask('');
    setFollowUpDate('');
  };

  // Header Title computed based on active tab
  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'new-leads': return 'New Leads Pipeline';
      case 'assigned-leads': return 'Assigned CRM Pipeline';
      case 'converted-leads': return 'Converted Leads Hub';
      case 'lost-leads': return 'Lost / Archived Leads';
      default: return 'Leads & CRM Console';
    }
  };

  const getHeaderDesc = () => {
    switch (currentTab) {
      case 'new-leads': return 'Review and contact incoming directory customer inquiries';
      case 'assigned-leads': return 'Manage follow-ups, quotes, and progress logs for active leads';
      case 'converted-leads': return 'View and analyze successful conversions and customer bookings';
      case 'lost-leads': return 'Re-engage or review details of lost leads and inquiries';
      default: return 'Track, nurture, and convert high-intent incoming customer requests';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-black text-slate-800 text-xl tracking-tight">{getHeaderTitle()}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{getHeaderDesc()}</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/50">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'kanban' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Directory</span>
          </button>
        </div>
      </div>

      {/* Dynamic KPI Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Inquiries</span>
            <span className="text-xl font-black text-slate-800 mt-0.5 block">{totalLeads} Leads</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Conversion Rate</span>
            <span className="text-xl font-black text-slate-800 mt-0.5 block">{conversionRate}% Efficiency</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Top Channel</span>
            <span className="text-xl font-black text-slate-800 mt-0.5 block">{topSource}</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Tasks</span>
            <span className="text-xl font-black text-slate-800 mt-0.5 block">{activeFollowups} Actions</span>
          </div>
        </motion.div>
      </div>

      {/* Advanced Filtering Control */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-450">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search leads by customer, listing name, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black focus:bg-white transition-all text-black"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter Channel:
          </span>
          {['All', ...Object.keys(sourceConfig)].map((src) => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                sourceFilter === src
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-55'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* CRM Main Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'kanban' ? (
          <motion.div
            key="kanban-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory pr-2"
          >
            {activeStages.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.status === stage);
              const config = stageColors[stage];

              return (
                <div
                  key={stage}
                  className={`${config.bg} p-4 rounded-3xl border border-slate-200/85 w-[290px] min-w-[290px] md:w-[325px] md:min-w-[325px] shrink-0 flex flex-col h-[70vh] snap-start shadow-xs`}
                >
                  {/* Stage Header */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                      <span className="text-xs font-extrabold text-slate-800">{stage}</span>
                    </div>
                    <span className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-full font-bold border border-slate-200">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {stageLeads.map((lead) => {
                      const sourceItem = sourceConfig[lead.source];
                      const SourceIcon = sourceItem.icon;
                      return (
                        <motion.div
                          key={lead.id}
                          layoutId={`lead-card-${lead.id}`}
                          onClick={() => setSelectedLeadId(lead.id)}
                          whileHover={{ y: -3, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}
                          className="p-4 bg-white border border-slate-200/70 hover:border-black rounded-2xl cursor-pointer transition-all space-y-3 shadow-xs group"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-bold text-slate-850 truncate group-hover:text-black transition-colors">
                              {lead.userName}
                            </h4>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold border shrink-0 flex items-center gap-1 ${sourceItem.bg}`}>
                              <SourceIcon className="w-2.5 h-2.5" />
                              <span>{lead.source}</span>
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-500 font-semibold truncate bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            {lead.businessName}
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                            <span>{lead.category}</span>
                            <span>{lead.createdDate}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                    {stageLeads.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-250 rounded-2xl bg-white/40">
                        <Inbox className="w-6 h-6 text-slate-300" />
                        <p className="text-[10px] text-slate-400 mt-1">Empty Stage</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Target Business</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Channel Source</th>
                    <th className="p-4">Created Date</th>
                    <th className="p-4">Status Pipeline</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => {
                    const sourceItem = sourceConfig[lead.source];
                    const SourceIcon = sourceItem.icon;
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedLeadId(lead.id)}
                      >
                        <td className="p-4 font-bold text-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                              {lead.userName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{lead.userName}</p>
                              <p className="text-[10px] text-slate-400">{lead.userPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-650">{lead.businessName}</td>
                        <td className="p-4 text-slate-500 font-medium">{lead.category}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-[9px] px-2 py-1 rounded-md font-bold border ${sourceItem.bg}`}>
                            <SourceIcon className="w-2.5 h-2.5" />
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-4 text-slate-450 font-medium">{lead.createdDate}</td>
                        <td className="p-4">
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border ${stageColors[lead.status].border} text-slate-800`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-black transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id); }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-450">
                        <Inbox className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-xs">No matching leads found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRM Drawer Detail Popup */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 backdrop-blur-xs z-40"
              onClick={() => setSelectedLeadId(null)}
            />

            {/* Side Drawer details */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl border-l border-slate-200 z-50 overflow-y-auto flex flex-col p-6 space-y-6"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] bg-slate-100 text-black border border-slate-200 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Interactive Lead Profile
                  </span>
                  <h3 className="font-black text-slate-800 text-lg mt-1.5">{selectedLead.userName}</h3>
                </div>
                <button
                  onClick={() => setSelectedLeadId(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Manager */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                <label className="block text-xs font-black text-slate-700 mb-2">CRM Status Stage</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as any)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-black text-black"
                  >
                    {pipelineStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-450 flex items-center justify-center italic font-medium">
                    Changes updated globally
                  </span>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex border-b border-slate-100">
                {[
                  { id: 'overview', name: 'Overview & Logs', icon: FileText },
                  { id: 'notes', name: `Internal Notes (${selectedLead.notes.length})`, icon: MessageSquare },
                  { id: 'tasks', name: `Tasks (${selectedLead.followUps.filter(f => !f.done).length})`, icon: CheckSquare }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setDrawerTab(t.id as any)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 text-xs font-bold transition-all cursor-pointer ${
                        drawerTab === t.id
                          ? 'border-black text-black'
                          : 'border-transparent text-slate-400 hover:text-slate-750'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                {drawerTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Lead Metadata */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Phone</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.userPhone}
                        </span>
                      </div>
                      <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Email</span>
                        <span className="font-bold text-slate-700 truncate flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.userEmail}
                        </span>
                      </div>
                      <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Listing</span>
                        <span className="font-bold text-slate-700 truncate flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.businessName}
                        </span>
                      </div>
                      <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Source Channel</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.source}
                        </span>
                      </div>
                    </div>

                    {/* Call Logs */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Communication Logs</h4>
                        <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-bold">
                          {selectedLead.callLogs.length} Logged
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {selectedLead.callLogs.map((log, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                              <span className="flex items-center gap-1 text-slate-500">
                                <PhoneCall className="w-3 h-3" /> {log.date}
                              </span>
                              <span>Duration: {log.duration}</span>
                            </div>
                            <p className="text-slate-700 font-medium">{log.summary}</p>
                          </div>
                        ))}
                        {selectedLead.callLogs.length === 0 && (
                          <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                            <Phone className="w-6 h-6 mx-auto text-slate-350" />
                            <p className="text-xs text-slate-400 mt-1 font-semibold">No call records logged yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {drawerTab === 'notes' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Internal Notes Feed</h4>
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {selectedLead.notes.map((note, idx) => (
                        <div key={idx} className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl leading-relaxed font-semibold">
                          {note}
                        </div>
                      ))}
                      {selectedLead.notes.length === 0 && (
                        <p className="text-xs text-slate-400 italic text-center py-8">No notes written for this listing yet.</p>
                      )}
                    </div>

                    <form onSubmit={handleAddNoteSubmit} className="flex gap-2 pt-2 border-t border-slate-100">
                      <input
                        type="text"
                        placeholder="Type internal notes..."
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-black text-black"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                )}

                {drawerTab === 'tasks' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Follow Ups Tasklist</h4>
                    <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                      {selectedLead.followUps.map((f, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border ${
                            f.done 
                              ? 'border-transparent bg-slate-50/50 text-slate-400 line-through' 
                              : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={f.done}
                              onChange={() => toggleFollowUpDone(selectedLead.id, idx)}
                              className="rounded border-slate-300 text-black focus:ring-0 cursor-pointer w-4 h-4"
                            />
                            <span className="text-xs font-semibold">{f.task}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{f.date}</span>
                        </label>
                      ))}
                      {selectedLead.followUps.length === 0 && (
                        <p className="text-xs text-slate-400 italic text-center py-6">No pending follow-ups registered.</p>
                      )}
                    </div>

                    <form onSubmit={handleAddFollowUpSubmit} className="space-y-3 pt-3.5 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Task details..."
                          value={followUpTask}
                          onChange={(e) => setFollowUpTask(e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-black text-black"
                          required
                        />
                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-black text-black"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> <span>Add Follow Up Task</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
