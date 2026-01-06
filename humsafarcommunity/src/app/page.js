"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  Users,
  Phone,
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
  ArrowRight,
  MessageCircle,
  Star,
  Heart,
  Clock,
  ShieldCheck,
  Map as MapIcon,
  Globe,
  Award,
  Calendar,
  User,
  Tag,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  Quote,
  Smile,
  Coffee,
  Tent,
  Wifi,
  Briefcase,
  Home,
  Gift,
  Palette,
  BedDouble,
  Anchor,
  Info,
  Linkedin,
  Twitter,
  Mountain,
  Plus,
  Minus
} from 'lucide-react';

// --- CONFIGURATION ---
const CONTACT_NUMBER = "916268496389";
const WHATSAPP_BASE = `https://wa.me/${CONTACT_NUMBER}`;

// --- CUSTOM STYLES ---
const CustomStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
    .bg-scribble {
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l2 2' stroke='%23000' stroke-width='1' fill='none' opacity='0.02'/%3E%3C/svg%3E");
    }
    .bg-topography {
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #064e3b;
      cursor: pointer;
      margin-top: -8px;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #d1fae5;
      border-radius: 2px;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .animate-bounce-slow {
      animation: bounce 3s infinite;
    }
  `}} />
);

// --- HELPER FUNCTIONS ---
const getNextSaturdays = (count = 4) => {
  const dates = [];
  let d = new Date();
  d.setDate(d.getDate() + (6 - d.getDay() + 7) % 7);
  if (d.getTime() <= new Date().getTime()) d.setDate(d.getDate() + 7);

  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
};

// --- MOCK DATA ---
const TOURS = [
  {
    id: 1,
    title: "Manali Kasol: Solang, Atal Tunnel & Sissu",
    location: "Himachal Pradesh",
    region: "himachal",
    type: "group",
    duration: "6 Days / 5 Nights",
    price: 6999,
    oldPrice: "9,500",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 245,
    bestseller: true,
    interestedCount: 124,
    highlights: ["Solang Valley", "Atal Tunnel", "Sissu", "Manikaran Gurudwara", "Kasol Cafe Hopping", "Hadimba Devi Temple"],
    itinerary: [
      { day: 1, title: "Delhi to Manali", desc: "Start your journey from Delhi to Manali (approx 560 KMS). Board an AC Semi Sleeper Traveller/Volvo at the predetermined spot. Overnight journey through scenic views towards the Himalayas." },
      { day: 2, title: "Arrival & Sightseeing in Manali", desc: "Reach Manali and complete check-in. Visit the mystical Hadimba Devi Temple (heart of Manali), explore Mall Road for cafes/shopping, visit Van Vihar, and the Tibetan Monastery. Dinner and overnight stay in Manali." },
      { day: 3, title: "Solang Valley - Atal Tunnel - Sissu", desc: "Full day excursion. Visit Solang Valley (Snow Valley) for adventure sports like skiing, zipline, zorbing (own cost). Pass through the Atal Tunnel to reach Sissu. Enjoy Sissu Lake/Koksar activities. Return to Manali for dinner and overnight stay." },
      { day: 4, title: "Kullu - Manikaran - Kasol", desc: "Visit the Paragliding point (Asia's highest) and River Rafting in Beas River (own cost). Explore a Shawl factory. Proceed to Kasol. Check-in to Kasol Camp. Enjoy a Bonfire & Musical Night. Dinner and overnight stay." },
      { day: 5, title: "Kasol Sightseeing & Departure", desc: "Visit Manikaran Gurudwara and soak in the beauty of Parvati Valley. Explore local markets and Israeli vintage cafes. Optional Water Trek/Chalal Trek. Evening departure for Delhi. Overnight travel." },
      { day: 6, title: "Delhi Arrival", desc: "Reach Delhi by early morning. The group parts ways with fond memories. Trip ends." }
    ],
    inclusions: ["AC Volvo / Traveller", "Accommodations (3 Star)", "Meal Plan: MAP", "Trip Lead", "Permits & Taxes", "Music Night"],
    exclusions: ["Adventure activities", "Lunch", "Personal expenses", "Heater charges", "Any transport not mentioned"]
  },
  {
    id: 4,
    title: "Kedarnath Yatra & Trek",
    location: "Uttarakhand",
    region: "uttarakhand",
    type: "group",
    duration: "5 Days / 4 Nights",
    price: 10500,
    oldPrice: "14,000",
    image: "https://badrinath-kedarnath.gov.in/css_js_2024/img/kedarnath-4k.jpg",
    rating: 5.0,
    reviews: 189,
    bestseller: true,
    interestedCount: 350,
    highlights: ["Guptkashi Stay", "Trek to Kedarnath", "Sonprayag", "Ganga Aarti"],
    inclusions: ["Transportation", "Accommodation", "Meals (Breakfast & Dinner)", "Yatra Registration Assistance"],
    exclusions: ["Pony/Palki charges", "Lunch", "Personal expenses"]
  },
  {
    id: 9,
    title: "Vietnam Explorer",
    location: "Vietnam",
    region: "international",
    type: "group",
    duration: "7 Days / 6 Nights",
    price: 45000,
    oldPrice: "52,000",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 86,
    bestseller: true,
    interestedCount: 89,
    highlights: ["Hanoi City Tour", "Ha Long Bay Cruise", "Ninh Binh", "Local Cuisine"],
    inclusions: ["Airport Transfers", "3 Star Hotels", "Ha Long Bay Cruise", "Breakfast", "Guide"],
    exclusions: ["International Flights", "Visa Fees", "Lunch & Dinner", "Tips"]
  },
  {
    id: 13,
    title: "Kerala Backwaters",
    location: "Kerala",
    region: "other",
    type: "group",
    duration: "6 Days / 5 Nights",
    price: 16500,
    oldPrice: "21,000",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 120,
    bestseller: true,
    interestedCount: 156,
    highlights: ["Munnar Tea Gardens", "Alleppey Houseboat", "Cochin Tour", "Kathakali Show"],
    inclusions: ["AC Vehicle", "Accommodation", "Houseboat Stay with meals", "Breakfast"],
    exclusions: ["Airfare", "Entry tickets", "Lunch & Dinner in hotels"]
  },
  {
    id: 2,
    title: "Spiti Valley Winter Expedition",
    location: "Himachal Pradesh",
    region: "himachal",
    type: "group",
    duration: "8 Days / 7 Nights",
    price: 18500,
    oldPrice: "24,000",
    image: "https://himalayaexpert.com/uploads/exp-img/spiti-valley-expedition.webp",
    rating: 4.9,
    reviews: 310,
    bestseller: false,
    interestedCount: 210,
    highlights: ["Key Monastery", "Chandratal Lake", "Kunzum Pass", "World's Highest Post Office"],
    inclusions: ["Tempo Traveller", "Homestays", "Breakfast & Dinner", "Oxygen Cylinder"],
    exclusions: ["Lunch", "Monastery Entry Fees", "Personal Gear"]
  },
  {
    id: 3,
    title: "Jibhi & Tirthan Valley Leisure",
    location: "Himachal Pradesh",
    region: "himachal",
    type: "group",
    duration: "4 Days / 3 Nights",
    price: 6500,
    oldPrice: "8,500",
    image: "https://images.unsplash.com/photo-1593183570379-3c9704944888?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 95,
    bestseller: false,
    interestedCount: 78,
    highlights: ["Jalori Pass", "Serolsar Lake", "Jibhi Waterfall", "Chehni Kothi"],
    inclusions: ["Transport", "Cottage Stay", "Meals (MAP)", "Guide"],
    exclusions: ["Lunch", "Personal Expenses"]
  },
  {
    id: 5,
    title: "Rishikesh Rafting & Camping",
    location: "Uttarakhand",
    region: "uttarakhand",
    type: "corporate",
    duration: "3 Days / 2 Nights",
    price: 4500,
    oldPrice: "6,000",
    image: "https://images.unsplash.com/photo-1624365113944-128c704c7286?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 450,
    bestseller: false,
    interestedCount: 500,
    highlights: ["River Rafting", "Cliff Jumping", "Bonfire & Music", "Jungle Camping"],
    inclusions: ["Camping", "All Meals", "Rafting Charges", "Bonfire"],
    exclusions: ["Transport to Rishikesh", "Alcohol"]
  },
  {
    id: 6,
    title: "Auli Skiing Adventure",
    location: "Uttarakhand",
    region: "uttarakhand",
    type: "group",
    duration: "5 Days / 4 Nights",
    price: 12999,
    oldPrice: "16,500",
    image: "https://images.unsplash.com/photo-1548578680-6927d6f5492d?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 78,
    bestseller: false,
    interestedCount: 134,
    highlights: ["Skiing Experience", "Joshimath Tour", "Nanda Devi View", "Cable Car Ride"],
    inclusions: ["Transport", "Stay", "Meals", "Skiing Equipment"],
    exclusions: ["Cable Car Ticket", "Personal Porter"]
  },
  {
    id: 7,
    title: "Royal Udaipur & Mount Abu",
    location: "Rajasthan",
    region: "rajasthan",
    type: "group",
    duration: "5 Days / 4 Nights",
    price: 8999,
    oldPrice: "12,000",
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 134,
    bestseller: false,
    interestedCount: 98,
    highlights: ["City Palace", "Lake Pichola", "Jag Dish Temple", "Monsoon Palace"],
    inclusions: ["AC Car", "Hotels", "Breakfast"],
    exclusions: ["Entry Tickets", "Lunch/Dinner"]
  },
  {
    id: 8,
    title: "Jaisalmer Desert Safari",
    location: "Rajasthan",
    region: "rajasthan",
    type: "educational",
    duration: "4 Days / 3 Nights",
    price: 7500,
    oldPrice: "9,500",
    image: "https://images.unsplash.com/photo-1569074127014-9c59520cb29f?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 212,
    bestseller: true,
    interestedCount: 180,
    highlights: ["Sam Sand Dunes", "Jeep Safari", "Jaisalmer Fort", "Gadisar Lake"],
    inclusions: ["Stay (Hotel + Camp)", "Camel/Jeep Safari", "Breakfast & Dinner"],
    exclusions: ["Train Tickets", "Personal Expenses"]
  },
  {
    id: 10,
    title: "Dubai Skyline & Desert",
    location: "UAE",
    region: "international",
    type: "corporate",
    duration: "5 Days / 4 Nights",
    price: 55000,
    oldPrice: "65,000",
    image: "https://www.thrillophilia.com/blog/wp-content/uploads/2025/09/shutterstock_1291548640-1-1.jpg",
    rating: 4.9,
    reviews: 56,
    bestseller: false,
    interestedCount: 45,
    highlights: ["Burj Khalifa", "Desert Safari BBQ", "Dubai Mall", "Marina Cruise"],
    inclusions: ["Visa", "4 Star Stay", "Transfers", "Tours"],
    exclusions: ["Flights", "Dirham Tax", "Tips"]
  },
  {
    id: 11,
    title: "Thailand Island Hopping",
    location: "Thailand",
    region: "international",
    type: "group",
    duration: "6 Days / 5 Nights",
    price: 38999,
    oldPrice: "45,000",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 89,
    bestseller: false,
    interestedCount: 112,
    highlights: ["Phi Phi Island", "Phuket Beaches", "Coral Island", "Bangkok City Tour"],
    inclusions: ["Hotels", "Tours", "Transfers", "Breakfast"],
    exclusions: ["Flights", "Visa on Arrival", "National Park Fees"]
  },
  {
    id: 12,
    title: "Goa Workation",
    location: "Goa",
    region: "other",
    type: "corporate",
    duration: "7 Days / 6 Nights",
    price: 15000,
    oldPrice: "20,000",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 156,
    bestseller: false,
    interestedCount: 230,
    highlights: ["North Goa Beaches", "Fort Aguada", "Dudhsagar Trek", "Casino Night"],
    inclusions: ["Stay with Breakfast", "Scooty Rental Assistance", "Transfers"],
    exclusions: ["Flights/Train", "Lunch/Dinner", "Petrol", "Entry Fees"]
  },
  {
    id: 14,
    title: "Meghalaya: Abode of Clouds",
    location: "Meghalaya",
    region: "other",
    type: "group",
    duration: "7 Days / 6 Nights",
    price: 22000,
    oldPrice: "28,000",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/cherrapunji/mmt/destination/m_destination-cherrapunji-landscape_l_400_640.jpg",
    rating: 5.0,
    reviews: 42,
    bestseller: true,
    interestedCount: 65,
    highlights: ["Double Decker Bridge", "Umngot River", "Mawlynnong", "Seven Sisters Falls"],
    inclusions: ["Transport", "Stay", "Breakfast", "Guide"],
    exclusions: ["Lunch/Dinner", "Entry Fees"]
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Edition 24: The Secret Valleys of Himachal",
    excerpt: "In this week's edition, we explore the untouched Tirthan Valley, discuss sustainable trekking practices.",
    category: "Weekly Newsletter",
    // FIXED: Changed image URL to a reliable source
    image: "https://images.unsplash.com/photo-1605649487215-476786e5b497?q=80&w=800&auto=format&fit=crop",
    date: "Oct 15, 2024"
  },
  {
    id: 2,
    title: "Edition 23: Backpacking Vietnam",
    excerpt: "A complete breakdown of costs for a 10-day Vietnam trip. Plus, top 5 hostels in Hanoi.",
    category: "International Guide",
    image: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=800&auto=format&fit=crop",
    date: "Oct 08, 2024"
  },
  {
    id: 3,
    title: "Edition 22: The Rise of Workations",
    excerpt: "Why digital nomads are flocking to Goa and Manali. Best cafes with WiFi.",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    date: "Oct 01, 2024"
  }
];

// --- COMPONENTS ---

const Header = ({ isScrolled, toggleMenu, isMenuOpen, onNavigate, currentPage, searchTerm, setSearchTerm }) => {
  const menuItems = [
    { id: 'home', label: 'Explore' },
    { id: 'upcoming', label: 'Upcoming Tours', action: () => onNavigate('upcoming') },
    { id: 'custom', label: 'Custom Trips' },
    { id: 'blog', label: 'Blog' },
  ];

  const hasDarkHero = ['home', 'trip-detail'].includes(currentPage);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      onNavigate('search');
    }
  }

  return (
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 border-gray-100 shadow-sm' : hasDarkHero ? 'bg-transparent py-6' : 'bg-white py-4 border-gray-100 shadow-sm'}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 flex justify-between items-center gap-4">

          <div
              onClick={() => onNavigate('home')}
              className={`flex flex-col items-start leading-none group cursor-pointer shrink-0 ${isScrolled || !hasDarkHero ? 'text-emerald-950' : 'text-white'}`}
          >
            <span className="font-serif font-black text-2xl tracking-tight">Humsafar</span>
            <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-80 group-hover:tracking-[0.3em] transition-all duration-300">Community</span>
          </div>

          <div className={`hidden md:flex flex-1 max-w-md mx-4 transition-all duration-500 transform ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full bg-gray-100 text-gray-800 text-sm rounded-full py-2 pl-10 pr-4 outline-none border border-transparent focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </button>
            </form>
          </div>

          <div className={`hidden md:flex items-center space-x-4 lg:space-x-8 text-sm font-semibold tracking-wide shrink-0 ${isScrolled || !hasDarkHero ? 'text-gray-600' : 'text-white/90'}`}>
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    className={`hover:text-emerald-600 transition-colors relative group ${currentPage === item.id ? 'text-emerald-600' : ''}`}
                >
                  {item.label}
                  {item.id === 'custom' && <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase">New</span>}
                </button>
            ))}

            <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${isScrolled || !hasDarkHero ? 'bg-emerald-900 text-white hover:bg-emerald-800' : 'bg-white text-emerald-900 hover:bg-gray-100'}`}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Chat
            </a>
          </div>

          <button onClick={toggleMenu} className={`md:hidden p-2 ${isScrolled || !hasDarkHero ? 'text-emerald-950' : 'text-white'}`}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl p-6 flex flex-col space-y-6 text-gray-800 animate-in slide-in-from-top-5 border-t border-gray-100 h-screen overflow-y-auto pb-32">
              {menuItems.map(item => (
                  <button
                      key={item.id}
                      onClick={() => {
                        toggleMenu();
                        if (item.action) {
                          item.action();
                        } else {
                          onNavigate(item.id);
                        }
                      }}
                      className="font-serif font-bold text-2xl text-emerald-950 text-left flex items-center justify-between"
                  >
                    {item.label}
                    {item.id === 'custom' && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-md uppercase tracking-wider font-sans">New</span>}
                  </button>
              ))}
              <a href={WHATSAPP_BASE} className="bg-emerald-900 text-white py-4 rounded-xl flex justify-center items-center font-bold uppercase tracking-widest text-sm">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </a>
            </div>
        )}
      </nav>
  );
};

const Hero = ({ searchTerm, setSearchTerm, onSearch }) => (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center text-center text-white bg-emerald-950 overflow-hidden pb-12 md:pb-0">
      <div className="absolute inset-0 opacity-80">
        <img
            src="https://s7ap1.scene7.com/is/image/incredibleindia/cityscape-of-shimla-himachal-pradesh-city-1-hero?qlt=82&ts=1742171983523"
            alt="Travel Background"
            className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 pt-20">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-[0.2em]">
          Explore the Unseen
        </div>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight drop-shadow-lg">
          Find Your <span className="italic text-emerald-300">Wild.</span>
        </h1>
        <p className="text-base md:text-xl mb-12 font-medium max-w-2xl mx-auto text-gray-100 leading-relaxed drop-shadow-md px-4">
          Curated expeditions for the modern explorer. Join the community that travels deeper.
        </p>

        <form onSubmit={onSearch} className="max-w-4xl mx-auto bg-white rounded-3xl md:rounded-full p-2 pl-4 md:pl-6 flex flex-col md:flex-row items-center shadow-2xl transform transition-all hover:scale-[1.01] gap-2 md:gap-0">
          <div className="flex items-center w-full md:w-auto flex-1">
            <Search className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
            <input
                type="text"
                placeholder="Where is your soul calling?"
                className="flex-1 py-3 md:py-4 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base md:text-lg font-medium w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
              type="submit"
              className="w-full md:w-auto bg-emerald-900 hover:bg-emerald-800 text-white px-8 py-3 md:py-4 rounded-xl md:rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Search <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
);

const FilterBar = ({ selectedRegion, setSelectedRegion, selectedType, setSelectedType }) => {
  const regions = [
    { id: 'all', label: 'All Places' },
    { id: 'himachal', label: 'Himachal' },
    { id: 'uttarakhand', label: 'Uttarakhand' },
    { id: 'rajasthan', label: 'Rajasthan' },
    { id: 'international', label: 'International' },
    { id: 'other', label: 'Rest of India' },
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'group', label: 'Group' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'custom', label: 'Custom' },
    { id: 'educational', label: 'Educational' },
  ];

  return (
      <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 -mt-10 md:-mt-20 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
            <div className="w-full overflow-hidden">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Destinations</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {regions.map(r => (
                    <button
                        key={r.id}
                        onClick={() => setSelectedRegion(r.id)}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all border ${selectedRegion === r.id ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'}`}
                    >
                      {r.label}
                    </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[300px]">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Experience Type</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {types.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all border ${selectedType === t.id ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'}`}
                    >
                      {t.label}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};



const TourCard = ({ tour, onViewDetails }) => {
  return (
      <div
          onClick={() => onViewDetails(tour.id)}
          className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          {tour.bestseller && (
              <div className="absolute top-3 left-3">
                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center uppercase tracking-wide">
                  Bestseller
                </span>
              </div>
          )}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center text-xs font-medium">
              <MapPin className="w-3 h-3 mr-1" /> {tour.location}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs font-bold">
              <Clock className="w-3 h-3 mr-1" /> {tour.duration}
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <Star className="w-3 h-3 mr-1 text-orange-400 fill-current" />
              <span className="font-bold text-gray-800">{tour.rating}</span>
              <span className="ml-1">({tour.reviews})</span>
            </div>
          </div>

          <h3 className="text-base md:text-lg font-sans font-bold text-gray-900 leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {tour.title}
          </h3>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tour.highlights && tour.highlights.slice(0, 3).map((h, i) => (
                  <span key={i} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 whitespace-nowrap">
                        {h}
                    </span>
              ))}
              {tour.highlights && tour.highlights.length > 3 && (
                  <span className="text-[10px] text-emerald-600 font-bold px-1 py-1 flex items-center">
                    +{tour.highlights.length - 3} More
                  </span>
              )}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-dashed border-gray-200 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-400 line-through">₹{tour.oldPrice}</p>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">SAVE 25%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-lg md:text-xl font-bold text-gray-900">₹{tour.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">/ person</p>
              </div>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all shadow-md">
              View
            </button>
          </div>
        </div>
      </div>
  );
};

const InquiryForms = () => {
  const [activeTab, setActiveTab] = useState('retail');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const msg = `Hi Humsafar Team, I have an inquiry.%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AInterest: ${data.interest}%0A%0AMessage: ${data.message}`;
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank');
  };

  return (
      <section id="forms" className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-scribble pointer-events-none opacity-50"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

            <div className="md:w-4/12 bg-emerald-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-8 md:space-y-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Let's Plan Your<br/>Next Escape.</h3>
                  <p className="text-emerald-200 text-sm md:text-lg leading-relaxed">Whether it's a solo soul-search or a corporate retreat, we craft journeys that linger in your memory.</p>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center group">
                    <div className="bg-emerald-800/50 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mr-5 border border-emerald-700/30">
                      <Phone className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Talk to an Expert</p>
                      <p className="font-medium text-base md:text-lg tracking-wide">+91 62684 96389</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-8/12 p-6 md:p-12 lg:p-16 bg-gray-50/30">
              <div className="flex space-x-6 md:space-x-8 mb-8 md:mb-10 border-b-2 border-gray-100 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('retail')}
                    className={`pb-4 font-bold text-xs md:text-sm uppercase tracking-widest transition-all whitespace-nowrap px-2 ${activeTab === 'retail' ? 'text-emerald-900 border-b-2 border-emerald-900 -mb-[2px]' : 'text-gray-400'}`}
                >
                  Plan A Trip
                </button>
                <button
                    onClick={() => setActiveTab('b2b')}
                    className={`pb-4 font-bold text-xs md:text-sm uppercase tracking-widest transition-all whitespace-nowrap px-2 ${activeTab === 'b2b' ? 'text-emerald-900 border-b-2 border-emerald-900 -mb-[2px]' : 'text-gray-400'}`}
                >
                  Partner With Us
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input name="name" required type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none font-medium" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none font-medium" placeholder="e.g. +91 98765..." />
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destination Interest</label>
                  <input name="interest" required type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none font-medium" placeholder="e.g. Spiti Valley, Kerala..." />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tell us more</label>
                  <textarea name="message" rows="3" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 outline-none resize-none" placeholder="Group size, etc..."></textarea>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <button type="submit" className="bg-emerald-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-emerald-800 transition-all w-full md:w-auto flex items-center justify-center gap-3">
                    Send Inquiry <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

const Footer = ({ onNavigate }) => (
    <footer className="bg-gray-950 text-gray-400 py-12 md:py-20 border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">
          <div className="lg:col-span-1">
            <div onClick={() => onNavigate('home')} className="flex flex-col items-start leading-none mb-6 text-white cursor-pointer">
              <span className="font-serif font-black text-2xl tracking-tight">Humsafar</span>
              <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-60">Community</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-gray-500">Building a community of travelers who seek stories, adventures, and meaningful connections.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-emerald-900 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Destinations</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'International'].map(item => (
                    <li key={item}><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors text-left">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => onNavigate('custom')} className="hover:text-emerald-400 transition-colors">Custom Trips</button></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Newsletter</h4>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Your email address" className="bg-gray-900 text-white px-5 py-3 rounded-lg outline-none w-full text-sm border border-gray-800 focus:border-emerald-600 transition" />
              <button className="bg-emerald-900 px-5 py-3 rounded-lg hover:bg-emerald-800 transition text-white font-bold text-sm uppercase tracking-wide">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600 text-center md:text-left">
          <p>© {new Date().getFullYear()} Humsafar Tours and Travels. All rights reserved.</p>
          <p className="flex items-center">Made with <Heart className="w-3 h-3 inline text-emerald-700 mx-1 fill-current" /> in India</p>
        </div>
      </div>
    </footer>
);

const TripDetailPage = ({ tourId, onBack, onNavigate }) => {
  // FIND THE TOUR. Memoize to prevent re-calculations.
  const tour = useMemo(() => TOURS.find(t => t.id === tourId) || TOURS[0], [tourId]);

  const upcomingSaturdays = useMemo(() => getNextSaturdays(5), []);
  const [activeDate, setActiveDate] = useState(upcomingSaturdays[0]);
  const [expandedDay, setExpandedDay] = useState(0);
  const [travelerCount, setTravelerCount] = useState(1);
  const [sharingType, setSharingType] = useState('Quad');

  const sharingOptions = [
    { type: 'Quad', label: 'Quad', surCharge: 0 },
    { type: 'Triple', label: 'Triple', surCharge: 1500 },
    { type: 'Double', label: 'Double', surCharge: 3000 },
  ];

  const selectedOption = sharingOptions.find(o => o.type === sharingType);
  const currentPricePerPerson = tour.price + selectedOption.surCharge;
  const totalPrice = currentPricePerPerson * travelerCount;

  // DYNAMIC MESSAGE: Uses EncodeURIComponent for safety across all devices/itineraries
  const msg = `Hi Humsafar Team, I am interested in the *${tour.title}*.\n\n🗓 *Trip Date:* ${activeDate.toDateString()}\n🏨 *Sharing:* ${sharingType} Sharing\n👥 *People:* ${travelerCount}\n💰 *Total Approx Price:* ₹${totalPrice.toLocaleString()}\n⏳ *Duration:* ${tour.duration}\n\nPlease share more details.`;
  const whatsappLink = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(msg)}`;

  useEffect(() => {
    window.scrollTo(0,0);
  }, [tourId]);

  return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">

        {/* === STICKY MOBILE BOTTOM BAR (FIXED & DATA RICH) === */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] px-4 py-3 pb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">
              {travelerCount} Pax • {sharingType} • {activeDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
              {tour.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">₹{(parseInt(tour.oldPrice.replace(/,/g, '')) * travelerCount).toLocaleString()}</span>
              )}
            </div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-900 text-white px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
            Book on WhatsApp <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        <div className="relative h-[50vh] lg:h-[70vh]">
          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute top-24 left-4 lg:left-24 z-20">
            <button onClick={onBack} className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/40 transition flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-24 pb-8 md:pb-12 text-white">
            <div className="container mx-auto px-2 md:px-8">
              <div className="flex gap-2 mb-4">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider">{tour.region}</span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3"/> {tour.duration}</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-serif font-bold mb-4 leading-tight">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-emerald-100">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {tour.location}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-orange-400 fill-current"/> {tour.rating} ({tour.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-24">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-6">Trip Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-1.5 rounded-full mt-0.5"><Check className="w-3 h-3 text-emerald-700" /></div>
                      <span className="text-gray-700 font-medium text-sm md:text-base">{h}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapIcon className="w-6 h-6 text-emerald-600"/> Detailed Itinerary
              </h2>
              <div className="space-y-4">
                {tour.itinerary ? tour.itinerary.map((day, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <button
                          onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}
                          className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                      >
                        <div className="flex items-center gap-4">
                            <span className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg ${expandedDay === i ? 'bg-emerald-900 text-white' : 'bg-emerald-100 text-emerald-900'}`}>
                                D{day.day}
                            </span>
                          <h3 className="font-bold text-gray-900 text-base md:text-lg">{day.title}</h3>
                        </div>
                        {expandedDay === i ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
                      </button>
                      {expandedDay === i && (
                          <div className="px-6 pb-6 pl-[4.5rem] md:pl-[5.5rem] text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            {day.desc}
                          </div>
                      )}
                    </div>
                )) : (
                    <div className="p-8 bg-gray-100 rounded-xl text-center text-gray-500">Itinerary details coming soon.</div>
                )}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-emerald-800 mb-4 uppercase tracking-widest text-xs">What's Included</h3>
                <ul className="space-y-3">
                  {tour.inclusions ? tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {item}
                      </li>
                  )) : <li>Standard Inclusions</li>}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-red-800 mb-4 uppercase tracking-widest text-xs">What's Excluded</h3>
                <ul className="space-y-3">
                  {tour.exclusions ? tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> {item}
                      </li>
                  )) : <li>Standard Exclusions</li>}
                </ul>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 mb-24 md:mb-0">
            <div className="sticky top-32 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-emerald-900 p-6 text-white text-center">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Trip Cost</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs mt-2 opacity-80">{travelerCount} Person(s) • {sharingType} Sharing</p>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Select Departure Date</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {upcomingSaturdays.map((date, i) => (
                      <button
                          key={i}
                          onClick={() => setActiveDate(date)}
                          className={`p-3 rounded-lg border text-sm text-center transition-all ${activeDate === date ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                      >
                        <span className="block text-xs uppercase text-gray-400 font-bold">{date.toLocaleDateString('default', {month:'short'})}</span>
                        <span className="text-lg font-bold">{date.getDate()}</span>
                        <span className="block text-[10px] text-gray-400">Saturday</span>
                      </button>
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Occupancy Type</h4>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {sharingOptions.map((option) => (
                      <button
                          key={option.type}
                          onClick={() => setSharingType(option.type)}
                          className={`py-2 px-1 rounded-lg border text-xs font-bold transition-all flex flex-col items-center justify-center ${sharingType === option.type ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                      >
                        <span className="block mb-1">{option.type}</span>
                        <span className="text-[10px] font-normal text-gray-400">
                          {option.surCharge === 0 ? 'Base' : `+₹${option.surCharge.toLocaleString()}`}
                        </span>
                      </button>
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Number of Travelers</h4>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mb-6 border border-gray-200">
                  <button onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))} className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-800 hover:bg-emerald-50"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold text-xl text-gray-900">{travelerCount}</span>
                  <button onClick={() => setTravelerCount(travelerCount + 1)} className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-800 hover:bg-emerald-50"><Plus className="w-4 h-4" /></button>
                </div>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                >
                  Book on WhatsApp <MessageCircle className="w-5 h-5" />
                </a>
                <p className="text-center text-xs text-gray-400">No payment needed to enquire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const UpcomingTripsPage = ({ onNavigate }) => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(60000);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const upcomingDates = useMemo(() => getNextSaturdays(8), []);
  const uniqueRegions = Array.from(new Set(TOURS.map(t => t.location)));

  const schedule = useMemo(() => {
    return upcomingDates.map(date => {
      const availableTours = TOURS.filter((tour, index) => {
        const matchesDest = selectedDestinations.length === 0 || selectedDestinations.includes(tour.location);
        const matchesPrice = tour.price <= priceRange;
        const isScheduled = (date.getTime() + index) % 3 === 0;
        return matchesDest && matchesPrice && isScheduled;
      });
      return { date, tours: availableTours };
    }).filter(item => item.tours.length > 0);
  }, [upcomingDates, selectedDestinations, priceRange, selectedDurations]);

  const toggleDestination = (dest) => setSelectedDestinations(prev => prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]);

  return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="bg-white border-b border-gray-200 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Upcoming Departures</h1>
            <p className="text-gray-500 max-w-2xl text-sm md:text-base">Plan your weekends with our scheduled group departures. Fixed dates (Every Saturday), like-minded travelers.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/4 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:sticky lg:top-28">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold border-b border-gray-100 pb-4">
                  <Filter className="w-5 h-5" /> <span>Filters</span>
                </div>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Destinations</h4>
                  <div className="space-y-2 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-0">{uniqueRegions.map(r => (
                      <label key={r} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" checked={selectedDestinations.includes(r)} onChange={()=>toggleDestination(r)} className="accent-emerald-600"/> {r}</label>
                  ))}</div>
                </div>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Max Price: ₹{priceRange}</h4>
                  <input type="range" min="5000" max="60000" step="1000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/4">
              {schedule.map((item, idx) => (
                  <div key={idx} className="relative mb-12">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="md:w-32 shrink-0 md:text-right md:sticky md:top-32 self-start flex items-center md:block gap-4 md:gap-0 border-b md:border-none border-gray-200 w-full md:w-auto pb-2 md:pb-0">
                        <div className="text-3xl font-serif font-bold text-gray-900 leading-none mb-1">{item.date.getDate()}</div>
                        <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">{item.date.toLocaleString('default', { month: 'short' })}</div>
                        <div className="text-xs text-gray-400 font-medium">{item.date.toLocaleString('default', { weekday: 'long' })}</div>
                      </div>
                      <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                        {item.tours.map(tour => (
                            <div key={tour.id} onClick={() => onNavigate('trip-detail', tour.id)} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row gap-4 cursor-pointer">
                              <div className="w-full sm:w-32 h-48 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{tour.title}</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1"><MapPin className="w-3 h-3 mr-1" /> {tour.location}</div>
                                <div className="flex items-center text-xs text-emerald-600 mt-2 font-medium"><Users className="w-3 h-3 mr-1" /> {tour.interestedCount}+ interested</div>
                              </div>
                              <div className="text-left sm:text-right flex items-center justify-between sm:block border-t sm:border-0 border-gray-100 pt-3 sm:pt-0">
                                <span className="text-lg font-bold text-gray-900 block">₹{tour.price.toLocaleString()}</span>
                                <button className="sm:mt-2 text-xs font-bold text-white bg-emerald-900 px-3 py-2 rounded-md">View Details</button>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

const CustomTripPage = () => (
    <div className="min-h-screen bg-white pt-20">
      <div className="relative bg-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-24 text-center">
          <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Design Your Own</span>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Your Rules. Your Route.</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Don't like waking up early? Want a private villa? Travelling with a massive group? We craft bespoke itineraries just for you.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 lg:px-24 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tell us what you need</h2>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            const msg = `Hi Humsafar, I want a Custom Trip.%0A%0A📍 *Dest:* ${data.dest}%0A📅 *Date:* ${data.date}%0A👥 *Pax:* ${data.pax}%0A💰 *Budget:* ${data.budget}%0A📝 *Note:* ${data.note}`;
            window.open(`https://wa.me/${CONTACT_NUMBER}?text=${msg}`, '_blank');
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Destination</label>
                <input name="dest" required type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-orange-500 outline-none font-medium" placeholder="e.g. Kashmir" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Approx Date</label>
                <input name="date" required type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-orange-500 outline-none font-medium" placeholder="e.g. Next Month" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Group Size</label>
                <input name="pax" required type="number" className="w-full border-b-2 border-gray-200 py-3 focus:border-orange-500 outline-none font-medium" placeholder="e.g. 6" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Budget per person</label>
                <input name="budget" type="text" className="w-full border-b-2 border-gray-200 py-3 focus:border-orange-500 outline-none font-medium" placeholder="e.g. 15k - 20k" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-500">Special Requirements</label>
              <textarea name="note" rows="3" className="w-full border rounded-xl p-4 focus:border-orange-500 outline-none" placeholder="We need a private pool, wheelchair access, etc."></textarea>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg flex justify-center items-center gap-2">
              Build My Trip on WhatsApp <ArrowRight className="w-4 h-4"/>
            </button>
          </form>
        </div>
      </div>
    </div>
);

const HomePage = ({ onSearch, setSearchTerm, searchTerm, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredTours = TOURS.filter(tour => {
    const matchesRegion = selectedRegion === 'all' || tour.region === selectedRegion;
    const matchesType = selectedType === 'all' || tour.type === selectedType;
    return matchesRegion && matchesType;
  });

  const bestsellers = TOURS.filter(t => t.bestseller).slice(0, 4);
  const isDefaultView = selectedRegion === 'all' && selectedType === 'all';

  return (
      <>
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch} />
        <FilterBar
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
        />

        <div className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-scribble pointer-events-none" />
          <section id="tours" className="py-16 md:py-24 min-h-[600px] relative z-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
              {!isDefaultView ? (
                  <div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-8 md:mb-12">Your Selection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                      {filteredTours.map(tour => <TourCard key={tour.id} tour={tour} onViewDetails={(id) => onNavigate('trip-detail', id)} />)}
                    </div>
                  </div>
              ) : (
                  <div className="space-y-16 md:space-y-24">
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 gap-4">
                        <div>
                          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 md:mb-3 block">Traveler Favorites</span>
                          <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900">Bestselling Collections</h2>
                        </div>
                        <button onClick={() => {setSelectedRegion('all'); setSelectedType('all')}} className="hidden md:flex items-center text-emerald-900 font-bold hover:text-emerald-700 transition text-sm uppercase tracking-wider group">
                          See All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {bestsellers.map(tour => <TourCard key={tour.id} tour={tour} onViewDetails={(id) => onNavigate('trip-detail', id)} />)}
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </section>
        </div>
      </>
  );
};

const SearchResultsPage = ({ searchTerm, setSearchTerm, onNavigate }) => {
  const filteredTours = TOURS.filter(tour => {
    const term = searchTerm.toLowerCase();
    return tour.title.toLowerCase().includes(term) ||
        tour.location.toLowerCase().includes(term) ||
        tour.region.toLowerCase().includes(term);
  });

  return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Search Results</h1>
            <div className="max-w-2xl relative">
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Change your search..."
                  className="w-full px-6 py-4 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 py-12">
          {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredTours.map(tour => <TourCard key={tour.id} tour={tour} onViewDetails={(id) => onNavigate('trip-detail', id)} />)}
              </div>
          ) : (
              <div className="text-center py-32">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
              </div>
          )}
        </div>
      </div>
  );
};

const BlogPage = () => (
    <div className="bg-white min-h-screen pt-20">
      <div className="bg-gray-50 border-b border-gray-200 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 text-center">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">The Humsafar Chronicle</span>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Stories from the Road,<br/>Delivered Weekly.</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8">Join 15,000+ travelers who read our weekly newsletter for hidden gems, travel hacks, and inspiring stories.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:border-emerald-500 outline-none shadow-sm" />
            <button className="bg-emerald-900 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-800 transition shadow-lg">Join Free</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 lg:px-24 xl:px-32 py-12 md:py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded mr-3 uppercase tracking-wider">Latest Edition</span>Fresh off the press</h2>
          <div className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="overflow-hidden rounded-xl aspect-[16/9] lg:aspect-auto lg:h-80"><img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="py-2">
              <div className="flex items-center gap-3 mb-4"><span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{BLOG_POSTS[0].category}</span><span className="w-1 h-1 bg-gray-300 rounded-full"></span><span className="text-xs text-gray-400">{BLOG_POSTS[0].date}</span></div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">{BLOG_POSTS[0].title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{BLOG_POSTS[0].excerpt}</p>
              <button className="text-emerald-700 font-bold text-sm uppercase tracking-widest border-b-2 border-emerald-100 group-hover:border-emerald-700 transition-all pb-1">Read Full Issue</button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Past Editions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BLOG_POSTS.slice(1).map(post => (
                <div key={post.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-[3/2] overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{post.category}</span><span className="text-[10px] text-gray-400">{post.date}</span></div>
                    <h3 className="text-lg font-bold font-serif text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (window.history.state) {
      setCurrentPage(window.history.state.page || 'home');
      if (window.history.state.id) setSelectedTourId(window.history.state.id);
    }

    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page);
        if (event.state.id) setSelectedTourId(event.state.id);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page, id = null) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    if(id) setSelectedTourId(id);
    setIsMenuOpen(false);
    window.history.pushState({ page, id }, '', `#${page}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('search');
    }
  };

  const pageComponents = {
    home: <HomePage onSearch={handleSearch} setSearchTerm={setSearchTerm} searchTerm={searchTerm} onNavigate={navigate} />,
    search: <SearchResultsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNavigate={navigate} />,
    upcoming: <UpcomingTripsPage onNavigate={navigate} />,
    custom: <CustomTripPage />,
    'trip-detail': <TripDetailPage key={selectedTourId} tourId={selectedTourId} onBack={() => window.history.back()} onNavigate={navigate} />,
    blog: <BlogPage />,
  };

  const CurrentPageComponent = pageComponents[currentPage] || pageComponents['home'];

  return (
      <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth selection:bg-emerald-100 selection:text-emerald-900">
        <CustomStyles />

        <Header
            isScrolled={isScrolled}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            onNavigate={navigate}
            currentPage={currentPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

        {CurrentPageComponent}

        <Footer onNavigate={navigate} />

        {currentPage !== 'trip-detail' && (
            <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center justify-center animate-bounce-slow"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
        )}
      </div>
  );
}