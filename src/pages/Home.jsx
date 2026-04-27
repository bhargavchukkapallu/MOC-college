import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import CoursesSection from '../components/home/CoursesSection';
import CTASection from '../components/home/CTASection';
import AffiliationsSection from '../components/home/AffiliationsSection';
import ArticlesSection from '../components/home/ArticlesSection';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import MapSection from '../components/home/MapSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <CTASection />
      <AffiliationsSection />
      <ArticlesSection />
      <GallerySection />
      <TestimonialsSection />
      <MapSection />
    </div>
  );
};

export default Home;
