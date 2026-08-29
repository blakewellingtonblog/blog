import PageHeader from './PageHeader'
import StatBand from '../components/StatBand'
import SectionHeader from '../components/SectionHeader'
import CTABand from '../components/CTABand'
import styles from '../styles/Pages/ImpactPage.module.css'

// TODO: replace these with real, attributable stories and figures before launch.
const REPORTS = [
  {
    year: 'TODO — Year',
    title: 'Annual report',
    body: 'Post each year\'s audited financials and grant summary here as a linked PDF.',
    href: '#',
  },
  {
    year: 'TODO — Year',
    title: 'Form 990',
    body: 'Link the filed Form 990 so donors can read it without requesting it.',
    href: '#',
  },
]

function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="What the money did"
        lede="A grant is only worth what it changed. This page is where we show that — including the things that did not work."
      />

      <section className="section">
        <div className="page">
          <StatBand />
          <p className={styles.footnote}>
            Figures are updated at the close of each grant cycle.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="page">
          <SectionHeader
            eyebrow="Transparency"
            title="Read the filings, not the marketing"
            lede="Financial statements and grant summaries are posted here as they are completed. If something you want is missing, ask and we will send it."
          />
          <div className={styles.reports}>
            {REPORTS.map((report) => (
              <a key={report.title + report.year} className={styles.report} href={report.href}>
                <span className={styles.year}>{report.year}</span>
                <h3>{report.title}</h3>
                <p>{report.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Add to the next line on this page"
        body="Every figure above started as somebody's donation. The next grant cycle is funded the same way."
      />
    </>
  )
}

export default ImpactPage
