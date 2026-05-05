import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendarDays,
  HiUser,
  HiClock,
  HiChevronRight,
  HiMagnifyingGlass,
  HiXMark,
  HiShare,
  HiBookmark,
  HiArrowLeft,
  HiArrowRight,
  HiMapPin,
  HiArrowDownTray,
  HiChatBubbleLeftEllipsis,
  HiTag,
  HiHashtag,
  HiChevronLeft,
  HiPaperAirplane,
  HiLink,
  HiPhoto,
  HiArrowsPointingOut
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.981 0 1.771-.773 1.771-1.729V1.729C24 .774 23.207 0 22.225 0z" />
  </svg>
);

const ArticleDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allInsights, setAllInsights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load all data for search functionality
    const dataFiles = ['events.json', 'blogs.json', 'articles.json'];
    Promise.all(
      dataFiles.map(file => fetch(`${import.meta.env.BASE_URL}json_data/${file}`).then(res => res.json()))
    ).then(results => {
      const flattened = [
        ...results[0].map(i => ({ ...i, type: 'events' })),
        ...results[1].map(i => ({ ...i, type: 'blog' })),
        ...results[2].map(i => ({ ...i, type: 'articles' }))
      ];
      setAllInsights(flattened);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = allInsights.filter(i =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery, allInsights]);

  useEffect(() => {
    setLoading(true);
    const dataFile = type === 'events' ? 'events.json' : type === 'blog' ? 'blogs.json' : 'articles.json';

    fetch(`${import.meta.env.BASE_URL}json_data/${dataFile}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(i => i.id === parseInt(id));
        if (found) {
          setItem(found);
          // Set related items (same category, excluding current)
          const related = data
            .filter(i => i.category === found.category && i.id !== found.id)
            .slice(0, 3);
          setRelatedItems(related);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading item:", err);
        setLoading(false);
      });
  }, [type, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light">
        <h2 className="text-3xl font-black text-brand-dark mb-4">Article Not Found</h2>
        <button
          onClick={() => navigate('/insights')}
          className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:bg-brand-dark transition-colors"
        >
          Back to Insights
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-[60px] lg:pt-[120px]">

      {/* Article Hero Section */}
      <section className="relative pt-12 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumbs & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <Breadcrumbs
                variant="light"
                customLinks={[
                  { to: '/insights', label: 'Insights' },
                  { label: type === 'blog' ? 'Blog' : type === 'events' ? 'Events' : 'Articles' }
                ]}
              />
              <div className="relative w-full md:w-80 group">
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-white px-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all text-[10px] font-black uppercase tracking-widest placeholder:text-gray-300"
                />
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary">
                    <HiXMark className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchFocused && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Results for "{searchQuery}"</p>
                      </div>
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {searchResults.length > 0 ? (
                          <div className="p-2 space-y-1">
                            {searchResults.map((result) => (
                              <Link
                                key={`${result.type}-${result.id}`}
                                to={`/insights/${result.type}/${result.id}`}
                                onClick={() => {
                                  setSearchQuery('');
                                  setIsSearchFocused(false);
                                }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-primary/5 transition-all group/res"
                              >
                                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                  <img
                                    src={`${import.meta.env.BASE_URL}images/${result.image}`}
                                    alt={result.title}
                                    className="w-full h-full object-cover group-hover/res:scale-110 transition-transform"
                                  />
                                </div>
                                <div className="flex-grow overflow-hidden text-left">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{result.type}</span>
                                    <span className="text-[10px] font-medium text-gray-400">{result.date}</span>
                                  </div>
                                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover/res:text-brand-primary transition-colors">{result.title}</h4>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-gray-500 text-sm italic">
                            No results found
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Title & Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                {item.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-[1.1] tracking-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 md:gap-10 py-8 border-y border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <HiUser className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Author</p>
                    <p className="text-sm font-bold text-brand-dark">{item.author || 'MOC Faculty'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                    <HiCalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Published</p>
                    <p className="text-sm font-bold text-brand-dark">{item.date}</p>
                  </div>
                </div>

                {item.readTime && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <HiClock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Read Time</p>
                      <p className="text-sm font-bold text-brand-dark">{item.readTime}</p>
                    </div>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <HiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Location</p>
                      <p className="text-sm font-bold text-brand-dark">{item.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[3rem] overflow-hidden aspect-[16/9] shadow-2xl mb-16 group"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
            </motion.div>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Main Content Area */}
              <div className="lg:w-2/3">
                <article className="prose prose-xl prose-brand max-w-none">
                  {/* Rich Content Simulation */}
                  <div
                    className="text-gray-700 leading-[1.8] font-medium space-y-8 text-lg md:text-xl"
                    dangerouslySetInnerHTML={{ __html: item.fullContent || item.content || item.description }}
                  />

                  {/* Sample Rich Elements if not present in data */}
                  {!item.fullContent?.includes('<ul>') && (
                    <div className="mt-12 space-y-8">
                      <blockquote className="border-l-4 border-brand-primary pl-8 py-4 bg-brand-primary/5 rounded-r-2xl italic text-2xl font-serif text-brand-dark">
                        "Education is not the learning of facts, but the training of the mind to think, rooted in the values of our heritage."
                      </blockquote>

                      <h3 className="text-2xl font-black text-brand-dark uppercase tracking-wider">Key Takeaways</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                        {['Preservation of Ancient Wisdom', 'Holistic Academic Growth', 'Character Building', 'Community Leadership'].map((point, idx) => (
                          <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-brand-primary" />
                            <span className="font-bold text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Attachments Section */}
                  <div className="mt-16 p-8 bg-brand-dark rounded-[2rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                          <HiArrowDownTray className="w-8 h-8 text-brand-secondary" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1">Download Resources</h4>
                          <p className="text-white/60 text-sm">PDF, 2.4 MB • Official Notice/Report</p>
                        </div>
                      </div>
                      <button className="bg-brand-secondary text-brand-primary px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
                        Download PDF
                      </button>
                    </div>
                  </div>
                  {/* Image Gallery Section */}
                  {item.gallery && item.gallery.length > 0 && (
                    <div className="mt-16">
                      <h3 className="text-2xl font-black text-brand-dark mb-8 flex items-center gap-3">
                        <HiPhoto className="w-6 h-6 text-brand-primary" />
                        Event Gallery
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {item.gallery.map((img, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedImage(img)}
                            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                          >
                            <img
                              src={`${import.meta.env.BASE_URL}images/${img}`}
                              alt={`Gallery ${idx}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <HiArrowsPointingOut className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>

                {/* Social Sharing */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Share this article</p>
                    <div className="flex gap-2">
                      {[FacebookIcon, TwitterIcon, LinkedinIcon, HiShare].map((Icon, idx) => (
                        <button key={idx} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:text-brand-dark transition-colors">
                    <HiBookmark className="w-4 h-4" /> Save for later
                  </button>
                </div>

                {/* Optional Comment Section */}
                <div className="mt-20">
                  <h3 className="text-2xl font-black text-brand-dark mb-8 flex items-center gap-3">
                    <HiChatBubbleLeftEllipsis className="w-6 h-6 text-brand-primary" />
                    Discussion
                  </h3>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <textarea
                      placeholder="Share your thoughts or ask a question..."
                      className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 focus:outline-none focus:border-brand-primary transition-all mb-6 min-h-[120px] text-gray-700"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-400 font-medium">Please follow our community guidelines.</p>
                      <button className="bg-brand-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all shadow-lg">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3 space-y-12">
                {/* Related Posts */}
                <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                  <h3 className="text-xl font-black text-brand-dark mb-8 flex items-center gap-2">
                    <HiHashtag className="w-5 h-5 text-brand-primary" />
                    Related {type === 'blog' ? 'Posts' : type === 'events' ? 'Events' : 'Articles'}
                  </h3>
                  <div className="space-y-6">
                    {relatedItems.length > 0 ? relatedItems.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/insights/${type}/${rel.id}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-24 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={`${import.meta.env.BASE_URL}images/${rel.image}`}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">{rel.category}</p>
                          <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h4>
                        </div>
                      </Link>
                    )) : (
                      <p className="text-gray-400 text-sm italic">No other items in this category.</p>
                    )}
                  </div>
                  <Link
                    to="/insights"
                    className="mt-8 flex items-center justify-center gap-2 py-4 border-t border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary hover:text-brand-dark transition-colors"
                  >
                    View All <HiArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Categories & Tags */}
                <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
                  <h3 className="text-xl font-black text-brand-dark mb-6 flex items-center gap-2">
                    <HiTag className="w-5 h-5 text-brand-primary" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Sanskrit', 'Heritage', 'Academic', 'Campus Life', 'Gurukula', 'Spirituality', 'Research', 'Digital Humanities'].map((tag) => (
                      <button key={tag} className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-500 hover:bg-brand-primary hover:text-white transition-all border border-gray-100">
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter / Contact Promo */}
                <div className="bg-brand-primary rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <h3 className="text-xl font-black mb-4 relative z-10">Get the Latest Insights</h3>
                  <p className="text-white/80 text-sm mb-6 relative z-10 leading-relaxed">
                    Subscribe to our newsletter to receive weekly updates on campus news and academic research.
                  </p>
                  <div className="relative z-10 space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
                    />
                    <button className="w-full bg-brand-secondary text-brand-primary py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <button className="w-14 h-14 rounded-full bg-brand-primary text-white shadow-2xl flex items-center justify-center">
          <HiShare className="w-6 h-6" />
        </button>
      </div>

      {/* Prev/Next Navigation (Mockup) */}
      <div className="container mx-auto px-6 mt-12 mb-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between border-t border-gray-100 pt-12">
          <button className="flex flex-col items-start gap-2 group max-w-[45%]">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-primary transition-colors">
              <HiChevronLeft className="w-4 h-4" /> Previous Article
            </span>
            <span className="text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1">The Significance of Vedic Chanting</span>
          </button>
          <div className="w-px h-12 bg-gray-100 hidden md:block" />
          <button className="flex flex-col items-end gap-2 group max-w-[45%]">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-primary transition-colors">
              Next Article <HiChevronRight className="w-4 h-4" />
            </span>
            <span className="text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1 text-right">Sustainable Practices on a Gurukula Campus</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <HiXMark className="w-10 h-10" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={`${import.meta.env.BASE_URL}images/${selectedImage}`}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleDetail;
