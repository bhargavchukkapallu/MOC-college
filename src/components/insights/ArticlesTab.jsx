import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiCalendarDays, HiUser, HiChevronRight, HiMagnifyingGlass, HiBookOpen } from 'react-icons/hi2';

const ArticlesTab = ({ articles, searchQuery, direction, isSidebarLayout }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="articles-view"
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -direction * 50 }}
      transition={{ duration: 0.4 }}
      className={`grid gap-8 ${isSidebarLayout ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
    >
      {articles.length > 0 ? articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => navigate(`/insights/articles/${article.id}`)}
          className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/${article.image}`}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm flex items-center gap-2">
                <HiBookOpen className="w-3 h-3" />
                {article.category}
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <HiCalendarDays className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <span className="font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                {article.readTime}
              </span>
            </div>
            <h3 className="text-xl font-black text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow italic">
              "{article.excerpt}"
            </p>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    #{tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    +{article.tags.length - 3}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <HiUser className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-700">{article.author}</span>
              </div>
              <button className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )) : (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
            <HiMagnifyingGlass className="w-8 h-8 text-brand-primary/40" />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">No articles found</h3>
          <p className="text-gray-500">We couldn't find any articles matching "{searchQuery}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default ArticlesTab;
