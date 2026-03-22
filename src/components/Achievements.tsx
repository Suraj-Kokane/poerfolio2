import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './Achievements.css';

const DETAILS = {
  title: '1st Place - Coding Relay (CP) 2026',
  location: 'Technovanza, VJTI Mumbai',
  date: 'March 2026',
  description: `Proud to share that our team secured 🥇 1st Place in the Coding Relay (CP) 2026 at Technovanza, VJTI Mumbai. 🔥

Competing with talented programmers, tackling challenging problems under pressure, and pushing our limits made this experience truly unforgettable.

🏆 Prize Worth: ₹15,000 Cash
👥 Team: ALGORISE

This competition was part of Technovanza, the annual tech festival of VJTI Mumbai, bringing together passionate developers and innovators from across the country.

🌐 Event Platform: https://technovanza.in
📌 Hosted via Unstop: https://lnkd.in/ek4JnGtH

A special thanks to Abdul Razzaq Munshi (Techno Coding Ops Head) for organizing and managing such a great event.

Beyond the competition, the Mumbai trip itself was an amazing experience — exploring the city while competing in a high-energy coding event made the journey even more memorable. 📖✨

Looking forward to more challenges, learning opportunities, and victories ahead. 💻🚀`,
  tags: ['Competitive Programming', 'Problem Solving', 'Teamwork', 'Algorithms', 'Hackathon'],
  images: [
    '/achievements/media__1774199102552.png',
    '/achievements/media__1774199125676.jpg',
    '/achievements/media__1774199132089.jpg',
    '/achievements/media__1774199137843.png'
  ]
};

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-section section">
      <div className="chip-pattern" aria-hidden="true" />
      <div className="glow-orb achievements-orb" aria-hidden="true" />

      <div className="container">
        <div className="section-head" data-aos="fade-up" data-aos-duration="700">
          <span className="section-pre-label">Honors & Awards</span>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle" style={{ display: 'block', textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
            Highlighting major wins, competition results, and academic milestones
          </p>
        </div>

        <div className="achievement-card glass-card" data-aos="fade-up" data-aos-duration="800">
          <div className="achievement-slider-container">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="achievement-swiper"
            >
              {DETAILS.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="swiper-img-wrapper">
                    <img src={img} alt={`Achievement slide ${idx + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className="achievement-content">
            <h3 className="achievement-title">{DETAILS.title}</h3>
            
            <div className="achievement-meta">
              <div className="achievement-meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{DETAILS.location}</span>
              </div>
              <div className="achievement-meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{DETAILS.date}</span>
              </div>
            </div>

            <div className="achievement-desc">
              {DETAILS.description.split('\n').map((line, i) => {
                const parts = line.split(/(https?:\/\/[^\s]+)/g);
                return (
                  <span key={i}>
                    {parts.map((part, j) => 
                      /^https?:\/\//.test(part) ? (
                        <a key={j} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
                      ) : (
                        part
                      )
                    )}
                    <br />
                  </span>
                );
              })}
            </div>

            <div className="achievement-tags">
              {DETAILS.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
