import { useState } from 'react'
import { Link } from 'react-router-dom'
import site from '../site/config'
import content from '../site/content'

const socialLinks = [
  { key: 'facebook', label: 'Facebook', icon: 'fab fa-facebook-f' },
  { key: 'instagram', label: 'Instagram', icon: 'fab fa-instagram' },
  { key: 'pinterest', label: 'Pinterest', icon: 'fab fa-pinterest-p' },
  { key: 'houzz', label: 'Houzz', icon: 'fab fa-houzz' },
]

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (event) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <img
              src={site.brand.logo}
              alt={site.brand.logoAlt}
              style={{ height: 68, width: 'auto', marginBottom: 16 }}
            />
            <p>{content.footer.description}</p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={site.social[social.key] || '#'}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              {content.services.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <Link to="/services">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for design inspiration and updates.</p>
            {subscribed ? (
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem' }}>
                Thanks — newsletter signup is not connected yet.
              </p>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  name="newsletter-email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {site.brand.legalName}. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
