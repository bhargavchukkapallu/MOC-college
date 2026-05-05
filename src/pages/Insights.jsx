import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  HiMagnifyingGlass, 
  HiXMark, 
  HiHashtag, 
  HiChartBar, 
  HiCalendarDays, 
  HiUser, 
  HiArrowRight, 
  HiNewspaper 
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import EventsTab from '../components/insights/EventsTab';
import BlogTab from '../components/insights/BlogTab';
import ArticlesTab from '../components/insights/ArticlesTab';
import BannerBackground from '../components/ui/BannerBackground';

const Insights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'events';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [direction, setDirection] = useState(0);
  const tabOrder = ['events', 'blog', 'articles'];

  const handleTabChange = (newTab) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
    setCurrentPage(1);
    // Update URL without reload
    const newPath = `${location.pathname}?tab=${newTab}`;
    window.history.pushState({ path: newPath }, '', newPath);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsHeaderScrolled(latest > 100);
  });

  const [eventsData, setEventsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    setActiveTab(initialTab);
    window.scrollTo(0, 0);
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

  const filteredEvents = eventsData.filter(event =>
    (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = blogData.filter(blog =>
    (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articlesData.filter(article =>
    (article.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPaginatedData = () => {
    let data = [];
    if (activeTab === 'events') data = filteredEvents;
    if (activeTab === 'blog') data = filteredBlogs;
    if (activeTab === 'articles') data = filteredArticles;

    // Remove featured item from main grid if on first page and no search
    const isFirstPageNoSearch = currentPage === 1 && !searchQuery;
    const itemsToDisplay = isFirstPageNoSearch ? data.slice(1) : data;

    return itemsToDisplay.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  };

  const getFeaturedItem = () => {
    if (currentPage !== 1 || searchQuery) return null;
    if (activeTab === 'events') return filteredEvents[0];
    if (activeTab === 'blog') return filteredBlogs[0];
    if (activeTab === 'articles') return filteredArticles[0];
    return null;
  };

  const getTotalPages = () => {
    let data = [];
    if (activeTab === 'events') data = filteredEvents;
    if (activeTab === 'blog') data = filteredBlogs;
    if (activeTab === 'articles') data = filteredArticles;

    const count = (currentPage === 1 && !searchQuery) ? Math.max(0, data.length - 1) : data.length;
    return Math.ceil(count / ITEMS_PER_PAGE);
  };

  const trendingPosts = [
    ...blogData.map(b => ({ ...b, type: 'blog' })),
    ...articlesData.map(a => ({ ...a, type: 'articles' }))
  ]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="bg-brand-light min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-10 lg:pt-48 lg:pb-12 overflow-hidden bg-brand-primary">
        <BannerBackground />
        <div className="container mx-auto px-6 relative z-10 text-left pointer-events-none">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-lg backdrop-blur-md border border-white/10">
                <HiNewspaper className="w-4 h-4" />
                Knowledge Hub
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                The <span className="text-brand-secondary underline decoration-brand-secondary/30 decoration-8 underline-offset-8">MOC</span> Insights
              </h1>
              <p className="text-white/70 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mb-8">
                A collection of scholarly articles, academic blogs, and cultural events shaping the future of oriental studies.
              </p>
              <div className="pointer-events-auto">
                <Breadcrumbs align="start" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Main Feed */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured Post */}
                {getFeaturedItem() && (
                  <motion.div
                    key={`featured-${activeTab}-${getFeaturedItem().id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => navigate(`/insights/${activeTab}/${getFeaturedItem().id}`)}
                    className="relative group cursor-pointer overflow-hidden rounded-[3rem] mb-16 shadow-2xl bg-white border border-gray-100"
                  >
                    <div className="aspect-[21/10] w-full overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${getFeaturedItem().image}`}
                        alt={getFeaturedItem().title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest uppercase bg-brand-secondary text-brand-primary rounded-lg shadow-lg">
                        Featured {activeTab.slice(0, -1)}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight group-hover:text-brand-secondary transition-colors duration-300">
                        {getFeaturedItem().title}
                      </h2>
                      <p className="text-white/80 text-lg max-w-3xl line-clamp-2 mb-8 font-medium italic">
                        "{getFeaturedItem().excerpt || getFeaturedItem().description}"
                      </p>
                      <div className="flex items-center gap-6 text-sm font-bold text-white/90">
                        <div className="flex items-center gap-2">
                          <HiCalendarDays className="w-4 h-4 text-brand-secondary" />
                          {getFeaturedItem().date}
                        </div>
                        <div className="flex items-center gap-2">
                          <HiUser className="w-4 h-4 text-brand-secondary" />
                          {getFeaturedItem().author || 'MOC Team'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Feed Content */}
                <div key="feed-content">
                  {activeTab === 'events' && (
                    <EventsTab
                      key="events-tab"
                      events={getPaginatedData()}
                      searchQuery={searchQuery}
                      direction={direction}
                      isSidebarLayout={true}
                    />
                  )}
                  {activeTab === 'blog' && (
                    <BlogTab
                      key="blog-tab"
                      blogs={getPaginatedData()}
                      searchQuery={searchQuery}
                      direction={direction}
                      isSidebarLayout={true}
                    />
                  )}
                  {activeTab === 'articles' && (
                    <ArticlesTab
                      key="articles-tab"
                      articles={getPaginatedData()}
                      searchQuery={searchQuery}
                      direction={direction}
                      isSidebarLayout={true}
                    />
                  )}

                  {/* Pagination */}
                  {getTotalPages() > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-3">
                      {Array.from({ length: getTotalPages() }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 600, behavior: 'smooth' });
                          }}
                          className={`w-12 h-12 rounded-2xl font-black transition-all duration-300 ${currentPage === i + 1 ? 'bg-brand-primary text-white shadow-xl scale-110' : 'bg-white text-gray-500 hover:text-brand-primary shadow-md hover:shadow-lg'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">

              {/* Search Widget */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-primary/5 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <h3 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3 relative z-10">
                  <HiMagnifyingGlass className="w-5 h-5 text-brand-primary" />
                  Search
                </h3>
                <div className="relative group z-10">
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-light px-6 py-4 rounded-2xl border border-transparent focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all text-gray-700 font-bold placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary transition-colors bg-white p-1 rounded-lg shadow-sm"
                    >
                      <HiXMark className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-primary/5 border border-gray-100">
                <h3 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-3">
                  <HiHashtag className="w-5 h-5 text-brand-primary" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {tabOrder.map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl font-black transition-all duration-300 group ${activeTab === tab ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-[1.02]' : 'hover:bg-brand-light text-gray-600'}`}
                    >
                      <span className="capitalize tracking-tight">{tab}</span>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-xl text-xs transition-colors ${activeTab === tab ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'}`}>
                        {tab === 'events' ? eventsData.length : tab === 'blog' ? blogData.length : articlesData.length}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Widget */}
              <div className="bg-brand-dark p-8 rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,191,0,0.15),transparent_70%)]"></div>
                <h3 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
                  <HiChartBar className="w-5 h-5 text-brand-secondary" />
                  Must Reads
                </h3>
                <div className="space-y-8 relative z-10">
                  {trendingPosts.map((post, i) => (
                    <motion.div
                      key={`${post.type}-${post.id}`}
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(`/insights/${post.type}/${post.id}`)}
                      className="cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary/80 bg-brand-secondary/10 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-white/40 font-bold">{post.date}</span>
                      </div>
                      <h4 className="font-bold text-sm leading-snug group-hover/item:text-brand-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </motion.div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300">
                  View All Trending
                </button>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-brand-secondary p-8 rounded-[2.5rem] shadow-xl text-brand-primary">
                <h3 className="text-xl font-black mb-4">Stay Inspired</h3>
                <p className="text-sm font-bold text-brand-primary/70 mb-6 leading-relaxed">
                  Join our newsletter for weekly doses of wisdom and academic updates.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/50 px-6 py-4 rounded-2xl border border-transparent focus:bg-white focus:outline-none transition-all font-bold placeholder:text-brand-primary/40"
                  />
                  <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.02] transition-transform active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
      `}} />
    </div>
  );
};

export default Insights;
