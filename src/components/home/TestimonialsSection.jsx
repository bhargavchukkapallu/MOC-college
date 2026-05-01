import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, ExternalLink, MessageSquare, Quote } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/testimonials.json`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error("Error loading testimonials:", err));
  }, []);
  return (
    <section className="py-24 lg:py-32 bg-[#F8F8F8] relative overflow-hidden">
      {/* Geometric Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="badgeGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#badgeGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Cinematic Header (Dribbble Style) */}
        <div className="text-center max-w-5xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-brand-primary/60 font-black uppercase tracking-[0.4em] text-xs lg:text-sm">
              Voices of MOC • 53 Years of Legacy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-black text-brand-dark leading-[0.95] tracking-tight uppercase"
          >
            Empowering Students <br />
            <span className="text-brand-primary">Guided By AMMA</span>
          </motion.h2>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-24 testimonials-swiper !overflow-visible"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <motion.div
                  whileHover={{ y: -10, rotate: -1 }}
                  className="relative pt-12 h-full flex flex-col items-center"
                >
                  {/* The Lanyard Clip (Metaphor Element) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                    <div className="w-1 h-12 bg-gray-300"></div>
                    <div className="w-10 h-10 bg-white border-[3px] border-gray-300 rounded-xl shadow-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-300 shadow-inner"></div>
                    </div>
                  </div>

                  {/* The Badge Card */}
                  <div className="w-full bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-gray-100 p-10 lg:p-12 flex flex-col h-full group relative overflow-hidden">

                    {/* Top Branding Area */}
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary/60">Verified Member</span>
                        <span className="text-sm font-black text-brand-dark uppercase">MOC • {new Date().getFullYear()}</span>
                      </div>
                      <div className="text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors">
                        <Quote className="w-12 h-12 rotate-180" />
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="flex-grow">
                      <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-semibold mb-10">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Card Footer (Badge Holder Info) */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden shadow-2xl border-2 border-white transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-black text-brand-dark text-lg leading-tight">{item.name}</h4>
                          <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-1">
                            {item.role} • {item.company}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer shadow-sm">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Decorative Card Shine/Texture */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Global Floating Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      </div>

      {/* Swiper Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #000;
          opacity: 0.1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
          border-radius: 4px;
          background: var(--color-brand-primary);
        }
      `}} />
    </section>
  );
};

export default TestimonialsSection;


