// Recruiter-facing assets: résumé, product work, and per-experience links.
// Documents are static files served from frontend/public/documents/.
// Edit here to update what's downloadable / linked across the site.

export const RESUME = {
    label: 'Résumé',
    href: '/documents/Blake-Wellington-Resume.pdf',
};

// 10k Athletics live product + downloadable case studies (the "Selected Work" card on /my-work).
export const PRODUCT_WORK = {
    live: {
        site: 'https://10kathletics.com/',
        appStore: 'https://apps.apple.com/us/app/10k-athletics/id6751750374',
        accessCode: 'TEST',
    },
    packet: { label: 'Case studies — full packet', href: '/documents/Blake-Wellington-Product-Work.pdf' },
    caseStudies: [
        { label: 'Marketplace Payment Spec', href: '/documents/Marketplace-Payment-Spec.pdf' },
        { label: 'Activation Problem', href: '/documents/Activation-Problem.pdf' },
        { label: 'Drill Builder PRD', href: '/documents/Drill-Builder-PRD.pdf' },
    ],
};

// Per-experience external links + downloads, keyed by work_experiences.slug.
export const EXPERIENCE_LINKS = {
    '10k-athletics': {
        links: [
            { label: 'Live site', url: 'https://10kathletics.com/' },
            { label: 'App Store', url: 'https://apps.apple.com/us/app/10k-athletics/id6751750374' },
        ],
        note: 'Sign-up access code: TEST',
        documents: [
            PRODUCT_WORK.packet,
            ...PRODUCT_WORK.caseStudies,
        ],
    },
    'the-farm-fc': {
        links: [{ label: 'Live site', url: 'https://www.thefarmfc.com/' }],
    },
    'siq-soccer-academy': {
        links: [{ label: 'Live site', url: 'https://siqacademy.com/' }],
    },
};
