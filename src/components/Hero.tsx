import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Hero entrance animation
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.hero-tag',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-stats .stat-item',
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)' },
      '-=0.3'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.hero-visual',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Floating animation for visual
    if (floatRef.current) {
      gsap.to(floatRef.current, {
        y: -18,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Orb parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to('.hero-orb-1', { x: mouseX.current * 0.5, y: mouseY.current * 0.5, duration: 1.5, ease: 'power1.out' });
      gsap.to('.hero-orb-2', { x: -mouseX.current * 0.3, y: -mouseY.current * 0.3, duration: 2, ease: 'power1.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    navigate('/about');
  };

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="chip-pattern" aria-hidden="true" />

      <div className="container hero-container">
        {/* Left: Text content */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-dot" />
            <span>Available for opportunities</span>
          </div>

          <h1 ref={titleRef} className="hero-title">
            Designing Silicon<br />
            <span className="gradient-text">One Gate</span><br />
            at a Time
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Hi, I'm <strong>Suraj Kokane</strong> — an ECE engineer specializing in
            <span className="highlight-text"> VLSI Design</span>,
            <span className="highlight-text"> RTL Design</span>, and
            <span className="highlight-text"> Digital Electronics</span>. 
            I craft efficient, scalable digital systems from HDL to silicon.
          </p>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { value: '5+', label: 'VLSI Projects' },
              { value: '3+', label: 'Years Learning' },
              { value: '10+', label: 'HDL Modules' },
            ].map(({ value, label }) => (
              <div key={label} className="stat-item glass-card">
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="hero-cta">
            <button
              className="btn-primary"
              onClick={() => navigate('/projects')}
              id="hero-view-projects-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 10h16M4 14h8"/>
              </svg>
              View Projects
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate('/contact')}
              id="hero-contact-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get in Touch
            </button>
          </div>

          {/* Tech stack pills */}
          <div className="hero-tech-stack">
            {['Verilog', 'VHDL', 'SystemVerilog', 'Cadence', 'Vivado', 'ModelSim'].map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div ref={floatRef} className="hero-visual" aria-hidden="true">
          <div className="hero-chip-display">
            {/* Central chip */}
            <div className="display-chip">
              <div className="display-chip-inner">
                <div className="display-chip-grid">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`grid-cell ${Math.random() > 0.5 ? 'active' : ''}`} />
                  ))}
                </div>
                <div className="display-chip-center">
                  <span className="display-chip-label">RTL</span>
                  <span className="display-chip-sub">28nm</span>
                </div>
                <div className="chip-scan" />
              </div>
              {/* Pins */}
              <div className="display-pins display-pins-top">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="display-pin" />)}
              </div>
              <div className="display-pins display-pins-bottom">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="display-pin" />)}
              </div>
              <div className="display-pins display-pins-left">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="display-pin display-pin-v" />)}
              </div>
              <div className="display-pins display-pins-right">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="display-pin display-pin-v" />)}
              </div>
            </div>

            {/* Orbiting badges */}
            <div className="orbit-badge orbit-badge-1">
              <span className="orbit-icon">⚡</span>
              <span>RTL Design</span>
            </div>
            <div className="orbit-badge orbit-badge-2">
              <span className="orbit-icon">🔌</span>
              <span>VLSI</span>
            </div>
            <div className="orbit-badge orbit-badge-3">
              <span className="orbit-icon">🔬</span>
              <span>DRC/LVS</span>
            </div>

            {/* Signal lines */}
            <svg className="hero-signal-svg" viewBox="0 0 300 300">
              <path d="M150,150 Q100,80 50,60" className="signal-path" style={{ animationDelay: '0s' }} />
              <path d="M150,150 Q200,80 250,60" className="signal-path" style={{ animationDelay: '0.5s' }} />
              <path d="M150,150 Q80,200 40,240" className="signal-path" style={{ animationDelay: '1s' }} />
              <path d="M150,150 Q220,200 260,240" className="signal-path" style={{ animationDelay: '1.5s' }} />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="scroll-indicator" onClick={scrollToAbout} aria-label="Scroll to next section" id="scroll-down-btn">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </button>
    </section>
  );
};

export default Hero;
