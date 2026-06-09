import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role — bypasses RLS. Never commit it.
if (!url || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.');
const supabase = createClient(url, key, { auth: { persistSession: false } });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const toHtml = (intro, bullets) =>
  `<p>${esc(intro)}</p><ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`;
const toDoc = (intro, bullets) => ({
  type: 'doc',
  content: [
    { type: 'paragraph', content: [{ type: 'text', text: intro }] },
    { type: 'bulletList', content: bullets.map((b) => ({
        type: 'listItem',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: b }] }],
      })) },
  ],
});

const data = [
  { title: '10k Athletics', slug: '10k-athletics',
    subtitle: 'Founder & Product Lead · Dec 2022 – Present · Denver, CO', sort_order: 0,
    intro: 'Founder and Product Lead of 10k Athletics, a sports-tech platform built around individual development plans for athletes, spanning a player app (iOS), a web platform, team software, and a creator marketplace.',
    bullets: [
      'Led end-to-end product development, owning discovery, MVP definition, roadmap execution, and beta launch.',
      'Conducted interviews with athletes and coaches and translated insights into product requirements and feature priorities.',
      'Owned roadmap planning and feature scoping, balancing user needs, technical constraints, and business goals.',
      'Coordinated designers, developers, and external partners to ship seven core features across onboarding, evaluations, and training workflows.',
      'Secured $45K in funding and allocated budget across UI/UX design, engineering, and early go-to-market.',
      'Launched beta with 50+ users and collected structured feedback to drive iteration.',
    ] },
  { title: 'Kent Denver School', slug: 'kent-denver-school',
    subtitle: 'Head / Assistant Soccer Coach · Feb 2025 – Present · Denver, CO', sort_order: 1,
    intro: 'Soccer coach across multiple program levels at Kent Denver School, a leading independent school in Denver.',
    bullets: [
      'Support the development of student-athletes across levels: Varsity Girls (Spring 2025), C Team Boys (Fall 2025), and JV Girls as Head Coach (Spring 2026).',
      'Provide individualized feedback and mentorship to help players reach their potential.',
      'Design and adapt training plans from player performance data, focused on technical development, tactical understanding, and team culture.',
    ] },
  { title: 'WSi Healthcare Personnel', slug: 'wsi-healthcare-personnel',
    subtitle: 'Marketing Intern · Dec 2024 – Jan 2025 · Denver, CO', sort_order: 2,
    intro: 'Marketing intern supporting brand visibility and recruiting outreach.',
    bullets: [
      'Executed a social media strategy, creating 40+ targeted posts to grow engagement and brand visibility.',
      'Conducted market research to support recruiting initiatives and optimize outreach.',
    ] },
  { title: 'The Farm FC', slug: 'the-farm-fc',
    subtitle: 'Website Manager & Systems Lead · Dec 2023 – Dec 2024 · Denver, CO', sort_order: 3,
    intro: 'Website manager and systems lead for a Denver soccer organization.',
    bullets: [
      "Designed and developed the organization's website with a focus on usability, branding, and conversion.",
      'Built backend systems supporting CRM workflows and improved customer data organization.',
      'Developed internal order-tracking tools that gave staff operational visibility they previously lacked.',
    ] },
  { title: 'SIQ Soccer Academy', slug: 'siq-soccer-academy',
    subtitle: 'Website Manager & Coach · May 2019 – Dec 2022 · Denver, CO', sort_order: 4,
    intro: "Website manager and coach supporting the academy's digital presence and growth.",
    bullets: [
      "Redesigned and managed the academy's website, improving user experience and brand alignment.",
      'Partnered with an SEO firm to restructure content and information architecture, improving search rankings and organic traffic.',
      'Contributed to the digital marketing stack supporting growth and engagement.',
    ] },
];

for (const e of data) {
  // Preserve a header image if one was already set via the admin UI.
  const { data: existing } = await supabase
    .from('work_experiences').select('header_image_url').eq('slug', e.slug).maybeSingle();

  const row = {
    title: e.title,
    slug: e.slug,
    subtitle: e.subtitle,
    description: toDoc(e.intro, e.bullets),
    description_html: toHtml(e.intro, e.bullets),
    header_image_url: existing?.header_image_url ?? null,
    sort_order: e.sort_order,
    is_active: true,
  };

  const { error } = await supabase
    .from('work_experiences').upsert(row, { onConflict: 'slug' });
  console.log(error ? `✗ ${e.slug}: ${error.message}` : `✓ ${e.slug}`);
}
