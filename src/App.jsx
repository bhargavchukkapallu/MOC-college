import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingFeedback from './components/ui/FloatingFeedback';
import FloatingNotifications from './components/ui/FloatingNotifications';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import Insights from './pages/Insights';
import Administration from './pages/Administration';
import Committees from './pages/Committees';
import ArticleDetail from './pages/ArticleDetail';
import AcademicCalendar from './pages/AcademicCalendar';
import Library from './pages/Library';
import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/ui/ScrollToTop';
import ComingSoon from './pages/ComingSoon';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminInsights from './pages/admin/AdminInsights.jsx';
import AdminCalendar from './pages/admin/AdminCalendar.jsx';
import AdminFacultyProfiles from './pages/admin/AdminFacultyProfiles.jsx';
import AdminDepartments from './pages/admin/AdminDepartments.jsx';

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

              {/* Unimplemented Faculty Routes */}
              <Route path="faculty/profiles" element={<AdminFacultyProfiles />} />
              <Route path="faculty/departments" element={<AdminDepartments />} />
              <Route path="faculty/attendance" element={<ComingSoon isAdmin={true} />} />
              <Route path="faculty/roles" element={<ComingSoon isAdmin={true} />} />

              {/* Unimplemented Student Routes */}
              <Route path="students/admissions" element={<ComingSoon isAdmin={true} />} />
              <Route path="students/profiles" element={<ComingSoon isAdmin={true} />} />
              <Route path="students/attendance" element={<ComingSoon isAdmin={true} />} />
              <Route path="students/performance" element={<ComingSoon isAdmin={true} />} />
              <Route path="students/parents" element={<ComingSoon isAdmin={true} />} />

              {/* Unimplemented Insights Sub-routes */}
              <Route path="insights/blogs" element={<ComingSoon isAdmin={true} />} />
              <Route path="insights/events" element={<ComingSoon isAdmin={true} />} />

              {/* Unimplemented Classes Routes */}
              <Route path="classes/manage" element={<ComingSoon isAdmin={true} />} />
              <Route path="classes/subjects" element={<ComingSoon isAdmin={true} />} />
              <Route path="classes/syllabus" element={<ComingSoon isAdmin={true} />} />

              {/* Unimplemented Lesson Plan Routes */}
              <Route path="lesson-plans/manage" element={<ComingSoon isAdmin={true} />} />
              <Route path="lesson-plans/scheduling" element={<ComingSoon isAdmin={true} />} />
              <Route path="lesson-plans/progress" element={<ComingSoon isAdmin={true} />} />

              {/* Unimplemented Calendar Sub-routes */}
              <Route path="calendar/schedules" element={<ComingSoon isAdmin={true} />} />
              <Route path="calendar/events" element={<ComingSoon isAdmin={true} />} />

              {/* Admin Fallback Route to retain the layout */}
              <Route path="*" element={<ComingSoon isAdmin={true} />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/administration" element={<Administration />} />
              <Route path="/committees" element={<Committees />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/academic-calendar" element={<AcademicCalendar />} />
              <Route path="/library" element={<Library />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:type/:id" element={<ArticleDetail />} />
              <Route path="/events" element={<Insights />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Unimplemented Public Routes */}
              <Route path="/student-support" element={<ComingSoon />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<ComingSoon />} />
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
