// Per-client brand + contact + theme + SEO settings.
// Everything a new studio needs to change lives here (and in content.js).
// The generator (scripts/new-client.mjs) overwrites this file for each client.

const site = {
  slug: 'saya',
  lang: 'en',

  // Keep true until the site is ready for Google. Injects noindex.
  demo: true,

  brand: {
    name: 'Saya Studio',
    legalName: 'Saya Studio Interiors & Exteriors Designs',
    // Used by the loading screen: first word plain, the rest highlighted.
    wordmark: ['Saya', 'Studio'],
    logo: '/brand/logo.svg',
    logoAlt: 'Saya Studio Interiors & Exteriors Designs',
    favicon: '/brand/favicon.svg',
  },

  contact: {
    phone: '+91 XXXXX XXXXX',
    email: 'hello@sayastudio.in',
    addressLines: [
      'Studio address, Basaveshwar Nagar',
      'Hubballi — 580020, Karnataka, India',
    ],
    hours: 'Mon — Sat: 10:00 AM — 7:00 PM',
  },

  social: {
    facebook: '#',
    instagram: '#',
    pinterest: '#',
    houzz: '#',
    linkedin: '#',
    twitter: '#',
  },

  // CSS custom properties applied at runtime. Keep the same keys as style.css.
  theme: {
    '--primary': '#1D1D1D',
    '--primary-light': '#2D2D2D',
    '--secondary': '#96AC9F',
    '--secondary-dark': '#779689',
    '--accent': '#E5E1DC',
    '--accent-dark': '#D3C5B1',
  },

  seo: {
    title: 'Saya Studio — Interiors & Exteriors Design | Hubballi',
    description:
      'Saya Studio is an interiors and exteriors design studio in Hubballi, Karnataka — residential, commercial, facade and outdoor design, delivered turnkey.',
    url: 'https://sayastudio.in',
    ogImage: '/images/hero-bg.webp',
  },

  forms: {
    // Paste a Formspree / Getform / Basin endpoint here to make forms live.
    // Leave empty for demo mode (the form will say it is not connected).
    endpoint: '',
    successTitle: 'Thank You!',
    successMessage:
      "Your message has been received. We'll get back to you within 24 hours.",
    demoTitle: 'Demo Form',
    demoMessage:
      'This form is not connected to an inbox yet. Add your form endpoint in src/site/config.js to start receiving enquiries.',
    errorMessage:
      'Something went wrong while sending your message. Please try again or email us directly.',
  },
}

export default site
