import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/Profile/ProfilePage';
import { ForumPage } from './pages/Forum/ForumPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/" element={<ForumPage />} />
      </Routes>
    </Router>
  );
}

export default App;