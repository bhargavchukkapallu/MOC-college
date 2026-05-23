import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiViewGrid, 
  HiNewspaper, 
  HiCalendar, 
  HiLogout, 
  HiMenuAlt2, 
  HiX, 
  HiChevronRight,
  HiBell,
  HiUserCircle,
  HiChevronDown,
  HiUsers,
  HiUserGroup,
  HiBookOpen,
  HiClipboardList
} from 'react-icons/hi';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HiViewGrid },
    { 
      name: 'Faculty Management', 
      path: '/admin/faculty', 
      icon: HiUsers,
      subItems: [
        { name: 'Profiles', path: '/admin/faculty/profiles' },
        { name: 'Departments', path: '/admin/faculty/departments' },
        { name: 'Attendance & Workload', path: '/admin/faculty/attendance' },
        { name: 'Roles & Permissions', path: '/admin/faculty/roles' },
      ]
    },
    { 
      name: 'Student Management', 
      path: '/admin/students', 
      icon: HiUserGroup,
      subItems: [
        { name: 'Admissions', path: '/admin/students/admissions' },
        { name: 'Profiles & Records', path: '/admin/students/profiles' },
        { name: 'Attendance', path: '/admin/students/attendance' },
        { name: 'Academic Performance', path: '/admin/students/performance' },
        { name: 'Parent Info', path: '/admin/students/parents' },
      ]
    },
    { 
      name: 'Insights', 
      path: '/admin/insights', 
      icon: HiNewspaper,
      subItems: [
        { name: 'Blog Articles', path: '/admin/insights/blogs' },
        { name: 'Events', path: '/admin/insights/events' },
      ]
    },
    { 
      name: 'Classes & Syllabus', 
      path: '/admin/classes', 
      icon: HiBookOpen,
      subItems: [
        { name: 'Class Management', path: '/admin/classes/manage' },
        { name: 'Subject Allocation', path: '/admin/classes/subjects' },
        { name: 'Syllabus Tracking', path: '/admin/classes/syllabus' },
      ]
    },
    { 
      name: 'Lesson Plan', 
      path: '/admin/lesson-plans', 
      icon: HiClipboardList,
      subItems: [
        { name: 'Manage Plans', path: '/admin/lesson-plans/manage' },
        { name: 'Scheduling', path: '/admin/lesson-plans/scheduling' },
        { name: 'Progress Monitoring', path: '/admin/lesson-plans/progress' },
      ]
    },
    { 
      name: 'Academic Calendar', 
      path: '/admin/calendar', 
      icon: HiCalendar,
      subItems: [
        { name: 'Year Schedules', path: '/admin/calendar/schedules' },
        { name: 'Holidays & Exams', path: '/admin/calendar/events' },
      ]
    },
  ];

  const [openMenu, setOpenMenu] = useState(() => {
    const activeItem = navItems.find(item => item.path !== '/admin' && location.pathname.startsWith(item.path));
    return activeItem ? activeItem.name : null;
  });

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-20 flex items-center px-6 border-b border-gray-50">
            <img src={`${import.meta.env.BASE_URL}MOC_Logo.png`} alt="Logo" className="h-10 w-auto mr-3" />
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">MOC Admin</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Management Suite</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isActive = item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path);
              const isOpen = openMenu === item.name;

              return (
                <div key={item.path} className="mb-1">
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all group ${
                        isActive 
                        ? 'bg-brand-primary/10 text-brand-primary' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-primary'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-400 group-hover:text-brand-primary'}`} />
                        <span>{item.name}</span>
                      </div>
                      <HiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      className={({ isActive: linkActive }) => 
                        `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${
                          linkActive 
                          ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-brand-primary'
                        }`
                      }
                    >
                      {({ isActive: linkActive }) => (
                        <>
                          <item.icon className={`h-5 w-5 mr-3 transition-colors ${linkActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-primary'}`} />
                          <span className="flex-1">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  )}

                  <AnimatePresence>
                    {hasSubItems && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 pl-11 pr-4 space-y-1">
                          {item.subItems.map(sub => (
                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              className={({ isActive: subActive }) => 
                                `block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                  subActive 
                                  ? 'bg-brand-primary/10 text-brand-primary font-semibold' 
                                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                              }
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Bottom Profile/Logout for Mobile Sidebar */}
          <div className="p-4 border-t border-gray-50 lg:hidden">
             <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-colors"
            >
              <HiLogout className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-40">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 lg:hidden"
            >
              {isSidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt2 className="h-6 w-6" />}
            </button>
            <div className="ml-4 lg:ml-0">
              <h2 className="text-xl font-bold text-gray-900 hidden sm:block">Welcome back, {user?.name.split(' ')[0]}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-gray-50 rounded-full transition-all relative">
              <HiBell className="h-6 w-6" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
              >
                <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <HiUserCircle className="h-8 w-8" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-900 leading-none">{user?.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{user?.role}</p>
                </div>
                <HiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-0" 
                      onClick={() => setIsProfileOpen(false)}
                    ></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        My Profile
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Settings
                      </button>
                      <hr className="my-1 border-gray-50" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
