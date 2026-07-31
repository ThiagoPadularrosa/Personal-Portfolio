import { Routes, Route } from 'react-router';
import DashboardLayout from '../components/DashboardLayout.jsx';
import Home from '../pages/home/home.jsx';
import About from '../pages/about/about.jsx';
import Projects from '../pages/projects/projects.jsx';
import Contact from '../pages/contact/contact.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>  
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}