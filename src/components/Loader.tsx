import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    let start: number | null = null;
    const duration = 2800;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setPhase('done');
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className={`loader-overlay ${phase === 'done' ? 'loader-exit' : ''}`}>
      {/* Animated circuit paths */}
      <div className="loader-circuit">
        <svg viewBox="0 0 800 600" className="circuit-svg" aria-hidden="true">
          {/* Horizontal lines */}
          <line x1="0" y1="150" x2="800" y2="150" className="circuit-line anim-delay-0" />
          <line x1="0" y1="300" x2="800" y2="300" className="circuit-line anim-delay-1" />
          <line x1="0" y1="450" x2="800" y2="450" className="circuit-line anim-delay-2" />
          {/* Vertical lines */}
          <line x1="200" y1="0" x2="200" y2="600" className="circuit-line anim-delay-1" />
          <line x1="400" y1="0" x2="400" y2="600" className="circuit-line anim-delay-0" />
          <line x1="600" y1="0" x2="600" y2="600" className="circuit-line anim-delay-2" />
          {/* Nodes */}
          <circle cx="200" cy="150" r="6" className="circuit-node" />
          <circle cx="400" cy="150" r="6" className="circuit-node" />
          <circle cx="600" cy="150" r="6" className="circuit-node" />
          <circle cx="200" cy="300" r="6" className="circuit-node" />
          <circle cx="400" cy="300" r="10" className="circuit-node node-center" />
          <circle cx="600" cy="300" r="6" className="circuit-node" />
          <circle cx="200" cy="450" r="6" className="circuit-node" />
          <circle cx="400" cy="450" r="6" className="circuit-node" />
          <circle cx="600" cy="450" r="6" className="circuit-node" />
          {/* Traveling pulse */}
          <circle cx="0" cy="150" r="4" className="circuit-pulse pulse-h-1">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M0,0 L800,0" />
          </circle>
          <circle cx="0" cy="300" r="4" className="circuit-pulse pulse-h-2">
            <animateMotion dur="2s" repeatCount="indefinite" path="M800,0 L0,0" />
          </circle>
          <circle cx="200" cy="0" r="4" className="circuit-pulse pulse-v-1">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,0 L0,600" />
          </circle>
          <circle cx="600" cy="0" r="4" className="circuit-pulse pulse-v-2">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M0,600 L0,0" />
          </circle>
        </svg>
      </div>

      {/* Center chip animation */}
      <div className="loader-center">
        <div className="chip-wrapper">
          <div className="chip-body">
            {/* Chip pins left */}
            <div className="chip-pins chip-pins-left">
              {[0,1,2,3].map(i => (
                <div key={i} className={`chip-pin pin-delay-${i}`} />
              ))}
            </div>
            {/* Chip core */}
            <div className="chip-core">
              <div className="chip-logo">
                <span className="chip-initials">SK</span>
                <div className="chip-scan-line" />
              </div>
              <div className="chip-text">
                <span className="chip-label">VLSI v1.0</span>
              </div>
            </div>
            {/* Chip pins right */}
            <div className="chip-pins chip-pins-right">
              {[0,1,2,3].map(i => (
                <div key={i} className={`chip-pin pin-delay-${i}`} />
              ))}
            </div>
          </div>
          {/* Glow ring */}
          <div className="chip-glow-ring" />
          <div className="chip-glow-ring ring-2" />
        </div>

        {/* Name and title */}
        <div className="loader-identity">
          <h1 className="loader-name">Suraj Kokane</h1>
          <p className="loader-title">VLSI &amp; RTL Design Engineer</p>
        </div>

        {/* Progress bar */}
        <div className="loader-progress-wrapper">
          <div className="loader-progress-bar">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="loader-progress-glow" style={{ left: `${progress}%` }} />
          </div>
          <div className="loader-progress-text">
            <span className="loader-status">{progress < 100 ? 'Initializing Systems...' : 'Design Complete ✓'}</span>
            <span className="loader-percent">{progress}%</span>
          </div>
        </div>

        {/* Boot messages */}
        <div className="loader-console">
          {progress >= 10 && <p className="console-line">&gt; Loading RTL modules...</p>}
          {progress >= 40 && <p className="console-line">&gt; Synthesizing VLSI layout...</p>}
          {progress >= 70 && <p className="console-line">&gt; Running DRC checks...</p>}
          {progress >= 90 && <p className="console-line">&gt; Portfolio ready! ✓</p>}
        </div>
      </div>
    </div>
  );
};

export default Loader;
