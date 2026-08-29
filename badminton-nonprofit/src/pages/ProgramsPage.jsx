import PageHeader from './PageHeader'
import ProgramCard from '../components/ProgramCard'
import CTABand from '../components/CTABand'
import { PROGRAMS } from '../config/content'
import styles from '../styles/Pages/ProgramsPage.module.css'

function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Where the money actually goes"
        lede="Four funding tracks, each aimed at a specific point where cost, not ability, is what stops someone from playing."
      />

      <section className="section">
        <div className="page">
          <nav className={styles.jump} aria-label="Jump to a program">
            {PROGRAMS.map((program) => (
              <a key={program.slug} href={`#${program.slug}`}>
                {program.name}
              </a>
            ))}
          </nav>

          <div className={styles.list}>
            {PROGRAMS.map((program) => (
              <ProgramCard key={program.slug} program={program} detailed />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Pick a program and pay for it"
        body="Restricted gifts are welcome and encouraged. Tell us which of these four you want your donation to fund and it will not be spent anywhere else."
        secondaryLabel="Ways to give"
      />
    </>
  )
}

export default ProgramsPage
