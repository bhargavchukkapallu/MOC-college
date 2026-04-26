import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingFeedback from './components/ui/FloatingFeedback';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route for empty pages */}
            <Route path="*" element={<div className="min-h-[50vh] flex items-center justify-center text-2xl font-semibold text-brand-primary">Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
        <FloatingFeedback />
      </div>
    </Router>
  );
}

export default App;
