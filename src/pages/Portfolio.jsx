import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import content from '../site/content'

const projects = content.portfolio
const categories = ['All', ...new Set(projects.map((project) => project.category))]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered =
    active === 'All'
      ? projects
      : projects.filter((project) => project.category === active)

  return (
    <>
      <PageHero title="Portfolio" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Work</span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                A showcase of our finest work, spanning residential, commercial, and
                hospitality projects.
              </p>
            </div>
            <div className="portfolio-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={active === category ? 'active' : ''}
                  aria-pressed={active === category}
                  onClick={() => setActive(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="portfolio-grid">
              {filtered.map((project, index) => (
                <div
                  key={project.title}
                  className={`portfolio-item ${index === 0 ? 'tall' : ''}`}
                >
                  <img src={project.img} alt={project.title} loading="lazy" />
                  <div className="overlay">
                    <p>{project.category} — {project.location}</p>
                    <h3>{project.title}</h3>
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
