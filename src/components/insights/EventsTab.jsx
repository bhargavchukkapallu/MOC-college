import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Search, X, Share2, Bookmark } from 'lucide-react';

const EventsTab = ({ events, searchQuery, direction }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  return (
    <>
      <motion.div
        key="events-view"
        initial={{ opacity: 0, x: direction * 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 50 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {events.length > 0 ? events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedEvent(event)}
            className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-brand-primary/20 z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={`${import.meta.env.BASE_URL}images/${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur text-brand-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                {event.title}
              </h3>
              <div className="flex justify-between items-center gap-3 mb-6 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                {event.description}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between w-full font-bold text-brand-primary group/btn hover:text-brand-dark transition-colors">
                  <span className="relative overflow-hidden w-full text-left">
                    <span className="block group-hover/btn:-translate-y-full transition-transform duration-300">View Details</span>
                    <span className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">View Details</span>
                  </span>
                  <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
              <Search className="w-8 h-8 text-brand-primary/40" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">No events found</h3>
            <p className="text-gray-500">We couldn't find any events matching "{searchQuery}"</p>
          </div>
        )}
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-[100]"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 lg:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden relative flex flex-col lg:flex-row shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-brand-dark rounded-full transition-all duration-300 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Visual Sidebar */}
                <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${selectedEvent.image}`} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10 text-white">
                    <span className="px-4 py-1.5 bg-brand-secondary text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg">
                      {selectedEvent.category}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-black leading-tight uppercase">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>

                {/* Reading Area */}
                <div className="lg:w-3/5 overflow-y-auto p-8 lg:p-16 custom-scrollbar bg-white">
                  <div className="max-w-2xl mx-auto">
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-100 pb-8">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-primary" />
                        {selectedEvent.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        {selectedEvent.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-primary" />
                        {selectedEvent.location}
                      </span>
                    </div>

                    {/* Content */}
                    <div 
                      className="prose prose-lg prose-brand max-w-none text-gray-600 leading-relaxed font-medium space-y-6"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.fullContent || selectedEvent.description }}
                    />

                    {/* Gallery */}
                    {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-black text-brand-dark mb-6 uppercase tracking-wider">Event Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedEvent.gallery.slice(0, 6).map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                              <img
                                src={`${import.meta.env.BASE_URL}images/${img}`}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Modal Footer Actions */}
                    <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-dark hover:text-brand-primary transition-colors">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-dark hover:text-brand-primary transition-colors">
                          <Bookmark className="w-4 h-4" /> Save
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedEvent(null)}
                        className="bg-brand-primary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-dark transition-colors shadow-lg"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventsTab;
