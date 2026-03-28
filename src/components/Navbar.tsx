import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/achievements', label: 'Awards' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

const SpeakerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const MuteIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const Navbar = ({ theme, onThemeToggle }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('portfolio_muted') === 'true');
  const location = useLocation();
  const { playSound } = useSoundEffects();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="navbar">
      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={handleNavClick}
        aria-label="Suraj Kokane Home"
      >
        <div className="logo-chip">
          <span className="logo-chip-text">SK</span>
          <div className="logo-dot" />
        </div>
        <div className="logo-text">
          <span className="logo-name">Suraj Kokane</span>
          <span className="logo-title">VLSI Engineer</span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <ul className="navbar-links" role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              to={href}
              className={`navbar-link ${location.pathname === href ? 'active' : ''}`}
              onClick={() => {
                handleNavClick();
                playSound('click');
              }}
            >
              {label}
              <span className="link-underline" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="navbar-actions">
        {/* Mute toggle */}
        <button
          className="theme-toggle"
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            localStorage.setItem('portfolio_muted', String(newMuted));
            if (!newMuted) playSound('click');
          }}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
          id="mute-toggle-btn"
        >
          <div className={`toggle-track ${isMuted ? 'muted' : ''}`}>
             <div className="toggle-thumb">
                {isMuted ? <MuteIcon /> : <SpeakerIcon />}
             </div>
          </div>
        </button>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          id="theme-toggle-btn"
        >
          <div className={`toggle-track ${theme === 'light' ? 'toggle-light' : ''}`}>
            <div className="toggle-thumb">
              {theme === 'dark' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.75 15.5A9.75 9.75 0 1 1 8.5 2.25c.426 0 .84.028 1.245.082a7.5 7.5 0 0 0 9.922 9.923 9.77 9.77 0 0 1 .083 1.245z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 15a5 5 0 1 1 0-10A5 5 0 0 1 12 17zm7-6a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM5 12a1 1 0 1 1 0-2H4a1 1 0 1 1 0 2h1zM18.364 5.636a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.757 16.243a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM21 12a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM4 12a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zM18.364 18.364a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.757 7.757a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 1 7.05 5.636l.707.707a1 1 0 0 1 0 1.414z"/>
                </svg>
              )}
            </div>
          </div>
        </button>

        {/* Download CV button */}
        <Link
          to="/contact"
          className="navbar-cta"
          onClick={() => {
            handleNavClick();
            playSound('click');
          }}
          id="navbar-cta-btn"
        >
          Hire Me
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            playSound('pop');
          }}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                to={href}
                className={`mobile-link ${location.pathname === href ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-actions">
          <button className="theme-toggle" onClick={onThemeToggle}>
            {theme === 'dark' ? '☀ Light Mode' : '☽ Dark Mode'}
          </button>
          <button 
            className="theme-toggle" 
            onClick={() => {
              const newMuted = !isMuted;
              setIsMuted(newMuted);
              localStorage.setItem('portfolio_muted', String(newMuted));
            }}
          >
            {isMuted ? '🔊 Unmute Sounds' : '🔇 Mute Sounds'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
