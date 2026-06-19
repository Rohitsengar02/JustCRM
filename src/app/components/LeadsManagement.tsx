'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lead } from '../mockDb';
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
  CheckSquare
} from 'lucide-react';

const pipelineStages: Lead['status'][] = [
  'New',
  'Contacted',
  'Interested',
  'Quotation Sent',
  'Converted',
  'Lost'
];

export default function LeadsManagement() {
  const {
    leads,
    businesses,
    updateLeadStatus,
    addLeadNote,
    addLeadFollowUp,
    toggleFollowUpDone,
    selectedLeadId,
    setSelectedLeadId
  } = useApp();

  const [noteInput, setNoteInput] = useState('');
  const [followUpTask, setFollowUpTask] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-bold text-slate-800 text-lg">CRM Leads Pipeline</h2>
        <p className="text-xs text-slate-400 mt-0.5">Track, assign, and convert customer inquiries into bookings</p>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage);
          return (
            <div
              key={stage}
              className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60 min-w-[200px] flex flex-col h-[60vh]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3.5 pb-1.5 border-b border-slate-200/40">
                <span className="text-xs font-bold text-slate-700">{stage}</span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
                {stageLeads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => setSelectedLeadId(l.id)}
                    className="p-3 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm rounded-xl cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {l.userName}
                      </h4>
                      <span className="text-[8px] bg-blue-50 text-blue-600 font-semibold px-1 rounded-sm uppercase tracking-wide">
                        {l.source}
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 font-medium truncate">
                      {l.businessName}
                    </p>

                    <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>{l.category}</span>
                      <span>{l.createdDate}</span>
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <p className="text-[10px] text-slate-400 text-center py-8">No leads here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CRM Drawer Detail Popup */}
      {selectedLead && (
        <>
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm z-40 transition-all"
            onClick={() => setSelectedLeadId(null)}
          />

          {/* Side Drawer details */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 z-50 overflow-y-auto flex flex-col p-6 space-y-6">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Lead Details
                </span>
                <h3 className="font-bold text-slate-800 text-base mt-1">{selectedLead.userName}</h3>
              </div>
              <button
                onClick={() => setSelectedLeadId(null)}
                className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Mover */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <label className="block text-xs font-bold text-slate-700 mb-2">Advance Pipeline Stage</label>
              <div className="flex gap-2">
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as any)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                >
                  {pipelineStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 flex items-center justify-center italic">
                  Changes live instantly
                </span>
              </div>
            </div>

            {/* Lead Metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Phone</span>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.userPhone}
                </span>
              </div>
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Email</span>
                <span className="font-semibold text-slate-700 truncate flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.userEmail}
                </span>
              </div>
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Listing</span>
                <span className="font-semibold text-slate-700 truncate flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.businessName}
                </span>
              </div>
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Acquisition Source</span>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.source}
                </span>
              </div>
            </div>

            {/* Call Logs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Communication Logs</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedLead.callLogs.map((log, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-semibold">{log.date}</span>
                      <span>Duration: {log.duration}</span>
                    </div>
                    <p className="text-slate-600 font-medium">{log.summary}</p>
                  </div>
                ))}
                {selectedLead.callLogs.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No phone calls logged for this customer yet.</p>
                )}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Internal Notes</h4>
              <div className="space-y-2">
                {selectedLead.notes.map((note, idx) => (
                  <p key={idx} className="text-xs text-slate-600 bg-blue-50/30 border border-blue-50 p-2.5 rounded-lg leading-relaxed">
                    {note}
                  </p>
                ))}
                <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type internal note..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>

            {/* Follow Ups */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Follow Ups Tasklist</h4>
              <div className="space-y-2">
                {selectedLead.followUps.map((f, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border ${
                      f.done 
                        ? 'border-transparent bg-slate-50/50 text-slate-400 line-through' 
                        : 'border-slate-100 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={f.done}
                        onChange={() => toggleFollowUpDone(selectedLead.id, idx)}
                        className="rounded border-slate-350 text-blue-600 focus:ring-0"
                      />
                      <span className="text-xs font-medium">{f.task}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{f.date}</span>
                  </label>
                ))}

                <form onSubmit={handleAddFollowUpSubmit} className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Next task description..."
                      value={followUpTask}
                      onChange={(e) => setFollowUpTask(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white"
                      required
                    />
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Add Follow Up Task</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
