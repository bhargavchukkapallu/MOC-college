import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendarDays,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlass,
  HiAcademicCap,
  HiBell,
  HiInformationCircle,
  HiXMark,
  HiCalendar,
  HiClock,
  HiMapPin,
  HiTag,
  HiListBullet,
  HiChevronDown,
  HiOutlineNewspaper,
  HiFire
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import BannerBackground from '../components/ui/BannerBackground';
import { Link } from 'react-router-dom';

const categories = ["All", "University Calendar", "College Calendar", "Exam Schedule", "Holidays"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AcademicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [sidebarArticles, setSidebarArticles] = useState([]);
  const [sidebarEvents, setSidebarEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("calendar"); // "list" or "calendar"
  const [calendarScale, setCalendarScale] = useState("month"); // "month", "week", "day"
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 12));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Custom Dropdown States
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    // Fetch Calendar Data
    fetch(`${import.meta.env.BASE_URL}json_data/academic_calendar.json`)
      .then(res => res.json())
      .then(data => setCalendarData(data))
      .catch(err => console.error("Error loading calendar data:", err));

    // Fetch Sidebar Data
    fetch(`${import.meta.env.BASE_URL}json_data/articles.json`)
      .then(res => res.json())
      .then(data => setSidebarArticles(data.slice(0, 3)))
      .catch(err => console.error("Error loading articles:", err));

    fetch(`${import.meta.env.BASE_URL}json_data/events.json`)
      .then(res => res.json())
      .then(data => setSidebarEvents(data.slice(0, 3)))
      .catch(err => console.error("Error loading events:", err));

    // Close dropdowns on outside click
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) setIsMonthOpen(false);
      if (yearRef.current && !yearRef.current.contains(event.target)) setIsYearOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredData = useMemo(() => {
    return calendarData.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [calendarData, selectedCategory, searchQuery]);

  const paginatedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const groupedData = useMemo(() => {
    const groups = {};
    paginatedData.forEach(item => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(item);
    });
    return groups;
  }, [paginatedData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    if (calendarScale === "month") {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push({ day: prevMonthLastDay - i, month: month - 1, year: year, isCurrentMonth: false, dateString: new Date(year, month - 1, prevMonthLastDay - i).toISOString().split('T')[0] });
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, month: month, year: year, isCurrentMonth: true, dateString: new Date(year, month, i).toISOString().split('T')[0] });
      }
      const remainingCells = 42 - days.length;
      for (let i = 1; i <= remainingCells; i++) {
        days.push({ day: i, month: month + 1, year: year, isCurrentMonth: false, dateString: new Date(year, month + 1, i).toISOString().split('T')[0] });
      }
    } else if (calendarScale === "week") {
      const dayOfWeek = currentDate.getDay();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        days.push({ day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), isCurrentMonth: d.getMonth() === month, dateString: d.toISOString().split('T')[0], dayName: weekDays[i] });
      }
    } else if (calendarScale === "day") {
      days.push({ day: currentDate.getDate(), month: currentDate.getMonth(), year: currentDate.getFullYear(), isCurrentMonth: true, dateString: currentDate.toISOString().split('T')[0], dayName: weekDays[currentDate.getDay()] });
    }
    return days;
  }, [currentDate, calendarScale]);

  const navigate = (offset) => {
    const newDate = new Date(currentDate);
    if (calendarScale === "month") newDate.setMonth(currentDate.getMonth() + offset);
    else if (calendarScale === "week") newDate.setDate(currentDate.getDate() + (offset * 7));
    else if (calendarScale === "day") newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-[#fafcff] min-h-screen pb-20 font-sans">
      <section className="relative pt-34 pb-12 lg:pt-38 lg:pb-16 overflow-hidden bg-brand-primary">
        <BannerBackground />
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">Stay Synchronized</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Academic <span className="text-brand-secondary">Calendar</span></h1>
            <p className="max-w-2xl text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8">A comprehensive guide to all academic activities, holidays, and examination schedules for the current session.</p>
            <div className="flex justify-center lg:justify-start"><Breadcrumbs align="start" /></div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-[88px] z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mr-4">
                <button onClick={() => setViewMode("calendar")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === "calendar" ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  <HiCalendar className="w-4 h-4" /> Calendar
                </button>
                <button onClick={() => setViewMode("list")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === "list" ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  <HiListBullet className="w-4 h-4" /> List View
                </button>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 hidden lg:block mx-2"></div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${selectedCategory === cat ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20 border" : "bg-gray-50 text-gray-500 hover:bg-gray-100 border-transparent border"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative group lg:w-64">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-sm text-gray-700" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - News & Events */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Upcoming Events Mini-List */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <HiFire className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-brand-dark">Campus Events</h3>
                  </div>
                  <div className="space-y-6">
                    {sidebarEvents.map((event, idx) => (
                      <Link 
                        key={idx}
                        to={`/insights?tab=events`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <span className="text-sm font-black leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                            <span className="text-[10px] font-bold uppercase">{event.date.split(' ')[0]}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1">{event.title}</h4>
                            <p className="text-xs font-medium text-gray-400 mt-1">{event.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to="/insights?tab=events"
                    className="mt-8 flex items-center justify-center w-full py-4 bg-gray-50 rounded-2xl text-xs font-black text-gray-500 hover:bg-brand-primary hover:text-white transition-all uppercase tracking-widest"
                  >
                    View All Events
                  </Link>
                </div>
              </div>

              {/* Latest Articles Mini-List */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-secondary/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <HiOutlineNewspaper className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-brand-dark">Latest Insights</h3>
                  </div>
                  <div className="space-y-6">
                    {sidebarArticles.map((article, idx) => (
                      <Link 
                        key={idx}
                        to={`/insights?article=${article.id}`}
                        className="group block"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
                          <span className="absolute bottom-3 left-3 text-[10px] font-black text-white uppercase tracking-widest bg-brand-primary/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                            {article.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2 leading-relaxed">
                          {article.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to="/insights"
                    className="mt-8 flex items-center justify-center w-full py-4 bg-gray-50 rounded-2xl text-xs font-black text-gray-500 hover:bg-brand-primary hover:text-white transition-all uppercase tracking-widest"
                  >
                    Read More Insights
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Side - Calendar */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {viewMode === "calendar" ? (
                  <motion.div key={`calendar-${calendarScale}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-visible">
                    <div className="p-8 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gray-50/30 rounded-t-[2.5rem]">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setCurrentDate(new Date())} className="px-5 py-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-xs font-black text-brand-primary hover:bg-brand-primary hover:text-white transition-all active:scale-95 mr-2">Today</button>
                        <div className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 relative">
                          <button onClick={() => navigate(-1)} className="p-2 hover:bg-brand-primary/5 hover:text-brand-primary rounded-xl text-gray-400 transition-all active:scale-90"><HiChevronLeft className="w-5 h-5" /></button>
                          <div className="flex items-center gap-2 px-2">
                            <div className="relative" ref={monthRef}>
                              <button onClick={() => setIsMonthOpen(!isMonthOpen)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-lg lg:text-xl font-black text-brand-dark group">{monthNames[currentDate.getMonth()]}<HiChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-transform ${isMonthOpen ? 'rotate-180' : ''}`} /></button>
                              <AnimatePresence>{isMonthOpen && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[60] max-h-80 overflow-y-auto no-scrollbar">{monthNames.map((name, i) => (<button key={name} onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), i, 1)); setIsMonthOpen(false); }} className={`w-full text-left px-5 py-2 text-sm font-bold transition-colors ${currentDate.getMonth() === i ? "bg-brand-primary/10 text-brand-primary" : "text-gray-600 hover:bg-gray-50"}`}>{name}</button>))}</motion.div>)}</AnimatePresence>
                            </div>
                            <div className="relative" ref={yearRef}>
                              <button onClick={() => setIsYearOpen(!isYearOpen)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-lg lg:text-xl font-black text-gray-400 group">{currentDate.getFullYear()}<HiChevronDown className={`w-4 h-4 text-gray-300 group-hover:text-brand-primary transition-transform ${isYearOpen ? 'rotate-180' : ''}`} /></button>
                              <AnimatePresence>{isYearOpen && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[60]">{Array.from({ length: 11 }).map((_, i) => { const year = new Date().getFullYear() - 5 + i; return (<button key={year} onClick={() => { setCurrentDate(new Date(year, currentDate.getMonth(), 1)); setIsYearOpen(false); }} className={`w-full text-left px-5 py-2 text-sm font-bold transition-colors ${currentDate.getFullYear() === year ? "bg-brand-primary/10 text-brand-primary" : "text-gray-600 hover:bg-gray-50"}`}>{year}</button>); })}</motion.div>)}</AnimatePresence>
                            </div>
                          </div>
                          <button onClick={() => navigate(1)} className="p-2 hover:bg-brand-primary/5 hover:text-brand-primary rounded-xl text-gray-400 transition-all active:scale-90"><HiChevronRight className="w-5 h-5" /></button>
                        </div>
                        {calendarScale === 'day' && <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl text-sm font-black tracking-tight">Day: {currentDate.getDate()}</span>}
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                          {["month", "week", "day"].map((scale) => (
                            <button key={scale} onClick={() => setCalendarScale(scale)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all capitalize ${calendarScale === scale ? "bg-brand-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>{scale}</button>
                          ))}
                        </div>
                        <div className="h-8 w-[1px] bg-gray-200 hidden lg:block"></div>
                        <div className="flex items-center gap-4 text-sm font-black text-gray-400 uppercase tracking-widest"><span>{filteredData.length} Total Events</span></div>
                      </div>
                    </div>

                    {calendarScale !== 'day' && (
                      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/10">
                        {calendarScale === 'month' ? weekDays.map(day => <div key={day} className="py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">{day}</div>) : calendarDays.map((date, idx) => <div key={idx} className="py-4 text-center flex flex-col items-center"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{date.dayName}</span><span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${new Date().toISOString().split('T')[0] === date.dateString ? "bg-brand-primary text-white shadow-lg" : "text-gray-700"}`}>{date.day}</span></div>)}
                      </div>
                    )}

                    <div className={`grid ${calendarScale === 'day' ? 'grid-cols-1' : 'grid-cols-7'}`}>
                      {calendarDays.map((date, idx) => {
                        const dayEvents = filteredData.filter(event => event.date === date.dateString);
                        const isToday = new Date().toISOString().split('T')[0] === date.dateString;
                        if (calendarScale === 'day') {
                          return (
                            <div key={idx} className="p-12 min-h-[500px] bg-white">
                               <div className="flex items-center gap-6 mb-12">
                                  <div className="w-24 h-24 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 flex flex-col items-center justify-center"><span className="text-4xl font-black text-brand-primary">{date.day}</span><span className="text-xs font-black text-gray-400 uppercase tracking-widest">{date.dayName}</span></div>
                                  <div><h3 className="text-4xl font-black text-brand-dark mb-2">Daily Schedule</h3><p className="text-gray-500 font-medium">Detailed events and activities for this specific date.</p></div>
                               </div>
                               <div className="space-y-6">{dayEvents.length > 0 ? dayEvents.map(event => <motion.button key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => setSelectedEvent(event)} className={`w-full text-left p-8 rounded-[2rem] border transition-all hover:shadow-xl group relative overflow-hidden ${event.type === 'holiday' ? "bg-orange-50/50 border-orange-100 hover:border-orange-300" : event.type === 'exam' ? "bg-red-50/50 border-red-100 hover:border-red-300" : "bg-brand-primary/5 border-brand-primary/10 hover:border-brand-primary/30"}`}><div className={`absolute left-0 top-0 w-2 h-full ${event.type === 'holiday' ? "bg-orange-400" : event.type === 'exam' ? "bg-red-500" : "bg-brand-primary"}`}></div><div className="flex items-center justify-between"><div><span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">{event.category}</span><h4 className="text-2xl font-black text-brand-dark group-hover:text-brand-primary transition-colors">{event.title}</h4></div><HiChevronRight className="w-8 h-8 text-gray-300 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" /></div></motion.button>) : <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]"><HiCalendarDays className="w-16 h-16 text-gray-200 mx-auto mb-4" /><p className="text-gray-400 font-bold">No events scheduled for this day.</p></div>}</div>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className={`min-h-[160px] p-4 border-r border-b border-gray-50 transition-all hover:bg-gray-50/30 group relative ${!date.isCurrentMonth && calendarScale === 'month' ? "bg-gray-50/20 text-gray-300" : "text-gray-700"} ${idx % 7 === 6 ? "border-r-0" : ""} ${calendarScale === 'week' ? "border-b-0" : ""}`}>
                            {calendarScale === 'month' && <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black mb-3 ${isToday ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : ""}`}>{date.day}</span>}
                            <div className="space-y-2 overflow-hidden">{dayEvents.map(event => <button key={event.id} onClick={() => setSelectedEvent(event)} className={`w-full text-left p-2.5 rounded-xl text-[10px] font-black transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 truncate shadow-sm border ${event.type === 'holiday' ? "bg-orange-50 text-orange-600 border-orange-100" : event.type === 'exam' ? "bg-red-50 text-red-600 border-red-100" : "bg-brand-primary/5 text-brand-primary border-brand-primary/10"}`}><div className={`w-2 h-2 rounded-full flex-shrink-0 ${event.type === 'holiday' ? "bg-orange-400" : event.type === 'exam' ? "bg-red-500" : "bg-brand-primary"}`}></div>{event.title}</button>)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="list-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                    {Object.keys(groupedData).length > 0 ? (
                      <>
                        {Object.entries(groupedData).map(([month, events]) => (
                          <section key={month} className="relative">
                        <div className="flex items-center gap-4 mb-8">
                          <h2 className="text-2xl font-black text-brand-dark flex-shrink-0">{month}</h2>
                          <div className="h-[2px] w-full bg-gradient-to-r from-brand-secondary/30 to-transparent"></div>
                        </div>
                        <div className="grid gap-6">
                          {events.map((event, idx) => (
                            <motion.div key={event.id} variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: idx * 0.05 }} onClick={() => setSelectedEvent(event)} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative cursor-pointer">
                              <div className={`absolute top-0 left-0 w-2 h-full ${event.type === 'holiday' ? 'bg-orange-400' : event.type === 'exam' ? 'bg-red-500' : 'bg-brand-primary'}`}></div>
                              <div className="flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-shrink-0 text-center md:w-24"><div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center border-2 ${event.type === 'holiday' ? 'border-orange-100 bg-orange-50' : event.type === 'exam' ? 'border-red-100 bg-red-50' : 'border-brand-primary/10 bg-brand-primary/5'}`}><span className={`text-3xl font-black ${event.type === 'holiday' ? 'text-orange-600' : event.type === 'exam' ? 'text-red-600' : 'text-brand-primary'}`}>{new Date(event.date).getDate()}</span><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span></div></div>
                                <div className="flex-grow"><div className="flex flex-wrap items-center gap-3 mb-3"><span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${event.type === 'holiday' ? 'bg-orange-100 text-orange-600' : event.type === 'exam' ? 'bg-red-100 text-red-600' : 'bg-brand-primary/10 text-brand-primary'}`}>{event.category}</span></div><h3 className="text-2xl font-black text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">{event.title}</h3><p className="text-gray-500 font-medium leading-relaxed">{event.description}</p></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                          </section>
                        ))}
                        {totalPages > 1 && (
                          <div className="flex justify-center items-center mt-12 gap-2">
                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"><HiChevronLeft className="w-5 h-5" /></button>
                            <div className="flex flex-wrap justify-center gap-2">
                              {Array.from({ length: totalPages }).map((_, idx) => (
                                <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === idx + 1 ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"}`}>{idx + 1}</button>
                              ))}
                            </div>
                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"><HiChevronRight className="w-5 h-5" /></button>
                          </div>
                        )}
                      </>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><HiInformationCircle className="w-10 h-10 text-gray-300" /></div>
                        <h3 className="text-2xl font-black text-brand-dark mb-2">No events found</h3>
                        <p className="text-gray-500 font-medium">Try adjusting your filters or search query.</p>
                        <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} className="mt-6 text-brand-primary font-bold hover:underline">Clear all filters</button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className={`h-3 ${selectedEvent.type === 'holiday' ? 'bg-orange-400' : selectedEvent.type === 'exam' ? 'bg-red-500' : 'bg-brand-primary'}`}></div>
              <div className="p-8 lg:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div><span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${selectedEvent.type === 'holiday' ? 'bg-orange-50 text-orange-600' : selectedEvent.type === 'exam' ? 'bg-red-50 text-red-600' : 'bg-brand-primary/10 text-brand-primary'}`}>{selectedEvent.category}</span><h3 className="text-3xl lg:text-4xl font-black text-brand-dark leading-tight">{selectedEvent.title}</h3></div>
                  <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400 hover:text-brand-primary"><HiXMark className="w-8 h-8" /></button>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group"><div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"><HiCalendar className="w-7 h-7" /></div><div><span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Schedule</span><span className="text-lg font-black text-gray-800">{new Date(selectedEvent.date).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}{selectedEvent.endDate && ` - ${new Date(selectedEvent.endDate).toLocaleDateString('default', { month: 'long', day: 'numeric' })}`}</span></div></div>
                  <div className="flex items-center gap-6 group"><div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"><HiTag className="w-7 h-7" /></div><div><span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Activity Type</span><span className="text-lg font-black text-gray-800 capitalize">{selectedEvent.type}</span></div></div>
                  <div className="pt-8 border-t border-gray-100"><span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Event Details</span><p className="text-gray-600 leading-relaxed font-bold text-lg">{selectedEvent.description}</p></div>
                </div>
                <div className="mt-12 flex gap-4"><button className="flex-grow bg-brand-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-secondary transition-all active:scale-95 shadow-xl shadow-brand-primary/20">Remind Me</button><button className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95">Share</button></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcademicCalendar;
