import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'B.A. O.L. (Telugu)',
    duration: '5 Yrs',
    eligibility: '10th Pass',
    students: '120+',
    image: `${import.meta.env.BASE_URL}images/MOC-Building.jpg`,
    category: 'Literature',
    description: 'Deep dive into classical Telugu literature, grammar, and history. Preparation for teaching, media, and civil services.',
  },
  {
    id: 2,
    title: 'B.A. O.L. (Sanskrit)',
    duration: '3/5 Yrs',
    eligibility: 'Inter/10th',
    students: '80+',
    image: `${import.meta.env.BASE_URL}images/MOC-Library-2.jpg`,
    category: 'Classical',
    description: 'Mastery of ancient Sanskrit texts, Vedas, and literature. Opens paths for research, translation, and international teaching.',
  },
  {
    id: 3,
    title: 'B.Sc. Honours (Comp. Sci.)',
    duration: '4 Yrs',
    eligibility: 'Intermediate',
    students: '200+',
    image: `${import.meta.env.BASE_URL}images/moc-lab.jpg`,
    category: 'Science',
    description: 'Modern technical education blending programming, algorithms, and software development for the digital age.',
  }
];

const CoursesSection = () => {
  return (
    <section className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Educavo Style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-0.5 bg-brand-secondary"></div>
            <span className="text-brand-primary font-bold uppercase tracking-widest text-sm">Academics</span>
            <div className="w-12 h-0.5 bg-brand-secondary"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6"
          >
            Our Popular Programs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Discover our unique blend of classical language studies and modern computer science programs designed for holistic career development.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 px-4 !overflow-visible courses-swiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                {/* Educavo Style Course Card */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border border-gray-100 relative">
                  
                  {/* Image Header */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-brand-secondary text-brand-dark px-4 py-1 text-sm font-bold rounded-md z-10 shadow-md">
                      {course.category}
                    </div>
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link to="/academics" className="bg-white text-brand-primary w-12 h-12 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">
                      <Link to="/academics">{course.title}</Link>
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                      {course.description}
                    </p>
                  </div>

                  {/* Footer (Meta Data) */}
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-primary" />
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-primary" />
                      <span className="font-medium">{course.eligibility}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .courses-swiper .swiper-button-next,
        .courses-swiper .swiper-button-prev {
          color: var(--color-brand-primary);
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .courses-swiper .swiper-button-next:hover,
        .courses-swiper .swiper-button-prev:hover {
          background: var(--color-brand-primary);
          color: white;
        }
        .courses-swiper .swiper-button-next::after,
        .courses-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
      `}} />
    </section>
  );
};

export default CoursesSection;
