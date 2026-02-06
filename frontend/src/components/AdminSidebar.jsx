import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@shared/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Components/AdminSidebar.module.css';

function AdminSidebar({ isOpen, onToggle }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const linkClass = ({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`;

    // Close sidebar on navigation (mobile)
    React.useEffect(() => {
        if (isOpen && onToggle) onToggle();
    }, [location.pathname]);

    return (
        <>
            <button className={styles.toggle} onClick={onToggle} aria-label="Toggle sidebar">
                {isOpen ? '\u2715' : '\u2630'}
            </button>
            {isOpen && <div className={styles.overlay} onClick={onToggle} />}
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.logo}>
                    <h2>Admin</h2>
                </div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/admin/posts" className={linkClass}>Blog Posts</NavLink>
                    <NavLink to="/admin/portfolio" className={linkClass}>Creative Work</NavLink>
                    <NavLink to="/admin/work" className={linkClass}>Experience</NavLink>
                    <NavLink to="/admin/influences" className={linkClass}>Influences</NavLink>
                    <NavLink to="/admin/settings" className={linkClass}>Settings</NavLink>
                </nav>
                <div className={styles.footer}>
                    <NavLink to="/" className={styles.link}>View Site</NavLink>
                    <button onClick={handleLogout} className={styles.logoutBtn}>Log Out</button>
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;
