import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Experience from './components/Experience';
import ScrollStack from './components/ScrollStack';
import LogicSimulator from './components/LogicSimulator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Use same css as before
import './index.css';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize AOS and handle loading state
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: 'ease-out-cubic',
    });

    // The Loader animates for 2.8s, then exits in 0.8s
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for React to render new components then refresh AOS
      setTimeout(() => AOS.refresh(), 100);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle custom cursor glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('cursor-glow');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Loader />
      
      {/* 
        Wrap content in a container that handles fade-in 
        after the initial load is done.
      */}
      <div 
        className="app-content" 
        style={{ 
          opacity: loading ? 0 : 1, 
          transition: 'opacity 0.6s ease',
          pointerEvents: loading ? 'none' : 'auto'
        }}
      >
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={
              <>
                <Experience />
                <ScrollStack />
              </>
            } />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={
              <>
                <LogicSimulator />
                <Contact />
              </>
            } />
          </Routes>
        </main>

        <Footer />
        
        {/* Custom global cursor glow effect */}
        <div className="cursor-glow" id="cursor-glow" aria-hidden="true" />
        <Chatbot />
      </div>
    </>
  );
}

export default App;
