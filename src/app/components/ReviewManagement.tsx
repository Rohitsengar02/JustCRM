'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Review } from '../mockDb';
import {
  Star,
  Check,
  X,
  EyeOff,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Trash2
} from 'lucide-react';

export default function ReviewManagement() {
  const { reviews, updateReviewStatus, setReviews } = useApp();
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Approved' | 'Reported'>('All');

  // Calculates metrics
  const total = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (total || 1)).toFixed(1);
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  const negativeCount = reviews.filter(r => r.rating <= 2).length;

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const getFilteredReviews = () => {
    if (filterTab === 'All') return reviews;
    return reviews.filter(r => r.status === filterTab);
  };

  const list = getFilteredReviews();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-bold text-slate-800 text-lg">Review Moderation & Analytics</h2>
        <p className="text-xs text-slate-400 mt-0.5">Audit user feedback, rate scores, and moderate reported abuse</p>
      </div>

      {/* Review Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Rating</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{avgRating} / 5.0</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              Based on local audits
            </span>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Positive Reviews</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{positiveCount}</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              4 to 5 Stars
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <ThumbsUp className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Negative Reviews</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{negativeCount}</h3>
            <span className="text-[10px] text-red-600 font-bold flex items-center gap-0.5 mt-0.5">
              1 to 2 Stars
            </span>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <ThumbsDown className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pending Audit</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{reviews.filter(r => r.status === 'Pending').length}</h3>
            <span className="text-[10px] text-indigo-500 font-semibold block mt-0.5">
              Requires validation
            </span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Moderation Controls Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-4">
        <div className="flex gap-2 border-b border-slate-100 pb-3">
          {(['All', 'Pending', 'Approved', 'Reported'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {tab} ({tab === 'All' ? total : reviews.filter(r => r.status === tab).length})
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-slate-100">
          {list.map(r => (
            <div key={r.id} className="py-4 flex flex-col md:flex-row justify-between gap-4 hover:bg-slate-50/20 px-2 rounded-lg transition-all">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-slate-800">{r.userName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">on {r.businessName}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                    r.status === 'Pending' ? 'bg-indigo-100 text-indigo-700' :
                    r.status === 'Reported' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
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

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  "{r.content}"
                </p>

                <span className="text-[10px] text-slate-400 block">Submitted Date: {r.createdDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start md:self-center">
                {r.status !== 'Approved' && (
                  <button
                    onClick={() => updateReviewStatus(r.id, 'Approved')}
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    title="Approve Review"
                  >
                    <Check className="w-3.5 h-3.5" /> <span>Approve</span>
                  </button>
                )}
                {r.status !== 'Hidden' && (
                  <button
                    onClick={() => updateReviewStatus(r.id, 'Hidden')}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    title="Hide Review"
                  >
                    <EyeOff className="w-3.5 h-3.5" /> <span>Hide</span>
                  </button>
                )}
                {r.status !== 'Reported' && (
                  <button
                    onClick={() => updateReviewStatus(r.id, 'Reported')}
                    className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    title="Flag / Report"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> <span>Report</span>
                  </button>
                )}
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-all"
                  title="Delete permanently"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-10">No reviews found under this section.</p>
          )}
        </div>
      </div>
    </div>
  );
}
