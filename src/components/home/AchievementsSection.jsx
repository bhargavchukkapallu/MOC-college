import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiTrophy, HiShieldCheck, HiArrowRight, HiSparkles } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const iconMap = {
  Academic: <HiAcademicCap className="w-6 h-6" />,
  Institutional: <HiShieldCheck className="w-6 h-6" />,
  Student: <HiTrophy className="w-6 h-6" />
};

const categoryClasses = {
  Academic: {
    bg: "bg-red-50 text-brand-primary border-brand-primary/10",
    badge: "bg-brand-primary text-white",
    cardBorder: "hover:border-brand-primary/20",
    accent: "bg-brand-primary",
    iconColor: "text-brand-primary bg-brand-primary/5"
  },
  Institutional: {
    bg: "bg-blue-50 text-blue-700 border-blue-100",
    badge: "bg-blue-600 text-white",
    cardBorder: "hover:border-blue-300",
    accent: "bg-blue-600",
    iconColor: "text-blue-600 bg-blue-50"
  },
  Student: {
    bg: "bg-yellow-50 text-amber-800 border-yellow-200",
    badge: "bg-brand-secondary text-brand-dark",
    cardBorder: "hover:border-brand-secondary/30",
    accent: "bg-brand-secondary",
    iconColor: "text-amber-600 bg-yellow-50"
  }
};

const AchievementsSection = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/achievements.json`)
      .then(res => res.json())
      .then(data => {
        // Filter highlighted achievements and display up to 3 of them
        const highlighted = data.filter(item => item.highlight).slice(0, 3);
        setFeatured(highlighted);
      })
      .catch(err => console.error("Error loading achievements for home section:", err));
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-[#f4f8fd] relative overflow-hidden z-10">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px]"></div>
        
        {/* Dotted Grid Pattern */}
        <div className="absolute top-10 right-[5%] w-36 h-36 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <pattern id="achievementsGridDots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="var(--color-brand-primary)" />
            </pattern>
            <rect width="100" height="100" fill="url(#achievementsGridDots)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-10 bg-brand-primary"></div>
              <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-sm flex items-center gap-1.5">
                <HiSparkles className="w-4 h-4 text-brand-secondary" /> MOC Laurels
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[1.1] tracking-tighter"
            >
              Celebrating Our <span className="text-brand-primary">Legacy</span> <br />
              Of Excellence
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg lg:text-xl max-w-md leading-relaxed font-medium"
          >
            A quick glimpse of the milestones, academic triumphs, and institutional recognitions that define Matrusri Oriental College.
          </motion.p>
        </div>

        {/* Featured Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item, index) => {
            const classes = categoryClasses[item.category] || categoryClasses.Academic;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(128,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden ${classes.cardBorder}`}
              >
                {/* Accent border strip on left */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${classes.accent}`}></div>

                {/* Card Header */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${classes.bg}`}>
                    {item.category}
                  </span>
                  <span className="text-xs font-black text-brand-primary">{item.month} {item.year}</span>
                </div>

                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-transparent shadow-sm mb-6 ${classes.iconColor}`}>
                  {iconMap[item.category]}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-black text-brand-dark mb-4 leading-tight group-hover:text-brand-primary transition-colors flex-grow">
                  <Link to="/achievements">{item.title}</Link>
                </h3>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed font-medium mb-6 text-sm line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50 mt-auto">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Timeline CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            to="/achievements"
            className="inline-flex items-center gap-3 text-brand-dark font-black uppercase tracking-[0.2em] text-sm hover:text-brand-primary transition-colors group"
          >
            Explore Achievements Timeline
            <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
              <HiArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
