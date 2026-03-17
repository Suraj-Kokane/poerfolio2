import { useState, useEffect } from 'react';
import './LogicSimulator.css';

const LogicSimulator = () => {
  // Simulator state: Inputs A and B
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);

  // Gates output states
  const gates = {
    AND: inputA & inputB,
    OR: inputA | inputB,
    XOR: inputA ^ inputB,
    NAND: ~(inputA & inputB) & 1,
  };

  // Historic data for the waveform visualization
  const [history, setHistory] = useState(() => {
    const init = Array(20).fill({ A: 0, B: 0, AND: 0, OR: 0, XOR: 0, NAND: 1 });
    return init;
  });

  // Pulse effect trigger
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const newEntry = {
      A: inputA,
      B: inputB,
      AND: gates.AND,
      OR: gates.OR,
      XOR: gates.XOR,
      NAND: gates.NAND,
    };
    
    setHistory(prev => {
      const next = [...prev, newEntry];
      if (next.length > 20) return next.slice(next.length - 20); // Keep last 20 ticks
      return next;
    });

    setPulse(prev => prev + 1);
  }, [inputA, inputB]);

  const toggleA = () => setInputA(a => a ^ 1);
  const toggleB = () => setInputB(b => b ^ 1);

  // Generate SVG path for a waveform logic signal based on binary history array
  const createWaveformPath = (signalHistory: number[]) => {
    if (signalHistory.length === 0) return '';
    let path = '';
    const stepX = 15; // Width of each time tick
    const HIGH_Y = 10;
    const LOW_Y = 30;

    let currentY = signalHistory[0] ? HIGH_Y : LOW_Y;
    path += `M 0,${currentY} `;

    for (let i = 1; i < signalHistory.length; i++) {
      const nextY = signalHistory[i] ? HIGH_Y : LOW_Y;
      const x = i * stepX;
      if (nextY !== currentY) {
        // Draw vertical edge if changing state
        path += `L ${x},${currentY} L ${x},${nextY} `;
      }
      path += `L ${x + stepX},${nextY} `;
      currentY = nextY;
    }
    return path;
  };

  return (
    <section id="simulator" className="simulator-section section">
      <div className="container">
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">Interactive Playground</span>
          <h2 className="section-title">Digital Logic Sandbox</h2>
          <p className="section-subtitle" style={{ display: 'block', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            Toggle the inputs below to see how fundamental digital logic gates react in real-time, accompanied by an interactive RTL waveform viewer.
          </p>
        </div>

        <div className="sim-container glass-card" data-aos="zoom-in" data-aos-duration="800">
          
          <div className="sim-grid">
            {/* Control Panel (Inputs) */}
            <div className="sim-panel sim-inputs">
              <h3 className="sim-panel-title">Signal Generators</h3>
              
              <div className="input-switches">
                {/* Input A Switch */}
                <div className="sim-switch-wrapper">
                  <div className="sim-switch-label">
                    <span>Input A</span>
                    <span className={`sim-value ${inputA ? 'sim-high' : 'sim-low'}`}>{inputA}</span>
                  </div>
                  <button 
                    className={`sim-switch ${inputA ? 'switch-on' : 'switch-off'}`} 
                    onClick={toggleA}
                    id="sim-switch-a"
                  >
                    <div className="switch-thumb" />
                  </button>
                </div>

                {/* Input B Switch */}
                <div className="sim-switch-wrapper">
                  <div className="sim-switch-label">
                    <span>Input B</span>
                    <span className={`sim-value ${inputB ? 'sim-high' : 'sim-low'}`}>{inputB}</span>
                  </div>
                  <button 
                    className={`sim-switch ${inputB ? 'switch-on' : 'switch-off'}`} 
                    onClick={toggleB}
                    id="sim-switch-b"
                  >
                    <div className="switch-thumb" />
                  </button>
                </div>
              </div>
              
              <div className="sim-chip-graphic">
                <div className="sim-chip">
                  <div className="sim-chip-core">ALU Core</div>
                  {/* Visual indication of pulse on change */}
                  <div key={pulse} className="sim-pulse-ring" />
                </div>
              </div>
            </div>

            {/* Output Panel (Gates) */}
            <div className="sim-panel sim-outputs">
              <h3 className="sim-panel-title">Logic Synthesis</h3>
              
              <div className="gates-grid">
                {[
                  { name: 'AND', val: gates.AND, color: '#7c5cfc' },
                  { name: 'OR', val: gates.OR, color: '#00d4ff' },
                  { name: 'XOR', val: gates.XOR, color: '#00ff88' },
                  { name: 'NAND', val: gates.NAND, color: '#ff6b6b' },
                ].map(gate => (
                  <div key={gate.name} className={`gate-card ${gate.val ? 'gate-active' : ''}`} style={{ '--gate-color': gate.color } as React.CSSProperties}>
                    <div className="gate-name">{gate.name}</div>
                    <div className="gate-led">
                      <div className="led-bulb" />
                      <span className="gate-val">{gate.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waveform Viewer */}
            <div className="sim-panel sim-waveform">
              <h3 className="sim-panel-title">Trace Viewer (Waveform)</h3>
              <div className="waveform-display">
                {[
                  { label: 'CLK', data: history.map((_, i) => i % 2), color: '#5a5a70' },
                  { label: 'sig_A', data: history.map(h => h.A), color: '#e8e8f0' },
                  { label: 'sig_B', data: history.map(h => h.B), color: '#e8e8f0' },
                  { label: 'out_AND', data: history.map(h => h.AND), color: '#7c5cfc' },
                  { label: 'out_XOR', data: history.map(h => h.XOR), color: '#00ff88' },
                ].map((signal) => (
                  <div key={signal.label} className="wave-row">
                    <div className="wave-label" style={{ color: signal.color }}>{signal.label}</div>
                    <div className="wave-trace-container">
                      <svg className="wave-svg" viewBox="0 0 300 40" preserveAspectRatio="none">
                        <path 
                          className="wave-path" 
                          d={createWaveformPath(signal.data)} 
                          style={{ stroke: signal.color, fill: 'none', strokeWidth: 2, vectorEffect: 'non-scaling-stroke' }} 
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                
                {/* Time cursor line indicating latest state */}
                <div className="wave-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogicSimulator;
