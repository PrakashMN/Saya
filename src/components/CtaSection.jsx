import { Link } from 'react-router-dom'
import content from '../site/content'
import useParallax from '../hooks/useParallax'

export default function CtaSection() {
  const parallaxRef = useParallax(0.12)
  return (
    <section className="section cta-section">
      <div className="cta-section-parallax" ref={parallaxRef}></div>
      <div className="container">
        <div className="cta-content">
          <h2>{content.cta.title}</h2>
          <p>{content.cta.description}</p>
          <Link to="/book-consultation" className="btn btn-primary">
            {content.cta.button} <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
