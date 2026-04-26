import React from 'react';
import { motion } from 'framer-motion';

// Using placeholder icons/text for affiliations since we don't have actual logo images uploaded
// In a real scenario, these would be high-quality PNGs or SVGs of the university logos
const affiliations = [
  { id: 1, name: 'Acharya Nagarjuna University', type: 'Affiliated University', abbr: 'ANU' },
  { id: 2, name: 'Sri Venkateswara Vedic University', type: 'Affiliated University', abbr: 'SVVU' },
  { id: 3, name: 'UGC 2(F) & 12(B)', type: 'Recognized By', abbr: 'UGC' },
  { id: 4, name: 'NAAC Accredited', type: 'Assessment', abbr: 'NAAC' },
  { id: 5, name: 'Sree Viswajananee Parishat Trust', type: 'Managed By', abbr: 'SVP' },
];

const AffiliationsSection = () => {
  return (
    <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recognitions & Affiliations</h2>
          <div className="w-16 h-1 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Infinite scrolling logic using Framer Motion or pure CSS */}
        <div className="relative flex overflow-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
            className="flex gap-8 px-4 whitespace-nowrap"
          >
            {/* Double the array for seamless infinite scroll */}
            {[...affiliations, ...affiliations].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center min-w-[250px] p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-secondary/50 hover:bg-brand-light transition-colors group/card"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-brand-primary shadow-sm mb-4 border border-gray-100 group-hover/card:scale-110 transition-transform">
                  {item.abbr}
                </div>
                <h4 className="font-bold text-gray-900 text-center text-sm md:text-base whitespace-normal">
                  {item.name}
                </h4>
                <p className="text-xs text-brand-secondary mt-1 uppercase tracking-wider font-semibold">
                  {item.type}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AffiliationsSection;
