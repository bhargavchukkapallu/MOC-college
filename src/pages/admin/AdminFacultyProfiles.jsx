import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiUsers,
  HiUserPlus,
  HiMagnifyingGlass,
  HiFunnel,
  HiListBullet,
  HiSquares2X2,
  HiXMark,
  HiEnvelope,
  HiPhone,
  HiCalendarDays,
  HiAcademicCap,
  HiClock,
  HiBriefcase,
  HiIdentification,
  HiTrash
} from 'react-icons/hi2';

// Dynamic Gradient Avatar Renderer based on name and department
const renderAvatar = (name, department, customImage) => {
  if (customImage) {
    return (
      <img
        src={customImage}
        alt={name}
        className="w-full h-full object-cover rounded-2xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ''; // Clear source to fallback to SVG on error
        }}
      />
    );
  }

  const initials = name
    .split(' ')
    .filter(n => n.length > 0)
    .map(n => n[0].toUpperCase())
    .slice(0, 2)
    .join('');

  let colors = {
    start: '#ef4444',
    end: '#b91c1c'
  };

  if (department === 'Sanskrit') {
    colors = { start: '#800000', end: '#b91c1c' }; // Crimson/Maroon
  } else if (department === 'Telugu') {
    colors = { start: '#3b82f6', end: '#1d4ed8' }; // Blue
  } else if (department === 'History') {
    colors = { start: '#f59e0b', end: '#b45309' }; // Amber/Gold
  } else if (department === 'Jyotisha') {
    colors = { start: '#10b981', end: '#047857' }; // Emerald/Green
  } else if (department === 'Vyakarana' || department === 'Sahitya' || department === 'Oriental Languages') {
    colors = { start: '#8b5cf6', end: '#6d28d9' }; // Purple
  } else {
    colors = { start: '#ec4899', end: '#be185d' }; // Pink
  }

  const gradientId = `grad-${name.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg className="w-full h-full rounded-2xl" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor={colors.start} />
          <stop offset="100%" stopColor={colors.end} />
        </radialGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill={`url(#${gradientId})`} />
      <text
        x="50"
        y="53"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="34"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
};

const initialFaculty = [
  {
    id: 'FAC001',
    name: 'Dr. M. Sitaramaiah',
    designation: 'Principal & Professor',
    department: 'Sanskrit',
    email: 'principal@moc.edu.in',
    phone: '+91 94405 12345',
    qualification: 'Ph.D. in Sanskrit, Vyakarana Sastra',
    experience: '28 Years',
    joiningDate: '1998-07-10',
    bio: 'Renowned scholar in Vyakarana and Classical Sanskrit literature. Over 30 published papers and recipient of state awards for Sanskrit propagation.',
    image: `${import.meta.env.BASE_URL}images/principal_portrait.png`
  },
  {
    id: 'FAC002',
    name: 'Dr. K. Srinivasa Sastry',
    designation: 'HOD & Associate Professor',
    department: 'Sanskrit',
    email: 'k.srinivas@moc.edu.in',
    phone: '+91 98480 98765',
    qualification: 'Ph.D., Sahitya Acharya',
    experience: '18 Years',
    joiningDate: '2008-06-12',
    bio: 'Specializes in Sanskrit drama and aesthetics. Conducts workshops on Sanskrit conversation and spoken Sanskrit.',
    image: null
  },
  {
    id: 'FAC003',
    name: 'Smt. P. Satyavathi',
    designation: 'HOD & Associate Professor',
    department: 'Telugu',
    email: 'p.satyavathi@moc.edu.in',
    phone: '+91 99088 11223',
    qualification: 'M.A., M.Phil. in Telugu Literature',
    experience: '16 Years',
    joiningDate: '2010-08-01',
    bio: 'Expert in classical Telugu poetry and grammar. Actively coordinates cultural events and literary forums.',
    image: `${import.meta.env.BASE_URL}images/amma_portrait.png`
  },
  {
    id: 'FAC004',
    name: 'Sri B. Venkata Rao',
    designation: 'HOD & Assistant Professor',
    department: 'History',
    email: 'b.venkatrao@moc.edu.in',
    phone: '+91 95503 44556',
    qualification: 'M.A. in History, B.Ed.',
    experience: '12 Years',
    joiningDate: '2014-06-20',
    bio: 'Teaches Ancient Indian History and Cultural Heritage. Leads students on archaeological tours and heritage projects.',
    image: null
  },
  {
    id: 'FAC005',
    name: 'Sri V. Ramakrishna',
    designation: 'Lecturer',
    department: 'Sanskrit',
    email: 'v.ramakrishna@moc.edu.in',
    phone: '+91 88860 77889',
    qualification: 'M.A. in Sanskrit, Vyakarana Acharya',
    experience: '6 Years',
    joiningDate: '2020-11-01',
    bio: 'Focuses on teaching fundamental Sanskrit grammar and classical texts to undergraduate classes.',
    image: null
  },
  {
    id: 'FAC006',
    name: 'Sri S. Narayana Sarma',
    designation: 'Lecturer',
    department: 'Jyotisha',
    email: 's.narayana@moc.edu.in',
    phone: '+91 77760 99001',
    qualification: 'M.A. in Jyotisha, Ph.D. (Pursuing)',
    experience: '8 Years',
    joiningDate: '2018-07-15',
    bio: 'Specializes in mathematical astronomy and traditional Indian horoscopy. Published multiple articles in local journals.',
    image: null
  }
];

const AdminFacultyProfiles = () => {
  const [facultyList, setFacultyList] = useState(initialFaculty);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Modals state
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Add Faculty Form state
  const [formValues, setFormValues] = useState({
    name: '',
    designation: '',
    department: 'Sanskrit',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    bio: '',
    image: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  const departments = ['All', 'Sanskrit', 'Telugu', 'History', 'Jyotisha', 'Oriental Languages'];

  // Real-time filtering logic
  const filteredFaculty = useMemo(() => {
    return facultyList.filter(item => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.qualification.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchDept = selectedDept === 'All' || item.department === selectedDept;
      
      return matchSearch && matchDept;
    });
  }, [facultyList, searchTerm, selectedDept]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = 'Full name is required';
    if (!formValues.designation.trim()) errors.designation = 'Designation is required';
    if (!formValues.qualification.trim()) errors.qualification = 'Qualification is required';
    if (!formValues.experience.trim()) errors.experience = 'Experience is required';
    if (!formValues.joiningDate) errors.joiningDate = 'Joining date is required';
    
    // Email regex
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Enter a valid email address';
    }

    // Phone regex (simple check)
    if (!formValues.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formValues.phone)) {
      errors.phone = 'Enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFacultySubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newId = `FAC${String(facultyList.length + 1).padStart(3, '0')}`;
    const newMember = {
      id: newId,
      ...formValues,
      image: formValues.image.trim() || null
    };

    setFacultyList(prev => [...prev, newMember]);
    setIsAddModalOpen(false);
    
    // Reset Form Values
    setFormValues({
      name: '',
      designation: '',
      department: 'Sanskrit',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      joiningDate: '',
      bio: '',
      image: ''
    });
  };

  const handleDeleteFaculty = (id) => {
    if (window.confirm("Are you sure you want to delete this faculty profile?")) {
      setFacultyList(prev => prev.filter(item => item.id !== id));
      if (selectedFaculty && selectedFaculty.id === id) {
        setSelectedFaculty(null);
      }
    }
  };

  // Stagger grid animations
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary">
              <HiUsers className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight">Faculty Profiles</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Manage, filter, and review details of Matrusri Oriental College's teaching staff.
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-2xl font-bold shadow-md hover:bg-brand-primary/95 transition-all text-sm self-stretch md:self-auto justify-center"
        >
          <HiUserPlus className="h-5 w-5" />
          <span>Add Faculty</span>
        </motion.button>
      </div>

      {/* Control Panel (Search, Filters, View toggle) */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name, designation, credential..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-100 bg-[#f8faff] text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all font-medium placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <HiXMark className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters and View Toggles */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Department dropdown (as pills in larger devices) */}
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
            {departments.slice(0, 4).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDept === dept
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-primary hover:bg-white'
                }`}
              >
                {dept}
              </button>
            ))}
            {/* Simple select fallback for remaining depts to save space */}
            <select
              value={departments.includes(selectedDept) && departments.indexOf(selectedDept) >= 4 ? selectedDept : 'More'}
              onChange={(e) => {
                if (e.target.value !== 'More') setSelectedDept(e.target.value);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-none bg-transparent outline-none cursor-pointer text-gray-500 hover:text-brand-primary ${
                departments.includes(selectedDept) && departments.indexOf(selectedDept) >= 4 ? 'bg-brand-primary text-white' : ''
              }`}
            >
              <option value="More" disabled hidden>More...</option>
              {departments.slice(4).map(d => (
                <option key={d} value={d} className="text-gray-800 bg-white font-medium">{d}</option>
              ))}
            </select>
          </div>

          {/* Grid / List toggle */}
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-brand-primary shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Grid View"
            >
              <HiSquares2X2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-brand-primary shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="List View"
            >
              <HiListBullet className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid / List Contents */}
      {filteredFaculty.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <HiUsers className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-brand-dark mb-1">No Faculty Members Found</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Try adjusting your search criteria or changing your selected department filter.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* Grid View Layout */
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFaculty.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6 relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Delete option */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFaculty(item.id);
                  }}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                  title="Delete Profile"
                >
                  <HiTrash className="h-4 w-4" />
                </button>

                {/* Avatar and Info Header */}
                <div className="flex gap-4 items-start mb-5">
                  <div className="w-16 h-16 shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                    {renderAvatar(item.name, item.department, item.image)}
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-primary px-2.5 py-1 rounded-full bg-brand-primary/5 mb-1.5">
                      {item.department}
                    </span>
                    <h3 className="text-base font-black text-brand-dark leading-tight group-hover:text-brand-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">{item.designation}</p>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-2 border-t border-gray-50 pt-4 mb-6">
                  <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                    <HiAcademicCap className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                    <span className="truncate" title={item.qualification}>{item.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                    <HiClock className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                    <span>{item.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                    <HiEnvelope className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                    <a href={`mailto:${item.email}`} className="hover:underline hover:text-brand-primary truncate">{item.email}</a>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <button
                onClick={() => setSelectedFaculty(item)}
                className="w-full text-center py-3 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white rounded-2xl font-bold text-xs transition-all duration-300"
              >
                View Full Profile
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        
        /* List View Layout */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4.5 text-xs font-black uppercase text-gray-400 tracking-wider">Faculty Member</th>
                  <th className="px-6 py-4.5 text-xs font-black uppercase text-gray-400 tracking-wider">Department</th>
                  <th className="px-6 py-4.5 text-xs font-black uppercase text-gray-400 tracking-wider">Designation</th>
                  <th className="px-6 py-4.5 text-xs font-black uppercase text-gray-400 tracking-wider">Qualification</th>
                  <th className="px-6 py-4.5 text-xs font-black uppercase text-gray-400 tracking-wider">Joining Date</th>
                  <th className="px-6 py-4.5 text-right text-xs font-black uppercase text-gray-400 tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredFaculty.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0">
                          {renderAvatar(item.name, item.department, item.image)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-primary px-2.5 py-0.5 rounded-full bg-brand-primary/5">
                        {item.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">{item.designation}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium truncate max-w-[200px]" title={item.qualification}>
                      {item.qualification}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium">{item.joiningDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => setSelectedFaculty(item)}
                          className="px-3.5 py-2 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete"
                        >
                          <HiTrash className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Details View Modal */}
      <AnimatePresence>
        {selectedFaculty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFaculty(null)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-50 rounded-full transition-colors z-20"
              >
                <HiXMark className="h-6 w-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Left Side: Avatar, Experience, ID */}
                <div className="md:col-span-2 bg-gradient-to-b from-brand-primary/5 to-transparent p-8 flex flex-col items-center justify-center text-center border-r border-gray-50">
                  <div className="w-32 h-32 mb-4 shadow-md rounded-3xl relative">
                    {renderAvatar(selectedFaculty.name, selectedFaculty.department, selectedFaculty.image)}
                  </div>
                  <h4 className="text-xs font-black uppercase text-brand-primary tracking-widest">{selectedFaculty.id}</h4>
                  
                  <div className="mt-6 space-y-4 w-full text-left bg-white p-4 rounded-2xl border border-gray-50">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Total Experience</span>
                      <div className="flex items-center gap-1.5 mt-0.5 text-sm font-bold text-gray-800">
                        <HiClock className="h-4.5 w-4.5 text-brand-primary" />
                        <span>{selectedFaculty.experience}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Joining Date</span>
                      <div className="flex items-center gap-1.5 mt-0.5 text-sm font-bold text-gray-800">
                        <HiCalendarDays className="h-4.5 w-4.5 text-brand-primary" />
                        <span>{selectedFaculty.joiningDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Full Portfolio and Biography */}
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-primary px-3 py-1 rounded-full bg-brand-primary/5 mb-2.5">
                      {selectedFaculty.department} Department
                    </span>
                    <h2 className="text-2xl font-black text-brand-dark leading-tight mb-1">
                      {selectedFaculty.name}
                    </h2>
                    <p className="text-sm text-gray-500 font-bold mb-6 flex items-center gap-1">
                      <HiBriefcase className="h-4 w-4 text-gray-400 shrink-0" />
                      {selectedFaculty.designation}
                    </p>

                    {/* Meta Fields */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-1.5">Academic Credentials</h4>
                        <div className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                          <HiAcademicCap className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                          <span>{selectedFaculty.qualification}</span>
                        </div>
                      </div>

                      {selectedFaculty.bio && (
                        <div>
                          <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-1.5">Biography & Focus</h4>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {selectedFaculty.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info Footer */}
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">Direct Contact</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <a
                        href={`mailto:${selectedFaculty.email}`}
                        className="flex items-center gap-2 px-4 py-3 bg-[#f8faff] rounded-xl hover:bg-brand-primary/5 border border-gray-50 hover:border-brand-primary/20 text-xs font-bold text-gray-700 hover:text-brand-primary transition-all truncate"
                      >
                        <HiEnvelope className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                        <span className="truncate">{selectedFaculty.email}</span>
                      </a>
                      <a
                        href={`tel:${selectedFaculty.phone}`}
                        className="flex items-center gap-2 px-4 py-3 bg-[#f8faff] rounded-xl hover:bg-brand-primary/5 border border-gray-50 hover:border-brand-primary/20 text-xs font-bold text-gray-700 hover:text-brand-primary transition-all"
                      >
                        <HiPhone className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                        <span>{selectedFaculty.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Faculty Form Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-50 rounded-full transition-colors z-20"
              >
                <HiXMark className="h-6 w-6" />
              </button>

              <div className="p-8 border-b border-gray-50 bg-[#f8faff]">
                <h2 className="text-xl font-black text-brand-dark tracking-tight">Add New Faculty Member</h2>
                <p className="text-xs text-gray-500 mt-1 font-semibold">
                  Register a new teacher card to the college's directory.
                </p>
              </div>

              {/* Scrollable Form */}
              <form onSubmit={handleAddFacultySubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. A. Rama Rao"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.name && <p className="text-[10px] text-red-500 font-bold">{formErrors.name}</p>}
                  </div>

                  {/* Department */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Department *</label>
                    <select
                      name="department"
                      value={formValues.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white text-sm font-bold text-gray-700 transition-all focus:ring-brand-primary/20 focus:border-brand-primary/50"
                    >
                      {departments.slice(1).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Designation */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      value={formValues.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Assistant Professor, Lecturer"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.designation ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.designation && <p className="text-[10px] text-red-500 font-bold">{formErrors.designation}</p>}
                  </div>

                  {/* Qualification */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Qualifications *</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formValues.qualification}
                      onChange={handleInputChange}
                      placeholder="e.g. Ph.D., M.A. in Sanskrit"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.qualification ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.qualification && <p className="text-[10px] text-red-500 font-bold">{formErrors.qualification}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Email Address *</label>
                    <input
                      type="text"
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@moc.edu.in"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-red-500 font-bold">{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Phone Number *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-500 font-bold">{formErrors.phone}</p>}
                  </div>

                  {/* Experience */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Total Experience *</label>
                    <input
                      type="text"
                      name="experience"
                      value={formValues.experience}
                      onChange={handleInputChange}
                      placeholder="e.g. 5 Years, 10 Years"
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.experience ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.experience && <p className="text-[10px] text-red-500 font-bold">{formErrors.experience}</p>}
                  </div>

                  {/* Joining Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Joining Date *</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formValues.joiningDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all ${
                        formErrors.joiningDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-100 focus:ring-brand-primary/20 focus:border-brand-primary/50'
                      }`}
                    />
                    {formErrors.joiningDate && <p className="text-[10px] text-red-500 font-bold">{formErrors.joiningDate}</p>}
                  </div>
                </div>

                {/* Profile Image URL */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Profile Image URL (Optional)</label>
                  <input
                    type="url"
                    name="image"
                    value={formValues.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white text-sm font-semibold transition-all focus:ring-brand-primary/20 focus:border-brand-primary/50"
                  />
                  <p className="text-[10px] text-gray-400 font-medium">
                    Leave blank to automatically generate a gorgeous department-themed gradient initial avatar!
                  </p>
                </div>

                {/* Biography */}
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-gray-500 tracking-wider">Biography & Portfolio</label>
                  <textarea
                    name="bio"
                    value={formValues.bio}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Short description of research interests, areas of expertise, and teaching philosophy..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white text-sm font-medium transition-all focus:ring-brand-primary/20 focus:border-brand-primary/50"
                  ></textarea>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 text-center rounded-2xl text-gray-500 bg-gray-50 hover:bg-gray-100 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-center rounded-2xl text-white bg-brand-primary hover:bg-brand-primary/95 font-bold text-xs transition-all shadow-md"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFacultyProfiles;
