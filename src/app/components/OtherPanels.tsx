'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  if (currentTab === 'categories' || currentTab === 'sub-categories' || currentTab === 'attributes' || currentTab === 'category-seo') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Category & Directory Taxonomy</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control category hierarchies, attributes, form schemes, and custom category metadata</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Add / Modify Category</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category Title</label>
                <input type="text" placeholder="e.g. Electricians" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Keywords SEO Title</label>
                <input type="text" placeholder="Best local electricians near you" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <button onClick={() => alert("Added successfully")} className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">
                Create Category Node
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Directory Categories ({categories.length})</h3>
            <div className="divide-y divide-slate-100">
              {categories.map((c) => (
                <div key={c.id} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Meta: {c.seoDesc}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.subcategories.map((s, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-semibold">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">{c.count} listings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOCATIONS GROUP
  // ----------------------------------------------------
  if (currentTab === 'countries' || currentTab === 'states' || currentTab === 'cities' || currentTab === 'areas' || currentTab === 'localities') {
    const handleAddLocation = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCityName.trim()) return;
      const newLoc = {
        id: `loc-${Date.now()}`,
        type: currentTab.slice(0, -1) as any, // states -> state, cities -> city
        name: newCityName,
        parent: 'loc-1',
        seoUrl: `/${newCityName.toLowerCase().replace(/\s+/g, '-')}`
      };
      setLocations(prev => [...prev, newLoc]);
      addActivity(`Added ${currentTab.slice(0, -1)} node: "${newCityName}"`, 'business');
      setNewCityName('');
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-bold text-slate-800 text-lg">Locations Directory Hierarchy ({currentTab})</h2>
            <p className="text-xs text-slate-400 mt-0.5">Setup local discovery locations database</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-650 px-3 py-1 rounded-full font-bold">Active Scope: {currentTab}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Add Geography Node ({currentTab.slice(0, -1)})</h3>
            <form onSubmit={handleAddLocation} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-650 mb-1">Node Title Name</label>
                <input
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="e.g. Outer Ring Road"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">
                Register Location Node
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Active Location Paths</h3>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {locations.filter(l => l.type === currentTab.slice(0, -1) || currentTab === 'cities' && l.type === 'city').map((loc) => (
                <div key={loc.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <strong className="text-slate-800">{loc.name}</strong>
                  <span className="text-[10px] text-slate-400">{loc.seoUrl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // USERS GROUP
  // ----------------------------------------------------
  if (currentTab === 'all-users' || currentTab === 'business-owners' || currentTab === 'customers' || currentTab === 'agents' || currentTab === 'blocked-users') {
    const getFilteredUsers = () => {
      if (currentTab === 'all-users') return users;
      if (currentTab === 'blocked-users') return users.filter(u => u.status === 'Blocked');
      if (currentTab === 'business-owners') return users.filter(u => u.role === 'Super Admin' || u.role === 'Admin'); // mock
      if (currentTab === 'customers') return users.filter(u => u.role === 'Support Agent' || u.role === 'Moderator'); // mock
      return users;
    };

    const toggleBlock = (id: string) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">System Access Directory ({currentTab})</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control employee authorization, moderators, field sales agents and listing owners</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">System Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Join Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredUsers().map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="p-3 font-semibold text-slate-800">{u.name}</td>
                    <td className="p-3 text-slate-650">{u.email}</td>
                    <td className="p-3 text-slate-650">{u.phone}</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                        u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{u.joinDate}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleBlock(u.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold text-white transition-all ${
                          u.status === 'Active' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {u.status === 'Active' ? 'Block Access' : 'Unblock Access'}
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
  // ADVERTISEMENTS GROUP
  // ----------------------------------------------------
  if (currentTab === 'banner-ads' || currentTab === 'featured-listings' || currentTab === 'sponsored-businesses' || currentTab === 'ad-analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Advertisement & Campaigns</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control homepage banners, keyword-targeted sponsors, and CTR analytics</p>
        </div>

        {/* Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Ad Impressions</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">1,68,200</h3>
            </div>
            <Megaphone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Ad Clicks</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">8,450</h3>
            </div>
            <Play className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Average Click-Through Rate (CTR)</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">5.02%</h3>
            </div>
            <Percent className="w-6 h-6 text-amber-500" />
          </div>
        </div>

        {/* Ad Campaigns Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Active Marketing Ad Placements</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <th className="p-3">Campaign Sponsor</th>
                  <th className="p-3">Ad Format</th>
                  <th className="p-3">Impressions</th>
                  <th className="p-3">Clicks</th>
                  <th className="p-3">CTR</th>
                  <th className="p-3">Daily Budget</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="p-3 font-semibold text-slate-700">{ad.businessName}</td>
                    <td className="p-3">{ad.type}</td>
                    <td className="p-3">{ad.impressions.toLocaleString()}</td>
                    <td className="p-3">{ad.clicks.toLocaleString()}</td>
                    <td className="p-3 font-bold text-blue-600">{ad.ctr}%</td>
                    <td className="p-3">₹{(ad.budget / 100).toFixed(0)}/day</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                        ad.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {ad.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold text-white transition-all ${
                          ad.status === 'Active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'
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
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Subscriptions & Accounts Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Audit transaction invoices, premium memberships, and pricing plan details</p>
        </div>

        {/* Pricing Plans List */}
        {currentTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: 'Free Listing', price: '₹0', features: 'Basic directory, standard verification badge' },
              { name: 'Silver Plan', price: '₹10,000/yr', features: 'Priority search leads, custom contact button' },
              { name: 'Gold Plan', price: '₹25,000/yr', features: 'Featured search placements, monthly leads blast' },
              { name: 'Platinum Premium', price: '₹50,000/yr', features: 'Unlimited search visibility, SMS marketing tool' }
            ].map((p) => (
              <div key={p.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{p.name}</h4>
                  <p className="text-xl font-extrabold text-blue-600 mt-1">{p.price}</p>
                  <p className="text-[10px] text-slate-500 mt-2">{p.features}</p>
                </div>
                <button onClick={() => alert("Cost tier edited")} className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition-all">
                  Edit Plan Cost
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Premium members Directory */}
        {currentTab === 'premium-members' && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Premium Directory Members</h3>
            <div className="space-y-2">
              {businesses.filter(b => b.status === 'Premium' || b.status === 'Featured').map(b => (
                <div key={b.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{b.logo}</span>
                    <strong className="text-slate-800">{b.name}</strong>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full">{b.subscription} Tier</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions list */}
        {currentTab === 'transactions' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h3 className="font-bold text-slate-800 mb-3 text-sm">Transaction Logs</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Business Listing</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">TXN-9028301</td>
                    <td className="p-3">Rajputana Heritage Grand Hotel</td>
                    <td className="p-3 font-bold text-slate-800">₹50,000</td>
                    <td className="p-3 text-slate-500">UPI</td>
                    <td className="p-3 text-emerald-600 font-bold">Successful</td>
                    <td className="p-3 text-slate-500">2026-06-19</td>
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
              <input type="text" defaultValue="Justdial Discovery Ltd" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
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
