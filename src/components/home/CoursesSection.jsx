import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowRight, GraduationCap, Users } from 'lucide-react';
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
    description: 'Deep dive into classical Telugu literature. Eligible for Govt jobs: VRO, Panchayat Secretary, Police, Groups, and Media.',
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 2,
    title: 'B.A. O.L. (Sanskrit)',
    duration: '3/5 Yrs',
    eligibility: 'Inter/10th',
    students: '80+',
    image: `${import.meta.env.BASE_URL}images/MOC-Library-2.jpg`,
    category: 'Classical',
    description: 'Mastery of ancient Sanskrit texts. Opens paths for research, translators, and opportunities to work abroad for the proficient.',
    icon: <GraduationCap className="w-6 h-6" />,
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
    icon: <Users className="w-6 h-6" />,
  }
];

const CoursesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#f8fbff] relative overflow-hidden">
      {/* Decorative Background Elements (Matching Hero Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]" viewBox="0 0 500 1000" fill="none">
          <path d="M500,100 C400,150 300,400 450,600 C600,800 400,950 350,1100" stroke="var(--color-brand-primary)" strokeWidth="2" />
        </svg>
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]"></div>

        {/* Dotted Pattern */}
        <div className="absolute top-20 right-[10%] w-32 h-32 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <pattern id="gridDots2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="var(--color-brand-primary)" />
            </pattern>
            <rect width="100" height="100" fill="url(#gridDots2)" />
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
              <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-sm">
                Academic Programs
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[1.1] tracking-tighter"
            >
              Building The <span className="text-brand-primary">Leaders</span> <br />
              Of Tomorrow
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg lg:text-xl max-w-md leading-relaxed font-medium"
          >
            Explore our curated selection of programs that bridge traditional knowledge with modern technology.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(128,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Card Image Wrapper */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-brand-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  {course.category}
                </div>

                {/* Floating Icon */}
                <div className="absolute -bottom-6 right-8 w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-[15deg] transition-transform duration-500 z-10">
                  {course.icon}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 lg:p-10 pt-12 flex flex-col flex-grow">
                <h3 className="text-2xl lg:text-3xl font-black text-brand-dark mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                  <Link to="/academics">{course.title}</Link>
                </h3>

                <p className="text-gray-500 leading-relaxed mb-8 flex-grow font-medium">
                  {course.description}
                </p>

                {/* Meta Information Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Duration</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-primary" />
                      <span className="text-brand-dark font-bold">{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Eligibility</span>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-brand-primary" />
                      <span className="text-brand-dark font-bold">{course.eligibility}</span>
                    </div>
                  </div>
                </div>

                {/* Link Indicator */}
                <div className="mt-8 flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs group/link">
                  <span className="group-hover/link:mr-2 transition-all">View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            to="/academics"
            className="inline-flex items-center gap-3 text-brand-dark font-black uppercase tracking-[0.2em] text-sm hover:text-brand-primary transition-colors group"
          >
            Explore All Programs
            <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CoursesSection;

