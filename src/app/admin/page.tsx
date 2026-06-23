'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import DashboardOverview from '../components/DashboardOverview';
import BusinessManagement from '../components/BusinessManagement';
import LeadsManagement from '../components/LeadsManagement';
import ReviewManagement from '../components/ReviewManagement';
import OtherPanels from '../components/OtherPanels';
import EcommerceManagement from '../components/EcommerceManagement';

export default function AdminPage() {
  const { isLoggedIn, currentTab } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminModuleTab, setAdminModuleTab] = useState<'services' | 'ecommerce'>('services');

  // Automatically close sidebar when user changes active tab on mobile viewports
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentTab]);

  if (!isLoggedIn) {
    return <Login />;
  }

  // Render workspace content based on active tab
  const renderContent = () => {
    if (currentTab === 'dashboard') {
      return adminModuleTab === 'ecommerce'
        ? <EcommerceManagement activeSubTab="dashboard" />
        : <DashboardOverview />;
    }
    
    if (currentTab.includes('business') || currentTab.includes('listing') || currentTab.includes('approval') || currentTab.includes('suspended')) {
      return <BusinessManagement />;
    }

    if (currentTab.includes('lead')) {
      return <LeadsManagement />;
    }

    if (currentTab.includes('review')) {
      return <ReviewManagement />;
    }

    if (currentTab.includes('vendor') || currentTab.includes('product') || currentTab.includes('order')) {
      return <EcommerceManagement />;
    }

    // Default handler for settings, locations, categories, notifications, ads, reports, etc.
    return <OtherPanels />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          adminModuleTab={adminModuleTab}
          setAdminModuleTab={setAdminModuleTab}
        />

        {/* Main content grid containing: Center Panel, and Right Panel (integrated on large viewports) */}
        <main className="flex-1 min-w-0 xl:mr-80 pl-0 lg:pl-64 transition-all">
          <div className="p-4 sm:p-6 max-w-6xl mx-auto pb-12">
            {renderContent()}
          </div>
        </main>

        {/* Right Sidebar Panel */}
        <RightSidebar />
      </div>
    </div>
  );
}
