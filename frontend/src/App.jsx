import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { FEATURES } from './config/features';
import './App.css';

// Public pages
import Homepage from './pages/Homepage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import PortfolioPage from './pages/PortfolioPage';
import MyWorkPage from './pages/MyWorkPage';
import ExperiencePage from './pages/ExperiencePage';
import InfluencesPage from './pages/InfluencesPage';
import LoginPage from './pages/LoginPage';

// Admin pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminPostsList from './pages/AdminPostsList';
import AdminPostEditor from './pages/AdminPostEditor';
import AdminPortfolioManager from './pages/AdminPortfolioManager';
import AdminPortfolioUpload from './pages/AdminPortfolioUpload';
import AdminSettingsEditor from './pages/AdminSettingsEditor';
import AdminWorkList from './pages/AdminWorkList';
import AdminWorkEditor from './pages/AdminWorkEditor';
import AdminInfluencesList from './pages/AdminInfluencesList';
import AdminInfluencesEditor from './pages/AdminInfluencesEditor';
import ProtectedRoute from './components/ProtectedRoute';

// Render the page if its flag is on, otherwise bounce to home.
const withFlag = (enabled, element) => (enabled ? element : <Navigate to="/" replace />);

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1b1d20',
            color: '#fff',
            border: '1px solid #3f4348',
          },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/portfolio" element={withFlag(FEATURES.CREATIVE_WORK, <PortfolioPage />)} />
        <Route path="/blog" element={withFlag(FEATURES.BLOG, <BlogListPage />)} />
        <Route path="/blog/:slug" element={withFlag(FEATURES.BLOG, <BlogPostPage />)} />
        <Route path="/my-work" element={<MyWorkPage />} />
        <Route path="/my-work/:slug" element={<ExperiencePage />} />
        <Route path="/influences" element={withFlag(FEATURES.INFLUENCES, <InfluencesPage />)} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPostsList />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/:id/edit" element={<AdminPostEditor />} />
          <Route path="portfolio" element={<AdminPortfolioManager />} />
          <Route path="portfolio/new" element={<AdminPortfolioUpload />} />
          <Route path="work" element={<AdminWorkList />} />
          <Route path="work/new" element={<AdminWorkEditor />} />
          <Route path="work/:id" element={<AdminWorkEditor />} />
          <Route path="influences" element={<AdminInfluencesList />} />
          <Route path="influences/new" element={<AdminInfluencesEditor />} />
          <Route path="influences/:id" element={<AdminInfluencesEditor />} />
          <Route path="settings" element={<AdminSettingsEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
