import { useState } from 'react'
import site from '../site/config'

export default function useFormSubmit() {
  const [status, setStatus] = useState('idle')

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!site.forms.endpoint) {
      setStatus('demo')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(site.forms.endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return {
    status,
    submit,
    reset: () => setStatus('idle'),
  }
}
