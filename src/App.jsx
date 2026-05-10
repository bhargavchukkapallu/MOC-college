import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingFeedback from './components/ui/FloatingFeedback';
import FloatingNotifications from './components/ui/FloatingNotifications';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import Insights from './pages/Insights';
import Administration from './pages/Administration';
import Committees from './pages/Committees';
import ArticleDetail from './pages/ArticleDetail';
import AcademicCalendar from './pages/AcademicCalendar';
import Library from './pages/Library';
import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/ui/ScrollToTop';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminInsights from './pages/AdminInsights.jsx';
import AdminCalendar from './pages/AdminCalendar.jsx';

// Layout for public pages
const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative">
          <PageLoader />
          
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="insights" element={<AdminInsights />} />
              <Route path="calendar" element={<AdminCalendar />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/administration" element={<Administration />} />
              <Route path="/committees" element={<Committees />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/academic-calendar" element={<AcademicCalendar />} />
              <Route path="/library" element={<Library />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:type/:id" element={<ArticleDetail />} />
              <Route path="/events" element={<Insights />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<div className="min-h-[50vh] flex items-center justify-center text-2xl font-semibold text-brand-primary">Coming Soon</div>} />
          </Routes>

          <FloatingFeedback />
          <FloatingNotifications />
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
