import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

interface StackPage {
  id: string;
  label: string;
  icon: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  accentColor: string;
}

const STACK_PAGES: StackPage[] = [
  {
    id: 'rtl',
    label: '01',
    icon: '💻',
    title: 'RTL Design',
    subtitle: 'Register Transfer Level',
    accentColor: '#7c5cfc',
    content: (
      <div className="stack-content-inner">
        <div className="stack-code-block">
          <div className="code-header">
            <span className="code-dot dot-red" /><span className="code-dot dot-yellow" /><span className="code-dot dot-green" />
            <span className="code-title">counter_8bit.v</span>
          </div>
          <pre className="code-body">{`module counter_8bit (
  input  wire       clk,
  input  wire       rst_n,
  output reg [7:0]  count
);
  always @(posedge clk or
           negedge rst_n) begin
    if (!rst_n)
      count <= 8'h00;
    else
      count <= count + 1'b1;
  end
endmodule`}</pre>
        </div>
        <div className="stack-features">
          {['Verilog / VHDL / SystemVerilog', 'FSM Design', 'Pipelining & Hazard Resolution', 'RTL Simulation & Debugging'].map(f => (
            <div key={f} className="stack-feature-item">
              <span className="feature-dot" style={{ background: '#7c5cfc' }} /> {f}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'synthesis',
    label: '02',
    icon: '⚙️',
    title: 'Logic Synthesis',
    subtitle: 'RTL to Gate-Level Netlist',
    accentColor: '#00d4ff',
    content: (
      <div className="stack-content-inner">
        <div className="synthesis-flow">
          {[
            { step: 'RTL Code', desc: 'Verilog / VHDL', icon: '📝' },
            { step: 'Synthesis', desc: 'Synopsys DC', icon: '⚙️' },
            { step: 'Netlist', desc: 'Gate-Level', icon: '🔗' },
            { step: 'STA', desc: 'Timing Analysis', icon: '⏱️' },
          ].map((s, i) => (
            <div key={s.step} className="flow-step">
              <div className="flow-step-icon" style={{ borderColor: '#00d4ff40', background: '#00d4ff10' }}>{s.icon}</div>
              <div className="flow-step-info">
                <span className="flow-step-name">{s.step}</span>
                <span className="flow-step-desc">{s.desc}</span>
              </div>
              {i < 3 && <div className="flow-arrow" style={{ color: '#00d4ff' }}>→</div>}
            </div>
          ))}
        </div>
        <div className="stack-features">
          {['Constraint Generation (SDC)', 'Area & Timing Optimization', 'Power Analysis', 'Scan Chain Insertion'].map(f => (
            <div key={f} className="stack-feature-item">
              <span className="feature-dot" style={{ background: '#00d4ff' }} /> {f}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'physical',
    label: '03',
    icon: '🔲',
    title: 'Physical Design',
    subtitle: 'Floor Plan to GDSII',
    accentColor: '#00ff88',
    content: (
      <div className="stack-content-inner">
        <div className="physical-steps">
          {[
            { name: 'Floorplanning', pct: 95 },
            { name: 'Placement', pct: 88 },
            { name: 'CTS (Clock Tree)', pct: 82 },
            { name: 'Routing', pct: 78 },
            { name: 'DRC / LVS', pct: 85 },
          ].map(({ name, pct }) => (
            <div key={name} className="phys-step">
              <div className="phys-step-header">
                <span>{name}</span>
                <span style={{ color: '#00ff88', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{pct}%</span>
              </div>
              <div className="phys-bar-track">
                <div className="phys-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00ff88, #00cc66)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'verification',
    label: '04',
    icon: '✅',
    title: 'Verification',
    subtitle: 'Functional & Formal',
    accentColor: '#ff6b6b',
    content: (
      <div className="stack-content-inner">
        <div className="verif-cards">
          {[
            { title: 'Simulation', desc: 'ModelSim / QuestaSim testbench verification', icon: '🔭' },
            { title: 'Formal', desc: 'Equivalence checking & property verification', icon: '📐' },
            { title: 'Coverage', desc: 'Code, FSM, and functional coverage metrics', icon: '📊' },
            { title: 'UVM', desc: 'Universal Verification Methodology framework', icon: '🏗️' },
          ].map(v => (
            <div key={v.title} className="verif-card">
              <span className="verif-icon">{v.icon}</span>
              <div>
                <div className="verif-title" style={{ color: '#ff6b6b' }}>{v.title}</div>
                <div className="verif-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const ScrollStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.stack-panel');
      const totalPanels = panels.length;

      // Pin the wrapper and scroll through panels
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalPanels * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Stack each panel over the previous one
      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(
          panel,
          { yPercent: 100 },
          { yPercent: 0, ease: 'none', duration: 1 },
          i - 1
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="stack-outer" className="scroll-stack-outer">
      <div ref={containerRef} className="scroll-stack-container">
        <div ref={wrapperRef} className="scroll-stack-wrapper">
          {STACK_PAGES.map((page, i) => (
            <div
              key={page.id}
              className="stack-panel"
              style={{
                zIndex: i + 1,
                '--accent': page.accentColor,
              } as React.CSSProperties}
            >
              {/* Background pattern */}
              <div className="stack-panel-bg">
                <div className="chip-pattern" style={{ opacity: 0.03 }} />
                <div className="stack-orb" style={{ background: `radial-gradient(circle, ${page.accentColor}18 0%, transparent 70%)` }} />
              </div>

              <div className="stack-panel-content">
                {/* Left: info */}
                <div className="stack-left">
                  <div className="stack-panel-number">{page.label}</div>
                  <div className="stack-panel-icon" style={{ borderColor: `${page.accentColor}40`, background: `${page.accentColor}12` }}>
                    {page.icon}
                  </div>
                  <h2 className="stack-panel-title" style={{ color: page.accentColor }}>
                    {page.title}
                  </h2>
                  <p className="stack-panel-subtitle">{page.subtitle}</p>
                  <div
                    className="stack-panel-bar"
                    style={{ background: `linear-gradient(90deg, ${page.accentColor}, transparent)` }}
                  />
                </div>

                {/* Right: dynamic content */}
                <div className="stack-right">
                  {page.content}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="stack-panel-bottom">
                <div className="stack-progress">
                  {STACK_PAGES.map((_, pi) => (
                    <div
                      key={pi}
                      className={`stack-progress-dot ${pi === i ? 'active' : pi < i ? 'passed' : ''}`}
                    />
                  ))}
                </div>
                <span className="stack-scroll-hint">
                  {i < STACK_PAGES.length - 1 ? 'Scroll to continue →' : 'Scroll to see more sections'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
