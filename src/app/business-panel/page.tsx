'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Business, Lead, Review } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  ArrowLeft,
  Star,
  Send,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  DollarSign,
  Eye,
  Plus,
  Search,
  Filter,
  User,
  Users,
  Briefcase,
  ShoppingBag,
  Image as ImageIcon,
  Tag,
  Shield,
  LifeBuoy,
  CreditCard,
  Bell,
  Check,
  X,
  FileSpreadsheet,
  Download,
  Percent,
  Play,
  FileText as FileIcon
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessPanel() {
  const { businesses, setBusinesses, leads, setLeads, reviews, setReviews, addActivity } = useApp();

  // Navigation Routing States
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    leads: true,
    profile: false,
    services: false,
    products: false,
    gallery: false,
    reviews: false,
    enquiries: false,
    quotes: false,
    bookings: false,
    customers: false,
    marketing: false,
    analytics: false,
    messages: false,
    subscription: false,
    support: false,
    settings: false
  });

  const [currentUser, setCurrentUser] = useState<Business | null>(null);

  // Business fallback default profile
  const defaultBusiness: Business = {
    id: 'biz-default',
    name: 'CyberLim Solutions',
    owner: 'Rohit Sengar',
    category: 'IT & Repairs',
    phone: '98765 43210',
    email: 'info@cyberlim.com',
    location: { city: 'Mumbai', area: 'Andheri West', locality: 'Andheri West', address: '402, Crystal Plaza, New Link Road' },
    status: 'Premium',
    subscription: 'Platinum',
    rating: 4.8,
    leadsCount: 14,
    createdDate: '2026-01-10',
    logo: '💻',
    images: [],
    about: 'CyberLim Solutions is a leading tech agency specializing in modern web platforms, mobile app development, and professional hardware repairs.',
    services: ['Web Design', 'Next.js Apps', 'Server Support'],
    products: ['Web Templates', 'Custom CRM Suite'],
    businessHours: '09:00 AM - 07:00 PM',
    revenue: 125000,
    ratingAnalytics: { stars5: 12, stars4: 2, stars3: 0, stars2: 0, stars1: 0 }
  };

  // State arrays for services, products, quotes, bookings, customers, messages, support tickets
  const [servicesList, setServicesList] = useState<any[]>([
    { id: 's-1', title: 'Website Development', price: 25000, category: 'Tech Services', desc: 'Custom SEO-friendly corporate website development.', features: ['Responsive Design', 'Next.js Framework', '1 Year Free Maintenance'] },
    { id: 's-2', title: 'Mobile App Development', price: 65000, category: 'App Services', desc: 'Premium cross-platform Android & iOS applications.', features: ['Flutter Engine', 'Secure Login', 'Push Notifications'] },
    { id: 's-3', title: 'Digital Marketing Support', price: 15000, category: 'SEO Services', desc: 'Search engine optimization and Google Ads strategy.', features: ['Keywords Audit', 'Social Media Graphics', 'Analytics Panel'] }
  ]);

  const [productsList, setProductsList] = useState<any[]>([
    { id: 'p-1', title: 'Cyber CRM Template', price: 4999, stock: 45, category: 'Software', image: '💻' },
    { id: 'p-2', title: 'Interactive Portfolio Kit', price: 1999, stock: 120, category: 'Templates', image: '📂' },
    { id: 'p-3', title: 'Developer Hosting Node', price: 9999, stock: 18, category: 'Infrastructure', image: '☁️' }
  ]);

  const [quotesList, setQuotesList] = useState<any[]>([
    { id: 'q-1', clientName: 'Rudra Dev', email: 'rudra@meganods.com', amount: 35000, status: 'Accepted', date: '2026-06-12', tax: 18, discount: 10, terms: 'Net 30' },
    { id: 'q-2', clientName: 'Nisha Gupta', email: 'nisha@guptacorp.in', amount: 15000, status: 'Sent', date: '2026-06-18', tax: 18, discount: 5, terms: 'Pay on Delivery' }
  ]);

  const [bookingsList, setBookingsList] = useState<any[]>([
    { id: 'b-1', customerName: 'Aman Sharma', date: '2026-06-20', time: '11:00 AM', service: 'Website Consult', status: 'Upcoming' },
    { id: 'b-2', customerName: 'Sneha Rao', date: '2026-06-18', time: '03:30 PM', service: 'SEO Strategy', status: 'Completed' },
    { id: 'b-3', customerName: 'Vikram Singh', date: '2026-06-25', time: '10:00 AM', service: 'App Mockup Review', status: 'Upcoming' }
  ]);

  const [customersList, setCustomersList] = useState<any[]>([
    { id: 'c-1', name: 'Rudra Dev', phone: '91234 56789', email: 'rudra@meganods.com', notes: 'Prefers Next.js/React stack. Very responsive.', repeat: true },
    { id: 'c-2', name: 'Nisha Gupta', phone: '92345 67890', email: 'nisha@guptacorp.in', notes: 'Requires full invoice breakdown for corporate compliance.', repeat: false },
    { id: 'c-3', name: 'Aman Sharma', phone: '93456 78901', email: 'aman.sharma@gmail.com', notes: 'Scheduled for direct call follow-up.', repeat: true }
  ]);

  const [galleryList, setGalleryList] = useState<any[]>([
    { id: 'g-1', type: 'Image', name: 'Office Workspace.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
    { id: 'g-2', type: 'Image', name: 'Core Team Pitch.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400' },
    { id: 'g-3', type: 'Brochure', name: 'CyberLim Catalog 2026.pdf', size: '2.4 MB' }
  ]);

  const [supportTickets, setSupportTickets] = useState<any[]>([
    { id: 't-101', subject: 'Priority Listing Verification Delay', priority: 'High', status: 'In Progress', date: '2026-06-15' },
    { id: 't-102', subject: 'GST Invoice Formatting Error', priority: 'Medium', status: 'Closed', date: '2026-06-10' }
  ]);

  const [unreadAlerts, setUnreadAlerts] = useState<string[]>([
    'New Lead received from Aman Sharma!',
    'Your customer review score upgraded to 4.8 Stars.',
    'Quotation Q-1 was marked Accepted by Rudra Dev.'
  ]);

  const [messagesList, setMessagesList] = useState<any[]>([
    { id: 'm-1', sender: 'Aman Sharma', platform: 'WhatsApp', text: 'Hey, are you free for a website development consult call tomorrow?', time: '10:45 AM' },
    { id: 'm-2', sender: 'Sneha Rao', platform: 'Email', text: 'Attached the project scope document for the marketing optimization contract.', time: '09:15 AM' },
    { id: 'm-3', sender: 'Vikram Singh', platform: 'Platform Message', text: 'Can we configure payment integration in our sandbox?', time: 'Yesterday' }
  ]);

  // Form inputs states
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Tech Services');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceFeatures, setNewServiceFeatures] = useState('');

  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Software');
  const [newProductEmoji, setNewProductEmoji] = useState('📦');

  const [newQuoteClient, setNewQuoteClient] = useState('');
  const [newQuoteEmail, setNewQuoteEmail] = useState('');
  const [newQuoteService, setNewQuoteService] = useState('');
  const [newQuoteAmount, setNewQuoteAmount] = useState('');
  const [newQuoteTax, setNewQuoteTax] = useState('18');
  const [newQuoteDiscount, setNewQuoteDiscount] = useState('0');
  const [newQuoteTerms, setNewQuoteTerms] = useState('Due on Receipt');

  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('Low');

  const [editOwner, setEditOwner] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [editHours, setEditHours] = useState('');
  const [editLogo, setEditLogo] = useState('');
  const [editServicesText, setEditServicesText] = useState('');
  const [editAddress, setEditAddress] = useState('');

  // Interactive details overlays
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [replyTexts, setReplyTexts] = useState<{ [reviewId: string]: string }>({});
  const [repliedReviews, setRepliedReviews] = useState<{ [reviewId: string]: string }>({});
  const [adCampaigns, setAdCampaigns] = useState<any[]>([
    { id: 'ad-1', title: 'Top Search Highlight', type: 'Search Banner', impressions: 4500, clicks: 320, budget: 15000, status: 'Active' },
    { id: 'ad-2', title: 'Local Area Spotlight', type: 'City Spotlight', impressions: 12000, clicks: 840, budget: 25000, status: 'Active' }
  ]);
  const [couponCode, setCouponCode] = useState('SUMMER20');
  const [couponDiscount, setCouponDiscount] = useState(20);
  const [couponsList, setCouponsList] = useState<any[]>([
    { code: 'SUMMER20', discount: 20, status: 'Active' },
    { code: 'CYBER50', discount: 50, status: 'Active' }
  ]);
  const [teamMembers, setTeamMembers] = useState<any[]>([
    { name: 'Rohit Sengar', role: 'Owner', email: 'rohit@cyberlim.com' },
    { name: 'Amit Sharma', role: 'Manager', email: 'amit@cyberlim.com' },
    { name: 'Priya Verma', role: 'Sales Executive', email: 'priya@cyberlim.com' }
  ]);

  // Load profile and details on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('registeredBusiness');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Business;
          setCurrentUser(parsed);
          setEditOwner(parsed.owner || '');
          setEditAbout(parsed.about || '');
          setEditHours(parsed.businessHours || '');
          setEditLogo(parsed.logo || '💻');
          setEditServicesText((parsed.services || []).join(', '));
          setEditAddress(parsed.location?.address || '');
        } catch (e) {
          console.error("Error parsing business context profile", e);
        }
      } else {
        // Fallback to default mock business profile
        setCurrentUser(defaultBusiness);
        setEditOwner(defaultBusiness.owner || '');
        setEditAbout(defaultBusiness.about || '');
        setEditHours(defaultBusiness.businessHours || '');
        setEditLogo(defaultBusiness.logo || '💻');
        setEditServicesText((defaultBusiness.services || []).join(', '));
        setEditAddress(defaultBusiness.location?.address || '');
      }

      // Sync replies
      if (currentUser) {
        const savedReplies = localStorage.getItem(`replies_${currentUser.id}`);
        if (savedReplies) {
          setRepliedReviews(JSON.parse(savedReplies));
        }
      }
    }
  }, []);

  const businessUser = currentUser || defaultBusiness;

  // Sync leads & reviews matching active business
  const businessLeads = leads.filter(l => l.businessId === businessUser.id || l.businessId === 'biz-default' || l.businessId === 'biz-1');
  const businessReviews = reviews.filter(r => r.businessId === businessUser.id || r.businessId === 'biz-default' || r.businessId === 'biz-1');

  // Utility to check tab matching group prefix
  const isTabActive = (tab: string) => activeTab === tab;

  // Toggle collapsibles
  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Save Config Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...businessUser,
      owner: editOwner,
      about: editAbout,
      businessHours: editHours,
      logo: editLogo,
      services: editServicesText.split(',').map(s => s.trim()).filter(Boolean),
      location: {
        ...businessUser.location,
        address: editAddress
      }
    };
    setCurrentUser(updated);
    localStorage.setItem('registeredBusiness', JSON.stringify(updated));
    alert("Profile configurations saved successfully!");
  };

  // Add Service
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim() || !newServicePrice.trim()) return;
    const newService = {
      id: `s-${Date.now()}`,
      title: newServiceTitle,
      price: parseFloat(newServicePrice),
      category: newServiceCategory,
      desc: newServiceDesc,
      features: newServiceFeatures.split(',').map(f => f.trim()).filter(Boolean)
    };
    setServicesList(prev => [...prev, newService]);
    setNewServiceTitle('');
    setNewServicePrice('');
    setNewServiceDesc('');
    setNewServiceFeatures('');
    setActiveTab('services-all');
    alert("Service added to catalog!");
  };

  // Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductTitle.trim() || !newProductPrice.trim()) return;
    const newProduct = {
      id: `p-${Date.now()}`,
      title: newProductTitle,
      price: parseFloat(newProductPrice),
      stock: parseInt(newProductStock) || 0,
      category: newProductCategory,
      image: newProductEmoji
    };
    setProductsList(prev => [...prev, newProduct]);
    setNewProductTitle('');
    setNewProductPrice('');
    setNewProductStock('');
    setActiveTab('products-all');
    alert("Product added to catalog inventory!");
  };

  // Create Quotation Invoice
  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteClient.trim() || !newQuoteAmount.trim()) return;
    const newQuote = {
      id: `q-${Date.now()}`,
      clientName: newQuoteClient,
      email: newQuoteEmail,
      amount: parseFloat(newQuoteAmount),
      status: 'Sent',
      date: new Date().toISOString().split('T')[0],
      tax: parseFloat(newQuoteTax),
      discount: parseFloat(newQuoteDiscount),
      terms: newQuoteTerms
    };
    setQuotesList(prev => [newQuote, ...prev]);
    setNewQuoteClient('');
    setNewQuoteEmail('');
    setNewQuoteAmount('');
    setActiveTab('quotes-sent');
    alert("Professional quotation sent to client email!");
  };

  // Submit Support Ticket
  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;
    const newTicket = {
      id: `t-${Date.now()}`,
      subject: newTicketSubject,
      priority: newTicketPriority,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    setNewTicketSubject('');
    setActiveTab('support-tickets');
    alert("Support ticket raised. Our tech agent will review shortly.");
  };

  // Post response replies
  const handlePostReply = (reviewId: string) => {
    const text = replyTexts[reviewId];
    if (!text || !text.trim()) return;
    const updatedReplies = { ...repliedReviews, [reviewId]: text };
    setRepliedReviews(updatedReplies);
    localStorage.setItem(`replies_${businessUser.id}`, JSON.stringify(updatedReplies));
    alert("Professional reply published to listing!");
  };

  const handleUpdateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status } : null);
    }
    addActivity(`Lead status updated to "${status}"`, 'lead');
  };

  const handleAddLeadNote = (leadId: string) => {
    if (!leadNotes.trim()) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes: [...l.notes, leadNotes] } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, notes: [...prev.notes, leadNotes] } : null);
    }
    setLeadNotes('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col lg:flex-row" style={{ zoom: 1.3 }}>

      {/* LEFT NAVIGATION SIDEBAR MENU */}
      <aside className="w-full lg:w-72 bg-white text-slate-800 flex flex-col shrink-0 border-r border-slate-200/80 text-left overflow-y-auto shadow-2xs">
        <div className="p-5 border-b border-slate-100 space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-1.5 bg-slate-100 rounded-xl select-none border">
              {businessUser.logo || '🏢'}
            </span>
            <div className="min-w-0">
              <h2 className="text-xs font-black text-slate-900 truncate leading-tight uppercase tracking-wider">{businessUser.name}</h2>
              <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest block mt-0.5">{businessUser.category} • Premium Gold Partner</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-wide flex items-center gap-0.5">
              🛡️ KYC Verified
            </span>
            <span className="bg-indigo-650 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-wide">
              Score: 85%
            </span>
          </div>

          {/* Quick search sidebar menu items */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search panels..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-[10px] font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Sidebar Structure */}
        <nav className="flex-1 p-4 space-y-1">

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-550" />
            <span>Dashboard Overview</span>
          </button>

          {/* Lead Management Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('leads')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Lead Management</span>
              {expandedGroups.leads ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.leads && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'leads-all', label: 'All Leads' },
                  { id: 'leads-new', label: 'New Leads' },
                  { id: 'leads-contacted', label: 'Contacted' },
                  { id: 'leads-interested', label: 'Interested' },
                  { id: 'leads-quotation', label: 'Quotation Sent' },
                  { id: 'leads-converted', label: 'Converted' },
                  { id: 'leads-lost', label: 'Lost Leads' },
                  { id: 'leads-followups', label: 'Follow Ups' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Business Profile Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('profile')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Business Profile</span>
              {expandedGroups.profile ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.profile && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'profile-company', label: 'Company Info' },
                  { id: 'profile-contact', label: 'Contact Details' },
                  { id: 'profile-hours', label: 'Business Timing' },
                  { id: 'profile-team', label: 'Team Members' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Services Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('services')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Services Catalog</span>
              {expandedGroups.services ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.services && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'services-all', label: 'All Services' },
                  { id: 'services-add', label: 'Add Service' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Products Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('products')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Products Catalog</span>
              {expandedGroups.products ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.products && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'products-all', label: 'All Products' },
                  { id: 'products-add', label: 'Add Product' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Group */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('gallery-photos')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('gallery') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <ImageIcon className="w-4 h-4 text-emerald-500" />
              <span>Gallery Workspace</span>
            </button>
          </div>

          {/* Reviews Group */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('reviews-all')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('reviews') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-teal-500" />
                <span>Reviews & Ratings</span>
              </span>
              {businessReviews.length > 0 && (
                <span className="bg-slate-100 text-slate-655 text-[8px] px-1.5 py-0.5 rounded-full font-black">
                  {businessReviews.length}
                </span>
              )}
            </button>
          </div>

          {/* Quotations Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('quotes')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Quotations Engine</span>
              {expandedGroups.quotes ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.quotes && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'quotes-create', label: 'Create Quotation' },
                  { id: 'quotes-sent', label: 'Invoice History' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bookings Group */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('bookings-appointments')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('bookings') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Bookings Calendar</span>
            </button>
          </div>

          {/* Customers Group */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('customers-all')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('customers') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <Users className="w-4 h-4 text-sky-500" />
              <span>Customers CRM</span>
            </button>
          </div>

          {/* Marketing Group */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('marketing')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Marketing Center</span>
              {expandedGroups.marketing ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.marketing && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'marketing-ads', label: 'Promotions & Campaigns' },
                  { id: 'marketing-offers', label: 'Offers & Coupons' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${activeTab === item.id ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Analytics Group */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('analytics-overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('analytics') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <TrendingUp className="w-4 h-4 text-pink-500" />
              <span>Analytics & Insights</span>
            </button>
          </div>

          {/* Message Center */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('messages-inbox')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('messages') ? 'bg-indigo-55 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-purple-500" />
                <span>Unified Inbox</span>
              </span>
              <span className="bg-indigo-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black">3</span>
            </button>
          </div>

          {/* Subscription Tab */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('subscription-plan')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('subscription') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <CreditCard className="w-4 h-4 text-yellow-500" />
              <span>Subscription Desk</span>
            </button>
          </div>

          {/* Support Tickets */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('support-tickets')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${activeTab.startsWith('support') ? 'bg-indigo-50 text-indigo-650 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <LifeBuoy className="w-4 h-4 text-amber-500" />
              <span>Support Desk</span>
            </button>
          </div>

        </nav>

        {/* Back Link to portal */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold text-slate-655 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Directory Website</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50">

        {/* HERO HEADER BRAND PANEL */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white p-6 rounded-[28px] border border-slate-200/10 shadow-md text-left relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl p-1 bg-white/10 rounded-xl backdrop-blur-md">{businessUser.logo}</span>
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">Welcome Back 👋</span>
                <h1 className="text-xl font-black text-white tracking-tight">{businessUser.name}</h1>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider flex items-center gap-1">
                ⭐ Premium Partner
              </span>
              <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider">
                Profile Completeness: 85%
              </span>
            </div>
          </div>

          <div className="flex gap-2.5 z-10 flex-wrap">
            <button
              onClick={() => setActiveTab('profile-company')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/20 border border-white/20 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('marketing-ads')}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer shadow-sm shadow-orange-500/20"
            >
              Promote Business
            </button>
            <button
              onClick={() => {
                alert("Redirecting to Lead Marketplace... Accessing Premium Gold Lead Pool.");
                setActiveTab('leads-all');
              }}
              className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer"
            >
              Buy Leads
            </button>
          </div>
        </div >

    {/* 8 KPI CARD METRICS */ }
  {
    activeTab === 'dashboard' && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
        {[
          { label: 'Total Leads', val: businessLeads.length, icon: <FileText className="text-indigo-500 w-4 h-4" />, desc: 'All CRM entries' },
          { label: 'New Leads', val: businessLeads.filter(l => l.status === 'New').length, icon: <Sparkles className="text-orange-500 w-4 h-4" />, desc: 'Fresh inquiries' },
          { label: 'Profile Views', val: 1248, icon: <Eye className="text-sky-500 w-4 h-4" />, desc: 'Impressions score' },
          { label: 'Calls Received', val: 412, icon: <Phone className="text-emerald-500 w-4 h-4" />, desc: 'Phone click logs' },
          { label: 'WhatsApp Clicks', val: 320, icon: <MessageCircle className="text-green-500 w-4 h-4" />, desc: 'Direct chat connects' },
          { label: 'Website Visits', val: 185, icon: <ExternalLink className="text-purple-500 w-4 h-4" />, desc: 'Outbound redirects' },
          { label: 'Total Reviews', val: businessReviews.length, icon: <Star className="text-amber-500 w-4 h-4 fill-amber-500" />, desc: 'Audited score' },
          { label: 'Revenue Generated', val: `₹${businessUser.revenue.toLocaleString()}`, icon: <DollarSign className="text-pink-500 w-4 h-4" />, desc: 'Estimated value' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-[20px] p-4.5 shadow-3xs space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[8px] font-black uppercase tracking-wider">{kpi.label}</span>
              {kpi.icon}
            </div>
            <h4 className="text-lg font-black text-slate-800">{kpi.val}</h4>
            <p className="text-[8px] text-slate-400 font-semibold">{kpi.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  {/* VIEW PORTALS */ }
  <AnimatePresence mode="wait">
    {activeTab === 'dashboard' && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left"
      >
        {/* Left Column: Funnel & Line Charts */}
        <div className="lg:col-span-2 space-y-6">

          {/* Visual Lead Funnel Block */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>CRM Lead Pipeline Funnel</span>
            </h3>

            {/* Pipeline Funnel Bars */}
            <div className="space-y-3.5 max-w-lg mx-auto py-2">
              {[
                { stage: 'New Leads', count: businessLeads.length, width: 'w-full', bg: 'bg-indigo-600', val: '100%' },
                { stage: 'Contacted', count: businessLeads.filter(l => l.status === 'Contacted').length + 3, width: 'w-4/5', bg: 'bg-indigo-500', val: '80%' },
                { stage: 'Interested', count: businessLeads.filter(l => l.status === 'Interested').length + 2, width: 'w-3/5', bg: 'bg-indigo-400', val: '60%' },
                { stage: 'Quotation Sent', count: quotesList.length, width: 'w-2/5', bg: 'bg-orange-500', val: '40%' },
                { stage: 'Converted', count: quotesList.filter(q => q.status === 'Accepted').length, width: 'w-1/5', bg: 'bg-emerald-500', val: '20%' }
              ].map((bar, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                    <span>{bar.stage} ({bar.count})</span>
                    <span>{bar.val} conversion</span>
                  </div>
                  <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex">
                    <div className={`h-full ${bar.bg} ${bar.width} transition-all duration-550 flex items-center justify-end px-3 text-[8px] font-black text-white`}>
                      {bar.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Performance Line Chart (Custom CSS representation) */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Profile Traffic Performance (Weekly Clicks)</span>
            </h3>

            {/* Grid of chart bars representing a line graph */}
            <div className="h-44 flex items-end justify-between gap-2.5 pt-6 border-b border-slate-200 pb-2">
              {[
                { day: 'Mon', views: 40, calls: 12 },
                { day: 'Tue', views: 75, calls: 24 },
                { day: 'Wed', views: 110, calls: 35 },
                { day: 'Thu', views: 90, calls: 18 },
                { day: 'Fri', views: 130, calls: 45 },
                { day: 'Sat', views: 160, calls: 52 },
                { day: 'Sun', views: 145, calls: 40 }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[8px] font-black p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <p>Views: {bar.views}</p>
                    <p>Calls: {bar.calls}</p>
                  </div>
                  <div className="w-full flex gap-1 items-end justify-center h-28">
                    {/* Views bar */}
                    <div
                      style={{ height: `${(bar.views / 180) * 100}%` }}
                      className="w-3 bg-indigo-500 hover:bg-indigo-600 rounded-t-sm transition-all"
                    />
                    {/* Calls bar */}
                    <div
                      style={{ height: `${(bar.calls / 180) * 100}%` }}
                      className="w-3 bg-emerald-500 hover:bg-emerald-600 rounded-t-sm transition-all"
                    />
                  </div>
                  <span className="text-[9px] font-black text-slate-500">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 text-[9px] font-black text-slate-500 justify-center">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> Profile Views</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Calls Connects</span>
            </div>
          </div>

          {/* Lead Sources Pie Chart */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Lead Sources Share</span>
            </h3>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
              {/* SVG Pie Chart representation */}
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Search (40%) */}
                  <path className="text-indigo-500" strokeDasharray="40 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Category (25%) */}
                  <path className="text-teal-500" strokeDasharray="25 100" strokeDashoffset="-40" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Ads (20%) */}
                  <path className="text-orange-500" strokeDasharray="20 100" strokeDashoffset="-65" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Direct Link (15%) */}
                  <path className="text-amber-500" strokeDasharray="15 100" strokeDashoffset="-85" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-[10px] font-black text-slate-800">100% Leads</div>
              </div>

              <div className="text-[10px] font-semibold text-slate-655 space-y-2">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-indigo-500 rounded" /> Search Index (40%)</div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-teal-500 rounded" /> Category Listing (25%)</div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-orange-500 rounded" /> Ad Campaigns (20%)</div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-amber-500 rounded" /> Direct Link (15%)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Activities, Follow-ups, and Team */}
        <div className="space-y-6">

          {/* Today's Activities */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Today's Activities</span>
            </h3>
            <div className="space-y-3">
              {[
                { text: '5 New Leads generated', time: '10 mins ago', done: true },
                { text: '2 Reviews received', time: '1 hour ago', done: true },
                { text: '1 Quotation Q-1 accepted', time: '3 hours ago', done: true },
                { text: '3 Customer Messages unanswered', time: 'Check Inbox', done: false }
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[10px] font-semibold text-slate-700">
                  {act.done ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-bold">{act.text}</p>
                    <span className="text-[8px] text-slate-400 font-semibold">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Followups */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Upcoming Follow-ups</span>
            </h3>
            <div className="space-y-3 text-[10px] font-semibold text-slate-750">
              {[
                { name: 'Aman Sharma', task: 'Follow up on Website Consult Quote', date: 'June 20, 11:00 AM' },
                { name: 'Sneha Rao', task: 'Confirm SEO Proposal terms', date: 'June 22, 02:00 PM' }
              ].map((fup, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-900">{fup.name}</span>
                    <span className="text-[8px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-black">{fup.date}</span>
                  </div>
                  <p className="text-slate-500 text-[9px] font-medium leading-relaxed">{fup.task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Team Performance Index</span>
            </h3>
            <div className="space-y-3 text-[10px] font-semibold text-slate-750">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-xs font-black text-indigo-650">
                      {member.name[0]}
                    </div>
                    <div>
                      <span className="font-black block leading-tight text-slate-900">{member.name}</span>
                      <span className="text-[8px] text-slate-450 uppercase font-extrabold">{member.role}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-emerald-600">Active</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    )}

    {/* LEAD PIPELINES VIEWS */}
    {activeTab.startsWith('leads-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 text-left"
      >
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Lead pipeline - {activeTab.replace('leads-', '').toUpperCase()}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessLeads
              .filter(l => {
                const tab = activeTab.replace('leads-', '');
                if (tab === 'all') return true;
                return l.status.toLowerCase() === tab.toLowerCase();
              })
              .map(lead => {
                const avatarUrl = 'https://images.unsplash.com/photo-' + (lead.userName.length % 2 === 0 ? '1534528741775-53994a69daeb' : '1507003211169-0a1dd7228f2d') + '?w=150&h=150&fit=crop&crop=faces';
                return (
                  <div key={lead.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-between space-y-4 hover:border-indigo-350 hover:bg-white transition-all duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatarUrl}
                          className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-3xs"
                          alt=""
                        />
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-black text-slate-800 truncate">{lead.userName}</h4>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">{lead.createdDate} • via {lead.source}</span>
                        </div>
                      </div>
                      <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${lead.status === 'New' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-50 text-indigo-650'
                        }`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150/60 text-[10px] font-semibold text-slate-600">
                      <p className="flex justify-between"><span className="text-slate-400">Request:</span> <span className="text-slate-800 font-bold">{lead.category}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-mono text-slate-700">{lead.userPhone}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Email:</span> <span className="truncate max-w-[120px] text-slate-700">{lead.userEmail}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-black text-white text-[9px] font-black rounded-lg transition-all cursor-pointer text-center"
                      >
                        Manage Lead
                      </button>
                      <button
                        onClick={() => alert(`Starting voice dialer to: ${lead.userPhone}`)}
                        className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 text-[9px] font-black rounded-lg transition-all"
                      >
                        Call Client
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </motion.div>
    )}

    {/* COMPANY PROFILE VIEWS */}
    {activeTab === 'profile-company' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left space-y-6"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Company profile settings
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Owner / Representative Name</label>
              <input
                type="text"
                value={editOwner}
                onChange={(e) => setEditOwner(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Timing Hours</label>
              <input
                type="text"
                value={editHours}
                onChange={(e) => setEditHours(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Address details</label>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Services Specialties (Comma separated)</label>
            <input
              type="text"
              value={editServicesText}
              onChange={(e) => setEditServicesText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">About company description</label>
            <textarea
              rows={4}
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850 leading-relaxed"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Brand logo emoji</label>
            <div className="flex gap-2 flex-wrap">
              {['🏢', '📦', '🦷', '🏨', '🥗', '🎧', '💇‍♀️', '💻', '💡', '🛠️'].map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setEditLogo(emoji)}
                  className={`text-xl p-2 rounded-xl border transition-all cursor-pointer ${editLogo === emoji ? 'bg-indigo-55 border-indigo-500 scale-105' : 'bg-slate-55 border-slate-200 hover:border-slate-350'
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Save Profile Settings
          </button>
        </form>
      </motion.div>
    )}

    {/* SERVICES CATALOG VIEWS */}
    {activeTab === 'services-all' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
      >
        {servicesList.map(ser => (
          <div key={ser.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between h-52">
            <div className="space-y-2">
              <span className="text-[8px] bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded font-black tracking-wider uppercase">{ser.category}</span>
              <h4 className="text-xs font-black text-slate-900">{ser.title}</h4>
              <p className="text-[10px] text-slate-500 leading-normal line-clamp-3">{ser.desc}</p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <span className="text-xs font-black text-slate-900">₹{ser.price.toLocaleString()}</span>
              <button
                onClick={() => setServicesList(prev => prev.filter(s => s.id !== ser.id))}
                className="text-slate-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    )}

    {activeTab === 'services-add' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-lg mx-auto"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Add new service specialty
        </h3>
        <form onSubmit={handleAddService} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Service Title</label>
            <input
              type="text"
              placeholder="e.g. Dedicated React Native App"
              value={newServiceTitle}
              onChange={(e) => setNewServiceTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Starting Price (₹)</label>
            <input
              type="number"
              placeholder="e.g. 45000"
              value={newServicePrice}
              onChange={(e) => setNewServicePrice(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Service Features (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Custom APIs, Cloud Sync, Push Alerts"
              value={newServiceFeatures}
              onChange={(e) => setNewServiceFeatures(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              placeholder="Detailed description of features..."
              value={newServiceDesc}
              onChange={(e) => setNewServiceDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Publish Service to Catalog
          </button>
        </form>
      </motion.div>
    )}

    {/* PRODUCTS CATALOG VIEWS */}
    {activeTab === 'products-all' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
      >
        {productsList.map(prod => (
          <div key={prod.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between h-52">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[8px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black tracking-wider uppercase">{prod.category}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Stock: {prod.stock} left</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-1 bg-slate-50 border rounded-lg select-none">{prod.image}</span>
                <h4 className="text-xs font-black text-slate-900 leading-tight">{prod.title}</h4>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <span className="text-xs font-black text-slate-900">₹{prod.price.toLocaleString()}</span>
              <button
                onClick={() => setProductsList(prev => prev.filter(p => p.id !== prod.id))}
                className="text-slate-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    )}

    {activeTab === 'products-add' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-lg mx-auto"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Add new product to inventory
        </h3>
        <form onSubmit={handleAddProduct} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Next.js SaaS Boilerplate"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Unit Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 2999"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Initial Stock Level</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={newProductStock}
                onChange={(e) => setNewProductStock(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Product Category</label>
            <select
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
            >
              <option value="Software">Software Utilities</option>
              <option value="Templates">Design Templates</option>
              <option value="Infrastructure">Infrastructure Hosts</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Select Product Icon</label>
            <div className="flex gap-2">
              {['📦', '💻', '📂', '🔌', '☁️', '📱', '💿'].map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setNewProductEmoji(emoji)}
                  className={`text-xl p-2 rounded-xl border transition-all ${newProductEmoji === emoji ? 'bg-indigo-50 border-indigo-500 scale-105 shadow-3xs' : 'bg-slate-50 border-slate-200 hover:border-slate-350'
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Publish Product to Inventory
          </button>
        </form>
      </motion.div>
    )}

    {/* REVIEWS LIST */}
    {activeTab === 'reviews-all' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs text-left space-y-4"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Customer Reviews Feed & Reply Portal
        </h3>

        <div className="space-y-4">
          {businessReviews.map(rev => (
            <div key={rev.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="text-xs font-black text-slate-800">{rev.userName}</h4>
                  <span className="text-[8px] text-slate-400 font-semibold">{rev.createdDate}</span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-655 font-semibold">"{rev.content}"</p>

              {repliedReviews[rev.id] ? (
                <div className="bg-indigo-50/80 border-l-2 border-indigo-500 p-3.5 rounded-r-xl mt-2 space-y-1">
                  <span className="text-[9px] font-black text-indigo-650 block">Your Reply:</span>
                  <p className="text-[11px] font-semibold text-slate-700 leading-normal">"{repliedReviews[rev.id]}"</p>
                </div>
              ) : (
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={replyTexts[rev.id] || ''}
                    onChange={(e) => setReplyTexts(prev => ({ ...prev, [rev.id]: e.target.value }))}
                    placeholder="Write your professional response to this client..."
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800"
                  />
                  <button
                    onClick={() => handlePostReply(rev.id)}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" /> <span>Submit Reply</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {/* QUOTATIONS ENGINE */}
    {activeTab === 'quotes-create' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-lg mx-auto"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Generate Professional Quotation Invoice
        </h3>
        <form onSubmit={handleCreateQuotation} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Client / Corporate Name</label>
            <input
              type="text"
              placeholder="e.g. Rudra Dev"
              value={newQuoteClient}
              onChange={(e) => setNewQuoteClient(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Client Email Address</label>
            <input
              type="email"
              placeholder="e.g. rudra@meganods.com"
              value={newQuoteEmail}
              onChange={(e) => setNewQuoteEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Service Required</label>
            <input
              type="text"
              placeholder="e.g. Web Development & SEO Setup"
              value={newQuoteService}
              onChange={(e) => setNewQuoteService(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Base Price (₹)</label>
              <input
                type="number"
                placeholder="35000"
                value={newQuoteAmount}
                onChange={(e) => setNewQuoteAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Tax (GST %)</label>
              <input
                type="number"
                value={newQuoteTax}
                onChange={(e) => setNewQuoteTax(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Discount (%)</label>
              <input
                type="number"
                value={newQuoteDiscount}
                onChange={(e) => setNewQuoteDiscount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Contract Terms</label>
            <input
              type="text"
              value={newQuoteTerms}
              onChange={(e) => setNewQuoteTerms(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Generate & Send Invoice Quote
          </button>
        </form>
      </motion.div>
    )}

    {activeTab === 'quotes-sent' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs text-left space-y-4"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Invoice History & Quotations List
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quotesList.map(quote => {
            const total = quote.amount * (1 + (quote.tax - quote.discount) / 100);
            return (
              <div key={quote.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-between space-y-4 hover:border-indigo-350 hover:bg-white transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-650 text-xl font-bold select-none shrink-0">
                      📄
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-black text-slate-800 truncate">{quote.clientName}</h4>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">ID: {quote.id} • {quote.date}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${quote.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-650'
                    }`}>
                    {quote.status}
                  </span>
                </div>
                <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150/60 text-[10px] font-semibold text-slate-600">
                  <p className="flex justify-between"><span className="text-slate-400">Terms:</span> <span className="text-slate-700">{quote.terms}</span></p>
                  <p className="flex justify-between"><span className="text-slate-400">Tax rate:</span> <span className="text-slate-750 font-bold">{quote.tax}% GST</span></p>
                  <p className="flex justify-between"><span className="text-slate-400">Total:</span> <span className="text-indigo-650 font-black">₹{total.toLocaleString()}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert(`Quote: ${quote.id}\nClient: ${quote.clientName}\nSubtotal: ₹${quote.amount.toLocaleString()}\nTax: ${quote.tax}%\nTotal: ₹${total.toLocaleString()}`);
                    }}
                    className="flex-1 py-2 bg-slate-900 hover:bg-black text-white text-[9px] font-black rounded-lg transition-all cursor-pointer text-center"
                  >
                    View Invoice Details
                  </button>
                  <button
                    onClick={() => alert(`Downloading Quotation invoice PDF for ${quote.clientName}...`)}
                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 text-[9px] font-black rounded-lg transition-all flex items-center justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    )}

    {/* GALLERY DESK */}
    {activeTab.startsWith('gallery-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 text-left"
      >
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Gallery & Media Desk
          </h3>

          {/* Drag-and-drop Mock Area */}
          <div
            onClick={() => {
              const name = prompt("Enter mock file name (e.g. Office Suite.jpg):");
              if (name) {
                setGalleryList(prev => [...prev, { id: `g-${Date.now()}`, type: name.endsWith('.pdf') ? 'Brochure' : 'Image', name, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' }]);
                alert("File uploaded successfully to listings media gallery!");
              }
            }}
            className="border-2 border-dashed border-slate-250 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-8 text-center space-y-2 cursor-pointer transition-colors"
          >
            <span className="text-3xl block">📁</span>
            <p className="text-xs font-bold text-slate-700">Drag & Drop files here, or click to upload</p>
            <p className="text-[9px] text-slate-400 font-semibold">Supports Images (JPG/PNG), Videos (MP4), brochures (PDF) up to 10MB</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {galleryList.map(media => (
              <div key={media.id} className="bg-slate-50 border rounded-xl overflow-hidden shadow-3xs p-3.5 space-y-2">
                {media.type === 'Image' ? (
                  <div className="h-28 w-full bg-slate-200 rounded-lg overflow-hidden relative">
                    <img src={media.url} className="w-full h-full object-cover" alt="" />
                  </div>
                ) : (
                  <div className="h-28 w-full bg-indigo-50 border border-indigo-100 rounded-lg flex flex-col items-center justify-center text-indigo-650 p-2 text-center">
                    <span className="text-2xl mb-1">📄</span>
                    <span className="text-[10px] font-black tracking-tight truncate w-full">{media.name}</span>
                    <span className="text-[8px] text-slate-400 mt-0.5">{media.size || '3.2 MB'}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                  <span className="truncate max-w-[100px]">{media.name}</span>
                  <button
                    onClick={() => setGalleryList(prev => prev.filter(g => g.id !== media.id))}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )}

    {/* BOOKINGS CALENDAR */}
    {activeTab.startsWith('bookings-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs text-left space-y-6"
      >
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 flex-wrap gap-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Bookings calendar appointments
          </h3>
          <div className="flex gap-1.5 text-[9px] font-extrabold">
            <span className="bg-indigo-50 text-indigo-650 px-2.5 py-1.5 rounded-lg border">Monthly</span>
            <span className="bg-slate-100 text-slate-500 px-2.5 py-1.5 rounded-lg">Weekly</span>
            <span className="bg-slate-100 text-slate-500 px-2.5 py-1.5 rounded-lg">Daily</span>
          </div>
        </div>

        {/* Grid represent Calendar schedule */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bookingsList.map(book => (
            <div key={book.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[8px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-black tracking-wide">{book.time}</span>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded ${book.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>{book.status}</span>
              </div>
              <h4 className="text-xs font-black text-slate-900">{book.customerName}</h4>
              <p className="text-[10px] text-indigo-650 font-bold">{book.service}</p>
              <div className="flex gap-2 pt-2 border-t border-slate-200 mt-2">
                <button
                  onClick={() => {
                    setBookingsList(prev => prev.map(b => b.id === book.id ? { ...b, status: 'Completed' } : b));
                    alert("Appointment marked as Completed!");
                  }}
                  className="flex-1 py-1.5 bg-slate-900 hover:bg-black text-white text-[8px] font-black rounded-lg transition-all"
                >
                  Complete
                </button>
                <button
                  onClick={() => setBookingsList(prev => prev.filter(b => b.id !== book.id))}
                  className="py-1.5 px-2 bg-white border border-slate-200 text-slate-500 hover:text-red-500 text-[8px] font-black rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {/* CUSTOMERS CRM */}
    {activeTab.startsWith('customers-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs text-left space-y-4"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Customers directory list
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {customersList.map(cust => {
            const avatarUrl = 'https://images.unsplash.com/photo-' + (cust.name.length % 2 === 0 ? '1544005313-94ddf0286df2' : '1506794778202-cad84cf45f1d') + '?w=150&h=150&fit=crop&crop=faces';
            return (
              <div key={cust.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-between space-y-4 hover:border-indigo-350 hover:bg-white transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-3xs"
                      alt=""
                    />
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-black text-slate-800 truncate">{cust.name}</h4>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">ID: {cust.id}</span>
                    </div>
                  </div>
                  {cust.repeat ? (
                    <span className="bg-emerald-100 text-emerald-700 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase">Repeat Client</span>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase">First Time</span>
                  )}
                </div>
                <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-150/60 text-[10px] font-semibold text-slate-600">
                  <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-mono text-slate-700">{cust.phone}</span></p>
                  <p className="flex justify-between"><span className="text-slate-400">Email:</span> <span className="truncate max-w-[120px] text-slate-700">{cust.email}</span></p>
                  <div className="pt-2 border-t mt-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">CRM Log Notes</span>
                    <p className="text-slate-500 italic text-[9px] leading-normal">"{cust.notes}"</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const note = prompt("Add CRM activities log notes for customer:", cust.notes);
                      if (note !== null) {
                        setCustomersList(prev => prev.map(c => c.id === cust.id ? { ...c, notes: note } : c));
                        alert("Customer CRM log notes updated!");
                      }
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-black text-white text-[9px] font-black rounded-lg transition-all cursor-pointer text-center"
                  >
                    Edit CRM Notes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    )}

    {/* MARKETING CENTER */}
    {activeTab === 'marketing-ads' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 text-left"
      >
        <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Promotions & active Ad campaigns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adCampaigns.map(ad => (
              <div key={ad.id} className="p-4 bg-slate-50 border rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded font-black tracking-wider uppercase">{ad.type}</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold">{ad.status}</span>
                </div>
                <h4 className="text-xs font-black text-slate-800">{ad.title}</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 pt-2 border-t">
                  <p>Impressions: {ad.impressions}</p>
                  <p>Clicks: {ad.clicks}</p>
                  <p>Weekly Budget: ₹{ad.budget}</p>
                  <p>CTR score: {((ad.clicks / ad.impressions) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )}

    {activeTab === 'marketing-offers' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-lg mx-auto space-y-6"
      >
        <div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Offers, coupons & SMS campaigns
          </h3>
        </div>

        <div className="space-y-3">
          {couponsList.map((coup, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 border rounded-2xl">
              <div>
                <span className="text-xs font-black text-indigo-650 font-mono tracking-widest">{coup.code}</span>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Value discount of {coup.discount}% off billing.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-2 py-0.5 rounded uppercase">Active</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50/50 border border-dashed rounded-2xl space-y-3">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Generate promo discount code</h4>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="px-3.5 py-2.5 bg-white border rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
              placeholder="WINTER10"
            />
            <input
              type="number"
              value={couponDiscount}
              onChange={(e) => setCouponDiscount(parseInt(e.target.value) || 0)}
              className="px-3.5 py-2.5 bg-white border rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
              placeholder="10"
            />
          </div>
          <button
            onClick={() => {
              if (couponCode.trim()) {
                setCouponsList(prev => [...prev, { code: couponCode, discount: couponDiscount, status: 'Active' }]);
                alert(`Promo code ${couponCode} deployed live!`);
              }
            }}
            className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Create Live Discount Code
          </button>
        </div>
      </motion.div>
    )}

    {/* UNIFIED MESSAGING INBOX */}
    {activeTab.startsWith('messages-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-3xs text-left space-y-6"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Unified messaging inbox
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px]">
          {/* Chat users list */}
          <div className="lg:col-span-1 border-r border-slate-100 pr-2 space-y-2 overflow-y-auto">
            {messagesList.map(msg => (
              <div key={msg.id} className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-800">{msg.sender}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${msg.platform === 'WhatsApp' ? 'bg-emerald-100 text-emerald-700' :
                    msg.platform === 'Email' ? 'bg-sky-100 text-sky-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>{msg.platform}</span>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold truncate leading-tight">"{msg.text}"</p>
              </div>
            ))}
          </div>

          {/* Conversation area */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full bg-slate-50/50 p-4 border rounded-2xl relative">
            <div className="space-y-4 overflow-y-auto flex-1">
              <div className="flex justify-start">
                <div className="max-w-xs p-3 bg-white border rounded-2xl rounded-tl-none text-[10px] font-semibold text-slate-700">
                  <span className="block font-black text-indigo-650 text-[9px] mb-1">Aman Sharma</span>
                  "Are you free for a website development consult call tomorrow?"
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs p-3 bg-indigo-600 text-white rounded-2xl rounded-tr-none text-[10px] font-semibold">
                  "Sure! Does 11:00 AM work for you?"
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t mt-4">
              <input
                type="text"
                placeholder="Type WhatsApp/Email message..."
                className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-800"
              />
              <button
                onClick={() => alert("Reply sent to Aman Sharma's inbox!")}
                className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )}

    {/* SUBSCRIPTION BILLING */}
    {activeTab === 'subscription-plan' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-lg mx-auto space-y-6"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-indigo-500" />
          <span>Subscription Plan Details</span>
        </h3>

        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="space-y-1">
            <span className="text-[8px] bg-indigo-600 text-white px-2 py-0.5 rounded font-black tracking-wide uppercase">Active Plan</span>
            <h4 className="text-base font-black text-white">Premium Gold Pack</h4>
            <p className="text-[10px] text-slate-400 font-semibold">Renews automatically on July 10, 2026</p>
          </div>
          <span className="text-base font-black">₹2,999/mo</span>
        </div>

        <div className="space-y-3">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Included Premium Features</h4>
          <div className="text-[10px] font-semibold text-slate-700 space-y-2">
            <div className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Premium Spotlights priority listing ranking</div>
            <div className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Unlimited lead pool alerts index</div>
            <div className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Live Chat responder auto reply tools</div>
            <div className="flex items-center gap-2"><span className="text-emerald-500">✔</span> Comprehensive conversion funnel reports analytics</div>
          </div>
        </div>

        <button
          onClick={() => alert("Initiating payment gateway node for custom enterprise pack upgrading...")}
          className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          Upgrade to Platinum Elite
        </button>
      </motion.div>
    )}

    {/* SUPPORT TICKETS MODULE */}
    {activeTab.startsWith('support-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left max-w-xl mx-auto space-y-6"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <LifeBuoy className="w-4 h-4 text-indigo-500" />
          <span>Support tickets desk</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-semibold text-slate-700 divide-y divide-slate-100">
            <thead className="bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Ticket ID</th>
                <th className="px-4 py-3 text-left">Issue Subject</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {supportTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 text-slate-900 font-mono text-[10px]">{ticket.id}</td>
                  <td className="px-4 py-3.5 text-slate-900 font-extrabold">{ticket.subject}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                      }`}>{ticket.priority}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] text-slate-450 font-semibold">{ticket.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form raise ticket */}
        <div className="p-4 bg-slate-50 border rounded-2xl space-y-3">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Raise support ticket issue</h4>
          <form onSubmit={handleRaiseTicket} className="space-y-3">
            <input
              type="text"
              placeholder="Brief description of concern..."
              value={newTicketSubject}
              onChange={(e) => setNewTicketSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-800"
              required
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map(prio => (
                  <button
                    key={prio}
                    type="button"
                    onClick={() => setNewTicketPriority(prio)}
                    className={`px-3 py-1.5 text-[9px] font-black rounded-lg border ${newTicketPriority === prio ? 'bg-indigo-50 border-indigo-500 text-indigo-650' : 'bg-white border-slate-250 text-slate-500'
                      }`}
                  >
                    {prio}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                File Ticket
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    )}

    {/* ANALYTICS SECTION */}
    {activeTab.startsWith('analytics-') && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-3xs text-left space-y-6"
      >
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-indigo-500" />
          <span>Search Keywords & Competitor Analytics</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Keywords */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Most Searched Keywords Ranking</h4>
            <div className="space-y-2 text-[11px] font-semibold text-slate-700">
              {[
                { rank: '#1', keyword: 'Website Developer', count: '482 searches' },
                { rank: '#2', keyword: 'Next.js App Development', count: '315 searches' },
                { rank: '#3', keyword: 'Digital SEO Services', count: '142 searches' }
              ].map((kw, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-indigo-650 font-mono">{kw.rank}</span>
                    <span className="font-bold text-slate-800">{kw.keyword}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{kw.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Insights */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Competitor Insights Rank</h4>
            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-indigo-650 uppercase">Your Listing Rank</span>
                <span className="text-base font-black text-slate-800">#4 Locally</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
                Optimize your profile details, obtain more positive audited reviews, and complete pending KYC verification to boost your search rank index to the top 3!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    )}

  </AnimatePresence>

  {/* LEAD DETAILS MANAGEMENT DRAWER OVERLAY */ }
  <AnimatePresence>
    {selectedLead && (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-end z-55">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between text-left"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Lead details card</h4>
                <h3 className="text-base font-black text-slate-900">{selectedLead.userName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Customer contact</label>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-[11px] font-semibold text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono text-slate-900">{selectedLead.userPhone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-900">{selectedLead.userEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Date Logged:</span>
                    <span>{selectedLead.createdDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Pipeline Stage status</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['New', 'Contacted', 'Interested', 'Lost'] as Lead['status'][]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateLeadStatus(selectedLead.id, st)}
                      className={`px-2.5 py-2 text-[9px] font-extrabold rounded-lg border text-center transition-all cursor-pointer ${selectedLead.status === st
                        ? 'bg-indigo-650 border-indigo-650 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-55'
                        }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">CRM activity notes</label>
                <div className="max-h-36 overflow-y-auto space-y-1.5">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((n, idx) => (
                      <div key={idx} className="p-2 bg-indigo-50/50 border border-indigo-100 rounded-lg text-[10px] text-slate-700 leading-normal">
                        {n}
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-400 font-semibold italic">No notes logged yet.</p>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Type customer notes..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    onClick={() => handleAddLeadNote(selectedLead.id)}
                    className="px-3 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold transition-all"
                  >
                    Log
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => alert(`Sending message on WhatsApp to: ${selectedLead.userPhone}`)}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" /> <span>WhatsApp Client</span>
            </button>
            <button
              onClick={() => alert(`Dialing Voice Call to client: ${selectedLead.userPhone}`)}
              className="py-2.5 bg-slate-900 hover:bg-black text-white text-[10px] font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> <span>Call Client</span>
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>

      </main >
    </div >
  );
}
