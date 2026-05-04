import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const Breadcrumbs = ({ customLinks, variant = 'dark', align }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are on the home page, don't show breadcrumbs
  if (location.pathname === '/' || pathnames.length === 0) return null;

  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white/60' : 'text-gray-400';
  const hoverColor = isDark ? 'hover:text-brand-secondary' : 'hover:text-brand-primary';
  const separatorColor = isDark ? 'text-white/30' : 'text-gray-300';
  const activeColor = isDark ? 'text-brand-secondary' : 'text-brand-primary';

  // Default alignment: center for dark (banner style), start for light (content style)
  const effectiveAlign = align || (isDark ? 'center' : 'start');
  const alignmentClass = effectiveAlign === 'center' ? 'justify-center' : effectiveAlign === 'end' ? 'justify-end' : 'justify-start';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`flex items-center ${alignmentClass} space-x-2 mb-6`}
    >
      <Link
        to="/"
        className={`flex items-center ${textColor} ${hoverColor} transition-colors group`}
      >
        <HiHome className="w-4 h-4 mr-1.5" />
        <span className="text-sm font-bold uppercase tracking-widest">Home</span>
      </Link>

      {customLinks ? (
        customLinks.map((link, index) => (
          <React.Fragment key={index}>
            <HiChevronRight className={`w-3.5 h-3.5 ${separatorColor}`} />
            {link.to ? (
              <Link
                to={link.to}
                className={`${textColor} ${hoverColor} transition-colors text-sm font-bold uppercase tracking-widest`}
              >
                {link.label}
              </Link>
            ) : (
              <span className={`${activeColor} text-sm font-bold uppercase tracking-widest`}>
                {link.label}
              </span>
            )}
          </React.Fragment>
        ))
      ) : (
        pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          // Format the label (e.g., "about" -> "About", "article-detail" -> "Article Detail")
          const label = value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={to}>
              <HiChevronRight className={`w-3.5 h-3.5 ${separatorColor}`} />
              {last ? (
                <span className={`${activeColor} text-sm font-bold uppercase tracking-widest`}>
                  {label}
                </span>
              ) : (
                <Link
                  to={to}
                  className={`${textColor} ${hoverColor} transition-colors text-sm font-bold uppercase tracking-widest`}
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })
      )}
    </motion.nav>
  );
};

export default Breadcrumbs;
