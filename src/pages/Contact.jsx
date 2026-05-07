import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiPhone, 
  HiEnvelope, 
  HiMapPin, 
  HiClock, 
  HiPaperAirplane, 
  HiChatBubbleLeftRight,
  HiChevronDown,
  HiGlobeAsiaAustralia
} from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import BannerBackground from '../components/ui/BannerBackground';

const ContactCard = ({ icon: Icon, title, details, subtitle, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-brand-dark mb-4">{title}</h3>
        <div className="space-y-2 mb-4 flex-grow">
          {details.map((line, i) => (
            <p key={i} className="text-gray-700 font-bold leading-tight">{line}</p>
          ))}
        </div>
        <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-primary' : 'text-brand-dark group-hover:text-brand-primary'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-primary/10'}`}
        >
          <HiChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed max-w-2xl font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-4 lg:pt-36 lg:pb-8 overflow-hidden bg-brand-primary">
        <BannerBackground />

        <div className="container mx-auto px-6 relative z-10 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-black tracking-[0.25em] uppercase bg-white/10 text-brand-secondary rounded-full backdrop-blur-md border border-white/10 shadow-2xl"
            >
              <HiChatBubbleLeftRight className="w-4 h-4" />
              Connect With Us
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Let's Start a <span className="text-brand-secondary italic">Conversation</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Have questions about admissions, academic programs, or campus life? Our team is here to guide you through every step of your journey.
            </p>
            <div className="pointer-events-auto flex justify-center">
              <Breadcrumbs align="center" />
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fcfdfe] to-transparent z-10" />
      </section>

      <div className="container mx-auto px-6 relative z-20 -mt-16 lg:-mt-24">
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <ContactCard 
            icon={HiPhone}
            title="Admissions"
            details={["+91 77889 90685", "+91 94409 54934"]}
            subtitle="Available 9 AM - 5 PM"
            delay={0.1}
          />
          <ContactCard 
            icon={HiMapPin}
            title="Campus Location"
            details={["Matrusri Oriental College", "Jillellamudi, Guntur DT"]}
            subtitle="Andhra Pradesh, 522113"
            delay={0.2}
          />
          <ContactCard 
            icon={HiEnvelope}
            title="Email Us"
            details={["info@moccollege.org", "admissions@moccollege.org"]}
            subtitle="Get a reply within 24 hours"
            delay={0.3}
          />
          <ContactCard 
            icon={HiClock}
            title="Working Hours"
            details={["Mon - Sat: 9:00 - 17:00"]}
            subtitle="Closed on Public Holidays"
            delay={0.4}
          />
        </div>

        {/* Form & Map Section */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32 items-stretch">
          {/* Contact Form Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="p-10 lg:p-16 flex-grow">
              <div className="mb-10">
                <h2 className="text-4xl font-black text-brand-dark mb-4">Send a Message</h2>
                <p className="text-gray-500 font-medium text-lg">Tell us about your interests and we'll help you find the right path.</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="block text-xs font-black text-brand-dark/40 uppercase tracking-widest mb-3 group-focus-within:text-brand-primary transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-bold placeholder:text-gray-300" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-xs font-black text-brand-dark/40 uppercase tracking-widest mb-3 group-focus-within:text-brand-primary transition-colors">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-bold placeholder:text-gray-300" 
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-black text-brand-dark/40 uppercase tracking-widest mb-3 group-focus-within:text-brand-primary transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-bold placeholder:text-gray-300" 
                    placeholder="john@example.com" 
                  />
                </div>

                <div className="relative group">
                  <label className="block text-xs font-black text-brand-dark/40 uppercase tracking-widest mb-3 group-focus-within:text-brand-primary transition-colors">Program of Interest</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-bold appearance-none cursor-pointer">
                      <option value="">Select a Program</option>
                      <option value="telugu">B.A. O.L. Telugu</option>
                      <option value="sanskrit">B.A. O.L. Sanskrit</option>
                      <option value="cs">B.Sc. Computer Science</option>
                    </select>
                    <HiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-black text-brand-dark/40 uppercase tracking-widest mb-3 group-focus-within:text-brand-primary transition-colors">Your Message</label>
                  <textarea 
                    rows="4" 
                    required
                    className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-bold placeholder:text-gray-300 resize-none" 
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus !== 'idle'}
                  className="w-full relative group h-16 bg-brand-primary text-white rounded-2xl font-black text-lg flex items-center justify-center overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-brand-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-brand-primary transition-colors duration-500">
                    {formStatus === 'idle' && (
                      <>
                        Send Your Inquiry
                        <HiPaperAirplane className="w-5 h-5 -rotate-45" />
                      </>
                    )}
                    {formStatus === 'sending' && "Sending Message..."}
                    {formStatus === 'success' && "Message Sent Successfully!"}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Location & Social Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Styled Map */}
            <div className="flex-grow bg-white rounded-[3.5rem] shadow-xl border border-gray-100 overflow-hidden relative min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.412457855364!2d80.44318721486134!3d16.29173038874139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a037894a44f51%3A0x6786c6b320df683c!2sMatrusri%20Oriental%20College!5e0!3m2!1sen!2sin!4v1714880000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 opacity-70"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                    <HiGlobeAsiaAustralia className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-dark mb-1">Campus Headquarters</h4>
                    <p className="text-sm text-gray-600 font-medium">Jillellamudi, Andhra Pradesh</p>
                    <a 
                      href="https://maps.app.goo.gl/..." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs font-black text-brand-primary uppercase tracking-widest hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="p-10 bg-brand-dark rounded-[3.5rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-primary/30 transition-colors duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Direct Support</h3>
                <p className="text-white/60 font-medium mb-8">Need an immediate answer? Our support team is available via phone during office hours.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <HiPhone className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <span className="font-bold text-lg">+91 77889 90685</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <HiEnvelope className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <span className="font-bold text-lg">office@moccollege.org</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Common Questions</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">Frequently Asked <span className="text-brand-primary italic">Queries</span></h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3.5rem] p-8 lg:p-12 shadow-2xl border border-gray-100"
          >
            <FAQItem 
              question="What are the admission requirements?"
              answer="Admission requirements vary by program. Generally, we require completion of higher secondary education (10+2) with relevant subjects. For Oriental languages, a basic aptitude in Telugu or Sanskrit is preferred."
            />
            <FAQItem 
              question="How can I visit the campus?"
              answer="We welcome visitors Monday through Saturday between 9:00 AM and 5:00 PM. Please notify our office in advance if you'd like a guided tour of the facilities."
            />
            <FAQItem 
              question="Do you provide hostel facilities?"
              answer="Yes, Matrusri Oriental College provides comfortable on-campus residential facilities for both boys and girls, emphasizing a disciplined and spiritual environment."
            />
            <FAQItem 
              question="Can I apply for multiple programs?"
              answer="Yes, you can apply for multiple programs. However, final admission will be granted to only one program based on eligibility and preference."
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

