import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiAcademicCap,
  HiBuildingLibrary,
  HiCalendarDays,
  HiUsers,
  HiEnvelope,
  HiChevronRight,
  HiXMark,
  HiArrowLeft,
  HiSparkles,
  HiBookmark,
  HiLanguage,
  HiBriefcase
} from 'react-icons/hi2';

// We reuse the initial faculty data to maintain a single source of truth for counts and staff lists
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

const departmentsData = [
  {
    code: 'SAN',
    name: 'Sanskrit',
    established: '1998',
    hodName: 'Dr. K. Srinivasa Sastry',
    icon: HiAcademicCap,
    bgColor: 'from-brand-primary/10 to-brand-primary/5',
    textColor: 'text-brand-primary',
    borderColor: 'border-brand-primary/20',
    description: 'Dedicated to preserving and transmitting classical Sanskrit literature and grammar (Vyakarana Sastra). Prepares students for advanced Vedic and linguistic research.',
    subjects: ['Sanskrit Grammar', 'Sahitya (Literature)', 'Vedic Chantings', 'Drama & Poetics'],
    researchFocus: 'Computational Sanskrit Linguistics, Classical Dramaturgy, and Paninian Grammar Studies.'
  },
  {
    code: 'TEL',
    name: 'Telugu',
    established: '2000',
    hodName: 'Smt. P. Satyavathi',
    icon: HiLanguage,
    bgColor: 'from-blue-500/10 to-blue-500/5',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500/20',
    description: 'Explores the rich linguistics, historical epics, and poetic traditions of Telugu. Focuses on classical prose, Prabandhas, and creative compositions.',
    subjects: ['Classical Telugu Poetry', 'Telugu Grammar & Prosody', 'Comparative Dravidian Philology', 'Modern Telugu Literature'],
    researchFocus: 'Medieval Telugu Inscriptions, Folk Literature preservation, and evolution of Prabandha poetry.'
  },
  {
    code: 'HIS',
    name: 'History',
    established: '2002',
    hodName: 'Sri B. Venkata Rao',
    icon: HiBuildingLibrary,
    bgColor: 'from-amber-500/10 to-amber-500/5',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-500/20',
    description: 'Provides deep insights into ancient and medieval history, cultural heritage, and archeology, with an emphasis on South Indian culture.',
    subjects: ['Ancient Indian History', 'South Indian Temple Art', 'Indian Cultural Heritage', 'Archaeological Principles'],
    researchFocus: 'Andhra Iconography, Temple Architecture conservation, and epigraphical study of ancient monuments.'
  },
  {
    code: 'JYO',
    name: 'Jyotisha',
    established: '2005',
    hodName: 'Sri S. Narayana Sarma',
    icon: HiSparkles,
    bgColor: 'from-emerald-500/10 to-emerald-500/5',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-500/20',
    description: 'Promotes mathematical astronomy (Sidhanta) and traditional horoscope analysis (Hora Sastra), exploring the scientific basis of Vedic calendars.',
    subjects: ['Sidhanta (Mathematical Astronomy)', 'Hora Sastra', 'Vedic Meteorology', 'Panchanga Computation'],
    researchFocus: 'Traditional Indian Astronomical Instruments, Planetary Position Calculations, and Vedic Calendar synchronization.'
  }
];

// Helper to render initial gradient avatar for faculty lists
const renderAvatar = (name, department, customImage) => {
  if (customImage) {
    return (
      <img
        src={customImage}
        alt={name}
        className="w-full h-full object-cover rounded-2xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '';
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
    colors = { start: '#800000', end: '#b91c1c' };
  } else if (department === 'Telugu') {
    colors = { start: '#3b82f6', end: '#1d4ed8' };
  } else if (department === 'History') {
    colors = { start: '#f59e0b', end: '#b45309' };
  } else if (department === 'Jyotisha') {
    colors = { start: '#10b981', end: '#047857' };
  } else {
    colors = { start: '#ec4899', end: '#be185d' };
  }

  const gradientId = `dept-grad-${name.replace(/[^a-zA-Z0-9]/g, '')}`;

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

const AdminDepartments = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  // Group faculty members by department dynamically
  const deptStaffMap = useMemo(() => {
    const mapping = {};
    departmentsData.forEach(dept => {
      mapping[dept.name] = initialFaculty.filter(fac => fac.department === dept.name);
    });
    return mapping;
  }, []);

  // Compute departmental visual hierarchies dynamically based on designation
  const getHierarchyLevels = (deptName) => {
    const staff = deptStaffMap[deptName] || [];
    
    // Sort staff into ranks:
    // Level 1: HOD / Principal HOD
    // Level 2: Professors / Associate Professors
    // Level 3: Lecturers / Assistant Lecturers
    const levels = {
      level1: [],
      level2: [],
      level3: []
    };

    staff.forEach(member => {
      const designation = member.designation.toLowerCase();
      if (designation.includes('hod')) {
        levels.level1.push(member);
      } else if (designation.includes('professor') && !designation.includes('assistant')) {
        // Full Professors (who are not HODs) go to level 2
        levels.level2.push(member);
      } else {
        // Lecturers, Assistant Professors
        levels.level3.push(member);
      }
    });

    // Fallback: If no explicit HOD found in staff list, pick the first member as HOD
    if (levels.level1.length === 0 && staff.length > 0) {
      levels.level1.push(staff[0]);
      levels.level3 = levels.level3.filter(item => item.id !== staff[0].id);
    }

    return levels;
  };

  const containerVariants = {
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
              <HiBuildingLibrary className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight">Academic Departments</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Overview of the academic branches, courses, student strengths, and staff hierarchies.
          </p>
        </div>
      </div>

      {/* Main Grid View */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {departmentsData.map((dept) => {
          const staffCount = (deptStaffMap[dept.name] || []).length;
          const DeptIcon = dept.icon;

          return (
            <motion.div
              key={dept.code}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)' }}
              onClick={() => setSelectedDept(dept)}
              className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6 relative overflow-hidden group flex flex-col justify-between cursor-pointer"
            >
              {/* Decorative Corner Background Bubble */}
              <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
              
              <div>
                {/* Header: Icon, Name, established */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4.5 rounded-2xl bg-gradient-to-br ${dept.bgColor} ${dept.textColor} border ${dept.borderColor} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <DeptIcon className="h-7 w-7" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-black uppercase text-gray-400 tracking-wider">
                    <HiCalendarDays className="h-4 w-4" />
                    <span>Est. {dept.established}</span>
                  </div>
                </div>

                {/* Details */}
                <h3 className="text-xl font-black text-brand-dark leading-tight group-hover:text-brand-primary transition-colors mb-2">
                  {dept.name} Department
                </h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6 max-h-[50px] overflow-hidden text-ellipsis line-clamp-2">
                  {dept.description}
                </p>

                {/* Meta summary stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mb-6">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Head of Dept</span>
                    <span className="text-xs font-bold text-gray-800 truncate block mt-0.5">{dept.hodName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">Active Staff</span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-gray-800">
                      <HiUsers className="h-4 w-4 text-brand-primary" />
                      <span>{staffCount} Members</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="flex items-center justify-between text-xs font-bold text-brand-primary group-hover:underline">
                <span>View Department Portfolio</span>
                <HiChevronRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detailed Full Screen Overlay Drawer */}
      <AnimatePresence>
        {selectedDept && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-light">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen p-4 lg:p-8 max-w-7xl mx-auto"
            >
              
              {/* Back Navigation Bar */}
              <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                <button
                  onClick={() => setSelectedDept(null)}
                  className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-primary transition-colors"
                >
                  <HiArrowLeft className="h-5 w-5" />
                  <span>Back to Departments</span>
                </button>
                
                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-full transition-colors"
                >
                  <HiXMark className="h-5 w-5" />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1 & 2: Overview & Staff list */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Card 1: Overview */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl"></div>
                    
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-primary px-3 py-1 rounded-full bg-brand-primary/5 mb-3">
                      Est. {selectedDept.established}
                    </span>
                    <h2 className="text-3xl font-black text-brand-dark tracking-tight mb-4">
                      {selectedDept.name} Department
                    </h2>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                      {selectedDept.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-wider">
                          <HiBookmark className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                          <span>Core Subjects / Syllabus</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {selectedDept.subjects.map((sub, i) => (
                            <span key={i} className="text-xs font-semibold px-3 py-1 rounded-xl bg-gray-50 border border-gray-100 text-gray-600">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-wider">
                          <HiSparkles className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                          <span>Research & Focus</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600 leading-relaxed pt-1">
                          {selectedDept.researchFocus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Staff List */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-black text-brand-dark tracking-tight">Departmental Staff</h3>
                        <p className="text-xs text-gray-400">Teaching faculty roster associated with this branch.</p>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary">
                        {(deptStaffMap[selectedDept.name] || []).length} Members
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-wider">
                            <th className="pb-3.5 pl-2">Faculty Member</th>
                            <th className="pb-3.5">Designation</th>
                            <th className="pb-3.5">Qualification</th>
                            <th className="pb-3.5 text-right pr-2">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {(deptStaffMap[selectedDept.name] || []).map((fac) => (
                            <tr key={fac.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 pl-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 shrink-0">
                                    {renderAvatar(fac.name, fac.department, fac.image)}
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-gray-900 leading-snug">{fac.name}</p>
                                    <p className="text-[10px] text-gray-400">{fac.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 text-xs font-semibold text-gray-600">{fac.designation}</td>
                              <td className="py-4 text-xs text-gray-500 font-medium truncate max-w-[150px]" title={fac.qualification}>
                                {fac.qualification}
                              </td>
                              <td className="py-4 text-right pr-2">
                                <a
                                  href={`mailto:${fac.email}`}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                                >
                                  <HiEnvelope className="h-4 w-4" />
                                  <span className="hidden sm:inline">{fac.email}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Column 3: Organizational Hierarchy Tree */}
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 relative flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-brand-dark tracking-tight mb-1">Organizational Hierarchy</h3>
                      <p className="text-xs text-gray-400 mb-8">Visual command hierarchy and ranks within the department.</p>
                      
                      {/* Visual Hierarchy Tree */}
                      <div className="flex flex-col items-center gap-6 relative">
                        {(() => {
                          const levels = getHierarchyLevels(selectedDept.name);
                          
                          return (
                            <>
                              {/* Level 1: HOD */}
                              {levels.level1.map(hod => (
                                <div key={hod.id} className="flex flex-col items-center relative z-10 w-full">
                                  <div className="bg-brand-primary text-white p-4.5 rounded-2xl shadow-md border border-brand-primary/20 text-center w-full max-w-[240px]">
                                    <span className="inline-block text-[9px] font-black uppercase tracking-widest bg-white/25 px-2.5 py-0.5 rounded-full mb-2">
                                      HEAD OF DEPT
                                    </span>
                                    <h4 className="text-xs font-black truncate">{hod.name}</h4>
                                    <p className="text-[10px] text-brand-secondary font-bold mt-0.5">{hod.designation}</p>
                                  </div>
                                </div>
                              ))}

                              {/* Connection Line: Level 1 to Level 2 (if level 2 has members) */}
                              {levels.level2.length > 0 && (
                                <div className="h-6 w-0.5 bg-gray-200 -my-3"></div>
                              )}

                              {/* Level 2: Professors / Associate Professors */}
                              {levels.level2.length > 0 && (
                                <div className="flex flex-col items-center w-full">
                                  <div className="flex flex-wrap justify-center gap-4 w-full relative">
                                    
                                    {/* Horizontal connection bar if multiple items */}
                                    {levels.level2.length > 1 && (
                                      <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gray-200 -translate-y-1/2"></div>
                                    )}

                                    {levels.level2.map(prof => (
                                      <div key={prof.id} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm text-center w-full max-w-[180px] relative z-10">
                                        <span className="inline-block text-[8px] font-black uppercase tracking-wider text-brand-primary px-2 py-0.5 rounded-full bg-brand-primary/5 mb-1.5">
                                          Senior Faculty
                                        </span>
                                        <h4 className="text-[11px] font-bold text-gray-800 truncate">{prof.name}</h4>
                                        <p className="text-[9px] text-gray-400 font-semibold mt-0.5">{prof.designation}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Connection Line: Level 2/1 to Level 3 */}
                              {levels.level3.length > 0 && (
                                <div className="h-6 w-0.5 bg-gray-200 -my-3"></div>
                              )}

                              {/* Level 3: Lecturers / Assistant Professors */}
                              {levels.level3.length > 0 && (
                                <div className="flex flex-col items-center w-full relative">
                                  {/* Connector Line overlay inside container */}
                                  {levels.level3.length > 1 && (
                                    <div className="absolute top-[22px] left-[20%] right-[20%] h-0.5 bg-gray-200"></div>
                                  )}

                                  <div className="flex flex-wrap justify-center gap-4 w-full pt-1">
                                    {levels.level3.map(lec => (
                                      <div key={lec.id} className="flex flex-col items-center w-[140px] shrink-0 relative">
                                        
                                        {/* Small vertical line indicator connecting down to card */}
                                        {levels.level3.length > 1 && (
                                          <div className="h-3 w-0.5 bg-gray-200"></div>
                                        )}

                                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-xs text-center w-full">
                                          <h4 className="text-[10px] font-bold text-gray-800 truncate">{lec.name}</h4>
                                          <p className="text-[9px] text-gray-400 font-medium mt-0.5">{lec.designation}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDepartments;
