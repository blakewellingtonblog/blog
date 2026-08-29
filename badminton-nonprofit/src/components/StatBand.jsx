import { IMPACT_STATS } from '../config/content'
import styles from '../styles/Components/StatBand.module.css'

function StatBand() {
  return (
    <div className={styles.band}>
      {IMPACT_STATS.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <span className={styles.value}>
            {stat.value}
            <span className={styles.suffix}>{stat.suffix}</span>
          </span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default StatBand
