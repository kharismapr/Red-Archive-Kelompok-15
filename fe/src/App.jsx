import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ScrollToTop from './pages/ScrollToTop';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import { ProfilePage } from './pages/Profile/ProfilePage.jsx';
import { ForumPage } from './pages/Forum/ForumPage.jsx';
import Film from './pages/Film.jsx';
import FilmDetail from './pages/FilmDetail.jsx';
import FilmReview from './pages/FilmReview.jsx';
import { ThreadList } from './pages/Forum/ThreadList/ThreadList';
import { ThreadPage } from './pages/Thread/ThreadPage'; // Add this import

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Transisi rute
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageTransition><Registration /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Registration /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        
        {/* Temporarily disabled protected routes for development */}
        <Route path="/home" element={
          // <ProtectedRoute>
            <PageTransition>
              <Home />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/profile" element={
          // <ProtectedRoute>
            <PageTransition>
              <ProfilePage />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/forum" element={
          // <ProtectedRoute>
            <PageTransition>
              <ForumPage />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/film" element={
          // <ProtectedRoute>
            <PageTransition>
              <Film />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/film/:filmSlug" element={
          // <ProtectedRoute>
            <PageTransition>
              <FilmDetail />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/review/:filmSlug" element={
          // <ProtectedRoute>
            <PageTransition>
              <FilmReview />
            </PageTransition>
          // </ProtectedRoute>
        } />
        <Route path="/forum/:forumId" element={
          <PageTransition>
            <ThreadList />
          </PageTransition>
        } />
        
        {/* Add this new route */}
        <Route path="/thread/:threadId" element={
          <PageTransition>
            <ThreadPage />
          </PageTransition>
        } />
        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
