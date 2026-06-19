'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { citiesData } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Megaphone,
  Percent,
  Play,
  Users,
  MapPin,
  Globe,
  UploadCloud,
  FileText,
  LifeBuoy,
  Plus,
  Send,
  Sliders,
  Database,
  Key,
  ShieldCheck,
  CheckCircle,
  Settings,
  Trash2,
  Edit,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Mail,
  Smartphone,
  Info,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Search,
  Lock
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function OtherPanels() {
  const {
    currentTab,
    setCurrentTab,
    ads,
    toggleAdStatus,
    users,
    setUsers,
    tickets,
    addTicketComment,
    updateTicketStatus,
    categories,
    locations,
    setLocations,
    addActivity,
    businesses
  } = useApp();

  // Notification states
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifType, setNotifType] = useState<'Push' | 'SMS' | 'Email'>('Push');
  const [notifSent, setNotifSent] = useState(false);

  // Ticket details state
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Location adding
  const [newCityName, setNewCityName] = useState('');
  const [newStateName, setNewStateName] = useState('');
  const [newAreaName, setNewAreaName] = useState('');

  // Schema Generator state
  const [schemaBizName, setSchemaBizName] = useState('');
  const [schemaPhone, setSchemaPhone] = useState('');
  const [schemaCategory, setSchemaCategory] = useState('');
  const [generatedSchema, setGeneratedSchema] = useState('');

  const handleGenerateSchema = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemaBizName.trim()) return;
    const jsonld = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${schemaBizName}",
  "telephone": "${schemaPhone}",
  "category": "${schemaCategory}",
  "image": "https://localhub.com/logos/biz.png",
  "priceRange": "$$"
}`;
    setGeneratedSchema(jsonld);
  };

  // CMS state variables
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'How to Choose the Best Packers and Movers', author: 'Aditya Sen', date: '2026-06-15', status: 'Published' },
    { id: 2, title: 'Top 10 Dental Clinics in Delhi Outer Circle', author: 'Dr. Shalini Mehta', date: '2026-06-12', status: 'Published' }
  ]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');

  const [faqs, setFaqs] = useState([
    { id: 1, question: 'How do I verify my listing?', answer: 'Go to Business details, upload documents, and click Verify.' },
    { id: 2, question: 'Is free listing permanent?', answer: 'Yes, our Free Listing option lasts indefinitely with basic discovery stats.' }
  ]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // SEO redirects state
  const [redirects, setRedirects] = useState([
    { from: '/old-packers', to: '/mumbai/packers-movers' },
    { from: '/dentists-cp', to: '/delhi/connaught-place/dentists' }
  ]);
  const [redirFrom, setRedirFrom] = useState('');
  const [redirTo, setRedirTo] = useState('');

  // API Token state
  const [apiKeys, setApiKeys] = useState([
    { name: 'Public Search API', token: 'jd_pub_live_90as8d9021', created: '2026-01-10' },
    { name: 'Lead Ingest Hook', token: 'jd_lead_ingest_78sa120934', created: '2026-03-15' }
  ]);
  const [newApiKeyName, setNewApiKeyName] = useState('');

  // Theme variable config
  const [primaryBrandColor, setPrimaryBrandColor] = useState('#2563EB');
  const [smsGatewaySelected, setSmsGatewaySelected] = useState('Twilio');

  // Handle adding API key
  const handleAddApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApiKeyName.trim()) return;
    const randomHex = Array.from({ length: 20 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKeys(prev => [...prev, { name: newApiKeyName, token: `jd_gen_${randomHex}`, created: new Date().toISOString().split('T')[0] }]);
    addActivity(`Generated API token: "${newApiKeyName}"`, 'support');
    setNewApiKeyName('');
  };

  // Handle adding blog
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;
    setBlogs(prev => [...prev, { id: Date.now(), title: newBlogTitle, author: newBlogAuthor || 'Admin', date: new Date().toISOString().split('T')[0], status: 'Published' }]);
    addActivity(`Published blog post: "${newBlogTitle}"`, 'support');
    setNewBlogTitle('');
    setNewBlogAuthor('');
  };

  // Handle adding FAQ
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setFaqs(prev => [...prev, { id: Date.now(), question: newFaqQ, answer: newFaqA }]);
    addActivity(`Added FAQ question to directory`, 'support');
    setNewFaqQ('');
    setNewFaqA('');
  };

  // Handle adding redirect
  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redirFrom.trim() || !redirTo.trim()) return;
    setRedirects(prev => [...prev, { from: redirFrom, to: redirTo }]);
    addActivity(`Added SEO redirect from "${redirFrom}"`, 'business');
    setRedirFrom('');
    setRedirTo('');
  };


  // ----------------------------------------------------
  // CATEGORIES GROUP
  // ----------------------------------------------------
  // Helper category image mapper
  const getCategoryImage = (name: string) => {
    const images: Record<string, string> = {
      'Packers & Movers': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=60',
      'Dentists': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60',
      'Hotels': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60',
      'Restaurants': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60',
      'Electronic Goods Dealers': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60'
    };
    return images[name] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60';
  };

  // Helper category emoji / icon mapper
  const getCategoryEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      'Packers & Movers': '📦',
      'Dentists': '🦷',
      'Hotels': '🏰',
      'Restaurants': '🥗',
      'Electronic Goods Dealers': '🔌'
    };
    return emojis[name] || '📁';
  };

  // ----------------------------------------------------
  // CATEGORIES TAXONOMY GROUP
  // ----------------------------------------------------
  // ----------------------------------------------------
  // CATEGORIES TAXONOMY GROUP
  // ----------------------------------------------------
  if (currentTab === 'categories' || currentTab === 'sub-categories' || currentTab === 'attributes' || currentTab === 'category-seo') {
    const containerVariants = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    // 1. ROOT CATEGORIES TAB
    if (currentTab === 'categories') {
      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-black text-slate-800 text-lg">Root Directory Categories</h2>
              <p className="text-xs text-slate-400 mt-1">Configure first-level industries and parent categories for discovery search</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 self-start">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">Add Category Node</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Category Title</label>
                  <input type="text" placeholder="e.g. Electricians" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">SEO Short Description</label>
                  <textarea rows={3} placeholder="Best verified local experts near you..." className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white" />
                </div>
                <button onClick={() => alert("Root category created successfully!")} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">
                  Create Category Node
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-800 text-sm">Active Parent Categories ({categories.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((c, idx) => (
                  <motion.div key={c.id} variants={itemVariants} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-24 relative">
                        <img src={getCategoryImage(c.name)} alt={c.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                          <span className="text-xl">{getCategoryEmoji(c.name)}</span>
                          <span className="text-xs font-black text-white">{c.name}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">{c.seoDesc}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex justify-between items-center text-[10px] text-slate-400">
                      <span>Total Listings: {businesses.filter(b => b.category === c.name).length + c.count}</span>
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 border border-indigo-100 rounded-md font-bold">Parent Node</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 2. SUB CATEGORIES TAB
    if (currentTab === 'sub-categories') {
      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-black text-slate-800 text-lg">Sub-Categories Mapping</h2>
            <p className="text-xs text-slate-400 mt-1">Classify directories into specialized sub-sections under root industrial scopes</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 self-start">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">Add Sub-Category</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Parent Category</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Sub-Category Title</label>
                  <input type="text" placeholder="e.g. Tooth Whitening, Local Relocators" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500" />
                </div>
                <button onClick={() => alert("Sub-category added!")} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">
                  Map Sub-Category
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-800 text-sm">Category Taxonomy Tree</h3>
              <div className="space-y-4">
                {categories.map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                        <span>{getCategoryEmoji(c.name)}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                        {c.subcategories.length} mapped subcategories
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.subcategories.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-700">
                          <span>{sub}</span>
                          <button onClick={() => alert(`Remove: ${sub}`)} className="text-slate-400 hover:text-red-500 cursor-pointer pl-1.5">×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 3. ATTRIBUTES TAB
    if (currentTab === 'attributes') {
      const mockAttributes = [
        { id: 'attr-1', name: 'Digital Payments', type: 'Toggle Switch', category: 'Restaurants', status: 'Active' },
        { id: 'attr-2', name: 'WiFi Access', type: 'Toggle Switch', category: 'Hotels', status: 'Active' },
        { id: 'attr-3', name: 'Registration Doc', type: 'File Upload', category: 'Packers & Movers', status: 'Active' },
        { id: 'attr-4', name: 'Specialty Degree', type: 'Text Input', category: 'Dentists', status: 'Active' }
      ];

      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-black text-slate-800 text-lg">Listing Fields & Attributes</h2>
            <p className="text-xs text-slate-400 mt-1">Define customized submission forms with custom variables specific to industry categories</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 self-start">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">Add Custom Attribute</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Attribute Name</label>
                  <input type="text" placeholder="e.g. AC Available, Parking Spots" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Input Field Type</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none">
                    <option value="boolean">Toggle Switch (Yes/No)</option>
                    <option value="text">Text Input</option>
                    <option value="number">Number Input</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Apply to Category</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <button onClick={() => alert("Custom attribute registered!")} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">
                  Register Attribute
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-800 text-sm">Registered Attributes Console</h3>
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                      <th className="p-4">Attribute Name</th>
                      <th className="p-4">Field Type</th>
                      <th className="p-4">Category Link</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {mockAttributes.map(attr => (
                      <tr key={attr.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-800">{attr.name}</td>
                        <td className="p-4">{attr.type}</td>
                        <td className="p-4">
                          <span className="text-[10px] bg-slate-100 border border-slate-250/50 px-2 py-0.5 rounded-lg text-slate-650">
                            {attr.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 rounded-full text-[9px] font-bold">
                            {attr.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => alert("Attribute status changed")} className="text-indigo-600 hover:underline cursor-pointer">Deactivate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 4. CATEGORY SEO TAB
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={itemVariants}>
          <h2 className="font-black text-slate-800 text-lg">Category SEO Meta Tags</h2>
          <p className="text-xs text-slate-400 mt-1">Configure target URL structures, meta descriptions, and sitemap priorities to boost Google SERP ranks</p>
        </motion.div>

        <div className="space-y-4">
          {categories.map((c, idx) => (
            <motion.div key={c.id} variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <span className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-2xl inline-block mb-3">
                  {getCategoryEmoji(c.name)}
                </span>
                <h4 className="font-black text-slate-800 text-sm">{c.name} Listing</h4>
                <p className="text-[10px] text-slate-450 mt-1">Base Directory Route: <code className="bg-slate-50 px-1 py-0.5 text-indigo-600 rounded">/{c.name.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}</code></p>
              </div>

              <div className="lg:col-span-2 space-y-3.5 text-xs text-slate-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Target SEO Slug Path</label>
                    <input type="text" defaultValue={`/${c.name.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}`} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">SERP Target Keywords</label>
                    <input type="text" defaultValue={`best ${c.name.toLowerCase()}, top ${c.name.toLowerCase()} near me`} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Custom Meta Page Description</label>
                  <textarea defaultValue={c.seoDesc} rows={2} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="text-[10px] text-slate-400">Sitemap Priority Score: <strong>0.8</strong></span>
                  <button onClick={() => alert("SEO Meta saved!")} className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] cursor-pointer">
                    Save SEO Meta
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // ----------------------------------------------------
  // LOCATIONS DIRECTORY HIERARCHY GROUP
  // ----------------------------------------------------
  if (currentTab === 'countries' || currentTab === 'states' || currentTab === 'cities' || currentTab === 'areas' || currentTab === 'localities') {
    const containerVariants = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    const handleAddLocation = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCityName.trim()) return;
      const newLoc = {
        id: `loc-${Date.now()}`,
        type: currentTab.slice(0, -1) as any,
        name: newCityName,
        parent: 'loc-1',
        seoUrl: `/${newCityName.toLowerCase().replace(/\s+/g, '-')}`
      };
      setLocations(prev => [...prev, newLoc]);
      addActivity(`Added ${currentTab.slice(0, -1)} node: "${newCityName}"`, 'business');
      setNewCityName('');
    };

    // 1. COUNTRIES SCREEN
    if (currentTab === 'countries') {
      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-black text-slate-800 text-lg">Countries Database</h2>
            <p className="text-xs text-slate-400 mt-1">Configure active countries for local discovery directory scopes</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 self-start">
              <h3 className="font-bold text-slate-800 text-sm">Add Country Scope</h3>
              <form onSubmit={handleAddLocation} className="space-y-3">
                <input type="text" placeholder="e.g. United Kingdom" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" required />
                <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">Add Country</button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Active Countries</h3>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇮🇳</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">India</h4>
                    <p className="text-[10px] text-slate-400">Primary business hub. Default currency: INR (₹)</p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-extrabold px-3 py-1 rounded-full text-[10px] border border-emerald-100">Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 2. STATES SCREEN
    if (currentTab === 'states') {
      const stateList = [
        { name: 'Maharashtra', code: 'MH', listings: 1240, activeCities: 12 },
        { name: 'Delhi NCR', code: 'DL', listings: 940, activeCities: 4 },
        { name: 'Karnataka', code: 'KA', listings: 750, activeCities: 8 },
        { name: 'West Bengal', code: 'WB', listings: 410, activeCities: 6 },
        { name: 'Rajasthan', code: 'RJ', listings: 320, activeCities: 5 }
      ];

      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-black text-slate-800 text-lg">States Taxonomy</h2>
            <p className="text-xs text-slate-400 mt-1">Configure active states and provinces within active country scopes</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 self-start">
              <h3 className="font-bold text-slate-800 text-sm">Add State / Province</h3>
              <form onSubmit={handleAddLocation} className="space-y-3">
                <input type="text" placeholder="e.g. Tamil Nadu" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" required />
                <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">Add State</button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Registered States ({stateList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stateList.map((state, sIdx) => (
                  <div key={sIdx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs">{state.name} ({state.code})</h4>
                      <p className="text-[10px] text-slate-450 mt-1">{state.activeCities} active cities registered</p>
                    </div>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-3 py-1 rounded-full border border-indigo-100/50">
                      {state.listings} listings
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 3. CITIES SCREEN
    if (currentTab === 'cities') {
      return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-black text-slate-800 text-lg">Cities Hub Console</h2>
            <p className="text-xs text-slate-400 mt-1">Configure active discovery cities, map pins, and primary coordinates</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 self-start">
              <h3 className="font-bold text-slate-800 text-sm">Add City Node</h3>
              <form onSubmit={handleAddLocation} className="space-y-3">
                <input type="text" placeholder="e.g. Pune" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" required />
                <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">Register City</button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Active City Hubs ({citiesData.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {citiesData.map((city, cIdx) => (
                  <div key={cIdx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-850">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        {city.name}
                      </span>
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-lg border border-amber-100">
                        {city.premium} Premium
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-500 pt-1">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-700">{city.businesses}</p>
                        <p className="text-[8px] uppercase tracking-wide">Listings</p>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-700">{city.leads}</p>
                        <p className="text-[8px] uppercase tracking-wide">Leads Gen</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // 4. AREAS & LOCALITIES SCREEN (unified)
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={itemVariants}>
          <h2 className="font-black text-slate-800 text-lg">{currentTab === 'areas' ? 'Areas Database' : 'Localities Database'}</h2>
          <p className="text-xs text-slate-400 mt-1">Configure micro-geographic subcategories and localized routes under parent cities</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 self-start">
            <h3 className="font-bold text-slate-800 text-sm">Add Geography Link</h3>
            <form onSubmit={handleAddLocation} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Parent City</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none">
                  {citiesData.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Name</label>
                <input type="text" placeholder="e.g. Indiranagar, Connaught Place" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" required />
              </div>
              <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">Register Node</button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Registered Geography Paths</h3>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {locations.filter(l => l.type === currentTab.slice(0, -1)).map((loc) => (
                <div key={loc.id} className="p-3.5 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between text-xs hover:scale-[1.01] transition-transform">
                  <div>
                    <strong className="text-slate-800">{loc.name}</strong>
                    <span className="text-[9px] bg-slate-50 text-slate-400 font-bold px-2 py-0.5 border border-slate-100 rounded-md ml-2 capitalize">{loc.type}</span>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50/50 px-2 py-0.5 border border-indigo-100/50 rounded-md">{loc.seoUrl}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ----------------------------------------------------
  // USERS GROUP
  // ----------------------------------------------------
  if (currentTab === 'all-users' || currentTab === 'business-owners' || currentTab === 'customers' || currentTab === 'agents' || currentTab === 'blocked-users') {
    const [userViewMode, setUserViewMode] = useState<'grid' | 'table'>('grid');

    // Helper Unsplash avatar mapper
    const getUserAvatar = (id: string) => {
      const avatars: Record<string, string> = {
        'usr-1': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', // Rajesh
        'usr-2': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', // Aditya
        'usr-3': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', // Kabir
        'usr-4': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', // Pooja
        'usr-5': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'  // David
      };
      return avatars[id] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    };

    const getFilteredUsers = () => {
      if (currentTab === 'all-users') return users;
      if (currentTab === 'blocked-users') return users.filter(u => u.status === 'Blocked');
      if (currentTab === 'business-owners') return users.filter(u => u.role === 'Super Admin' || u.role === 'Admin');
      if (currentTab === 'customers') return users.filter(u => u.role === 'Support Agent' || u.role === 'Moderator');
      return users;
    };

    const toggleBlock = (id: string) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    const activeUsersList = getFilteredUsers();

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-black text-slate-800 text-lg">System Access Directory</h2>
            <p className="text-xs text-slate-400 mt-1">Control employee authorization, moderators, field sales agents and listing owners</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl self-start">
            <button
              onClick={() => setUserViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userViewMode === 'grid' ? 'bg-white text-indigo-650 shadow-sm' : 'text-slate-500'
              }`}
            >
              Grid Cards
            </button>
            <button
              onClick={() => setUserViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userViewMode === 'table' ? 'bg-white text-indigo-650 shadow-sm' : 'text-slate-500'
              }`}
            >
              List Table
            </button>
          </div>
        </motion.div>

        {userViewMode === 'grid' ? (
          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeUsersList.map((u) => (
              <motion.div
                key={u.id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05)' }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={getUserAvatar(u.id)}
                        alt={u.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">{u.name}</h4>
                        <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold mt-1 inline-block border border-indigo-100/50">
                          {u.role}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {u.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-50 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[160px]">{u.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-semibold text-slate-800">{u.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Registered:</span>
                      <span className="text-slate-400 font-bold">{u.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 mt-4">
                  <button
                    onClick={() => toggleBlock(u.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      u.status === 'Active'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100/50'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100/50'
                    }`}
                  >
                    {u.status === 'Active' ? 'Revoke System Access' : 'Restore System Access'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider">
                    <th className="p-4">Av</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">System Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Join Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {activeUsersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <img src={getUserAvatar(u.id)} alt={u.name} className="w-7 h-7 rounded-lg object-cover" />
                      </td>
                      <td className="p-4 font-bold text-slate-800">{u.name}</td>
                      <td className="p-4 text-slate-650">{u.email}</td>
                      <td className="p-4 text-slate-650">{u.phone}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                          u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{u.joinDate}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleBlock(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold text-white transition-all cursor-pointer ${
                            u.status === 'Active' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                          }`}
                        >
                          {u.status === 'Active' ? 'Revoke Access' : 'Restore Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // ----------------------------------------------------
  // ADVERTISEMENTS GROUP
  // ----------------------------------------------------
  // ----------------------------------------------------
  // ADVERTISEMENTS GROUP
  // ----------------------------------------------------
  if (currentTab === 'banner-ads' || currentTab === 'featured-listings' || currentTab === 'sponsored-businesses' || currentTab === 'ad-analytics') {
    const getAdsHeaderTitle = () => {
      switch (currentTab) {
        case 'banner-ads': return 'Banner Advertisements';
        case 'featured-listings': return 'Featured Business Campaigns';
        case 'sponsored-businesses': return 'Sponsored Brand Placements';
        default: return 'Ad Campaigns & Analytics';
      }
    };

    const getAdsHeaderDesc = () => {
      switch (currentTab) {
        case 'banner-ads': return 'Manage large visual promotional banners running on the main customer dashboard';
        case 'featured-listings': return 'Control verified listings prioritized at the top of category search pages';
        case 'sponsored-businesses': return 'Audit sponsored tags and keyword bidding for enterprise profiles';
        default: return 'Monitor overall click-through rates, impressions, and daily marketing budgets';
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-black text-slate-800 text-xl tracking-tight">{getAdsHeaderTitle()}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{getAdsHeaderDesc()}</p>
        </div>

        {/* Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Ad Impressions</p>
              <h3 className="text-xl font-black text-slate-800 mt-1">168,200</h3>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ 12% vs last month</span>
            </div>
            <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <Megaphone className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Ad Clicks</p>
              <h3 className="text-xl font-black text-slate-800 mt-1">8,450</h3>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ 8.4% conversion rate</span>
            </div>
            <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
              <Play className="w-5 h-5" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average CTR</p>
              <h3 className="text-xl font-black text-slate-800 mt-1">5.02%</h3>
              <span className="text-[10px] text-indigo-650 font-bold block mt-1">Industry standard: 3.1%</span>
            </div>
            <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
              <Percent className="w-5 h-5" />
            </div>
          </motion.div>
        </div>

        {/* Ad Campaigns Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Active Marketing Placements</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4">Campaign Sponsor</th>
                  <th className="p-4">Ad Format</th>
                  <th className="p-4">Impressions</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">CTR</th>
                  <th className="p-4">Daily Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{ad.businessName}</td>
                    <td className="p-4 text-slate-500 font-medium">{ad.type}</td>
                    <td className="p-4 text-slate-500 font-semibold">{ad.impressions.toLocaleString()}</td>
                    <td className="p-4 text-slate-500 font-semibold">{ad.clicks.toLocaleString()}</td>
                    <td className="p-4 font-bold text-blue-600">{ad.ctr}%</td>
                    <td className="p-4 font-semibold text-slate-750">₹{(ad.budget / 100).toLocaleString()}/day</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] border ${
                        ad.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {ad.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all cursor-pointer ${
                          ad.status === 'Active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-900 hover:bg-black'
                        }`}
                      >
                        {ad.status === 'Active' ? 'Pause' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SUBSCRIPTIONS GROUP
  // ----------------------------------------------------
  if (currentTab === 'plans' || currentTab === 'transactions' || currentTab === 'premium-members') {
    const getSubsHeaderTitle = () => {
      switch (currentTab) {
        case 'plans': return 'Pricing & Subscription Tiers';
        case 'transactions': return 'Transaction Audit Invoices';
        default: return 'Premium Members Hub';
      }
    };

    const getSubsHeaderDesc = () => {
      switch (currentTab) {
        case 'plans': return 'Adjust directory listing premium costs, features, and active plans';
        case 'transactions': return 'Audit billing statements, UPI / card transactions, and status history';
        default: return 'View premium businesses, elite status holders, and subscription levels';
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-black text-slate-800 text-xl tracking-tight">{getSubsHeaderTitle()}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{getSubsHeaderDesc()}</p>
        </div>

        {/* Pricing Plans List */}
        {currentTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Free Listing', price: '₹0', badge: 'Basic Tier', color: 'border-slate-200', text: 'text-slate-550', features: 'Basic directory profile, standard review verification badge' },
              { name: 'Silver Plan', price: '₹10,000/yr', badge: 'Silver Growth', color: 'border-slate-300', text: 'text-blue-600', features: 'Priority search placement, custom WhatsApp button, leads dashboard access' },
              { name: 'Gold Plan', price: '₹25,000/yr', badge: 'Popular Selection', color: 'border-amber-200 bg-amber-50/5', text: 'text-amber-600', features: 'Featured banner placement, monthly priority leads blast, SMS alerts tool' },
              { name: 'Platinum Premium', price: '₹50,000/yr', badge: 'Enterprise Elite', color: 'border-indigo-200 bg-indigo-50/5', text: 'text-indigo-650', features: 'Unlimited search visibility, SMS marketing suite, dedicated CRM manager support' }
            ].map((p) => (
              <div key={p.name} className={`bg-white p-5 rounded-3xl border ${p.color} shadow-sm flex flex-col justify-between space-y-5 transition-transform hover:scale-[1.01]`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-slate-800">{p.name}</h4>
                    <span className="text-[8px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded-md font-bold uppercase">{p.badge}</span>
                  </div>
                  <p className={`text-2xl font-black ${p.text} mt-1`}>{p.price}</p>
                  <div className="h-px bg-slate-100" />
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{p.features}</p>
                </div>
                <button onClick={() => alert("Cost tier edited")} className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer">
                  Edit Plan Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Premium members Directory */}
        {currentTab === 'premium-members' && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Active Premium Directory Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businesses.filter(b => b.status === 'Premium' || b.status === 'Featured').map(b => (
                <div key={b.id} className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs text-xl">
                      {b.logo}
                    </div>
                    <div>
                      <strong className="text-slate-800 text-sm font-black">{b.name}</strong>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{b.category} • {b.location.city}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full border border-amber-200/60 bg-amber-50/50 text-amber-700`}>
                    {b.subscription} Tier
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions list */}
        {currentTab === 'transactions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Invoice Audit Trail</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-200 uppercase tracking-wider">
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Business Listing</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">TXN-9028301</td>
                    <td className="p-4 font-semibold text-slate-650">Rajputana Heritage Grand Hotel</td>
                    <td className="p-4 font-black text-slate-800">₹50,000</td>
                    <td className="p-4 text-slate-500 font-bold">UPI Payment</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[9px]">
                        Successful
                      </span>
                    </td>
                    <td className="p-4 text-slate-450 font-semibold">2026-06-19</td>
                    <td className="p-4 text-right">
                      <button onClick={() => alert("Invoice PDF download simulated")} className="text-xs text-blue-600 hover:underline font-bold">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // SEO GROUP
  // ----------------------------------------------------
  if (currentTab === 'meta-management' || currentTab === 'sitemap' || currentTab === 'url-management' || currentTab === 'schema-generator') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">SEO & URL Optimizations</h2>
          <p className="text-xs text-slate-400 mt-0.5">Optimize directory rankings, structured microdata schemas, URL redirects, and XML sitemaps</p>
        </div>

        {currentTab === 'meta-management' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-xl">
            <h3 className="font-bold text-slate-800 text-sm">Site-Wide Meta Tags</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-650 mb-1">Global Meta Title</label>
                <input type="text" defaultValue="LocalHub - Find Local Businesses Near You" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div>
                <label className="block font-semibold text-slate-650 mb-1">Global Meta Description</label>
                <textarea rows={3} defaultValue="Search verified listings, ratings and contact details." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <button onClick={() => alert("Saved changes")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save Metadata</button>
            </div>
          </div>
        )}

        {currentTab === 'sitemap' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-xl">
            <h3 className="font-bold text-slate-800 text-sm">Google XML Sitemap</h3>
            <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1">
              <p>Total URL Indices: <strong>24,536 Pages</strong></p>
              <p>Last rebuilt: <strong>Today at 12:00 PM</strong></p>
            </div>
            <button onClick={() => { addActivity("Triggered sitemap XML rebuild", "business"); alert("Sitemap rebuild triggered! Check activity feed."); }} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg text-xs flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4" /> Rebuild XML Sitemap
            </button>
          </div>
        )}

        {currentTab === 'url-management' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Add 301 SEO URL Redirect</h3>
              <form onSubmit={handleAddRedirect} className="space-y-3">
                <input type="text" placeholder="Old Path (e.g. /old-url)" value={redirFrom} onChange={(e) => setRedirFrom(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <input type="text" placeholder="New Path (e.g. /new-url)" value={redirTo} onChange={(e) => setRedirTo(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Add Redirect Rule</button>
              </form>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Active 301 URL Rules</h3>
              <div className="space-y-2">
                {redirects.map((r, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">{r.from} ➔ {r.to}</span>
                    <button onClick={() => setRedirects(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'schema-generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Structured Schema Generator</h3>
              <form onSubmit={handleGenerateSchema} className="space-y-3">
                <input type="text" placeholder="Company Name" value={schemaBizName} onChange={(e) => setSchemaBizName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <input type="text" placeholder="Contact Phone" value={schemaPhone} onChange={(e) => setSchemaPhone(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                <input type="text" placeholder="Category" value={schemaCategory} onChange={(e) => setSchemaCategory(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Generate Schema JSON-LD</button>
              </form>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">JSON-LD Output</h3>
              <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[10px] font-mono overflow-x-auto max-h-[30vh]">
                {generatedSchema || '// Output code preview will display here...'}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // REPORTS GROUP
  // ----------------------------------------------------
  if (currentTab === 'revenue-reports' || currentTab === 'user-reports' || currentTab === 'lead-reports' || currentTab === 'business-reports') {
    const reportChartData = [
      { name: 'Mon', revenue: 4200, users: 180, leads: 42, businesses: 3 },
      { name: 'Tue', revenue: 5800, users: 220, leads: 51, businesses: 5 },
      { name: 'Wed', revenue: 6400, users: 240, leads: 60, businesses: 4 },
      { name: 'Thu', revenue: 5900, users: 210, leads: 49, businesses: 2 },
      { name: 'Fri', revenue: 7800, users: 310, leads: 82, businesses: 8 },
      { name: 'Sat', revenue: 8200, users: 340, leads: 91, businesses: 10 },
      { name: 'Sun', revenue: 9500, users: 410, leads: 112, businesses: 12 }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Platform Analytics Reports ({currentTab})</h2>
          <p className="text-xs text-slate-400 mt-0.5">Explore platform metrics trends using visual interactive graphs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Metric Progression Graph</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {currentTab === 'revenue-reports' ? (
                <AreaChart data={reportChartData}>
                  <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" />
                  <YAxis fontSize={11} stroke="#94A3B8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              ) : currentTab === 'user-reports' ? (
                <BarChart data={reportChartData}>
                  <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" />
                  <YAxis fontSize={11} stroke="#94A3B8" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : currentTab === 'lead-reports' ? (
                <LineChart data={reportChartData}>
                  <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" />
                  <YAxis fontSize={11} stroke="#94A3B8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#F59E0B" strokeWidth={2.5} />
                </LineChart>
              ) : (
                <LineChart data={reportChartData}>
                  <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" />
                  <YAxis fontSize={11} stroke="#94A3B8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="businesses" stroke="#8B5CF6" strokeWidth={2.5} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CMS GROUP
  // ----------------------------------------------------
  if (currentTab === 'home-page' || currentTab === 'about-page' || currentTab === 'contact-page' || currentTab === 'blogs' || currentTab === 'faqs') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Content Management System (CMS)</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control visual page configurations, write blogs, and edit FAQ lists</p>
        </div>

        {currentTab === 'home-page' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-xl">
            <h3 className="font-bold text-slate-800 text-sm">Homepage Hero Editor</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-650 mb-1">Headline Text Title</label>
                <input type="text" defaultValue="Search Local Businesses, Packers & Dentists" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <button onClick={() => alert("Homepage updated")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save Layout</button>
            </div>
          </div>
        )}

        {(currentTab === 'about-page' || currentTab === 'contact-page') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-xl">
            <h3 className="font-bold text-slate-800 text-sm">{currentTab === 'about-page' ? 'About Us Page Content' : 'Contact Support Details'}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-650 mb-1">Rich Text Paragraph Content</label>
                <textarea rows={6} defaultValue="LocalHub is India's leading business directory platform, connecting consumers with local service providers." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <button onClick={() => alert("Page content saved")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save Changes</button>
            </div>
          </div>
        )}

        {currentTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Write Blog Post</h3>
              <form onSubmit={handleAddBlog} className="space-y-3">
                <input type="text" placeholder="Blog Title" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <input type="text" placeholder="Author Name" value={newBlogAuthor} onChange={(e) => setNewBlogAuthor(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Publish Article</button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">Published Directory Blogs</h3>
              <div className="space-y-2">
                {blogs.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-800">{b.title}</strong>
                      <p className="text-[10px] text-slate-400 mt-0.5">By {b.author} on {b.date}</p>
                    </div>
                    <button onClick={() => setBlogs(prev => prev.filter(bl => bl.id !== b.id))} className="text-red-500 hover:text-red-700 text-xs font-bold">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Add Directory FAQ</h3>
              <form onSubmit={handleAddFaq} className="space-y-3">
                <input type="text" placeholder="Question Text" value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <textarea rows={3} placeholder="Answer Content" value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
                <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Publish FAQ</button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">System FAQ Catalog</h3>
              <div className="space-y-2">
                {faqs.map((f) => (
                  <div key={f.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between items-center font-bold text-slate-800">
                      <span>Q: {f.question}</span>
                      <button onClick={() => setFaqs(prev => prev.filter(faq => faq.id !== f.id))} className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">A: {f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // NOTIFICATIONS GROUP
  // ----------------------------------------------------
  if (currentTab === 'push-notifications' || currentTab === 'email-campaigns' || currentTab === 'sms-campaigns') {
    const handleSendBlast = (e: React.FormEvent) => {
      e.preventDefault();
      if (!notifTitle.trim() || !notifBody.trim()) return;
      addActivity(`Dispatched campaign "${notifTitle}"`, 'subscription');
      setNotifSent(true);
      setTimeout(() => {
        setNotifSent(false);
        setNotifTitle('');
        setNotifBody('');
      }, 2500);
    };

    return (
      <div className="space-y-6 max-w-xl mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Campaign Blaster Dispatcher ({currentTab})</h2>
            <p className="text-xs text-slate-400 mt-0.5">Send bulk announcements to target active directory users</p>
          </div>

          {notifSent && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Blast dispatched successfully!</span>
            </div>
          )}

          <form onSubmit={handleSendBlast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Headline / Subject Title</label>
              <input
                type="text"
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="e.g. Relocating soon? Check verified Packers & Movers!"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Message Body</label>
              <textarea
                rows={4}
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                placeholder="Type your message content here..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> <span>Deploy Live Blast</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SUPPORT GROUP
  // ----------------------------------------------------
  if (currentTab === 'tickets' || currentTab === 'complaints' || currentTab === 'escalations') {
    const activeTicket = tickets.find(t => t.id === activeTicketId);

    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentInput.trim() || !activeTicketId) return;
      addTicketComment(activeTicketId, commentInput);
      setCommentInput('');
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Support Ticket Workspace</h2>
          <p className="text-xs text-slate-400 mt-0.5">Solve business complaints, resolve escalation logs, and interact with operators</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket list */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Tickets Directory</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {tickets.map(t => (
                <div
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`p-3 border rounded-xl cursor-pointer transition-all ${
                    activeTicketId === t.id 
                      ? 'border-blue-500 bg-blue-50/10' 
                      : 'border-slate-100 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                    <span>{t.id}</span>
                    <span className={`px-1.5 rounded-sm font-bold ${
                      t.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-650'
                    }`}>{t.priority}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 truncate">{t.title}</h4>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                    <span className="text-slate-500">{t.userName}</span>
                    <span className={`font-semibold ${
                      t.status === 'Open' ? 'text-indigo-600' :
                      t.status === 'In Progress' ? 'text-amber-500' : 'text-emerald-600'
                    }`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket details / conversation */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between h-[65vh]">
            {activeTicket ? (
              <>
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{activeTicket.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Created by {activeTicket.userName} ({activeTicket.userRole})</p>
                  </div>
                  <select
                    value={activeTicket.status}
                    onChange={(e) => updateTicketStatus(activeTicket.id, e.target.value as any)}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-2">
                  {activeTicket.comments.map((c, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-700">{c.author}</span>
                        <span className="text-slate-400">{c.date}</span>
                      </div>
                      <p className="text-xs text-slate-650 font-medium leading-normal">{c.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="flex gap-2 border-t border-slate-100 pt-3">
                  <input
                    type="text"
                    placeholder="Type official operator response..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reply
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                <LifeBuoy className="w-10 h-10 stroke-1" />
                <p className="text-xs">Select a support ticket from the list to begin audit resolution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SETTINGS GROUP
  // ----------------------------------------------------
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="font-bold text-slate-800 text-base">Console Configuration ({currentTab})</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control security keys, payment gateway details, SMTP servers and theme variables</p>
        </div>

        {/* General Settings */}
        {currentTab === 'general-settings' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-650 mb-1">Company / App Name</label>
              <input type="text" defaultValue="Meganods Discovery Ltd" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block font-semibold text-slate-650 mb-1">Admin Email Coordinator</label>
              <input type="email" defaultValue="coordinator@localhub.com" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <button onClick={() => alert("Settings saved")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save Settings</button>
          </div>
        )}

        {/* Branding settings */}
        {currentTab === 'branding-settings' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-650 mb-1">Primary Color HEX</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={primaryBrandColor}
                  onChange={(e) => setPrimaryBrandColor(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs flex-1"
                />
                <span className="w-9 h-9 rounded-lg border border-slate-200" style={{ backgroundColor: primaryBrandColor }} />
              </div>
            </div>
            <button onClick={() => alert("Theme modified")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Update Brand Colors</button>
          </div>
        )}

        {/* Gateway settings */}
        {currentTab === 'gateway-settings' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-650 mb-1">Razorpay API Key ID</label>
              <input type="text" defaultValue="rzp_live_90as8d9021a" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block font-semibold text-slate-650 mb-1">Razorpay Key Secret</label>
              <input type="password" value="••••••••••••••••••••••••" readOnly className="w-full px-3 py-2 bg-slate-55 border border-slate-200 rounded-lg text-xs" />
            </div>
            <button onClick={() => alert("Gateway updated")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save Gateway Keys</button>
          </div>
        )}

        {/* Email settings */}
        {currentTab === 'email-settings' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-650 mb-1">SMTP Server Host</label>
              <input type="text" defaultValue="smtp.secureserver.net" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block font-semibold text-slate-650 mb-1">SMTP Server Port</label>
              <input type="text" defaultValue="587" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <button onClick={() => alert("SMTP Saved")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save SMTP Configuration</button>
          </div>
        )}

        {/* SMS Settings */}
        {currentTab === 'sms-settings' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-650 mb-1">SMS Gateway Client Provider</label>
              <select
                value={smsGatewaySelected}
                onChange={(e) => setSmsGatewaySelected(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Twilio">Twilio Blaster</option>
                <option value="MSG91">MSG91</option>
                <option value="Plivo">Plivo SMS</option>
              </select>
            </div>
            <button onClick={() => alert("SMS Client Configured")} className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg">Save SMS Provider</button>
          </div>
        )}

        {/* API keys manager */}
        {currentTab === 'api-settings' && (
          <div className="space-y-4">
            <form onSubmit={handleAddApiKey} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">Register Custom Integrator Token</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key Token Name (e.g. Mobile App Client)"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  required
                />
                <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg">
                  Generate
                </button>
              </div>
            </form>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700">Active API Keys</h4>
              {apiKeys.map((k, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-800">{k.name}</strong>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{k.token}</p>
                  </div>
                  <button onClick={() => setApiKeys(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 text-[10px] font-bold">Revoke</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
