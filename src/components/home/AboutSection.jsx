import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/about_features.json`)
      .then(res => res.json())
      .then(data => setFeaturesList(data))
      .catch(err => console.error("Error loading features:", err));
  }, []);
  return (
    <section className="py-24 lg:py-32 bg-[#fafcff] relative z-10 overflow-hidden">
      {/* Decorative Background Elements (Design System Consistency) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-0 left-10 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000" fill="none">
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut" }}
            d="M-100,200 C150,250 200,450 50,650 C-100,850 150,1000 250,1100" 
            stroke="var(--color-brand-primary)" 
            strokeWidth="1.5" 
            strokeDasharray="10 10"
          />
        </svg>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-[-10%] w-[40rem] h-[40rem] bg-brand-secondary/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Cinematic Video Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full relative"
          >
            {/* Main Video Wrapper */}
            <div className="relative group">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)] border-[8px] border-white z-10 bg-white">
                <div className="relative w-full aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="https://www.youtube.com/embed/D0Tn5deUvoM?si=u2NOBIfHkhI22kc2&rel=0"
                    title="Matrusri Oriental College Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Decorative Background Frame */}
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-brand-primary/10 rounded-[2.5rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              
              {/* Floating Pattern */}
              <div className="absolute -top-12 -left-12 w-32 h-32 opacity-10 pointer-events-none -z-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <pattern id="aboutDots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="var(--color-brand-primary)" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#aboutDots)" />
                </svg>
              </div>
            </div>

            {/* Premium Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -left-6 lg:-left-12 bg-white p-8 rounded-[2rem] shadow-2xl z-20 flex items-center gap-5 border border-gray-100 group cursor-pointer hover:shadow-brand-primary/10 transition-shadow"
            >
              <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center text-brand-primary shadow-lg group-hover:scale-110 transition-transform">
                <History className="w-8 h-8" />
              </div>
              <div>
                <span className="block text-4xl font-black text-brand-dark leading-none">53+</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Years of Heritage</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Text Content */}
          <div className="lg:w-1/2 w-full">
            {/* Elite Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-brand-primary"></div>
              <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-sm">
                Our Legacy
              </span>
            </motion.div>
            
            {/* Epic Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark mb-8 leading-[1.05] tracking-tighter"
            >
              A Premier Educational <br />
              <span className="text-brand-primary">Heritage</span> Since 1971
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg lg:text-xl leading-relaxed mb-10 font-medium"
            >
              Inaugurated by Viswajanani Jillellamudi AMMA, Matrusri Oriental College has successfully completed over 50 years of excellence. We emphasize classical languages like Telugu and Sanskrit, blending spiritual discipline with modern academic brilliance.
            </motion.p>
            
            {/* Features Bullet List (Refined) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {featuresList.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-brand-secondary transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-gray-600 font-bold text-sm lg:text-base leading-snug">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* High-Conversion CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/about"
                className="inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-brand-primary/20 group active:scale-95"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

