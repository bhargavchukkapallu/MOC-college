import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Info */}
          <div>
            <div className="mb-6 bg-white/95 p-1 rounded-full inline-block">
              <img src={`${import.meta.env.BASE_URL}MOC_Logo.png`} alt="MOC Banner" className="h-24 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A Premier Educational Institution inaugurated by Viswajanani Jillellamudi AMMA on August 6, 1971. Emphasizing classical languages and modern education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-secondary inline-block rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/academics" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Programs Offered</Link></li>
              <li><Link to="/student-support#iqac" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">IQAC</Link></li>
              <li><Link to="/student-support#naac" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">NAAC</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-secondary inline-block rounded-full"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              <li><Link to="/academics#library" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Central Library</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Alumni Registration</a></li>
              <li><Link to="/student-support" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Student Support</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">Feedback</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">RTI</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-secondary inline-block rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>Jillellamudi, Bapatla District,<br />Andhra Pradesh, India - 522113</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <span>+91 77889 90685, +91 94409 54934</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <a href="mailto:info@mocjillellamudi.ac.in" className="hover:text-brand-secondary transition-colors">info@mocjillellamudi.ac.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Matrusri Oriental College. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
