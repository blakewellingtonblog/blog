import { useState } from 'react'
import { FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6'
import PageHeader from './PageHeader'
import { SITE } from '../config/site'
import styles from '../styles/Pages/ContactPage.module.css'

const FORM_NAME = 'contact'

// Netlify Forms picks the form up from the static HTML in index.html at deploy
// time and accepts submissions posted back to the site root. If this site is
// hosted somewhere other than Netlify, point ENDPOINT at whatever form service
// is in use (Formspree, Basin, a Lambda) — the rest of this component is
// host-agnostic.
const ENDPOINT = '/'

const encode = (data) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

const EMPTY = { name: '', email: '', topic: 'General', message: '' }

function ContactPage() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (event) =>
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...values }),
      })
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`)
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        lede="Grant questions, partnership proposals, press, or a club that wants a program — this all reaches the same small inbox and gets a real answer."
      />

      <section className="section">
        <div className={`page ${styles.layout}`}>
          <div className={styles.details}>
            <h2>Direct lines</h2>
            <ul className={styles.detailList}>
              <li>
                <FaEnvelope aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <FaPhone aria-hidden="true" />
                <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</a>
              </li>
              <li>
                <FaLocationDot aria-hidden="true" />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </span>
              </li>
            </ul>
            <p className={styles.note}>
              Applying for a grant? Say which program you are applying to in the subject
              and we will send the current application and deadlines.
            </p>
          </div>

          <form
            className={styles.form}
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />

            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={update}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={update}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="topic">What is this about?</label>
              <select id="topic" name="topic" value={values.topic} onChange={update}>
                <option>General</option>
                <option>Grant application</option>
                <option>Partnership or sponsorship</option>
                <option>Volunteering</option>
                <option>Press</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={values.message}
                onChange={update}
              />
            </div>

            <button
              className="btn btn--primary"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <p className={styles.status} role="status" aria-live="polite">
              {status === 'sent' &&
                'Thank you — your message is in. We answer everything, usually within a few days.'}
              {status === 'error' &&
                `Something went wrong sending that. Please email us directly at ${SITE.email}.`}
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default ContactPage
