import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import FormResult from '../components/FormResult'
import useFormSubmit from '../hooks/useFormSubmit'
import { phoneHref } from '../utils/contact'
import site from '../site/config'
import content from '../site/content'

export default function BookConsultation() {
  const { status, submit, reset } = useFormSubmit()
  const tel = phoneHref(site.contact.phone)
  const today = new Date().toISOString().split('T')[0]

  if (status !== 'idle' && status !== 'submitting') {
    return (
      <>
        <PageHero title="Book a Consultation" />
        <FormResult
          status={status}
          onReset={reset}
          successTitle="Consultation Booked!"
        />
      </>
    )
  }

  return (
    <>
      <PageHero title="Book a Consultation" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="consultation-grid">
              <div className="consultation-info">
                <h2>Let's Discuss Your <span>Dream Space</span></h2>
                <p>
                  Schedule a complimentary consultation with our design team. We'll explore
                  your vision, discuss possibilities, and outline the next steps to bring
                  your dream space to life.
                </p>

                <div className="consultation-benefits">
                  {content.contact.benefits.map((benefit) => (
                    <div key={benefit} className="benefit-item">
                      <div className="icon"><i className="fas fa-check"></i></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="contact-details" style={{ marginTop: '40px' }}>
                  <div className="contact-detail-item">
                    <div className="icon"><i className="fas fa-phone-alt"></i></div>
                    <div>
                      <h4>Prefer to call?</h4>
                      <p>
                        {tel ? (
                          <a href={tel}>{site.contact.phone}</a>
                        ) : (
                          site.contact.phone
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="contact-detail-item">
                    <div className="icon"><i className="fas fa-envelope"></i></div>
                    <div>
                      <h4>Prefer to email?</h4>
                      <p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="consultation-form" onSubmit={submit}>
                <h3>Schedule Your Consultation</h3>
                <p>Fill in your details and we'll get back to you within 24 hours.</p>
                <input
                  type="hidden"
                  name="_subject"
                  value={`New consultation request — ${site.brand.name}`}
                />

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="consultation-name">Full Name *</label>
                    <input
                      id="consultation-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="consultation-email">Email Address *</label>
                    <input
                      id="consultation-email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="consultation-phone">Phone Number *</label>
                    <input
                      id="consultation-phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="consultation-date">Preferred Date</label>
                    <input
                      id="consultation-date"
                      name="date"
                      type="date"
                      min={today}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-project-type">Project Type *</label>
                  <select id="consultation-project-type" name="projectType" required>
                    <option value="">Select project type</option>
                    {content.contact.projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-budget">Project Budget</label>
                  <select id="consultation-budget" name="budget">
                    <option value="">Select budget range</option>
                    {content.contact.budgets.map((budget) => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-location">Project Location</label>
                  <input
                    id="consultation-location"
                    name="location"
                    type="text"
                    placeholder="City / Area"
                    autoComplete="address-level2"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-message">Tell Us About Your Project *</label>
                  <textarea
                    id="consultation-message"
                    name="message"
                    placeholder="Describe your vision, requirements, and any specific ideas you have..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Book Consultation'}{' '}
                  <i className="fas fa-calendar-check"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
