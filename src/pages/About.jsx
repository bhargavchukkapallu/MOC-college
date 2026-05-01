import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  History, 
  Award, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';

const iconMap = {
  History: <History className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />
};

const About = () => {
  const { hash } = useLocation();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json_data/about_sections.json`)
      .then(res => res.json())
      .then(data => setSections(data))
      .catch(err => console.error("Error loading about sections:", err));
  }, []);

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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-brand-light">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" fillOpacity="0.05" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Discover Our Legacy
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              About <span className="text-brand-secondary">Us</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Nurturing wisdom and culture since 1971. A sanctuary of oriental learning 
              founded on the principles of universal love and harmony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <nav className="sticky top-20 lg:top-24 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-start lg:justify-center py-4 space-x-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-primary whitespace-nowrap transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${section.id}`);
                }}
              >
                <span className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-brand-primary/10 transition-colors">
                  {section.icon}
                </span>
                {section.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* History Section */}
          <section id="history" className="scroll-mt-40">
            <motion.div {...fadeInUp} className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-brand-primary"></div>
                  <span className="text-brand-primary font-black uppercase tracking-widest text-sm">Brief History</span>
                </div>
                <h2 className="text-4xl font-black text-brand-dark mb-8 leading-tight">
                  A Legacy of Oriental <br />
                  <span className="text-brand-primary text-5xl">Excellence</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Matrusri Oriental College (MOC) was established in 1971 in the serene village of Jillellamudi, Guntur district, Andhra Pradesh. It was inaugurated by <span className="font-bold text-brand-dark">Viswajanani Jillellamudi Amma</span>, who envisioned a sanctuary for classical learning.
                  </p>
                  <p>
                    The college specializes in oriental languages like <span className="font-bold text-brand-dark">Sanskrit and Telugu</span>, providing a unique Gurukula-style environment where students live, learn, and grow together in a spirit of harmony.
                  </p>
                  <p>
                    Over the past 50 years, MOC has evolved into a premier institution, blending traditional wisdom with modern educational needs, producing scholars and leaders who carry forward our rich cultural heritage.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 aspect-[4/5] relative z-10">
                   <img 
                    src={`${import.meta.env.BASE_URL}images/amma_portrait.png`} 
                    alt="Viswajanani Jillellamudi Amma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-full h-full bg-brand-primary/10 rounded-[2.5rem] -z-10"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </section>

          {/* Trust Section */}
          <section id="trust" className="scroll-mt-40">
            <motion.div {...fadeInUp} className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex p-4 bg-brand-primary/10 rounded-2xl text-brand-primary mb-8">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black text-brand-dark mb-6">The Matrusri Vidya Parishat</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
                  The college is managed by the Matrusri Vidya Parishat, a registered trust dedicated to providing quality education rooted in moral values and spiritual discipline.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="bg-brand-light p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-brand-primary mb-2">Non-Commercial</h3>
                    <p className="text-sm text-gray-500">Education is treated as a service, not a business, with minimal fees and maximum support.</p>
                  </div>
                  <div className="bg-brand-light p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-brand-primary mb-2">Spiritual Roots</h3>
                    <p className="text-sm text-gray-500">Guided by the philosophy of Amma, focusing on universal love and brotherhood.</p>
                  </div>
                  <div className="bg-brand-light p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-brand-primary mb-2">Holistic Care</h3>
                    <p className="text-sm text-gray-500">Providing not just education but boarding, lodging, and a family-like atmosphere.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Vision & Mission */}
          <section id="vision" className="scroll-mt-40">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div 
                {...fadeInUp}
                className="bg-brand-primary p-12 rounded-[2.5rem] text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-24 h-24" />
                </div>
                <h2 className="text-3xl font-black mb-6">Our Vision</h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  To create an enlightened society based on the principles of harmony, universal love, and brotherhood, where education serves as a bridge between tradition and modernity.
                </p>
              </motion.div>
              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="bg-brand-secondary p-12 rounded-[2.5rem] text-brand-primary relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-secondary/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle2 className="w-24 h-24" />
                </div>
                <h2 className="text-3xl font-black mb-6 text-brand-dark">Our Mission</h2>
                <ul className="space-y-4">
                  {[
                    "To provide high-quality oriental education.",
                    "To instill spiritual discipline and moral values.",
                    "To foster cooperation beyond caste and religion.",
                    "To prepare students for a modern global society."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-dark/80 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Principal & Correspondents */}
          <section id="principal" className="scroll-mt-40">
             <div className="flex flex-col gap-32">
                {/* Principal */}
                <motion.div {...fadeInUp} className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <div className="aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                         <img 
                          src={`${import.meta.env.BASE_URL}images/principal_portrait.png`} 
                          alt="Principal" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-6 -right-6 bg-brand-secondary p-4 rounded-2xl shadow-lg">
                        <GraduationCap className="w-8 h-8 text-brand-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <h2 className="text-3xl font-black text-brand-dark mb-2">Principal’s Desk</h2>
                    <p className="text-brand-primary font-bold mb-6 text-lg tracking-wide uppercase">Dr. M. Sitaramaiah, M.A., Ph.D.</p>
                    <div className="space-y-4 text-gray-600 text-lg italic leading-relaxed">
                      <p>
                        "Education at Matrusri Oriental College is not just about academic results, but about character building. We strive to provide our students with the tools they need to succeed in the world while remaining rooted in the spiritual values given by Amma."
                      </p>
                      <p>
                        "Our focus is on creating a supportive environment where every student can realize their full potential."
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Correspondent */}
                <motion.div id="correspondents" {...fadeInUp} className="flex flex-col lg:flex-row-reverse gap-16 items-center scroll-mt-40">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <div className="aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        {/* <img src="/correspondent.jpg" alt="Correspondent" className="w-full h-full object-cover" /> */}
                         <div className="w-full h-full flex items-center justify-center bg-brand-primary/5 text-brand-primary/20 italic">
                            Photo Pending
                         </div>
                      </div>
                      <div className="absolute -bottom-6 -left-6 bg-brand-primary p-4 rounded-2xl shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <h2 className="text-3xl font-black text-brand-dark mb-2">Correspondent’s Message</h2>
                    <p className="text-brand-primary font-bold mb-6 text-lg tracking-wide uppercase">Sri P. Rama Krishna Babu</p>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                      <p>
                        "The Matrusri Vidya Parishat is committed to sustaining the vision of Amma. We ensure that our students receive the best possible care and guidance."
                      </p>
                      <p>
                        "Our administration works tirelessly to maintain the infrastructure and academic standards that have made MOC a respected name in oriental education."
                      </p>
                    </div>
                  </div>
                </motion.div>
             </div>
          </section>

          {/* Affiliations */}
          <section id="affiliations" className="scroll-mt-40 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-black text-brand-dark mb-12">Recognitions & Affiliations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "University", desc: "Affiliated to Acharya Nagarjuna University (ANU), Guntur.", icon: <BookOpen /> },
                  { title: "Accreditation", desc: "Recognized by NAAC with B++ Grade.", icon: <Award /> },
                  { title: "Government", desc: "Recognized by the Government of Andhra Pradesh.", icon: <ShieldCheck /> }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:border-brand-primary/20 transition-all group">
                    <div className="w-16 h-16 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary mb-6 mx-auto group-hover:bg-brand-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Staff Details */}
          <section id="staff" className="scroll-mt-40">
            <motion.div {...fadeInUp}>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-brand-dark mb-4">Dedicated Faculty</h2>
                  <p className="text-gray-500 text-lg">Our experienced staff is dedicated to student growth and academic excellence.</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-brand-primary/10 px-6 py-3 rounded-2xl">
                    <span className="block text-2xl font-black text-brand-primary">15+</span>
                    <span className="text-[10px] font-black uppercase text-brand-primary/60 tracking-widest">Teaching Staff</span>
                  </div>
                  <div className="bg-brand-secondary/20 px-6 py-3 rounded-2xl">
                    <span className="block text-2xl font-black text-brand-dark">10+</span>
                    <span className="text-[10px] font-black uppercase text-brand-dark/40 tracking-widest">Support Staff</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-primary text-white">
                      <th className="p-6 font-bold">Name</th>
                      <th className="p-6 font-bold">Designation</th>
                      <th className="p-6 font-bold">Department</th>
                      <th className="p-6 font-bold">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: "Dr. M. Sitaramaiah", role: "Principal", dept: "Sanskrit", exp: "25+ Years" },
                      { name: "Smt. K. Ratnavali", role: "Lecturer", dept: "Telugu", exp: "18+ Years" },
                      { name: "Sri V. Venkateswarlu", role: "Lecturer", dept: "History", exp: "15+ Years" },
                      { name: "Dr. G. Lakshmi", role: "Lecturer", dept: "Oriental Languages", exp: "12+ Years" },
                    ].map((staff, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-6 font-bold text-brand-dark">{staff.name}</td>
                        <td className="p-6 text-gray-600">{staff.role}</td>
                        <td className="p-6 text-gray-600">{staff.dept}</td>
                        <td className="p-6 font-medium text-brand-primary">{staff.exp}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="p-4 text-center text-sm text-gray-400 italic">
                        Detailed staff profiles are being updated. Please contact the office for complete details.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="pb-20">
            <motion.div 
              {...fadeInUp}
              className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(128,0,0,0.15),transparent_50%)]"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Want to learn more about our courses?</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="/academics" className="bg-brand-primary text-white px-10 py-5 rounded-full font-black text-lg hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3">
                    View Academic Programs
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="/contact" className="bg-white text-brand-dark px-10 py-5 rounded-full font-black text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center gap-3">
                    Contact Us
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;

