import { Outlet } from 'react-router';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />

      <main> 
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};