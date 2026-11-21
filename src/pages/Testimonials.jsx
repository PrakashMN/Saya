import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import content from '../site/content'

export default function Testimonials() {
  return (
    <>
      <PageHero title="Testimonials" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Client Feedback</span>
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle">
                Hear from our clients about their experience working with us.
              </p>
            </div>
            <div className="testimonials-grid">
              {content.testimonials.map((testimonial) => (
                <div key={`${testimonial.name}-${testimonial.quote}`} className="testimonial-card">
                  <div className="stars">{'★'.repeat(testimonial.stars)}</div>
                  <p className="quote">"{testimonial.quote}"</p>
                  <div className="client">
                    <img src={testimonial.img} alt={testimonial.name} loading="lazy" />
                    <div className="client-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
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
