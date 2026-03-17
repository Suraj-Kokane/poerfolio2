import './Projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  highlights: string[];
  status: string;
}

const PROJECTS: Project[] = [
  {
    id: 'cpu',
    title: '8-bit RISC CPU Core',
    description:
      'Designed and verified a fully functional 8-bit RISC processor in Verilog with 16 custom instructions, pipelining support, and Harvard architecture.',
    tags: ['Verilog', 'ModelSim', 'RTL', 'RISC'],
    icon: '🖥️',
    color: '#7c5cfc',
    highlights: ['16 custom ISA instructions', 'Harvard architecture', '5-stage pipeline'],
    status: 'Completed',
  },
  {
    id: 'alu',
    title: '32-bit ALU with Overflow Detection',
    description:
      'Implemented a high-performance 32-bit Arithmetic Logic Unit in SystemVerilog with comprehensive testbench validation, carry-lookahead adder, and overflow detection.',
    tags: ['SystemVerilog', 'Vivado', 'FPGA', 'Arithmetic'],
    icon: '➕',
    color: '#00d4ff',
    highlights: ['Carry-lookahead adder', 'Overflow detection', 'FPGA synthesized'],
    status: 'Completed',
  },
  {
    id: 'uart',
    title: 'UART Communication Controller',
    description:
      'RTL implementation of a full-duplex UART module with configurable baud rate, parity checking, and FIFO buffer integration for reliable serial communication.',
    tags: ['Verilog', 'UART', 'FIFO', 'RTL'],
    icon: '📡',
    color: '#00ff88',
    highlights: ['Full-duplex UART', 'Configurable baud rate', 'FIFO buffers'],
    status: 'Completed',
  },
  {
    id: 'fir',
    title: 'FIR Filter — Digital Signal Processing',
    description:
      'FPGA implementation of a 16-tap FIR low-pass filter using Verilog with direct-form architecture, optimized for timing closure at 100 MHz.',
    tags: ['Verilog', 'DSP', 'FPGA', 'Filter Design'],
    icon: '📊',
    color: '#ff6b6b',
    highlights: ['16-tap FIR filter', '100 MHz timing closure', 'Direct form architecture'],
    status: 'Completed',
  },
  {
    id: 'sram',
    title: '6T SRAM Cell Design (CMOS)',
    description:
      'Designed and simulated a 6-transistor SRAM cell using Cadence Virtuoso at 180nm process node, with full characterization of read/write margins.',
    tags: ['Cadence', 'CMOS', 'SRAM', '180nm'],
    icon: '💾',
    color: '#7c5cfc',
    highlights: ['6T SRAM topology', '180nm CMOS', 'Cadence Virtuoso'],
    status: 'Completed',
  },
  {
    id: 'soc',
    title: 'SoC Integration Project',
    description:
      'Top-level SoC integration in Verilog connecting a custom CPU, UART, memory controller, and GPIO peripherals via AXI bus interface.',
    tags: ['Verilog', 'SoC', 'AXI', 'Integration'],
    icon: '🔲',
    color: '#00d4ff',
    highlights: ['AXI bus interface', 'Multi-IP integration', 'GPIO & UART peripherals'],
    status: 'In Progress',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section section">
      <div className="chip-pattern" aria-hidden="true" />
      <div className="glow-orb projects-orb" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">What I've built</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle" style={{ display: 'block', textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
            Real-world VLSI and RTL projects demonstrating end-to-end digital design expertise
          </p>
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="project-card glass-card"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={`${(idx % 3) * 100}`}
            >
              {/* Status badge */}
              <div className={`project-status ${project.status === 'In Progress' ? 'status-progress' : 'status-done'}`}>
                <span className="status-dot" />
                {project.status}
              </div>

              {/* Icon */}
              <div className="project-icon" style={{ background: `${project.color}18`, borderColor: `${project.color}40` }}>
                <span>{project.icon}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Highlights */}
              <ul className="project-highlights">
                {project.highlights.map(h => (
                  <li key={h}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag" style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover glow border */}
              <div
                className="project-border-glow"
                style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
