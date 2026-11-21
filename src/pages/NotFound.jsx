import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero title="Page Not Found" />
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.2rem',
              marginBottom: 12,
              color: 'var(--primary)',
            }}
          >
            This page does not exist
          </h2>
          <p
            style={{
              color: 'var(--text-light)',
              fontSize: '1.05rem',
              maxWidth: 500,
              margin: '0 auto 32px',
            }}
          >
            The link may be out of date, or the page may have moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to Home <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </>
  )
}
