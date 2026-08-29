import { Link } from 'react-router-dom'
import ShuttleMark from '../components/ShuttleMark'
import styles from '../styles/Pages/NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <section className={styles.wrap}>
      <div className="page">
        <span className={styles.mark}>
          <ShuttleMark size={72} title="" />
        </span>
        <h1>Out of bounds</h1>
        <p className="lede">
          That page is not on this court. Try one of these instead.
        </p>
        <div className={styles.actions}>
          <Link className="btn btn--primary" to="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" to="/programs">
            See the programs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
