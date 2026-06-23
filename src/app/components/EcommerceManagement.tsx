'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingCart,
  Tags,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Check,
  X,
  CreditCard,
  DollarSign,
  TrendingUp,
  Package,
  Activity,
  ShieldCheck,
  Ban,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  Inbox
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

interface MockProductVariation {
  id: string;
  name: string; // e.g., 'Red / 64GB' or 'Medium / Cotton'
  price: number;
  originalPrice: number;
  stock: number;
}

interface MockProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  vendorName: string;
  category: string;
  description?: string;
  brand?: string;
  stock?: number;
  variations?: MockProductVariation[];
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  products: { name: string; qty: number; price: number }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Completed';
  paymentMethod: string;
  date: string;
}

export default function EcommerceManagement({ activeSubTab }: { activeSubTab?: 'dashboard' | string }) {
  const { businesses, setBusinesses, currentTab, setCurrentTab } = useApp();

  // Local state for products catalog
  const [productsList, setProductsList] = useState<MockProduct[]>([
    { id: 'p-1', name: 'UltraHD Smart CCTV Camera', price: 2499, originalPrice: 3999, rating: 4.8, image: 'https://images.unsplash.com/photo-1557324218-8f38b36e7a31?w=400&q=80', vendorName: 'Smart Solution Electronics', category: 'electronics' },
    { id: 'p-2', name: 'Home Automation Smart Hub', price: 4999, originalPrice: 7999, rating: 4.7, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80', vendorName: 'Smart Solution Electronics', category: 'electronics' },
    { id: 'p-5', name: 'Premium Cotton Summer Tee', price: 699, originalPrice: 1299, rating: 4.4, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', vendorName: 'Khandelwal Apparel Hub', category: 'fashion' },
    { id: 'p-9', name: 'Modern Scandinavian Lounge Chair', price: 8999, originalPrice: 14999, rating: 4.9, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', vendorName: 'Malviya Decor & Furniture', category: 'decor' },
    { id: 'p-13', name: 'Premium Anti-Slip Yoga Mat', price: 799, originalPrice: 1499, rating: 4.7, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80', vendorName: 'Greenfield Sports Center', category: 'fitness' }
  ]);

  // Local state for orders tracking
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'MEG-ORD-9021',
      customerName: 'Amit Sharma',
      phone: '98765 12345',
      products: [{ name: 'UltraHD Smart CCTV Camera', qty: 1, price: 2499 }],
      total: 2598,
      status: 'Pending',
      paymentMethod: 'UPI',
      date: '2026-06-23'
    },
    {
      id: 'MEG-ORD-9022',
      customerName: 'Pooja Patel',
      phone: '91234 56789',
      products: [{ name: 'Premium Cotton Summer Tee', qty: 2, price: 699 }],
      total: 1497,
      status: 'Shipped',
      paymentMethod: 'Card',
      date: '2026-06-22'
    },
    {
      id: 'MEG-ORD-9023',
      customerName: 'Rohan Gupta',
      phone: '99887 76655',
      products: [{ name: 'Modern Scandinavian Lounge Chair', qty: 1, price: 8999 }],
      total: 9098,
      status: 'Completed',
      paymentMethod: 'COD',
      date: '2026-06-20'
    }
  ]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Add Product Form States
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOrigPrice, setNewProdOrigPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('electronics');
  const [newProdVendor, setNewProdVendor] = useState('Smart Solution Electronics');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdStock, setNewProdStock] = useState('10');
  
  // Variations state in add product
  const [newProdVariations, setNewProdVariations] = useState<MockProductVariation[]>([]);
  const [varNameInput, setVarNameInput] = useState('');
  const [varPriceInput, setVarPriceInput] = useState('');
  const [varOrigPriceInput, setVarOrigPriceInput] = useState('');
  const [varStockInput, setVarStockInput] = useState('10');

  // Inline Product Editing State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState('');

  // Product categories state
  const [productCategories, setProductCategories] = useState([
    { name: 'Electronics', slug: 'electronics', count: 18, icon: '⚡' },
    { name: 'Apparel & Fashion', slug: 'fashion', count: 12, icon: '👕' },
    { name: 'Decor & Furniture', slug: 'decor', count: 8, icon: '🪑' },
    { name: 'Sports & Fitness', slug: 'fitness', count: 4, icon: '🧘' }
  ]);

  // Product reviews state
  const [productReviews, setProductReviews] = useState([
    { id: 'rev-1', userName: 'Shashank Vyas', rating: 5, productName: 'UltraHD Smart CCTV Camera', comment: 'Excellent night vision clarity, installation was extremely smooth!', date: '2026-06-23', status: 'Pending' },
    { id: 'rev-2', userName: 'Karan Mehra', rating: 2, productName: 'Premium Cotton Summer Tee', comment: 'Stitching was coming off near the sleeve. Fabric quality is average.', date: '2026-06-22', status: 'Pending' },
    { id: 'rev-3', userName: 'Divya Bharti', rating: 4, productName: 'Modern Scandinavian Lounge Chair', comment: 'Very comfortable chair, wood finish matches my desk perfectly.', date: '2026-06-21', status: 'Approved' }
  ]);

  // Vendor KYC verification modal state
  const [auditVendor, setAuditVendor] = useState<any | null>(null);

  // Filter vendors from context
  const vendors = businesses.filter(b => b.businessType === 'vendor');
  
  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter products
  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter orders
  const filteredOrders = orders.filter(o =>
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Action handlers
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice || !newProdOrigPrice) return;

    const newProduct: MockProduct = {
      id: `p-${Date.now()}`,
      name: newProdName,
      price: Number(newProdPrice),
      originalPrice: Number(newProdOrigPrice),
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      vendorName: newProdVendor,
      category: newProdCategory,
      description: newProdDescription,
      brand: newProdBrand,
      stock: Number(newProdStock),
      variations: newProdVariations.length > 0 ? newProdVariations : undefined
    };

    setProductsList([newProduct, ...productsList]);
    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOrigPrice('');
    setNewProdDescription('');
    setNewProdBrand('');
    setNewProdStock('10');
    setNewProdVariations([]);
    alert("New product registered successfully!");
    setCurrentTab('all-products');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this product?")) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  const saveProductPrice = (id: string) => {
    if (!editPriceValue || isNaN(Number(editPriceValue))) return;
    setProductsList(productsList.map(p => p.id === id ? { ...p, price: Number(editPriceValue) } : p));
    setEditingPriceId(null);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'Pending' | 'Shipped' | 'Completed') => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    alert(`Order status updated to ${newStatus}`);
  };

  // Vendor Status Update helper
  const handleUpdateVendorStatus = (vendorId: string, status: 'Verified' | 'Pending' | 'Suspended' | 'Blocked') => {
    setBusinesses((prev: any[]) => prev.map(b => b.id === vendorId ? { ...b, status } : b));
    alert(`Vendor status updated to ${status}`);
    if (auditVendor && auditVendor.id === vendorId) {
      setAuditVendor((prev: any) => prev ? { ...prev, status } : null);
    }
  };

  // Render Sub-Views based on currentTab or activeSubTab
  const renderView = () => {
    const isDashboard = activeSubTab === 'dashboard' || currentTab === 'dashboard';

    // A. E-COMMERCE DASHBOARD
    if (isDashboard) {
      const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
      const pendingVendorsList = vendors.filter(v => v.status === 'Pending');

      // Mock Analytics Data for Ecom
      const ecomSalesTrend = [
        { day: 'Mon', revenue: 8500, orders: 3 },
        { day: 'Tue', revenue: 14500, orders: 5 },
        { day: 'Wed', revenue: 12000, orders: 4 },
        { day: 'Thu', revenue: 21500, orders: 8 },
        { day: 'Fri', revenue: 19800, orders: 7 },
        { day: 'Sat', revenue: 31000, orders: 12 },
        { day: 'Sun', revenue: totalSales || 38900, orders: 15 }
      ];

      const lowStockItems = [
        { id: 'p-1', name: 'UltraHD Smart CCTV Camera', stock: 2, vendor: 'Smart Solution Electronics', category: 'electronics' },
        { id: 'p-13', name: 'Premium Anti-Slip Yoga Mat', stock: 3, vendor: 'Greenfield Sports Center', category: 'fitness' }
      ];

      return (
        <div className="space-y-6 text-left">
          {/* Welcoming Interactive Ecom Hero Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-rose-500 to-amber-600 text-white rounded-3xl p-8 shadow-xl shadow-orange-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse duration-[6000ms]" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -mb-16 animate-pulse duration-[8000ms]" />

            <div className="relative z-10 space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10 text-orange-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-spin" />
                <span>E-Commerce Operations Panel Active</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Retailer Control Center</h2>
              <p className="text-xs md:text-sm text-orange-50/90 leading-relaxed">
                Analyze orders, verify vendor application profiles, and track store revenues. You have <span className="font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-4">{pendingVendorsList.length} pending KYC verifications</span> and <span className="font-bold text-white underline decoration-rose-300 decoration-2 underline-offset-4">{lowStockItems.length} low stock items</span> today.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3">
              <button
                onClick={() => setIsAddingProduct(true)}
                className="px-5 py-3 bg-white text-orange-655 font-bold rounded-2xl text-xs hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer border-none"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-4">Quick Retail Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setIsAddingProduct(true)}
                className="p-4 bg-orange-50/50 hover:bg-orange-50 border border-orange-100 rounded-xl text-center group transition-all"
              >
                <span className="text-2xl block mb-1 group-hover:scale-115 transition-transform">🏷️</span>
                <span className="font-black text-orange-850 text-xs block">Add Product</span>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Deploy listing</span>
              </button>
              
              <button
                onClick={() => {
                  alert("Navigating to Vendor Verification requests. Please audit any pending vendors in the list below.");
                }}
                className="p-4 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-xl text-center group transition-all"
              >
                <span className="text-2xl block mb-1 group-hover:scale-115 transition-transform">🛡️</span>
                <span className="font-black text-indigo-850 text-xs block">Verify Vendors</span>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{pendingVendorsList.length} applications</span>
              </button>

              <button
                onClick={() => alert("Sales Excel Report successfully prepared for download!")}
                className="p-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-xl text-center group transition-all"
              >
                <span className="text-2xl block mb-1 group-hover:scale-115 transition-transform">📊</span>
                <span className="font-black text-emerald-850 text-xs block">Sales Export</span>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Download CSV</span>
              </button>

              <button
                onClick={() => alert("System scanning completed. Security, CDN, and payment gateways are green!")}
                className="p-4 bg-slate-100/50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center group transition-all"
              >
                <span className="text-2xl block mb-1 group-hover:scale-115 transition-transform">⚙️</span>
                <span className="font-black text-slate-700 text-xs block">System Status</span>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">All nodes healthy</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Sales Revenue</span>
                <span className="text-xl font-black text-slate-900 block mt-1">₹{totalSales.toLocaleString()}</span>
                <span className="text-[9px] text-emerald-600 font-bold block mt-1">↑ 12.4% vs last week</span>
              </div>
              <span className="text-3xl p-3 bg-orange-50 border border-orange-100 rounded-xl select-none">₹</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Total Orders</span>
                <span className="text-xl font-black text-slate-900 block mt-1">{orders.length} Logged</span>
                <span className="text-[9px] text-indigo-650 font-bold block mt-1">100% direct pickups</span>
              </div>
              <span className="text-3xl p-3 bg-indigo-50 border border-indigo-100 rounded-xl select-none">🛒</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Retail Catalogs</span>
                <span className="text-xl font-black text-slate-900 block mt-1">{productsList.length} Items</span>
                <span className="text-[9px] text-orange-655 font-bold block mt-1">Across 4 major domains</span>
              </div>
              <span className="text-3xl p-3 bg-orange-50 border border-orange-100 rounded-xl select-none">🏷️</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Verified Outlets</span>
                <span className="text-xl font-black text-slate-900 block mt-1">{vendors.length} Sellers</span>
                <span className="text-[9px] text-emerald-600 font-bold block mt-1">Active live partners</span>
              </div>
              <span className="text-3xl p-3 bg-emerald-50 border border-emerald-100 rounded-xl select-none">🏢</span>
            </div>
          </div>

          {/* Charts & Graphs Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales revenue trend chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Weekly GMV Volume</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ecomSalesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEcomSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="revenue" name="Sales (₹)" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorEcomSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category split chart */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Order Split by Day</h3>
                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ecomSalesTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <RechartsTooltip />
                      <Bar dataKey="orders" name="Orders Count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block text-center mt-2">Weekends account for 45% of orders</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders List */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Recent Local Purchases</h3>
              <div className="space-y-3.5">
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-slate-50 border border-slate-200 rounded-xl gap-3 text-xs font-semibold">
                    <div className="flex gap-3 items-center min-w-0">
                      <span className="text-2xl p-2 bg-white border border-slate-150 rounded-xl select-none">📦</span>
                      <div className="min-w-0">
                        <span className="font-black text-slate-900 block leading-tight">{order.id}</span>
                        <span className="text-[10px] text-slate-500 block">Customer: {order.customerName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 sm:ml-auto">
                      <span className="font-black text-slate-850">₹{order.total.toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[8px] uppercase tracking-wider border ${
                        order.status === 'Completed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Sales Share */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Category Sales Share</h3>
              <div className="space-y-3.5 pt-2">
                {[
                  { name: 'Electronics', count: 18, pct: 45, bg: 'bg-orange-500' },
                  { name: 'Apparel & Clothing', count: 12, pct: 30, bg: 'bg-indigo-600' },
                  { name: 'Home Decor', count: 8, pct: 15, bg: 'bg-emerald-500' },
                  { name: 'Sports Goods', count: 4, pct: 10, bg: 'bg-slate-700' }
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-700">{cat.name}</span>
                      <span className="text-slate-900">{cat.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.bg}`} style={{ width: `${cat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock & Pending KYC Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Alerts */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500" /> Low Stock Alerts
                </h3>
                <span className="text-[10px] bg-rose-50 border border-rose-100 text-rose-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Action Required
                </span>
              </div>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                    <div>
                      <span className="font-extrabold text-slate-800 block leading-tight">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Seller: {item.vendor}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] bg-rose-100 text-rose-700 font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        {item.stock} Left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Vendor Verification Shortcut Requests */}
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-650" /> Pending KYC Audits
                </h3>
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  Verification Required
                </span>
              </div>
              <div className="space-y-3">
                {pendingVendorsList.length > 0 ? (
                  pendingVendorsList.map((vendor) => (
                    <div key={vendor.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none">{vendor.logo}</span>
                        <div>
                          <span className="font-extrabold text-slate-800 block leading-tight">{vendor.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{vendor.location.city} • {vendor.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setAuditVendor(vendor)}
                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-[9px] font-black rounded-lg uppercase tracking-wider transition-all border-none cursor-pointer"
                      >
                        Verify Now
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 font-bold">
                    🎉 All vendor verifications are up to date!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 1. VENDOR MANAGEMENT & VERIFICATION REQUESTS
    if (currentTab.includes('vendor')) {
      let filteredVendorList = filteredVendors;
      let title = "Vendor Management Panel";
      let desc = "Approve registration applications, verify document credentials, or suspend outlets.";

      if (currentTab === 'pending-vendors') {
        filteredVendorList = filteredVendors.filter(v => v.status === 'Pending');
        title = "Pending Verification Requests";
        desc = "Verify corporate PAN & GSTIN credentials of newly registered local sellers.";
      } else if (currentTab === 'premium-vendors') {
        filteredVendorList = filteredVendors.filter(v => v.subscription === 'Gold' || v.subscription === 'Platinum');
        title = "Premium Retail Outlets";
        desc = "High tier subscription outlets with featured visibility.";
      }

      return (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{desc}</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 w-4 h-4 my-auto shrink-0" />
              <input
                type="text"
                placeholder="Search by name, city, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Verification Details Modal Overlay */}
          {auditVendor && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-[24px] max-w-2xl w-full p-6 shadow-2xl space-y-6 relative overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setAuditVendor(null)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-xl text-slate-450 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <span className="text-[9px] bg-orange-50 border border-orange-200 text-orange-700 font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    Vendor Verification Request
                  </span>
                  <h3 className="font-black text-slate-900 text-lg mt-2 flex items-center gap-2">
                    <span>{auditVendor.logo}</span>
                    <span>{auditVendor.name}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Side: Document Details */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">KYC Credentials</h4>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 font-semibold text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">GSTIN Certificate:</span>
                        <span className="text-slate-800 font-mono">27AAAAA1111A1Z1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Corporate PAN:</span>
                        <span className="text-slate-800 font-mono">AAACG1234B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Outlet Owner:</span>
                        <span className="text-slate-800">{auditVendor.owner || 'Rohit Sengar'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone Contact:</span>
                        <span className="text-slate-800">{auditVendor.phone || '+91 98765 43210'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current Status:</span>
                        <span className={`inline-block font-extrabold text-[9px] uppercase tracking-wider ${
                          auditVendor.status === 'Verified' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>{auditVendor.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Map location */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">Outlet Location Map</h4>
                    <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                      <iframe
                        className="w-full h-full border-none pointer-events-none"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${72.8400}%2C${19.1100}%2C${72.8550}%2C${19.1250}&layer=mapnik&marker=19.1197%2C72.8464`}
                        title="Outlet Coordinates Preview"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight font-semibold">Address: {auditVendor.location?.address || 'Andheri East, Mumbai, Maharashtra'}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleUpdateVendorStatus(auditVendor.id, 'Suspended')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Suspend Vendor
                  </button>
                  <button
                    onClick={() => handleUpdateVendorStatus(auditVendor.id, 'Blocked')}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Block / Ban Vendor
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateVendorStatus(auditVendor.id, 'Verified');
                      setAuditVendor(null);
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg uppercase tracking-wider shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    Approve Verification
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vendor Cards Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVendorList.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-350 transition-all flex flex-col justify-between p-5 space-y-4 text-left"
              >
                {/* Card Header: Logo, Name, Subscription Tier */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-50 border border-slate-100 rounded-xl select-none shrink-0 block">
                      {vendor.logo}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-800 text-sm truncate leading-tight">{vendor.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Owner: {vendor.owner}</p>
                    </div>
                  </div>
                  <span className="text-[8px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {vendor.subscription}
                  </span>
                </div>

                {/* Card Body: Details */}
                <div className="space-y-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-orange-655 font-extrabold uppercase text-[10px]">{vendor.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-800 truncate max-w-[150px]">{vendor.location.city}, {vendor.location.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact:</span>
                    <span className="text-slate-700">{vendor.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status:</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[8px] uppercase tracking-wider border ${
                      vendor.status === 'Verified' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : vendor.status === 'Suspended'
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : vendor.status === 'Blocked'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-slate-50 border-slate-200 text-slate-650'
                    }`}>
                      {vendor.status === 'Verified' && <Check className="w-2.5 h-2.5 text-emerald-600" />}
                      {vendor.status === 'Suspended' && <Clock className="w-2.5 h-2.5 text-amber-600" />}
                      {vendor.status === 'Blocked' && <Ban className="w-2.5 h-2.5 text-rose-600" />}
                      <span>{vendor.status}</span>
                    </span>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 justify-between items-center">
                  <button
                    onClick={() => setAuditVendor(vendor)}
                    className="flex-1 min-w-[80px] py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-700 transition-all cursor-pointer border-none"
                  >
                    Audit KYC
                  </button>
                  
                  {vendor.status !== 'Suspended' && (
                    <button
                      onClick={() => handleUpdateVendorStatus(vendor.id, 'Suspended')}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-250 rounded-lg text-[9px] font-black uppercase text-amber-700 transition-all cursor-pointer border-none"
                    >
                      Suspend
                    </button>
                  )}
                  
                  {vendor.status !== 'Blocked' && (
                    <button
                      onClick={() => handleUpdateVendorStatus(vendor.id, 'Blocked')}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-250 rounded-lg text-[9px] font-black uppercase text-rose-700 transition-all cursor-pointer border-none"
                    >
                      Block
                    </button>
                  )}

                  {vendor.status !== 'Verified' && (
                    <button
                      onClick={() => handleUpdateVendorStatus(vendor.id, 'Verified')}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 rounded-lg text-[9px] font-black uppercase text-emerald-700 transition-all cursor-pointer border-none"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredVendorList.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-bold">No retail vendors found.</div>
            )}
          </div>
        </div>
      );
    }

    // 2. PRODUCT MANAGEMENT - BEAUTIFUL GRID CARDS LAYOUT
    if (currentTab.includes('product')) {
      if (currentTab === 'add-product') {
        return (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Deploy Store Listing</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Register a new product in the global e-commerce marketplace catalog.</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-2xs max-w-3xl">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-4">Product Details Form</h3>
              <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product Name</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Ergonomic Office Chair"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Discounted Price (₹)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="e.g. 5499"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProdOrigPrice}
                    onChange={(e) => setNewProdOrigPrice(e.target.value)}
                    placeholder="e.g. 8999"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black cursor-pointer focus:bg-white transition-all"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Apparel & Fashion</option>
                    <option value="decor">Decor & Furniture</option>
                    <option value="fitness">Sports & Fitness</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Select Local Seller</label>
                  <select
                    value={newProdVendor}
                    onChange={(e) => setNewProdVendor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black cursor-pointer focus:bg-white transition-all"
                  >
                    {vendors.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                    {vendors.length === 0 && (
                      <option value="Smart Solution Electronics">Smart Solution Electronics</option>
                    )}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Brand Name</label>
                  <input
                    type="text"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="e.g. Ergotech"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Stock Count</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product Description</label>
                  <textarea
                    value={newProdDescription}
                    onChange={(e) => setNewProdDescription(e.target.value)}
                    placeholder="Detailed specifications, warranty information, features..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 text-black focus:bg-white transition-all resize-y"
                  />
                </div>

                {/* Variations Section */}
                <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2 space-y-4">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Product Variations</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">Define color, size, capacity, or storage configurations with distinct prices and stock levels.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="space-y-1">
                      <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider">Option Name</label>
                      <input
                        type="text"
                        value={varNameInput}
                        onChange={(e) => setVarNameInput(e.target.value)}
                        placeholder="e.g. Red / 128GB"
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500 text-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider">Price (₹)</label>
                      <input
                        type="number"
                        value={varPriceInput}
                        onChange={(e) => setVarPriceInput(e.target.value)}
                        placeholder="e.g. 5999"
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500 text-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider">Orig. Price (₹)</label>
                      <input
                        type="number"
                        value={varOrigPriceInput}
                        onChange={(e) => setVarOrigPriceInput(e.target.value)}
                        placeholder="e.g. 9999"
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500 text-black"
                      />
                    </div>
                    <div className="space-y-1 flex flex-col justify-between">
                      <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider">Stock</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={varStockInput}
                          onChange={(e) => setVarStockInput(e.target.value)}
                          placeholder="10"
                          className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500 text-black"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!varNameInput.trim() || !varPriceInput || !varOrigPriceInput) {
                              alert("Please fill in option name, price and original price.");
                              return;
                            }
                            const newVar: MockProductVariation = {
                              id: `var-${Date.now()}`,
                              name: varNameInput,
                              price: Number(varPriceInput),
                              originalPrice: Number(varOrigPriceInput),
                              stock: Number(varStockInput || 0)
                            };
                            setNewProdVariations([...newProdVariations, newVar]);
                            setVarNameInput('');
                            setVarPriceInput('');
                            setVarOrigPriceInput('');
                            setVarStockInput('10');
                          }}
                          className="px-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-lg cursor-pointer transition-colors shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {newProdVariations.length > 0 && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs font-semibold">
                      <table className="w-full">
                        <thead className="bg-slate-50 text-[9px] text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-2 text-left font-black">Option</th>
                            <th className="px-4 py-2 text-left font-black">Price</th>
                            <th className="px-4 py-2 text-left font-black">Original Price</th>
                            <th className="px-4 py-2 text-left font-black">Stock</th>
                            <th className="px-4 py-2 text-center font-black">Remove</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {newProdVariations.map((v, i) => (
                            <tr key={v.id || i} className="hover:bg-slate-50/50">
                              <td className="px-4 py-2 font-bold text-slate-800">{v.name}</td>
                              <td className="px-4 py-2 text-slate-600">₹{v.price}</td>
                              <td className="px-4 py-2 text-slate-400 line-through">₹{v.originalPrice}</td>
                              <td className="px-4 py-2 text-slate-700">{v.stock} units</td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => setNewProdVariations(newProdVariations.filter(x => x.id !== v.id))}
                                  className="text-rose-600 hover:text-rose-800 hover:underline cursor-pointer border-none bg-transparent font-black"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="flex items-end gap-2.5 pt-2 sm:col-span-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black rounded-xl uppercase tracking-wider cursor-pointer shadow-sm shadow-orange-500/10 border-none"
                  >
                    Deploy Item Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }

      if (currentTab === 'product-categories') {
        return (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Product Categories</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Manage store department tags, count catalogs, and organize classification hierarchies.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {productCategories.map((cat, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="space-y-3">
                    <span className="text-3xl p-3 bg-slate-50 border border-slate-100 rounded-2xl block w-fit select-none">{cat.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">{cat.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Slug: {cat.slug}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-4 text-[10px] font-black uppercase text-slate-500">
                    <span>{cat.count} listings</span>
                    <button
                      onClick={() => alert(`Reviewing listings in category: ${cat.name}`)}
                      className="text-orange-655 hover:underline cursor-pointer border-none bg-transparent font-black"
                    >
                      View Items
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (currentTab === 'product-reviews') {
        return (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Product Review Moderation</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Moderate customer feedback ratings and filter spam comments.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-semibold text-slate-700">
                  <thead className="bg-slate-50 text-[10px] text-slate-450 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-black">Customer</th>
                      <th className="px-6 py-4 text-left font-black">Product Target</th>
                      <th className="px-6 py-4 text-left font-black">Score Rating</th>
                      <th className="px-6 py-4 text-left font-black">Review Comment</th>
                      <th className="px-6 py-4 text-left font-black">Status</th>
                      <th className="px-6 py-4 text-center font-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {productReviews.map((rev) => (
                      <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-extrabold text-slate-800 block">{rev.userName}</span>
                            <span className="text-[10px] text-slate-400 block font-medium">{rev.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-bold truncate max-w-[150px]">{rev.productName}</td>
                        <td className="px-6 py-4 font-black text-amber-500">★ {rev.rating} / 5</td>
                        <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={rev.comment}>{rev.comment}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[8px] uppercase tracking-wider border ${
                            rev.status === 'Approved'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : rev.status === 'Hidden'
                                ? 'bg-rose-50 border-rose-200 text-rose-700'
                                : 'bg-amber-50 border-amber-200 text-amber-700'
                          }`}>{rev.status}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            {rev.status !== 'Approved' && (
                              <button
                                onClick={() => {
                                  setProductReviews(prev => prev.map(r => r.id === rev.id ? { ...r, status: 'Approved' } : r));
                                  alert("Review approved successfully!");
                                }}
                                className="px-2.5 py-1 bg-emerald-50 border border-emerald-250 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer border-none"
                              >
                                Approve
                              </button>
                            )}
                            {rev.status !== 'Hidden' && (
                              <button
                                onClick={() => {
                                  setProductReviews(prev => prev.map(r => r.id === rev.id ? { ...r, status: 'Hidden' } : r));
                                  alert("Review marked as Hidden!");
                                }}
                                className="px-2.5 py-1 bg-rose-50 border border-rose-250 text-rose-700 hover:bg-rose-100 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer border-none"
                              >
                                Hide
                              </button>
                            )}
                          </div>
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

      // Default: all-products grid view
      return (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Product Catalog Moderation</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Manage catalog listings, inline pricing, categories, and item deletions.</p>
            </div>
            <div className="flex gap-2.5 w-full sm:w-auto">
              <div className="relative max-w-xs w-full">
                <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 w-4 h-4 my-auto shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500 animate-fade-in"
                />
              </div>
              <button
                onClick={() => setCurrentTab('add-product')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0 border-none"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
            </div>
          </div>

          {/* Products Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
              const isEditingPrice = editingPriceId === p.id;
              
              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-350 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Block with tags */}
                    <div className="relative h-44 bg-slate-50 overflow-hidden border-b border-slate-100">
                      <img src={p.image} className="w-full h-full object-cover" alt="" />
                      <span className="absolute top-3 left-3 bg-orange-600 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                        -{discount}%
                      </span>
                      <span className="absolute top-3 right-3 bg-slate-900/90 text-white font-bold text-[8px] px-2 py-0.5 rounded border border-slate-800 uppercase tracking-wider">
                        ★ {p.rating}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">{p.brand || 'No Brand'} • {p.vendorName}</span>
                          {p.stock !== undefined && (
                            <span className="text-[9px] bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded font-black">Stock: {p.stock}</span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-xs truncate leading-tight mt-1">{p.name}</h4>
                        {p.description && (
                          <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-normal font-medium">{p.description}</p>
                        )}
                        <span className="text-[8px] text-orange-655 font-black uppercase tracking-widest block mt-1.5">{p.category}</span>
                      </div>

                      {/* Variations Display */}
                      {p.variations && p.variations.length > 0 && (
                        <div className="space-y-1.5 border-t border-slate-100 pt-2">
                          <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block">Available Variations</span>
                          <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto pr-1">
                            {p.variations.map((v) => (
                              <div key={v.id} className="bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg text-[9px] font-semibold text-slate-700 flex flex-col">
                                <span className="font-extrabold text-slate-800">{v.name}</span>
                                <span className="text-[8px] text-slate-500">₹{v.price} • {v.stock} left</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive Price Editor */}
                      <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                        {isEditingPrice ? (
                          <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                              <span className="absolute left-2.5 inset-y-0 flex items-center text-[10px] text-slate-400 font-bold">₹</span>
                              <input
                                type="number"
                                value={editPriceValue}
                                onChange={(e) => setEditPriceValue(e.target.value)}
                                className="w-full pl-6 pr-2 py-1.5 bg-white border border-slate-250 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => saveProductPrice(p.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer border-none"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingPriceId(null)}
                              className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer border-none bg-transparent"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-400 font-bold uppercase">Store Price</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xs font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                                <span className="text-[9px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                  setEditingPriceId(p.id);
                                  setEditPriceValue(p.price.toString());
                                }}
                              className="p-2 hover:bg-slate-200/70 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-all cursor-pointer bg-white"
                              title="Edit Price"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-[9px] text-slate-450 font-bold uppercase">Verified listing</span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 hover:bg-rose-50 text-slate-450 hover:text-rose-600 rounded-lg transition-all cursor-pointer border border-slate-200 hover:border-rose-200 bg-white"
                      title="Remove product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 font-bold">No product listings match your search query.</div>
            )}
          </div>
        </div>
      );
    }

    // 3. ORDER MANAGEMENT
    if (currentTab.includes('order')) {
      let filteredOrderList = filteredOrders;
      let title = "Order Tracking Dashboard";
      let desc = "Track shipping codes, payment options, and delivery states.";

      if (currentTab === 'pending-orders') {
        filteredOrderList = filteredOrders.filter(o => o.status === 'Pending' || o.status === 'Shipped');
        title = "Active / Pending Orders Queue";
        desc = "Orders requiring fulfillment or active dispatch.";
      } else if (currentTab === 'completed-orders') {
        filteredOrderList = filteredOrders.filter(o => o.status === 'Completed');
        title = "Flipped & Completed Sales";
        desc = "History logs of successfully delivered orders.";
      }

      return (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{desc}</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 w-4 h-4 my-auto shrink-0" />
              <input
                type="text"
                placeholder="Search by Customer or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-semibold text-slate-700">
                <thead className="bg-slate-50 text-[10px] text-slate-450 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-black">Order ID</th>
                    <th className="px-6 py-4 text-left font-black">Customer Details</th>
                    <th className="px-6 py-4 text-left font-black">Purchased Items</th>
                    <th className="px-6 py-4 text-left font-black">Total Paid</th>
                    <th className="px-6 py-4 text-left font-black">Method</th>
                    <th className="px-6 py-4 text-left font-black">Status</th>
                    <th className="px-6 py-4 text-center font-black">Action Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrderList.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-extrabold text-slate-900">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-extrabold text-slate-800 block">{order.customerName}</span>
                          <span className="text-[10px] text-slate-400 block font-medium">📞 {order.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="truncate max-w-[200px]">
                            {item.name} <span className="text-slate-400 font-bold">(x{item.qty})</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 font-black text-slate-800">₹{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">{order.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider border ${
                          order.status === 'Completed'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : order.status === 'Shipped'
                              ? 'bg-blue-50 border-blue-200 text-blue-700'
                              : 'bg-amber-50 border-amber-200 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg text-[10px] font-bold focus:outline-none cursor-pointer text-slate-700"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filteredOrderList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-400 font-bold">No orders logged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-10 text-slate-500 font-bold">Select an E-commerce tab from the sidebar.</div>
    );
  };

  return (
    <div className="space-y-6">
      {renderView()}
    </div>
  );
}
