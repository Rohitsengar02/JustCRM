'use client';

import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Business, Review } from './mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Home,
  Grid,
  Tag,
  Flame,
  Award,
  Bookmark,
  User,
  Heart,
  Settings,
  Bell,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Plus,
  ThumbsUp,
  Map,
  CheckCircle2,
  Trash2,
  Lock,
  ArrowUpRight,
  Info
} from 'lucide-react';
import Link from 'next/link';

const categoryList = [
  { name: 'Fashion & Tailors', icon: '👕', label: 'Fashion' },
  { name: 'Beauty Parlours', icon: '💄', label: 'Beauty' },
  { name: 'Electronic Goods Dealers', icon: '🎧', label: 'Electronics' },
  { name: 'Packers & Movers', icon: '📦', label: 'Relocation' },
  { name: 'Dentists', icon: '🦷', label: 'Dentists' },
  { name: 'Hotels', icon: '🏨', label: 'Hotels' },
  { name: 'Restaurants', icon: '🥗', label: 'Food' }
];

function AutoScrollCarousel({
  title,
  items,
  setInquiryBiz,
  setSelectedBiz,
  setActiveView
}: {
  title: string;
  items: Business[];
  setInquiryBiz: (b: Business) => void;
  setSelectedBiz: (b: Business) => void;
  setActiveView: (v: 'home' | 'all-businesses' | 'detail') => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    const scrollSpeed = 0.6; // Scroll speed in pixels per frame

    const scroll = () => {
      el.scrollLeft += scrollSpeed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const pause = () => cancelAnimationFrame(animationFrameId);
    const resume = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [items]);

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-extrabold text-slate-900 text-base tracking-tight">{title}</h3>
        <span className="text-[9px] bg-indigo-50 text-indigo-650 font-bold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-wider">
          Auto Scroll
        </span>
      </div>
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[...items, ...items, ...items].map((biz, idx) => (
          <div
            key={`${biz.id}-${idx}`}
            className="w-64 bg-white border border-slate-200/80 rounded-2xl p-4 shrink-0 shadow-2xs hover:shadow-xs hover:border-slate-350 transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div
                onClick={() => {
                  setSelectedBiz(biz);
                  setActiveView('detail');
                }}
                className="relative h-28 bg-slate-100 rounded-xl overflow-hidden mb-3 cursor-pointer"
              >
                <img src={biz.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={biz.name} />
                <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md font-bold text-[8px] text-slate-700 border border-slate-200 uppercase tracking-wider">
                  {biz.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl shrink-0 p-1 bg-slate-50 border border-slate-100 rounded-lg">{biz.logo}</span>
                <div className="min-w-0">
                  <h5
                    onClick={() => {
                      setSelectedBiz(biz);
                      setActiveView('detail');
                    }}
                    className="font-extrabold text-slate-800 text-[11px] truncate leading-tight hover:text-indigo-650 cursor-pointer"
                  >
                    {biz.name}
                  </h5>
                  <span className="text-[8px] text-indigo-600 font-bold block uppercase tracking-wider">{biz.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-[9px]">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{biz.rating.toFixed(1)}</span>
                <span className="text-slate-450 font-semibold">(Verified)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => setInquiryBiz(biz)}
                className="py-1.5 bg-slate-900 hover:bg-black text-white text-[9px] font-bold rounded-lg transition-all cursor-pointer"
              >
                Inquire
              </button>
              <button
                onClick={() => {
                  setSelectedBiz(biz);
                  setActiveView('detail');
                }}
                className="py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-750 text-[9px] font-bold rounded-lg transition-all cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserWebsite() {
  const { businesses, leads, setLeads, reviews, setReviews, addActivity } = useApp();

  const [searchVal, setSearchVal] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Shortlisted items (matches Cart in the reference image)
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['biz-1', 'biz-2']);

  // Modals state
  const [inquiryBiz, setInquiryBiz] = useState<Business | null>(null);
  const [reviewBiz, setReviewBiz] = useState<Business | null>(null);
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);

  // Form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const [reviewName, setReviewName] = useState('');
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Notification state for visual dropdown
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [activeView, setActiveView] = useState<'home' | 'all-businesses' | 'detail' | 'inquiry-chat' | 'signin' | 'register' | 'my-profile'>('home');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'business'; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  const [currentUser, setCurrentUser] = useState<any>(null);

  // Edit profile states
  const [profileTab, setProfileTab] = useState<'edit' | 'kyc'>('edit');
  const [editOwner, setEditOwner] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [editHours, setEditHours] = useState('');
  const [editLogo, setEditLogo] = useState('');

  // KYC States
  const [kycDocType, setKycDocType] = useState('GSTIN');
  const [kycDocNumber, setKycDocNumber] = useState('');
  const [kycFileName, setKycFileName] = useState('');
  const [kycSubmitted, setKycSubmitted] = useState(false);

  // Wizard state hooks
  const [registerStep, setRegisterStep] = useState(1);
  const [regName, setRegName] = useState('');
  const [regOwner, setRegOwner] = useState('');
  const [regCategory, setRegCategory] = useState('Packers & Movers');
  const [regAbout, setRegAbout] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regLogo, setRegLogo] = useState('🏢');
  const [regCity, setRegCity] = useState('Mumbai');
  const [regArea, setRegArea] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regHours, setRegHours] = useState('09:00 AM - 06:00 PM (Mon-Sat)');
  const [regServicesText, setRegServicesText] = useState('');

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPhone, setSignInPhone] = useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('registeredBusiness');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      setEditOwner(currentUser.owner || '');
      setEditAbout(currentUser.about || '');
      setEditHours(currentUser.businessHours || '');
      setEditLogo(currentUser.logo || '🏢');
      if (currentUser.status === 'Verified' || currentUser.status === 'Premium' || currentUser.status === 'Featured') {
        setKycSubmitted(true);
      } else {
        setKycSubmitted(false);
      }
    }
  }, [currentUser]);

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterLocality, setFilterLocality] = useState<string>('All');
  const [filterRating, setFilterRating] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const allFilteredBusinesses = businesses.filter((b) => {
    const matchesCategory = filterCategory === 'All' || b.category === filterCategory;
    const matchesLocality = filterLocality === 'All' || b.location.city === filterLocality;
    const matchesRating = b.rating >= filterRating;
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      b.category.toLowerCase().includes(searchVal.toLowerCase()) ||
      b.about.toLowerCase().includes(searchVal.toLowerCase());

    return matchesCategory && matchesLocality && matchesRating && matchesStatus && matchesSearch;
  });

  const carouselSlides = [
    {
      subtitle: "Packers & Movers Official",
      title: "SAFE & TRUSTED HOUSE SHIFTING SERVICES",
      offer: "Flat 25% Off - Shop Movers Today",
      buttonText: "Inquire Now",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      categoryLink: "Packers & Movers",
      tag: "Relocation Official"
    },
    {
      subtitle: "Apex Medical Care",
      title: "PREMIUM ROOT CANAL & LASER TREATMENTS",
      offer: "Free First Oral Consultation",
      buttonText: "Schedule Visit",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
      categoryLink: "Dentists",
      tag: "Dental Official"
    },
    {
      subtitle: "Rajputana Grand Resorts",
      title: "LUXURIOUS PALACE STAY & ROOFTOP DINING",
      offer: "Get 1 Complimentary Spa Massage",
      buttonText: "Reserve Room",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      categoryLink: "Hotels",
      tag: "Heritage Official"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter logic
  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      b.category.toLowerCase().includes(searchVal.toLowerCase()) ||
      b.about.toLowerCase().includes(searchVal.toLowerCase());

    const matchesCity = cityFilter === 'All' || b.location.city === cityFilter;
    const matchesCategory = !selectedCategory || b.category === selectedCategory;

    return matchesSearch && matchesCity && matchesCategory;
  });

  const toggleShortlist = (id: string) => {
    setShortlistedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryBiz) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      userName: inquiryName,
      userPhone: inquiryPhone,
      userEmail: inquiryEmail,
      businessId: inquiryBiz.id,
      businessName: inquiryBiz.name,
      category: inquiryBiz.category,
      source: 'Web Search' as const,
      status: 'New' as const,
      createdDate: new Date().toISOString().split('T')[0],
      callLogs: [],
      notes: inquiryNote ? [inquiryNote] : [],
      followUps: []
    };

    setLeads(prev => [newLead, ...prev]);
    addActivity(`New public inquiry submitted by ${inquiryName} for ${inquiryBiz.name}`, 'lead');

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
      setInquiryNote('');
      setInquiryBiz(null);
    }, 1800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBiz) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      businessId: reviewBiz.id,
      businessName: reviewBiz.name,
      userName: reviewName,
      rating: reviewStars,
      content: reviewContent,
      status: 'Pending' as const,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newReview, ...prev]);
    addActivity(`New review left by ${reviewName} for ${reviewBiz.name} (Pending Moderation)`, 'review');

    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewName('');
      setReviewStars(5);
      setReviewContent('');
      setReviewBiz(null);
    }, 1800);
  };

  const handleBulkInquiry = () => {
    if (shortlistedIds.length === 0) return;
    alert(`Inquiry sent to all ${shortlistedIds.length} shortlisted businesses! Our partners will contact you.`);
    setShortlistedIds([]);
  };

  const handleInquireClick = (biz: Business) => {
    setInquiryBiz(biz);
    setChatMessages([
      {
        sender: 'business',
        text: `Hello! Thank you for reaching out to ${biz.name}. How can we help you with our ${biz.category} services today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setActiveView('inquiry-chat');
  };

  const shortlistedBusinesses = businesses.filter(b => shortlistedIds.includes(b.id));

  const renderAllBusinesses = () => {
    return (
      <div className="space-y-6 text-left">
        {/* Beautiful Top Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-[24px] p-8 md:p-12 shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[9px] bg-white/10 text-orange-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5" /> Verified Directory Search
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Browse All <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-450 to-amber-300">Premium & Verified</span><br />
              Local Services & Businesses
            </h1>
            <p className="text-xs text-slate-300 font-semibold leading-relaxed max-w-lg">
              Find background checked partners, active local offices, root canal dentists, budget hotels, and local packers & movers with verified customer reviews.
            </p>
          </div>
          <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shrink-0 w-full md:w-72 space-y-3">
            <h4 className="text-xs font-black uppercase text-orange-400 tracking-wider">Direct Connect Promise</h4>
            <ul className="text-[10px] text-slate-200 space-y-2 font-medium">
              <li className="flex items-center gap-2">🛡️ 100% Agent Audited</li>
              <li className="flex items-center gap-2">⚡ 0% Middleman Commission</li>
              <li className="flex items-center gap-2">📞 Direct Contact Info</li>
            </ul>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Filter */}
          <aside className="w-full lg:w-72 bg-white border border-slate-200 rounded-[20px] p-5 shrink-0 shadow-2xs self-start space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </h3>
              <button
                onClick={() => {
                  setFilterCategory('All');
                  setFilterLocality('All');
                  setFilterRating(0);
                  setFilterStatus('All');
                }}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-650 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Filter by Category */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-650 text-slate-800 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Packers & Movers">Packers & Movers</option>
                <option value="Dentists">Dentists</option>
                <option value="Hotels">Hotels</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Electronic Goods Dealers">Electronic Goods Dealers</option>
                <option value="Courier Services">Courier Services</option>
                <option value="Beauty Parlours">Beauty Parlours</option>
                <option value="Gyms & Fitness">Gyms & Fitness</option>
              </select>
            </div>

            {/* Filter by Region */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Region / City</label>
              <select
                value={filterLocality}
                onChange={(e) => setFilterLocality(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-650 text-slate-800 cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            {/* Filter by Star Rating */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Minimum Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-650 text-slate-800 cursor-pointer"
              >
                <option value="0">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4.0+ Stars</option>
                <option value="3">3.0+ Stars</option>
              </select>
            </div>

            {/* Filter by Listing Status */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Verification Level</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-650 text-slate-800 cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="Premium">Premium Partners</option>
                <option value="Featured">Featured</option>
                <option value="Verified">Verified Listings</option>
              </select>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl space-y-2">
              <h5 className="text-[10px] font-black text-indigo-900 uppercase">Search Keywords</h5>
              <p className="text-[9px] text-indigo-700 font-semibold leading-relaxed">
                Use the search bar in the top navbar to filter results instantly by name, keywords, or description.
              </p>
            </div>
          </aside>

          {/* Main Grid showing all business cards */}
          <div className="flex-1 space-y-5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                Showing {allFilteredBusinesses.length} verified results
              </span>
            </div>

            {allFilteredBusinesses.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-[20px] p-12 text-center space-y-4">
                <span className="text-5xl block select-none">🔍</span>
                <h4 className="font-extrabold text-slate-800 text-base">No matching listings found</h4>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any business matching your current filter criteria. Try resetting or selecting a different city.
                </p>
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setFilterLocality('All');
                    setFilterRating(0);
                    setFilterStatus('All');
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  Reset Filter Parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allFilteredBusinesses.map((biz) => {
                  const isShortlisted = shortlistedIds.includes(biz.id);
                  return (
                    <div
                      key={biz.id}
                      className="bg-white border border-slate-200/85 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-350 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Cover Image */}
                        <div className="relative h-40 bg-slate-100 overflow-hidden">
                          <img
                            src={biz.images[0] || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600'}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            alt={biz.name}
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md font-bold text-[8px] text-indigo-700 border border-slate-200 uppercase tracking-wider">
                              {biz.status}
                            </span>
                            {biz.subscription === 'Platinum' && (
                              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-md font-extrabold text-[8px] uppercase tracking-wider shadow-xs">
                                Pro
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => toggleShortlist(biz.id)}
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/95 text-slate-400 hover:text-rose-500 border border-slate-200 transition-all cursor-pointer shadow-3xs"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl p-1 bg-slate-50 border border-slate-150 rounded-xl shrink-0">{biz.logo}</span>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-slate-800 text-xs truncate leading-tight hover:text-indigo-650 cursor-pointer" onClick={() => {
                                setSelectedBiz(biz);
                                setActiveView('detail');
                              }}>
                                {biz.name}
                              </h4>
                              <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5">{biz.category}</p>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-semibold">
                            {biz.about}
                          </p>

                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pt-1">
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>{biz.rating.toFixed(1)}</span>
                              <span className="text-slate-400 font-medium">(Verified)</span>
                            </div>
                            <span className="text-slate-700 font-semibold">{biz.location.city}, {biz.location.area}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 p-4 border-t border-slate-100 bg-slate-50/50">
                        <button
                          onClick={() => handleInquireClick(biz)}
                          className="py-2 bg-slate-900 hover:bg-black text-white text-[9px] font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                        >
                          Send Inquiry
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBiz(biz);
                            setActiveView('detail');
                          }}
                          className="py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-770 text-[9px] font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderBusinessDetail = () => {
    if (!selectedBiz) {
      return (
        <div className="text-center py-12">
          <p className="text-xs text-slate-500 font-bold">No business selected.</p>
          <button onClick={() => setActiveView('all-businesses')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs">
            Back to Directory
          </button>
        </div>
      );
    }

    const businessReviews = reviews.filter(r => r.businessId === selectedBiz.id && r.status === 'Approved');

    return (
      <div className="space-y-6 text-left">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={() => setActiveView('all-businesses')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-750 hover:bg-slate-50 transition-all shadow-3xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
            <span>Back to All Businesses</span>
          </button>
        </div>

        {/* Business Cover Banner */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[24px] border border-slate-200 shadow-sm h-64 md:h-80">
          <img
            src={selectedBiz.images[0] || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200'}
            className="w-full h-full object-cover opacity-65"
            alt={selectedBiz.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

          {/* Details Overlay on Cover */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-6xl p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md">
                {selectedBiz.logo}
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-orange-500 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider">
                    {selectedBiz.status}
                  </span>
                  <span className="bg-indigo-600 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider">
                    {selectedBiz.subscription} Partner
                  </span>
                </div>
                <h1 className="text-xl md:text-3xl font-black leading-tight tracking-tight text-white">{selectedBiz.name}</h1>
                <p className="text-[10px] text-indigo-350 font-extrabold uppercase tracking-widest">{selectedBiz.category} • Verified Member</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 bg-black/35 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <div className="text-center">
                <span className="block text-xl font-black text-amber-400">{selectedBiz.rating.toFixed(1)}</span>
                <span className="text-[8px] text-slate-300 font-bold uppercase">Audited Score</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-[8px] text-slate-400 font-semibold mt-1 block">Based on live audits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Main Content Block */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview / About */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-6 text-left shadow-2xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight pb-3.5 border-b border-slate-100 font-sans">About Business</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {selectedBiz.about}
              </p>
              <div className="pt-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Registered Corporate Owner</h4>
                <p className="text-xs font-bold text-slate-800">{selectedBiz.owner}</p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-6 text-left shadow-2xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight pb-3.5 border-b border-slate-100 font-sans">Core Services & Specialties</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(selectedBiz.services || []).map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 bg-slate-55 border border-slate-150 rounded-xl text-xs font-bold text-slate-750">
                    <span className="text-indigo-650 font-bold">✓</span>
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-6 text-left shadow-2xs space-y-5">
              <div className="flex justify-between items-center pb-3.5 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Verified Customer Reviews</h3>
                <button
                  onClick={() => setReviewBiz(selectedBiz)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-extrabold rounded-lg transition-all cursor-pointer shadow-3xs"
                >
                  Write Review
                </button>
              </div>

              {businessReviews.length === 0 ? (
                <div className="text-center py-6 text-slate-450 space-y-2">
                  <span className="text-3xl block select-none">✍️</span>
                  <p className="text-[10px] font-bold">No verified reviews for this business listing yet.</p>
                  <p className="text-[9px] text-slate-400">Be the first to share your customer booking experience with other users.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {businessReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h5 className="text-[11px] font-extrabold text-slate-800">{rev.userName}</h5>
                          <span className="text-[8px] text-slate-455 block">{rev.createdDate}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                        {rev.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column / Sidebar for Quick Contact */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[20px] p-6 text-left shadow-2xs space-y-5">
              <h3 className="font-extrabold text-slate-905 text-base tracking-tight pb-3.5 border-b border-slate-100">Contact Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-650 rounded-xl mt-0.5 shrink-0">📞</span>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone number</h5>
                    <p className="text-xs font-black text-slate-850">{selectedBiz.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-650 rounded-xl mt-0.5 shrink-0">✉️</span>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Address</h5>
                    <p className="text-xs font-bold text-slate-850 truncate max-w-[190px]">{selectedBiz.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-650 rounded-xl mt-0.5 shrink-0">📍</span>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Office Address</h5>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed">{selectedBiz.location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-indigo-50 border border-indigo-100 text-indigo-650 rounded-xl mt-0.5 shrink-0">🕒</span>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Business Hours</h5>
                    <p className="text-xs font-bold text-slate-800">{selectedBiz.businessHours}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-3.5 border-t border-slate-100">
                <button
                  onClick={() => handleInquireClick(selectedBiz)}
                  className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all cursor-pointer text-center block shadow-sm"
                >
                  Send Inquiry Now
                </button>
                <button
                  onClick={() => toggleShortlist(selectedBiz.id)}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center block shadow-3xs"
                >
                  {shortlistedIds.includes(selectedBiz.id) ? 'Remove Shortlist' : 'Add to Shortlist'}
                </button>
              </div>
            </div>

            {/* Claim Business Listing Widget */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-[20px] p-5 text-left shadow-2xs space-y-3 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 text-6xl select-none opacity-20 pointer-events-none">⚡</div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Is this your business?</h4>
              <p className="text-[9px] text-orange-50 font-semibold leading-relaxed">
                Claim this verified listing to manage services, upload photos, reply to customer reviews, and receive hot phone leads instantly.
              </p>
              <button
                onClick={() => alert("Verification portal coming soon! Keep business documents ready.")}
                className="w-full py-2 bg-white hover:bg-slate-50 text-orange-700 text-[10px] font-black rounded-xl transition-all cursor-pointer shadow-3xs"
              >
                Claim Listing Now
              </button>
            </div>

            {/* Similar Businesses Comparer */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 text-left shadow-2xs space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider pb-2 border-b border-slate-100">
                Similar Businesses
              </h4>
              <div className="space-y-3">
                {businesses
                  .filter(b => b.category === selectedBiz.category && b.id !== selectedBiz.id)
                  .slice(0, 2)
                  .map(ob => (
                    <div
                      key={ob.id}
                      onClick={() => setSelectedBiz(ob)}
                      className="flex items-center gap-3 p-2 hover:bg-slate-55 border border-transparent hover:border-slate-150 rounded-xl transition-all cursor-pointer"
                    >
                      <span className="text-2xl p-1 bg-slate-50 border border-slate-200 rounded-lg shrink-0">
                        {ob.logo}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[10px] font-extrabold text-slate-800 truncate leading-tight">
                          {ob.name}
                        </h5>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[8px]">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            <span>{ob.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[8px] text-slate-400 font-semibold">
                            • {ob.location.city}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  ))}
                {businesses.filter(b => b.category === selectedBiz.category && b.id !== selectedBiz.id).length === 0 && (
                  <p className="text-[9px] text-slate-400 font-semibold italic">No other listings in this category.</p>
                )}
              </div>
            </div>

            {/* Safe Booking Guidelines */}
            <div className="bg-slate-900 text-white rounded-[20px] p-5 text-left shadow-2xs space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-orange-400">Direct Connect Safety</h4>
              <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">
                Never pay upfront commissions to any intermediary. Meganods local searches are directly routed to the verified service providers listed above.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInquiryChat = () => {
    if (!inquiryBiz) return null;

    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatInput.trim()) return;

      const userMsg = {
        sender: 'user' as const,
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, userMsg]);
      const tempInput = chatInput;
      setChatInput('');

      // Auto response generator after 1 second
      setTimeout(() => {
        let replyText = `Thank you for your message. An executive from ${inquiryBiz.name} will contact you shortly at your registered number.`;
        if (inquiryBiz.category === 'Packers & Movers') {
          replyText = `Thanks for inquiring with ${inquiryBiz.name}! We specialize in local and domestic shifting. Could you share your tentative moving date and city route?`;
        } else if (inquiryBiz.category === 'Dentists') {
          replyText = `Thank you! We can schedule a clinic checkup slot for you. Do you prefer a morning appointment or an evening appointment?`;
        } else if (inquiryBiz.category === 'Hotels') {
          replyText = `Thank you for reaching out! We have luxury rooms and suites available for booking. Could you share your check-in date and number of guests?`;
        } else if (inquiryBiz.category === 'Restaurants') {
          replyText = `Hi! Thanks for checking in with our cafe/restaurant. We can block a table or arrange bulk delivery. What details can I help you with?`;
        }

        const bizMsg = {
          sender: 'business' as const,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, bizMsg]);
      }, 1000);
    };

    return (
      <div className="space-y-6 text-left">
        {/* Header navigation back */}
        <div className="flex items-center">
          <button
            onClick={() => setActiveView('all-businesses')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-750 hover:bg-slate-50 transition-all shadow-3xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Listings</span>
          </button>
        </div>

        {/* Dynamic inquiry portal layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Business details overview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs space-y-5 text-left">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-indigo-50 border border-indigo-100 rounded-xl">
                  {inquiryBiz.logo}
                </span>
                <div>
                  <span className="inline-block text-[8px] bg-orange-100 text-orange-700 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {inquiryBiz.status}
                  </span>
                  <h3 className="font-black text-slate-855 text-base leading-tight mt-1">{inquiryBiz.name}</h3>
                  <p className="text-[9px] text-indigo-650 font-bold uppercase tracking-wider">{inquiryBiz.category}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Contact details</h4>
                <div className="text-[11px] font-semibold text-slate-655 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📞</span>
                    <span>{inquiryBiz.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">✉️</span>
                    <span className="truncate block max-w-[190px]">{inquiryBiz.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📍</span>
                    <span>{inquiryBiz.location.city}, {inquiryBiz.location.area}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Operating Hours</h4>
                <p className="text-[11px] font-bold text-slate-800">{inquiryBiz.businessHours}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-55 text-[10px] font-semibold text-indigo-850 leading-relaxed">
                🛡️ Your inquiry is fully verified and routed directly. Chat instantly or make a direct call above.
              </div>
            </div>
          </div>

          {/* Right Columns: Live Chat Screen */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] shadow-2xs flex flex-col h-[520px] overflow-hidden">
            {/* Chat header */}
            <div className="bg-slate-900 text-white p-4.5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1 bg-white/10 rounded-lg">{inquiryBiz.logo}</span>
                <div>
                  <h4 className="text-xs font-black text-white">{inquiryBiz.name}</h4>
                  <span className="text-[8px] text-emerald-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Online Now
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert(`Directly calling provider hotline: ${inquiryBiz.phone}`)}
                className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-extrabold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>📞 Call Hotline</span>
              </button>
            </div>

            {/* Message screen */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-[20px] shadow-3xs text-[11px] leading-relaxed font-semibold ${msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[7px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex gap-2 shrink-0">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your inquiry details here (e.g. request quote, schedule appointment)..."
                className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-800"
              />
              <button
                type="submit"
                className="px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center cursor-pointer transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderRegisterWizard = () => {
    const handleNext = () => {
      if (registerStep === 1 && (!regName.trim() || !regOwner.trim() || !regAbout.trim())) {
        alert("Please fill in all basic details.");
        return;
      }
      if (registerStep === 2 && (!regPhone.trim() || !regEmail.trim())) {
        alert("Please fill in contact details.");
        return;
      }
      if (registerStep === 3 && (!regArea.trim() || !regAddress.trim())) {
        alert("Please fill in location details.");
        return;
      }
      setRegisterStep(prev => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
      setRegisterStep(prev => Math.max(prev - 1, 1));
    };

    const handleCreateProfile = () => {
      if (!regServicesText.trim()) {
        alert("Please add at least one core service.");
        return;
      }

      const servicesArray = regServicesText.split(',').map(s => s.trim()).filter(Boolean);

      const newBiz: Business = {
        id: `biz-user-${Date.now()}`,
        name: regName,
        owner: regOwner,
        email: regEmail,
        phone: regPhone,
        category: regCategory,
        location: {
          city: regCity,
          area: regArea,
          locality: regArea,
          address: regAddress
        },
        status: 'Premium',
        subscription: 'Platinum',
        rating: 5.0,
        leadsCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        logo: regLogo,
        images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'],
        about: regAbout,
        services: servicesArray,
        products: ['Premium Care Services'],
        businessHours: regHours,
        revenue: 0,
        ratingAnalytics: { stars5: 1, stars4: 0, stars3: 0, stars2: 0, stars1: 0 }
      };

      // Add to global context
      businesses.unshift(newBiz);

      // Save to localStorage
      localStorage.setItem('registeredBusiness', JSON.stringify(newBiz));
      setCurrentUser(newBiz);

      alert(`Congratulations! ${regName} profile has been created successfully!`);

      // Clear inputs
      setRegName('');
      setRegOwner('');
      setRegAbout('');
      setRegPhone('');
      setRegEmail('');
      setRegArea('');
      setRegAddress('');
      setRegServicesText('');

      setActiveView('home');
    };

    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-[24px] p-8 shadow-md text-left space-y-6">
        <div className="space-y-2">
          <span className="text-[9px] bg-indigo-50 text-indigo-650 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Partner Registration Wizard
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Create your Business Profile</h2>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Fill in the 4 simple steps below to register your company and start generating direct consumer hot leads.
          </p>
        </div>

        {/* Steps Progress Header */}
        <div className="grid grid-cols-4 gap-2 border-b border-slate-100 pb-5">
          {[
            { num: 1, label: "Basic Info" },
            { num: 2, label: "Contact Details" },
            { num: 3, label: "Location details" },
            { num: 4, label: "Services Offered" }
          ].map((s) => (
            <div key={s.num} className="space-y-2">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${registerStep >= s.num ? 'bg-indigo-600' : 'bg-slate-100'}`} />
              <div className="hidden sm:block">
                <span className={`block text-[9px] font-black uppercase tracking-wider ${registerStep >= s.num ? 'text-indigo-600' : 'text-slate-400'}`}>
                  Step {s.num}
                </span>
                <span className={`block text-[10px] font-bold truncate ${registerStep >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Wizard Form Screens */}
        <div className="min-h-[220px]">
          {registerStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Name</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Imperial Movers"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Owner Name</label>
                  <input
                    type="text"
                    value={regOwner}
                    onChange={(e) => setRegOwner(e.target.value)}
                    placeholder="e.g. Digvijay Sen"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Primary Category</label>
                <select
                  value={regCategory}
                  onChange={(e) => setRegCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600 text-slate-850 cursor-pointer"
                >
                  <option value="Packers & Movers">Packers & Movers</option>
                  <option value="Dentists">Dentists</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Restaurants">Restaurants</option>
                  <option value="Electronic Goods Dealers">Electronic Goods Dealers</option>
                  <option value="Courier Services">Courier Services</option>
                  <option value="Beauty Parlours">Beauty Parlours</option>
                  <option value="Gyms & Fitness">Gyms & Fitness</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">About Business / Description</label>
                <textarea
                  rows={3}
                  value={regAbout}
                  onChange={(e) => setRegAbout(e.target.value)}
                  placeholder="Detail your company, specialization, years of experience..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850 leading-relaxed"
                />
              </div>
            </div>
          )}

          {registerStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Phone number</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="e.g. +91 99999 88888"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. contact@imperialmovers.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Select Brand Profile Logo Emoji</label>
                <div className="flex gap-3 mt-1.5 flex-wrap">
                  {['📦', '🦷', '🏨', '🥗', '🔌', '🚚', '💄', '🏋️‍♂️', '🏢', '🛠️'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setRegLogo(emoji)}
                      className={`text-2xl p-2.5 rounded-xl border transition-all cursor-pointer ${regLogo === emoji ? 'bg-indigo-50 border-indigo-500 scale-110 shadow-3xs' : 'bg-slate-50 border-slate-200 hover:border-slate-350'
                        }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {registerStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">City</label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600 text-slate-850 cursor-pointer"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Area / Locality</label>
                  <input
                    type="text"
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    placeholder="e.g. Andheri East"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Full Office Address</label>
                <textarea
                  rows={2}
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="e.g. Shop 2, Ground Floor, Sai Complex, Andheri East, Mumbai - 400059"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850 leading-relaxed"
                />
              </div>
            </div>
          )}

          {registerStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Operating Business Hours</label>
                <input
                  type="text"
                  value={regHours}
                  onChange={(e) => setRegHours(e.target.value)}
                  placeholder="e.g. 09:00 AM - 08:00 PM (Mon-Sun)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Core Services Offered (Comma Separated)</label>
                <textarea
                  rows={3}
                  value={regServicesText}
                  onChange={(e) => setRegServicesText(e.target.value)}
                  placeholder="e.g. Local House Shifting, Warehouse Packing, Office Relocations, GPS Vehicle Shifting"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850 leading-relaxed"
                />
                <span className="text-[9px] text-slate-400 font-bold block pt-1">
                  Separate each specialty with a comma to display clean checkboxes on your detailed page.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Controls */}
        <div className="flex justify-between items-center border-t border-slate-100 pt-5">
          {registerStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Back Step
            </button>
          ) : (
            <button
              onClick={() => setActiveView('home')}
              className="px-5 py-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          )}

          {registerStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleCreateProfile}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Create Business Profile 🚀
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderSignIn = () => {
    const handleSignInSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!signInEmail.trim() || !signInPhone.trim()) {
        alert("Please fill in email and phone details.");
        return;
      }

      // Check in mock db (businesses array) or local storage
      const existing = businesses.find(
        (b) => b.email.toLowerCase() === signInEmail.toLowerCase() && b.phone.includes(signInPhone.trim())
      );

      if (existing) {
        localStorage.setItem('registeredBusiness', JSON.stringify(existing));
        setCurrentUser(existing);
        alert(`Welcome back! Logged in as ${existing.name}`);
        setSignInEmail('');
        setSignInPhone('');
        setActiveView('home');
      } else {
        alert("Business profile not found. Please match email/phone with any verified partner or register a new business.");
      }
    };

    return (
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-[24px] p-8 shadow-md text-left space-y-6">
        <div className="space-y-1.5 text-center">
          <span className="text-[9px] bg-indigo-50 text-indigo-650 font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Member Console Access
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">Sign In to Business Console</h2>
          <p className="text-xs text-slate-500 font-semibold max-w-xs mx-auto">
            Access phone leads console logs and customer reviews dashboard.
          </p>
        </div>

        <form onSubmit={handleSignInSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Registered Email Address</label>
            <input
              type="email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              placeholder="e.g. contact@apexdental.in"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Owner Phone Number</label>
            <input
              type="text"
              value={signInPhone}
              onChange={(e) => setSignInPhone(e.target.value)}
              placeholder="e.g. 91234 56789"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm text-center block"
          >
            Access My Dashboard
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-500">
          Don't have a corporate listing yet?{' '}
          <button
            onClick={() => {
              setRegisterStep(1);
              setActiveView('register');
            }}
            className="text-indigo-650 hover:underline font-bold"
          >
            Register Business
          </button>
        </div>
      </div>
    );
  };

  const renderMyProfile = () => {
    if (!currentUser) return null;

    const handleSaveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editOwner.trim() || !editAbout.trim() || !editHours.trim()) {
        alert("Please fill in all details.");
        return;
      }

      const updatedUser = {
        ...currentUser,
        owner: editOwner,
        about: editAbout,
        businessHours: editHours,
        logo: editLogo
      };

      // Update in database listings
      const idx = businesses.findIndex(b => b.id === currentUser.id);
      if (idx !== -1) {
        businesses[idx] = {
          ...businesses[idx],
          owner: editOwner,
          about: editAbout,
          businessHours: editHours,
          logo: editLogo
        };
      }

      // Update in localStorage
      localStorage.setItem('registeredBusiness', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      alert("Business details updated successfully!");
    };

    const handleKycSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!kycDocNumber.trim()) {
        alert("Please enter a valid document ID number.");
        return;
      }

      const updatedUser = {
        ...currentUser,
        status: 'Verified' as const
      };

      // Update status in list
      const idx = businesses.findIndex(b => b.id === currentUser.id);
      if (idx !== -1) {
        businesses[idx].status = 'Verified';
      }

      localStorage.setItem('registeredBusiness', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setKycSubmitted(true);

      alert(`KYC Submission Successful! ${currentUser.name} listing is now verified.`);
    };

    return (
      <div className="space-y-6 text-left">
        {/* Back navigation */}
        <div className="flex items-center">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-750 hover:bg-slate-50 transition-all shadow-3xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Homepage</span>
          </button>
        </div>

        {/* Profile Cover Banner */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[24px] border border-slate-200 shadow-sm h-48 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 z-10" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Details Overlay on Cover */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md select-none">
                {currentUser.logo || '🏢'}
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentUser.status === 'Verified' || currentUser.status === 'Premium' || currentUser.status === 'Featured' ? (
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      🛡️ KYC Verified
                    </span>
                  ) : (
                    <span className="bg-amber-500 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      ⚠️ KYC Pending
                    </span>
                  )}
                  <span className="bg-white/10 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider border border-white/10">
                    {currentUser.subscription || 'Free'} Partner
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-white">{currentUser.name}</h1>
                <p className="text-[10px] text-indigo-350 font-extrabold uppercase tracking-widest">{currentUser.category} • Corporate Account</p>
              </div>
            </div>

            {/* Go to Business Panel Action Button */}
            <div className="shrink-0">
              <Link
                href="/business-panel"
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-indigo-900/30 hover:scale-102 cursor-pointer border border-indigo-500/30"
              >
                <span>Go to Business Panel</span>
                <span className="text-sm">⚡</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form & settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-2xs space-y-6">
              {/* Tab Selector */}
              <div className="flex gap-2 border-b border-slate-100 pb-3">
                <button
                  onClick={() => setProfileTab('edit')}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${profileTab === 'edit' ? 'bg-indigo-50 text-indigo-650' : 'text-slate-500 hover:bg-slate-55'
                    }`}
                >
                  General Settings
                </button>
                <button
                  onClick={() => setProfileTab('kyc')}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${profileTab === 'kyc' ? 'bg-indigo-50 text-indigo-650' : 'text-slate-500 hover:bg-slate-55'
                    }`}
                >
                  KYC Verification
                </button>
              </div>

              {profileTab === 'edit' ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Owner / Manager Name</label>
                      <input
                        type="text"
                        value={editOwner}
                        onChange={(e) => setEditOwner(e.target.value)}
                        placeholder="e.g. Digvijay Sen"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Operating Hours</label>
                      <input
                        type="text"
                        value={editHours}
                        onChange={(e) => setEditHours(e.target.value)}
                        placeholder="e.g. 09:00 AM - 08:00 PM (Mon-Sun)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Brand Logo Emoji</label>
                    <div className="flex gap-2.5 mt-1.5 flex-wrap">
                      {['📦', '🦷', '🏨', '🥗', '🔌', '🚚', '💄', '🏋️‍♂️', '🏢', '🛠️'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setEditLogo(emoji)}
                          className={`text-xl p-2 rounded-xl border transition-all cursor-pointer ${editLogo === emoji ? 'bg-indigo-50 border-indigo-500 scale-105' : 'bg-slate-55 border-slate-200 hover:border-slate-350'
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">About Description</label>
                    <textarea
                      rows={4}
                      value={editAbout}
                      onChange={(e) => setEditAbout(e.target.value)}
                      placeholder="Detail description..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-850 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Save Profile Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  {kycSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-4 text-center">
                      <span className="text-4xl block select-none">🛡️</span>
                      <h4 className="font-extrabold text-emerald-800 text-base">KYC Verification Completed</h4>
                      <p className="text-[11px] text-emerald-700 font-semibold max-w-md mx-auto leading-relaxed">
                        Your business profile has been verified by our compliance department. Your listing now features a blue verified checkmark badge on search and home feeds.
                      </p>
                      <div className="text-[10px] font-bold text-emerald-900 bg-emerald-100/50 inline-block px-3.5 py-1.5 rounded-lg">
                        Document Type: {kycDocType} (Audited)
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleKycSubmit} className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-[10px] font-semibold text-amber-850 leading-relaxed">
                        ⚠️ **KYC Required**: Submit business registration documents to receive the verified partner badge and get highlighted at the top of local directory searches.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Document Type</label>
                          <select
                            value={kycDocType}
                            onChange={(e) => setKycDocType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600 text-slate-850 cursor-pointer"
                          >
                            <option value="GSTIN">GST Registration Certificate</option>
                            <option value="PAN">PAN Card of Business</option>
                            <option value="Aadhaar">Aadhaar Card of Owner</option>
                            <option value="License">Municipal Trade License</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Document Registration Number</label>
                          <input
                            type="text"
                            value={kycDocNumber}
                            onChange={(e) => setKycDocNumber(e.target.value)}
                            placeholder="e.g. 27AAAAA1111A1Z1"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-855"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Upload Verification Copy</label>
                        <div
                          onClick={() => setKycFileName(`${kycDocType.toLowerCase()}_copy_draft.pdf`)}
                          className="border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 p-6 rounded-2xl text-center cursor-pointer transition-all space-y-1"
                        >
                          <span className="text-2xl block select-none">📄</span>
                          {kycFileName ? (
                            <span className="text-[10px] font-bold text-indigo-650 block">{kycFileName} selected</span>
                          ) : (
                            <>
                              <span className="text-[10px] font-bold text-slate-700 block">Click here to attach document file</span>
                              <span className="text-[8px] text-slate-400 font-semibold block">Supports PDF, JPG, PNG (Max 5MB)</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        Submit KYC Documents
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Statistics & Completeness */}
          <div className="space-y-6">
            {/* Completeness Indicator */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4 text-left">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Profile Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>Profile Strength</span>
                  <span className="text-indigo-655 font-black">{kycSubmitted ? '100% Complete' : '75% Complete'}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-550 ${kycSubmitted ? 'bg-emerald-555 bg-emerald-600 w-full' : 'bg-indigo-600 w-3/4'}`} />
                </div>
                {!kycSubmitted && (
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                    Complete your KYC Verification to unlock verified status and get highlighted in directory search.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4 text-left">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Leads Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl text-center space-y-1">
                  <span className="text-slate-400 text-[8px] font-black uppercase tracking-wider block">Leads count</span>
                  <span className="text-lg font-black text-slate-800">0</span>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl text-center space-y-1">
                  <span className="text-slate-400 text-[8px] font-black uppercase tracking-wider block">Feedback score</span>
                  <span className="text-lg font-black text-slate-800">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans" style={{ zoom: 1.3 }}>

      {/* MAIN CONTENT PORTAL (Now occupies full screen width without left/right sidebars) */}
      <main className="max-w-7xl mx-auto w-full px-[15px] py-6 space-y-6">

        {/* Top Header Navbar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4.5 rounded-[24px] border border-slate-200/80 shadow-2xs">
          {/* Logo / Brand on Left */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-indigo-150">
              M
            </div>
            <span className="font-extrabold text-slate-905 text-lg tracking-tight">Meganods</span>
          </div>

          {/* Navigation view toggle buttons */}
          <div className="flex gap-2 bg-slate-55 p-1 rounded-xl border border-slate-200/60 shrink-0">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeView === 'home' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('all-businesses')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeView === 'all-businesses' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              All Businesses
            </button>
          </div>

          <div className="relative flex-1 max-w-xl">
            <Search className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 w-4 h-4 my-auto shrink-0" />
            <input
              type="text"
              placeholder="Search for local services, clinics, verified hotels..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-250 rounded-2xl text-xs font-semibold focus:outline-none focus:border-indigo-600 text-black"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> Locality:</span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer text-slate-750"
              >
                <option value="All">All Regions</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-slate-50 rounded-full border border-slate-200 text-slate-650 hover:text-rose-500 transition-all cursor-pointer relative">
                <Heart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-slate-50 rounded-full border border-slate-200 text-slate-650 hover:text-indigo-600 transition-all cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-650 text-white text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                  <div className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-all" onClick={() => setActiveView('my-profile')}>
                    <span className="text-xl p-1.5 bg-slate-50 border border-slate-150 rounded-xl shrink-0 select-none">
                      {currentUser.logo || '🏢'}
                    </span>
                    <div className="hidden sm:block text-left">
                      <p className="text-[10px] font-bold text-slate-900 leading-tight truncate max-w-[85px]">{currentUser.name}</p>
                      <p className="text-[8px] text-slate-400 font-semibold truncate max-w-[85px]">{currentUser.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('registeredBusiness');
                      setCurrentUser(null);
                      alert("Signed out successfully!");
                    }}
                    className="ml-1.5 text-[8px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-655 font-bold px-2 py-1 rounded-lg cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                  <button
                    onClick={() => setActiveView('signin')}
                    className="px-2.5 py-1.5 bg-slate-55 hover:bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setRegisterStep(1);
                      setActiveView('register');
                    }}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activeView === 'home' && (
          <>
            {/* Besa Style Hero Section (Category Sidebar + Interactive Carousel) */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Categories Sidebar (Departments) */}
              <div className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl overflow-hidden shrink-0 shadow-2xs self-start">
                <div className="bg-slate-900 text-white font-extrabold text-xs px-4 py-3.5 uppercase tracking-wider flex items-center gap-2">
                  <Grid className="w-4 h-4 text-orange-500" />
                  <span>All Categories</span>
                </div>
                <nav className="divide-y divide-slate-100 text-xs font-semibold text-slate-650">
                  {categoryList.map((cat) => {
                    const isActive = filterCategory === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setFilterCategory(cat.name);
                          setActiveView('all-businesses');
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-all text-left ${isActive ? 'bg-orange-55 text-orange-600 font-bold border-l-2 border-orange-500' : 'text-slate-700'
                          }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    );
                  })}
                  {/* Extra departments to make it feel full like Besa */}
                  <button
                    onClick={() => {
                      setFilterCategory('Courier Services');
                      setActiveView('all-businesses');
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-55 transition-all text-left text-slate-400 italic"
                  >
                    <span className="flex items-center gap-2.5"><span>🚚</span><span>Courier & Cargo</span></span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                  <button
                    onClick={() => {
                      setFilterCategory('Beauty Parlours');
                      setActiveView('all-businesses');
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-55 transition-all text-left text-slate-400 italic"
                  >
                    <span className="flex items-center gap-2.5"><span>💇‍♀️</span><span>Beauty & Spas</span></span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                  <button
                    onClick={() => {
                      setFilterCategory('Gyms & Fitness');
                      setActiveView('all-businesses');
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-55 transition-all text-left text-slate-400 italic"
                  >
                    <span className="flex items-center gap-2.5"><span>🏋️‍♂️</span><span>Gyms & Fitness</span></span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                </nav>
              </div>

              {/* Right Interactive Carousel Slider with Smooth Transitions */}
              <div className="flex-1 relative overflow-hidden bg-slate-950 border border-slate-200 rounded-2xl h-[380px] shadow-2xs group flex flex-col justify-between text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <img
                      src={carouselSlides[activeSlide].image}
                      className="w-full h-full object-cover select-none"
                      alt=""
                    />
                    {/* Bottom-to-top linear gradient dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

                    {/* Text positioned in left bottom corner */}
                    <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2.5 text-white max-w-lg">
                      <span className="inline-block text-[9px] bg-orange-500 text-white font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest">
                        {carouselSlides[activeSlide].tag}
                      </span>
                      <h2 className="text-xl md:text-3xl font-extrabold leading-tight text-white">
                        {carouselSlides[activeSlide].title}
                      </h2>
                      <p className="text-xs text-slate-200 font-medium">
                        {carouselSlides[activeSlide].offer}
                      </p>
                      <button
                        onClick={() => setSelectedCategory(carouselSlides[activeSlide].categoryLink)}
                        className="inline-flex px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-extrabold rounded-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-500/20"
                      >
                        {carouselSlides[activeSlide].buttonText}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left and Right navigation buttons */}
                <button
                  onClick={() => setActiveSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-slate-200 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 transition-all shadow-sm z-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide(prev => (prev + 1) % carouselSlides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-slate-200 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 transition-all shadow-sm z-30 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Slide Indicators Dots centered bottom */}
                <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-30 flex gap-2">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeSlide === idx ? 'bg-orange-500 w-6' : 'bg-white/50 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Premium Business Section (Hero Sidebar Column) */}
              <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-2xl p-5 shrink-0 shadow-2xs self-stretch flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-905 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Premium Partners</span>
                    </h4>
                    <span className="text-[9px] bg-amber-50 text-amber-600 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">Top rated</span>
                  </div>

                  <div className="space-y-3">
                    {businesses.slice(0, 2).map(biz => (
                      <div key={`hero-premium-${biz.id}`} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl p-1 bg-white border border-slate-150 rounded-lg shadow-3xs">{biz.logo}</span>
                          <div className="min-w-0">
                            <h5 className="text-[10px] font-extrabold text-slate-800 truncate leading-tight">{biz.name}</h5>
                            <p className="text-[8px] text-slate-450 mt-0.5">{biz.category} • {biz.location.city}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-semibold text-slate-500">
                          <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{biz.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[8px] text-indigo-650 font-bold uppercase tracking-wider">Verified Partner</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => handleInquireClick(biz)}
                            className="py-1.5 bg-slate-900 hover:bg-black text-white text-[8px] font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Inquire
                          </button>
                          <button
                            onClick={() => alert(`Direct Call to: ${biz.phone}`)}
                            className="py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[8px] font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Call Partner
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advertise / Join Pro Club Banner Card */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4.5 rounded-xl text-left space-y-2.5 relative overflow-hidden mt-4">
                  <h4 className="font-extrabold text-[10px]">Rank #1 Locally ⚡</h4>
                  <p className="text-[8px] text-indigo-200/80 leading-normal font-semibold">Join Meganods Pro Club to display your listing here and generate 10x consumer calls.</p>
                  <button onClick={() => alert("Registration form popup")} className="w-full py-2 bg-white text-indigo-950 hover:bg-indigo-50 text-[8px] font-extrabold rounded-lg transition-all cursor-pointer">
                    Register Business Now
                  </button>
                </div>
              </div>
            </div>

            {/* Three Horizontal Besa-style Sub-Banners */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Banner 1: New Men Collection equivalent */}
              <div className="relative overflow-hidden bg-slate-900 text-white p-6 rounded-lg flex justify-between items-center group shadow-2xs h-36 text-left">
                <div className="space-y-2 z-10">
                  <span className="text-[8px] bg-slate-800 text-indigo-400 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">New Relocation</span>
                  <h4 className="text-[11px] font-black tracking-wider uppercase leading-tight text-white">TOP STREET STYLE<br />PACKERS MUST HAVE</h4>
                  <button
                    onClick={() => setSelectedCategory('Packers & Movers')}
                    className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-extrabold rounded-xs uppercase tracking-wider transition-all mt-2"
                  >
                    Inquire Today
                  </button>
                </div>
                <span className="text-5xl select-none opacity-20 absolute right-6 bottom-4 group-hover:scale-110 transition-transform">📦</span>
              </div>

              {/* Banner 2: Today Special Price equivalent */}
              <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-lg flex justify-between items-center group shadow-2xs h-36 text-left">
                <div className="space-y-2 z-10">
                  <span className="text-[8px] bg-white/20 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">Today Special Price</span>
                  <h4 className="text-[11px] font-black tracking-wider uppercase leading-tight text-white">EXPERT ORAL CARE &<br />ROOT CANAL CLINICS</h4>
                  <button
                    onClick={() => setSelectedCategory('Dentists')}
                    className="text-[9px] font-extrabold text-white flex items-center gap-1 hover:underline pt-2"
                  >
                    Book now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-5xl select-none opacity-20 absolute right-6 bottom-4 group-hover:scale-110 transition-transform">🦷</span>
              </div>

              {/* Banner 3: Rasa Sayang equivalent */}
              <div className="relative overflow-hidden bg-teal-800 text-white p-6 rounded-lg flex justify-between items-center group shadow-2xs h-36 text-left">
                <div className="space-y-2 z-10">
                  <span className="text-[8px] bg-white/20 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">Rasa Sayang</span>
                  <h4 className="text-[11px] font-black tracking-wider uppercase leading-tight text-white">VERIFIED HOSPITALITY<br />HOTELS & RESORTS</h4>
                  <button
                    onClick={() => setSelectedCategory('Hotels')}
                    className="text-[9px] font-extrabold text-white flex items-center gap-1 hover:underline pt-2"
                  >
                    Inquire now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-5xl select-none opacity-20 absolute right-6 bottom-4 group-hover:scale-110 transition-transform">🏨</span>
              </div>
            </div>

            {/* Popular Categories Grid (Mockup Style) */}
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Popular categories</h3>
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setActiveView('all-businesses');
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-indigo-650 hover:underline"
                >
                  View All Categories
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Packers & Movers', icon: '📦' },
                  { name: 'Dentists', icon: '🦷' },
                  { name: 'Hotels', icon: '🏨' },
                  { name: 'Restaurants', icon: '🥗' },
                  { name: 'Electronic Goods Dealers', icon: '🔌' },
                  { name: 'Courier Services', icon: '🚚' },
                  { name: 'Beauty Parlours', icon: '💄' },
                  { name: 'Gyms & Fitness', icon: '🏋️‍♂️' },
                  { name: 'Home Cleaning', icon: '🧹' },
                  { name: 'Event Planners', icon: '🎉' },
                  { name: 'Car Garages', icon: '🚗' },
                  { name: 'IT & Repairs', icon: '💻' }
                ].map((cat, idx) => {
                  const isActive = filterCategory === cat.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setFilterCategory(cat.name);
                        setActiveView('all-businesses');
                      }}
                      className={`flex flex-col items-center justify-between p-4 rounded-xl border transition-all h-28 cursor-pointer ${isActive
                        ? 'bg-orange-50 border-orange-400 text-orange-700 font-bold scale-102 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-350 text-slate-800'
                        }`}
                    >
                      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-3xl mb-2 shadow-3xs border border-slate-100">
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-extrabold tracking-tight truncate w-full text-center">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5 Auto-Scrolling Business Carousels */}
            <div className="space-y-8">
              <AutoScrollCarousel
                title="Top Businesses"
                items={businesses}
                setInquiryBiz={handleInquireClick}
                setSelectedBiz={setSelectedBiz}
                setActiveView={setActiveView}
              />

              <AutoScrollCarousel
                title="Premium Partners"
                items={businesses.filter(b => b.status === 'Premium' || b.status === 'Featured')}
                setInquiryBiz={handleInquireClick}
                setSelectedBiz={setSelectedBiz}
                setActiveView={setActiveView}
              />

              <AutoScrollCarousel
                title="Highly Rated Services"
                items={[...businesses].sort((a, b) => b.rating - a.rating)}
                setInquiryBiz={handleInquireClick}
                setSelectedBiz={setSelectedBiz}
                setActiveView={setActiveView}
              />

              <AutoScrollCarousel
                title="Trending Deals & Offers"
                items={businesses.filter(b => b.subscription === 'Platinum' || b.subscription === 'Gold')}
                setInquiryBiz={handleInquireClick}
                setSelectedBiz={setSelectedBiz}
                setActiveView={setActiveView}
              />

              <AutoScrollCarousel
                title="Newly Verified Listings"
                items={businesses.slice().reverse()}
                setInquiryBiz={handleInquireClick}
                setSelectedBiz={setSelectedBiz}
                setActiveView={setActiveView}
              />
            </div>
          </>
        )}

        {activeView === 'all-businesses' && renderAllBusinesses()}

        {activeView === 'detail' && renderBusinessDetail()}

        {activeView === 'inquiry-chat' && renderInquiryChat()}

        {activeView === 'signin' && renderSignIn()}

        {activeView === 'register' && renderRegisterWizard()}

        {activeView === 'my-profile' && renderMyProfile()}

        {/* Bottom Trust Indicators bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-[24px] border border-slate-200/80 shadow-2xs text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl bg-indigo-50 p-2 rounded-xl">🛡️</span>
            <div>
              <h5 className="text-xs font-black text-slate-900">100% Verified</h5>
              <p className="text-[9px] text-slate-500">Background checked partners</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl bg-rose-50 p-2 rounded-xl">⚡</span>
            <div>
              <h5 className="text-xs font-black text-slate-900">Direct Connect</h5>
              <p className="text-[9px] text-slate-500">No agent middleman pricing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl bg-amber-50 p-2 rounded-xl">📞</span>
            <div>
              <h5 className="text-xs font-black text-slate-900">Dedicated Support</h5>
              <p className="text-[9px] text-slate-500">24/7 client booking care</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl bg-emerald-50 p-2 rounded-xl">⭐</span>
            <div>
              <h5 className="text-xs font-black text-slate-900">Highest Ratings</h5>
              <p className="text-[9px] text-slate-500">Based on audited reviews</p>
            </div>
          </div>
        </div>

        {/* Section 1: Live Platform Stats */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-[24px] p-8 shadow-md text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-10 select-none pointer-events-none" />
          <h3 className="font-extrabold text-lg uppercase tracking-wider text-indigo-400 mb-6">Real-Time Platform Growth</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">12,450+</span>
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Active Listings</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">48,910+</span>
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Inquiries Resolved</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">99.8%</span>
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Verification Rate</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-white block">18 Cities</span>
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Covered Globally</span>
            </div>
          </div>
        </div>

        {/* Section 2: Regional Hub Coverage */}
        <div className="space-y-4 text-left">
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Active Regional Hubs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { city: 'Mumbai', listings: '4,520 verified', icon: '📍' },
              { city: 'Delhi NCR', listings: '3,890 verified', icon: '📍' },
              { city: 'Bangalore', listings: '3,110 verified', icon: '📍' },
              { city: 'Jaipur', listings: '1,240 verified', icon: '📍' },
              { city: 'Kolkata', listings: '1,980 verified', icon: '📍' },
              { city: 'Chennai', listings: '1,560 verified', icon: '📍' }
            ].map((hub, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between items-center text-center shadow-3xs hover:border-indigo-500 transition-all cursor-pointer">
                <span className="text-2xl mb-1">{hub.icon}</span>
                <span className="text-xs font-black text-slate-800 block">{hub.city}</span>
                <span className="text-[9px] text-indigo-650 font-bold block uppercase mt-0.5">{hub.listings}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: FAQ Accordion */}
        <div className="bg-white border border-slate-200 p-6 rounded-[24px] space-y-4 text-left shadow-2xs">
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Frequently Asked Questions</h3>
          <div className="divide-y divide-slate-100">
            {[
              { q: "How does Meganods verify listed companies?", a: "We perform multi-step audit checks including office physical checks, tax audits, and verified business registration details to maintain high trust." },
              { q: "Is there a service commission charged to consumers?", a: "No! Meganods is completely free for clients. We connect you directly with partners without any hidden middleman commissions." },
              { q: "How can my local business apply for a Premium status?", a: "You can click on the Register Business or Claims link, submit your documents, and our support team will help you configure premium leads." }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-xs font-extrabold text-slate-800 text-left hover:text-indigo-650 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 font-bold text-base">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-2 pl-1 transition-all">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Success Testimonials */}
        <div className="space-y-4 text-left">
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-3xs">
              <p className="text-[10px] text-slate-505 italic font-semibold leading-relaxed">
                "Within 3 weeks of upgrading to Platinum Pro, Standard Chartered Packers generated over 150 local shifting phone calls and qualified bookings in Mumbai. Outstanding lead console!"
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1 bg-slate-50 border border-slate-100 rounded-lg">📦</span>
                <div>
                  <h5 className="text-[10px] font-extrabold text-slate-800">Ramesh Sharma</h5>
                  <p className="text-[8px] text-slate-455">Founder, SC Packers & Movers</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-3xs">
              <p className="text-[10px] text-slate-505 italic font-semibold leading-relaxed">
                "Verified ratings helped us stand out. Patients can reach our Connaught Place clinic directly without payment barriers. Meganods transformed our digital booking strategy!"
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1 bg-slate-50 border border-slate-100 rounded-lg">🦷</span>
                <div>
                  <h5 className="text-[10px] font-extrabold text-slate-805">Dr. Shalini Mehta</h5>
                  <p className="text-[8px] text-slate-455">Chief Dentist, Apex Dental Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Mobile App Promo Card */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 md:p-8 rounded-[24px] flex flex-col md:flex-row justify-between items-center gap-6 shadow-md text-left">
          <div className="space-y-2">
            <span className="text-[9px] bg-white/20 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Now Available</span>
            <h4 className="text-xl md:text-2xl font-black">Download Meganods Directory App</h4>
            <p className="text-[10px] text-orange-50 font-semibold leading-relaxed max-w-md">
              Locate verified local packers, dental clinics, restaurants, and top hotels on the go with our Android & iOS apps.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => alert("Redirecting to Play Store")} className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-[9px] flex items-center gap-2 border border-slate-700 transition-all cursor-pointer">
              <span>🤖 Google Play</span>
            </button>
            <button onClick={() => alert("Redirecting to App Store")} className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-[9px] flex items-center gap-2 border border-slate-700 transition-all cursor-pointer">
              <span>🍎 App Store</span>
            </button>
          </div>
        </div>

        {/* Footer Block */}
        <footer className="pt-8 border-t border-slate-200 mt-8 space-y-6 text-left text-slate-550 text-[10px] font-semibold">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-xs">
                  M
                </div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight">Meganods</span>
              </div>
              <p className="leading-relaxed text-slate-450">
                India's top rated, verification audited local search business directory engine. Connect directly with checked service providers.
              </p>
              <div className="text-slate-800 font-extrabold text-[11px]">
                Support Hotline: <span className="text-indigo-655 font-black">(+91) 98765 43210</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-[9px]">Local Hubs</h5>
              <ul className="space-y-1.5 text-slate-450">
                <li><button onClick={() => setCityFilter('Mumbai')} className="hover:text-indigo-650 transition-all cursor-pointer">Packers in Mumbai</button></li>
                <li><button onClick={() => setCityFilter('Delhi')} className="hover:text-indigo-650 transition-all cursor-pointer">Dentists in Delhi</button></li>
                <li><button onClick={() => setCityFilter('Bangalore')} className="hover:text-indigo-650 transition-all cursor-pointer">Restaurants in Bangalore</button></li>
                <li><button onClick={() => setSelectedCategory('Hotels')} className="hover:text-indigo-650 transition-all cursor-pointer">Heritage Stays Jaipur</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-[9px]">Company</h5>
              <ul className="space-y-1.5 text-slate-450">
                <li><button onClick={() => alert("About Info")} className="hover:text-indigo-650 transition-all cursor-pointer">About Us</button></li>
                <li><button onClick={() => alert("Careers Info")} className="hover:text-indigo-650 transition-all cursor-pointer">Careers</button></li>
                <li><button onClick={() => alert("Press Info")} className="hover:text-indigo-650 transition-all cursor-pointer">Press & Media</button></li>
                <li><button onClick={() => alert("Privacy Policy")} className="hover:text-indigo-650 transition-all cursor-pointer">Terms & Conditions</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-[9px]">Partnerships</h5>
              <ul className="space-y-1.5 text-slate-450">
                <li><Link href="/admin" className="hover:text-indigo-650 transition-all font-bold text-indigo-650">Admin Console Panel</Link></li>
                <li><button onClick={() => alert("Pro Registration")} className="hover:text-indigo-650 transition-all cursor-pointer">Register a Business</button></li>
                <li><button onClick={() => alert("Ad Support")} className="hover:text-indigo-650 transition-all cursor-pointer">Advertise with Us</button></li>
                <li><button onClick={() => alert("Audit Support")} className="hover:text-indigo-650 transition-all cursor-pointer">Verification Audits</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-455">
            <span>© {new Date().getFullYear()} Meganods Directory Services. All rights reserved.</span>
            <div className="flex gap-3 text-[8px] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-655">DIRECT CONNECT CONNECTED</span>
              <span>•</span>
              <span className="font-bold text-slate-655">VISA</span>
              <span>•</span>
              <span className="font-bold text-slate-655">MASTERCARD</span>
              <span>•</span>
              <span className="font-bold text-slate-655">GOOGLE PAY</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Review Form Modal */}
      <AnimatePresence>
        {reviewBiz && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              onClick={() => setReviewBiz(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 z-55 shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-slate-100 text-black border border-slate-200 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Moderate Feedback
                  </span>
                  <h3 className="font-black text-slate-850 text-base mt-2">Write Review for {reviewBiz.name}</h3>
                </div>
                <button
                  onClick={() => setReviewBiz(null)}
                  className="p-1 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-650 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reviewSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your feedback has been logged successfully and forwarded to the moderator queue!</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Rohini Sen"
                      className="w-full px-3.5 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black focus:bg-white text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rating Score</label>
                    <div className="flex gap-1.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewStars(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewStars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Review Comment</label>
                    <textarea
                      rows={3}
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="Write your customer experience..."
                      className="w-full px-3.5 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-black focus:bg-white text-black leading-relaxed"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> <span>Deploy Live Review</span>
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
