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
  Anchor
} from 'lucide-react';

// --- CUSTOM STYLES ---
const CustomStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
    .bg-scribble {
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l2 2' stroke='%23000' stroke-width='1' fill='none' opacity='0.02'/%3E%3C/svg%3E");
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    /* Smooth range slider */
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #059669;
      cursor: pointer;
      margin-top: -8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #d1fae5;
      border-radius: 2px;
    }
    /* Prevent horizontal scroll on mobile */
    body {
        overflow-x: hidden;
    }
  `}} />
);

// --- MOCK DATA ---

const TOURS = [
  // Himachal
  {
    id: 1,
    title: "Manali & Kasol Backpacking",
    location: "Himachal Pradesh",
    region: "himachal",
    type: "group",
    duration: "6 Days / 5 Nights",
    price: 7999,
    oldPrice: "10,500",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 245,
    bestseller: true,
    highlights: ["Hadimba Temple", "Solang Valley", "Manikaran Sahib", "Mall Road Shopping"]
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
    image: "https://images.unsplash.com/photo-1643194562477-84d4939b4f2c?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    reviews: 189,
    bestseller: true,
    highlights: ["Guptkashi Stay", "Trek to Kedarnath", "Sonprayag", "Ganga Aarti"]
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
    highlights: ["Hanoi City Tour", "Ha Long Bay Cruise", "Ninh Binh", "Local Cuisine"]
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
    highlights: ["Munnar Tea Gardens", "Alleppey Houseboat", "Cochin Tour", "Kathakali Show"]
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
    image: "https://images.unsplash.com/photo-1626714485834-0322e75e1176?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 310,
    bestseller: false,
    highlights: ["Key Monastery", "Chandratal Lake", "Kunzum Pass", "World's Highest Post Office"]
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
    highlights: ["Jalori Pass", "Serolsar Lake", "Jibhi Waterfall", "Chehni Kothi"]
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
    highlights: ["River Rafting (16km)", "Cliff Jumping", "Bonfire & Music", "Jungle Camping"]
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
    highlights: ["Skiing Experience", "Joshimath Tour", "Nanda Devi View", "Cable Car Ride"]
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
    highlights: ["City Palace", "Lake Pichola Boat Ride", "Jag Dish Temple", "Monsoon Palace"]
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
    highlights: ["Sam Sand Dunes", "Jeep Safari", "Jaisalmer Fort", "Gadisar Lake"]
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
    image: "https://images.unsplash.com/photo-1512453979798-5ea932a23644?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 56,
    bestseller: false,
    highlights: ["Burj Khalifa", "Desert Safari BBQ", "Dubai Mall", "Marina Cruise"]
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
    highlights: ["Phi Phi Island Tour", "Phuket Beaches", "Coral Island", "Bangkok City Tour"]
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
    highlights: ["North Goa Beaches", "Fort Aguada", "Dudhsagar Trek", "Casino Night"]
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
    image: "https://images.unsplash.com/photo-1588665727192-3c2ae2b62788?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    reviews: 42,
    bestseller: true,
    highlights: ["Double Decker Bridge", "Umngot River", "Mawlynnong Village", "Seven Sisters Falls"]
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Edition 24: The Secret Valleys of Himachal",
    excerpt: "In this week's edition, we explore the untouched Tirthan Valley, discuss sustainable trekking practices, and share a traveler's photo essay from Spiti.",
    author: "Humsafar Team",
    date: "Oct 15, 2024",
    category: "Weekly Newsletter",
    image: "https://images.unsplash.com/photo-1605649487215-476786814a60?q=80&w=800&auto=format&fit=crop",
    tags: ["Himachal", "Trekking", "Sustainability"]
  },
  {
    id: 2,
    title: "Edition 23: Backpacking Vietnam on a Budget",
    excerpt: "A complete breakdown of costs for a 10-day Vietnam trip. Plus, top 5 hostels in Hanoi and a guide to the Ha Giang Loop.",
    author: "Rahul Verma",
    date: "Oct 08, 2024",
    category: "International Guide",
    image: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=800&auto=format&fit=crop",
    tags: ["Vietnam", "Budget Travel", "Food"]
  },
  {
    id: 3,
    title: "Edition 22: The Rise of Workations",
    excerpt: "Why digital nomads are flocking to Goa and Manali. Best cafes with WiFi, co-living spaces, and how to balance work with wanderlust.",
    author: "Aditi Sharma",
    date: "Oct 01, 2024",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    tags: ["Workation", "Digital Nomad", "Goa"]
  },
  {
    id: 4,
    title: "Edition 21: Chasing Monsoons in Meghalaya",
    excerpt: "Why you should visit the wettest place on earth during the rains. Living root bridges, waterfalls, and the warm Khasi hospitality.",
    author: "Humsafar Team",
    date: "Sep 24, 2024",
    category: "Weekly Newsletter",
    image: "https://images.unsplash.com/photo-1588665727192-3c2ae2b62788?q=80&w=800&auto=format&fit=crop",
    tags: ["Meghalaya", "North East", "Monsoon"]
  },
  {
    id: 5,
    title: "Edition 20: 5 Weekend Getaways from Delhi",
    excerpt: "Escape the city chaos. From Landour's colonial charm to the wildlife of Jim Corbett, here are our top picks for the long weekend.",
    author: "Humsafar Team",
    date: "Sep 17, 2024",
    category: "Weekly Newsletter",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
    tags: ["Weekend Trip", "Delhi", "Uttarakhand"]
  }
];

// --- COMPONENTS ---

const Header = ({ isScrolled, toggleMenu, isMenuOpen, onNavigate, currentPage, searchTerm, setSearchTerm }) => {
  const menuItems = [
    { id: 'home', label: 'Explore' },
    {
      id: 'upcoming',
      label: 'Upcoming Tours',
      action: () => onNavigate('upcoming')
    },
    { id: 'exclusive', label: 'Exclusive' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About Us' },
  ];

  const hasDarkHero = ['home'].includes(currentPage);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      onNavigate('search');
    }
  }

  return (
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 md:py-4 border-gray-100 shadow-sm' : hasDarkHero ? 'bg-transparent py-4 md:py-6' : 'bg-white py-3 md:py-4 border-gray-100 shadow-sm'}`}>
        <div className="container mx-auto px-4 lg:px-24 xl:px-32 flex justify-between items-center gap-4">
          {/* Brand Logo */}
          <div
              onClick={() => onNavigate('home')}
              className={`flex flex-col items-start leading-none group cursor-pointer shrink-0 ${isScrolled || !hasDarkHero ? 'text-emerald-950' : 'text-white'}`}
          >
            <span className="font-serif font-black text-xl md:text-2xl tracking-tight">Humsafar</span>
            <span className="font-sans text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-80 group-hover:tracking-[0.3em] transition-all duration-300">Community</span>
          </div>

          {/* Desktop Search Bar */}
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

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-semibold tracking-wide shrink-0 ${isScrolled || !hasDarkHero ? 'text-gray-600' : 'text-white/90'}`}>
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
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full ${currentPage === item.id ? 'w-full' : ''}`}></span>
                </button>
            ))}

            <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${isScrolled || !hasDarkHero ? 'bg-emerald-900 text-white hover:bg-emerald-800' : 'bg-white text-emerald-900 hover:bg-gray-100'}`}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Chat
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
                onClick={toggleMenu}
                className={`p-2 rounded-md ${isScrolled || !hasDarkHero ? 'text-emerald-950' : 'text-white'}`}
                aria-label="Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl p-6 flex flex-col space-y-6 text-gray-800 animate-in slide-in-from-top-5 border-t border-gray-100 h-[90vh] overflow-y-auto">

              {/* Mobile Search Bar */}
              <div className="relative w-full">
                <form onSubmit={(e) => { handleSearchSubmit(e); toggleMenu(); }}>
                  <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search destinations..."
                      className="w-full bg-gray-100 text-gray-800 text-sm rounded-xl py-3 pl-11 pr-4 outline-none border border-transparent focus:border-emerald-500 focus:bg-white transition-all shadow-inner font-medium"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 p-1">
                    <Search className="w-5 h-5 text-gray-400" />
                  </button>
                </form>
              </div>

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
                      className="font-serif font-bold text-2xl text-emerald-950 text-left hover:text-emerald-700 transition-colors"
                  >
                    {item.label}
                  </button>
              ))}
              <hr className="border-gray-100"/>
              <a
                  href="https://wa.me/919999999999"
                  className="bg-emerald-900 text-white py-4 rounded-xl flex justify-center items-center font-bold uppercase tracking-widest text-sm"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </a>
            </div>
        )}
      </nav>
  );
};

const Hero = ({ searchTerm, setSearchTerm, onSearch }) => (
    <section id="home" className="relative h-[92vh] flex items-center justify-center text-center text-white bg-emerald-950 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-80">
        <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
            alt="Travel Background"
            className="w-full h-full object-cover"
        />
      </div>
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-24 xl:px-32 pt-20 w-full">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em]">
          Explore the Unseen
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-lg">
          Find Your <span className="italic text-emerald-300">Wild.</span>
        </h1>
        <p className="text-base md:text-xl mb-8 md:mb-12 font-medium max-w-2xl mx-auto text-gray-100 leading-relaxed drop-shadow-md px-4">
          Curated expeditions for the modern explorer. Join the community that travels deeper.
        </p>

        {/* Main Search Bar - OTA Style */}
        <form onSubmit={onSearch} className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full p-3 md:p-2 md:pl-6 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl transform transition-all hover:scale-[1.01] gap-2 md:gap-0">
          <div className="flex-1 flex items-center px-2 md:px-0">
            <Search className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
            <input
                type="text"
                placeholder="Search places (e.g. Spiti, Kerala)"
                className="w-full py-2 md:py-4 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base md:text-lg font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
              type="submit"
              className="bg-emerald-900 hover:bg-emerald-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
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
    { id: 'educational', label: 'Educational' },
  ];

  return (
      <div className="container mx-auto px-4 lg:px-24 xl:px-32 -mt-10 md:-mt-20 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">

            <div className="w-full">
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

            <div className="w-full lg:w-auto min-w-[300px]">
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

const TourCard = ({ tour }) => {
  const whatsappMsg = `Hi Humsafar Team, I am interested in the ${tour.title} package. Please share more details.`;
  const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`;

  return (
      <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
        {/* Image Section - 4:3 Ratio */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {tour.bestseller && (
                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center uppercase tracking-wide">
              Bestseller
            </span>
            )}
          </div>

          {/* Wishlist Heart */}
          <div className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full cursor-pointer hover:bg-white transition-colors group/heart">
            <Heart className="w-4 h-4 text-white group-hover/heart:text-red-500 transition-colors" />
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center text-xs font-medium">
              <MapPin className="w-3 h-3 mr-1" /> {tour.location}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[10px] md:text-xs font-bold">
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

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tour.highlights && tour.highlights.slice(0, 3).map((h, i) => (
                  <span key={i} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                        {h}
                    </span>
              ))}
              {tour.highlights && tour.highlights.length > 3 && (
                  <span className="text-[10px] text-emerald-600 font-medium px-1 py-1">+More</span>
              )}
            </div>
          </div>

          {/* Price & Action */}
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
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all shadow-md hover:shadow-lg"
            >
              View Deal
            </a>
          </div>
        </div>
      </div>
  );
};

const InquiryForms = () => {
  const [activeTab, setActiveTab] = useState('retail');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been sent to our team. We will contact you on WhatsApp shortly.");
  };

  return (
      <section id="forms" className="py-16 md:py-24 bg-white relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-scribble pointer-events-none opacity-50"></div>

        {/* Subtle decorative circles - contained within parent */}
        <div className="absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob overflow-hidden"></div>
        <div className="absolute top-20 left-0 w-64 md:w-96 h-64 md:h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 overflow-hidden"></div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

            {/* Side Info Panel */}
            <div className="md:w-4/12 bg-emerald-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

              <div className="relative z-10 space-y-8 md:space-y-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Let's Plan Your<br/>Next Escape.</h3>
                  <p className="text-emerald-200 text-base md:text-lg leading-relaxed">Whether it's a solo soul-search or a corporate retreat, we craft journeys that linger in your memory.</p>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center group">
                    <div className="bg-emerald-800/50 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mr-4 md:mr-5 group-hover:bg-emerald-700 transition-colors border border-emerald-700/30 shrink-0">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Talk to an Expert</p>
                      <p className="font-medium text-base md:text-lg tracking-wide break-all">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="bg-emerald-800/50 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mr-4 md:mr-5 group-hover:bg-emerald-700 transition-colors border border-emerald-700/30 shrink-0">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Write to Us</p>
                      <p className="font-medium text-base md:text-lg tracking-wide break-all">hello@humsafar.com</p>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="bg-emerald-800/50 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mr-4 md:mr-5 group-hover:bg-emerald-700 transition-colors border border-emerald-700/30 shrink-0">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Visit HQ</p>
                      <p className="font-medium text-base md:text-lg leading-snug">Hauz Khas Village,<br/>New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 md:mt-12 pt-8 border-t border-emerald-800/50">
                <p className="text-emerald-400 text-xs italic">"The journey of a thousand miles begins with a single step."</p>
              </div>
            </div>

            {/* Form Area */}
            <div className="md:w-8/12 p-8 md:p-12 lg:p-16 bg-gray-50/30">
              <div className="flex space-x-6 md:space-x-8 mb-10 border-b-2 border-gray-100 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab('retail')}
                    className={`pb-4 font-bold text-sm uppercase tracking-widest transition-all relative px-2 shrink-0 ${activeTab === 'retail' ? 'text-emerald-900 border-b-2 border-emerald-900 -mb-[2px]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Plan A Trip
                </button>
                <button
                    onClick={() => setActiveTab('b2b')}
                    className={`pb-4 font-bold text-sm uppercase tracking-widest transition-all relative px-2 shrink-0 ${activeTab === 'b2b' ? 'text-emerald-900 border-b-2 border-emerald-900 -mb-[2px]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Partner With Us
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Full Name</label>
                    <input required type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none transition-colors text-gray-800 placeholder-gray-300 font-medium" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Phone Number</label>
                    <input required type="tel" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none transition-colors text-gray-800 placeholder-gray-300 font-medium" placeholder="e.g. +91 98765..." />
                  </div>
                </div>

                {activeTab === 'b2b' && (
                    <div className="space-y-2 md:space-y-3 group">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Company / Agency Name</label>
                      <input required type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none transition-colors text-gray-800 placeholder-gray-300 font-medium" placeholder="e.g. Wanderlust Travels Pvt Ltd" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Destination Interest</label>
                    <input required type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none transition-colors text-gray-800 placeholder-gray-300 font-medium" placeholder="e.g. Spiti Valley, Kerala..." />
                  </div>
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Travel Dates (Approx)</label>
                    <input type="text" className="w-full px-0 py-2 md:py-3 bg-transparent border-b-2 border-gray-200 focus:border-emerald-600 outline-none transition-colors text-gray-800 placeholder-gray-300 font-medium" placeholder="e.g. Mid December" />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3 group">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-emerald-600 transition-colors">Tell us more</label>
                  <textarea rows="3" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all text-gray-800 placeholder-gray-400 resize-none" placeholder="Group size, specific requirements..."></textarea>
                </div>

                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-400 hidden md:block">We usually respond within 2 hours.</p>
                  <button type="submit" className="bg-emerald-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 w-full md:w-auto justify-center">
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

const FeatureSection = () => (
    <section className="py-16 md:py-24 bg-emerald-950 relative overflow-hidden">
      {/* Abstract Background Element - contained */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-900/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-24 xl:px-32 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-center">

          {/* Left Column - Features */}
          <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
              <div className="bg-emerald-900/50 p-3 rounded-xl text-emerald-400 mb-3 shadow-sm border border-emerald-800">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-1 text-lg">Community First</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Join a family of 10k+ travelers sharing stories and creating memories.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
              <div className="bg-emerald-900/50 p-3 rounded-xl text-orange-400 mb-3 shadow-sm border border-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-1 text-lg">100% Safe</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Verified stays, secure payments, and 24/7 on-trip support.</p>
            </div>
          </div>

          {/* Center Column - Title Text */}
          <div className="text-center relative order-1 lg:order-2 mb-8 lg:mb-0">
            <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Redefining<br />how you <span className="italic text-emerald-400">travel.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
              We don't just plan trips; we curate immersive experiences that bring people together. Trusted by thousands of wanderers.
            </p>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-8 md:space-y-12 order-3">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
              <div className="bg-emerald-900/50 p-3 rounded-xl text-blue-400 mb-3 shadow-sm border border-emerald-800">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-1 text-lg">Top Rated</h3>
              <p className="text-sm text-gray-400 leading-relaxed">4.8/5 average rating across all platforms from happy travelers.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
              <div className="bg-emerald-900/50 p-3 rounded-xl text-purple-400 mb-3 shadow-sm border border-emerald-800">
                <MapIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-1 text-lg">Curated Trips</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Handpicked itineraries designed for the best immersive experience.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
);

const Footer = ({ onNavigate }) => (
    <footer className="bg-gray-950 text-gray-400 py-16 md:py-20 border-t border-gray-900">
      <div className="container mx-auto px-4 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">
          <div className="lg:col-span-1">
            <div
                onClick={() => onNavigate('home')}
                className="flex flex-col items-start leading-none mb-6 text-white cursor-pointer"
            >
              <span className="font-serif font-black text-2xl tracking-tight">Humsafar</span>
              <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-60">Community</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-gray-500">
              Building a community of travelers who seek stories, adventures, and meaningful connections across India and the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-emerald-900 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Destinations</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'International', 'North East India'].map(item => (
                    <li key={item}><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors text-left">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">About Us</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">Partner Program</button></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Newsletter</h4>
            <p className="text-xs mb-6 text-gray-500">Join our newsletter for exclusive deals and travel stories.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Your email address" className="bg-gray-900 text-white px-5 py-3 rounded-lg outline-none w-full text-sm border border-gray-800 focus:border-emerald-600 transition" />
              <button className="bg-emerald-900 px-5 py-3 rounded-lg hover:bg-emerald-800 transition text-white font-bold text-sm uppercase tracking-wide">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600 text-center md:text-left">
          <p>© {new Date().getFullYear()} Humsafar Community. All rights reserved.</p>
          <p className="flex items-center">Made with <Heart className="w-3 h-3 inline text-emerald-700 mx-1 fill-current" /> in India</p>
        </div>
      </div>
    </footer>
);

// --- NEW PAGE COMPONENTS ---

const SearchResultsPage = ({ searchTerm, setSearchTerm }) => {
  const filteredTours = TOURS.filter(tour => {
    const term = searchTerm.toLowerCase();
    return tour.title.toLowerCase().includes(term) ||
        tour.location.toLowerCase().includes(term) ||
        tour.region.toLowerCase().includes(term);
  });

  return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4 lg:px-24 xl:px-32">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Search Results</h1>
            <p className="text-gray-500 mb-6">Showing results for "<span className="font-bold text-gray-900">{searchTerm}</span>"</p>

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

        <div className="container mx-auto px-4 lg:px-24 xl:px-32 py-12">
          {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
              </div>
          ) : (
              <div className="text-center py-32">
                <MapPin className="mx-auto h-16 w-16 text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-500">We couldn't find any trips matching your search. Try different keywords.</p>
              </div>
          )}
        </div>
      </div>
  );
};

const HomePage = ({ onSearch, setSearchTerm, searchTerm }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredTours = TOURS.filter(tour => {
    const matchesRegion = selectedRegion === 'all' || tour.region === selectedRegion;
    const matchesType = selectedType === 'all' || tour.type === selectedType;
    return matchesRegion && matchesType;
  });

  const bestsellers = TOURS.filter(t => t.bestseller).slice(0, 4);
  const trending = [...TOURS].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const international = TOURS.filter(t => t.region === 'international').slice(0, 4);

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
          {/* Abstract shapes - overflow handled by container */}
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[500px] h-[500px] rounded-full border border-gray-100 pointer-events-none" />
          <div className="absolute top-20 right-0 translate-x-1/2 w-[300px] h-[300px] rounded-full bg-emerald-50/50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[600px] h-[600px] rounded-full border border-gray-100 pointer-events-none" />

          <div className="absolute inset-0 bg-scribble pointer-events-none" />

          <section id="tours" className="py-16 md:py-24 min-h-[600px] relative z-10">
            <div className="container mx-auto px-4 lg:px-24 xl:px-32">

              {!isDefaultView ? (
                  <div>
                    <div className="flex justify-between items-end mb-8 md:mb-12">
                      <div>
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Results</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Your Selection</h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                      {filteredTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
                    </div>
                    {filteredTours.length === 0 && (
                        <div className="text-center py-24">
                          <p className="text-gray-500">No trips found for these filters.</p>
                          <button onClick={() => {setSelectedRegion('all'); setSelectedType('all')}} className="text-emerald-700 font-bold mt-4 hover:underline">Clear Filters</button>
                        </div>
                    )}
                  </div>
              ) : (
                  <div className="space-y-20 md:space-y-24">

                    {/* Section 1: Bestsellers */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                        <div>
                          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Traveler Favorites</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Bestselling Collections</h2>
                        </div>
                        <button onClick={() => {setSelectedRegion('all'); setSelectedType('all')}} className="hidden md:flex items-center text-emerald-900 font-bold hover:text-emerald-700 transition text-sm uppercase tracking-wider group">
                          See All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {bestsellers.map(tour => <TourCard key={tour.id} tour={tour} />)}
                      </div>
                    </div>

                    {/* Section 2: Trending */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                        <div>
                          <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-3 block">Don't Miss Out</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Trending Now</h2>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {trending.map(tour => <TourCard key={tour.id} tour={tour} />)}
                      </div>
                    </div>

                    {/* Section 3: International */}
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                        <div>
                          <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-3 block">Global Wandering</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">International Adventures</h2>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {international.map(tour => <TourCard key={tour.id} tour={tour} />)}
                      </div>
                    </div>

                  </div>
              )}

            </div>
          </section>
        </div>

        <FeatureSection />
      </>
  );
};

const UpcomingTripsPage = () => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(60000);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const getUpcomingSaturdays = (count = 5) => {
    const dates = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + (6 - currentDate.getDay() + 7) % 7);
    if (currentDate <= new Date()) currentDate.setDate(currentDate.getDate() + 7);

    for (let i = 0; i < count; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    return dates;
  };

  const upcomingDates = useMemo(() => getUpcomingSaturdays(8), []);
  const uniqueRegions = Array.from(new Set(TOURS.map(t => t.location)));

  const schedule = useMemo(() => {
    return upcomingDates.map(date => {
      const availableTours = TOURS.filter((tour, index) => {
        const matchesDest = selectedDestinations.length === 0 || selectedDestinations.includes(tour.location);
        const matchesPrice = tour.price <= priceRange;
        const days = parseInt(tour.duration);
        const isShort = days <= 5;
        const matchesDuration = selectedDurations.length === 0 ||
            (selectedDurations.includes('short') && isShort) ||
            (selectedDurations.includes('long') && !isShort);

        const isScheduled = (date.getTime() + index) % 3 === 0;

        return matchesDest && matchesPrice && matchesDuration && isScheduled;
      });
      return { date, tours: availableTours };
    }).filter(item => item.tours.length > 0);
  }, [upcomingDates, selectedDestinations, priceRange, selectedDurations]);

  const toggleDestination = (dest) => {
    setSelectedDestinations(prev =>
        prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const toggleDuration = (type) => {
    setSelectedDurations(prev =>
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4 lg:px-24 xl:px-32">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Upcoming Departures</h1>
            <p className="text-gray-500 max-w-2xl">Plan your weekends with our scheduled group departures. Fixed dates, like-minded travelers, and curated experiences.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-24 xl:px-32 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Left Sidebar Filters */}
            <div className="w-full lg:w-1/4 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold border-b border-gray-100 pb-4">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Destinations</h4>
                  <div className="space-y-3">
                    {uniqueRegions.map(region => (
                        <label key={region} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedDestinations.includes(region) ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 bg-white group-hover:border-emerald-400'}`}>
                            {selectedDestinations.includes(region) && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <input
                              type="checkbox"
                              className="hidden"
                              checked={selectedDestinations.includes(region)}
                              onChange={() => toggleDestination(region)}
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">{region}</span>
                        </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Max Budget</h4>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">₹{priceRange.toLocaleString()}</span>
                  </div>
                  <input
                      type="range"
                      min="5000"
                      max="60000"
                      step="1000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                    <span>₹5k</span>
                    <span>₹60k+</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Duration</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'short', label: 'Short Trips (< 5 Days)' },
                      { id: 'long', label: 'Long Trips (5+ Days)' }
                    ].map(type => (
                        <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedDurations.includes(type.id) ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 bg-white group-hover:border-emerald-400'}`}>
                            {selectedDurations.includes(type.id) && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <input
                              type="checkbox"
                              className="hidden"
                              checked={selectedDurations.includes(type.id)}
                              onChange={() => toggleDuration(type.id)}
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">{type.label}</span>
                        </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Schedule */}
            <div className="w-full lg:w-3/4">
              {schedule.length > 0 ? (
                  <div className="space-y-12">
                    {schedule.map((item, idx) => (
                        <div key={idx} className="relative pl-6 md:pl-0">
                          {/* Date Marker for Mobile */}
                          <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          <div className="md:hidden absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>

                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Date Column */}
                            <div className="md:w-32 shrink-0 md:text-right md:sticky md:top-32 self-start">
                              <div className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-none mb-1">
                                {item.date.getDate()}
                              </div>
                              <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">
                                {item.date.toLocaleString('default', { month: 'short' })}
                              </div>
                              <div className="text-xs text-gray-400 font-medium">
                                {item.date.toLocaleString('default', { weekday: 'long' })}
                              </div>
                            </div>

                            {/* Tours List */}
                            <div className="flex-1 grid grid-cols-1 gap-4">
                              {item.tours.map(tour => (
                                  <div key={tour.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row gap-4">
                                    <div className="w-full sm:w-32 h-40 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                      <div>
                                        <div className="flex justify-between items-start">
                                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                                              {tour.duration}
                                          </span>
                                          <div className="flex items-center text-xs text-gray-500">
                                            <Star className="w-3 h-3 text-orange-400 fill-current mr-1" />
                                            <span className="font-bold text-gray-900 mr-1">{tour.rating}</span>
                                            <span>({tour.reviews})</span>
                                          </div>
                                        </div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 md:line-clamp-1">{tour.title}</h4>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                          <MapPin className="w-3 h-3 mr-1" /> {tour.location}
                                        </div>
                                      </div>

                                      {/* Mobile-only Price/Action for vertical layout inside card */}
                                      <div className="sm:hidden flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                          <span className="text-xs text-gray-400 line-through">₹{tour.oldPrice}</span>
                                          <span className="text-lg font-bold text-gray-900 block">₹{tour.price.toLocaleString()}</span>
                                        </div>
                                        <a href={`https://wa.me/919999999999?text=Hi, I'm interested in the ${tour.title} trip`} target="_blank" rel="noopener noreferrer" className="bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">Book</a>
                                      </div>

                                    </div>
                                    <div className="hidden sm:flex flex-col justify-between items-end sm:border-l sm:border-gray-100 sm:pl-4 min-w-[100px]">
                                      <div className="text-right">
                                        <span className="text-xs text-gray-400 line-through block">₹{tour.oldPrice}</span>
                                        <span className="text-lg font-bold text-gray-900 block">₹{tour.price.toLocaleString()}</span>
                                      </div>
                                      <a
                                          href={`https://wa.me/919999999999?text=Hi, I'm interested in the ${tour.title} trip starting on ${item.date.toDateString()}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-emerald-800 transition"
                                      >
                                        Book Now
                                      </a>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-200">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No trips found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your filters to find available dates.</p>
                    <button
                        onClick={() => {setSelectedDestinations([]); setPriceRange(60000); setSelectedDurations([]);}}
                        className="mt-4 text-emerald-600 font-bold text-sm hover:underline"
                    >
                      Reset Filters
                    </button>
                  </div>
              )}

              <div className="mt-16 bg-emerald-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-bold mb-3">Can't find your dates?</h3>
                  <p className="text-emerald-100 mb-6 max-w-lg mx-auto text-sm">We organize custom private trips for groups of 4 or more. Pick your own dates and we'll handle the rest.</p>
                  <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-50 transition shadow-lg">
                    Request Custom Trip
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl -ml-32 -mb-32 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
      <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden w-full">
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

        {currentPage === 'home' && (
            <HomePage
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={(e) => { e.preventDefault(); if(searchTerm.trim()) navigate('search'); }}
            />
        )}

        {currentPage === 'about' && (
            <AboutPage />
        )}

        {currentPage === 'blog' && (
            <BlogPage />
        )}

        {currentPage === 'upcoming' && (
            <UpcomingTripsPage />
        )}

        {currentPage === 'exclusive' && (
            <ExclusivePage />
        )}

        {currentPage === 'search' && (
            <SearchResultsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        <Footer onNavigate={navigate} />

        {/* Floating WhatsApp Button */}
        <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-transform transform hover:scale-110 z-50 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
        </a>
      </div>
  );
}