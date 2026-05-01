import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const FloatingFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setFormData({ name: '', email: '', type: 'general', message: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 group flex flex-col items-center justify-center focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute inset-0 bg-brand-secondary rounded-full animate-ping opacity-70"></div>

          {/* Namaste Character Icon */}
          <div className="relative w-28 h-28 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 border-brand-secondary/30 group-hover:border-brand-secondary transition-colors duration-300">
            <img
              src={`${import.meta.env.BASE_URL}namaste_icon.png`}
              alt="Feedback"
              className="w-[140%] h-[140%] object-cover object-center"
              title="Namaste! Click to share feedback"
            />
          </div>
        </div>

        {/* Tooltip */}
        <span className="mt-2 px-3 py-1 bg-brand-dark text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1">
          Namaste! Feedback
        </span>
      </motion.button>

      {/* Feedback Popover */}
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
              style={{ originX: 1, originY: 1 }}
              className="fixed bottom-[160px] right-6 z-[60] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 w-[calc(100vw-3rem)] sm:w-[400px] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-primary to-blue-800 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden p-1">
                    <img src={`${import.meta.env.BASE_URL}namaste_icon.png`} alt="Namaste" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Share Your Feedback</h3>
                    <p className="text-blue-100 text-xs">Namaste! We value your thoughts.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                    <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-shadow"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-shadow"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-shadow bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="academic">Academic Feedback</option>
                        <option value="facilities">Facilities & Infrastructure</option>
                        <option value="website">Website Suggestion</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-shadow resize-none"
                        placeholder="Please share your detailed feedback here..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFeedback;
