import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Registration from './Registration.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';

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
      <Routes>
        <Route path="/" element={<PageTransition><Registration /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Registration /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        {/* <Route path="/film" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/review" element={<PageTransition><Login /></PageTransition>} />  */}
      </Routes>
    </Router>
  );
}