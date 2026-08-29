import PageHeader from './PageHeader'
import SectionHeader from '../components/SectionHeader'
import { WAYS_TO_GIVE, FAQS } from '../config/content'
import { SITE } from '../config/site'
import styles from '../styles/Pages/GetInvolvedPage.module.css'

function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Four ways to be useful"
        lede="Money helps most, but it is not the only thing we need. Coaches, stringers, and event volunteers keep the clinics running."
      />

      <section className="section">
        <div className="page">
          <div className={styles.ways}>
            {WAYS_TO_GIVE.map((way) => (
              <article
                key={way.title}
                className={`${styles.way} ${way.primary ? styles.featured : ''}`}
              >
                <h3>{way.title}</h3>
                <p>{way.body}</p>
                <a
                  className={`btn ${way.primary ? 'btn--primary' : 'btn--ghost'}`}
                  href={way.primary ? SITE.donateUrl : '/contact'}
                >
                  {way.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className={`page ${styles.faqWrap}`}>
          <SectionHeader eyebrow="Questions" title="Before you give" />
          <div className={styles.faqs}>
            {FAQS.map((faq) => (
              <details key={faq.q} className={styles.faq}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default GetInvolvedPage
