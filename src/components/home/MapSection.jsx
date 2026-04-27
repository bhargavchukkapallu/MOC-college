import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white group">
      {/* Map Header (Elite Style) */}
      <div className="container mx-auto px-6 absolute top-[10px] left-[0px] z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-md p-6 lg:p-10 rounded-[2rem] shadow-2xl border border-white/20 max-w-sm lg:max-w-md pointer-events-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-brand-dark text-lg leading-tight">Visit Our Campus</h3>
              <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-1">Jillellamudi, Andhra Pradesh</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-brand-primary" />
              </div>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                Matrusri Oriental College, Jillellamudi, <br />
                Bapatla Dist, Andhra Pradesh 522113
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-brand-primary" />
              </div>
              <p className="text-gray-600 text-sm font-bold">+91 94402 12138</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-brand-primary" />
              </div>
              <p className="text-gray-600 text-sm font-medium">Mon - Sat: 9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/dir//Matrusri+Oriental+College+Jillellamudi+Andhra+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center w-full bg-brand-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg active:scale-95"
          >
            Get Directions
          </a>
        </motion.div>
      </div>

      {/* Full Width Google Map */}
      <div className="w-full h-[500px] lg:h-[650px] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.599908794995!2d80.4516198122211!3d15.98225668462086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a6ad2c8093ad9%3A0x98bc45c46ada70c3!2sMatrusri%20Oriental%20College!5e0!3m2!1sen!2sin!4v1777297659936!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Matrusri Oriental College Location"
          className="relative z-0"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
