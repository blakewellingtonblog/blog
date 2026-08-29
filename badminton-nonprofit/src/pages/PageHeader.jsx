import styles from '../styles/Pages/PageHeader.module.css'

// Shared banner at the top of every interior page.
function PageHeader({ eyebrow, title, lede }) {
  return (
    <header className={styles.header}>
      <div className="page">
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
      </div>
    </header>
  )
}

export default PageHeader
