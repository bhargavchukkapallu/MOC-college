import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import EventsTab from '../components/insights/EventsTab';
import BlogTab from '../components/insights/BlogTab';
import ArticlesTab from '../components/insights/ArticlesTab';

const Insights = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'events';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsData, setEventsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/events.json`)
      .then(res => res.json())
      .then(data => setEventsData(data))
      .catch(err => console.error("Error loading events:", err));

    fetch(`${import.meta.env.BASE_URL}json_data/blogs.json`)
      .then(res => res.json())
      .then(data => setBlogData(data))
      .catch(err => console.error("Error loading blogs:", err));

    fetch(`${import.meta.env.BASE_URL}json_data/articles.json`)
      .then(res => res.json())
      .then(data => setArticlesData(data))
      .catch(err => console.error("Error loading articles:", err));
  }, []);

  const ITEMS_PER_PAGE = 6;

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

  const filteredArticles = articlesData.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPaginatedData = () => {
    let data = [];
    if (activeTab === 'events') data = filteredEvents;
    if (activeTab === 'blog') data = filteredBlogs;
    if (activeTab === 'articles') data = filteredArticles;
    return data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  };

  const getTotalPages = () => {
    let data = [];
    if (activeTab === 'events') data = filteredEvents;
    if (activeTab === 'blog') data = filteredBlogs;
    if (activeTab === 'articles') data = filteredArticles;
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  };

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
              Knowledge & Happenings
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-brand-secondary">Insights</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Explore our latest events, insightful blog posts, and scholarly articles that define the academic and spiritual life at MOC.
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
            <motion.div
              className="absolute inset-y-2 rounded-full bg-brand-primary"
              layoutId="activeTabBackground"
              initial={false}
              animate={{
                left: activeTab === 'events' ? '0.5rem' : activeTab === 'blog' ? '33.33%' : '66.66%',
                right: activeTab === 'events' ? '66.66%' : activeTab === 'blog' ? '33.33%' : '0.5rem',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab('events')}
              className={`relative z-10 px-4 py-3 rounded-full font-bold text-sm sm:text-base transition-colors duration-300 w-28 sm:w-40 ${activeTab === 'events' ? 'text-white' : 'text-gray-600 hover:text-brand-primary'}`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`relative z-10 px-4 py-3 rounded-full font-bold text-sm sm:text-base transition-colors duration-300 w-28 sm:w-40 ${activeTab === 'blog' ? 'text-white' : 'text-gray-600 hover:text-brand-primary'}`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`relative z-10 px-4 py-3 rounded-full font-bold text-sm sm:text-base transition-colors duration-300 w-28 sm:w-40 ${activeTab === 'articles' ? 'text-white' : 'text-gray-600 hover:text-brand-primary'}`}
            >
              Articles
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
            {activeTab === 'events' && (
              <EventsTab 
                key="events-tab"
                events={getPaginatedData()} 
                searchQuery={searchQuery} 
              />
            )}
            {activeTab === 'blog' && (
              <BlogTab 
                key="blog-tab"
                blogs={getPaginatedData()} 
                searchQuery={searchQuery} 
              />
            )}
            {activeTab === 'articles' && (
              <ArticlesTab 
                key="articles-tab"
                articles={getPaginatedData()} 
                searchQuery={searchQuery} 
              />
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          {getTotalPages() > 1 && (
            <div className="flex justify-center items-center mt-16 gap-4">
              {Array.from({ length: getTotalPages() }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-bold transition-all ${currentPage === i + 1 ? 'bg-brand-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:text-brand-primary shadow-sm'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #800000;
          border-radius: 10px;
        }
        .prose-brand p {
          margin-bottom: 1.5rem;
        }
      `}} />
    </div>
  );
};

export default Insights;
