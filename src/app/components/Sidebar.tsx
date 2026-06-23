'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Tags,
  MapPin,
  Users,
  Inbox,
  Star,
  Megaphone,
  CreditCard,
  Search,
  BarChart3,
  Globe,
  Bell,
  LifeBuoy,
  Settings,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Sparkles
} from 'lucide-react';

interface SidebarSection {
  name: string;
  icon: React.ComponentType<any>;
  items: { name: string; tab: string }[];
}

export default function Sidebar({ 
  isOpen, 
  onClose,
  adminModuleTab,
  setAdminModuleTab
}: { 
  isOpen?: boolean; 
  onClose?: () => void;
  adminModuleTab: 'services' | 'ecommerce';
  setAdminModuleTab: (tab: 'services' | 'ecommerce') => void;
}) {
  const { currentTab, setCurrentTab, setIsLoggedIn, currentUser, setCurrentUser } = useApp();
  const [expandedSection, setExpandedSection] = useState<string | null>('Business Management');
  const [searchQuery, setSearchQuery] = useState('');

  const servicesSections: SidebarSection[] = [
    {
      name: 'Business Management',
      icon: Briefcase,
      items: [
        { name: 'All Businesses', tab: 'all-businesses' },
        { name: 'Add Business', tab: 'add-business' },
        { name: 'Pending Approval', tab: 'pending-approval' },
        { name: 'Verified Businesses', tab: 'verified-businesses' },
        { name: 'Featured Businesses', tab: 'featured-businesses' },
        { name: 'Premium Businesses', tab: 'premium-businesses' },
        { name: 'Suspended Listings', tab: 'suspended-listings' },
      ]
    },
    {
      name: 'Categories',
      icon: Tags,
      items: [
        { name: 'Categories', tab: 'categories' },
        { name: 'Sub Categories', tab: 'sub-categories' },
        { name: 'Attributes', tab: 'attributes' },
        { name: 'Category SEO', tab: 'category-seo' },
      ]
    },
    {
      name: 'Locations',
      icon: MapPin,
      items: [
        { name: 'Countries', tab: 'countries' },
        { name: 'States', tab: 'states' },
        { name: 'Cities', tab: 'cities' },
        { name: 'Areas', tab: 'areas' },
        { name: 'Localities', tab: 'localities' },
      ]
    },
    {
      name: 'Users',
      icon: Users,
      items: [
        { name: 'All Users', tab: 'all-users' },
        { name: 'Business Owners', tab: 'business-owners' },
        { name: 'Customers', tab: 'customers' },
        { name: 'Agents', tab: 'agents' },
        { name: 'Blocked Users', tab: 'blocked-users' },
      ]
    },
    {
      name: 'Leads Management',
      icon: Inbox,
      items: [
        { name: 'All Leads', tab: 'all-leads' },
        { name: 'New Leads', tab: 'new-leads' },
        { name: 'Assigned Leads', tab: 'assigned-leads' },
        { name: 'Converted Leads', tab: 'converted-leads' },
        { name: 'Lost Leads', tab: 'lost-leads' },
      ]
    },
    {
      name: 'Reviews',
      icon: Star,
      items: [
        { name: 'Reviews', tab: 'reviews' },
        { name: 'Pending Reviews', tab: 'pending-reviews' },
        { name: 'Reported Reviews', tab: 'reported-reviews' },
      ]
    },
    {
      name: 'Advertisements',
      icon: Megaphone,
      items: [
        { name: 'Banner Ads', tab: 'banner-ads' },
        { name: 'Featured Listings', tab: 'featured-listings' },
        { name: 'Sponsored Businesses', tab: 'sponsored-businesses' },
        { name: 'Ad Analytics', tab: 'ad-analytics' },
      ]
    },
    {
      name: 'Subscriptions',
      icon: CreditCard,
      items: [
        { name: 'Plans', tab: 'plans' },
        { name: 'Transactions', tab: 'transactions' },
        { name: 'Premium Members', tab: 'premium-members' },
      ]
    },
    {
      name: 'SEO',
      icon: Search,
      items: [
        { name: 'Meta Management', tab: 'meta-management' },
        { name: 'Sitemap', tab: 'sitemap' },
        { name: 'URL Management', tab: 'url-management' },
        { name: 'Schema Generator', tab: 'schema-generator' },
      ]
    },
    {
      name: 'Reports',
      icon: BarChart3,
      items: [
        { name: 'Revenue Reports', tab: 'revenue-reports' },
        { name: 'User Reports', tab: 'user-reports' },
        { name: 'Lead Reports', tab: 'lead-reports' },
        { name: 'Business Reports', tab: 'business-reports' },
      ]
    },
    {
      name: 'CMS',
      icon: Globe,
      items: [
        { name: 'Home Page', tab: 'home-page' },
        { name: 'About Page', tab: 'about-page' },
        { name: 'Contact Page', tab: 'contact-page' },
        { name: 'Blogs', tab: 'blogs' },
        { name: 'FAQs', tab: 'faqs' },
      ]
    },
    {
      name: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Push Notifications', tab: 'push-notifications' },
        { name: 'Email Campaigns', tab: 'email-campaigns' },
        { name: 'SMS Campaigns', tab: 'sms-campaigns' },
      ]
    },
    {
      name: 'Support',
      icon: LifeBuoy,
      items: [
        { name: 'Tickets', tab: 'tickets' },
        { name: 'Complaints', tab: 'complaints' },
        { name: 'Escalations', tab: 'escalations' },
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      items: [
        { name: 'General', tab: 'general-settings' },
        { name: 'Branding', tab: 'branding-settings' },
        { name: 'Payment Gateway', tab: 'gateway-settings' },
        { name: 'Email Config', tab: 'email-settings' },
        { name: 'SMS Config', tab: 'sms-settings' },
        { name: 'API Keys', tab: 'api-settings' },
      ]
    }
  ];

  const ecommerceSections: SidebarSection[] = [
    {
      name: 'Vendor Management',
      icon: Users,
      items: [
        { name: 'All Vendors', tab: 'all-vendors' },
        { name: 'Pending Verification', tab: 'pending-vendors' },
        { name: 'Premium Vendors', tab: 'premium-vendors' },
      ]
    },
    {
      name: 'Product Management',
      icon: Tags,
      items: [
        { name: 'All Products', tab: 'all-products' },
        { name: 'Add Product', tab: 'add-product' },
        { name: 'Product Categories', tab: 'product-categories' },
        { name: 'Review Moderation', tab: 'product-reviews' },
      ]
    },
    {
      name: 'Order Management',
      icon: Inbox,
      items: [
        { name: 'All Orders', tab: 'all-orders' },
        { name: 'Pending Shipments', tab: 'pending-orders' },
        { name: 'Completed Orders', tab: 'completed-orders' },
      ]
    },
    {
      name: 'Subscriptions',
      icon: CreditCard,
      items: [
        { name: 'Plans', tab: 'plans' },
        { name: 'Transactions', tab: 'transactions' },
      ]
    },
    {
      name: 'SEO',
      icon: Search,
      items: [
        { name: 'Meta Management', tab: 'meta-management' },
        { name: 'Sitemap', tab: 'sitemap' },
        { name: 'URL Management', tab: 'url-management' },
      ]
    },
    {
      name: 'Reports',
      icon: BarChart3,
      items: [
        { name: 'Revenue Reports', tab: 'revenue-reports' },
        { name: 'User Reports', tab: 'user-reports' },
      ]
    },
    {
      name: 'CMS',
      icon: Globe,
      items: [
        { name: 'Home Page', tab: 'home-page' },
        { name: 'Blogs', tab: 'blogs' },
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      items: [
        { name: 'General', tab: 'general-settings' },
        { name: 'Payment Gateway', tab: 'gateway-settings' },
        { name: 'API Keys', tab: 'api-settings' },
      ]
    }
  ];

  const activeSections = adminModuleTab === 'services' ? servicesSections : ecommerceSections;

  const handleToggle = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const filteredSections = activeSections.map(sec => {
    const matchedItems = sec.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...sec, items: matchedItems };
  }).filter(sec => sec.items.length > 0 || sec.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <aside className={`w-64 bg-white/95 border-r border-slate-200/80 flex flex-col h-[calc(100vh-64px)] fixed left-0 top-16 z-30 overflow-y-auto backdrop-blur-md shadow-sm transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      
      {/* Module Selector Tabs at Top of Sidebar */}
      <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 border-b border-slate-200 shrink-0">
        <button
          type="button"
          onClick={() => {
            setAdminModuleTab('services');
            setExpandedSection('Business Management');
          }}
          className={`py-2 text-[10px] uppercase tracking-wider font-black rounded-lg transition-all text-center cursor-pointer ${
            adminModuleTab === 'services'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
          }`}
        >
          🛠️ Services
        </button>
        <button
          type="button"
          onClick={() => {
            setAdminModuleTab('ecommerce');
            setExpandedSection('Vendor Management');
          }}
          className={`py-2 text-[10px] uppercase tracking-wider font-black rounded-lg transition-all text-center cursor-pointer ${
            adminModuleTab === 'ecommerce'
              ? 'bg-orange-655 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
          }`}
        >
          🛒 E-Commerce
        </button>
      </div>

      {/* Search Navigation */}
      <div className="p-4 border-b border-slate-100/85 shrink-0">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/70 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
          />
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 px-3 py-4 space-y-1.5">
        {/* Dashboard Link */}
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            currentTab === 'dashboard'
              ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </div>
        </button>

        {/* Dynamic Collapsible Groups */}
        {filteredSections.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = expandedSection === sec.name || searchQuery !== '';
          const hasActiveChild = sec.items.some(item => item.tab === currentTab);

          return (
            <div key={sec.name} className="space-y-1">
              <button
                onClick={() => handleToggle(sec.name)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  hasActiveChild
                    ? 'text-indigo-700 bg-indigo-50/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sec.name}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Sub items with Framer Motion AnimatePresence */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden pl-6 border-l border-slate-100 ml-5 space-y-1 mt-0.5"
                  >
                    {sec.items.map((item) => {
                      const isActive = currentTab === item.tab;
                      return (
                        <button
                          key={item.tab}
                          onClick={() => setCurrentTab(item.tab)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-indigo-50/80 text-indigo-700 font-extrabold border-l-2 border-indigo-600 pl-2'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* User Footer Panel */}
      <div className="p-4 border-t border-slate-100/90 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black text-slate-800 truncate">{currentUser?.name || 'Admin User'}</p>
            <p className="text-[10px] text-slate-400 font-semibold truncate">{currentUser?.role || 'Super Admin'}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }}
          title="Log Out"
          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
