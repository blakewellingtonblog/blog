import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import styles from '../styles/Components/CTABand.module.css'

function CTABand({
  title = 'A racket costs less than you think. A career costs more.',
  body = 'Your gift covers the specific, unglamorous expenses that decide whether an athlete keeps going: entry fees, a sport wheelchair, a coach on a Tuesday night, a net in a school gym.',
  primaryLabel = 'Donate',
  primaryHref = SITE.donateUrl,
  secondaryLabel = 'Other ways to help',
  secondaryTo = '/get-involved',
}) {
  return (
    <section className={styles.band}>
      <div className={`page ${styles.inner}`}>
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className={styles.actions}>
          <a className="btn btn--primary" href={primaryHref}>
            {primaryLabel}
          </a>
          {secondaryTo && (
            <Link className="btn btn--onDark" to={secondaryTo}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTABand
