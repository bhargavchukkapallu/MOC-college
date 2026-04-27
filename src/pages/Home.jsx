import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import CoursesSection from '../components/home/CoursesSection';
import CTASection from '../components/home/CTASection';
import AffiliationsSection from '../components/home/AffiliationsSection';
import ArticlesSection from '../components/home/ArticlesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <CTASection />
      <AffiliationsSection />
      <ArticlesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
