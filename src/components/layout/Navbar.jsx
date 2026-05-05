import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  HiChevronDown,
  HiBars3,
  HiXMark,
  HiChatBubbleLeftEllipsis,
  HiAcademicCap,
  HiUsers,
  HiBookOpen,
  HiArrowRight,
  HiShieldCheck
} from 'react-icons/hi2';

const iconMap = {
  BookOpen: <HiBookOpen />,
  Users: <HiUsers />,
  MessageSquare: <HiChatBubbleLeftEllipsis />,
  GraduationCap: <HiAcademicCap />,
  Menu: <HiBars3 />,
  Shield: <HiShieldCheck />
};

const DesktopNavItem = ({ link, activeMegaMenu, setActiveMegaMenu, currentPath }) => {
  const isPathActive = (path) => {
    if (!path) return false;
    // Remove hash and trailing slash from target path
    const cleanPath = path.split('#')[0].replace(/\/$/, '');
    // location.pathname already excludes hashes
    const cleanCurrentPath = currentPath.replace(/\/$/, '');
    
    if (cleanPath === '' && cleanCurrentPath === '') return true;
    if (cleanPath === '') return false;
    
    return cleanCurrentPath === cleanPath || cleanCurrentPath.startsWith(cleanPath + '/');
  };

  const isDeepActive = () => {
    if (isPathActive(link.path)) return true;
    
    if (link.megaMenu?.some(item => isPathActive(item.path))) return true;
    
    if (link.megaMenuSections?.some(section => 
      section.items.some(item => isPathActive(item.path))
    )) return true;
    
    return false;
  };

  const isActive = isDeepActive();

  const dropdownRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (activeMegaMenu === link.name && dropdownRef.current) {
      const updatePosition = () => {
        if (!dropdownRef.current) return;
        
        // Use requestAnimationFrame to measure after layout
        requestAnimationFrame(() => {
          const dropdown = dropdownRef.current;
          const parent = dropdown?.parentElement;
          if (!dropdown || !parent) return;

          const parentRect = parent.getBoundingClientRect();
          const dropdownWidth = dropdown.offsetWidth; // offsetWidth is unaffected by CSS transforms
          const viewportWidth = window.innerWidth;
          const margin = 20;

          // The dropdown is centered relative to the parent center
          const parentCenterX = parentRect.left + parentRect.width / 2;
          const dropdownLeft = parentCenterX - dropdownWidth / 2;
          const dropdownRight = parentCenterX + dropdownWidth / 2;

          let newOffset = 0;
          if (dropdownLeft < margin) {
            newOffset = margin - dropdownLeft;
          } else if (dropdownRight > viewportWidth - margin) {
            newOffset = (viewportWidth - margin) - dropdownRight;
          }

          if (newOffset !== 0) {
            setOffset(newOffset);
          }
        });
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    } else {
      setOffset(0);
    }
  }, [activeMegaMenu, link.name]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => (link.megaMenu || link.megaMenuSections) ? setActiveMegaMenu(link.name) : setActiveMegaMenu(null)}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <Link
        to={link.path}
        className={`flex items-center px-3 xl:px-4 py-2 text-[15px] font-bold transition-colors relative ${isActive ? 'text-brand-primary' : 'text-gray-800 hover:text-brand-primary'}`}
      >
        {link.name}
        {(link.megaMenu || link.megaMenuSections) && (
          <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />
        )}
        <motion.span
          className={`absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
        />
      </Link>

      {(link.megaMenu || link.megaMenuSections) && (
        <AnimatePresence>
          {activeMegaMenu === link.name && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 15, scale: 0.95, x: '50%' }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                x: `calc(50% + ${offset}px)`
              }}
              exit={{ opacity: 0, y: 15, scale: 0.95, x: '50%' }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute right-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-max max-w-[calc(100vw-40px)] min-w-[500px] z-[60]"
            >
              <div className="flex items-stretch bg-gradient-to-b from-white to-gray-50">
                {/* Main Mega Menu Items */}
                <div className={`flex flex-col p-6 h-full ${link.megaMenuSections ? 'min-w-[450px] max-w-[560px] border-r border-gray-100' : 'w-full'}`}>
                  <h3 className="text-[14px] font-black text-brand-primary uppercase tracking-[0.2em] border-b border-brand-primary/10 pb-2 mb-4 mx-2">
                    {link.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {link.megaMenu?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center p-3 rounded-xl transition-all duration-200 group/item border hover:bg-white hover:shadow-md border-transparent hover:border-brand-primary/10"
                      >
                        <div className="p-2.5 rounded-lg transition-colors bg-brand-primary/5 text-brand-primary group-hover/item:bg-brand-primary group-hover/item:text-white">
                          {iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-5 h-5 transition-colors" }) : null}
                        </div>
                        <div className="ml-3 text-left">
                          <p className="text-[14px] font-bold transition-colors text-gray-900 group-hover/item:text-brand-primary">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-2">Explore our {item.name.toLowerCase()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Separate Block for Categories (e.g., Administration, Committees) */}
                {link.megaMenuSections && (
                  <div className="bg-gray-50/50 p-8 h-full">
                    <div className="flex items-start gap-12">
                      {link.megaMenuSections.map((section) => (
                        <div key={section.title} className="space-y-4">
                          <h3 className="text-[14px] font-black text-brand-primary uppercase tracking-[0.2em] border-b border-brand-primary/10 pb-2 mb-4">
                            {section.title}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center gap-3 p-2 rounded-xl transition-all group/subitem border hover:bg-white hover:shadow-sm border-transparent hover:border-brand-primary/5"
                              >
                                <div className="w-7 h-7 flex items-center justify-center rounded-lg transition-all shadow-sm bg-white text-brand-primary/60 group-hover/subitem:text-brand-primary group-hover/subitem:scale-110">
                                  {iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-3.5 h-3.5" }) : null}
                                </div>
                                <span className="text-[14px] font-bold transition-colors leading-tight text-gray-700 group-hover/subitem:text-brand-primary">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-brand-primary/5 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-brand-primary font-medium">
                  Matrusri Oriental College Excellence
                </p>
                <HiArrowRight className="w-4 h-4 text-brand-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [navLinks, setNavLinks] = useState([]);

  const isPathActive = (path) => {
    if (!path) return false;
    const cleanPath = path.split('#')[0].replace(/\/$/, '');
    const cleanCurrentPath = currentPath.replace(/\/$/, '');
    if (cleanPath === '' && cleanCurrentPath === '') return true;
    if (cleanPath === '') return false;
    return cleanCurrentPath === cleanPath || cleanCurrentPath.startsWith(cleanPath + '/');
  };

  const isLinkActive = (link) => {
    if (isPathActive(link.path)) return true;
    if (link.megaMenu?.some(item => isPathActive(item.path))) return true;
    if (link.megaMenuSections?.some(section => 
      section.items.some(item => isPathActive(item.path))
    )) return true;
    return false;
  };


  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/nav_links.json`)
      .then(res => res.json())
      .then(data => setNavLinks(data))
      .catch(err => console.error("Error loading nav links:", err));
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <header className="fixed w-full z-50 transition-all duration-300 pt-4 lg:pt-6 pointer-events-none">
      <div className={`mx-auto transition-all duration-500 ease-in-out pointer-events-auto ${scrolled
        ? 'max-w-full px-0 -mt-4 lg:-mt-6'
        : 'max-w-[95%] lg:max-w-[90%] px-4 sm:px-6'
        }`}>
        <nav className={`transition-all bg-white duration-500 ease-in-out ${scrolled
          ? 'shadow-xl py-3 px-6 lg:px-10 border-b border-gray-100 rounded-none'
          : 'backdrop-blur-md shadow-lg py-3 lg:py-4 px-6 lg:px-10 rounded-[2rem] lg:rounded-full border border-white/20'
          }`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}MOC-Jillellamudi-Banner-Naac-B.png`}
                alt="MOC Banner"
                className={`hidden 2xl:block transition-all duration-300 object-contain ${scrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
              />
              <div className='2xl:hidden flex flex-row items-center gap-3'>
                <img
                  src={`${import.meta.env.BASE_URL}MOC_Logo.png`}
                  alt="MOC Logo"
                  className={`transition-all duration-300 object-contain ${scrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
                />
                <span className="block lg:hidden min-[1210px]:block text-brand-primary font-bold text-[16px] lg:text-[20px]">Matrusri Oriental <br /> College</span>
              </div>
            </Link>

            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden lg:flex items-center ml-auto mr-4">
              <div className="flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => (
                  <DesktopNavItem
                    key={link.name}
                    link={link}
                    activeMegaMenu={activeMegaMenu}
                    setActiveMegaMenu={setActiveMegaMenu}
                    currentPath={currentPath}
                  />
                ))}
              </div>
            </div>



            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-brand-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {isOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 pointer-events-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.megaMenu ? (
                      <div>
                        <button
                          onClick={() => setActiveMegaMenu(activeMegaMenu === link.name ? null : link.name)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold transition-colors ${isLinkActive(link) ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-900 hover:bg-brand-primary/5 hover:text-brand-primary'}`}
                        >
                          {link.name}
                          <HiChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeMegaMenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50/50 rounded-xl mx-2"
                            >
                              {link.megaMenu?.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="flex items-center px-6 py-3 text-sm transition-colors text-gray-600 hover:text-brand-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="mr-3 text-brand-primary/60">{iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-4 h-4" }) : null}</span>
                                  {item.name}
                                </Link>
                              ))}

                              {/* Render Sections in Mobile */}
                              {link.megaMenuSections?.map((section) => (
                                <div key={section.title} className="mt-4 pt-4 border-t border-gray-100">
                                  <p className="px-6 mb-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">{section.title}</p>
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className="flex items-center px-6 py-3 text-sm transition-colors text-gray-600 hover:text-brand-primary"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <span className="mr-3 text-brand-primary/60">{iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-4 h-4" }) : null}</span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${isPathActive(link.path) ? 'bg-brand-primary text-white' : 'text-gray-900 hover:bg-brand-primary/5 hover:text-brand-primary'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
