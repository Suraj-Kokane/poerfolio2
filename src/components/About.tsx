import './About.css';
import profileImage from '../me.png';

const About = () => {
  return (
    <section id="about" className="about-section section">
      <div className="chip-pattern" aria-hidden="true" />

      <div className="container">
        <div className="about-grid">
          {/* Left: Photo + Stats */}
          <div
            className="about-left"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="about-photo-wrapper">
              {/* Profile avatar with image */}
              <div className="about-avatar">
                <div className="avatar-inner">
                  <img
                    src={profileImage}
                    alt="Suraj Kokane"
                    className="avatar-img"
                  />
                </div>
                <div className="avatar-ring ring-a" />
                <div className="avatar-ring ring-b" />
                <div className="avatar-badge">
                  <span>🎓</span>
                  <span>ECE</span>
                </div>
              </div>

              {/* Card floating overlays */}
              <div className="about-floating-card card-a glass-card">
                <span className="floating-icon">⚡</span>
                <div>
                  <div className="floating-value">28nm</div>
                  <div className="floating-label">Technology Node</div>
                </div>
              </div>
              <div className="about-floating-card card-b glass-card">
                <span className="floating-icon">🔁</span>
                <div>
                  <div className="floating-value">RTL→GDS</div>
                  <div className="floating-label">Full Design Flow</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio + Info */}
          <div className="about-right">
            <div
              className="section-header"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              <span className="section-pre-label">Who am I?</span>
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">
                Passionate engineer bridging the gap between hardware and innovation
              </p>
            </div>

            <div
              className="about-bio"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <p>
                I'm <strong>Suraj Kokane</strong>, a dedicated Electronics and Computer Engineering
                student specializing in <strong>VLSI Design</strong> and <strong>RTL Design</strong>.
                My passion lies in designing efficient digital circuits that power the modern world.
              </p>
              <p>
                From writing HDL code in Verilog and VHDL to performing timing analysis and
                physical design, I enjoy the full spectrum of the semiconductor design flow.
                I'm particularly fascinated by how <em>tiny transistors</em> orchestrate complex
                computing tasks.
              </p>
              <p>
                When I'm not at the workbench, I explore emerging technologies in AI hardware
                acceleration and contribute to open-source digital design projects.
              </p>
            </div>

            {/* Info grid */}
            <div
              className="about-info-grid"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              {[
                { label: 'Name', value: 'Suraj Kokane' },
                { label: 'Field', value: 'ECE (VLSI / RTL)' },
                { label: 'Location', value: 'India' },
                { label: 'Education', value: 'B.Tech ECE' },
                { label: 'Languages', value: 'Verilog, VHDL, SystemVerilog' },
                { label: 'Availability', value: 'Open to Internships' },
              ].map(({ label, value }) => (
                <div key={label} className="info-item">
                  <span className="info-label">{label}</span>
                  <span className="info-value">{value}</span>
                </div>
              ))}
            </div>

            {/* Specializations */}
            <div
              className="about-specializations"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <h4 className="spec-title">Core Specializations</h4>
              <div className="spec-tags">
                {[
                  'VLSI Design', 'RTL Design', 'Digital Electronics',
                  'CMOS Circuits', 'Physical Design', 'DFT',
                  'Timing Analysis', 'Logic Synthesis'
                ].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
