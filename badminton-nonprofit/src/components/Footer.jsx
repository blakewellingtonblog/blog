import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'
import { SITE, NAV_LINKS } from '../config/site'
import ShuttleMark from './ShuttleMark'
import styles from '../styles/Components/Footer.module.css'

const SOCIALS = [
  { key: 'instagram', Icon: FaInstagram, label: 'Instagram' },
  { key: 'facebook', Icon: FaFacebookF, label: 'Facebook' },
  { key: 'youtube', Icon: FaYoutube, label: 'YouTube' },
  { key: 'linkedin', Icon: FaLinkedinIn, label: 'LinkedIn' },
]

function Footer() {
  const { address } = SITE

  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.grid}`}>
        <div className={styles.brandCol}>
          <span className={styles.mark}>
            <ShuttleMark size={34} title={`${SITE.shortName} logo`} />
          </span>
          <p className={styles.name}>{SITE.name}</p>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <div className={styles.socials}>
            {SOCIALS.map(({ key, Icon, label }) => (
              <a
                key={key}
                href={SITE.social[key]}
                aria-label={label}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linkCol}>
          <h4>Explore</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</a>
            </li>
            <li className={styles.address}>
              {address.line1}
              <br />
              {address.city}, {address.state} {address.zip}
            </li>
          </ul>
        </div>

        <div className={styles.giveCol}>
          <h4>Support the work</h4>
          <p>
            Every gift funds coaching, equipment, and travel for athletes and programs
            that have no other source for it.
          </p>
          <a className="btn btn--primary" href={SITE.donateUrl}>
            Donate
          </a>
        </div>
      </div>

      <div className={`page ${styles.legal}`}>
        <p>
          &copy; {new Date().getFullYear()} {SITE.legalName}. {SITE.taxStatus}. EIN{' '}
          {SITE.ein}.
        </p>
        <p className={styles.disclaimer}>{SITE.disclaimer}</p>
      </div>
    </footer>
  )
}

export default Footer
