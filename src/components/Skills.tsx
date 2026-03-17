import { useRef } from 'react';
import './Skills.css';

interface SkillItem {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'hdl',
    icon: '💻',
    title: 'HDL & Programming',
    skills: [
      { name: 'Verilog', level: 90, color: '#7c5cfc' },
      { name: 'VHDL', level: 82, color: '#00d4ff' },
      { name: 'SystemVerilog', level: 75, color: '#7c5cfc' },
      { name: 'MATLAB', level: 70, color: '#00d4ff' },
      { name: 'Python', level: 65, color: '#ff6b6b' },
    ],
  },
  {
    id: 'design',
    icon: '⚡',
    title: 'VLSI & Digital Design',
    skills: [
      { name: 'RTL Design', level: 88, color: '#00ff88' },
      { name: 'Physical Design', level: 72, color: '#7c5cfc' },
      { name: 'Logic Synthesis', level: 78, color: '#00d4ff' },
      { name: 'Timing Analysis (STA)', level: 70, color: '#00ff88' },
      { name: 'DFT / Scan Insertion', level: 65, color: '#ff6b6b' },
    ],
  },
  {
    id: 'tools',
    icon: '🔧',
    title: 'EDA Tools & Platforms',
    skills: [
      { name: 'Cadence Virtuoso', level: 80, color: '#7c5cfc' },
      { name: 'Xilinx Vivado', level: 85, color: '#00d4ff' },
      { name: 'ModelSim / QuestaSim', level: 82, color: '#ff6b6b' },
      { name: 'Synopsys Design Compiler', level: 68, color: '#00ff88' },
      { name: 'Mentor Graphics', level: 65, color: '#7c5cfc' },
    ],
  },
  {
    id: 'concepts',
    icon: '🔬',
    title: 'Core Concepts',
    skills: [
      { name: 'CMOS Circuit Design', level: 85, color: '#00d4ff' },
      { name: 'Digital Signal Processing', level: 75, color: '#7c5cfc' },
      { name: 'Computer Architecture', level: 78, color: '#00ff88' },
      { name: 'FPGA Prototyping', level: 80, color: '#ff6b6b' },
      { name: 'Semiconductor Physics', level: 70, color: '#00d4ff' },
    ],
  },
];

const SkillBar = ({ skill, index }: { skill: SkillItem; index: number }) => {
  return (
    <div className="skill-bar-item" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="skill-bar-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
            boxShadow: `0 0 12px ${skill.color}50`,
          }}
        />
        <div
          className="skill-bar-glow"
          style={{ left: `${skill.level}%`, background: skill.color }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="skills" className="skills-section section">
      <div className="chip-pattern" aria-hidden="true" />
      <div className="glow-orb skills-orb-1" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">What I know</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            From HDL coding to silicon tape-out — a comprehensive toolkit honed through projects and coursework
          </p>
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.id}
              className="skill-category glass-card"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={`${catIdx * 100}`}
            >
              <div className="skill-cat-header">
                <div className="skill-cat-icon">{cat.icon}</div>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <div className="skill-bars">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Tech icons row */}
        <div
          className="skills-tech-row"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="200"
        >
          <div className="tech-row-label">Also familiar with</div>
          <div className="tech-pills">
            {[
              'Proteus', 'LTSpice', 'KiCad', 'ARM Cortex',
              'I2C / SPI / UART', 'AXI Bus', 'DDR Memory', 'UVM'
            ].map(tech => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
