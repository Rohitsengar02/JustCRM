'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Business } from '../mockDb';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  TrendingUp,
  MessageCircle,
  Settings,
  ArrowLeft,
  Star,
  DollarSign,
  Plus,
  Search,
  Filter,
  Users,
  CreditCard,
  Percent,
  ChevronDown,
  ChevronRight,
  Shield,
  Eye,
  CheckCircle,
  Truck,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart2,
  Calendar,
  Gift,
  RefreshCw,
  Printer,
  ChevronLeft,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function VendorPanel() {
  const { businesses, addActivity } = useApp();

  // Navigation Routing States
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    products: true,
    orders: true,
    marketing: false,
    analytics: false,
    settings: false
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const [currentUser, setCurrentUser] = useState<Business | null>(null);

  // Advanced States
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [shippingCarrier, setShippingCarrier] = useState('FedEx Express');
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fallback Store Profile
  const defaultStore: Business = {
    id: 'store-default',
    name: 'MegaGadgets Depot',
    owner: 'Rohit Sengar',
    category: 'Electronic Goods Dealers',
    phone: '98765 43210',
    email: 'hello@megagadgets.com',
    location: { city: 'Mumbai', area: 'Andheri East', locality: 'Andheri East', address: 'B-12, Ground Floor, Electronic Arcade, Lamington Road' },
    status: 'Premium',
    subscription: 'Platinum',
    rating: 4.8,
    leadsCount: 42,
    createdDate: '2026-02-10',
    logo: '🔌',
    images: [],
    about: 'MegaGadgets Depot is your premium destination for cutting-edge smart home automation hubs, wireless chargers, security sensors, and electronic items.',
    services: [],
    products: ['Smart Home Hub v2', 'Wireless Fast Charger 15W', 'Soundwave Noise Cancelling Buds'],
    businessHours: '10:00 AM - 08:00 PM',
    revenue: 245000,
    ratingAnalytics: { stars5: 28, stars4: 6, stars3: 1, stars2: 0, stars1: 0 }
  };

  // E-commerce state lists
  const [productsList, setProductsList] = useState<any[]>([
    { id: 'p-1', title: 'Smart Home Hub v2', price: 4999, stock: 35, category: 'Home Automation', image: '🔌', desc: 'Control all smart devices in one central hub. Fully compatible with Apple HomeKit, Google Home & Alexa.', rating: 4.9, sales: 85, weight: '350g', color: 'Midnight Black' },
    { id: 'p-2', title: 'Wireless Fast Charger 15W', price: 1499, stock: 8, category: 'Accessories', image: '🔋', desc: 'Qi-certified wireless charging pad. High-efficiency chipset provides 15W high-speed charging for iPhones and Samsung Galaxy.', rating: 4.6, sales: 142, weight: '120g', color: 'Arctic White' },
    { id: 'p-3', title: 'Soundwave Noise Cancelling Buds', price: 3999, stock: 45, category: 'Audio', image: '🎧', desc: 'Active noise cancellation with 30hr battery life. Premium audio drivers for deep bass and rich treble detail.', rating: 4.8, sales: 62, weight: '45g', color: 'Navy Blue' },
    { id: 'p-4', title: 'Ambient Smart LED Strip', price: 1999, stock: 65, category: 'Home Automation', image: '💡', desc: '20 Million colors option with sync feature. Connects directly to local Wi-Fi router network.', rating: 4.7, sales: 98, weight: '210g', color: 'RGB Spectrum' }
  ]);

  const [ordersList, setOrdersList] = useState<any[]>([
    { id: 'ORD-1049', customerName: 'Aman Sharma', product: 'Smart Home Hub v2', qty: 1, amount: 4999, status: 'Pending', date: '2026-06-22', phone: '+91 93456 78901', email: 'aman.sharma@gmail.com', address: 'Shop 4, Patel Estate, Road 12, Andheri East, Mumbai - 400059', payMethod: 'UPI Payment', trackingCode: '' },
    { id: 'ORD-1048', customerName: 'Sneha Rao', product: 'Wireless Fast Charger 15W', qty: 2, amount: 2998, status: 'Shipped', date: '2026-06-20', phone: '+91 92345 67890', email: 'sneha.rao@yahoo.co.in', address: '88, Sony World Signal Road, Koramangala 5th Block, Bangalore - 560095', payMethod: 'Credit Card', trackingCode: 'TRK-FDX-998827' },
    { id: 'ORD-1047', customerName: 'Vikram Singh', product: 'Soundwave Noise Cancelling Buds', qty: 1, amount: 3999, status: 'Delivered', date: '2026-06-18', phone: '+91 91234 56789', email: 'vikram.singh@corp.in', address: 'Flat 12B, Outer Circle, Connaught Place, New Delhi - 110001', payMethod: 'NetBanking', trackingCode: 'TRK-BD-442211' },
    { id: 'ORD-1046', customerName: 'Karan Malhotra', product: 'Wireless Fast Charger 15W', qty: 1, amount: 1499, status: 'Cancelled', date: '2026-06-17', phone: '+91 98223 34455', email: 'karan.m@gmail.com', address: 'Sector 4, Malviya Nagar, Jaipur - 322012', payMethod: 'Cash on Delivery', trackingCode: '' },
    { id: 'ORD-1045', customerName: 'Nikita Rao', product: 'Ambient Smart LED Strip', qty: 3, amount: 5997, status: 'Delivered', date: '2026-06-15', phone: '+91 88990 01122', email: 'nikita@apexdental.in', address: 'GP Block, Salt Lake Sector 5, Kolkata - 700091', payMethod: 'UPI Payment', trackingCode: 'TRK-DHL-112233' }
  ]);

  const [couponsList, setCouponsList] = useState<any[]>([
    { code: 'GADGET20', discount: 20, type: 'Percentage', minSpend: 3000, status: 'Active', usageLimit: 150, usages: 42 },
    { code: 'FIRSTSTORE', discount: 500, type: 'Flat INR', minSpend: 2000, status: 'Active', usageLimit: 50, usages: 18 },
    { code: 'FREECHARGER', discount: 1499, type: 'Flat INR', minSpend: 10000, status: 'Paused', usageLimit: 10, usages: 2 }
  ]);

  const [adCampaigns, setAdCampaigns] = useState<any[]>([
    { id: 'ad-101', title: 'Smart Hub Spotlight', placement: 'Category Featured Banner', impressions: 24500, clicks: 1840, budget: 15000, status: 'Active', ctr: 7.51 },
    { id: 'ad-102', title: 'Accessories Push Deal', placement: 'Homepage Sponsored Listing', impressions: 48900, clicks: 2310, budget: 25000, status: 'Active', ctr: 4.72 },
    { id: 'ad-103', title: 'Audio Buds Promo', placement: 'Search Recommendation Placement', impressions: 12400, clicks: 310, budget: 8000, status: 'Paused', ctr: 2.50 }
  ]);

  const [reviewsList, setReviewsList] = useState<any[]>([
    { id: 'rev-1', customerName: 'Aman Sharma', rating: 5, content: 'Outstanding build quality. Connected with all smart home sensors instantly.', date: '3 days ago', response: '' },
    { id: 'rev-2', customerName: 'Sneha Rao', rating: 4, content: 'Charger works perfectly fine, but the wire length could be longer.', date: '5 days ago', response: 'Thanks for the review Sneha! We will communicate this to our production team.' },
    { id: 'rev-3', customerName: 'Nikita Rao', rating: 5, content: 'Extremely vibrant LED strips. Syncs with music perfectly.', date: '1 week ago', response: '' }
  ]);

  const [payoutsList, setPayoutsList] = useState<any[]>([
    { id: 'pay-202', amount: 84900, date: '2026-06-15', status: 'Transferred', bank: 'HDFC Bank (**** 4432)' },
    { id: 'pay-201', amount: 55000, date: '2026-06-01', status: 'Transferred', bank: 'HDFC Bank (**** 4432)' }
  ]);

  const [inboxMessages, setInboxMessages] = useState<any[]>([
    { id: 'msg-1', sender: 'Aman Sharma', text: 'Does the Smart Home Hub support Apple HomeKit out of the box?', time: '10:45 AM', replied: false, history: [] },
    { id: 'msg-2', sender: 'Sneha Rao', text: 'Attached the product photo. Can I replace the color to Navy Blue?', time: 'Yesterday', replied: true, history: [{ sender: 'store', text: 'Hi Sneha, yes! We can dispatch the Navy Blue model instead. Hope that helps!' }] }
  ]);

  // Form input states
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductComparePrice, setNewProductComparePrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('10');
  const [newProductCategory, setNewProductCategory] = useState('Accessories');
  const [newProductEmoji, setNewProductEmoji] = useState('📦');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductColor, setNewProductColor] = useState('Midnight Black');
  const [newProductSKU, setNewProductSKU] = useState('');
  const [newProductModel, setNewProductModel] = useState('');
  const [newProductWeight, setNewProductWeight] = useState('200g');
  const [newProductTag, setNewProductTag] = useState('New Arrival');
  const [newProductSizes, setNewProductSizes] = useState<string[]>([]);

  // Detailed Product Attributes
  const [newProductBrand, setNewProductBrand] = useState('MekaLabs');
  const [newProductWarranty, setNewProductWarranty] = useState('1 Year Manufacturer Warranty');
  const [newProductDimensions, setNewProductDimensions] = useState('12 x 8 x 5 cm');
  const [newProductInTheBox, setNewProductInTheBox] = useState('Main Unit, Charging Cable, User Manual');
  const [newProductFeatures, setNewProductFeatures] = useState<string[]>(['High durability material', 'Premium quality finish']);
  const [featureInput, setFeatureInput] = useState('');

  // Custom Dynamic Variants
  const [customVariants, setCustomVariants] = useState<{ id: string; optionName: string; optionValue: string; additionalPrice: number; stock: number; sku: string }[]>([
    { id: 'v-1', optionName: 'Color', optionValue: 'Midnight Black', additionalPrice: 0, stock: 10, sku: 'SKU-BLK-MID' },
    { id: 'v-2', optionName: 'Color', optionValue: 'Arctic White', additionalPrice: 0, stock: 15, sku: 'SKU-WHT-ARC' }
  ]);
  const [varOptionName, setVarOptionName] = useState('Color');
  const [varOptionValue, setVarOptionValue] = useState('');
  const [varAddPrice, setVarAddPrice] = useState('0');
  const [varStock, setVarStock] = useState('10');
  const [varSKU, setVarSKU] = useState('');

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponMinSpend, setNewCouponMinSpend] = useState('1500');
  const [newCouponType, setNewCouponType] = useState('Percentage');

  const [replyTexts, setReplyTexts] = useState<{ [msgId: string]: string }>({});
  const [reviewReplyTexts, setReviewReplyTexts] = useState<{ [revId: string]: string }>({});

  const [editOwner, setEditOwner] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [editHours, setEditHours] = useState('');
  const [editLogo, setEditLogo] = useState('');

  // Load profile from localStorage on mount
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
          setEditLogo(parsed.logo || '🔌');
        } catch (e) {
          console.error("Error parsing business context profile", e);
        }
      } else {
        setCurrentUser(defaultStore);
        setEditOwner(defaultStore.owner || '');
        setEditAbout(defaultStore.about || '');
        setEditHours(defaultStore.businessHours || '');
        setEditLogo(defaultStore.logo || '🔌');
      }
    }
  }, []);

  const storeUser = currentUser || defaultStore;

  // Add Product Action
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductTitle.trim() || !newProductPrice.trim()) return;
    const computedSKU = newProductSKU.trim() || `SKU-${Math.floor(100000 + Math.random() * 900000)}`;
    const computedModel = newProductModel.trim() || `M-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProduct = {
      id: `p-${Date.now()}`,
      title: newProductTitle,
      price: parseFloat(newProductPrice),
      comparePrice: newProductComparePrice ? parseFloat(newProductComparePrice) : null,
      stock: parseInt(newProductStock) || 0,
      category: newProductCategory,
      image: newProductEmoji,
      desc: newProductDesc,
      rating: 5.0,
      sales: 0,
      weight: newProductWeight,
      color: newProductColor,
      sku: computedSKU,
      model: computedModel,
      tag: newProductTag,
      sizes: newProductSizes,
      brand: newProductBrand,
      warranty: newProductWarranty,
      dimensions: newProductDimensions,
      inTheBox: newProductInTheBox,
      features: newProductFeatures,
      variants: customVariants
    };
    setProductsList(prev => [newProduct, ...prev]);
    setNewProductTitle('');
    setNewProductPrice('');
    setNewProductComparePrice('');
    setNewProductStock('10');
    setNewProductDesc('');
    setNewProductColor('Midnight Black');
    setNewProductSKU('');
    setNewProductModel('');
    setNewProductWeight('200g');
    setNewProductTag('New Arrival');
    setNewProductSizes([]);
    setNewProductBrand('MekaLabs');
    setNewProductWarranty('1 Year Manufacturer Warranty');
    setNewProductDimensions('12 x 8 x 5 cm');
    setNewProductInTheBox('Main Unit, Charging Cable, User Manual');
    setNewProductFeatures(['High durability material', 'Premium quality finish']);
    setCustomVariants([
      { id: 'v-1', optionName: 'Color', optionValue: 'Midnight Black', additionalPrice: 0, stock: 10, sku: 'SKU-BLK-MID' },
      { id: 'v-2', optionName: 'Color', optionValue: 'Arctic White', additionalPrice: 0, stock: 15, sku: 'SKU-WHT-ARC' }
    ]);
    setActiveTab('products-all');
    addActivity(`New product "${newProduct.title}" added with variants to store catalog`, 'business');
    alert("Product successfully added to inventory!");
  };

  // Delete Product
  const handleDeleteProduct = (prodId: string) => {
    setProductsList(prev => prev.filter(p => p.id !== prodId));
    alert("Product removed from catalog.");
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrdersList(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addActivity(`Order #${orderId} status updated to "${status}"`, 'lead');
    alert(`Order status updated to ${status}!`);
  };

  // Dispatch Courier Shipping Simulator
  const handleShipCourier = () => {
    if (!selectedOrder) return;
    const trk = `TRK-${shippingCarrier.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrdersList(prev =>
      prev.map(ord => (ord.id === selectedOrder.id ? { ...ord, status: 'Shipped', trackingCode: trk } : ord))
    );
    setShowShippingModal(false);
    setSelectedOrder(null);
    alert(`Shipment dispatch initialized via ${shippingCarrier}! Tracking Code: ${trk}`);
  };

  // Add Promo Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !newCouponDiscount.trim()) return;
    const newCoupon = {
      code: newCouponCode.toUpperCase().replace(/\s+/g, ''),
      discount: parseFloat(newCouponDiscount),
      type: newCouponType,
      minSpend: parseFloat(newCouponMinSpend) || 0,
      status: 'Active',
      usageLimit: 100,
      usages: 0
    };
    setCouponsList(prev => [newCoupon, ...prev]);
    setNewCouponCode('');
    setNewCouponDiscount('');
    setNewCouponMinSpend('1500');
    setActiveTab('marketing-coupons');
    alert("Promotion coupon registered successfully!");
  };

  // Toggle Ad Campaign
  const handleToggleAdCampaign = (adId: string) => {
    setAdCampaigns(prev =>
      prev.map(ad => (ad.id === adId ? { ...ad, status: ad.status === 'Active' ? 'Paused' : 'Active' } : ad))
    );
  };

  // Reply to Customer Messages
  const handlePostReply = (msgId: string) => {
    const text = replyTexts[msgId];
    if (!text || !text.trim()) return;
    setInboxMessages(prev =>
      prev.map(msg =>
        msg.id === msgId
          ? {
            ...msg,
            replied: true,
            history: [...msg.history, { sender: 'store', text }]
          }
          : msg
      )
    );
    setReplyTexts(prev => ({ ...prev, [msgId]: '' }));
    alert("Reply sent to customer inbox!");
  };

  // Publish review response
  const handlePostReviewReply = (revId: string) => {
    const text = reviewReplyTexts[revId];
    if (!text || !text.trim()) return;
    setReviewsList(prev =>
      prev.map(r => (r.id === revId ? { ...r, response: text } : r))
    );
    setReviewReplyTexts(prev => ({ ...prev, [revId]: '' }));
    alert("Review response reply published!");
  };

  // Save Store Settings Info
  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...storeUser,
      owner: editOwner,
      about: editAbout,
      businessHours: editHours,
      logo: editLogo
    };
    setCurrentUser(updated);
    localStorage.setItem('registeredBusiness', JSON.stringify(updated));
    alert("Store configuration details saved successfully!");
  };

  // Simulation Refresh Data
  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Mocking some new stats or info
    }, 1000);
  };

  const isTabActive = (tab: string) => activeTab === tab;

  // Compute stats
  const totalRevenue = ordersList.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.amount, 0) + storeUser.revenue;
  const pendingOrders = ordersList.filter(o => o.status === 'Pending').length;
  const shippedOrders = ordersList.filter(o => o.status === 'Shipped').length;
  const totalProductsCount = productsList.length;

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f8fafc] text-slate-800'} font-sans`} style={{ zoom: 1.3 }}>
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside className={`w-full lg:w-72 flex flex-col shrink-0 text-left border-r ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'} shadow-sm overflow-y-auto`}>
        <div className="p-5 border-b border-slate-150 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-1.5 bg-orange-50 border border-orange-200 rounded-xl select-none">
                {storeUser.logo || '🔌'}
              </span>
              <div className="min-w-0">
                <h2 className="text-xs font-black text-slate-900 truncate leading-tight uppercase tracking-wider">{storeUser.name}</h2>
                <span className="text-[8px] text-orange-600 font-black uppercase tracking-widest block mt-0.5">{storeUser.category} • E-commerce Vendor</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-emerald-600 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-wide flex items-center gap-0.5">
              🛡️ Store Verified
            </span>
            <span className="bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-wide">
              Level: Gold Seller
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search store console..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-slate-55 border border-slate-250 rounded-xl py-1.5 pl-8 pr-3 text-[10px] font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isTabActive('dashboard') ? 'bg-orange-50 text-orange-700 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-orange-500" />
            <span>Dashboard Overview</span>
          </button>

          {/* Orders Catalog */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('orders')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-450 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Order Management</span>
              {expandedGroups.orders ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.orders && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'orders-all', label: 'All Orders' },
                  { id: 'orders-pending', label: 'Pending Shipments' },
                  { id: 'orders-shipped', label: 'Shipped Packages' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${isTabActive(item.id) ? 'text-orange-600 font-bold bg-orange-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Products Catalog */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('products')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-455 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Products Catalog</span>
              {expandedGroups.products ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.products && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'products-all', label: 'All Inventory' },
                  { id: 'products-add', label: 'Add New Product' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${isTabActive(item.id) ? 'text-orange-600 font-bold bg-orange-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Promotional Hub */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('marketing')}
              className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-slate-455 uppercase tracking-widest hover:text-slate-700 transition-colors"
            >
              <span>Marketing Center</span>
              {expandedGroups.marketing ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {expandedGroups.marketing && (
              <div className="pl-4 space-y-1 border-l border-slate-200 ml-4">
                {[
                  { id: 'marketing-coupons', label: 'Discount Codes' },
                  { id: 'marketing-create-coupon', label: 'Generate Coupon' },
                  { id: 'marketing-ads', label: 'Ad Campaigns' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-semibold block transition-colors ${isTabActive(item.id) ? 'text-orange-600 font-bold bg-orange-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Customer Reviews */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('reviews-all')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isTabActive('reviews-all') ? 'bg-orange-50 text-orange-700 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Reviews & Ratings</span>
            </button>
          </div>

          {/* Billing & Payout Desk */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('billing-payouts')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isTabActive('billing-payouts') ? 'bg-orange-50 text-orange-700 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <CreditCard className="w-4 h-4 text-indigo-500" />
              <span>Billing & Payout Desk</span>
            </button>
          </div>

          {/* Buyer Inquiries */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('inbox-all')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isTabActive('inbox-all') ? 'bg-orange-50 text-orange-700 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-purple-500" />
                <span>Buyer Inquiries</span>
              </span>
              <span className="bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black">1</span>
            </button>
          </div>

          {/* Settings */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('settings-store')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isTabActive('settings-store') ? 'bg-orange-50 text-orange-700 shadow-3xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Store Configuration</span>
            </button>
          </div>
        </nav>

        {/* Back Link to directory */}
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
      <main className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-orange-950 text-white p-6 rounded-[28px] border border-slate-200/10 shadow-md text-left relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl p-1 bg-white/10 rounded-xl backdrop-blur-md">{storeUser.logo || '🔌'}</span>
              <div>
                <span className="text-[10px] text-orange-400 font-extrabold tracking-wider uppercase flex items-center gap-1">🛒 Premium E-commerce Store Console</span>
                <h1 className="text-xl font-black text-white tracking-tight">{storeUser.name}</h1>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                ⭐ Platinum Seller Partner
              </span>
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-extrabold text-[8px] uppercase tracking-wider shadow-sm">
                Store Rating: {storeUser.rating.toFixed(1)} / 5.0
              </span>
              <button
                onClick={handleRefreshData}
                className="bg-white/10 hover:bg-white/20 p-1 rounded-lg text-white transition-all cursor-pointer flex items-center gap-1 text-[8px] font-bold"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Sync
              </button>
            </div>
          </div>

          <div className="flex gap-2.5 z-10 flex-wrap">
            <button
              onClick={() => setActiveTab('products-add')}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer shadow-sm shadow-orange-500/20"
            >
              + List Product
            </button>
            <button
              onClick={() => setActiveTab('marketing-create-coupon')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/20 border border-white/20 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer"
            >
              Create Coupon
            </button>
          </div>
        </div>

        {/* Dashboard Overview view */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {[
                { label: 'E-commerce Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign className="text-emerald-500 w-4 h-4" />, desc: 'Delivered orders + base', growth: '+15.2%' },
                { label: 'Pending Shipments', val: pendingOrders, icon: <AlertTriangle className="text-orange-500 w-4 h-4" />, desc: 'Awaiting dispatch', growth: '3 priority' },
                { label: 'Shipped Packages', val: shippedOrders, icon: <Truck className="text-indigo-500 w-4 h-4" />, desc: 'In-transit couriers', growth: 'Normal load' },
                { label: 'Avg Order Value (AOV)', val: `₹3,150`, icon: <TrendingUp className="text-teal-500 w-4 h-4" />, desc: 'Basket size metrics', growth: '+8.4%' }
              ].map((c, i) => (
                <div key={i} className="bg-white border border-slate-200/80 p-5 rounded-[22px] shadow-3xs relative overflow-hidden flex flex-col justify-between min-h-[120px] hover:shadow-xs transition-shadow">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{c.label}</span>
                    <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg shrink-0">{c.icon}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">{c.val}</h3>
                      <p className="text-[8px] text-slate-450 font-bold uppercase tracking-wide mt-0.5">{c.desc}</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {c.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Analytics Graphs & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Graph Area */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs text-left space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">Revenue Sales Trend Graph</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Weekly Performance Curve</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">June 2026</span>
                </div>
                {/* SVG Area Chart */}
                <div className="h-48 w-full pt-4">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />

                    {/* Area fill */}
                    <path
                      d="M 0 150 L 0 120 Q 80 85 160 100 T 320 45 T 480 30 L 500 30 L 500 150 Z"
                      fill="url(#salesGrad)"
                    />

                    {/* Trend Line */}
                    <path
                      d="M 0 120 Q 80 85 160 100 T 320 45 T 480 30 L 500 30"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Chart Dots */}
                    <circle cx="0" cy="120" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                    <circle cx="160" cy="100" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                    <circle cx="320" cy="45" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                    <circle cx="480" cy="30" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                  </svg>
                  <div className="flex justify-between text-[8px] text-slate-400 font-extrabold uppercase tracking-wider pt-2.5">
                    <span>Week 1 (₹45k)</span>
                    <span>Week 2 (₹65k)</span>
                    <span>Week 3 (₹85k)</span>
                    <span>Week 4 (₹110k)</span>
                  </div>
                </div>
              </div>

              {/* Product Share & Stock Alert */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs text-left space-y-5">
                <h3 className="font-black text-slate-900 text-sm">Product Sales Distribution</h3>
                <div className="space-y-3.5">
                  {[
                    { name: 'Smart Home Hub v2', share: 55, color: 'bg-orange-500', sales: '85 sold' },
                    { name: 'Wireless Fast Charger 15W', share: 30, color: 'bg-indigo-500', sales: '142 sold' },
                    { name: 'Soundwave Buds', share: 15, color: 'bg-teal-500', sales: '62 sold' }
                  ].map((p, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-800">{p.name}</span>
                        <span className="text-slate-400 font-extrabold">{p.share}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div style={{ width: `${p.share}%` }} className={`h-full ${p.color}`} />
                      </div>
                      <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{p.sales}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions & Low Stock alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Processing checklist */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs text-left space-y-4">
                <h3 className="font-black text-slate-900 text-sm">Fulfillment Tasks</h3>
                <div className="space-y-3">
                  {ordersList.filter(o => o.status === 'Pending').map(ord => (
                    <div key={ord.id} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl hover:border-slate-300">
                      <div>
                        <h4 className="font-black text-slate-800 text-[10px]">#{ord.id} - {ord.customerName}</h4>
                        <p className="text-[8px] text-slate-400 font-bold block mt-0.5">{ord.product}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setShowShippingModal(true);
                        }}
                        className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[9px] rounded-lg cursor-pointer"
                      >
                        Dispatch
                      </button>
                    </div>
                  ))}
                  {ordersList.filter(o => o.status === 'Pending').length === 0 && (
                    <p className="text-[10px] text-slate-400 italic">No pending packages to ship!</p>
                  )}
                </div>
              </div>

              {/* Low Stock Warning */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs text-left space-y-4">
                <h3 className="font-black text-slate-900 text-sm">Low Stock Warnings</h3>
                <div className="space-y-3">
                  {productsList.filter(p => p.stock <= 15).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-amber-50/50 border border-amber-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{p.image}</span>
                        <div>
                          <h4 className="text-[10px] font-extrabold text-amber-900 truncate leading-tight max-w-[120px]">{p.title}</h4>
                          <span className="text-[8px] text-amber-700 font-bold block mt-0.5">Stock Left: {p.stock}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const amt = prompt("Enter stock recharge amount:", "50");
                          if (amt) {
                            setProductsList(prev => prev.map(item => item.id === p.id ? { ...item, stock: item.stock + parseInt(amt) } : item));
                            alert("Stock updated successfully!");
                          }
                        }}
                        className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-extrabold rounded-lg cursor-pointer"
                      >
                        Restock
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Ad Stats */}
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-2xs text-left space-y-4">
                <h3 className="font-black text-slate-900 text-sm">Active Advertising Campaign</h3>
                <div className="space-y-3">
                  {adCampaigns.slice(0, 2).map(ad => (
                    <div key={ad.id} className="p-3 bg-slate-50 border rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-[10px] text-slate-800">{ad.title}</h4>
                        <span className={`w-1.5 h-1.5 rounded-full ${ad.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-black">Impressions</span>
                          <span className="font-extrabold text-[9px] text-slate-800">{ad.impressions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-black">Clicks</span>
                          <span className="font-extrabold text-[9px] text-slate-800">{ad.clicks.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-black">CTR</span>
                          <span className="font-extrabold text-[9px] text-emerald-600 font-black">{ad.ctr}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders list views */}
        {activeTab.startsWith('orders') && (
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-5">
            <h3 className="font-black text-slate-900 text-base">E-commerce Customer Order Console</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Process customer checkout orders, generate courier tracking details, or cancel pending requests.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-[11px] text-slate-655 font-semibold">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[9px] tracking-wider">
                    <th className="py-3 text-left">Order ID</th>
                    <th className="py-3 text-left">Buyer Details</th>
                    <th className="py-3 text-left">Products Ordered</th>
                    <th className="py-3 text-left">Total Value</th>
                    <th className="py-3 text-left">Payment Method</th>
                    <th className="py-3 text-left">Current Status</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList
                    .filter(ord => {
                      if (activeTab === 'orders-pending') return ord.status === 'Pending';
                      if (activeTab === 'orders-shipped') return ord.status === 'Shipped';
                      return true;
                    })
                    .map(ord => (
                      <tr key={ord.id} className="border-b border-slate-100 hover:bg-slate-55 transition-colors">
                        <td className="py-3.5 font-bold text-slate-900">#{ord.id}</td>
                        <td className="py-3.5">
                          <p className="font-extrabold text-slate-800">{ord.customerName}</p>
                          <span className="text-[9px] text-slate-450 block">{ord.phone} • {ord.email}</span>
                        </td>
                        <td className="py-3.5 font-bold">{ord.product} (x{ord.qty})</td>
                        <td className="py-3.5 font-black text-slate-900">₹{ord.amount.toLocaleString()}</td>
                        <td className="py-3.5 text-slate-500 font-extrabold">{ord.payMethod}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            ord.status === 'Shipped' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                              ord.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                            {ord.status}
                          </span>
                          {ord.trackingCode && (
                            <span className="block text-[8px] text-slate-400 font-mono mt-1">{ord.trackingCode}</span>
                          )}
                        </td>
                        <td className="py-3.5 text-center flex gap-1.5 justify-center">
                          {ord.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setShowShippingModal(true);
                                }}
                                className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[9px] rounded-lg cursor-pointer"
                              >
                                Ship Courier
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.id, 'Cancelled')}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-655 font-extrabold text-[9px] rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {ord.status === 'Shipped' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] rounded-lg cursor-pointer"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {(ord.status === 'Delivered' || ord.status === 'Cancelled') && (
                            <span className="text-[10px] text-slate-400 italic font-semibold">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Catalog View */}
        {activeTab === 'products-all' && (
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-base">Store Catalog Inventory</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Manage product lists, stock balances, and pricing attributes.</p>
              </div>
              <button
                onClick={() => setActiveTab('products-add')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer shadow-sm"
              >
                + Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {productsList.map(prod => (
                <div key={prod.id} className="border border-slate-200 hover:border-slate-350 bg-white p-5 rounded-2xl flex gap-4 transition-all relative overflow-hidden group">
                  <span className="text-4xl p-2 bg-slate-50 border border-slate-100 rounded-xl select-none shrink-0 h-fit">
                    {prod.image}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="inline-block text-[8px] bg-slate-100 text-slate-550 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{prod.category}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="text-[9px] text-orange-600 hover:underline font-extrabold cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-[9px] text-rose-500 hover:underline font-extrabold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <h4 className="font-black text-slate-855 text-sm leading-tight truncate">{prod.title}</h4>
                    {prod.brand && <p className="text-[9px] text-slate-400 font-bold tracking-wide">Brand: {prod.brand}</p>}
                    <p className="text-[10px] text-slate-450 font-semibold leading-relaxed line-clamp-2">{prod.desc || 'No product details description provided.'}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-black text-slate-900">₹{prod.price}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${prod.stock <= 15 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        Stock: {prod.stock} units
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product details view modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border rounded-[28px] max-w-lg w-full p-6 text-left space-y-4">
              <div className="flex justify-between items-start border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedProduct.image}</span>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{selectedProduct.title}</h3>
                    <span className="text-[8px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded uppercase font-black">{selectedProduct.category}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
              </div>
              <div className="space-y-3 text-[11px] text-slate-655 font-semibold">
                <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Description</span>{selectedProduct.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Retail Price</span>₹{selectedProduct.price} {selectedProduct.comparePrice && <span className="text-[9px] line-through text-slate-400 font-normal ml-1">₹{selectedProduct.comparePrice}</span>}</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Stock Level</span>{selectedProduct.stock} units</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Product SKU / Model</span>{selectedProduct.sku || 'N/A'} • {selectedProduct.model || 'N/A'}</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Color / Weight</span>{selectedProduct.color || 'N/A'} • {selectedProduct.weight || 'N/A'}</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Product Badge Tag</span><span className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded text-[9px] font-bold">{selectedProduct.tag || 'Standard'}</span></p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Available Sizes / Variants</span>{selectedProduct.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes.join(', ') : 'None'}</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Brand / Warranty</span>{selectedProduct.brand || 'MekaLabs'} • {selectedProduct.warranty || '1 Year'}</p>
                  <p><span className="text-slate-400 font-extrabold uppercase block text-[8px]">Dimensions / In Box</span>{selectedProduct.dimensions || 'N/A'} • {selectedProduct.inTheBox || 'N/A'}</p>
                </div>
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-extrabold uppercase block text-[8px]">Key Highlights</span>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[10px] text-slate-700">
                      {selectedProduct.features.map((f: string, idx: number) => <li key={idx}>{f}</li>)}
                    </ul>
                  </div>
                )}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-extrabold uppercase block text-[8px] mb-1">Custom Variants</span>
                    <div className="border rounded-lg overflow-hidden text-[9px]">
                      {selectedProduct.variants.map((v: any, idx: number) => (
                        <div key={idx} className="flex justify-between p-1.5 border-b bg-slate-50 last:border-b-0">
                          <span className="font-bold text-slate-700">{v.optionName}: {v.optionValue}</span>
                          <span className="text-slate-500">₹{v.additionalPrice > 0 ? `+${v.additionalPrice}` : 'Base'} • Stock: {v.stock} • SKU: {v.sku}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs cursor-pointer"
              >
                Close Product Details
              </button>
            </div>
          </div>
        )}

        {/* Add Product Form */}
        {activeTab === 'products-add' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Form Side */}
              <div className="flex-1 bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm text-left space-y-6">
                <div className="pb-4 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] bg-orange-50 text-orange-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Store Inventory Desk
                    </span>
                    <h3 className="font-black text-slate-900 text-base mt-1.5">Add Product to Store Catalog</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('products-all')}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-655 font-bold rounded-xl text-[10px] transition-all cursor-pointer"
                  >
                    Back to List
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider border-b pb-1">1. Basic Info & Branding</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-450 uppercase tracking-wider">Product Title</label>
                        <input
                          type="text"
                          value={newProductTitle}
                          onChange={(e) => setNewProductTitle(e.target.value)}
                          placeholder="e.g. Wireless Noise Buds"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-450 uppercase tracking-wider">Brand Name</label>
                        <input
                          type="text"
                          value={newProductBrand}
                          onChange={(e) => setNewProductBrand(e.target.value)}
                          placeholder="e.g. MekaLabs"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-450 uppercase tracking-wider">Category</label>
                        <select
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-orange-500"
                        >
                          <option value="Accessories">Accessories</option>
                          <option value="Audio">Audio</option>
                          <option value="Home Automation">Home Automation</option>
                          <option value="Hardware">Hardware & Electronics</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-450 uppercase tracking-wider">Promo Badge Tag</label>
                        <select
                          value={newProductTag}
                          onChange={(e) => setNewProductTag(e.target.value)}
                          className="w-full bg-slate-55 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-orange-500"
                        >
                          <option value="New Arrival">✨ New Arrival</option>
                          <option value="Best Seller">🔥 Best Seller</option>
                          <option value="Trending">⚡ Trending Spotlight</option>
                          <option value="Discount Offer">🎁 Special Offer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider font-extrabold">Product Emoji Representative</label>
                      <div className="flex gap-1.5 flex-wrap">
                        {['🔌', '🔋', '🎧', '💡', '⌚', '📺', '📦', '📱', '👕', '👟'].map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setNewProductEmoji(emoji)}
                            className={`text-xl p-2 rounded-xl border transition-all cursor-pointer ${newProductEmoji === emoji ? 'bg-orange-50 border-orange-500 scale-105 shadow-2xs' : 'bg-slate-50 border-slate-200 hover:border-slate-350'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Product Description</label>
                      <textarea
                        rows={2}
                        value={newProductDesc}
                        onChange={(e) => setNewProductDesc(e.target.value)}
                        placeholder="Compelling specs and compatible details..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                      />
                    </div>
                  </div>

                  {/* Pricing and Stock */}
                  <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider border-b pb-1 border-slate-200">2. Pricing & Stock</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Price (INR)</label>
                        <input
                          type="number"
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(e.target.value)}
                          placeholder="e.g. 2999"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500 text-slate-850"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Compare Price / MRP</label>
                        <input
                          type="number"
                          value={newProductComparePrice}
                          onChange={(e) => setNewProductComparePrice(e.target.value)}
                          placeholder="e.g. 3999"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Initial Stock</label>
                        <input
                          type="number"
                          value={newProductStock}
                          onChange={(e) => setNewProductStock(e.target.value)}
                          placeholder="e.g. 20"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attributes and Shipping */}
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider border-b pb-1">3. Tech Specs & Shipping</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">SKU</label>
                        <input
                          type="text"
                          value={newProductSKU}
                          onChange={(e) => setNewProductSKU(e.target.value)}
                          placeholder="Auto-generated if empty"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Model No</label>
                        <input
                          type="text"
                          value={newProductModel}
                          onChange={(e) => setNewProductModel(e.target.value)}
                          placeholder="Auto-generated if empty"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Warranty</label>
                        <input
                          type="text"
                          value={newProductWarranty}
                          onChange={(e) => setNewProductWarranty(e.target.value)}
                          placeholder="e.g. 1 Year Warranty"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Weight</label>
                        <input
                          type="text"
                          value={newProductWeight}
                          onChange={(e) => setNewProductWeight(e.target.value)}
                          placeholder="e.g. 200g"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Dimensions</label>
                        <input
                          type="text"
                          value={newProductDimensions}
                          onChange={(e) => setNewProductDimensions(e.target.value)}
                          placeholder="e.g. 10x8x4 cm"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-455 uppercase tracking-wider">Box Package Contents</label>
                        <input
                          type="text"
                          value={newProductInTheBox}
                          onChange={(e) => setNewProductInTheBox(e.target.value)}
                          placeholder="e.g. Cable, Manual, buds"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider border-b pb-1">4. Highlights</h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="Add key highlight (e.g. IPX7 waterproof)"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-855"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (featureInput.trim()) {
                              setNewProductFeatures(prev => [...prev, featureInput.trim()]);
                              setFeatureInput('');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (featureInput.trim()) {
                            setNewProductFeatures(prev => [...prev, featureInput.trim()]);
                            setFeatureInput('');
                          }
                        }}
                        className="px-3 bg-orange-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newProductFeatures.map((feat, idx) => (
                        <span key={idx} className="bg-slate-100 border text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                          {feat}
                          <button type="button" onClick={() => setNewProductFeatures(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 font-bold">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Custom Variants Creator */}
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider border-b pb-1">5. Custom Product Variants</h4>
                    <div className="bg-slate-50 border p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase">Option Name</label>
                        <select
                          value={varOptionName}
                          onChange={(e) => setVarOptionName(e.target.value)}
                          className="w-full bg-white border px-2 py-1 rounded text-xs text-slate-805 font-bold focus:outline-none focus:border-orange-500"
                        >
                          <option value="Color">Color</option>
                          <option value="Size">Size</option>
                          <option value="Storage">Storage</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase">Option Value</label>
                        <input
                          type="text"
                          value={varOptionValue}
                          onChange={(e) => setVarOptionValue(e.target.value)}
                          placeholder="e.g. Pearl White"
                          className="w-full px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase">Add. Price (INR)</label>
                        <input
                          type="number"
                          value={varAddPrice}
                          onChange={(e) => setVarAddPrice(e.target.value)}
                          placeholder="0"
                          className="w-full px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-855"
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (!varOptionValue.trim()) return;
                            const priceOffset = parseFloat(varAddPrice) || 0;
                            const stockAmt = parseInt(varStock) || 0;
                            const customSKU = varSKU.trim() || `SKU-${varOptionName.substring(0,3).toUpperCase()}-${varOptionValue.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
                            setCustomVariants(prev => [...prev, {
                              id: `v-${Date.now()}`,
                              optionName: varOptionName,
                              optionValue: varOptionValue.trim(),
                              additionalPrice: priceOffset,
                              stock: stockAmt,
                              sku: customSKU
                            }]);
                            setVarOptionValue('');
                            setVarSKU('');
                          }}
                          className="w-full py-1.5 bg-slate-800 text-white font-bold rounded text-[10px] hover:bg-slate-900 cursor-pointer"
                        >
                          Add Option
                        </button>
                      </div>
                    </div>

                    {customVariants.length > 0 && (
                      <div className="border rounded-xl overflow-hidden bg-white">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="bg-slate-50 border-b text-slate-400 font-bold uppercase">
                              <th className="p-2">Attribute</th>
                              <th className="p-2">Price Offset</th>
                              <th className="p-2 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customVariants.map((v) => (
                              <tr key={v.id} className="border-b last:border-b-0 hover:bg-slate-50">
                                <td className="p-2 font-black text-slate-800">{v.optionName}: <span className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded font-black">{v.optionValue}</span></td>
                                <td className="p-2 font-bold text-slate-700">+{v.additionalPrice} INR</td>
                                <td className="p-2 text-right">
                                  <button type="button" onClick={() => setCustomVariants(prev => prev.filter(x => x.id !== v.id))} className="text-red-500 hover:text-red-750 font-black">Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all uppercase tracking-wider text-center"
                  >
                    Publish Product to Store Catalog
                  </button>
                </form>
              </div>

              {/* Sticky Real-time Storefront Preview */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="sticky top-6 space-y-4">
                  <div className="bg-slate-900 text-slate-200 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider text-center">
                    ✨ Real-Time Storefront Preview
                  </div>

                  <div className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-lg text-left relative overflow-hidden group">
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-50 border border-orange-100 text-orange-700 text-[8px] font-black px-2 py-0.5 rounded-lg uppercase">
                        {newProductTag || 'New Arrival'}
                      </span>
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-4xl select-none mx-auto mt-2 shadow-2xs">
                        {newProductEmoji || '📦'}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] bg-slate-100 text-slate-500 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {newProductCategory || 'Accessories'}
                        </span>
                        <p className="text-[9px] text-slate-400 font-bold mt-1">Brand: {newProductBrand || 'MekaLabs'}</p>
                        <h4 className="font-black text-slate-855 text-sm leading-tight truncate mt-1">
                          {newProductTitle || 'Your Product Title'}
                        </h4>
                        <p className="text-[10px] text-slate-455 font-semibold leading-relaxed line-clamp-3">
                          {newProductDesc || 'Provide a beautiful specification description above.'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-black text-slate-900 block">
                            ₹{newProductPrice || '0.00'}
                          </span>
                          {newProductComparePrice && (
                            <span className="text-[9px] line-through text-slate-455 font-semibold">
                              MRP: ₹{newProductComparePrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border px-1.5 py-0.5 rounded uppercase">
                          Stock: {newProductStock || '0'}
                        </span>
                      </div>

                      {newProductFeatures.length > 0 && (
                        <div className="space-y-1 pt-2 border-t border-slate-100">
                          <span className="text-[8px] text-slate-450 font-black uppercase tracking-wider block">Key Features</span>
                          <ul className="text-[9px] space-y-0.5 font-semibold text-slate-700">
                            {newProductFeatures.slice(0, 3).map((feat, idx) => (
                              <li key={idx} className="truncate">• {feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {customVariants.length > 0 && (
                        <div className="space-y-1 pt-2 border-t border-slate-100">
                          <span className="text-[8px] text-slate-455 font-black uppercase tracking-wider block">Options ({customVariants.length})</span>
                          <div className="flex gap-1 flex-wrap">
                            {customVariants.map((v, i) => (
                              <span key={i} className="text-[8px] bg-orange-50 text-orange-700 border font-bold px-1.5 py-0.5 rounded">
                                {v.optionValue}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'marketing-coupons' && (
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-black text-slate-900 text-base">Store Discount Coupons</h3>
                        <p className="text-xs text-slate-500 font-semibold mt-1">Configure active codes to display on checkout screens.</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('marketing-create-coupon')}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        + Generate Coupon
                      </button>
                    </div>

                    <div className="space-y-3">
                      {couponsList.map(c => (
                        <div key={c.code} className="flex justify-between items-center border border-slate-150 p-4 rounded-xl hover:border-slate-350 bg-white transition-all">
                          <div className="space-y-1.5">
                            <span className="font-mono bg-orange-50 text-orange-700 px-3 py-1 rounded-md text-xs font-black tracking-wider border border-orange-200">
                              {c.code}
                            </span>
                            <p className="text-[10px] text-slate-500 font-bold">
                              Discount: <span className="text-slate-800">{c.discount} {c.type === 'Percentage' ? '%' : 'INR'}</span> • Min Spend: ₹{c.minSpend}
                            </p>
                          </div>
                          <div className="text-right space-y-1.5">
                            <span className={`text-[8px] border px-2 py-0.5 rounded uppercase font-black ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                              {c.status}
                            </span>
                            <span className="block text-[8px] text-slate-400 font-extrabold uppercase">Usages: {c.usages} / {c.usageLimit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Create Coupon view */}
                {activeTab === 'marketing-create-coupon' && (
                  <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-[24px] p-8 shadow-md text-left space-y-6">
                    <h3 className="font-black text-slate-900 text-base">Generate Store Discount Coupon</h3>
                    <form onSubmit={handleCreateCoupon} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Coupon Promo Code</label>
                        <input
                          type="text"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value)}
                          placeholder="e.g. FLASH30"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Discount Value</label>
                          <input
                            type="number"
                            value={newCouponDiscount}
                            onChange={(e) => setNewCouponDiscount(e.target.value)}
                            placeholder="e.g. 20"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-855"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Discount Type</label>
                          <select
                            value={newCouponType}
                            onChange={(e) => setNewCouponType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-250 px-3.5 py-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500 text-slate-850 cursor-pointer"
                          >
                            <option value="Percentage">Percentage %</option>
                            <option value="Flat INR">Flat INR Discount</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Minimum Cart Spend requirement (INR)</label>
                        <input
                          type="number"
                          value={newCouponMinSpend}
                          onChange={(e) => setNewCouponMinSpend(e.target.value)}
                          placeholder="e.g. 1500"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-855"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer text-center block"
                      >
                        Register Promo Code
                      </button>
                    </form>
                  </div>
                )}

                {/* Ad Campaigns view */}
                {activeTab === 'marketing-ads' && (
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-6">
                    <h3 className="font-black text-slate-900 text-base">Meganods Sponsored Advertising Console</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Bid and manage sponsored banners on categories and search result placements.</p>

                    <div className="space-y-4 mt-4">
                      {adCampaigns.map(ad => (
                        <div key={ad.id} className="border p-5 rounded-2xl bg-white hover:shadow-2xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-black text-slate-800 text-sm">{ad.title}</h4>
                              <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-0.5 rounded tracking-wide">{ad.placement}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4 pt-2">
                              <div>
                                <span className="block text-[7px] text-slate-400 uppercase font-black">Impressions</span>
                                <span className="font-extrabold text-[10px] text-slate-800">{ad.impressions.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="block text-[7px] text-slate-400 uppercase font-black">Clicks</span>
                                <span className="font-extrabold text-[10px] text-slate-800">{ad.clicks.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="block text-[7px] text-slate-400 uppercase font-black">CTR Score</span>
                                <span className="font-black text-[10px] text-emerald-600">{ad.ctr}%</span>
                              </div>
                              <div>
                                <span className="block text-[7px] text-slate-400 uppercase font-black">Ad Budget</span>
                                <span className="font-extrabold text-[10px] text-slate-800">₹{ad.budget.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleToggleAdCampaign(ad.id)}
                              className={`px-3.5 py-2 font-extrabold text-[10px] rounded-xl border transition-all cursor-pointer ${ad.status === 'Active' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                                }`}
                            >
                              {ad.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                            </button>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${ad.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-slate-50 text-slate-400 border-slate-250'
                              }`}>
                              {ad.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews and Ratings view */}
                {activeTab === 'reviews-all' && (
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-6">
                    <h3 className="font-black text-slate-900 text-base">Buyer Ratings & Feedback Hub</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Review feedback ratings, post official store replies, and track satisfaction analytics.</p>

                    <div className="space-y-4 mt-4">
                      {reviewsList.map(rev => (
                        <div key={rev.id} className="border p-5 rounded-2xl bg-white space-y-3.5 hover:shadow-2xs transition-shadow">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h4 className="font-black text-slate-800 text-xs">{rev.customerName}</h4>
                              <span className="text-[8px] text-slate-400 font-bold block mt-0.5">{rev.date}</span>
                            </div>
                            {/* Star representation */}
                            <div className="flex gap-0.5 text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-655 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                            "{rev.content}"
                          </p>

                          {rev.response ? (
                            <div className="ml-6 space-y-1 border-l-2 border-orange-500 pl-3">
                              <span className="block text-[8px] font-black uppercase text-orange-650 tracking-wider">Official Store Response</span>
                              <p className="text-[11px] font-semibold text-slate-700 leading-relaxed">"{rev.response}"</p>
                            </div>
                          ) : (
                            <div className="flex gap-2 pt-2">
                              <input
                                type="text"
                                placeholder="Post official public response reply..."
                                value={reviewReplyTexts[rev.id] || ''}
                                onChange={(e) => setReviewReplyTexts(prev => ({ ...prev, [rev.id]: e.target.value }))}
                                className="flex-1 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-800"
                              />
                              <button
                                onClick={() => handlePostReviewReply(rev.id)}
                                className="px-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-colors"
                              >
                                Publish Reply
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Billing & Payout Desk */}
                {activeTab === 'billing-payouts' && (
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-6">
                    <h3 className="font-black text-slate-900 text-base">E-commerce Payouts & Billing Console</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Manage linked bank accounts, see pending payout balances, and review transfer statements.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <div className="border border-slate-150 p-5 rounded-2xl bg-slate-50/50 space-y-2">
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block">Next Scheduled Payout</span>
                        <h4 className="text-base font-black text-slate-900">₹45,190</h4>
                        <p className="text-[8px] text-slate-450 font-bold block">Estimated Release: June 25, 2026</p>
                      </div>

                      <div className="border border-slate-150 p-5 rounded-2xl bg-slate-50/50 space-y-2">
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block">Linked Payout Account</span>
                        <h4 className="text-sm font-black text-slate-800">HDFC BANK LTD</h4>
                        <p className="text-[8px] text-slate-450 font-bold block">Account No: ******* 4432 (Verified)</p>
                      </div>

                      <div className="border border-slate-150 p-5 rounded-2xl bg-orange-50 border-orange-200 text-orange-950 space-y-2">
                        <span className="text-[8px] text-orange-600 font-black uppercase tracking-wider block">Payout Threshold Limit</span>
                        <h4 className="text-base font-black text-orange-900">₹1,000 Minimum</h4>
                        <p className="text-[8px] text-orange-700 font-bold block">All settlements processed automatically.</p>
                      </div>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h4 className="font-black text-slate-800 text-sm border-b pb-2">Settlement Transfer Statements</h4>
                      <div className="space-y-3">
                        {payoutsList.map(pay => (
                          <div key={pay.id} className="flex justify-between items-center border border-slate-150 p-4 rounded-xl bg-white hover:border-slate-350 transition-all">
                            <div className="space-y-1">
                              <span className="font-extrabold text-[10px] text-slate-800">Payout #{pay.id}</span>
                              <p className="text-[8px] text-slate-450 block font-semibold">{pay.date} • Sent to {pay.bank}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <span className="font-black text-slate-900 text-xs">₹{pay.amount.toLocaleString()}</span>
                              <span className="block text-[8px] text-emerald-600 font-black uppercase tracking-wider">{pay.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Inbox Messaging */}
                {activeTab === 'inbox-all' && (
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-md text-left space-y-5">
                    <h3 className="font-black text-slate-900 text-base">Unified Buyer Messaging</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Reply to buyer pre-purchase inquiries and order support requests.</p>

                    <div className="space-y-4 mt-4">
                      {inboxMessages.map(msg => (
                        <div key={msg.id} className="border border-slate-150 p-5 rounded-2xl hover:border-slate-350 space-y-3 bg-white transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-black text-slate-800 text-xs">{msg.sender}</h4>
                              <span className="text-[8px] text-slate-400 font-bold tracking-wider">{msg.time}</span>
                            </div>
                            {msg.replied ? (
                              <span className="bg-emerald-50 text-emerald-700 text-[8px] px-2 py-0.5 border border-emerald-250 rounded uppercase font-black">
                                Replied
                              </span>
                            ) : (
                              <span className="bg-orange-50 text-orange-700 text-[8px] px-2 py-0.5 border border-orange-200 rounded uppercase font-black animate-pulse">
                                Awaiting Response
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-slate-655 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                            "{msg.text}"
                          </p>

                          {msg.history.map((hist: any, index: number) => (
                            <div key={index} className={`ml-6 space-y-1 pl-3 border-l-2 ${hist.sender === 'store' ? 'border-orange-500' : 'border-slate-300'}`}>
                              <span className="block text-[8px] font-black uppercase tracking-wider text-slate-450">
                                {hist.sender === 'store' ? 'Your Response' : 'Buyer'}
                              </span>
                              <p className="text-[11px] font-semibold text-slate-700 leading-relaxed">"{hist.text}"</p>
                            </div>
                          ))}

                          <div className="flex gap-2 pt-2">
                            <input
                              type="text"
                              placeholder="Type customer reply message details here..."
                              value={replyTexts[msg.id] || ''}
                              onChange={(e) => setReplyTexts(prev => ({ ...prev, [msg.id]: e.target.value }))}
                              className="flex-1 bg-slate-55 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-800"
                            />
                            <button
                              onClick={() => handlePostReply(msg.id)}
                              className="px-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-colors"
                            >
                              Send Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Store settings view */}
                {activeTab === 'settings-store' && (
                  <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-[24px] p-8 shadow-md text-left space-y-6">
                    <h3 className="font-black text-slate-900 text-base">Store Profile Settings</h3>
                    <form onSubmit={handleSaveStoreSettings} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Store Manager / Owner</label>
                          <input
                            type="text"
                            value={editOwner}
                            onChange={(e) => setEditOwner(e.target.value)}
                            placeholder="e.g. Digvijay Sen"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Support Operating Hours</label>
                          <input
                            type="text"
                            value={editHours}
                            onChange={(e) => setEditHours(e.target.value)}
                            placeholder="e.g. 10:00 AM - 08:00 PM"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Select Brand Logo Emoji</label>
                        <div className="flex gap-2">
                          {['🛒', '🔌', '👕', '🍳', '💄', '⚽', '📦', '💻', '👞', '🕶️'].map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => setEditLogo(emoji)}
                              className={`text-xl p-2 rounded-xl border transition-all cursor-pointer ${editLogo === emoji ? 'bg-orange-50 border-orange-500 scale-105 shadow-3xs' : 'bg-slate-55 border-slate-200 hover:border-slate-350'}`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Store Description Selling Bio</label>
                        <textarea
                          rows={4}
                          value={editAbout}
                          onChange={(e) => setEditAbout(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-slate-850 leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Save Store Configuration
                      </button>
                    </form>
                  </div>
                )}
              </main>

              {/* DISPATCH COURIER SIMULATOR MODAL */}
              {showShippingModal && selectedOrder && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                  <div className="bg-white border rounded-[28px] max-w-md w-full p-6 text-left space-y-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <h3 className="font-black text-slate-900 text-sm">Fulfill Order Shipment #{selectedOrder.id}</h3>
                      <button onClick={() => { setShowShippingModal(false); setSelectedOrder(null); }} className="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-[10px] font-semibold text-orange-950 leading-relaxed">
                      📦 **Courier Partner Integration**: Ship with our connected shipping services to automatically print thermal shipping labels and send SMS tracking links to the customer.
                    </div>

                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Select Logistics Courier Partner</label>
                        <select
                          value={shippingCarrier}
                          onChange={(e) => setShippingCarrier(e.target.value)}
                          className="w-full bg-slate-55 border px-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500 text-slate-850 cursor-pointer"
                        >
                          <option value="FedEx Express">FedEx Express Air</option>
                          <option value="BlueDart Logistics">BlueDart Logistics Prime</option>
                          <option value="Delhivery Super">Delhivery Ground Economy</option>
                          <option value="DHL Express International">DHL Express International</option>
                        </select>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-655 space-y-1">
                        <p><span className="font-bold text-slate-800">Buyer:</span> {selectedOrder.customerName}</p>
                        <p className="truncate"><span className="font-bold text-slate-800">Address:</span> {selectedOrder.address}</p>
                        <p><span className="font-bold text-slate-800">Value:</span> ₹{selectedOrder.amount.toLocaleString()} ({selectedOrder.product})</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3 border-t">
                      <button
                        onClick={() => { setShowShippingModal(false); setSelectedOrder(null); }}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs cursor-pointer"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={handleShipCourier}
                        className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs cursor-pointer"
                      >
                        Confirm Dispatch
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
}
