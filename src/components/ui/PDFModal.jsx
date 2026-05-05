import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

const PDFModal = ({ isOpen, onClose, pdfUrl, title }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Ensure pdfUrl starts with base URL if needed, but since it's in public, 
  // /pdfs/... works fine in most cases. 
  // import.meta.env.BASE_URL is safer.
  const fullPdfUrl = `${import.meta.env.BASE_URL}${pdfUrl}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full h-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:px-8 md:py-6 border-b border-gray-100 bg-white">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-brand-dark">{title}</h3>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Course Syllabus</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-primary transition-all active:scale-90"
                aria-label="Close modal"
              >
                <HiXMark className="w-8 h-8" />
              </button>
            </div>

            {/* Content - PDF Viewer */}
            <div className="flex-grow bg-gray-100 relative">
              <iframe
                src={`${fullPdfUrl}#toolbar=0`}
                title={title}
                className="w-full h-full border-none"
              />
            </div>

            {/* Footer / Info */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Matrusri Oriental College - Academic Excellence
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
