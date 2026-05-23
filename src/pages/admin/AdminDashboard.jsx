import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiUsers, 
  HiDocumentText, 
  HiCalendar,
  HiClock,
  HiChevronRight
} from 'react-icons/hi';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-extrabold text-gray-900 mt-1">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Blogs', value: '24', icon: HiDocumentText, color: 'bg-blue-500', trend: 12 },
    { title: 'Events This Month', value: '8', icon: HiCalendar, color: 'bg-purple-500', trend: 5 },
    { title: 'Active Students', value: '1,250', icon: HiUsers, color: 'bg-orange-500', trend: 8 },
    { title: 'Avg. Engagement', value: '85%', icon: HiTrendingUp, color: 'bg-green-500', trend: 15 },
  ];

  const recentActivity = [
    { id: 1, action: 'New Blog Post', target: 'Annual Day Celebrations 2026', time: '2 hours ago', user: 'Admin' },
    { id: 2, action: 'Updated Calendar', target: 'Semester End Exams Schedule', time: '5 hours ago', user: 'Principal' },
    { id: 3, action: 'New Event Added', target: 'Sanskrit Workshop', time: 'Yesterday', user: 'Admin' },
    { id: 4, action: 'Deleted Draft', target: 'Test Article', time: '2 days ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Here's what's happening at Matrusri Oriental College today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-brand-primary text-sm font-semibold hover:underline flex items-center">
              View All <HiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
                  <HiClock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    {item.action}: <span className="text-brand-primary font-medium">{item.target}</span>
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>{item.time}</span>
                    <span className="mx-2">•</span>
                    <span>by {item.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Actions */}
        <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-4 rounded-2xl bg-brand-primary/5 text-brand-primary font-bold hover:bg-brand-primary/10 transition-colors flex justify-between items-center group">
              <span>Create New Blog</span>
              <HiDocumentText className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-full text-left px-4 py-4 rounded-2xl bg-purple-50 text-purple-600 font-bold hover:bg-purple-100 transition-colors flex justify-between items-center group">
              <span>Add Event</span>
              <HiCalendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-full text-left px-4 py-4 rounded-2xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 transition-colors flex justify-between items-center group">
              <span>Update Schedule</span>
              <HiClock className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-gray-900 text-white relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Storage Usage</p>
                <p className="text-xl font-bold mt-1">45.2 GB <span className="text-xs font-normal text-gray-500">/ 100 GB</span></p>
                <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary w-[45%] rounded-full"></div>
                </div>
             </div>
             <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-brand-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
