import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router"

export default function useDocumentTitle() {
  const location = useLocation();
  const navigate = useNavigate();

  const titleMap = {
    '/home': 'Home | Coding Addict',
    '/about': 'About | Coding Addict',
    '/projects': 'Projects | Coding Addict',
    '/contact': 'Contact | Coding Addict'
  };

  useEffect(() => {

    if (location.pathname === '/') {
      navigate("/home", {replace: true});
      return;
    }

    const currentTitle = titleMap[location.pathname] || 'Coding Addict';
    document.title = currentTitle;
  }, [location, navigate]);
};