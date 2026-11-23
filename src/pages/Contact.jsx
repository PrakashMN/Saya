import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import FormResult from '../components/FormResult'
import useFormSubmit from '../hooks/useFormSubmit'
import { phoneHref } from '../utils/contact'
import site from '../site/config'
import content from '../site/content'

export default function Contact() {
  const { status, submit, reset } = useFormSubmit()
  const tel = phoneHref(site.contact.phone)
  const hasAddress = site.contact.addressLines?.length > 0
  const hasPhone = Boolean(site.contact.phone)
  const hasEmail = Boolean(site.contact.email)
  const hasHours = Boolean(site.contact.hours)

  if (status !== 'idle' && status !== 'submitting') {
    return (
      <>
        <PageHero title="Contact Us" />
        <FormResult status={status} onReset={reset} />
      </>
    )
  }

  return (
    <>
      <PageHero title="Contact Us" />

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Let's Start a Conversation</h2>
                <p>
                  Have a project in mind? We'd love to hear from you. Reach out and let's
                  discuss how we can transform your space — inside and out.
                </p>

                <div className="contact-details">
                  {hasAddress && (
                    <div className="contact-detail-item">
                      <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                      <div>
                        <h4>Our Studio</h4>
                        <p>
                          {site.contact.addressLines.map((line, index) => (
                            <span key={line}>
                              {line}
                              {index < site.contact.addressLines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                  {hasPhone && (
                    <div className="contact-detail-item">
                      <div className="icon"><i className="fas fa-phone-alt"></i></div>
                      <div>
                        <h4>Phone</h4>
                        <p>
                          {tel ? (
                            <a href={tel}>{site.contact.phone}</a>
                          ) : (
                            site.contact.phone
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {hasEmail && (
                    <div className="contact-detail-item">
                      <div className="icon"><i className="fas fa-envelope"></i></div>
                      <div>
                        <h4>Email</h4>
                        <p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
                      </div>
                    </div>
                  )}
                  {hasHours && (
                    <div className="contact-detail-item">
                      <div className="icon"><i className="fas fa-clock"></i></div>
                      <div>
                        <h4>Working Hours</h4>
                        <p>{site.contact.hours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form className="contact-form" onSubmit={submit}>
                <h3>Send Us a Message</h3>
                <input
                  type="hidden"
                  name="_subject"
                  value={`New enquiry — ${site.brand.name}`}
                />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <select id="contact-subject" name="subject">
                      <option value="">Select a subject</option>
                      {content.contact.subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}{' '}
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
