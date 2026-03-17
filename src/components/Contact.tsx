import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    if (!formRef.current) return;

    const SERVICE_ID = 'service_bjosp3s';
    const TEMPLATE_ID = 'template_903ly5e';
    const PUBLIC_KEY = '1eXwQ04lsW44pgcZp';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setSending(false);
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        },
        (error) => {
          setSending(false);
          console.error('FAILED...', error.text);
          alert('Failed to send the message. Please try again later.');
        },
      );
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="chip-pattern" aria-hidden="true" />
      <div className="glow-orb contact-orb-1" aria-hidden="true" />
      <div className="glow-orb contact-orb-2" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">Get in touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle" style={{ display: 'block', textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
            Open for internships, collaborations, and VLSI design discussions. Let's build something great together.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info panel */}
          <div className="contact-info" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <div className="contact-info-card glass-card">
              <h3 className="contact-info-title">Let's Connect</h3>
              <p className="contact-info-text">
                Whether you're looking for a passionate VLSI intern, want to discuss a digital design project,
                or just want to talk semiconductors — I'm all ears.
              </p>

              <div className="contact-links">
                {[
                  { icon: '📧', label: 'Email', value: 'kokanesuraj123@gmail.com', href: 'mailto:kokanesuraj123@gmail.com' },
                  { icon: '💼', label: 'LinkedIn', value: 'Suraj-Kokane', href: 'https://www.linkedin.com/in/suraj-kokane-701838397/' },
                  { icon: '🐙', label: 'GitHub', value: 'Github', href: 'https://github.com/Suraj-Kokane' },
                  { icon: '📍', label: 'Location', value: 'India', href: '#' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact-link-icon">{link.icon}</span>
                    <div>
                      <div className="contact-link-label">{link.label}</div>
                      <div className="contact-link-value">{link.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="contact-availability">
                <div className="availability-dot" />
                <span>Currently available for internships and part-time roles</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            {submitted ? (
              <div className="contact-success glass-card">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn-outline" onClick={() => setSubmitted(false)} id="contact-send-another-btn">
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form glass-card" id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Suraj Kokane"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="VLSI Internship Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn-primary form-submit ${sending ? 'btn-sending' : ''}`}
                  disabled={sending}
                  id="contact-submit-btn"
                >
                  {sending ? (
                    <>
                      <div className="btn-spinner" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
