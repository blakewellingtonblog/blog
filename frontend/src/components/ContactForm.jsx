import React, { useState } from 'react';
import athleticsApi from '@shared/axios/athleticsApi';
import styles from '../styles/Components/ContactForm.module.css';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await athleticsApi.submitContact({ name, email, message });
            setStatus('sent');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <div className={styles.form}>
                <p className={styles.success}>Thanks for reaching out. We'll be in touch.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={styles.input}
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={styles.input}
                required
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What can we help with?"
                className={styles.textarea}
                rows={4}
                required
            />
            {status === 'error' && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
            )}
            <button type="submit" className="button" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}

export default ContactForm;
