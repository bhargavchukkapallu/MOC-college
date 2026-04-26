import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: '/images/MOC-Building.jpg',
    title: 'Welcome to Matrusri Oriental College',
    subtitle: 'Nurturing Knowledge, Inspiring Futures since 1971',
    ctaText: 'Discover Our History',
    ctaLink: '/about#history',
  },
  {
    id: 2,
    image: '/images/MOC-Library-2.jpg',
    title: 'Excellence in Classical Education',
    subtitle: 'Unique Gurukula System focusing on holistic development',
    ctaText: 'View Programs',
    ctaLink: '/academics',
  },
  {
    id: 3,
    image: '/images/moc-lab.jpg',
    title: 'Modern Facilities & Rich Heritage',
    subtitle: 'Blending traditional wisdom with modern technological education',
    ctaText: 'Explore Campus',
    ctaLink: '/about',
  },
];

const HeroSection = () => {
  return (
    <div className="relative w-full h-[100vh] min-h-[600px] mt-0">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative w-full h-full overflow-hidden">
                {/* Background Image with Parallax effect simulated by slight scale */}
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 6, ease: 'easeOut' }}
                  className="absolute inset-0"
                >

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-20 w-full h-full flex flex-col items-start justify-center text-left px-6 sm:px-12 lg:px-24 mx-auto">
                  <div className="bg-brand-dark/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, originX: 0 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Link
                        to={slide.ctaLink}
                        className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl"
                      >
                        {slide.ctaText}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for swiper dots to match brand */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: white;
          opacity: 0.2;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: var(--color-brand-secondary);
          opacity: 1;
          width: 24px;
          border-radius: 6px;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.3s;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: var(--color-brand-primary);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 20px;
        }
      `}} />
    </div>
  );
};

export default HeroSection;
