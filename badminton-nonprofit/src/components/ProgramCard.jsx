import styles from '../styles/Components/ProgramCard.module.css'

function ProgramCard({ program, detailed = false }) {
  const { icon: Icon, name, summary, body, bullets } = program

  return (
    <article className={`${styles.card} ${detailed ? styles.detailed : ''}`} id={program.slug}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={22} />
      </span>
      <h3>{name}</h3>
      <p className={styles.summary}>{summary}</p>

      {detailed && (
        <>
          <p className={styles.body}>{body}</p>
          <ul className={styles.bullets}>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}

export default ProgramCard
