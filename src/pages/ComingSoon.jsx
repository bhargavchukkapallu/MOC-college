import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowLeft, 
  HiEnvelope, 
  HiCheckCircle, 
  HiSparkles,
  HiClock,
  HiAcademicCap,
  HiChartBar,
  HiCpuChip
} from 'react-icons/hi2';

const ComingSoon = ({ isAdmin: propIsAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Check if we are inside the admin portal
  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : location.pathname.startsWith('/admin');

  // Handle email subscription submit
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubscribed(true);
    setEmail('');
    
    // Auto-reset success message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  // Define component animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const blobVariants = {
    animate1: {
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    animate2: {
      x: [0, -30, 20, 0],
      y: [0, 40, -20, 0],
      scale: [1, 0.9, 1.1, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isAdmin) {
    // Admin Portal Layout (integrated card style)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary to-purple-500"></div>

          {/* Module Icon */}
          <motion.div 
            variants={itemVariants}
            className="mx-auto w-20 h-20 bg-brand-primary/5 rounded-[2rem] flex items-center justify-center text-brand-primary mb-6"
          >
            <HiCpuChip className="w-10 h-10 animate-pulse text-brand-primary" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight"
          >
            Module Under Construction
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed max-w-md mx-auto"
          >
            This management module is scheduled for implementation in our upcoming system update.
          </motion.p>

          {/* Development Status Tracker */}
          <motion.div 
            variants={itemVariants}
            className="my-8 p-6 bg-gray-50/80 rounded-2xl border border-gray-100/50 max-w-lg mx-auto"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Development Progress</span>
              <span className="text-xs font-bold text-brand-primary">75% Complete</span>
            </div>
            <div className="w-full h-3 bg-gray-200/60 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-primary to-purple-500 rounded-full shadow-inner"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
              Phase 2: Database Syncing
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all hover:scale-105 duration-200"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Public Portal Layout (full glassmorphism aesthetic)
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#f3f7ff] to-white">
      {/* Dynamic Animated Blobs for Premium Visual Depth */}
      <motion.div 
        variants={blobVariants}
        animate="animate1"
        className="absolute top-1/4 left-1/10 w-72 md:w-96 h-72 md:h-96 rounded-full bg-brand-primary/10 blur-[60px] md:blur-[100px] pointer-events-none"
      />
      <motion.div 
        variants={blobVariants}
        animate="animate2"
        className="absolute bottom-1/4 right-1/10 w-80 md:w-[28rem] h-80 md:h-[28rem] rounded-full bg-purple-500/10 blur-[80px] md:blur-[120px] pointer-events-none"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl rounded-[3rem] border border-white/40 bg-white/30 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] p-8 md:p-16 text-center"
      >
        {/* Floating Sparkles Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm text-brand-primary text-xs font-bold uppercase tracking-wider mb-8 hover:scale-105 transition-transform"
        >
          <HiSparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          Under Active Design
        </motion.div>

        {/* Dynamic Header Icon */}
        <motion.div 
          variants={itemVariants}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-brand-primary to-purple-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 mb-8 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <HiClock className="w-12 h-12" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none mb-4"
        >
          Designing the <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-purple-600">Future of Education</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
        >
          Our team is currently polishing a modern, interactive learning suite here. Be the first to know when we publish this page.
        </motion.p>

        {/* Email Subscription Area */}
        <motion.div 
          variants={itemVariants}
          className="max-w-md mx-auto mb-10"
        >
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form 
                key="subscribe-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-md focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all duration-300"
              >
                <div className="flex-1 flex items-center px-3 gap-2">
                  <HiEnvelope className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full py-2 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/25 active:scale-98 transition-all shrink-0 cursor-pointer"
                >
                  Notify Me
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="subscribe-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl shadow-sm"
              >
                <HiCheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-bold">Successfully subscribed! We'll keep you updated.</span>
              </motion.div>
            )}
          </AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs font-bold mt-2 text-left pl-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Back Link Option */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer group"
          >
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Homepage
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
