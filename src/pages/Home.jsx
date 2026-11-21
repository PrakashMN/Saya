import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import useParallax from '../hooks/useParallax'
import site from '../site/config'
import content from '../site/content'

export default function Home() {
  const heroParallaxRef = useParallax(0.3)
  const heroContentRef = useParallax(-0.04)
  const heroSectionRef = useRef(null)

  useEffect(() => {
    const section = heroSectionRef.current
    if (!section) return
    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6
      section.style.setProperty('--mouse-x', x)
      section.style.setProperty('--mouse-y', y)
    }
    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <section className="hero" ref={heroSectionRef}>
        <div className="hero-bg" ref={heroParallaxRef}>
          <img src={content.hero.image} alt="" aria-hidden="true" />
        </div>
        <div className="container" ref={heroContentRef}>
          <div className="hero-content">
            <span className="hero-tag">{content.hero.tag}</span>
            <h1 className="hero-title">
              {content.hero.titleBefore} <span>{content.hero.titleHighlight}</span>{' '}
              {content.hero.titleAfter}
            </h1>
            <p className="hero-desc">{content.hero.description}</p>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">
                View Our Work <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/book-consultation" className="btn btn-outline-light">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">Our Premium Services</h2>
              <p className="section-subtitle">
                From concept to completion, we offer comprehensive interior and exterior
                design services tailored to your unique vision.
              </p>
            </div>
            <div className="services-grid">
              {content.services.slice(0, 3).map((service) => (
                <div key={service.title} className="service-card">
                  <div className="icon"><i className={service.icon}></i></div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <Link to="/services" className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/services" className="btn btn-outline">
                View All Services <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section" style={{ background: 'var(--accent)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Portfolio</span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Explore our curated selection of signature projects that showcase our
                design excellence.
              </p>
            </div>
            <div className="portfolio-grid">
              {content.portfolio.slice(0, 3).map((item) => (
                <div key={item.title} className="portfolio-item">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="overlay">
                    <p>{item.category}</p>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/portfolio" className="btn btn-outline">
                View Full Portfolio <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="about-intro">
              <div className="about-intro-image">
                <div className="about-img-wrapper">
                  <img
                    src={content.about.image}
                    alt={`About ${site.brand.name}`}
                    loading="lazy"
                  />
                </div>
                <div className="experience-badge">
                  <div className="number">{content.about.badge.value}</div>
                  <div className="label">{content.about.badge.label}</div>
                </div>
              </div>
              <div className="about-intro-text">
                <span className="section-tag">About Us</span>
                <h2>{content.about.introTitle}</h2>
                {content.about.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="about-features">
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

      <CtaSection />
    </>
  )
}
