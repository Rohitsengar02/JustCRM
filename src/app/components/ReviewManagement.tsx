'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Review } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Check,
  X,
  EyeOff,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Filter,
  CheckCircle2,
  Trash
} from 'lucide-react';

export default function ReviewManagement() {
  const { reviews, updateReviewStatus, setReviews, currentTab } = useApp();
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Approved' | 'Reported'>('All');

  // Synchronize with sidebar tabs
  useEffect(() => {
    if (currentTab === 'pending-reviews') {
      setFilterTab('Pending');
    } else if (currentTab === 'reported-reviews') {
      setFilterTab('Reported');
    } else {
      setFilterTab('All');
    }
  }, [currentTab]);

  // Calculates metrics
  const total = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (total || 1)).toFixed(1);
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  const negativeCount = reviews.filter(r => r.rating <= 2).length;

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review permanently?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const getFilteredReviews = () => {
    if (filterTab === 'All') return reviews;
    return reviews.filter(r => r.status === filterTab);
  };

  const list = getFilteredReviews();

  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'pending-reviews': return 'Pending Review Audits';
      case 'reported-reviews': return 'Reported Review Moderation';
      default: return 'Review Moderation & Feedback';
    }
  };

  const getHeaderDesc = () => {
    switch (currentTab) {
      case 'pending-reviews': return 'Approve or filter pending user submissions before they go public';
      case 'reported-reviews': return 'Investigate reported community feedback and flag potential abuse';
      default: return 'Audit user feedback ratings, calculate scores, and moderate community reviews';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-black text-slate-800 text-xl tracking-tight">{getHeaderTitle()}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{getHeaderDesc()}</p>
      </div>

      {/* Review Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Rating</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{avgRating} / 5.0</h3>
            <span className="text-[10px] text-slate-450 font-bold block mt-1">Based on local audits</span>
          </div>
          <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-xs shrink-0">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Positive Reviews</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{positiveCount}</h3>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">4 to 5 Stars</span>
          </div>
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
            <ThumbsUp className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Negative Reviews</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{negativeCount}</h3>
            <span className="text-[10px] text-rose-600 font-bold block mt-1">1 to 2 Stars</span>
          </div>
          <div className="w-11 h-11 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-xs shrink-0">
            <ThumbsDown className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pending Audit</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{reviews.filter(r => r.status === 'Pending').length}</h3>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">Requires validation</span>
          </div>
          <div className="w-11 h-11 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-650 shadow-xs shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </motion.div>
      </div>

      {/* Moderation Controls Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
        {currentTab === 'reviews' && (
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3.5">
            {(['All', 'Pending', 'Approved', 'Reported'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  filterTab === tab
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-55'
                }`}
              >
                {tab} ({tab === 'All' ? total : reviews.filter(r => r.status === tab).length})
              </button>
            ))}
          </div>
        )}

        {/* Reviews List */}
        <div className="divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {list.map(r => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-slate-50/30 px-3 rounded-2xl transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{r.userName}</span>
                    <span className="text-[10px] text-slate-450 font-bold">on {r.businessName}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                      r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      r.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      r.status === 'Reported' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                    "{r.content}"
                  </p>

                  <span className="text-[10px] text-slate-400 font-bold block">Submitted Date: {r.createdDate}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
                  {r.status !== 'Approved' && (
                    <button
                      onClick={() => updateReviewStatus(r.id, 'Approved')}
                      className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-emerald-100/50"
                      title="Approve Review"
                    >
                      <Check className="w-3.5 h-3.5" /> <span>Approve</span>
                    </button>
                  )}
                  {r.status !== 'Hidden' && (
                    <button
                      onClick={() => updateReviewStatus(r.id, 'Hidden')}
                      className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-slate-200/50"
                      title="Hide Review"
                    >
                      <EyeOff className="w-3.5 h-3.5" /> <span>Hide</span>
                    </button>
                  )}
                  {r.status !== 'Reported' && (
                    <button
                      onClick={() => updateReviewStatus(r.id, 'Reported')}
                      className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-amber-100/50"
                      title="Flag / Report"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> <span>Report</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(r.id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100/50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-355 mb-2" />
              <p className="text-xs text-slate-400 font-bold">No reviews found under this section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
