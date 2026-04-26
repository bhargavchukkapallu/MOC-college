import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'B.A. O.L. (Telugu)',
    duration: '5 Years Integrated',
    eligibility: '10th Grade Pass',
    description: 'Deep dive into classical Telugu literature, grammar, and history. Preparation for teaching, media, and civil services.',
    color: 'from-blue-600 to-brand-primary'
  },
  {
    id: 2,
    title: 'B.A. O.L. (Sanskrit)',
    duration: '5 Years Integrated / 3 Years',
    eligibility: '10th Grade / Inter (Sanskrit)',
    description: 'Mastery of ancient Sanskrit texts, Vedas, and literature. Opens paths for research, translation, and international teaching.',
    color: 'from-orange-500 to-brand-secondary'
  },
  {
    id: 3,
    title: 'B.Sc. Honours (Computer Science)',
    duration: '4 Years',
    eligibility: 'Intermediate (MPC)',
    description: 'Modern technical education blending programming, algorithms, and software development for the digital age.',
    color: 'from-emerald-500 to-teal-700'
  }
];

const CoursesSection = () => {
  return (
    <section className="py-24 bg-brand-light relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-primary text-sm font-semibold mb-4 shadow-sm border border-gray-100"
          >
            <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
            Academics
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Programs Offered
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
            className="pb-16 px-4 !overflow-visible"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col border border-gray-100 group">
                  <div className={`h-2 w-full bg-gradient-to-r ${course.color}`}></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Clock className="w-4 h-4 mr-2 text-brand-secondary" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-1">{course.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Award className="w-4 h-4 mr-2 text-brand-secondary" />
                        <span className="font-medium">Eligibility:</span>
                        <span className="ml-1">{course.eligibility}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                      {course.description}
                    </p>

                    <Link 
                      to="/academics" 
                      className="inline-flex items-center justify-between w-full font-semibold text-brand-primary hover:text-brand-secondary transition-colors group/btn"
                    >
                      View Syllabus
                      <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center group-hover/btn:bg-brand-secondary group-hover/btn:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
