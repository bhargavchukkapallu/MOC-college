import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, User, ChevronRight, ChevronLeft, X, Search } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsData, setEventsData] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/events.json`)
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(e => ({ 
          ...e, 
          gallery: e.gallery || ["sanskrit_event.png", "library_study.png", "amma_portrait.png", "sanskrit_event.png", "library_study.png", "amma_portrait.png"] 
        }));
        setEventsData(formattedData);
      })
      .catch(err => console.error("Error loading events:", err));

    fetch(`${import.meta.env.BASE_URL}json_data/blogs.json`)
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(b => ({ 
          ...b, 
          gallery: b.gallery || ["sanskrit_event.png", "library_study.png", "amma_portrait.png", "sanskrit_event.png", "library_study.png", "amma_portrait.png"] 
        }));
        setBlogData(formattedData);
      })
      .catch(err => console.error("Error loading blogs:", err));
  }, []);

  const ITEMS_PER_PAGE = 6;

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const filteredEvents = eventsData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = blogData.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  return (
    <div className="bg-brand-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Happenings & Stories
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Events & <span className="text-brand-secondary">Blog</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Stay updated with the latest events, academic insights, and spiritual discourses from Matrusri Oriental College.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-20">

        {/* Controls Section: Toggle & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-6">
          {/* Toggle Switch */}
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 flex relative">
            {/* Active background slider */}
            <motion.div
              className="absolute inset-y-2 rounded-full bg-brand-primary"
              layoutId="activeTabBackground"
              initial={false}
              animate={{
                left: activeTab === 'events' ? '0.5rem' : '50%',
                right: activeTab === 'events' ? '50%' : '0.5rem',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab('events')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-colors duration-300 w-36 sm:w-48 ${activeTab === 'events' ? 'text-white' : 'text-gray-600 hover:text-brand-primary'
                }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-colors duration-300 w-36 sm:w-48 ${activeTab === 'blog' ? 'text-white' : 'text-gray-600 hover:text-brand-primary'
                }`}
            >
              Our Blog
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder={activeTab === 'events' ? "Search events..." : "Search blog posts..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white px-6 py-4 rounded-full shadow-lg border border-gray-100 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all pl-14 text-gray-700"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary transition-colors bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Events View */}
            {activeTab === 'events' && (
              <motion.div
                key="events-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {filteredEvents.length > 0 ? filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedItem({ type: 'event', data: event })}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-brand-primary/20 z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={`${import.meta.env.BASE_URL}images/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur text-brand-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex justify-between items-center gap-3 mb-6 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand-primary" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {event.description}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between w-full font-bold text-brand-primary group/btn hover:text-brand-dark transition-colors">
                          <span className="relative overflow-hidden w-full text-left">
                            <span className="block group-hover/btn:-translate-y-full transition-transform duration-300">View Details</span>
                            <span className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">View Details</span>
                          </span>
                          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
                      <Search className="w-8 h-8 text-brand-primary/40" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">No events found</h3>
                    <p className="text-gray-500">We couldn't find any events matching "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Blog View */}
            {activeTab === 'blog' && (
              <motion.div
                key="blog-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.length > 0 ? filteredBlogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedItem({ type: 'blog', data: post })}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur text-brand-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <span className="font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{post.author}</span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
                      <Search className="w-8 h-8 text-brand-primary/40" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">No blog posts found</h3>
                    <p className="text-gray-500">We couldn't find any posts matching "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          {Math.ceil((activeTab === 'events' ? filteredEvents.length : filteredBlogs.length) / ITEMS_PER_PAGE) > 1 && (
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-brand-dark hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: Math.ceil((activeTab === 'events' ? filteredEvents.length : filteredBlogs.length) / ITEMS_PER_PAGE) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-full font-bold transition-all ${currentPage === i + 1 ? 'bg-brand-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:text-brand-primary shadow-sm'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil((activeTab === 'events' ? filteredEvents.length : filteredBlogs.length) / ITEMS_PER_PAGE)))}
                disabled={currentPage === Math.ceil((activeTab === 'events' ? filteredEvents.length : filteredBlogs.length) / ITEMS_PER_PAGE)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-brand-dark hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-full pointer-events-auto relative"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white transition-colors z-20 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="overflow-y-auto flex-grow no-scrollbar pb-8">
                  <div className="relative h-64 lg:h-96">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${selectedItem.data.image}`}
                      alt={selectedItem.data.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white right-6 lg:right-10">
                      <span className="bg-brand-secondary text-brand-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                        {selectedItem.data.category}
                      </span>
                      <h2 className="text-3xl lg:text-5xl font-black mb-2">{selectedItem.data.title}</h2>
                    </div>
                  </div>

                  <div className="px-6 py-8 lg:px-12 lg:py-12">
                    {selectedItem.type === 'event' ? (
                      <div className="flex flex-wrap gap-4 mb-8 bg-brand-light p-6 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 w-full sm:w-auto bg-white px-4 py-2 rounded-xl shadow-sm">
                          <div className="bg-brand-primary/10 p-2 rounded-lg">
                            <Calendar className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Date</p>
                            <p className="text-brand-dark font-medium">{selectedItem.data.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto bg-white px-4 py-2 rounded-xl shadow-sm">
                          <div className="bg-brand-primary/10 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Time</p>
                            <p className="text-brand-dark font-medium">{selectedItem.data.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto bg-white px-4 py-2 rounded-xl shadow-sm">
                          <div className="bg-brand-primary/10 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Location</p>
                            <p className="text-brand-dark font-medium">{selectedItem.data.location}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Author</p>
                            <p className="text-brand-dark font-bold">{selectedItem.data.author}</p>
                          </div>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Published</p>
                          <p className="text-gray-700 font-medium">{selectedItem.data.date}</p>
                        </div>
                      </div>
                    )}

                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="leading-relaxed text-lg">
                        {selectedItem.data.fullContent}
                      </p>
                    </div>

                    {/* Image Gallery */}
                    {selectedItem.data.gallery && selectedItem.data.gallery.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-2xl font-black text-brand-dark mb-6">Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedItem.data.gallery.slice(0, 6).map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                              <img
                                src={`${import.meta.env.BASE_URL}images/${img}`}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
