import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    title: "Admissions Open for 2025",
    date: "May 01, 2025",
    type: "new",
    desc: "Applications are now open for BA, B.Com, and traditional Oriental studies courses."
  },
  {
    id: 2,
    title: "Sanskrit Workshop",
    date: "May 10, 2025",
    type: "event",
    desc: "Join our 3-day intensive workshop on spoken Sanskrit and ancient literature."
  },
  {
    id: 3,
    title: "Exam Timetable Released",
    date: "April 28, 2025",
    type: "update",
    desc: "Semester end examination schedule is now available on the student portal."
  }
];

const FloatingNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 group flex flex-col items-center justify-center focus:outline-none cursor-pointer"
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Animated pulse for unread */}
          {hasUnread && (
            <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-60"></div>
          )}
          
          {/* Icon Wrapper */}
          <div className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 transition-colors duration-300 ${
            isOpen ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-brand-primary/30 text-brand-primary group-hover:border-brand-primary'
          }`}>
            <motion.div
              animate={{ rotate: hasUnread ? [0, -20, 20, -15, 15, 0] : 0 }}
              transition={{ duration: 1, repeat: hasUnread ? Infinity : 0, repeatDelay: 2 }}
              className="origin-top"
            >
              <Bell className="w-7 h-7" />
            </motion.div>
            
            {/* Numeric Unread Badge */}
            {hasUnread && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-white text-[10px] font-black leading-none">{notifications.length}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tooltip */}
        <span className="mt-2 px-3 py-1 bg-brand-dark text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1">
          Updates
        </span>
      </motion.button>

      {/* Notifications Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[55]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              style={{ originX: 0, originY: 1 }}
              className="fixed bottom-[110px] left-6 z-[60] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 w-[calc(100vw-3rem)] sm:w-[380px] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-brand-dark p-6 flex justify-between items-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-brand-secondary" />
                    <h3 className="font-bold text-lg">News & Updates</h3>
                  </div>
                  <p className="text-gray-400 text-xs">Stay connected with MOC</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* List */}
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                {notifications.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.id}
                    className="p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${
                        item.type === 'new' ? 'bg-green-100 text-green-700' :
                        item.type === 'event' ? 'bg-brand-secondary/20 text-brand-dark' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-dark transition-colors"
                >
                  View All Announcements <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNotifications;
