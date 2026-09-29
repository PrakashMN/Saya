import { Link } from 'react-router-dom'
import useParallax from '../hooks/useParallax'

export default function CtaSection() {
  const parallaxRef = useParallax(0.12)
  return (
    <section className="section cta-section">
      <div className="cta-section-parallax" ref={parallaxRef}></div>
      <div className="container">
        <div className="cta-content">
          <h2>Let's Create Something Beautiful Together</h2>
          <p>Transform your space from the inside out. Schedule a consultation with our design team today.</p>
          <Link to="/book-consultation" className="btn btn-primary">
            Book a Consultation <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
