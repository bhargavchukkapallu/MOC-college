import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuresList = [
  'Unique Gurukula System focusing on holistic development',
  'Promoting harmony, universal love, and brotherhood',
  'Offering computer courses and competitive exam training',
  'Fostering cooperation beyond caste, religion, or community'
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image/Video Composition (Educavo Style) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full relative"
          >
            {/* Main Video/Image Container */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white z-10">
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="https://www.youtube.com/embed/D0Tn5deUvoM?si=u2NOBIfHkhI22kc2&rel=0"
                  title="Matrusri Oriental College Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-brand-primary rounded-lg z-0"></div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-brand-secondary text-brand-dark p-6 rounded-lg shadow-xl z-20 hidden md:flex flex-col items-center justify-center min-w-[180px]"
            >
              <span className="text-5xl font-extrabold mb-1">53+</span>
              <span className="text-sm font-bold uppercase tracking-wider text-center">Years of<br/>Excellence</span>
            </motion.div>
          </motion.div>

          {/* Right Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            {/* Section Subtitle */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-brand-secondary"></div>
              <span className="text-brand-primary font-bold uppercase tracking-widest text-sm">About The College</span>
            </div>
            
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight">
              A Premier Educational Institution Since 1971
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Inaugurated by Viswajanani Jillellamudi AMMA on August 6, 1971, Matrusri Oriental College has successfully completed over 50 years of excellence. We emphasize classical languages like Telugu and Sanskrit, guiding students towards a bright and successful future.
            </p>
            
            {/* Features Bullet List (Educavo Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {featuresList.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-md font-bold hover:bg-brand-dark transition-colors transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Read More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
