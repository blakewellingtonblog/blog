import React from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/Components/Footer.module.css';
import logo from '../assets/PBlogo.png';
import instagram from '../assets/instagram.png';
import linkedIn from '../assets/linkedin.png';

function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link to="/"><img src={logo} className={styles.logo} alt="Logo" /></Link>
                    <span className={styles.name}>Blake Wellington</span>
                </div>
                <nav className={styles.nav}>
                    <Link to="/portfolio" className={styles.link}>Creative Work</Link>
                    <Link to="/blog" className={styles.link}>Blog</Link>
                    <Link to="/my-work" className={styles.link}>Experience</Link>
                    <Link to="/influences" className={styles.link}>Influences</Link>
                </nav>
                <div className={styles.socials}>
                    <a href="https://instagram.com/blake.wello" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedIn} alt="LinkedIn" /></a>
                </div>
            </div>
            <div className={styles.bottom}>
                <span>&copy; {new Date().getFullYear()} Blake Wellington. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
