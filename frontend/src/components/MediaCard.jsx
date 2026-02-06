import React from 'react';
import styles from '../styles/Components/MediaCard.module.css';

function MediaCard({ item, onClick }) {
    return (
        <div className={styles.card} onClick={() => onClick && onClick(item)}>
            {item.media_type === 'video' ? (
                <div className={styles.videoThumb}>
                    {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt={item.title} className={styles.image} />
                    ) : (
                        <div className={styles.videoPlaceholder}>
                            <span className={styles.playIcon}>&#9654;</span>
                        </div>
                    )}
                    <span className={styles.videoBadge}>Video</span>
                </div>
            ) : (
                <img src={item.media_url} alt={item.title} className={styles.image} />
            )}
            <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>
                {item.category && <span className="chit">{item.category}</span>}
            </div>
        </div>
    );
}

export default MediaCard;
