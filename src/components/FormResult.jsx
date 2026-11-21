import site from '../site/config'

export default function FormResult({ status, onReset, successTitle }) {
  if (status === 'idle' || status === 'submitting') return null

  const isError = status === 'error'
  const isDemo = status === 'demo'
  const title = isError
    ? 'Something went wrong'
    : isDemo
      ? site.forms.demoTitle
      : successTitle || site.forms.successTitle
  const message = isError
    ? site.forms.errorMessage
    : isDemo
      ? site.forms.demoMessage
      : site.forms.successMessage

  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: isError ? '#B45A5A' : 'var(--secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <i
            className={`fas ${isError ? 'fa-exclamation' : isDemo ? 'fa-info' : 'fa-check'}`}
            style={{ fontSize: '2rem', color: 'var(--white)' }}
          ></i>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            marginBottom: 12,
            color: 'var(--primary)',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: 'var(--text-light)',
            fontSize: '1.05rem',
            maxWidth: 520,
            margin: '0 auto 28px',
          }}
        >
          {message}
        </p>
        {(isError || isDemo) && (
          <button type="button" className="btn btn-primary" onClick={onReset}>
            {isError ? 'Try Again' : 'Back to Form'}
          </button>
        )}
      </div>
    </section>
  )
}
