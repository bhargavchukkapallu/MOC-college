import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck, 
  HiUsers, 
  HiBookOpen, 
  HiAcademicCap, 
  HiExclamationTriangle, 
  HiScale, 
  HiHeart 
} from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SubNav from '../components/ui/SubNav';
import BannerBackground from '../components/ui/BannerBackground';

const Committees = () => {
  const { hash } = useLocation();

  const sections = [
    { id: 'grievance', name: 'Grievance', icon: <HiScale className="w-4 h-4" /> },
    { id: 'anti-ragging', name: 'Anti-Ragging', icon: <HiShieldCheck className="w-4 h-4" /> },
    { id: 'rti', name: 'RTI', icon: <HiBookOpen className="w-4 h-4" /> },
    { id: 'admission', name: 'Admission', icon: <HiUsers className="w-4 h-4" /> },
    { id: 'examination', name: 'Examination', icon: <HiAcademicCap className="w-4 h-4" /> },
    { id: 'discipline', name: 'Discipline', icon: <HiExclamationTriangle className="w-4 h-4" /> },
    { id: 'isr', name: 'Social Responsibility', icon: <HiHeart className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const committeesList = [
    {
      id: "grievance",
      title: "Grievances Redressal Cell",
      icon: <HiScale className="w-8 h-8" />,
      description: "A dedicated platform for students and staff to voice their concerns and seek fair resolutions for any institutional grievances.",
      members: ["Principal (Chairman)", "Senior Faculty Member (Convener)", "Two Faculty Representatives", "Student Representative"]
    },
    {
      id: "anti-ragging",
      title: "Anti Ragging Cell",
      icon: <HiShieldCheck className="w-8 h-8" />,
      description: "Ensuring a zero-tolerance environment for ragging. Our cell works to prevent any form of harassment and maintain a safe campus for newcomers.",
      members: ["Principal", "HODs of all Departments", "Local Police Representative", "Parent Representatives", "Student Representatives"]
    },
    {
      id: "rti",
      title: "Right to Information (RTI)",
      icon: <HiBookOpen className="w-8 h-8" />,
      description: "Committed to transparency and accountability. The RTI cell handles information requests as per the government guidelines.",
      members: ["Public Information Officer", "Appellate Authority"]
    },
    {
      id: "admission",
      title: "Admission Committee",
      icon: <HiUsers className="w-8 h-8" />,
      description: "Overseeing the fair and merit-based admission process for various programs offered by the college.",
      members: ["Admission Director", "Department Coordinators", "Administrative Staff"]
    },
    {
      id: "examination",
      title: "Examination Committee",
      icon: <HiAcademicCap className="w-8 h-8" />,
      description: "Responsible for the smooth conduct of internal and external examinations, evaluation processes, and result declarations.",
      members: ["Chief Superintendent", "Controller of Examinations", "Invigilators Team"]
    },
    {
      id: "discipline",
      title: "General Discipline Committee",
      icon: <HiExclamationTriangle className="w-8 h-8" />,
      description: "Upholding the code of conduct and maintaining a disciplined academic atmosphere conducive to learning.",
      members: ["Disciplinary Head", "Physical Director", "Faculty Members"]
    },
    {
      id: "isr",
      title: "Institutional Social Responsibility (ISR)",
      icon: <HiHeart className="w-8 h-8" />,
      description: "Engaging students in social welfare activities, community service, and awareness programs to foster social responsibility.",
      members: ["ISR Convener", "NSS/NCC Officers", "Student Volunteers"]
    }
  ];

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-10 lg:pt-48 lg:pb-12 overflow-hidden bg-brand-primary">
        <BannerBackground />

        <div className="container mx-auto px-6 relative z-10 text-left pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Institutional Governance
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              College <span className="text-brand-secondary">Committees</span>
            </h1>
            <p className="max-w-2xl text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
              Our committees and cells work collaboratively to ensure academic excellence, 
              student welfare, and operational transparency across the institution.
            </p>
            <div className="pointer-events-auto">
              <Breadcrumbs align="start" />
            </div>
          </motion.div>
        </div>
      </section>

      <SubNav sections={sections} />

      {/* Committees Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto grid gap-12">
          {committeesList.map((committee, idx) => (
            <section 
              key={committee.id} 
              id={committee.id}
              className="scroll-mt-32"
            >
              <motion.div 
                {...fadeInUp}
                className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-brand-primary/5 border border-gray-100 flex flex-col lg:flex-row gap-10 items-start hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 group"
              >
                <div className="lg:w-1/3">
                  <div className="w-20 h-20 bg-brand-primary/5 rounded-3xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                    {committee.icon}
                  </div>
                  <h2 className="text-3xl font-black text-brand-dark mb-4 leading-tight">
                    {committee.title}
                  </h2>
                  <div className="w-12 h-1.5 bg-brand-secondary rounded-full"></div>
                </div>

                <div className="lg:w-2/3 space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-brand-primary uppercase tracking-widest mb-3">Objectives & Scope</h3>
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                      {committee.description}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                      <HiUsers className="w-4 h-4 text-brand-primary" />
                      Committee Structure
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {committee.members.map((member, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 pb-32">
        <motion.div 
          {...fadeInUp}
          className="bg-brand-dark rounded-[3rem] p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,0,0.1),transparent_70%)]"></div>
          <h2 className="text-3xl font-black text-white mb-6 relative z-10">Have an inquiry or suggestion?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 relative z-10 font-medium">
            We value feedback from our students and stakeholders. Feel free to contact the respective committee convener or visit the administrative office.
          </p>
          <button className="bg-brand-primary text-white px-10 py-4 rounded-full font-black hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 relative z-10">
            Contact Committees
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Committees;
