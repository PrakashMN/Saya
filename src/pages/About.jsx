import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import useParallax from '../hooks/useParallax'
import site from '../site/config'
import content from '../site/content'

export default function About() {
  const aboutImgRef = useParallax(0.15)

  return (
    <>
      <PageHero title="About Us" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="about-intro">
              <div className="about-intro-image">
                <div className="about-img-wrapper" ref={aboutImgRef}>
                  <img src={content.about.image} alt="Our Studio" loading="lazy" />
                </div>
                <div className="experience-badge">
                  <div className="number">{content.about.badge.value}</div>
                  <div className="label">{content.about.badge.label}</div>
                </div>
              </div>
              <div className="about-intro-text">
                <span className="section-tag">Our Story</span>
                <h2>{content.about.storyTitle}</h2>
                {content.about.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="about-features" style={{ marginTop: '32px' }}>
                  {content.stats.map((stat) => (
                    <div key={stat.label} className="about-feature-item">
                      <div className="icon"><i className={stat.icon}></i></div>
                      <h4>{stat.value}</h4>
                      <p>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section team-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Team</span>
              <h2 className="section-title">Meet the Experts</h2>
              <p className="section-subtitle">
                A passionate team of designers, architects, and visionaries dedicated to
                transforming spaces.
              </p>
            </div>
            <div className="team-grid">
              {content.team.map((member) => (
                <div key={member.name} className="team-card">
                  <div className="team-card-image">
                    <img src={member.img} alt={member.name} loading="lazy" />
                  </div>
                  <div className="team-card-body">
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                    <p>{member.desc}</p>
                    <div className="team-social">
                      <a
                        href={site.social.linkedin || '#'}
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a
                        href={site.social.twitter || '#'}
                        aria-label={`${member.name} on Twitter`}
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      {site.contact.email && (
                        <a
                          href={`mailto:${site.contact.email}`}
                          aria-label={`Email ${member.name}`}
                        >
                          <i className="fas fa-envelope"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <CtaSection />
    </>
  )
}
