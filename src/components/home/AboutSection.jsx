import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-brand-secondary" />,
    title: 'Gurukula System',
    description: 'Unique educational approach focusing on holistic development and traditional values.'
  },
  {
    icon: <Heart className="w-8 h-8 text-brand-secondary" />,
    title: 'Spiritual Growth',
    description: 'Promoting harmony, universal love, and brotherhood as taught by Jillellamudi AMMA.'
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-brand-secondary" />,
    title: 'Modern Education',
    description: 'Offering computer courses and training for competitive exams alongside classical studies.'
  },
  {
    icon: <Users className="w-8 h-8 text-brand-secondary" />,
    title: 'Inclusive Community',
    description: 'Fostering cooperation and unity beyond caste, religion, or community barriers.'
  }
];

const AboutSection = () => {
  return (
    <section className="pb-24 pt-0 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 -mt-16 md:-mt-24 mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + (index * 0.1), duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-brand-light rounded-xl shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
              About The College
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              A Premier Educational Institution
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Inaugurated by Viswajanani Jillellamudi AMMA on August 6, 1971, Matrusri Oriental College has successfully completed over 50 years of excellence. We emphasize classical languages like Telugu and Sanskrit, guiding students towards success.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              This esteemed institution is unique in imparting education through the Gurukula system, focusing on the holistic development of physical, mental, and spiritual growth.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center border-2 border-brand-primary">
                <span className="text-2xl font-bold text-brand-primary">53+</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Years of Excellence</h4>
                <p className="text-sm text-gray-500">Established in 1971</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Video Embed Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-50 bg-gray-100"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/D0Tn5deUvoM?si=u2NOBIfHkhI22kc2&rel=0"
                title="Matrusri Oriental College Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
