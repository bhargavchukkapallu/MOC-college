import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiCalendar, 
  HiPlus, 
  HiPencilAlt, 
  HiTrash,
  HiClock,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchCalendar = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('json_data/academic_calendar.json');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching calendar:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Calendar</h1>
          <p className="text-gray-500 mt-1">Manage important dates, holidays, and exam schedules.</p>
        </div>
        <button className="flex items-center justify-center px-4 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all">
          <HiPlus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View (Simple List) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">{months[currentMonth]} {currentYear}</h2>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                  <HiChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                  <HiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {isLoading ? (
               <div className="py-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {events.filter(e => e.month === months[currentMonth]).map((event, idx) => (
                  <div key={idx} className="flex items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                    <div className="h-12 w-12 rounded-xl bg-brand-primary/5 text-brand-primary flex flex-col items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-sm font-bold">{event.date.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{event.event}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <HiClock className="h-3 w-3 mr-1" />
                        <span>All Day Event</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors">
                        <HiPencilAlt className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {events.filter(e => e.month === months[currentMonth]).length === 0 && (
                   <div className="py-12 text-center text-gray-400 italic">
                    No events scheduled for this month.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Categories/Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Event Types</h3>
            <div className="space-y-3">
              {[
                { name: 'Holidays', count: 12, color: 'bg-red-500' },
                { name: 'Examinations', count: 4, color: 'bg-orange-500' },
                { name: 'Academic Events', count: 18, color: 'bg-brand-primary' },
                { name: 'Cultural', count: 6, color: 'bg-purple-500' }
              ].map((type) => (
                <div key={type.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${type.color} mr-3`}></div>
                    <span className="text-sm text-gray-600">{type.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{type.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl p-6 text-white shadow-xl shadow-brand-primary/20">
            <HiCalendar className="h-8 w-8 mb-4 opacity-50" />
            <h3 className="font-bold text-lg leading-tight">Calendar Sync Active</h3>
            <p className="text-xs text-white/70 mt-2">All changes made here are automatically synced with the public website calendar.</p>
            <button className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-all">
              Download PDF Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
