import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { SITE, NAV_LINKS } from '../config/site'
import ShuttleMark from './ShuttleMark'
import styles from '../styles/Components/NavBar.module.css'

function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`page ${styles.bar}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.mark}>
            <ShuttleMark size={30} title={`${SITE.shortName} logo`} />
          </span>
          <span className={styles.brandText}>
            <strong>{SITE.shortName}</strong>
            <em>Foundation</em>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a className={`btn btn--primary ${styles.donate}`} href={SITE.donateUrl}>
            Donate
          </a>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaXmark size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        hidden={!open}
      >
        <nav aria-label="Primary mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.drawerLink} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a className="btn btn--primary" href={SITE.donateUrl}>
            Donate
          </a>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
