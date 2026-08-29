import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import ShuttleMark from './ShuttleMark'
import styles from '../styles/Components/Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.court} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        <ShuttleMark size={420} title="" />
      </span>

      <div className={`page ${styles.inner}`}>
        <span className={styles.eyebrow}>{SITE.taxStatus}</span>
        <h1>
          Badminton and para-badminton for <em>every</em> American.
        </h1>
        <p className={styles.lede}>{SITE.mission}</p>

        <div className={styles.actions}>
          <a className="btn btn--primary" href={SITE.donateUrl}>
            Donate
          </a>
          <Link className="btn btn--onDark" to="/programs">
            See the programs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
