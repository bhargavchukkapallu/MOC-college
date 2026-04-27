import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Tag, X, Clock, User, Share2, Bookmark } from 'lucide-react';

import sanskritImg from '../../assets/article_sanskrit.png';
import gurukulaImg from '../../assets/article_gurukula.png';
import digitalImg from '../../assets/article_digital.png';

const articles = [
  {
    id: 1,
    title: "The Legacy of Sanskrit in Modern Times",
    excerpt: "Exploring how the world's oldest language is finding new relevance in computational linguistics and quantum computing research.",
    content: `
      <p>Sanskrit, often referred to as the 'Mother of all languages,' is not just a relic of the past but a sophisticated system of communication that continues to influence modern science and technology. Its perfectly structured grammar, as codified by Panini, has drawn parallels with modern computer programming languages.</p>
      <p>In recent years, researchers in computational linguistics have found that Sanskrit's unambiguous structure makes it an ideal candidate for natural language processing. Unlike many modern languages that rely heavily on context and syntax which can be ambiguous, Sanskrit's mathematical precision allows for clearer logical mapping.</p>
      <p>Furthermore, the philosophical depth found in Sanskrit texts like the Upanishads and the Bhagavad Gita continues to provide ethical frameworks for modern AI development and quantum physics interpretations. At Matrusri Oriental College, we bridge this gap by teaching traditional Sanskrit alongside modern computer science, ensuring our students are equipped with both ancient wisdom and future-ready skills.</p>
    `,
    image: sanskritImg,
    category: "Heritage",
    date: "Oct 24, 2024",
    readTime: "6 min read",
    author: "Acharya V. Sharma"
  },
  {
    id: 2,
    title: "Gurukula System: A Holistic Approach",
    excerpt: "Why the ancient Indian model of mentorship is more effective than modern classroom settings for character building.",
    content: `
      <p>The Gurukula system was once the cornerstone of Indian education, characterized by a deep bond between the teacher (Guru) and the student (Shishya). This wasn't just about academic learning; it was about life training, character building, and spiritual growth.</p>
      <p>In today's fast-paced, digitized world, the personal touch in education is often lost. The Gurukula model brings back the importance of mentorship, discipline, and communal living. At our college, we maintain this tradition by providing a residential environment where learning happens 24/7, not just within the four walls of a classroom.</p>
      <p>Students learn through observation, service, and dialogue. This holistic approach ensures that when a student graduates, they are not just degree-holders but well-rounded individuals ready to contribute meaningfully to society with a sense of duty (Dharma) and integrity.</p>
    `,
    image: gurukulaImg,
    category: "Education",
    date: "Nov 12, 2024",
    readTime: "8 min read",
    author: "Dr. S. Rajan"
  },
  {
    id: 3,
    title: "Ancient Wisdom & Digital Innovation",
    excerpt: "Integrating Vedic mathematics and logic into modern algorithms to solve complex optimization problems.",
    content: `
      <p>The intersection of ancient Vedic logic and modern digital innovation is a frontier of immense potential. Vedic Mathematics, with its simple yet powerful sutras, provides shortcuts for complex calculations that can be translated into efficient algorithms for digital signal processing and cryptography.</p>
      <p>At MOC, we encourage our students to look back into our heritage to find solutions for the future. The binary system itself finds its roots in the works of Pingala, an ancient Indian mathematician. By understanding these foundations, our students can innovate beyond conventional Western paradigms.</p>
      <p>This article explores several case studies where Vedic principles have been applied to modern tech challenges, from optimizing search engines to creating more secure encryption methods. The future of innovation might just be hidden in our past.</p>
    `,
    image: digitalImg,
    category: "Innovation",
    date: "Dec 05, 2024",
    readTime: "5 min read",
    author: "Prof. K. Venkatesh"
  }
];

const ArticleCard = ({ article, onClick }) => {
  return (
    <motion.div
      layoutId={`article-${article.id}`}
      onClick={() => onClick(article)}
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-brand-secondary text-brand-dark text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-brand-primary" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-primary" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-2xl font-black text-brand-dark leading-tight mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-brand-dark uppercase tracking-wide">{article.author}</span>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="text-brand-primary flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-brand-dark/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        layoutId={`article-${article.id}`}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden relative flex flex-col lg:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-brand-dark rounded-full transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Visual Sidebar */}
        <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay" />
          
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <span className="px-4 py-1.5 bg-brand-secondary text-brand-dark text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">
              {article.category}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black leading-tight uppercase">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Reading Area */}
        <div className="lg:w-3/5 overflow-y-auto p-8 lg:p-16 custom-scrollbar">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-100 pb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-primary" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-primary" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-primary" />
                {article.author}
              </span>
            </div>

            <div 
              className="prose prose-lg prose-brand max-w-none text-gray-600 leading-relaxed font-medium space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Modal Footer Actions */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-dark hover:text-brand-primary transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-dark hover:text-brand-primary transition-colors">
                  <Bookmark className="w-4 h-4" /> Save
                </button>
              </div>
              <button 
                onClick={onClose}
                className="bg-brand-primary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-dark transition-colors shadow-lg"
              >
                Back to Articles
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArticlesSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Large Text (Iconic Element) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
        <h2 className="text-[15rem] lg:text-[25rem] font-black text-gray-50 uppercase leading-none tracking-tighter">
          Chronicles
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-brand-primary"></div>
              <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-xs">
                Insights & Updates
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-brand-dark leading-[0.95] tracking-tight uppercase"
            >
              The Scholars' <br />
              <span className="text-brand-primary">Journal</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="group flex items-center gap-4 px-8 py-4 bg-brand-dark text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all duration-500 shadow-xl">
              View All Publications
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard article={article} onClick={setSelectedArticle} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-brand-primary);
          border-radius: 10px;
        }
        .prose-brand p {
          margin-bottom: 1.5rem;
        }
      `}} />
    </section>
  );
};

export default ArticlesSection;
