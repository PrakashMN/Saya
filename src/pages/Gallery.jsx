import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import content from '../site/content'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [lightbox])

  return (
    <>
      <PageHero title="Gallery" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Inspiration</span>
              <h2 className="section-title">Photo Gallery</h2>
              <p className="section-subtitle">
                Browse through our collection of stunning interiors for inspiration.
              </p>
            </div>
            <div className="gallery-grid">
              {content.gallery.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="gallery-item"
                  onClick={() => setLightbox(item)}
                  aria-label={`View ${item.title}`}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <span className="overlay" aria-hidden="true">
                    <span className="icon"><i className="fas fa-expand"></i></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div
        className={`lightbox ${lightbox ? 'active' : ''}`}
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        aria-hidden={!lightbox}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={(event) => {
            event.stopPropagation()
            setLightbox(null)
          }}
          aria-label="Close preview"
        >
          <i className="fas fa-times"></i>
        </button>
        {lightbox && (
          <img
            src={lightbox.img}
            alt={lightbox.title}
            onClick={(event) => event.stopPropagation()}
          />
        )}
      </div>

      <CtaSection />
    </>
  )
}
