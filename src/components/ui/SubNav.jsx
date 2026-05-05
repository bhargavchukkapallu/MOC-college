import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SubNav = ({ sections }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounting for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-[70px] lg:top-[90px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-start lg:justify-center space-x-8 h-16 min-w-max">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-bold transition-all relative group py-2 flex items-center gap-2 ${
                  isActive ? 'text-brand-primary' : 'text-gray-500 hover:text-brand-primary'
                }`}
              >
                {section.icon && (
                  <span className={`transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-400 group-hover:text-brand-primary'}`}>
                    {section.icon}
                  </span>
                )}
                {section.name}
                <motion.span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SubNav;
