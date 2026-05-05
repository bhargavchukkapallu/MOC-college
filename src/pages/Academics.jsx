import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiBookOpen,
  HiAcademicCap,
  HiUsers,
  HiClock,
  HiCheckCircle,
  HiArrowRight,
  HiBriefcase,
  HiComputerDesktop,
  HiLightBulb,
  HiChevronRight,
  HiMiniBuildingLibrary,
  HiCpuChip,
  HiPresentationChartLine
} from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SubNav from '../components/ui/SubNav';
import BannerBackground from '../components/ui/BannerBackground';
import PDFModal from '../components/ui/PDFModal';

const iconMap = {
  BookOpen: <HiBookOpen className="w-8 h-8" />,
  GraduationCap: <HiAcademicCap className="w-8 h-8" />,
  Users: <HiUsers className="w-8 h-8" />,
  ICT: <HiCpuChip className="w-8 h-8" />,
  Library: <HiMiniBuildingLibrary className="w-8 h-8" />,
  Computer: <HiComputerDesktop className="w-8 h-8" />
};

const Academics = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/academics_programs.json`)
      .then(res => res.json())
      .then(data => setPrograms(data))
      .catch(err => console.error("Error loading programs:", err));
  }, []);

  const openSyllabus = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    { id: 'offering-courses', name: 'Offering Courses', icon: <HiAcademicCap className="w-4 h-4" /> },
    { id: 'addon-courses', name: 'Addon Courses', icon: <HiBriefcase className="w-4 h-4" /> },
    { id: 'calendar', name: 'Calendar', icon: <HiClock className="w-4 h-4" /> },
    { id: 'outcomes', name: 'Outcomes', icon: <HiCheckCircle className="w-4 h-4" /> },
    { id: 'departments', name: 'Departments', icon: <HiUsers className="w-4 h-4" /> },
    { id: 'ict', name: 'ICT', icon: <HiCpuChip className="w-4 h-4" /> },
    { id: 'library', name: 'Library', icon: <HiMiniBuildingLibrary className="w-4 h-4" /> },
    { id: 'computer-lab', name: 'Computer Lab', icon: <HiComputerDesktop className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-[#fafcff] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-34 pb-0 lg:pt-38 lg:pb-0 overflow-hidden bg-brand-primary">
        <BannerBackground />

        <div className="container mx-auto px-6 relative z-10 text-left pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Academic Excellence
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Academic <span className="text-brand-secondary">Pathways</span>
            </h1>
            <p className="max-w-2xl text-white/80 text-base md:text-lg font-medium leading-relaxed mb-8">
              Empowering students through traditional wisdom and modern innovation within the sacred Gurukula system.
            </p>
            <div className="pointer-events-auto">
              <Breadcrumbs align="start" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <SubNav sections={sections} />

      {/* Main Content Area */}
      <div className="container mx-auto px-6 lg:px-16 mt-12 lg:mt-20">

        {/* Offering Courses Section */}
        <section id="offering-courses" className="scroll-mt-40 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Offering Courses</h2>
            <p className="text-gray-600 text-lg font-medium">Explore our core academic programs designed for holistic growth.</p>
          </div>
          <div className="grid lg:grid-cols-1 gap-12 max-w-5xl mx-auto">
            {programs.map((program, idx) => {
              const slug = program.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/\./g, '');
              return (
                <motion.div
                  key={idx}
                  id={slug}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative scroll-mt-40"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 ${program.color} opacity-5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:opacity-10 transition-opacity`}></div>

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                    <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8 flex flex-col justify-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 ${program.color}`}>
                        {iconMap[program.icon] || <HiAcademicCap className="w-8 h-8" />}
                      </div>
                      <h3 className="text-3xl font-black text-brand-dark mb-4 leading-tight">{program.title}</h3>

                      <div className="space-y-4 text-sm font-bold text-gray-600">
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                          <HiClock className="w-5 h-5 text-brand-primary" />
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-gray-400">Duration</span>
                            {program.duration}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                          <HiAcademicCap className="w-5 h-5 text-brand-primary" />
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-gray-400">Eligibility</span>
                            {program.eligibility}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-2/3">
                      <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                        {program.description}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {program.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3">
                            <HiCheckCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => openSyllabus(program)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all active:scale-95 shadow-lg shadow-brand-primary/20"
                      >
                        <HiBookOpen className="w-5 h-5" />
                        View Course Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Addon Courses Section */}
        <section id="addon-courses" className="scroll-mt-40 mb-32">
          <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,134,11,0.2),transparent_50%)]"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-4xl lg:text-5xl font-black mb-6">Addon <span className="text-brand-secondary">Courses</span></h2>
                  <p className="text-white/80 text-lg font-medium leading-relaxed mb-8">
                    Supplementing traditional education with practical skills for the modern world. Our addon courses are designed to enhance employability and personal growth.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-6">
                    {[
                      { title: "Yoga & Meditation", icon: <HiLightBulb /> },
                      { title: "Tally & GST", icon: <HiComputerDesktop /> },
                      { title: "Communicative English", icon: <HiUsers /> },
                      { title: "Journalism", icon: <HiBookOpen /> }
                    ].map((course, idx) => (
                      <li key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="text-brand-secondary w-6 h-6">{course.icon}</div>
                        <span className="font-bold">{course.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-48 bg-white/10 rounded-[2rem] border border-white/5 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                      <p className="text-sm font-medium">Hands-on Workshops</p>
                    </div>
                    <div className="h-64 bg-brand-secondary/20 rounded-[2rem] border border-brand-secondary/20 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                      <p className="text-lg font-black text-brand-secondary">Industry Expert Sessions</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="h-64 bg-brand-primary/20 rounded-[2rem] border border-brand-primary/20 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                      <p className="text-lg font-black text-white">Certification Awards</p>
                    </div>
                    <div className="h-48 bg-white/10 rounded-[2rem] border border-white/5 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                      <p className="text-sm font-medium">Skill Assessments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Calendar Section */}
        <section id="calendar" className="scroll-mt-40 mb-32">
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-secondary"></div>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <h2 className="text-4xl font-black text-brand-dark mb-6">Academic Calendar</h2>
                <p className="text-gray-600 font-medium leading-relaxed mb-8">
                  Stay updated with our comprehensive schedule of academic activities, examinations, and institutional events for the current academic year.
                </p>
                <div className="space-y-4">
                  <Link to="/academic-calendar" className="w-full flex items-center justify-between p-4 bg-brand-primary/5 rounded-2xl text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-all group">
                    <span>View University Calendar</span>
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/academic-calendar" className="w-full flex items-center justify-between p-4 bg-brand-primary/5 rounded-2xl text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-all group">
                    <span>View College Calendar</span>
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="grid gap-4">
                  {[
                    { month: 'June', event: 'Commencement of Classes for II & III Year students' },
                    { month: 'July', event: 'First Internal Assessment Examinations' },
                    { month: 'August', event: 'Commencement of Classes for I Year students' },
                    { month: 'September', event: 'Second Internal Assessment Examinations' },
                    { month: 'October', event: 'Dasara Vacation & Mid-Semester Holidays' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-4 border-b border-gray-50 last:border-0">
                      <div className="w-24 font-black text-brand-secondary uppercase tracking-widest text-xs">{item.month}</div>
                      <div className="font-bold text-gray-700">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section id="outcomes" className="scroll-mt-40 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Program & Course Outcomes</h2>
            <p className="text-gray-600 text-lg font-medium">Measuring our success through the growth and achievements of our students.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Mastery",
                desc: "Demonstrate profound knowledge in chosen fields of literature, science, and linguistics.",
                icon: <HiPresentationChartLine className="w-12 h-12" />
              },
              {
                title: "Character Building",
                desc: "Imbibe values of discipline, selfless service, and integrity through the Gurukula system.",
                icon: <HiAcademicCap className="w-12 h-12" />
              },
              {
                title: "Professional Success",
                desc: "Transition seamlessly into government, media, or teaching roles with competitive skills.",
                icon: <HiBriefcase className="w-12 h-12" />
              }
            ].map((outcome, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-brand-primary mb-6">{outcome.icon}</div>
                <h3 className="text-2xl font-black text-brand-dark mb-4">{outcome.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{outcome.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Departments Preview Section */}
        <section id="departments" className="scroll-mt-40 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Our Departments</h2>
            <p className="text-gray-600 text-lg font-medium">Diverse academic divisions fostering specialized knowledge and research.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Telugu', code: 'TEL' },
              { name: 'Sanskrit', code: 'SAN' },
              { name: 'English', code: 'ENG' },
              { name: 'History', code: 'HIS' },
              { name: 'Computer Science', code: 'CS' }
            ].map((dept, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md text-center group hover:bg-brand-primary transition-all duration-300">
                <div className="text-3xl font-black text-brand-primary group-hover:text-white mb-4 transition-colors">{dept.code}</div>
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors">{dept.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Grid (ICT, Library, Computer Lab) */}
        <div className="space-y-32">
          {/* ICT Facilities */}
          <section id="ict" className="scroll-mt-40">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mb-8">
                  <HiCpuChip className="w-10 h-10" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">ICT Facilities</h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                  We integrate technology to enhance learning. Our classrooms are equipped with modern digital tools to ensure students stay connected with global knowledge.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Smart Classrooms', 'Wi-Fi Enabled Campus', 'Digital Resource Center', 'AV Projector Rooms'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-bold text-gray-700">
                      <HiChevronRight className="text-brand-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="ICT Lab" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Library */}
          <section id="library" className="scroll-mt-40">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-brand-secondary/10 rounded-3xl flex items-center justify-center text-brand-secondary mb-8">
                  <HiMiniBuildingLibrary className="w-10 h-10" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Central Library</h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                  A sanctuary of knowledge housing over 10,000 volumes, including rare ancient manuscripts, Sanskrit literature, and modern academic journals.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {['Ancient Manuscript Section', 'Reading Room', 'Digital Catalog', 'Rare Book Collection'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-bold text-gray-700">
                      <HiChevronRight className="text-brand-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link to="/library" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-secondary transition-colors group">
                  Explore Full Library 
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" alt="Library" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Computer Lab */}
          <section id="computer-lab" className="scroll-mt-40">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-brand-dark/10 rounded-3xl flex items-center justify-center text-brand-dark mb-8">
                  <HiComputerDesktop className="w-10 h-10" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-6">Modern Computer Lab</h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                  State-of-the-art computing facilities with high-speed internet, dedicated systems for every student, and a language lab for phonetic training.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Language Lab', 'High-speed Internet', 'Software Development Kits', 'Personal Workstations'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-bold text-gray-700">
                      <HiChevronRight className="text-brand-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Computer Lab" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Admission CTA */}
        <section className="mt-40 text-center">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto bg-brand-primary rounded-[4rem] p-16 lg:p-24 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black mb-8">Join the Gurukula Tradition</h2>
              <p className="text-white/80 mb-12 font-medium text-xl max-w-2xl mx-auto">Limited seats available for the 2024 - 2025 academic session. Embark on a journey of excellence.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white text-brand-primary px-12 py-6 rounded-full font-black text-xl hover:bg-brand-secondary hover:text-white transition-all active:scale-95 group shadow-xl shadow-black/20"
              >
                Apply for Admission
                <HiChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      <PDFModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={selectedProgram?.syllabus}
        title={selectedProgram?.title}
      />
    </div>
  );
};

export default Academics;
