import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../assets/PBlogo.png';
import styles from '../styles/Components/NavBar.module.css';

function NavBar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    // Close menu on navigation
    React.useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return(
        <div className={styles.navbar}>
            <Link to="/" className={styles.navLink}><img src={logo} className={styles.logo}/></Link>
            <button
                className={styles.menuToggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? '\u2715' : '\u2630'}
            </button>
            <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                <Link to="/portfolio" className={styles.navLink} onClick={closeMenu}>Creative Work</Link>
                <Link to="/blog" className={styles.navLink} onClick={closeMenu}>Blog</Link>
                <Link to="/my-work" className={styles.navLink} onClick={closeMenu}>Experience</Link>
                <Link to="/influences" className={styles.navLink} onClick={closeMenu}>Influences</Link>
                {isAuthenticated ? (
                    <Link to="/admin" className={`${styles.navLink} ${styles.authLink}`} onClick={closeMenu}>Dashboard</Link>
                ) : (
                    <Link to="/login" className={`${styles.navLink} ${styles.authLink}`} onClick={closeMenu}>Login</Link>
                )}
            </div>
        </div>
    );
}

export default NavBar;
