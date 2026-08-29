// Single source of truth for organization identity.
// Everything the site renders in a header, footer, or contact block comes from here.
// Values marked TODO are placeholders and must be replaced with the real ones
// before this site goes live.

export const SITE = {
  name: 'Rally Forward Foundation',
  shortName: 'Rally Forward',
  tagline: 'Badminton and para-badminton for every American.',
  mission:
    'We fund the coaches, courts, and equipment that put a racket in the hands of Americans who would never otherwise hold one — and we clear the road for the athletes who take it all the way to the podium.',

  // TODO: replace with the organization's real legal + registration details.
  legalName: 'Rally Forward Foundation, Inc.',
  taxStatus: '501(c)(3) nonprofit organization',
  ein: 'TODO-EIN',
  foundedYear: 2026,

  // TODO: replace with real contact details.
  email: 'hello@rallyforward.org',
  phone: '(000) 000-0000',
  address: {
    line1: 'TODO — Street address',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '00000',
  },

  // TODO: point these at the real destinations before launch.
  donateUrl: '#donate',
  newsletterUrl: '#newsletter',

  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },

  // Shown in the footer. Keep this accurate: the foundation is an independent
  // nonprofit and is not the national governing body.
  disclaimer:
    'Rally Forward Foundation is an independent 501(c)(3) nonprofit. It is not a national governing body and is not affiliated with or endorsed by USA Badminton, the United States Olympic & Paralympic Committee, or the Badminton World Federation.',
}

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Impact', to: '/impact' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Contact', to: '/contact' },
]
