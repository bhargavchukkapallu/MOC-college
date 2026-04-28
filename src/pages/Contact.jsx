import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-sm border border-white/10">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Contact <span className="text-brand-secondary">Us</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed">
              Have questions about admissions, courses, or facilities? We're here to help you begin your journey with Matrusri Oriental College.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 -mt-10 lg:-mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Phone className="w-8 h-8" />,
              title: "Call Us",
              details: ["+91 77889 90685", "+91 94409 54934"],
              subtitle: "For admissions and general queries"
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Visit Campus",
              details: ["Matrusri Oriental College", "Jillellamudi, Andhra Pradesh"],
              subtitle: "Open Monday - Saturday"
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Office Hours",
              details: ["9:00 AM - 5:00 PM"],
              subtitle: "Closed on Sundays and Public Holidays"
            }
          ].map((info, idx) => (
            <motion.div 
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-10 text-center shadow-xl border border-gray-100 hover:shadow-2xl hover:border-brand-primary/20 transition-all group"
            >
              <div className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                {info.icon}
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-4">{info.title}</h3>
              {info.details.map((line, i) => (
                <p key={i} className="text-lg text-gray-700 font-bold">{line}</p>
              ))}
              <p className="text-sm text-gray-500 mt-4">{info.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          {...fadeInUp}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 bg-brand-primary text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <pattern id="contactGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#contactGrid)" />
                </svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-6">Send us a message</h2>
                <p className="text-white/80 text-lg mb-12">
                  Fill out the form and our admissions team will get back to you within 24 hours.
                </p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Admissions Helpline</p>
                      <p className="text-xl font-bold">+91 77889 90685</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="+91 90000 00000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Course of Interest</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-700">
                    <option value="">Select a course</option>
                    <option value="telugu">B.A. O.L. (Telugu)</option>
                    <option value="sanskrit">B.A. O.L. (Sanskrit)</option>
                    <option value="cs">B.Sc. Honours (Computer Science)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Message</label>
                  <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-brand-primary text-white font-black text-lg py-5 rounded-xl hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
