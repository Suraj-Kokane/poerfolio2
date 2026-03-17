import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-chip">
                <span className="logo-chip-text">SK</span>
              </div>
              <div>
                <div className="footer-name">Suraj Kokane</div>
                <div className="footer-role">VLSI & RTL Design Engineer</div>
              </div>
            </div>
            <p className="footer-tagline">
              Crafting efficient digital circuits, one gate at a time.
              From RTL to silicon, precision is the process.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Navigation</h4>
            <ul className="footer-links">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Expertise</h4>
            <ul className="footer-links">
              {['VLSI Design', 'RTL Design', 'FPGA Development', 'Logic Synthesis', 'Physical Design', 'Verification'].map(item => (
                <li key={item}><span className="footer-expertise">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-row">
            <p className="footer-copy">
              © {year} Suraj Kokane. Designed & built with ❤️ and lots of Verilog.
            </p>
            <div className="footer-social">
              {[
                { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/suraj-kokane-701838397/' },
                { icon: '🐙', label: 'GitHub', href: 'https://github.com/Suraj-Kokane' },
                { icon: '📧', label: 'Email', href: 'mailto:kokanesuraj123@gmail.com' },
              ].map(s => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  className="footer-social-link" 
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
