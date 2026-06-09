import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/PBlogo.png';
import { FEATURES } from '../config/features';
import { RESUME } from '../config/portfolioAssets';
import styles from '../styles/Components/NavBar.module.css';

function NavBar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    // Close menu on navigation
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Solid/blurred bar once the page is scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // "Connect" scrolls to the homepage socials section, or routes home first
    const handleConnect = (e) => {
        closeMenu();
        if (location.pathname === '/') {
            e.preventDefault();
            const el = document.getElementById('socials');
            if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <Link to="/" className={styles.logoLink} aria-label="Home" onClick={closeMenu}>
                <img src={logo} className={styles.logo} alt="Blake Wellington" />
            </Link>
            <button
                className={styles.menuBtn}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? '✕' : '☰'}
            </button>
            <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
                {FEATURES.CREATIVE_WORK && (
                    <Link to="/portfolio" className={styles.link} onClick={closeMenu}>Creative Work</Link>
                )}
                {FEATURES.BLOG && (
                    <Link to="/blog" className={styles.link} onClick={closeMenu}>Blog</Link>
                )}
                <Link to="/my-work" className={styles.link} onClick={closeMenu}>Experience</Link>
                {FEATURES.INFLUENCES && (
                    <Link to="/influences" className={styles.link} onClick={closeMenu}>Influences</Link>
                )}
                <a href={RESUME.href} className={styles.link} download onClick={closeMenu}>Résumé</a>
                <Link to="/#socials" className={styles.link} onClick={handleConnect}>Connect</Link>
                {isAuthenticated ? (
                    <Link to="/admin" className={`${styles.link} ${styles.authLink}`} onClick={closeMenu}>Dashboard</Link>
                ) : (
                    FEATURES.SHOW_LOGIN_LINK && (
                        <Link to="/login" className={`${styles.link} ${styles.authLink}`} onClick={closeMenu}>Login</Link>
                    )
                )}
            </div>
        </nav>
    );
}

export default NavBar;
