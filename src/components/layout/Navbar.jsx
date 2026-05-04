import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);

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
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => link.megaMenu ? setActiveMegaMenu(link.name) : setActiveMegaMenu(null)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center px-3 xl:px-4 py-2 text-[15px] font-bold text-gray-800 hover:text-brand-primary transition-colors relative"
                    >
                      {link.name}
                      {link.megaMenu && <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />}
                      <motion.span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {(link.megaMenu || link.megaMenuSections) && (
                      <AnimatePresence>
                        {activeMegaMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`absolute left-1/2 -translate-x-1/2 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-max max-w-[calc(100vw-40px)] min-w-[500px]`}
                          >
                            <div className="flex items-stretch bg-gradient-to-b from-white to-gray-50">
                              {/* Main Mega Menu Items */}
                              <div className={`flex flex-col p-6 h-full ${link.megaMenuSections ? 'min-w-[450px] border-r border-gray-100' : 'w-full'}`}>
                                <h3 className="text-[14px] font-black text-brand-primary uppercase tracking-[0.2em] border-b border-brand-primary/10 pb-2 mb-4 mx-2">
                                  {link.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                  {link.megaMenu?.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className="flex items-center p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group/item border border-transparent hover:border-brand-primary/10"
                                    >
                                      <div className="bg-brand-primary/5 p-2.5 rounded-lg group-hover/item:bg-brand-primary group-hover/item:text-white transition-colors text-brand-primary">
                                        {iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-5 h-5 transition-colors" }) : null}
                                      </div>
                                      <div className="ml-3 text-left">
                                        <p className="text-[14px] font-bold text-gray-900 group-hover/item:text-brand-primary transition-colors">
                                          {item.name}
                                        </p>
                                        <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">Explore our {item.name.toLowerCase()}</p>
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
                                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group/subitem border border-transparent hover:border-brand-primary/5"
                                            >
                                              <div className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-brand-primary/60 group-hover/subitem:text-brand-primary group-hover/subitem:scale-110 transition-all shadow-sm">
                                                {iconMap[item.icon] ? React.cloneElement(iconMap[item.icon], { className: "w-3.5 h-3.5" }) : null}
                                              </div>
                                              <span className="text-[14px] font-bold text-gray-700 group-hover/subitem:text-brand-primary transition-colors leading-tight">
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
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold text-gray-900 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors"
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
                                  className="flex items-center px-6 py-3 text-sm text-gray-600 hover:text-brand-primary transition-colors"
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
                                      className="flex items-center px-6 py-3 text-sm text-gray-600 hover:text-brand-primary transition-colors"
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
                        className="block px-4 py-3 rounded-xl text-base font-bold text-gray-900 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors"
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
