import React from 'react';
import styles from '../styles/Components/Lightbox.module.css';

function Lightbox({ item, onClose }) {
    if (!item) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <button className={styles.closeBtn} onClick={onClose}>&times;</button>
            <div className={styles.content}>
                {item.media_type === 'video' ? (
                    <video controls autoPlay className={styles.video}>
                        <source src={item.media_url} />
                    </video>
                ) : (
                    <img src={item.media_url} alt={item.title} className={styles.image} />
                )}
                <div className={styles.info}>
                    <h2>{item.title}</h2>
                    {item.description && <p>{item.description}</p>}
                    {item.category && <span className="chit">{item.category}</span>}
                </div>
            </div>
        </div>
    );
}

export default Lightbox;
