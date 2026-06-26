'use client';

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, MapPin, Bell, Globe, ChevronRight, ShieldCheck, Award, Users, Star, MessageSquare, HelpCircle, ArrowUpRight, TrendingUp, LogIn, UserPlus, User, X, Loader2 } from "lucide-react";

const carData = {
  SUV: [
    { name: "Tata Punch", price: "₹5.65 - 10.60 Lakh*", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80" },
    { name: "Tata Sierra", price: "₹11.49 - 21.29 Lakh*", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80" },
    { name: "Maruti Suzuki FRONX", price: "₹6.85 - 11.98 Lakh*", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80" },
    { name: "Mahindra Scorpio N", price: "₹13.49 - 24.95 Lakh*", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80" }
  ],
  Hatchback: [
    { name: "Maruti Swift", price: "₹6.49 - 9.64 Lakh*", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80" },
    { name: "Hyundai i20", price: "₹7.04 - 11.21 Lakh*", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80" },
    { name: "Tata Altroz", price: "₹6.60 - 10.74 Lakh*", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80" },
    { name: "Renault Kwid", price: "₹4.70 - 6.45 Lakh*", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=300&q=80" }
  ],
  Sedan: [
    { name: "Honda City", price: "₹11.82 - 16.30 Lakh*", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=300&q=80" },
    { name: "Hyundai Verna", price: "₹11.00 - 17.42 Lakh*", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=300&q=80" },
    { name: "Skoda Slavia", price: "₹11.63 - 18.83 Lakh*", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=300&q=80" },
    { name: "Maruti Dzire", price: "₹6.57 - 9.39 Lakh*", image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=300&q=80" }
  ],
  MUV: [
    { name: "Maruti Ertiga", price: "₹8.69 - 13.03 Lakh*", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80" },
    { name: "Toyota Innova", price: "₹19.99 - 26.55 Lakh*", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=300&q=80" },
    { name: "Kia Carens", price: "₹10.52 - 19.67 Lakh*", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80" },
    { name: "Renault Triber", price: "₹6.00 - 8.97 Lakh*", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80" }
  ],
  Luxury: [
    { name: "BMW 3 Series", price: "₹72.90 - 74.90 Lakh*", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80" },
    { name: "Mercedes C-Class", price: "₹61.85 - 69.00 Lakh*", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=300&q=80" },
    { name: "Audi A4", price: "₹46.22 - 54.58 Lakh*", image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=300&q=80" },
    { name: "Volvo S90", price: "₹68.25 Lakh*", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80" }
  ]
};

const productData = {
  "Electronics & Gadgets": {
    icon: "📱",
    items: [
      { name: "iPhone 15 Pro", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80", desc: "Titanium design, A17 Pro chip, powerful camera system." },
      { name: "MacBook Air M3", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80", desc: "Supercharged by M3, strikingly thin, up to 18 hours of battery life." },
      { name: "Sony WH-1000XM5", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80", desc: "Industry-leading noise cancellation, exceptional sound quality." },
      { name: "Apple Watch S9", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=300&q=80", desc: "Smarter, brighter, mightier. Advanced health features." },
      { name: "iPad Pro M4", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80", desc: "Breakthrough Ultra Retina XDR display, outrageous performance." },
      { name: "Nintendo Switch", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=300&q=80", desc: "Play at home or on the go with a vibrant OLED screen." },
      { name: "Bose Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=80", desc: "Waterproof bluetooth speaker with deep, immersive bass." },
      { name: "GoPro HERO 12", image: "https://images.unsplash.com/photo-1565849906661-ca9d6697d8c6?auto=format&fit=crop&w=300&q=80", desc: "Incredible image quality, even better HyperSmooth video stabilization." },
      { name: "Kindle Paperwhite", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80", desc: "Now with a 6.8\" display and adjustable warm light." },
      { name: "Canon EOS R50", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80", desc: "Compact mirrorless camera designed for content creators." }
    ]
  },
  "Home & Kitchen": {
    icon: "🏠",
    items: [
      { name: "Digital Air Fryer", image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=300&q=80", desc: "360-degree rapid heat circulation, touch control panel." },
      { name: "Espresso Machine", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80", desc: "15-bar pressure pump for perfect crema and rich flavor." },
      { name: "Robotic Vacuum", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80", desc: "Smart LiDAR mapping, high suction power, sweep and mop." },
      { name: "Instant Pot Cooker", image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=300&q=80", desc: "7-in-1 multi-functional electric pressure cooker." },
      { name: "Kitchen Stand Mixer", image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=300&q=80", desc: "10 speed settings, 5-quart stainless steel bowl with handle." },
      { name: "Electric Glass Kettle", image: "https://images.unsplash.com/photo-1594213112796-5304e2751752?auto=format&fit=crop&w=300&q=80", desc: "Auto shut-off, boil-dry protection, soft blue LED light indicator." },
      { name: "NutriBullet Blender", image: "https://images.unsplash.com/photo-1570275239925-4af0aa93a0dc?auto=format&fit=crop&w=300&q=80", desc: "900-watt motor, extracts nutrition from whole foods in seconds." },
      { name: "Smart Touch Toaster", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=300&q=80", desc: "High-speed smart toaster with touchscreen controls." },
      { name: "Electric Slow Cooker", image: "https://images.unsplash.com/photo-1589363460779-cd717dcbe736?auto=format&fit=crop&w=300&q=80", desc: "Oval-shaped stoneware crock, perfect for family dinners." },
      { name: "SodaStream Carbonator", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80", desc: "Turn plain water into sparkling water in seconds." }
    ]
  },
  "Fitness & Sports": {
    icon: "🏋️",
    items: [
      { name: "Adjustable Dumbbells", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=300&q=80", desc: "Space-saving design, weights adjustable from 2.5kg to 24kg." },
      { name: "Eco Yoga Mat", image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=300&q=80", desc: "TPE non-slip texture, dual-color premium finish, extra cushioning." },
      { name: "Foldable Treadmill", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80", desc: "Compact design, quiet powerful motor, multi-layered running belt." },
      { name: "Smart Jump Rope", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=300&q=80", desc: "Tracks jumps, calories burned, and time elapsed via companion app." },
      { name: "Garmin Smartwatch", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=300&q=80", desc: "Rugged GPS watch with solar charging, advanced training metrics." },
      { name: "Resistance Bands Set", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80", desc: "5 stackable latex bands, handles, ankle straps, and door anchor." },
      { name: "Hydro Flask Bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80", desc: "TempShield double-wall vacuum insulation keeps drinks cold up to 24 hrs." },
      { name: "Kettlebell 16kg", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&q=80", desc: "Solid cast iron kettlebell painted with black powder coat." },
      { name: "Deep Tissue Massage Gun", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300&q=80", desc: "High torque motor, 30 speed levels, 6 interchangeable massage heads." },
      { name: "High Density Foam Roller", image: "https://images.unsplash.com/photo-1600881372339-99a2a0378989?auto=format&fit=crop&w=300&q=80", desc: "Perfect for physical therapy, pre- or post-exercise massage." }
    ]
  },
  "Beauty & Personal Care": {
    icon: "💄",
    items: [
      { name: "Ionic Hair Dryer", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80", desc: "Fast drying with ionic technology to prevent frizz and damage." },
      { name: "Facial Cleanser", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=300&q=80", desc: "Deep pores cleaning, skin lifting massage, medical grade silicone." },
      { name: "Oil Diffuser", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&q=80", desc: "Color-changing LED light, auto-shutoff, whisper-quiet operation." },
      { name: "Hair Straightener", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80", desc: "Ceramic floating plates, rapid heating, digital temperature control." },
      { name: "Face Serum Set", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80", desc: "Vitamin C and Hyaluronic Acid serums for radiant glowing skin." },
      { name: "Jade Roller Set", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=300&q=80", desc: "Premium natural jade roller and gua sha scraper tool." },
      { name: "Electric Toothbrush", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=300&q=80", desc: "Rechargeable toothbrush with smart timer and pressure sensor." },
      { name: "Lip Balm Set", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=300&q=80", desc: "100% natural organic lip balms made with beeswax and coconut oil." },
      { name: "Charcoal Face Mask", image: "https://images.unsplash.com/photo-1614859324967-bdf461fcf769?auto=format&fit=crop&w=300&q=80", desc: "Peel-off blackhead remover, purifies and brightens the skin." },
      { name: "Makeup Brush Set", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80", desc: "14-piece professional cosmetics makeup brushes." }
    ]
  }
};

export default function JustDialHome() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const [activeCarTab, setActiveCarTab] = useState<"SUV" | "Hatchback" | "Sedan" | "MUV" | "Luxury">("SUV");
  const [activeProductTab, setActiveProductTab] = useState<keyof typeof productData>("Electronics & Gadgets");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Auth & Profile states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration form fields
  const [regBusinessName, setRegBusinessName] = useState("");
  const [regOwnerName, setRegOwnerName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCategory, setRegCategory] = useState("IT & Repairs");
  const [regCity, setRegCity] = useState("");
  const [regArea, setRegArea] = useState("");
  const [regLocality, setRegLocality] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [regState, setRegState] = useState("");
  const [regCountry, setRegCountry] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [registeredUserName, setRegisteredUserName] = useState("");

  // Auto-detect location when register modal opens
  const fetchLocationFromCoords = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=18`);
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        setRegCity(addr.city || addr.town || addr.village || addr.county || "");
        setRegArea(addr.suburb || addr.neighbourhood || addr.city_district || "");
        setRegLocality(addr.road || addr.hamlet || "");
        setRegPincode(addr.postcode || "");
        setRegState(addr.state || "");
        setRegCountry(addr.country || "");
        setRegAddress(`${addr.road || ""} ${addr.suburb || addr.neighbourhood || ""}`.trim() || data.display_name?.split(",").slice(0, 3).join(",") || "");
      }
    } catch {
      setLocationError("Could not fetch address details.");
    } finally {
      setLocationLoading(false);
    }
  }, []);

  const requestLocationPermission = useCallback(() => {
    setLocationLoading(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchLocationFromCoords(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLocationError(err.code === 1 ? "Location permission denied. Please allow location access or fill manually." : "Unable to retrieve location.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [fetchLocationFromCoords]);

  useEffect(() => {
    if (showRegisterModal) {
      requestLocationPermission();
    }
  }, [showRegisterModal, requestLocationPermission]);

  // Check if already logged in from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('registeredBusiness');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setIsLoggedIn(true);
          setRegisteredUserName(parsed.owner || parsed.name || "User");
        } catch {}
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setRegisteredUserName(loginEmail.split("@")[0] || "User");
    setShowLoginModal(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newBusiness = {
      id: `biz-${Date.now()}`,
      name: regBusinessName,
      owner: regOwnerName,
      category: regCategory,
      phone: regPhone,
      email: regEmail,
      location: { city: regCity, area: regArea, locality: regLocality, address: regAddress },
      status: "Free",
      subscription: "Free",
      rating: 0,
      leadsCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
      logo: "🏢",
      images: [],
      about: "",
      services: [],
      products: [],
      businessHours: "09:00 AM - 06:00 PM",
      revenue: 0,
      ratingAnalytics: { stars5: 0, stars4: 0, stars3: 0, stars2: 0, stars1: 0 }
    };
    localStorage.setItem('registeredBusiness', JSON.stringify(newBusiness));
    setIsLoggedIn(true);
    setRegisteredUserName(regOwnerName || regBusinessName);
    setShowRegisterModal(false);
    // Reset form
    setRegBusinessName(""); setRegOwnerName(""); setRegEmail(""); setRegPhone(""); setRegPassword("");
    setRegCity(""); setRegArea(""); setRegLocality(""); setRegAddress(""); setRegPincode(""); setRegState(""); setRegCountry("");
    alert("Business registered successfully! You can now access the Business Panel.");
  };

  const handleLogout = () => {
    localStorage.removeItem('registeredBusiness');
    setIsLoggedIn(false);
    setRegisteredUserName("");
    setShowProfileMenu(false);
  };

  const categoryListings: Record<string, Array<{
    name: string;
    rating: string;
    reviews: string;
    image: string;
    address: string;
    tags: string[];
    phone: string;
    responsive: boolean;
  }>> = {
    "Hotels": [
      {
        name: "Vink Lodge",
        rating: "3.5",
        reviews: "481 Ratings",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        address: "90 Feet Road Dharavi, Mumbai",
        tags: ["24 Hour Concierge/Help Desk", "Room Service", "Laundry Service"],
        phone: "09845258527",
        responsive: true
      },
      {
        name: "Hotel Aura Nest",
        rating: "4.0",
        reviews: "44 Ratings",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
        address: "Ram Krishna Mandir Road Andheri East, Mumbai",
        tags: ["Hotels", "Free Wi-Fi", "AC Rooms"],
        phone: "07041398148",
        responsive: false
      },
      {
        name: "The Leela Mumbai",
        rating: "4.8",
        reviews: "3.2k Ratings",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        address: "Sahar Airport Road, Andheri East, Mumbai",
        tags: ["5 Star Hotel", "Swimming Pool", "Spa & Wellness"],
        phone: "02266911234",
        responsive: true
      },
      {
        name: "Svenska Design Hotel",
        rating: "4.2",
        reviews: "820 Ratings",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        address: "Landed Area, Lokhandwala Complex, Andheri West, Mumbai",
        tags: ["Boutique Hotel", "Rooftop Lounge", "Fitness Center"],
        phone: "09167781039",
        responsive: true
      },
      {
        name: "Ginger Hotel Mumbai",
        rating: "3.9",
        reviews: "1.1k Ratings",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        address: "Teli Gali, Andheri East, Mumbai",
        tags: ["Smart Budget Hotel", "In-house Restaurant", "Meeting Rooms"],
        phone: "02266663333",
        responsive: false
      }
    ],
    "Restaurants": [
      {
        name: "Bistro Spice & Curry",
        rating: "4.6",
        reviews: "952 Ratings",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
        address: "Link Road, Andheri West, Mumbai",
        tags: ["Fine Dining", "North Indian", "Barbecue"],
        phone: "09930419283",
        responsive: true
      },
      {
        name: "The Pizza Hearth",
        rating: "4.3",
        reviews: "320 Ratings",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        address: "Carter Road, Bandra West, Mumbai",
        tags: ["Italian", "Wood-fired Pizza", "Home Delivery"],
        phone: "08879502913",
        responsive: true
      },
      {
        name: "Global Fusion",
        rating: "4.5",
        reviews: "2.1k Ratings",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
        address: "Times Square, Sakinaka, Mumbai",
        tags: ["Buffet Restaurant", "Chinese", "Sushi Bar"],
        phone: "02240212345",
        responsive: true
      },
      {
        name: "Leopold Cafe",
        rating: "4.1",
        reviews: "4.8k Ratings",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
        address: "Colaba Causeway, Colaba, Mumbai",
        tags: ["Historic Cafe", "Multi-cuisine", "Chilled Beer"],
        phone: "02222828185",
        responsive: false
      },
      {
        name: "Joey's Pizza",
        rating: "4.7",
        reviews: "6.5k Ratings",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80",
        address: "Lal Bahadur Shastri Rd, Mulund West, Mumbai",
        tags: ["Double Cheese Pizza", "Quick Service", "Takeaway"],
        phone: "02225642626",
        responsive: true
      }
    ],
    "Dentists": [
      {
        name: "Smile Care Dental Clinic",
        rating: "4.8",
        reviews: "350 Ratings",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
        address: "Veera Desai Road, Andheri West, Mumbai",
        tags: ["Root Canal Specialist", "Cosmetic Dentistry", "Teeth Whitening"],
        phone: "09819876543",
        responsive: true
      },
      {
        name: "Orthodontic & Implant Center",
        rating: "4.6",
        reviews: "180 Ratings",
        image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80",
        address: "Linking Road, Bandra West, Mumbai",
        tags: ["Dental Implants", "Braces & Aligners", "Pediatric Dentist"],
        phone: "09930214365",
        responsive: true
      },
      {
        name: "Dr. Lulla's Dental Hub",
        rating: "4.9",
        reviews: "540 Ratings",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
        address: "Juhu Scheme, Vile Parle West, Mumbai",
        tags: ["Laser Dentistry", "Oral Surgery", "Digital X-Ray"],
        phone: "09820012345",
        responsive: true
      },
      {
        name: "Dentistry Express",
        rating: "4.3",
        reviews: "95 Ratings",
        image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&w=600&q=80",
        address: "Ghatkopar East, Mumbai",
        tags: ["24/7 Dental Emergency", "Tooth Extraction", "Dentures"],
        phone: "08879111222",
        responsive: false
      }
    ],
    "Packers & Movers": [
      {
        name: "Royal Packers & Movers",
        rating: "4.7",
        reviews: "3.2k Ratings",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
        address: "Indiranagar, Bangalore",
        tags: ["Household Shifting", "Car Transportation", "Local Relocation"],
        phone: "09900112233",
        responsive: true
      },
      {
        name: "Agarwal Safe Home Cargo Movers",
        rating: "4.9",
        reviews: "8.5k Ratings",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
        address: "Goregaon East, Mumbai",
        tags: ["ISO Certified Movers", "Office Shifting", "Warehousing Services"],
        phone: "09320012345",
        responsive: true
      },
      {
        name: "Professional Relocation Services",
        rating: "4.4",
        reviews: "1.2k Ratings",
        image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=600&q=80",
        address: "Vashi Sector 17, Navi Mumbai",
        tags: ["Transit Insurance", "Packing & Unpacking", "Commercial Goods Cargo"],
        phone: "09820556677",
        responsive: true
      },
      {
        name: "Speedy Packers & Cargo",
        rating: "4.1",
        reviews: "450 Ratings",
        image: "https://images.unsplash.com/photo-1553413712-47af8201724e?auto=format&fit=crop&w=600&q=80",
        address: "Thane West, Mumbai",
        tags: ["Budget Packers", "Local Movers", "Fast Delivery"],
        phone: "08879555666",
        responsive: false
      }
    ],
    "Hospitals": [
      {
        name: "Kokilaben Dhirubhai Ambani Hospital",
        rating: "4.7",
        reviews: "15k Ratings",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
        address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai",
        tags: ["Multi Specialty Hospital", "24 Hours Emergency", "ICU & Trauma Care"],
        phone: "02242696969",
        responsive: true
      },
      {
        name: "Fortis Hospital Mulund",
        rating: "4.5",
        reviews: "8.9k Ratings",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
        address: "Mulund Goregaon Link Road, Mulund West, Mumbai",
        tags: ["Cardiology Excellence", "Neurology", "Organ Transplant Center"],
        phone: "02241114111",
        responsive: true
      },
      {
        name: "Lilavati Hospital & Research Centre",
        rating: "4.4",
        reviews: "12k Ratings",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
        address: "A.S. Dixit Road, Bandra West, Mumbai",
        tags: ["Maternity Care", "Cancer Care", "Specialty OPD"],
        phone: "02226751000",
        responsive: true
      },
      {
        name: "Hinduja National Hospital",
        rating: "4.6",
        reviews: "9.2k Ratings",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80",
        address: "Veer Savarkar Marg, Mahim, Mumbai",
        tags: ["Dialysis Center", "Orthopedics", "Pathology Lab"],
        phone: "02224451515",
        responsive: false
      }
    ]
  };

  const getListingsForCategory = (cat: string) => {
    if (categoryListings[cat]) return categoryListings[cat];
    return [
      {
        name: `Premium ${cat} Center`,
        rating: "4.5",
        reviews: "128 Ratings",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
        address: "Main Street Mall, Andheri West, Mumbai",
        tags: ["Verified Partner", "Quality Service", "Best Rates"],
        phone: "09930123456",
        responsive: true
      },
      {
        name: `Metro ${cat} Services`,
        rating: "4.2",
        reviews: "64 Ratings",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        address: "Link Road Opp Station, Bandra, Mumbai",
        tags: ["Home Services", "Experienced Professionals"],
        phone: "08879123456",
        responsive: false
      }
    ];
  };

  const categories = [
    {
      name: "Restaurants",
      icon: (
        <svg className="w-8 h-8 text-[#ff7000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: "Hotels",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      name: "Beauty Spa",
      icon: (
        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918M3.16 12a8.959 8.959 0 01.557-2.747" />
        </svg>
      )
    },
    {
      name: "Home Decor",
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: "Wedding Planning",
      icon: (
        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      name: "Education",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      name: "Rent & Hire",
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5M3 9h18M3 15h18" />
        </svg>
      )
    },
    {
      name: "Hospitals",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" />
        </svg>
      )
    },
    {
      name: "Contractors",
      icon: (
        <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1113.5 17.25l-1.92-1.92m-1.74 1.74l-5.83-5.83a2.67 2.67 0 113.75-3.75l5.83 5.83m-1.74-1.74l1.92-1.92M17.25 13.5l1.92-1.92M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z" />
        </svg>
      )
    },
    {
      name: "Pet Shops",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "PG/Hostels",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14" />
        </svg>
      )
    },
    {
      name: "Estate Agent",
      icon: (
        <svg className="w-8 h-8 text-indigo-650" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "Dentists",
      icon: (
        <svg className="w-8 h-8 text-[#0076d3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      name: "Gym",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4M6 8l-2 4 2 4m12-8l2 4-2 4" />
        </svg>
      )
    },
    {
      name: "Loans",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16c1.25 0 2.5-.25 2.5-.5V14c0-.25-1.25-.5-2.5-.5M12 16v-2.5" />
        </svg>
      )
    },
    {
      name: "Event Organisers",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H3.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
        </svg>
      )
    },
    {
      name: "Driving Schools",
      icon: (
        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      name: "Packers & Movers",
      icon: (
        <svg className="w-8 h-8 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a1 1 0 01-1 1h-1" />
        </svg>
      )
    },
    {
      name: "Courier Service",
      icon: (
        <svg className="w-8 h-8 text-teal-655 text-teal-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      name: "Popular Categories",
      icon: (
        <svg className="w-8 h-8 text-[#0076d3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
      {/* Top Header Navbar */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div onClick={() => setSelectedCategory(null)} className="flex items-center gap-1 cursor-pointer shrink-0">
            <span className="text-[#0076d3] text-2xl font-bold tracking-tight">Abhi</span>
            <span className="text-[#ff7000] text-2xl font-bold tracking-tight">CRM</span>
          </div>

          {/* Search bar inside header when results are active */}
          {selectedCategory && (
            <div className="hidden md:flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white max-w-xl w-full h-10 shadow-3xs">
              <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 bg-gray-50 min-w-[120px] h-full text-xs font-bold text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Mumbai</span>
              </div>
              <div className="flex flex-1 items-center gap-2 px-3 h-full relative">
                <input
                  type="text"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs font-bold focus:outline-none text-gray-800 bg-transparent pr-12"
                />
                <button onClick={() => setSelectedCategory(null)} className="absolute right-9 text-gray-400 hover:text-gray-650 text-sm font-bold">✕</button>
                <button className="absolute right-5 text-[#0076d3] hover:text-blue-650">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="absolute right-1 p-1 bg-[#ff7000] text-white rounded-lg hover:bg-orange-650 transition-all">
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Right Header Links */}
          <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
            <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-[#0076d3] transition-colors">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-650">EN</span>
              <span className="text-[9px] text-gray-400">▼</span>
            </div>

            {!isLoggedIn ? (
              <>
                {/* Login Button */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-full text-xs font-bold hover:border-[#0076d3] hover:text-[#0076d3] transition-all cursor-pointer shadow-3xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>

                {/* Register Button */}
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#0076d3] to-[#005fa3] text-white rounded-full text-xs font-bold hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Business</span>
                </button>
              </>
            ) : (
              <>
                {/* My Business Button */}
                <Link href="/business-panel" className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-blue-200 bg-blue-50 text-[#0076d3] rounded-full text-xs font-bold hover:bg-blue-100 transition-all cursor-pointer shadow-3xs">
                  <span className="text-sm">💼</span>
                  <span>My Business</span>
                </Link>

                {/* Bell Notification */}
                <button className="p-1.5 bg-gray-50 rounded-full border border-gray-200 text-gray-600 hover:text-[#0076d3] transition-all cursor-pointer relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">1</span>
                </button>

                {/* Profile Avatar */}
                <div className="relative flex items-center pl-3 border-l border-gray-200">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 border-2 border-white ring-2 ring-emerald-100 flex items-center justify-center text-white font-black text-xs cursor-pointer hover:ring-emerald-200 transition-all"
                  >
                    {registeredUserName ? registeredUserName.charAt(0).toUpperCase() : "U"}
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-sm">
                            {registeredUserName ? registeredUserName.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <h4 className="text-sm font-black">{registeredUserName}</h4>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Business Owner</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link href="/business-panel" className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                          <span className="text-base">💼</span> My Business Panel
                        </Link>
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                          <span className="text-base">🛡️</span> Admin Dashboard
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogIn className="w-4 h-4 rotate-180" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ═══ LOGIN MODAL ═══ */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0076d3] to-[#005fa3] p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-1 bg-white/20 rounded-full hover:bg-white/30 transition-all cursor-pointer">
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#0076d3] text-xl font-bold bg-white rounded-lg px-2 py-0.5">Abhi</span>
                  <span className="text-[#ff7000] text-xl font-bold bg-white rounded-lg px-2 py-0.5">CRM</span>
                </div>
                <h2 className="text-xl font-black tracking-tight">Welcome Back</h2>
                <p className="text-xs text-blue-200 font-semibold mt-1">Sign in to access your business dashboard</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#0076d3] rounded" /> Remember me
                </label>
                <a href="#" className="text-[10px] font-bold text-[#0076d3] hover:underline">Forgot Password?</a>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#0076d3] to-[#005fa3] text-white text-xs font-black rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer">
                Sign In
              </button>
              <p className="text-center text-[10px] text-slate-500 font-semibold">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }} className="text-[#0076d3] font-bold hover:underline cursor-pointer">
                  Register Business
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ═══ REGISTER MODAL ═══ */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0076d3] p-6 text-white relative overflow-hidden sticky top-0 z-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-all cursor-pointer">
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="w-6 h-6 text-blue-300" />
                  <h2 className="text-xl font-black tracking-tight">Register Your Business</h2>
                </div>
                <p className="text-xs text-slate-400 font-semibold">Create a free business listing on AbhiCRM. Location auto-fill is active.</p>
                {locationLoading && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-blue-300 font-bold">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Detecting your location...
                  </div>
                )}
                {locationError && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-amber-300 font-bold">
                    <MapPin className="w-3.5 h-3.5" /> {locationError}
                  </div>
                )}
                {!locationLoading && !locationError && regCity && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-emerald-300 font-bold">
                    <MapPin className="w-3.5 h-3.5" /> Location detected: {regCity}, {regState}
                  </div>
                )}
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="p-6 space-y-5">
              {/* Business Info Section */}
              <div className="space-y-1">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#0076d3] text-white text-[9px] font-black rounded-md flex items-center justify-center">1</span>
                  Business Information
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold">Basic details about your company</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Name *</label>
                  <input required value={regBusinessName} onChange={(e) => setRegBusinessName(e.target.value)} placeholder="e.g. CyberLim Solutions" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Owner Name *</label>
                  <input required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} placeholder="e.g. Rohit Sengar" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email *</label>
                  <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="info@business.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone *</label>
                  <input required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password *</label>
                  <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Category *</label>
                  <select value={regCategory} onChange={(e) => setRegCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0076d3] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                    {["IT & Repairs", "Restaurants", "Hotels", "Healthcare", "Education", "Real Estate", "Beauty & Spa", "Legal Services", "Home Services", "Travel & Transport", "Retail & Shopping", "Manufacturing", "Event Management", "Financial Services", "Other"].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-3 border-t border-gray-100 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-5 h-5 bg-[#ff7000] text-white text-[9px] font-black rounded-md flex items-center justify-center">2</span>
                    Business Address
                  </h3>
                  <button type="button" onClick={requestLocationPermission} disabled={locationLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-[10px] font-bold hover:bg-emerald-100 transition-all cursor-pointer disabled:opacity-50">
                    {locationLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
                    {locationLoading ? "Detecting..." : "Re-detect Location"}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold">Fields below are auto-filled from your GPS. You can edit them.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Address</label>
                  <input value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Street, Road, Building..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Locality / Road</label>
                  <input value={regLocality} onChange={(e) => setRegLocality(e.target.value)} placeholder="Road name..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Area / Suburb</label>
                  <input value={regArea} onChange={(e) => setRegArea(e.target.value)} placeholder="Area name..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">City</label>
                  <input value={regCity} onChange={(e) => setRegCity(e.target.value)} placeholder="City name..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pincode</label>
                  <input value={regPincode} onChange={(e) => setRegPincode(e.target.value)} placeholder="110001" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">State</label>
                  <input value={regState} onChange={(e) => setRegState(e.target.value)} placeholder="State name..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Country</label>
                  <input value={regCountry} onChange={(e) => setRegCountry(e.target.value)} placeholder="India" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff7000] focus:ring-2 focus:ring-orange-100 transition-all" />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-[#0076d3] to-[#005fa3] text-white text-xs font-black rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Register My Business
                </button>
                <button type="button" onClick={() => setShowRegisterModal(false)} className="px-6 py-3 border border-gray-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                  Cancel
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-500 font-semibold">
                Already have an account?{" "}
                <button type="button" onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }} className="text-[#0076d3] font-bold hover:underline cursor-pointer">
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        
        {selectedCategory ? (
          /* JUSTDIAL STYLE CATEGORY SEARCH RESULTS PAGE */
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            {/* Promo Banner / Resort Advert */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-[#f1f8ff]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-3xs">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="h-20 w-32 rounded-xl overflow-hidden border border-gray-200 shadow-3xs shrink-0">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&q=85" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="h-20 w-32 rounded-xl overflow-hidden border border-gray-200 shadow-3xs shrink-0 hidden sm:block">
                  <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=150&q=85" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="h-20 w-24 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-3xs shrink-0 flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[#ff7000] text-xs font-bold leading-tight">Call 9820426153</span>
                  <span className="text-[10px] text-gray-500 font-semibold leading-tight">5 Star Resort in Mumbai</span>
                </div>
                <div className="h-20 w-32 rounded-xl overflow-hidden border border-gray-200 shadow-3xs shrink-0 hidden lg:block">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&q=85" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="h-20 w-32 rounded-xl overflow-hidden border border-gray-200 shadow-3xs shrink-0 hidden lg:block">
                  <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=150&q=85" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-[#ff7000] hover:bg-orange-650 text-white font-extrabold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer">
                Book Resort
              </button>
            </div>

            {/* Breadcrumbs */}
            <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5">
              <span>Mumbai</span>
              <span>›</span>
              <span>{selectedCategory} in Mumbai</span>
              <span>›</span>
              <span className="text-gray-500">14,631+ Listings</span>
            </div>

            {/* Title Header */}
            <div>
              <h2 className="text-2xl font-black text-gray-850 tracking-tight">Popular {selectedCategory} in Mumbai</h2>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-2 pb-2 text-xs font-bold text-gray-700">
              <button className="px-4 py-2 border border-gray-200 hover:border-gray-400 bg-white rounded-xl shadow-3xs cursor-pointer">Compare</button>
              <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs">
                <span>📅 28-06-2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs">
                <span>📅 29-06-2026</span>
              </div>
              <button className="px-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-xl shadow-3xs cursor-pointer flex items-center gap-1">Relevance ▼</button>
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs cursor-pointer">Star Rating ▼</button>
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs cursor-pointer">Budget ▼</button>
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs cursor-pointer">Hotel View ▼</button>
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs cursor-pointer">Pets Essential ▼</button>
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-3xs cursor-pointer">User Ratings ▼</button>
              <button className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-3xs cursor-pointer flex items-center gap-1.5">
                <span>⚙️ All Filters</span>
              </button>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Listings List (2/3 width) */}
              <div className="lg:col-span-2 space-y-4">
                {getListingsForCategory(selectedCategory).map((listing, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-md transition-all flex flex-col sm:flex-row gap-5">
                    {/* Listing Image Carousel Block */}
                    <div className="w-full sm:w-1/3 h-44 rounded-xl overflow-hidden bg-slate-50 border border-gray-200 shrink-0 relative group">
                      <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold shadow-sm">‹</button>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-xs font-bold shadow-sm">›</button>
                      </div>
                    </div>

                    {/* Listing Details */}
                    <div className="flex-1 flex flex-col justify-between py-1 space-y-3 sm:space-y-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">👍</span>
                          <h4 className="font-extrabold text-lg text-gray-900 leading-tight">{listing.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md flex items-center gap-0.5">{listing.rating} ★</span>
                          <span className="text-gray-500">{listing.reviews}</span>
                          {listing.responsive && (
                            <span className="text-xs text-orange-600 font-extrabold flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                              ⚡ Responsive
                            </span>
                          )}
                        </div>
                        <div className="flex items-start gap-1.5 text-xs text-gray-500 font-semibold leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span>{listing.address}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {listing.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md text-gray-600 font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {listing.responsive && (
                          <p className="text-[10px] text-orange-500 font-extrabold flex items-center gap-1">
                            ⚡ High call pick up rate
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                        <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs">
                          📞 {listing.phone}
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs">
                          <span className="text-emerald-600">💬</span> WhatsApp
                        </button>
                        <button className="px-5 py-2 bg-[#0076d3] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs">
                          Get Best Deal
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiry Sidebar (1/3 width) */}
              <div className="space-y-5">
                {/* Lead Form Widget */}
                <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-3xs space-y-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900 leading-tight">Get the List of Top {selectedCategory}</h4>
                    <p className="text-[11px] text-gray-500 mt-1">We'll send you contact details in seconds for free</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted!"); }} className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-700">What type of {selectedCategory} are you looking for?</p>
                      <div className="flex gap-4 text-xs font-bold text-gray-650">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="hotelType" defaultChecked /> Budget
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="hotelType" /> Luxury
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="hotelType" /> Others
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <input type="text" defaultValue="Rohit Sengar" required className="w-full px-3.5 py-2 bg-gray-50 border border-gray-250 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white" />
                      </div>
                      <div className="relative">
                        <input type="text" defaultValue="9411800280" required className="w-full px-3.5 py-2 bg-gray-50 border border-gray-250 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white" />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-[#0076d3] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer">
                      Get Best Deal »»»
                    </button>
                  </form>
                </div>

                {/* Top Picks Slider */}
                <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-3xs space-y-3">
                  <h4 className="font-extrabold text-sm text-gray-900 leading-tight">Customers "Top Picks"</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{selectedCategory} in Mumbai</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="h-20 rounded-lg overflow-hidden border border-gray-200 shadow-3xs">
                      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&q=80" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-20 rounded-lg overflow-hidden border border-gray-200 shadow-3xs">
                      <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=100&q=80" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STANDARD LANDING PAGE LAYOUT */
          <>
            {/* Search header & Location Input */}
            <div className="space-y-4">
              <h2 className="text-[28px] font-medium text-gray-800 tracking-tight text-left">
                Search across <span className="font-extrabold text-gray-900">‘5.3 Crore+’</span> <span className="text-[#0076d3] font-bold">Businesses</span>
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                {/* Search Input Group */}
                <div className="flex flex-1 items-center w-full border border-gray-300 rounded-xl overflow-hidden shadow-xs bg-white">
                  {/* Location Select */}
                  <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 min-w-[200px] bg-gray-50/70">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent text-sm font-bold focus:outline-none w-full text-gray-800 cursor-pointer"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  {/* Text Search Input */}
                  <div className="flex flex-1 items-center gap-2 px-3 py-3 relative">
                    <input
                      type="text"
                      placeholder="Search for Spa & Salons"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full text-sm font-medium focus:outline-none text-gray-850 pr-16 bg-transparent"
                    />
                    <button className="absolute right-12 text-blue-500 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                    <button className="absolute right-2 p-1.5 bg-[#ff7000] text-white rounded-lg hover:bg-orange-600 transition-all cursor-pointer">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Download App */}
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white shrink-0 hover:bg-gray-50 cursor-pointer shadow-3xs">
                  <span className="text-xs font-semibold text-gray-700">Download App</span>
                  <span className="text-orange-500 font-bold border border-orange-500 px-1 py-0.5 rounded text-[10px] bg-orange-50">Jd</span>
                </div>
              </div>
            </div>

        {/* Promo Grid (Grow your business + 4 Promo cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Banner */}
          <div className="lg:col-span-2 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px] text-left group">
            {/* Full Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img src="https://i.pinimg.com/736x/79/ab/13/79ab1362c110f812bb95abd248645763.jpg" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" alt="" />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-slate-900/10" />
            </div>

            <div className="space-y-1.5 z-10 max-w-[65%]">
              <h3 className="text-xl font-black leading-tight text-white drop-shadow-md">Grow your business on Justdial</h3>
              <ul className="text-[11px] space-y-1 text-slate-200 font-bold drop-shadow-sm">
                <li>• Get noticed</li>
                <li>• Boost sales</li>
                <li>• Increase revenue</li>
              </ul>
              <button className="mt-3 px-5 py-2.5 bg-[#32c061] hover:bg-[#28a74e] text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer border-none z-10">
                Start Now
              </button>
            </div>

            <div className="flex gap-1 mt-3 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            </div>
          </div>

          {/* Promo B2B */}
          <div className="bg-[#2e62c2] rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-h-[220px] relative overflow-hidden group text-left text-white">
            <div className="z-10">
              <span className="text-[9px] font-black text-blue-100 block uppercase">B2B</span>
              <h4 className="text-[13px] font-black leading-tight mt-0.5">Quick Quotes</h4>
            </div>
            
            {/* Blended image */}
            <div className="absolute right-0 bottom-0 top-0 w-32 h-full z-0 overflow-hidden pointer-events-none select-none">
              <img src="https://i.pinimg.com/736x/c3/58/89/c358890bccc81860ea1a2ff5cbe297bb.jpg" className="w-full h-full object-cover object-left opacity-90 group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2e62c2] via-[#2e62c2]/20 to-transparent" />
            </div>

            <div className="z-10 bg-white/20 p-1.5 rounded-full w-7 h-7 flex items-center justify-center border border-white/15">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Promo Repairs */}
          <div className="bg-[#1f4894] rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-h-[220px] relative overflow-hidden group text-left text-white">
            <div className="z-10">
              <span className="text-[9px] font-black text-blue-100 block uppercase">REPAIRS & SERVICES</span>
              <h4 className="text-[13px] font-black leading-tight mt-0.5">Get Nearest Vendor</h4>
            </div>
            
            {/* Blended image */}
            <div className="absolute right-0 bottom-0 top-0 w-32 h-full z-0 overflow-hidden pointer-events-none select-none">
              <img src="https://i.pinimg.com/736x/30/41/7d/30417d9aeb0f64beba68227a1fd34726.jpg" className="w-full h-full object-cover object-left opacity-90 group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1f4894] via-[#1f4894]/20 to-transparent" />
            </div>

            <div className="z-10 bg-white/20 p-1.5 rounded-full w-7 h-7 flex items-center justify-center border border-white/15">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Promo Real Estate */}
          <div className="bg-[#685fc7] rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-h-[220px] relative overflow-hidden group text-left text-white">
            <div className="z-10">
              <span className="text-[9px] font-black text-purple-100 block uppercase">REAL ESTATE</span>
              <h4 className="text-[13px] font-black leading-tight mt-0.5">Finest Agents</h4>
            </div>
            
            {/* Blended image */}
            <div className="absolute right-0 bottom-0 top-0 w-32 h-full z-0 overflow-hidden pointer-events-none select-none">
              <img src="https://i.pinimg.com/1200x/5f/31/56/5f3156687c42b80db7b0d42c29eb34ce.jpg" className="w-full h-full object-cover object-left opacity-90 group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#685fc7] via-[#685fc7]/20 to-transparent" />
            </div>

            <div className="z-10 bg-white/20 p-1.5 rounded-full w-7 h-7 flex items-center justify-center border border-white/15">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Promo Doctors */}
          <div className="bg-[#187d55] rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all min-h-[220px] relative overflow-hidden group text-left text-white">
            <div className="z-10">
              <span className="text-[9px] font-black text-emerald-100 block uppercase">DOCTORS</span>
              <h4 className="text-[13px] font-black leading-tight mt-0.5">Book Now</h4>
            </div>
            
            {/* Blended image */}
            <div className="absolute right-0 bottom-0 top-0 w-32 h-full z-0 overflow-hidden pointer-events-none select-none">
              <img src="https://i.pinimg.com/736x/e9/db/d7/e9dbd7c64d220ae8e6c4625fd1138750.jpg" className="w-full h-full object-cover object-left opacity-90 group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#187d55] via-[#187d55]/20 to-transparent" />
            </div>

            <div className="z-10 bg-white/20 p-1.5 rounded-full w-7 h-7 flex items-center justify-center border border-white/15">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* 20-Category Rounded Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-x-4 gap-y-6 pt-4">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => setSelectedCategory(cat.name)} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-3xs group-hover:border-blue-500 group-hover:shadow-xs transition-all">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center tracking-tight leading-tight group-hover:text-blue-650 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Previews side-by-side outlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Wedding Requisites */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white text-left shadow-3xs space-y-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Wedding Requisites</h4>
            <div className="grid grid-cols-3 gap-3">
              <div onClick={() => setSelectedCategory("Banquet Halls")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Banquet Halls</span>
              </div>
              <div onClick={() => setSelectedCategory("Bridal Requisite")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Bridal Requisite</span>
              </div>
              <div onClick={() => setSelectedCategory("Caterers")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Caterers</span>
              </div>
            </div>
          </div>

          {/* Beauty & Spa */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white text-left shadow-3xs space-y-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Beauty & Spa</h4>
            <div className="grid grid-cols-3 gap-3">
              <div onClick={() => setSelectedCategory("Beauty Parlours")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Beauty Parlours</span>
              </div>
              <div onClick={() => setSelectedCategory("Spa & Massages")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Spa & Massages</span>
              </div>
              <div onClick={() => setSelectedCategory("Salons")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Salons</span>
              </div>
            </div>
          </div>

          {/* Repairs & Services */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white text-left shadow-3xs space-y-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Repairs & Services</h4>
            <div className="grid grid-cols-3 gap-3">
              <div onClick={() => setSelectedCategory("AC Service")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">AC Service</span>
              </div>
              <div onClick={() => setSelectedCategory("Car Service")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Car Service</span>
              </div>
              <div onClick={() => setSelectedCategory("Bike Service")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Bike Service</span>
              </div>
            </div>
          </div>

          {/* Daily Needs */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white text-left shadow-3xs space-y-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Daily Needs</h4>
            <div className="grid grid-cols-3 gap-3">
              <div onClick={() => setSelectedCategory("Movies")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Movies</span>
              </div>
              <div onClick={() => setSelectedCategory("Grocery")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Grocery</span>
              </div>
              <div onClick={() => setSelectedCategory("Electricians")} className="space-y-2 text-center group cursor-pointer">
                <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-50 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 block truncate group-hover:text-blue-600 transition-colors">Electricians</span>
              </div>
            </div>
          </div>
        </div>

        {/* Most Searched Cars Section */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">The most searched cars</h3>
            
            {/* Tab Headers */}
            <div className="flex gap-6 border-b border-gray-100 pb-2 text-sm font-semibold">
              {(["SUV", "Hatchback", "Sedan", "MUV", "Luxury"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCarTab(tab)}
                  className={`pb-2 relative cursor-pointer transition-all ${
                    activeCarTab === tab ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeCarTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff7000] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {carData[activeCarTab].map((car, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl p-4 bg-slate-50/50 hover:shadow-sm transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-36 w-full overflow-hidden rounded-xl bg-white border border-gray-150 flex items-center justify-center">
                    <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-gray-800 text-sm">{car.name}</h5>
                    <p className="text-xs text-gray-500 font-medium">{car.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct({ ...car, desc: "Explore specifications, features, and check local availability or discounts." })}
                  className="mt-4 w-full py-2 border border-[#ff7000] text-[#ff7000] hover:bg-orange-50/50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  See Details
                </button>
              </div>
            ))}
          </div>

          {/* Bottom link */}
          <div className="pt-2">
            <a href="#" className="text-xs font-bold text-[#ff7000] hover:underline flex items-center gap-1">
              View All {activeCarTab} Cars <span className="text-sm">›</span>
            </a>
          </div>
        </div>

        {/* Dynamic Vertical Tab Product Explorer Section */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-850 tracking-tight">Explore Popular Products</h3>
            <p className="text-xs text-gray-500 mt-1">Select a category on the left to browse items on the right</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Vertical Tabs list */}
            <div className="w-full lg:w-1/4 flex flex-col gap-2 shrink-0 border-r border-gray-100 pr-0 lg:pr-4">
              {(Object.keys(productData) as Array<keyof typeof productData>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProductTab(tab)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                    activeProductTab === tab
                      ? "bg-orange-50 border-l-4 border-[#ff7000] text-gray-900 shadow-3xs"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className="text-lg">{productData[tab].icon}</span>
                  <span>{tab}</span>
                </button>
              ))}
            </div>

            {/* Right Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {productData[activeProductTab].items.slice(0, 10).map((prod, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedProduct(prod)}
                    className="border border-gray-200 rounded-xl p-3 bg-slate-50/30 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="h-28 w-full overflow-hidden rounded-lg bg-white border border-gray-150 flex items-center justify-center relative">
                        <img src={prod.image} className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-550" alt={prod.name} />
                      </div>
                      <h5 className="font-bold text-gray-800 text-xs text-center line-clamp-2 leading-tight group-hover:text-blue-650 transition-colors">
                        {prod.name}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col gap-5 text-left animate-in slide-in-from-bottom-4 duration-300">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-full transition-all border border-gray-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 h-44 rounded-2xl overflow-hidden bg-slate-50 border border-gray-250 flex items-center justify-center shrink-0">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="space-y-1.5">
                    <span className="text-[10px] bg-orange-50 text-[#ff7000] border border-orange-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Product Info</span>
                    <h4 className="text-lg font-black text-gray-900 leading-tight">{selectedProduct.name}</h4>
                    <p className="text-sm font-bold text-[#ff7000]">{selectedProduct.price}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">{selectedProduct.desc}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h5 className="text-xs font-bold text-gray-800">Quick Inquiry Form</h5>
                <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted successfully!"); setSelectedProduct(null); }} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Your Name" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
                    <input type="text" placeholder="Phone Number" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                  <textarea placeholder="Message / Details required..." rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  <button type="submit" className="w-full py-2.5 bg-[#ff7000] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 1. Live Inquiries & Activity Section */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <h3 className="text-xl font-bold text-gray-850 tracking-tight">Live CRM Activity</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">Real-time local business inquiries and conversions across India</p>
            </div>
            <span className="text-[10px] bg-slate-100 font-bold px-2.5 py-1 rounded-full text-slate-600">Updated just now</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { user: "Amit Sharma", city: "Delhi", category: "Packers & Movers", status: "Inquiry Sent", time: "2 mins ago" },
              { user: "Priya Nair", city: "Mumbai", category: "Spa & Massage", status: "Booking Confirmed", time: "5 mins ago" },
              { user: "Vikram Rathore", city: "Bangalore", category: "Caterers", status: "Quote Requested", time: "12 mins ago" }
            ].map((activity, idx) => (
              <div key={idx} className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl flex justify-between items-center hover:bg-slate-50 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-gray-850">{activity.user}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">• {activity.city}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-650">{activity.category}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                    activity.status.includes("Confirmed") ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {activity.status}
                  </span>
                  <p className="text-[9px] text-gray-450 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Premium Certified Partners Showcase */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-850 tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Premium Certified Partners
              </h3>
              <p className="text-xs text-gray-500 mt-1">Highly rated businesses recommended for top tier quality and response times</p>
            </div>
            <a href="#" className="text-xs font-bold text-[#0076d3] hover:underline">View All Partners ›</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "JW Marriott Banquet Halls", rating: "4.9", reviews: "2.4k", location: "Juhu, Mumbai", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80", tag: "Wedding Venue" },
              { name: "Dr. Batra's Dental Care", rating: "4.8", reviews: "1.8k", location: "Connaught Place, Delhi", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&q=80", tag: "Healthcare" },
              { name: "Royal Packers & Movers", rating: "4.7", reviews: "3.2k", location: "Indiranagar, Bangalore", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80", tag: "Logistics" }
            ].map((partner, idx) => (
              <div key={idx} className="border border-gray-250/70 rounded-2xl overflow-hidden bg-slate-50/20 hover:shadow-md transition-all group flex flex-col justify-between">
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#ff7000] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      ★ Certified
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2 py-0.5 rounded-md">{partner.tag}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {partner.rating}
                        <span className="text-gray-400 font-medium">({partner.reviews})</span>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-sm text-gray-900 line-clamp-1">{partner.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{partner.location}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-3xs">
                    Get Free Quote <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Why Choose Abhi CRM / Growth Analytics */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50/50 text-left shadow-3xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="text-xl font-bold text-gray-850 tracking-tight">Boost Your Business with Abhi CRM</h3>
            <p className="text-xs text-gray-500">Connect with crores of buyers, manage inquiries, and scale operations easily</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {[
              { icon: <Users className="w-6 h-6 text-blue-650" />, title: "Crores of Buyers", desc: "Access India's largest localized consumer marketplace and gain immediate visibility." },
              { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: "Verified Listings Only", desc: "Every lead and registration goes through a thorough validation process." },
              { icon: <TrendingUp className="w-6 h-6 text-[#ff7000]" />, title: "Inquire-to-Convert Analytics", desc: "Monitor lead source, call duration, status, and conversions directly from your panel." }
            ].map((prop, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex gap-4 hover:shadow-xs transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0">
                  {prop.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-950">{prop.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Success Stories / Testimonials */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-850 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" /> Partner Success Stories
            </h3>
            <p className="text-xs text-gray-500">Hear from localized vendors who successfully scaled using Abhi CRM listing services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { quote: "Within 3 months of listing on Abhi CRM, our inbound inquiries for AC repair doubled. The leads panel makes tracking follow-ups incredibly straightforward.", author: "Rajesh K., Owner at CoolBreeze AC Tech", growth: "+115% Leads Growth" },
              { quote: "Our wedding requisites and catering agency grew by leaps and bounds. Being certified brought a massive trust factor to our regional customers.", author: "Sandhya & Team, Royal Catering Services", growth: "+180% Bookings Increase" }
            ].map((story, idx) => (
              <div key={idx} className="border border-gray-150 p-5 rounded-2xl bg-slate-50/20 hover:border-gray-300 transition-all flex flex-col justify-between gap-4">
                <p className="text-xs text-gray-650 italic leading-relaxed">"{story.quote}"</p>
                <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{story.author}</h5>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Verified Business Partner</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-full border border-emerald-100">
                    {story.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FAQs / Accordion Help Center */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white text-left shadow-3xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-850 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#ff7000]" /> Help & FAQ Center
            </h3>
            <p className="text-xs text-gray-500">Got questions? Find simple answers on directory management, verification, and lead plans</p>
          </div>

          <div className="space-y-3">
            {[
              { q: "How do I list my local business on Abhi CRM?", a: "Simply click the 'My Business' button in the top navbar EN selector area. Fill in your name, owner profile, phone, category, and address. Once submitted, our regional team will verify the listing." },
              { q: "What is the difference between Free, Gold, and Premium tiers?", a: "Free listings appear in basic searches. Gold and Premium listings receive up to 5x higher visibility, certified badges, priority inbound leads, and granular performance analytics dashboards." },
              { q: "How do I claim and download lead analytics reports?", a: "Log into your Abhi CRM dashboard panel. Under the 'Leads' tab section, click 'Download Conversion Logs' to export all caller records, duration, and conversion status to CSV." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-150 rounded-xl overflow-hidden bg-slate-50/20">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between font-bold text-xs text-gray-800 hover:bg-slate-50 transition-all text-left cursor-pointer focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-base text-gray-400 transition-transform duration-250">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed border-t border-slate-100/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
          </>
        )}

      </main>

      {/* Premium Dark Footer */}
      <footer className="bg-slate-900 text-slate-400 text-left border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#0076d3] text-2xl font-bold tracking-tight">Abhi</span>
                <span className="text-[#ff7000] text-2xl font-bold tracking-tight">CRM</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                India's leading CRM and local business search engine. Empowering millions of small-to-large vendors with organic visibility, verified leads, and conversion analytics.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-350">
                <span>Made in India 🇮🇳</span>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-white tracking-wider">About Us</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-white tracking-wider">For Businesses</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">Claim Listing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advertise with Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lead Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Merchant Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-white tracking-wider">Legal & Info</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lead Quality Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Anti-Spam Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* ── Explore All Panels Section ── */}
          <div className="pt-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#0076d3] to-[#ff7000] rounded-full" />
              <h4 className="text-xs font-extrabold uppercase text-white tracking-wider">Explore All Panels</h4>
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#ff7000] to-[#0076d3] rounded-full" />
            </div>
            <p className="text-[11px] text-slate-500 font-semibold max-w-lg">
              Access our fully-featured management consoles — Admin, Business Service Provider, and E-commerce Vendor dashboards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Admin Panel Card */}
              <Link href="/admin" className="group relative bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 space-y-3 hover:border-indigo-500/60 hover:bg-slate-800/80 transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-2xl p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl group-hover:scale-110 transition-transform">🛡️</span>
                  <div>
                    <h5 className="text-sm font-black text-white tracking-tight">Admin Panel</h5>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Super Admin Console</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed relative z-10">
                  Manage all listings, categories, leads, users, reviews, advertisements, and platform analytics from one central dashboard.
                </p>
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-indigo-400 group-hover:text-indigo-300 relative z-10 transition-colors">
                  <span>Open Admin Panel</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>

              {/* Business Panel Card */}
              <Link href="/business-panel" className="group relative bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 space-y-3 hover:border-sky-500/60 hover:bg-slate-800/80 transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-2xl p-2 bg-sky-600/20 border border-sky-500/30 rounded-xl group-hover:scale-110 transition-transform">💼</span>
                  <div>
                    <h5 className="text-sm font-black text-white tracking-tight">Business Panel</h5>
                    <span className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">Service Provider Console</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed relative z-10">
                  Full CRM with lead management, services catalog, quotations, bookings, customer data, marketing campaigns, and analytics insights.
                </p>
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-sky-400 group-hover:text-sky-300 relative z-10 transition-colors">
                  <span>Open Business Panel</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Bottom Copyright bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-bold">
            <p>© {new Date().getFullYear()} Abhi CRM (Meganods Digital Private Limited). All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-350 transition-colors">Security</a>
              <span className="text-slate-800">•</span>
              <a href="#" className="hover:text-slate-350 transition-colors">Privacy</a>
              <span className="text-slate-800">•</span>
              <a href="#" className="hover:text-slate-350 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}