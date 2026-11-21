import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import BookConsultation from './pages/BookConsultation'
import NotFound from './pages/NotFound'
import site from './site/config'

const routeTitles = {
  '/': null,
  '/about': 'About Us',
  '/services': 'Services',
  '/portfolio': 'Portfolio',
  '/gallery': 'Gallery',
  '/testimonials': 'Testimonials',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/book-consultation': 'Book a Consultation',
}

function hasLoaded() {
  try {
    return sessionStorage.getItem(`${site.slug}:loaded`) !== null
  } catch {
    return true
  }
}

function markLoaded() {
  try {
    sessionStorage.setItem(`${site.slug}:loaded`, '1')
  } catch {
    // Storage can be unavailable in private modes; the site still works.
  }
}

function PageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = routeTitles[pathname]
    document.title = page ? `${page} | ${site.brand.name}` : site.seo.title
  }, [pathname])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(() => !hasLoaded())

  useEffect(() => {
    markLoaded()
    if (!loading) return
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen />}
      <PageMeta />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
