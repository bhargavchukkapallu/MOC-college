import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, MessageSquare, GraduationCap, Users, BookOpen } from 'lucide-react';

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

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-0 sm:pe-6">
        <div className="flex justify-between items-center py-3 min-h-[5rem]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:gap-5">
            <img src="/MOC_Logo.png" alt="MOC Logo" className="h-16 md:h-24 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl md:text-2xl text-brand-primary leading-tight">Matrusri</span>
              <span className="text-xs md:text-sm text-brand-secondary font-bold uppercase tracking-widest mt-0.5">Oriental College</span>
            </div>
            <img src="/MOC-Naac-B.png" alt="MOC-Naac-B" className="h-16 md:h-24 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.megaMenu ? setActiveMegaMenu(link.name) : setActiveMegaMenu(null)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={link.path}
                  className="flex items-center text-gray-700 hover:text-brand-primary font-medium transition-colors py-2"
                >
                  {link.name}
                  {link.megaMenu && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.megaMenu && (
                  <AnimatePresence>
                    {activeMegaMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-2 p-4">
                          {link.megaMenu.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                            >
                              <div className="mt-0.5 bg-brand-light p-2 rounded-md group-hover/item:bg-white transition-colors">
                                {item.icon}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 group-hover/item:text-brand-primary transition-colors">
                                  {item.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-brand-light px-6 py-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Explore more about {link.name.toLowerCase()} at MOC.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-primary focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:text-brand-primary hover:bg-gray-50"
                    onClick={() => !link.megaMenu && setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.megaMenu && (
                    <div className="pl-6 space-y-1 mb-2">
                      {link.megaMenu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
