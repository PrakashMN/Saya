// Starter content for a new client repo.
// scripts/new-client.mjs copies this file to src/site/content.js and replaces
// {{NAME}}, {{CITY}}, {{PHONE}} and {{EMAIL}}.
//
// TODO before launch:
//   - replace every Unsplash URL with the studio's real project photos
//   - replace the placeholder testimonials, team members and stats
//   - rewrite the about copy in the studio's own voice

const content = {
  hero: {
    tag: 'Interiors & Exteriors Design Studio',
    titleBefore: 'Designing Spaces That',
    titleHighlight: 'Inspire',
    titleAfter: '& Elevate',
    description:
      '{{NAME}} crafts bespoke interiors and exteriors that blend timeless elegance with modern sophistication, transforming your vision into extraordinary spaces.',
    image: '/images/hero-bg.webp',
  },

  services: [
    {
      icon: 'fa-solid fa-house-chimney',
      title: 'Residential Design',
      desc: 'Beautiful, functional homes tailored to your lifestyle and taste.',
      longDesc:
        'Full-service residential interior design for apartments, villas, and homes. We create personalized spaces that reflect your lifestyle and taste, from concept development to final installation.',
    },
    {
      icon: 'fa-solid fa-building',
      title: 'Commercial Design',
      desc: 'Commercial spaces that inspire productivity and express your brand.',
      longDesc:
        'Strategic commercial interiors for offices, retail spaces, restaurants, and hospitality venues. Our designs enhance brand identity and create memorable experiences for your clients.',
    },
    {
      icon: 'fa-solid fa-pen-ruler',
      title: 'Space Planning',
      desc: 'Optimized layouts that maximize functionality and flow.',
      longDesc:
        'Optimized spatial layouts that maximize functionality, flow, and efficiency. Our space planning service ensures every square foot serves a purpose.',
    },
    {
      icon: 'fa-solid fa-couch',
      title: 'Custom Furniture',
      desc: 'Bespoke pieces crafted to complement your space perfectly.',
      longDesc:
        'Bespoke furniture design and manufacturing. We create unique pieces that fit your space and style, crafted by skilled artisans using premium materials.',
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Lighting Design',
      desc: 'Layered lighting that transforms ambiance and mood.',
      longDesc:
        'Comprehensive lighting solutions that set the perfect mood. From ambient to accent lighting, we design layered schemes that transform your space.',
    },
    {
      icon: 'fa-solid fa-city',
      title: 'Facade & Elevation',
      desc: 'Exterior facades designed as one with the interior.',
      longDesc:
        'Exterior facade and elevation design that gives your building a considered identity. We plan materials, shading and detailing so the outside reads as one design with the inside.',
    },
  ],

  process: [
    {
      number: '01',
      title: 'Discovery',
      desc: 'We understand your vision, needs, and lifestyle through an in-depth consultation.',
    },
    {
      number: '02',
      title: 'Concept',
      desc: 'We develop design concepts, mood boards, and preliminary layouts for your approval.',
    },
    {
      number: '03',
      title: 'Design',
      desc: 'Detailed design development including 3D renderings, material selection, and budgeting.',
    },
    {
      number: '04',
      title: 'Execution',
      desc: 'Seamless project management from procurement to installation and final styling.',
    },
  ],

  portfolio: [
    {
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      title: 'Modern Luxury Villa',
      category: 'Residential',
      location: '{{CITY}}',
    },
    {
      img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
      title: 'Executive Office Suite',
      category: 'Commercial',
      location: '{{CITY}}',
    },
    {
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      title: 'Minimalist Apartment',
      category: 'Residential',
      location: '{{CITY}}',
    },
    {
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      title: 'Boutique Hotel Lobby',
      category: 'Hospitality',
      location: '{{CITY}}',
    },
    {
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Retail Store',
      category: 'Retail',
      location: '{{CITY}}',
    },
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      title: 'Farmhouse Retreat',
      category: 'Residential',
      location: '{{CITY}}',
    },
  ],

  gallery: [
    {
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      title: 'Living Room Design',
    },
    {
      img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
      title: 'Modern Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      title: 'Bedroom Interior',
    },
    {
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      title: 'Dining Space',
    },
    {
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      title: 'Bathroom Luxury',
    },
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      title: 'Garden View',
    },
  ],

  testimonials: [
    {
      stars: 5,
      quote:
        '[Replace with a real client quote. Keep it specific — what changed in their home or office, and how the process felt.]',
      name: '[Client Name]',
      role: 'Homeowner, {{CITY}}',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: 5,
      quote:
        '[Replace with a real client quote from a commercial project — office, retail, or hospitality.]',
      name: '[Client Name]',
      role: 'Business Owner, {{CITY}}',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: 5,
      quote:
        '[Replace with a real client quote about the consultation or execution experience.]',
      name: '[Client Name]',
      role: 'Homeowner, {{CITY}}',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
  ],

  team: [
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      name: '[Founder Name]',
      role: 'Founder & Principal Designer',
      desc: 'Add a short, specific bio — years of experience and what they lead.',
    },
    {
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      name: '[Team Member]',
      role: 'Senior Architect',
      desc: 'Add a short bio and their focus area.',
    },
    {
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      name: '[Team Member]',
      role: 'Interior Stylist',
      desc: 'Add a short bio and their focus area.',
    },
  ],

  stats: [
    { icon: 'fas fa-check-circle', value: '00+', label: 'Projects Completed' },
    { icon: 'fas fa-award', value: '00+', label: 'Design Awards' },
    { icon: 'fas fa-users', value: '00+', label: 'Team Members' },
  ],

  about: {
    badge: { value: '00+', label: 'Years Experience' },
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    introTitle: 'Designing Interiors & Exteriors That Endure',
    introParagraphs: [
      '{{NAME}} is a design studio dedicated to creating extraordinary spaces that blend beauty with functionality — inside your home and out. Our team brings passion and precision to every project.',
      'We believe that great design has the power to transform lives. Every space we create tells a unique story, reflecting the personality and aspirations of our clients.',
    ],
    storyTitle: 'Passion Meets Precision in Every Space',
    storyParagraphs: [
      '{{NAME}} is a full-service interiors and exteriors practice based in {{CITY}}. Our journey has been defined by a relentless pursuit of quality and an unwavering commitment to our clients\u2019 vision.',
      'We believe that great design is not just about aesthetics\u2014it\u2019s about creating spaces that enhance the way people live, work, and connect. Every project we undertake is a collaboration, a dialogue between our expertise and your dreams.',
      'Our team of designers, architects, and craftsmen brings together diverse perspectives and specialized skills to deliver spaces that are both beautiful and functional — from the rooms you live in to the facade and landscape outside.',
    ],
  },

  faqs: [
    {
      q: 'What is the typical process for an interior design project?',
      a: 'Our process begins with an initial consultation to understand your vision and requirements. We then develop concept designs, followed by detailed planning and material selection. Once approved, we manage the entire execution phase, including procurement, construction coordination, and final styling.',
    },
    {
      q: 'How much does interior design services cost?',
      a: 'Our pricing is customized based on the scope and complexity of each project. We offer flexible fee structures including fixed project fees, hourly consultations, and per-square-foot rates. During your initial consultation, we will provide a detailed proposal tailored to your needs and budget.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'Project timelines depend on the scope and scale. A single room redesign typically takes 4-6 weeks, while a full home renovation can take 3-6 months. Commercial projects vary based on size and complexity. We provide a detailed timeline during the proposal stage.',
    },
    {
      q: 'Do you work with existing furniture and decor?',
      a: 'Absolutely. We love incorporating existing pieces that hold sentimental value or have design merit. Our approach is to blend your cherished items with new elements to create a cohesive, personalized space.',
    },
    {
      q: 'What areas do you serve?',
      a: 'We are based in {{CITY}} and take on projects across the region. Contact us to discuss your location.',
    },
    {
      q: 'Do you design exteriors as well as interiors?',
      a: 'Yes. Alongside interior design we handle facade and elevation design, landscape and outdoor living spaces, and structural and weatherproofing works. If your project spans both, we plan the inside and the outside together.',
    },
  ],

  contact: {
    subjects: [
      { value: 'residential', label: 'Residential Design' },
      { value: 'commercial', label: 'Commercial Design' },
      { value: 'exterior', label: 'Exterior & Facade Design' },
      { value: 'consultation', label: 'Consultation' },
      { value: 'other', label: 'Other' },
    ],
    benefits: [
      'Free 1-hour consultation',
      'Expert design advice',
      'Preliminary budget estimate',
      'No obligation quote',
    ],
    projectTypes: [
      { value: 'residential', label: 'Residential Design' },
      { value: 'commercial', label: 'Commercial Design' },
      { value: 'exterior', label: 'Exterior & Facade Design' },
      { value: 'renovation', label: 'Renovation' },
      { value: 'consultation', label: 'Design Consultation' },
      { value: 'other', label: 'Other' },
    ],
    budgets: [
      { value: 'under-5l', label: 'Under ₹5,00,000' },
      { value: '5-10l', label: '₹5,00,000 — ₹10,00,000' },
      { value: '10-25l', label: '₹10,00,000 — ₹25,00,000' },
      { value: '25-50l', label: '₹25,00,000 — ₹50,00,000' },
      { value: 'above-50l', label: 'Above ₹50,00,000' },
    ],
  },

  cta: {
    title: "Let's Create Something Beautiful Together",
    description:
      'Transform your space from the inside out. Schedule a consultation with our design team today.',
    button: 'Book a Consultation',
  },

  footer: {
    description:
      'Transforming spaces inside and out. We create bespoke interior and exterior designs that reflect your personality and elevate your lifestyle.',
  },
}

export default content
