import React from 'react';
import instagram from '../assets/instagram.png';
import linkedIn from '../assets/linkedin.png';
import styles from '../styles/Pages/HomePage.module.css';

function SocialSection(){
    return(
        <div className={styles.socialSection}>
            <h1 className={styles.sectionTitle}>Socials</h1>
            <p className={styles.tagline}>DM me to connect</p>
            <div className={styles.socialLinks}>
                <a href="https://instagram.com/blake.wello" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedIn} alt="LinkedIn" /></a>
            </div>
            <div className={styles.instagramEmbed}>
                <behold-widget feed-id="EEKQrF1DtYOHNWxOwhNx"></behold-widget>
            </div>
        </div>
    );
};

export default SocialSection;
