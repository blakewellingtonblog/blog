import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Pages/HomePage.module.css';

function AboutMeSection(){
    return(
        <div className={styles.aboutMeSection}>
            <h1 className={styles.sectionTitle}>About Me</h1>
            <p className={styles.aboutMeText}>
                I'm a builder, coach, and student of systems, a practitioner of incremental progress and long-term thinking.<br />
                <br />
                I'm most alive at the intersection of sport, work, and craft, where discipline compounds quietly and outcomes lag effort. Coaching was my entry point. It taught me that development isn't motivational, it's structural. Standards matter. Reps matter. Environment matters. The same is true in business, health, and life. <br />
                <br />
                I'm currently building <Link to="/my-work" style={{ color: 'var(--brand-highlight)', fontWeight: 500 }}>10k Athletics</Link>, a sports-tech platform focused on athlete development as a system rather than a moment. The idea is simple: most people want to improve, but lack structure, feedback, and continuity. My work lives in that gap — designing tools, incentives, and workflows that reward patience, responsibility, and consistency over time.<br />
                <br />
                This blog is where I connect these threads: sport, coaching, entrepreneurship, health, philosophy, and work, as parts of the same system. It's not a brand. It's a record of thinking in public, refining ideas, and getting slightly better at the craft over time.<br />
                <br />
                If any of this resonates, we probably have something to talk about.<br />
            </p>
        </div>
    );
};

export default AboutMeSection;
