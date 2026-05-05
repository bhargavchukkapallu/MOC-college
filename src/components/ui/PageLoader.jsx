import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    // Give enough time to enjoy the satisfying animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-light/95 backdrop-blur-md"
        >
          <div className="relative flex items-center justify-center mb-12">
            
            <style>{`
              .iso-scene {
                perspective: 1200px;
                transform-style: preserve-3d;
              }
              .iso-book {
                width: 120px;
                height: 160px;
                position: relative;
                transform-style: preserve-3d;
                /* Premium Isometric Angle */
                transform: rotateX(60deg) rotateZ(-45deg); 
              }
              
              /* Covers */
              .iso-cover {
                position: absolute;
                width: 60px;
                height: 160px;
                background-color: var(--color-brand-primary, #800000);
                top: 0;
                /* Dynamic drop shadow for realism */
                box-shadow: 15px 15px 30px rgba(0,0,0,0.2); 
              }
              .iso-cover.left {
                left: 0;
                border-radius: 8px 0 0 8px;
                /* Book thickness via 3D shadows */
                box-shadow: 
                  -1px 1px 0px #5c0000,
                  -2px 2px 0px #5c0000,
                  -3px 3px 0px #5c0000,
                  -8px 8px 15px rgba(0,0,0,0.25);
              }
              .iso-cover.right {
                left: 60px;
                border-radius: 0 8px 8px 0;
                box-shadow: 
                  -1px 1px 0px #5c0000,
                  -2px 2px 0px #5c0000,
                  -3px 3px 0px #5c0000,
                  0px 10px 20px rgba(0,0,0,0.25);
              }
              
              /* Static pages block */
              .iso-pages-left {
                position: absolute;
                width: 56px;
                height: 152px;
                background: #fdfdfd;
                top: 4px;
                left: 4px;
                border-radius: 4px 0 0 4px;
                transform: translateZ(4px);
                box-shadow: inset 4px 0 10px rgba(0,0,0,0.05);
              }
              .iso-pages-right {
                position: absolute;
                width: 56px;
                height: 152px;
                background: #ffffff;
                top: 4px;
                left: 60px;
                border-radius: 0 4px 4px 0;
                transform: translateZ(4px);
                box-shadow: inset -4px 0 10px rgba(0,0,0,0.05);
              }

              /* Flipping pages */
              .iso-page {
                position: absolute;
                width: 56px;
                height: 152px;
                top: 4px;
                left: 60px;
                transform-origin: left center;
                transform-style: preserve-3d;
                transform: translateZ(5px); 
                animation: isoPageTurn 2.4s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
              }
              
              .iso-page-front,
              .iso-page-back {
                position: absolute;
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 0 4px 4px 0;
                backface-visibility: hidden;
              }
              
              /* Page Front */
              .iso-page-front {
                background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
                border: 1px solid rgba(0,0,0,0.02);
                border-left: none;
              }
              
              /* Page Back */
              .iso-page-back {
                transform: rotateY(180deg);
                background: linear-gradient(-135deg, #ffffff 0%, #ececec 100%);
                border-radius: 4px 0 0 4px;
                border: 1px solid rgba(0,0,0,0.02);
                border-right: none;
              }

              /* Seamless staggering for endless effect */
              .iso-page:nth-child(1) { animation-delay: 0s; }
              .iso-page:nth-child(2) { animation-delay: 0.4s; }
              .iso-page:nth-child(3) { animation-delay: 0.8s; }
              .iso-page:nth-child(4) { animation-delay: 1.2s; }
              .iso-page:nth-child(5) { animation-delay: 1.6s; }
              .iso-page:nth-child(6) { animation-delay: 2.0s; }

              @keyframes isoPageTurn {
                0% {
                  transform: translateZ(5px) rotateY(0deg);
                  opacity: 0;
                }
                2% {
                  opacity: 1;
                }
                50% {
                  transform: translateZ(5px) rotateY(-90deg);
                }
                98% {
                  opacity: 1;
                }
                100% {
                  transform: translateZ(5px) rotateY(-180deg);
                  opacity: 0;
                }
              }
            `}</style>
            
            <div className="iso-scene">
              <div className="iso-book">
                <div className="iso-cover left"></div>
                <div className="iso-cover right"></div>
                
                <div className="iso-pages-left"></div>
                <div className="iso-pages-right"></div>
                
                {/* 6 Pages for silky smooth turning loop */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="iso-page">
                    <div className="iso-page-front"></div>
                    <div className="iso-page-back"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <motion.div 
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-brand-primary font-bold tracking-[0.25em] text-sm uppercase flex items-center gap-2">
              <span>Loading</span>
              <span className="flex gap-1.5 ml-1">
                <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary"></motion.span>
                <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary"></motion.span>
                <motion.span animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary"></motion.span>
              </span>
            </div>
            <p className="text-xs text-brand-dark/50 mt-3 font-medium tracking-wide uppercase">
              Matrusri Oriental College
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
