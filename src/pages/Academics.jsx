import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Clock, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Academics = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const programs = [
    {
      title: 'B.A. O.L. (Telugu)',
      duration: '5 Years',
      eligibility: '10th Grade Pass',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-brand-primary',
      description: 'An integrated five-year degree course designed to provide deep mastery over classical Telugu literature, linguistics, and grammar. This program prepares students for a variety of public and private sector roles.',
      features: [
        'Comprehensive study of classical texts',
        'Intensive grammar and linguistic training',
        'Coaching for competitive exams included',
        'Free education, accommodation, and meals'
      ]
    },
    {
      title: 'B.A. O.L. (Sanskrit)',
      duration: '3 or 5 Years',
      eligibility: '10th Pass (5 Yrs) / Inter with Sanskrit (3 Yrs)',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'bg-[#b8860b]',
      description: 'A prestigious program focusing on the mastery of ancient Sanskrit texts, Vedas, and literature. Students gain profound knowledge that opens international doors for research and teaching.',
      features: [
        'In-depth study of Vedas and Shastras',
        'Opportunities for international translation work',
        'Yoga and meditation practices integrated',
        'Full scholarship including books and medical'
      ]
    },
    {
      title: 'B.Sc. Honours (Comp. Sci.)',
      duration: '4 Years',
      eligibility: 'Intermediate (MPC)',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-[#2c3e50]',
      description: 'Blending modern computer science education with a deeply spiritual and disciplined environment. This program prepares students for the fast-paced tech industry while retaining core values.',
      features: [
        'Modern programming and software dev',
        'Access to state-of-the-art tech labs',
        'Spoken English and personality development',
        'Industry-ready curriculum'
      ]
    }
  ];

  return (
    <div className="bg-[#fafcff] min-h-screen">
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
              Academic Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-brand-secondary">Programs</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Discover programs designed to nurture both intellect and character. 
              We offer free, high-quality education through the unique Gurukula system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Listing */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {programs.map((program, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative"
              >
                {/* Decorative Background Blur */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${program.color} opacity-5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                  <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8 flex flex-col justify-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 ${program.color}`}>
                      {program.icon}
                    </div>
                    <h2 className="text-3xl font-black text-brand-dark mb-4 leading-tight">{program.title}</h2>
                    
                    <div className="space-y-4 text-sm font-bold text-gray-600">
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        <Clock className="w-5 h-5 text-brand-primary" />
                        <div>
                          <span className="block text-[10px] uppercase tracking-widest text-gray-400">Duration</span>
                          {program.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                        <GraduationCap className="w-5 h-5 text-brand-primary" />
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
                    <h4 className="text-brand-dark font-black uppercase tracking-widest text-sm mb-4">Program Highlights</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {program.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 lg:py-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(128,0,0,0.15),transparent_50%)]"></div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Briefcase className="w-16 h-16 text-brand-secondary mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Career Opportunities</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Graduates of our courses are highly sought after and eligible for numerous prestigious positions across various sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Government Jobs", desc: "VRO, Panchayat Secretary, Police Constable, S.I, Groups I, II, III, IV." },
              { title: "Central Services", desc: "Eligible for UPSC and other central government administrative positions." },
              { title: "Media & Journalism", desc: "News Readers, Anchors, Journalists, and Reporters in regional media." },
              { title: "Global Teaching", desc: "Translators and Teachers with opportunities to work abroad for Sanskrit proficients." }
            ].map((career, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-bold text-brand-secondary mb-3">{career.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{career.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto bg-brand-primary/5 rounded-[3rem] p-12 border border-brand-primary/10">
            <h2 className="text-3xl font-black text-brand-dark mb-4">Admissions Open for 2024 - 2025</h2>
            <p className="text-gray-600 mb-8 font-medium text-lg">Limited seats available. Contact us today to secure your admission and start your journey of holistic development.</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-full font-black text-lg hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 active:scale-95"
            >
              Contact Admissions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
