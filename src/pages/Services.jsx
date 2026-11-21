import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import content from '../site/content'

export default function Services() {
  return (
    <>
      <PageHero title="Our Services" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Offer</span>
              <h2 className="section-title">Comprehensive Design Solutions</h2>
              <p className="section-subtitle">
                From residential to commercial, we offer end-to-end interior and exterior
                design services tailored to your unique requirements.
              </p>
            </div>
            <div className="services-grid">
              {content.services.map((service) => (
                <div key={service.title} className="service-card">
                  <div className="icon"><i className={service.icon}></i></div>
                  <h3>{service.title}</h3>
                  <p>{service.longDesc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section process-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Process</span>
              <h2 className="section-title">How We Work</h2>
              <p className="section-subtitle">
                A streamlined process designed to bring your vision to life with precision
                and care.
              </p>
            </div>
            <div className="process-steps">
              {content.process.map((step) => (
                <div key={step.number} className="process-step">
                  <div className="step-number">{step.number}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
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
