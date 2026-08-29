import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import StatBand from '../components/StatBand'
import SectionHeader from '../components/SectionHeader'
import ProgramCard from '../components/ProgramCard'
import LeaderCard from '../components/LeaderCard'
import CTABand from '../components/CTABand'
import { PROGRAMS, LEADERSHIP, VALUES } from '../config/content'
import styles from '../styles/Pages/HomePage.module.css'

function HomePage() {
  const chair = LEADERSHIP[0]

  return (
    <>
      <Hero />

      <section className="section">
        <div className="page">
          <StatBand />
        </div>
      </section>

      <section className="section section--alt">
        <div className="page">
          <SectionHeader
            eyebrow="What we fund"
            title="Four programs, one throughline"
            lede="Badminton in America does not lack talent or interest. It lacks the money that turns interest into a court, a coach, and a season."
          />
          <div className={styles.programGrid}>
            {PROGRAMS.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
          <div className={styles.gridCta}>
            <Link className="btn btn--ghost" to="/programs">
              Read the program details
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`page ${styles.split}`}>
          <div>
            <SectionHeader
              eyebrow="How we work"
              title="Money in, courts out"
              lede="We are small on purpose. Grants are specific, restricted to the thing they were raised for, and reported publicly."
            />
            <div className={styles.values}>
              {VALUES.map((value) => (
                <div key={value.title} className={styles.value}>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.leaderAside}>
            <span className="eyebrow">Leadership</span>
            <LeaderCard person={chair} />
            <Link className={styles.asideLink} to="/about">
              Meet the full board
            </Link>
          </aside>
        </div>
      </section>

      <CTABand />
    </>
  )
}

export default HomePage
