import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useSmoothScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((elementId: string) => {
    // If we're not on the homepage, navigate to homepage first with hash
    if (location.pathname !== '/') {
      navigate(`/#${elementId}`);
      return;
    }

    // If we're on homepage, try to scroll to the section
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // If element doesn't exist on current page, navigate to homepage with hash
      navigate(`/#${elementId}`);
    }
  }, [navigate, location.pathname]);

  return { scrollToSection };
};
