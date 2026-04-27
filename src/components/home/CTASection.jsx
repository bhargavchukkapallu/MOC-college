import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax / Fixed attachment */}
      <div
        className="absolute inset-0 bg-[url('./images/mog-gate.jpg')] bg-cover bg-center bg-fixed"
      >
        {/* Deep blue gradient overlay */}
        <div className="absolute inset-0 bg-brand-primary/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-brand-secondary/30">
            <Quote className="w-8 h-8 text-brand-secondary fill-brand-secondary" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight italic font-serif">
            "Education is not the learning of facts, but the training of the mind to think."
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
            Join a community dedicated to academic excellence, spiritual harmony, and the holistic development of every student.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-brand-secondary hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-brand-secondary/30"
            >
              Learn More About Us
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1"
            >
              Contact Admissions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
