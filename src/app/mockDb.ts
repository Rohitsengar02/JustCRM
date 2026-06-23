export interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  category: string;
  location: {
    city: string;
    area: string;
    locality: string;
    address: string;
  };
  status: 'Pending' | 'Verified' | 'Suspended' | 'Featured' | 'Premium' | 'Blocked';
  subscription: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  businessType?: 'service' | 'vendor';
  rating: number;
  leadsCount: number;
  createdDate: string;
  images: string[];
  logo: string;
  about: string;
  services: string[];
  products: string[];
  businessHours: string;
  revenue: number;
  ratingAnalytics: {
    stars5: number;
    stars4: number;
    stars3: number;
    stars2: number;
    stars1: number;
  };
}

export interface Lead {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  businessId: string;
  businessName: string;
  category: string;
  source: 'Web Search' | 'Mobile App' | 'Direct Call' | 'WhatsApp' | 'Social Media';
  status: 'New' | 'Contacted' | 'Interested' | 'Quotation Sent' | 'Converted' | 'Lost';
  createdDate: string;
  callLogs: { date: string; duration: string; summary: string }[];
  notes: string[];
  followUps: { date: string; task: string; done: boolean }[];
}

export interface Review {
  id: string;
  businessId: string;
  businessName: string;
  userName: string;
  rating: number;
  content: string;
  status: 'Pending' | 'Approved' | 'Hidden' | 'Reported';
  createdDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Admin' | 'Moderator' | 'Sales Executive' | 'Support Agent';
  status: 'Active' | 'Blocked';
  joinDate: string;
}

export interface AdCampaign {
  id: string;
  businessId: string;
  businessName: string;
  type: 'Homepage Banner' | 'Search Banner' | 'Featured Business' | 'Category Banner' | 'Sponsored Listing';
  impressions: number;
  clicks: number;
  ctr: number;
  status: 'Active' | 'Paused' | 'Ended';
  budget: number;
}

export interface SupportTicket {
  id: string;
  title: string;
  userName: string;
  userRole: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignee: string;
  createdDate: string;
  comments: { author: string; date: string; text: string }[];
}

export interface ActivityFeedItem {
  id: string;
  type: 'business' | 'review' | 'lead' | 'subscription' | 'support';
  message: string;
  time: string;
  avatar?: string;
}

// Initial Seeds
export const initialBusinesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Standard Chartered Packers & Movers',
    owner: 'Ramesh Sharma',
    email: 'ramesh.sharma@standardpackers.com',
    phone: '+91 98765 43210',
    category: 'Packers & Movers',
    location: {
      city: 'Mumbai',
      area: 'Andheri East',
      locality: 'Marol Naka',
      address: 'Shop 4, Patel Estate, Road 12, Andheri East, Mumbai - 400059'
    },
    status: 'Premium',
    subscription: 'Platinum',
    businessType: 'service',
    rating: 4.8,
    leadsCount: 154,
    createdDate: '2026-01-10',
    logo: '📦',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=60'
    ],
    about: 'We provide premier household packing, relocation, office shifting, and local logistical solutions across Mumbai with GPS tracking.',
    services: ['Local Shifting', 'Intercity Moving', 'Car Carrier Services', 'Office Relocation', 'Warehouse Storage'],
    products: ['Cardboard Boxes', 'Bubble Wraps', 'Stretch Films', 'Heavy Duty Tapes'],
    businessHours: '09:00 AM - 08:00 PM (Mon-Sun)',
    revenue: 45000,
    ratingAnalytics: { stars5: 120, stars4: 25, stars3: 5, stars2: 2, stars1: 2 }
  },
  {
    id: 'biz-2',
    name: 'Apex Dental Care Clinic',
    owner: 'Dr. Shalini Mehta',
    email: 'contact@apexdental.in',
    phone: '+91 91234 56789',
    category: 'Dentists',
    location: {
      city: 'Delhi',
      area: 'Connaught Place',
      locality: 'Outer Circle',
      address: 'Flat 12B, First Floor, Block E, Connaught Place, New Delhi - 110001'
    },
    status: 'Verified',
    subscription: 'Gold',
    businessType: 'service',
    rating: 4.6,
    leadsCount: 89,
    createdDate: '2026-02-15',
    logo: '🦷',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60'
    ],
    about: 'Apex Dental provides multi-specialty dental treatments, cosmetic surgeries, and pediatric dental care with state of the art lasers.',
    services: ['Root Canal Treatment', 'Dental Implants', 'Teeth Whitening', 'Invisible Braces', 'Pediatric Dentistry'],
    products: ['Oral Hygiene Kit', 'Custom Mouthguards', 'Medicated Toothpastes'],
    businessHours: '10:00 AM - 07:00 PM (Mon-Sat)',
    revenue: 28000,
    ratingAnalytics: { stars5: 65, stars4: 18, stars3: 4, stars2: 1, stars1: 1 }
  },
  {
    id: 'biz-3',
    name: 'Rajputana Heritage Grand Hotel',
    owner: 'Digvijay Singh',
    email: 'info@rajputanaheritage.com',
    phone: '+91 291 234 5678',
    category: 'Hotels',
    location: {
      city: 'Jaipur',
      area: 'Malviya Nagar',
      locality: 'Sector 4',
      address: '101, Heritage Boulevard, Malviya Nagar, Jaipur - 302017'
    },
    status: 'Featured',
    subscription: 'Platinum',
    businessType: 'service',
    rating: 4.9,
    leadsCount: 312,
    createdDate: '2025-11-20',
    logo: '🏰',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60'
    ],
    about: 'A luxurious five-star heritage hotel blending traditional Rajasthani architecture with modern amenities, rooftop dine-in, and spa.',
    services: ['Luxury Suites', 'Royal Banquets', 'Spa & Wellness Center', 'Rooftop Fine Dining', 'City Tour Guide'],
    products: ['Spa Essential Oils', 'Jaipuri Handcrafted Quilts'],
    businessHours: '24 Hours Open',
    revenue: 125000,
    ratingAnalytics: { stars5: 250, stars4: 45, stars3: 12, stars2: 3, stars1: 2 }
  },
  {
    id: 'biz-4',
    name: 'Green Field Organic Cafe',
    owner: 'Ananya Reddy',
    email: 'hello@greenfieldorganic.com',
    phone: '+91 80 4455 6677',
    category: 'Restaurants',
    location: {
      city: 'Bangalore',
      area: 'Koramangala',
      locality: '5th Block',
      address: '88, Sony World Signal Road, Koramangala 5th Block, Bangalore - 560095'
    },
    status: 'Pending',
    subscription: 'Free',
    businessType: 'vendor',
    rating: 4.2,
    leadsCount: 14,
    createdDate: '2026-06-10',
    logo: '🥗',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=60'
    ],
    about: 'Bringing farm-to-table fresh vegan foods, salads, gluten-free desserts, and hand-brewed organic coffee to Koramangala.',
    services: ['Dine-In', 'Takeaway', 'Home Delivery', 'Outdoor Catering', 'Cooking Workshops'],
    products: ['Organic Coffee Beans', 'Home Brew Kombucha', 'Gluten Free Oats Cookies'],
    businessHours: '08:00 AM - 11:00 PM (Mon-Sun)',
    revenue: 0,
    ratingAnalytics: { stars5: 5, stars4: 6, stars3: 2, stars2: 1, stars1: 0 }
  },
  {
    id: 'biz-5',
    name: 'Smart Solution Electronics',
    owner: 'Vijay Khandelwal',
    email: 'vijay.smartsolutions@gmail.com',
    phone: '+91 99887 76655',
    category: 'Electronic Goods Dealers',
    location: {
      city: 'Kolkata',
      area: 'Salt Lake',
      locality: 'Sector 5',
      address: 'GP Block, Salt Lake Sector 5, Kolkata - 700091'
    },
    status: 'Suspended',
    subscription: 'Silver',
    businessType: 'vendor',
    rating: 3.5,
    leadsCount: 45,
    createdDate: '2025-08-05',
    logo: '🔌',
    images: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=60'
    ],
    about: 'Wholesale distributor and dealer of home automation gadgets, smart TVs, and security cameras.',
    services: ['Bulk Supply', 'Installation Service', 'Repair & Warranty Service'],
    products: ['Smart CCTV Camera Bundle', 'Home Automation Hub', 'LED Panel Lights'],
    businessHours: '10:00 AM - 08:30 PM (Mon-Sat)',
    revenue: 12000,
    ratingAnalytics: { stars5: 10, stars4: 12, stars3: 15, stars2: 5, stars1: 3 }
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    userName: 'Karan Malhotra',
    userPhone: '+91 98223 34455',
    userEmail: 'karan.malhotra@yahoo.com',
    businessId: 'biz-1',
    businessName: 'Standard Chartered Packers & Movers',
    category: 'Packers & Movers',
    source: 'Web Search',
    status: 'New',
    createdDate: '2026-06-19',
    callLogs: [],
    notes: ['Customer requires packing and shifting from Andheri West to Delhi NCR next weekend.'],
    followUps: [{ date: '2026-06-20', task: 'Call to share quote estimation', done: false }]
  },
  {
    id: 'lead-2',
    userName: 'Megha Gupta',
    userPhone: '+91 88990 01122',
    userEmail: 'meghagupta@gmail.com',
    businessId: 'biz-2',
    businessName: 'Apex Dental Care Clinic',
    category: 'Dentists',
    source: 'Mobile App',
    status: 'Contacted',
    createdDate: '2026-06-18',
    callLogs: [
      { date: '2026-06-18 16:30', duration: '2m 15s', summary: 'Explained appointment slots for root canal. Megha requested evening slot.' }
    ],
    notes: ['Patient experiences acute tooth pain. Needs immediate specialist checkup.'],
    followUps: [{ date: '2026-06-19', task: 'Confirm appointment status with Dr. Shalini', done: true }]
  },
  {
    id: 'lead-3',
    userName: 'Rohan Deshmukh',
    userPhone: '+91 77665 54433',
    userEmail: 'rohan.d@outlook.com',
    businessId: 'biz-1',
    businessName: 'Standard Chartered Packers & Movers',
    category: 'Packers & Movers',
    source: 'WhatsApp',
    status: 'Interested',
    createdDate: '2026-06-17',
    callLogs: [
      { date: '2026-06-17 11:00', duration: '4m 30s', summary: 'Sent catalog and tentative price sheet. Rohan is highly interested.' }
    ],
    notes: ['Wants specialized wrapping for fragile glass items.'],
    followUps: [{ date: '2026-06-19', task: 'Send finalized quote PDF', done: false }]
  },
  {
    id: 'lead-4',
    userName: 'Vikram Seth',
    userPhone: '+91 99008 87766',
    userEmail: 'vikram.seth@corporatecorp.com',
    businessId: 'biz-3',
    businessName: 'Rajputana Heritage Grand Hotel',
    category: 'Hotels',
    source: 'Direct Call',
    status: 'Quotation Sent',
    createdDate: '2026-06-15',
    callLogs: [
      { date: '2026-06-15 14:00', duration: '8m 20s', summary: 'Corporate booking lead. Emailed quote for 25 rooms with corporate discount.' }
    ],
    notes: ['Seeking approval from head office. Budget is INR 2.5 Lakhs.'],
    followUps: [{ date: '2026-06-20', task: 'Follow up with Vikram on room blocking', done: false }]
  },
  {
    id: 'lead-5',
    userName: 'Preeti Adani',
    userPhone: '+91 98112 23344',
    userEmail: 'preeti.adani@outlook.com',
    businessId: 'biz-3',
    businessName: 'Rajputana Heritage Grand Hotel',
    category: 'Hotels',
    source: 'Web Search',
    status: 'Converted',
    createdDate: '2026-06-10',
    callLogs: [
      { date: '2026-06-10 10:15', duration: '5m 00s', summary: 'Paid standard advance deposit via gateway.' }
    ],
    notes: ['Booking confirmed. Luxury Suite for 3 nights.'],
    followUps: []
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    businessId: 'biz-1',
    businessName: 'Standard Chartered Packers & Movers',
    userName: 'Sandeep Varma',
    rating: 5,
    content: 'Unbelievably smooth shifting experience. Professional packaging and on-time arrival. Highly recommend!',
    status: 'Approved',
    createdDate: '2026-06-18'
  },
  {
    id: 'rev-2',
    businessId: 'biz-2',
    businessName: 'Apex Dental Care Clinic',
    userName: 'Nikita Rao',
    rating: 2,
    content: 'Doctor was friendly but wait time was over 45 minutes even with a pre-booked appointment.',
    status: 'Pending',
    createdDate: '2026-06-19'
  },
  {
    id: 'rev-3',
    businessId: 'biz-5',
    businessName: 'Smart Solution Electronics',
    userName: 'Amit Garg',
    rating: 1,
    content: 'Selling duplicate products. The smart camera stopped working in 2 days and owner refuses replacement.',
    status: 'Reported',
    createdDate: '2026-06-17'
  }
];

export const initialUsers: User[] = [
  { id: 'usr-1', name: 'Rajesh Verma', email: 'rajesh@localhub.com', phone: '+91 99999 88888', role: 'Super Admin', status: 'Active', joinDate: '2025-01-01' },
  { id: 'usr-2', name: 'Aditya Sen', email: 'aditya.sen@localhub.com', phone: '+91 98888 77777', role: 'Admin', status: 'Active', joinDate: '2025-06-10' },
  { id: 'usr-3', name: 'Kabir Das', email: 'kabir.das@localhub.com', phone: '+91 97777 66666', role: 'Moderator', status: 'Active', joinDate: '2026-02-20' },
  { id: 'usr-4', name: 'Pooja Iyer', email: 'pooja.iyer@localhub.com', phone: '+91 96666 55555', role: 'Sales Executive', status: 'Active', joinDate: '2026-04-12' },
  { id: 'usr-5', name: 'David Jones', email: 'david.jones@localhub.com', phone: '+91 95555 44444', role: 'Support Agent', status: 'Blocked', joinDate: '2026-05-01' }
];

export const initialAds: AdCampaign[] = [
  { id: 'ad-1', businessId: 'biz-1', businessName: 'Standard Chartered Packers & Movers', type: 'Homepage Banner', impressions: 45200, clicks: 2310, ctr: 5.11, status: 'Active', budget: 15000 },
  { id: 'ad-2', businessId: 'biz-3', businessName: 'Rajputana Heritage Grand Hotel', type: 'Featured Business', impressions: 92800, clicks: 5410, ctr: 5.83, status: 'Active', budget: 35000 },
  { id: 'ad-3', businessId: 'biz-2', businessName: 'Apex Dental Care Clinic', type: 'Category Banner', impressions: 18200, clicks: 610, ctr: 3.35, status: 'Active', budget: 8000 },
  { id: 'ad-4', businessId: 'biz-5', businessName: 'Smart Solution Electronics', type: 'Search Banner', impressions: 12000, clicks: 120, status: 'Paused', ctr: 1.0, budget: 5000 }
];

export const initialTickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    title: 'Listing verification request stuck',
    userName: 'Ananya Reddy',
    userRole: 'Business Owner',
    priority: 'High',
    status: 'In Progress',
    assignee: 'David Jones',
    createdDate: '2026-06-18',
    comments: [
      { author: 'Ananya Reddy', date: '2026-06-18 10:00', text: 'I submitted documents 3 days ago but state is still pending approval.' },
      { author: 'Aditya Sen', date: '2026-06-18 14:00', text: 'Documents are under validation with our local agents. Expecting update by tomorrow.' }
    ]
  },
  {
    id: 'ticket-2',
    title: 'Unable to process ad gateway payment',
    userName: 'Ramesh Sharma',
    userRole: 'Premium Listing Member',
    priority: 'High',
    status: 'Open',
    assignee: 'Pooja Iyer',
    createdDate: '2026-06-19',
    comments: [
      { author: 'Ramesh Sharma', date: '2026-06-19 11:30', text: 'It says transaction failed, but money got debited. Please check.' }
    ]
  }
];

export const initialActivities: ActivityFeedItem[] = [
  { id: 'act-1', type: 'business', message: 'Green Field Organic Cafe was registered in Bangalore', time: '10 minutes ago' },
  { id: 'act-2', type: 'review', message: 'Nikita Rao submitted a 2-star review for Apex Dental Care Clinic', time: '45 minutes ago' },
  { id: 'act-3', type: 'lead', message: 'New lead generated: Karan Malhotra requested Packers & Movers quote', time: '2 hours ago' },
  { id: 'act-4', type: 'subscription', message: 'Rajputana Heritage Grand Hotel renewed Platinum Subscription', time: '5 hours ago' },
  { id: 'act-5', type: 'support', message: 'Ticket #1042 opened: Listing verification request stuck', time: 'Yesterday' }
];

// Interactive Map City Data
export interface CityData {
  name: string;
  lat: number;
  lng: number;
  businesses: number;
  leads: number;
  premium: number;
  cx: number; // for SVG representation
  cy: number; // for SVG representation
}

export const citiesData: CityData[] = [
  { name: 'Mumbai', lat: 19.076, lng: 72.877, businesses: 820, leads: 4320, premium: 120, cx: 130, cy: 320 },
  { name: 'Delhi', lat: 28.613, lng: 77.209, businesses: 940, leads: 5120, premium: 145, cx: 190, cy: 150 },
  { name: 'Bangalore', lat: 12.971, lng: 77.594, businesses: 750, leads: 3890, premium: 110, cx: 200, cy: 430 },
  { name: 'Kolkata', lat: 22.572, lng: 88.363, businesses: 410, leads: 1850, premium: 48, cx: 380, cy: 260 },
  { name: 'Chennai', lat: 13.082, lng: 80.270, businesses: 390, leads: 1980, premium: 52, cx: 230, cy: 450 },
  { name: 'Hyderabad', lat: 17.385, lng: 78.486, businesses: 510, leads: 2450, premium: 65, cx: 210, cy: 350 },
  { name: 'Ahmedabad', lat: 23.022, lng: 72.571, businesses: 280, leads: 1200, premium: 35, cx: 120, cy: 240 }
];

// Category List
export interface CategoryNode {
  id: string;
  name: string;
  count: number;
  subcategories: string[];
  seoDesc: string;
}

export const initialCategories: CategoryNode[] = [
  { id: 'cat-1', name: 'Packers & Movers', count: 1240, subcategories: ['Local Household Shifting', 'Office Shifting', 'Car Transportation', 'International Movers'], seoDesc: 'Best packers and movers in your city. Verified lists, contact numbers, rates and reviews.' },
  { id: 'cat-2', name: 'Dentists', count: 850, subcategories: ['Root Canal Specialists', 'Orthodontists', 'Dental Surgeons', 'Pediatric Dentists'], seoDesc: 'Top dentists near you. Read patient feedback, clinic timing, phone number and check-up fees.' },
  { id: 'cat-3', name: 'Hotels', count: 2150, subcategories: ['5 Star Hotels', 'Resorts', 'Budget Hotels', 'Heritage Stays'], seoDesc: 'Compare hotels near you. Get address, room price, photo reviews and direct contact details.' },
  { id: 'cat-4', name: 'Restaurants', count: 5400, subcategories: ['Pure Veg Restaurants', 'Fine Dining', 'Cafes & Fast Food', 'Buffet Restaurants'], seoDesc: 'Dine out or order delivery. Popular food spots near you with menu prices and user ratings.' },
  { id: 'cat-5', name: 'Electronic Goods Dealers', count: 1600, subcategories: ['Smart TV Dealers', 'Mobile Showrooms', 'Home Appliance Stores', 'CCTV Dealers'], seoDesc: 'Buy home appliances and smart electronics from verified dealers near you with discount offers.' }
];

// Location Nodes
export interface LocationNode {
  id: string;
  type: 'country' | 'state' | 'city' | 'area' | 'locality';
  name: string;
  parent?: string;
  seoUrl: string;
}

export const initialLocations: LocationNode[] = [
  { id: 'loc-1', type: 'country', name: 'India', seoUrl: '/india' },
  { id: 'loc-2', type: 'state', name: 'Maharashtra', parent: 'loc-1', seoUrl: '/maharashtra' },
  { id: 'loc-3', type: 'city', name: 'Mumbai', parent: 'loc-2', seoUrl: '/mumbai' },
  { id: 'loc-4', type: 'area', name: 'Andheri East', parent: 'loc-3', seoUrl: '/mumbai/andheri-east' },
  { id: 'loc-5', type: 'locality', name: 'Marol Naka', parent: 'loc-4', seoUrl: '/mumbai/andheri-east/marol-naka' }
];
