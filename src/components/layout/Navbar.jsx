import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, MessageSquare, GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'About Us',
    path: '/about',
    megaMenu: [
      { name: 'Brief History', path: '/about#history', icon: <BookOpen className="w-5 h-5 text-brand-primary" /> },
      { name: 'Trust', path: '/about#trust', icon: <Users className="w-5 h-5 text-brand-primary" /> },
      { name: 'Vision & Mission', path: '/about#vision', icon: <MessageSquare className="w-5 h-5 text-brand-primary" /> },
      { name: 'Principal’s Desk', path: '/about#principal', icon: <GraduationCap className="w-5 h-5 text-brand-primary" /> },
      { name: 'Correspondents', path: '/about#correspondents', icon: <Users className="w-5 h-5 text-brand-primary" /> },
      { name: 'Affiliations', path: '/about#affiliations', icon: <BookOpen className="w-5 h-5 text-brand-primary" /> },
      { name: 'Staff Details', path: '/about#staff', icon: <Users className="w-5 h-5 text-brand-primary" /> },
    ]
  },
  {
    name: 'Academics',
    path: '/academics',
    megaMenu: [
      { name: 'Programs Offered', path: '/academics#programs', icon: <GraduationCap className="w-5 h-5 text-brand-primary" /> },
      { name: 'Library', path: '/academics#library', icon: <BookOpen className="w-5 h-5 text-brand-primary" /> },
      { name: 'Computer Lab', path: '/academics#computer-lab', icon: <Menu className="w-5 h-5 text-brand-primary" /> },
    ]
  },
  {
    name: 'Quality & Support',
    path: '/student-support',
    megaMenu: [
      { name: 'IQAC', path: '/student-support#iqac', icon: <BookOpen className="w-5 h-5 text-brand-primary" /> },
      { name: 'NAAC', path: '/student-support#naac', icon: <GraduationCap className="w-5 h-5 text-brand-primary" /> },
      { name: 'Student Support', path: '/student-support#support', icon: <Users className="w-5 h-5 text-brand-primary" /> },
    ]
  },
  { name: 'Events & Blog', path: '/events' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
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
          ? 'shadow-xl p-3 border-b border-gray-100 rounded-none'
          : 'backdrop-blur-md shadow-lg py-3 lg:py-4 px-6 lg:px-10 rounded-[2rem] lg:rounded-full border border-white/20'
          }`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}MOC-Jillellamudi-Banner-Naac-B.png`}
                alt="MOC Banner"
                className={`transition-all duration-300 object-contain ${scrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
              />
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
                      {link.megaMenu && <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />}
                      <motion.span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {link.megaMenu && (
                      <AnimatePresence>
                        {activeMegaMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute left-1/2 -translate-x-1/2 mt-4 w-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-2 p-5 bg-gradient-to-b from-white to-gray-50">
                              {link.megaMenu.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="flex items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group/item border border-transparent hover:border-brand-primary/10"
                                >
                                  <div className="bg-brand-primary/5 p-2.5 rounded-lg group-hover/item:bg-brand-primary group-hover/item:text-white transition-colors text-brand-primary">
                                    {React.cloneElement(item.icon, { className: "w-5 h-5 transition-colors" })}
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
                            <div className="bg-brand-primary/5 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                              <p className="text-xs text-brand-primary font-medium">
                                Matrusri Oriental College Excellence
                              </p>
                              <ArrowRight className="w-4 h-4 text-brand-primary" />
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
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeMegaMenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50/50 rounded-xl mx-2"
                            >
                              {link.megaMenu.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="flex items-center px-6 py-3 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="mr-3 text-brand-primary/60">{item.icon}</span>
                                  {item.name}
                                </Link>
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
