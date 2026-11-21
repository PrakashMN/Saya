import { useState } from 'react'
import PageHero from '../components/PageHero'
import CtaSection from '../components/CtaSection'
import ScrollReveal from '../components/ScrollReveal'
import content from '../site/content'

export default function Faq() {
  const [open, setOpen] = useState(null)

  const toggle = (index) => setOpen(open === index ? null : index)

  return (
    <>
      <PageHero title="FAQ" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Got Questions?</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Find answers to common questions about our services and process.
              </p>
            </div>
            <div className="faq-section">
              {content.faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className={`faq-item ${open === index ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    className="faq-question"
                    onClick={() => toggle(index)}
                    aria-expanded={open === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {faq.q}
                    <div className="icon"><i className="fas fa-plus"></i></div>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p>{faq.a}</p>
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
