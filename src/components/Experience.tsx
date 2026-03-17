import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  org: string;
  type: 'education' | 'project' | 'internship';
  description: string;
  tags: string[];
  icon: string;
}

const TIMELINE: TimelineItem[] = [
  {
    id: 'btech',
    year: '2021 – Present',
    title: 'B.Tech in Electronics & Computer Engineering',
    org: 'University / College',
    type: 'education',
    description: 'Pursuing a comprehensive ECE degree with specialization in VLSI Design and RTL Design. Coursework includes Digital IC Design, CMOS Circuit Design, Embedded Systems, and Computer Architecture.',
    tags: ['VLSI', 'RTL', 'Digital Design', 'B.Tech'],
    icon: '🎓',
  },
  {
    id: 'vlsi-lab',
    year: '2022',
    title: 'VLSI Lab Projects',
    org: 'Academic Lab',
    type: 'project',
    description: 'Completed multiple VLSI lab assignments including CMOS inverter layout, full-adder design, and flip-flop characterization using Cadence Virtuoso at 180nm process.',
    tags: ['Cadence', 'CMOS', 'Layout', '180nm'],
    icon: '🔬',
  },
  {
    id: 'fpga-project',
    year: '2023',
    title: 'FPGA Implementation Capstone',
    org: 'College Project',
    type: 'project',
    description: 'Designed and implemented a custom RISC processor on Xilinx Artix-7 FPGA board, achieving full functional verification and 50 MHz clock synthesis.',
    tags: ['Vivado', 'FPGA', 'Verilog', 'RISC'],
    icon: '⚡',
  },
  {
    id: 'internship',
    year: '2023',
    title: 'VLSI Design Intern (Aspirant)',
    org: 'Semiconductor Industry',
    type: 'internship',
    description: 'Actively seeking internship opportunities in RTL design, physical design, or verification to apply academic skills in an industrial environment.',
    tags: ['RTL Design', 'Verification', 'Open to Offers'],
    icon: '🏢',
  },
  {
    id: 'advanced',
    year: '2024',
    title: 'Advanced RTL & SoC Design',
    org: 'Self-Study / Online Courses',
    type: 'education',
    description: 'Pursuing advanced coursework in SystemVerilog, UVM-based verification, ARM Cortex integration, AXI protocols, and advanced timing closure techniques.',
    tags: ['SystemVerilog', 'UVM', 'AXI', 'SoC'],
    icon: '📚',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    let ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate the timeline line
      const line = sectionRef.current?.querySelector('.timeline-line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const typeColor: Record<string, string> = {
    education: '#7c5cfc',
    project: '#00d4ff',
    internship: '#00ff88',
  };

  return (
    <section ref={sectionRef} id="experience" className="experience-section section">
      <div className="chip-pattern" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">My journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle" style={{ display: 'block', textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
            A timeline of key milestones in my ECE and VLSI design journey
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="timeline">
          {/* Center line */}
          <div className="timeline-line">
            <div className="timeline-line-fill" />
          </div>

          {TIMELINE.map((item, i) => (
            <div key={item.id} className={`timeline-item ${i % 2 === 0 ? 'item-left' : 'item-right'}`}>
              {/* Content card */}
              <div className="timeline-card glass-card">
                {/* Top: year + type */}
                <div className="timeline-card-top">
                  <span className="timeline-year">{item.year}</span>
                  <span
                    className="timeline-type"
                    style={{ color: typeColor[item.type], borderColor: `${typeColor[item.type]}40`, background: `${typeColor[item.type]}10` }}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="timeline-card-body">
                  <div className="timeline-icon" style={{ background: `${typeColor[item.type]}15`, borderColor: `${typeColor[item.type]}40` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="timeline-org">{item.org}</div>
                  </div>
                </div>

                <p className="timeline-desc">{item.description}</p>

                <div className="timeline-tags">
                  {item.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Center dot */}
              <div className="timeline-dot" style={{ borderColor: typeColor[item.type], boxShadow: `0 0 16px ${typeColor[item.type]}60` }}>
                <div className="dot-core" style={{ background: typeColor[item.type] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
