import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiCalendarDays, HiClock, HiMapPin, HiArrowRight, HiMagnifyingGlass } from 'react-icons/hi2';

const EventsTab = ({ events, searchQuery, direction, isSidebarLayout }) => {
  const navigate = useNavigate();

  return (
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
          onClick={() => navigate(`/insights/events/${event.id}`)}
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
                <HiCalendarDays className="w-4 h-4 text-brand-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiClock className="w-4 h-4 text-brand-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiMapPin className="w-4 h-4 text-brand-primary" />
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
                <HiArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      )) : (
        <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
            <HiMagnifyingGlass className="w-8 h-8 text-brand-primary/40" />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">No events found</h3>
          <p className="text-gray-500">We couldn't find any events matching "{searchQuery}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default EventsTab;
