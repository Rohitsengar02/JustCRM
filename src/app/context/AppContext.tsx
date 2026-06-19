'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Business,
  Lead,
  Review,
  User,
  AdCampaign,
  SupportTicket,
  ActivityFeedItem,
  initialBusinesses,
  initialLeads,
  initialReviews,
  initialUsers,
  initialAds,
  initialTickets,
  initialActivities,
  CategoryNode,
  initialCategories,
  LocationNode,
  initialLocations
} from '../mockDb';

interface AppContextProps {
  // Navigation & Auth
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // DB States
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  ads: AdCampaign[];
  setAds: React.Dispatch<React.SetStateAction<AdCampaign[]>>;
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  activities: ActivityFeedItem[];
  setActivities: React.Dispatch<React.SetStateAction<ActivityFeedItem[]>>;
  categories: CategoryNode[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryNode[]>>;
  locations: LocationNode[];
  setLocations: React.Dispatch<React.SetStateAction<LocationNode[]>>;

  // Selected details drawer
  selectedBusinessId: string | null;
  setSelectedBusinessId: (id: string | null) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;

  // Interactive Operations
  updateBusinessStatus: (id: string, status: Business['status']) => void;
  deleteBusiness: (id: string) => void;
  addBusiness: (business: Omit<Business, 'id' | 'rating' | 'leadsCount' | 'createdDate' | 'revenue' | 'ratingAnalytics'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  addLeadNote: (id: string, note: string) => void;
  addLeadFollowUp: (id: string, task: string, date: string) => void;
  toggleFollowUpDone: (leadId: string, taskIndex: number) => void;
  updateReviewStatus: (id: string, status: Review['status']) => void;
  addActivity: (message: string, type: ActivityFeedItem['type']) => void;
  addTicketComment: (ticketId: string, commentText: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  toggleAdStatus: (adId: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Core Data Lists
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [ads, setAds] = useState<AdCampaign[]>(initialAds);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [activities, setActivities] = useState<ActivityFeedItem[]>(initialActivities);
  const [categories, setCategories] = useState<CategoryNode[]>(initialCategories);
  const [locations, setLocations] = useState<LocationNode[]>(initialLocations);

  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Business Actions
  const updateBusinessStatus = (id: string, status: Business['status']) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    const biz = businesses.find((b) => b.id === id);
    if (biz) {
      addActivity(`Business "${biz.name}" status updated to "${status}"`, 'business');
    }
  };

  const deleteBusiness = (id: string) => {
    const biz = businesses.find((b) => b.id === id);
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
    if (biz) {
      addActivity(`Business "${biz.name}" was permanently deleted`, 'business');
    }
  };

  const addBusiness = (newBizData: Omit<Business, 'id' | 'rating' | 'leadsCount' | 'createdDate' | 'revenue' | 'ratingAnalytics'>) => {
    const newBiz: Business = {
      ...newBizData,
      id: `biz-${Date.now()}`,
      rating: 5.0,
      leadsCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      revenue: newBizData.subscription === 'Free' ? 0 : newBizData.subscription === 'Silver' ? 10000 : newBizData.subscription === 'Gold' ? 25000 : 50000,
      ratingAnalytics: { stars5: 1, stars4: 0, stars3: 0, stars2: 0, stars1: 0 }
    };
    setBusinesses((prev) => [newBiz, ...prev]);
    addActivity(`New listing "${newBiz.name}" was created successfully`, 'business');
  };

  // Lead Actions
  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    const lead = leads.find((l) => l.id === id);
    if (lead) {
      addActivity(`Lead "${lead.userName}" moved to pipeline stage "${status}"`, 'lead');
    }
  };

  const addLeadNote = (id: string, note: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes: [...l.notes, note] } : l))
    );
  };

  const addLeadFollowUp = (id: string, task: string, date: string) => {
    setLeads((prev) =>
      prev.map((l) => (
        l.id === id
          ? { ...l, followUps: [...l.followUps, { date, task, done: false }] }
          : l
      ))
    );
  };

  const toggleFollowUpDone = (leadId: string, taskIndex: number) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const updated = [...l.followUps];
          updated[taskIndex] = { ...updated[taskIndex], done: !updated[taskIndex].done };
          return { ...l, followUps: updated };
        }
        return l;
      })
    );
  };

  // Review Actions
  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    const review = reviews.find((r) => r.id === id);
    if (review) {
      addActivity(`Review from "${review.userName}" marked as "${status}"`, 'review');
    }
  };

  // Activity Logger
  const addActivity = (message: string, type: ActivityFeedItem['type']) => {
    const newItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      type,
      message,
      time: 'Just now'
    };
    setActivities((prev) => [newItem, ...prev.slice(0, 19)]);
  };

  // Support Tickets
  const addTicketComment = (ticketId: string, commentText: string) => {
    setTickets((prev) =>
      prev.map((t) => (
        t.id === ticketId
          ? {
              ...t,
              comments: [
                ...t.comments,
                { author: currentUser?.name || 'Admin', date: 'Just now', text: commentText }
              ]
            }
          : t
      ))
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
  };

  // Ad Status
  const toggleAdStatus = (adId: string) => {
    setAds((prev) =>
      prev.map((a) => (
        a.id === adId
          ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' }
          : a
      ))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        businesses,
        setBusinesses,
        leads,
        setLeads,
        reviews,
        setReviews,
        users,
        setUsers,
        ads,
        setAds,
        tickets,
        setTickets,
        activities,
        setActivities,
        categories,
        setCategories,
        locations,
        setLocations,
        selectedBusinessId,
        setSelectedBusinessId,
        selectedLeadId,
        setSelectedLeadId,
        updateBusinessStatus,
        deleteBusiness,
        addBusiness,
        updateLeadStatus,
        addLeadNote,
        addLeadFollowUp,
        toggleFollowUpDone,
        updateReviewStatus,
        addActivity,
        addTicketComment,
        updateTicketStatus,
        toggleAdStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
