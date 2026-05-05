import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiBookOpen,
  HiShieldCheck,
  HiLightBulb,
  HiUsers,
  HiAcademicCap,
  HiClock,
  HiClipboardDocumentList,
  HiSparkles,
  HiChevronRight,
  HiArrowRight,
  HiHashtag
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SubNav from '../components/ui/SubNav';
import BannerBackground from '../components/ui/BannerBackground';

import { Link } from 'react-router-dom';

const Library = () => {
  const [libraryInsights, setLibraryInsights] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchInsights = async () => {
      try {
        const [eventsRes, blogsRes, articlesRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}json_data/events.json`),
          fetch(`${import.meta.env.BASE_URL}json_data/blogs.json`),
          fetch(`${import.meta.env.BASE_URL}json_data/articles.json`)
        ]);

        const events = await eventsRes.json();
        const blogs = await blogsRes.json();
        const articles = await articlesRes.json();

        const combined = [
          ...events.map(item => ({ ...item, type: 'events' })),
          ...blogs.map(item => ({ ...item, type: 'blog' })),
          ...articles.map(item => ({ ...item, type: 'articles' }))
        ];

        const filtered = combined.filter(item => {
          const content = `${item.title} ${item.excerpt || ''} ${item.description || ''} ${item.category || ''} ${item.fullContent || ''} ${item.content || ''}`.toLowerCase();
          return content.includes('library') || content.includes('libraries');
        });

        // Sort by date (simple approach since date formats vary)
        const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setLibraryInsights(sorted);
      } catch (err) {
        console.error("Error fetching library insights:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    { id: 'about', name: 'About', icon: <HiBookOpen className="w-4 h-4" /> },
    { id: 'rules', name: 'Rules', icon: <HiClipboardDocumentList className="w-4 h-4" /> },
    { id: 'policy', name: 'Policy', icon: <HiShieldCheck className="w-4 h-4" /> },
    { id: 'activities', name: 'Activities', icon: <HiLightBulb className="w-4 h-4" /> },
    { id: 'committee', name: 'Committee', icon: <HiUsers className="w-4 h-4" /> },
    { id: 'facilities', name: 'Facilities', icon: <HiAcademicCap className="w-4 h-4" /> },
    { id: 'literature', name: 'AMMA Literature', icon: <HiSparkles className="w-4 h-4" /> },
    { id: 'hours', name: 'Hours', icon: <HiClock className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-34 pb-0 lg:pt-38 lg:pb-0 overflow-hidden bg-brand-primary">
        <BannerBackground />
        <div className="container mx-auto px-6 relative z-10 text-left pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Knowledge Repository
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Central <span className="text-brand-secondary">Library</span>
            </h1>
            <p className="max-w-2xl text-white/80 text-base md:text-lg font-medium leading-relaxed mb-8">
              A sanctuary of ancient wisdom and modern knowledge, fostering research and intellectual growth within our academic community.
            </p>
            <div className="pointer-events-auto">
              <Breadcrumbs align="start" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <SubNav sections={sections} />

      <div className="container mx-auto px-6 py-20 lg:px-16">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* About the Library */}
          <section id="about" className="scroll-mt-40">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div {...fadeInUp} className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-brand-primary"></div>
                  <span className="text-brand-primary font-black uppercase tracking-widest text-sm">Our Legacy</span>
                </div>
                <h2 className="text-4xl font-black text-brand-dark mb-8 leading-tight">
                  A Hub of <span className="text-brand-primary">Oriental Learning</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    The Central Library of Matrusri Oriental College is one of the richest repositories of oriental literature in the region. Since its inception, it has served as a vital resource for scholars of Sanskrit, Telugu, and Ancient Indian History.
                  </p>
                  <p>
                    With over <span className="font-bold text-brand-dark">10,000+ volumes</span>, our collection spans from rare manuscripts to contemporary academic journals. We aim to provide an environment that encourages deep study and reflective learning.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <span className="block text-3xl font-black text-brand-primary">10k+</span>
                    <span className="text-sm font-bold text-gray-500 uppercase">Books & Journals</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <span className="block text-3xl font-black text-brand-primary">500+</span>
                    <span className="text-sm font-bold text-gray-500 uppercase">Rare Manuscripts</span>
                  </div>
                </div>
              </motion.div>
              <motion.div {...fadeInUp} className="lg:w-1/2 relative">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3] bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop" 
                    alt="Library Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-secondary/20 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </section>

          {/* Rules & Regulations */}
          <section id="rules" className="scroll-mt-40">
            <motion.div {...fadeInUp} className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-black text-brand-dark mb-6">Rules & Regulations</h2>
                <p className="text-gray-600 text-lg font-medium">To maintain a productive environment, all members are requested to follow these guidelines.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    "Maintain absolute silence in the library premises.",
                    "Students must carry their valid ID cards for entry and book issuance.",
                    "Books are issued for a maximum period of 15 days.",
                    "Personal belongings must be kept at the property counter."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-brand-light rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <p className="font-medium text-gray-700">{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    "Smoking, eating, and mobile phone usage are strictly prohibited.",
                    "Any damage or loss of books must be reported immediately.",
                    "Marking or underlining in library books is forbidden.",
                    "Overdue fines are applicable after the return deadline."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-brand-light rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-brand-secondary/20 flex items-center justify-center text-brand-dark font-bold shrink-0">
                        {idx + 5}
                      </div>
                      <p className="font-medium text-gray-700">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Library Policy */}
          <section id="policy" className="scroll-mt-40">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div {...fadeInUp} className="bg-brand-dark p-12 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <HiShieldCheck className="w-32 h-32 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-6">General Policy</h2>
                <p className="text-lg text-white/80 leading-relaxed font-medium mb-8">
                  Our library policy is designed to ensure equitable access to resources for all students and faculty while preserving our valuable collection for future generations.
                </p>
                <ul className="space-y-4">
                  {[
                    "Open access system for easy browsing.",
                    "Regular stock verification and maintenance.",
                    "Digital archiving of rare manuscripts.",
                    "Continuous enrichment of library resources."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                      <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-brand-secondary p-12 rounded-[2.5rem] text-brand-primary relative overflow-hidden">
                <h2 className="text-3xl font-black mb-6 text-brand-dark">Collection Development</h2>
                <p className="text-lg text-brand-dark/70 leading-relaxed font-medium mb-8">
                  We actively seek to expand our collection through acquisitions and generous donations from alumni and well-wishers.
                </p>
                <div className="grid gap-4">
                  <div className="p-6 bg-white/50 rounded-2xl border border-brand-primary/10">
                    <h3 className="font-bold text-brand-dark mb-2">Academic Books</h3>
                    <p className="text-sm text-brand-dark/60 italic">Prioritizing curriculum-based resources for all departments.</p>
                  </div>
                  <div className="p-6 bg-white/50 rounded-2xl border border-brand-primary/10">
                    <h3 className="font-bold text-brand-dark mb-2">Donation Policy</h3>
                    <p className="text-sm text-brand-dark/60 italic">We welcome relevant book donations that align with our academic mission.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Activities */}
          <section id="activities" className="scroll-mt-40">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Library Activities</h2>
              <p className="text-gray-600 text-lg font-medium">Fostering a culture of reading and lifelong learning through various events and initiatives.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { 
                  title: "Book Exhibitions", 
                  desc: "Annual displays of rare collections and newly acquired titles to inspire students.",
                  icon: <HiBookOpen />
                },
                { 
                  title: "Reading Sessions", 
                  desc: "Collaborative sessions where students and faculty discuss classical literature.",
                  icon: <HiLightBulb />
                },
                { 
                  title: "Literacy Workshops", 
                  desc: "Training programs on how to use digital libraries and research databases effectively.",
                  icon: <HiSparkles />
                }
              ].map((activity, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp} 
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <div className="text-3xl">{activity.icon}</div>
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark mb-4">{activity.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{activity.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Library Insights */}
            <div className="bg-brand-primary/5 rounded-[3rem] p-12 lg:p-16 border border-brand-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h3 className="text-3xl font-black text-brand-dark mb-2">Latest Library Insights</h3>
                  <p className="text-gray-500 font-medium">Recent articles, blogs, and events related to our library.</p>
                </div>
                <Link to="/insights" className="text-brand-primary font-bold hover:text-brand-secondary transition-colors flex items-center gap-2 group">
                  View All Insights
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : libraryInsights.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {libraryInsights.slice(0, 3).map((insight, idx) => (
                    <motion.div
                      key={insight.id + insight.type}
                      {...fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={`${import.meta.env.BASE_URL}images/${insight.image}`} 
                          alt={insight.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {insight.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <HiClock className="w-3 h-3" />
                            {insight.date}
                          </span>
                          {insight.category && (
                            <span className="flex items-center gap-1">
                              <HiHashtag className="w-3 h-3" />
                              {insight.category}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-brand-dark mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {insight.title}
                        </h4>
                        <Link 
                          to={`/insights/${insight.type}/${insight.id}`}
                          className="mt-auto inline-flex items-center gap-2 text-sm font-black text-brand-primary hover:text-brand-secondary transition-colors"
                        >
                          Read More
                          <HiChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                  <HiBookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No recent library-related insights found.</p>
                </div>
              )}
            </div>
          </section>

          {/* Advisory Committee */}
          <section id="committee" className="scroll-mt-40">
            <motion.div {...fadeInUp} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-gray-100">
              <div className="bg-brand-primary p-8 lg:p-12 text-white text-center">
                <h2 className="text-3xl lg:text-4xl font-black mb-4">Library Advisory Committee</h2>
                <p className="text-white/70 font-medium">Providing strategic guidance for the library's development and management.</p>
              </div>
              <div className="p-8 lg:p-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { role: "Chairperson", name: "Dr. M. Sitaramaiah", title: "Principal" },
                    { role: "Convener", name: "Sri G. Venkateswarlu", title: "Librarian" },
                    { role: "Member", name: "Dr. K. Ratnavali", title: "Lecturer" },
                    { role: "Student Rep", name: "V. Sai Krishna", title: "III Year BA" }
                  ].map((member, i) => (
                    <div key={i} className="text-center p-6 bg-brand-light rounded-3xl border border-gray-100">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-brand-primary mb-2">{member.role}</span>
                      <h3 className="text-lg font-bold text-brand-dark mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Facilities for Students */}
          <section id="facilities" className="scroll-mt-40">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <motion.div {...fadeInUp} className="lg:w-1/2">
                <div className="w-20 h-20 bg-brand-secondary/10 rounded-3xl flex items-center justify-center text-brand-dark mb-8">
                  <HiAcademicCap className="w-10 h-10" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Student Facilities</h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                  We provide a range of facilities to support your academic journey and make your library experience comfortable and productive.
                </p>
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Spacious Reading Hall",
                    "Computer Terminals with Internet",
                    "Digital Catalog (OPAC)",
                    "Reference Section",
                    "Newspaper & Periodical Corner",
                    "Photocopying Services"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-bold text-gray-700">
                      <HiChevronRight className="text-brand-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeInUp} className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-200 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" alt="Reading Room" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white mt-8">
                    <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop" alt="Bookshelf" className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* AMMA’s Literature */}
          <section id="literature" className="scroll-mt-40">
            <motion.div 
              {...fadeInUp}
              className="bg-brand-primary/5 rounded-[4rem] p-12 lg:p-20 border border-brand-primary/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <HiSparkles className="w-64 h-64 text-brand-primary" />
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="lg:w-2/5">
                  <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white p-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/amma_portrait.png`} 
                      alt="Matrusri Anasuya Devi" 
                      className="w-full h-full object-contain rounded-[2rem]"
                    />
                  </div>
                </div>
                <div className="lg:w-3/5">
                  <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">AMMA’s Literature</h2>
                  <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
                    A dedicated section featuring the life, teachings, and philosophy of Matrusri Anasuya Devi (Jillellamudi AMMA). This collection serves as a spiritual compass for our students and visitors.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="font-black text-brand-primary mb-2 uppercase tracking-tighter">Matrusri Vani</h3>
                      <p className="text-sm text-gray-500">A collection of Amma's divine messages and conversations.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="font-black text-brand-primary mb-2 uppercase tracking-tighter">Philosophy Works</h3>
                      <p className="text-sm text-gray-500">Books detailing the socio-spiritual philosophy of Jillellamudi.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Library Hours */}
          <section id="hours" className="scroll-mt-40 pb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeInUp} className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden text-center shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,134,11,0.2),transparent_50%)]"></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-8">
                    <HiClock className="w-12 h-12 text-brand-secondary" />
                  </div>
                  <h2 className="text-4xl font-black mb-12 uppercase tracking-tight">Library Opening Hours</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                      <span className="block text-brand-secondary font-black uppercase tracking-widest text-xs mb-4">Monday - Friday</span>
                      <p className="text-3xl font-black">9:00 AM</p>
                      <p className="text-white/50 font-medium my-2">to</p>
                      <p className="text-3xl font-black">5:00 PM</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                      <span className="block text-brand-secondary font-black uppercase tracking-widest text-xs mb-4">Saturday</span>
                      <p className="text-3xl font-black">9:00 AM</p>
                      <p className="text-white/50 font-medium my-2">to</p>
                      <p className="text-3xl font-black">1:00 PM</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                      <span className="block text-brand-secondary font-black uppercase tracking-widest text-xs mb-4">Sundays</span>
                      <p className="text-3xl font-black text-white/30 uppercase tracking-widest">Closed</p>
                      <p className="text-white/50 font-medium mt-4">Public Holidays: Closed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Library;
