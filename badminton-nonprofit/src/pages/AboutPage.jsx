import PageHeader from './PageHeader'
import SectionHeader from '../components/SectionHeader'
import LeaderCard from '../components/LeaderCard'
import CTABand from '../components/CTABand'
import { LEADERSHIP, VALUES } from '../config/content'
import { SITE } from '../config/site'
import styles from '../styles/Pages/AboutPage.module.css'

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A foundation built by people who ran the sport"
        lede="Rally Forward exists because the gap between American badminton talent and American badminton funding is wide, well documented, and entirely fixable."
      />

      <section className="section">
        <div className={`page ${styles.prose}`}>
          <span className="eyebrow">Our mission</span>
          <p className={styles.big}>{SITE.mission}</p>
          <p>
            Badminton is among the most-played sports in the world and among the least
            resourced in the United States. Players who reach the national level here
            usually do it by self-funding — paying their own way to the international
            tournaments where world ranking is actually earned, buying their own
            equipment, and finding coaching wherever it happens to exist. Para-badminton
            athletes carry all of that plus the cost of adaptive equipment and
            classification travel.
          </p>
          <p>
            The foundation was formed to absorb those costs directly. We do not run
            leagues and we do not sanction competition — that is the governing body&apos;s
            job. We write grants, buy equipment, and pay for the coaching hours and
            travel that otherwise end promising careers early.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="page">
          <SectionHeader
            eyebrow="What we stand for"
            title="Four commitments we can be held to"
          />
          <div className={styles.values}>
            {VALUES.map((value) => (
              <article key={value.title} className={styles.value}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <SectionHeader
            eyebrow="Leadership"
            title="Who is accountable for the money"
            lede="Our board is unpaid. Every member has a working history in the sport or in nonprofit finance."
          />
          <div className={styles.board}>
            {LEADERSHIP.map((person) => (
              <LeaderCard key={person.name + person.role} person={person} />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Fund a season, not a slogan"
        body="Restricted gifts let you underwrite one specific thing — an athlete's international season, a school's equipment, a six-week veterans cycle — and see exactly what it produced."
      />
    </>
  )
}

export default AboutPage
