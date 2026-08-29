import styles from '../styles/Components/SectionHeader.module.css'

function SectionHeader({ eyebrow, title, lede, align = 'left', as: Heading = 'h2' }) {
  return (
    <div className={`${styles.wrap} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading>{title}</Heading>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

export default SectionHeader
