import { FaLinkedinIn } from 'react-icons/fa6'
import styles from '../styles/Components/LeaderCard.module.css'

// Renders initials when no headshot has been supplied yet, so the layout holds
// its shape while photos are still being collected.
function initialsOf(name) {
  return name
    .replace(/^TODO\s*—?\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function LeaderCard({ person }) {
  const { name, role, photo, bio, highlights, linkedin } = person

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        {photo ? (
          <img className={styles.photo} src={photo} alt={name} />
        ) : (
          <span className={styles.avatar} aria-hidden="true">
            {initialsOf(name)}
          </span>
        )}
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      <p className={styles.bio}>{bio}</p>

      {highlights?.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {linkedin && (
        <a
          className={styles.linkedin}
          href={linkedin}
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaLinkedinIn size={14} />
          <span>LinkedIn profile</span>
        </a>
      )}
    </article>
  )
}

export default LeaderCard
