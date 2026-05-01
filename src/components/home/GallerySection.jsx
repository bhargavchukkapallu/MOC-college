import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Maximize2 } from 'lucide-react';

const GalleryRow = ({ images, direction = 1, speed = 20, onImageClick }) => {
  return (
    <div className="flex overflow-hidden group py-2">
      <motion.div
        animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        className="flex gap-4 px-2 whitespace-nowrap"
      >
        {[...images, ...images, ...images, ...images].map((img, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(`${import.meta.env.BASE_URL}images/gallery/${img}`)}
            className="relative w-64 h-44 lg:w-80 lg:h-52 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 group/item shadow-lg"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/gallery/${img}`}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Maximize2 className="text-white w-8 h-8 transform scale-50 group-hover/item:scale-100 transition-transform duration-300" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/gallery_images.json`)
      .then(res => res.json())
      .then(data => setGalleryImages(data))
      .catch(err => console.error("Error loading gallery images:", err));
  }, []);

  const row1 = galleryImages.slice(0, 4);
  const row2 = galleryImages.slice(4, 8);
  const row3 = galleryImages.slice(8, 12);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-brand-primary"></div>
            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-sm lg:text-base">
              Visual Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark leading-[1.05] tracking-tighter"
          >
            Life At <span className="text-brand-primary">Matrusri</span> <br />
            Oriental College
          </motion.h2>
        </div>
      </div>

      <div className="relative space-y-4">
        {/* Row 1: Left to Right */}
        <GalleryRow images={row1} direction={1} speed={25} onImageClick={setSelectedImage} />
        
        {/* Row 2: Right to Left */}
        <GalleryRow images={row2} direction={-1} speed={30} onImageClick={setSelectedImage} />
        
        {/* Row 3: Left to Right */}
        <GalleryRow images={row3} direction={1} speed={22} onImageClick={setSelectedImage} />
        
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-brand-secondary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged gallery"
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
