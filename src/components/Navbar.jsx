import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import site from '../site/config'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src={site.brand.logo} alt={site.brand.logoAlt} />
        </Link>

        <div
          id="primary-nav"
          className="nav-links"
          style={{ display: menuOpen ? 'flex' : undefined }}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book-consultation"
            className="btn btn-primary mobile-btn"
            onClick={closeMenu}
          >
            Book Consultation
          </Link>
        </div>

        <Link to="/book-consultation" className="btn btn-primary desktop-btn">
          Book Consultation
        </Link>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
