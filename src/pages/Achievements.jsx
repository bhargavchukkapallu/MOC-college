import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiAcademicCap,
  HiTrophy,
  HiShieldCheck,
  HiMagnifyingGlass,
  HiCalendarDays,
  HiFunnel,
  HiSparkles
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import BannerBackground from '../components/ui/BannerBackground';

const categories = ["All", "Academic", "Institutional", "Student"];
const years = ["All", "2026", "2025", "2024"];

const monthOrder = {
  "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
  "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
};

const categoryColors = {
  Academic: {
    bg: "bg-red-50 text-brand-primary border-brand-primary/10",
    badge: "bg-brand-primary text-white",
    dot: "bg-brand-primary border-brand-secondary",
    icon: <HiAcademicCap className="w-5 h-5" />
  },
  Institutional: {
    bg: "bg-blue-50 text-blue-700 border-blue-100",
    badge: "bg-blue-600 text-white",
    dot: "bg-blue-600 border-blue-300",
    icon: <HiShieldCheck className="w-5 h-5" />
  },
  Student: {
    bg: "bg-yellow-50 text-amber-800 border-yellow-200",
    badge: "bg-brand-secondary text-brand-dark",
    dot: "bg-brand-secondary border-brand-primary",
    icon: <HiTrophy className="w-5 h-5" />
  }
};

// Generates a smooth wavy bezier path oscillating around centerX
const generateWavePath = (height, centerX, amplitude, wavelength) => {
  if (!height) return "";
  let d = `M ${centerX} 0`;
  let currentY = 0;
  let count = 0;
  const actualWavelength = Math.min(wavelength, height / 2 || wavelength);
  while (currentY < height) {
    const nextY = Math.min(currentY + actualWavelength, height);
    const cpX = centerX + (count % 2 === 0 ? amplitude : -amplitude);
    const cpY = currentY + (nextY - currentY) / 2;
    d += ` Q ${cpX} ${cpY}, ${centerX} ${nextY}`;
    currentY = nextY;
    count++;
  }
  return d;
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [timelineHeight, setTimelineHeight] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/achievements.json`)
      .then(res => res.json())
      .then(data => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading achievements:", err);
        setLoading(false);
      });
  }, []);

  // Filter achievements based on inputs
  const filteredAchievements = useMemo(() => {
    return achievements
      .filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesYear = selectedYear === "All" || item.year.toString() === selectedYear;
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesYear && matchesSearch;
      })
      .sort((a, b) => {
        // Sort newest year first
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        // If years match, sort newest month first
        return monthOrder[b.month] - monthOrder[a.month];
      });
  }, [achievements, selectedCategory, selectedYear, searchQuery]);

  // Monitor timeline height dynamically for the wave path
  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        setTimelineHeight(timelineRef.current.offsetHeight);
      }
    };
    
    const timer = setTimeout(updateHeight, 100);
    
    const resizeObserver = new ResizeObserver(updateHeight);
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [filteredAchievements, loading]);

  // Compute key stats based on achievements data
  const stats = useMemo(() => {
    const counts = { Academic: 0, Institutional: 0, Student: 0 };
    achievements.forEach(item => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return [
      {
        label: "Academic Ranks",
        value: counts.Academic,
        icon: <HiAcademicCap className="w-6 h-6" />,
        color: "text-brand-primary bg-brand-primary/5 border-brand-primary/10"
      },
      {
        label: "Institutional Laurels",
        value: counts.Institutional,
        icon: <HiShieldCheck className="w-6 h-6" />,
        color: "text-blue-600 bg-blue-50 border-blue-100"
      },
      {
        label: "Student Triumphs",
        value: counts.Student,
        icon: <HiTrophy className="w-6 h-6" />,
        color: "text-amber-600 bg-yellow-50 border-yellow-100"
      }
    ];
  }, [achievements]);

  return (
    <div className="bg-[#fafcff] min-h-screen pb-24 font-sans">
      {/* Banner Section */}
      <section className="relative pt-34 pb-12 lg:pt-38 lg:pb-16 overflow-hidden bg-brand-primary">
        <BannerBackground />
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Legacy of Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-brand-secondary">Achievements</span>
            </h1>
            <p className="max-w-2xl text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
              Celebrating our academic excellence, student accomplishments, and major institutional milestones through a journey of dedication and faith.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Breadcrumbs align="start" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-12 lg:mt-16">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex items-center justify-between group hover:shadow-md transition-all duration-300"
              >
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                  <h4 className="text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">{stat.value}+</h4>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Controls Bar */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 lg:p-8 mb-16 flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-20">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Category Filters */}
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <HiFunnel className="w-3.5 h-3.5" /> Filter Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-102"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filters */}
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <HiCalendarDays className="w-3.5 h-3.5" /> Select Year
                </span>
                <div className="flex flex-wrap gap-2">
                  {years.map(yr => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                        selectedYear === yr
                          ? "bg-brand-secondary text-brand-dark shadow-md scale-102"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark"
                      }`}
                    >
                      {yr === "All" ? "All Years" : yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative xl:w-80 group">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-sm text-gray-700 shadow-inner"
              />
            </div>
          </div>

          {/* Timeline Feed Container */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
          ) : filteredAchievements.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_15px_60px_rgba(0,0,0,0.02)] p-6 md:p-10 lg:p-12 relative overflow-hidden z-10">
              
              {/* Fade Overlays to indicate scrollable content inside achievements container */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>

              {/* Scrollable Container */}
              <div className="max-h-[68vh] overflow-y-auto px-1 pr-4 md:pr-6 py-8 scroll-smooth scrollbar-thin relative z-10">
                <div ref={timelineRef} className="relative select-none">
                  
                  {/* Desktop Wavy Path */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-12 z-0 pointer-events-none">
                    <svg
                      width="48"
                      height={timelineHeight}
                      viewBox={`0 0 48 ${timelineHeight}`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full"
                    >
                      <defs>
                        <linearGradient id="wave-gradient-desktop" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#800000" />
                          <stop offset="50%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#800000" />
                        </linearGradient>
                      </defs>
                      <path
                        d={generateWavePath(timelineHeight, 24, 12, 180)}
                        stroke="url(#wave-gradient-desktop)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="8 6"
                        className="opacity-80"
                      />
                    </svg>
                  </div>

                  {/* Mobile Wavy Path */}
                  <div className="block md:hidden absolute left-6 -translate-x-1/2 top-4 bottom-4 w-6 z-0 pointer-events-none">
                    <svg
                      width="24"
                      height={timelineHeight}
                      viewBox={`0 0 24 ${timelineHeight}`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full"
                    >
                      <defs>
                        <linearGradient id="wave-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#800000" />
                          <stop offset="50%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#800000" />
                        </linearGradient>
                      </defs>
                      <path
                        d={generateWavePath(timelineHeight, 12, 5, 120)}
                        stroke="url(#wave-gradient-mobile)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 4"
                        className="opacity-80"
                      />
                    </svg>
                  </div>

                  {/* Timeline Items list */}
                  <div className="space-y-16 md:space-y-28 relative z-10">
                    {filteredAchievements.map((item, idx) => {
                      const details = categoryColors[item.category] || categoryColors.Academic;
                      const isEven = idx % 2 === 0;
                      const imageUrl = item.image ? `${import.meta.env.BASE_URL}images/${item.image}` : null;

                      return (
                        <div
                          key={item.id}
                          className={`flex flex-col md:flex-row ${
                            isEven ? '' : 'md:flex-row-reverse'
                          } items-center justify-between relative pl-16 md:pl-0 w-full group`}
                        >
                          {/* Central/Left Node Indicator on path */}
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 20 }}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
                            className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white z-20 ${details.dot}`}
                          >
                            <span className="scale-75">{details.icon}</span>
                          </motion.div>

                          {/* Side A: Thumbnail Circle & Overlapping Date Badge (matching screenshot layout) */}
                          <div className={`w-full md:w-[44%] flex justify-start ${isEven ? 'md:justify-end' : 'md:justify-start'} mb-8 md:mb-0`}>
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0, y: 40 }}
                              whileInView={{ scale: 1, opacity: 1, y: 0 }}
                              viewport={{ once: false, amount: 0.2 }}
                              transition={{ type: "spring", stiffness: 90, damping: 14 }}
                              className="relative"
                            >
                              {/* Circular outline/frame with background image */}
                              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-white shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(128,0,0,0.14)] overflow-hidden bg-gray-50 flex items-center justify-center group cursor-pointer transition-shadow duration-300">
                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-tr from-brand-primary/5 to-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <span className="scale-150">{details.icon}</span>
                                  </div>
                                )}
                                
                                {/* Inner border line overlay */}
                                <div className="absolute inset-0 border border-black/5 rounded-full pointer-events-none"></div>
                              </div>

                              {/* Overlapping Date Badge pill (from reference screenshot) */}
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-gradient-to-r from-brand-primary to-brand-primary/95 text-white font-extrabold text-[10px] md:text-xs px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-[0_10px_25px_rgba(128,0,0,0.25)] border border-brand-secondary/30 uppercase tracking-widest hover:scale-105 transition-transform duration-300 z-30">
                                {item.month} {item.year}
                              </div>
                            </motion.div>
                          </div>

                          {/* Side B: Details Card with smooth slide-in & scale-in animation */}
                          <div className={`w-full md:w-[44%] flex justify-start ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                            <motion.div
                              initial={{ scale: 0.85, opacity: 0, y: 50 }}
                              whileInView={{ scale: 1, opacity: 1, y: 0 }}
                              viewport={{ once: false, amount: 0.2 }}
                              transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.05 }}
                              whileHover={{ y: -5 }}
                              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(128,0,0,0.07)] p-6 lg:p-8 w-full group relative overflow-hidden transition-all duration-300"
                            >
                              {/* Inner glow indicator strip */}
                              <div className={`absolute top-0 left-0 w-2 h-full ${details.dot.split(' ')[0]}`}></div>
                              
                              {/* Card Header: Category & ID */}
                              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${details.bg}`}>
                                  {item.category}
                                </span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                  Laurel #{item.id}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl lg:text-2xl font-black text-brand-dark mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                                {item.title}
                              </h3>

                              {/* Description */}
                              <p className="text-gray-500 font-medium text-[15px] leading-relaxed mb-6">
                                {item.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                {item.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiSparkles className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-2">No achievements found</h3>
              <p className="text-gray-500 font-medium">Try clearing your filters or tweaking your search term.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedYear("All");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
