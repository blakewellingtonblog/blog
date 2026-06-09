import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import styles from '../styles/Pages/HomePage.module.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroCanvas from '../components/HeroCanvas';
import headShot from '../assets/headshot.png';
import landingBackground from '../assets/landingBackground.jpeg';
import instagram from '../assets/instagram.png';
import linkedIn from '../assets/linkedin.png';

// ---- Experience teaser content (curated summary; full list lives on /my-work) ----
const ROLES = [
    {
        period: 'Current',
        title: 'Founder & Builder',
        org: '10k Athletics',
        desc: 'Building a sports-tech platform around the Individual Development Plan — turning athlete development into a structured system of evaluation, goals, and reflection.',
    },
    {
        period: 'Ongoing',
        title: 'Coach',
        org: 'Soccer / Athletics Development',
        desc: 'Coaching as a practice in structure over hype: standards, reps, and environment as the real drivers of long-term development.',
    },
];

const EDU = [
    { school: 'Regis University', date: 'Aug 2026 – May 2027', degree: 'M.S. Applied Artificial Intelligence', detail: 'Anderson School of Business and Computing' },
    { school: 'Regis University', date: 'Aug 2022 – May 2026', degree: 'B.S. Finance, Minor in Computer Science', detail: 'Anderson School of Business · Cumulative GPA 3.7' },
];

const SKILLS = {
    Product: ['Product Discovery', 'User Interviews', 'MVP Definition', 'PRDs', 'Roadmapping', 'Go-to-Market', 'KPI Definition', 'A/B Testing'],
    Technical: ['React', 'React Native', 'TypeScript', 'Python', 'FastAPI', 'SQL / PostgreSQL', 'REST APIs', 'Auth'],
    Tools: ['Supabase', 'Figma', 'Notion', 'GitHub', 'Jira'],
};

// scroll-reveal wrapper backed by the shared IntersectionObserver hook
function Reveal({ children, className = '', delay = 0, id }) {
    const [ref, isVisible] = useScrollAnimation();
    return (
        <div
            ref={ref}
            id={id}
            className={`${styles.reveal} ${isVisible ? styles.revealIn : ''} ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === 'top' ? 0 : el.offsetTop - 40, behavior: 'smooth' });
};

function Hero() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setReady(true), 60);
        return () => clearTimeout(t);
    }, []);

    return (
        <header className={styles.hero}>
            <HeroCanvas className={styles.heroCanvas} intensity={70} />
            <div className={styles.heroVignette} />
            <div className={`${styles.heroContent} ${ready ? styles.ready : ''}`}>
                <div className={styles.heroPortraitWrap}>
                    <div className={styles.heroGlow} />
                    <img className={styles.heroPortrait} src={headShot} alt="Blake Wellington" />
                </div>
                <h1 className={styles.heroTitle}>Hi I'm <span className={styles.accent}>Blake Wellington</span></h1>
            </div>
            <div className={styles.scrollCue} onClick={() => scrollToId('about')} aria-label="Scroll down">
                <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
        </header>
    );
}

function About() {
    return (
        <section className={`${styles.band} ${styles.bandCard} ${styles.bandAccentTop}`} id="about">
            <div className={styles.wrap}>
                <Reveal className={styles.aboutHead}><h2 className={styles.sectionTitle}>About Me</h2></Reveal>
                <Reveal className={styles.aboutBody} delay={0.1}>
                    <p className={styles.aboutLead}>
                        I'm a student-athlete at Regis University pursuing a master's degree in applied artificial intelligence, with a passion for building technology that drives athlete development and performance.
                    </p>
                    <p>
                        I'm the founder of <Link to="/my-work">10k Athletics</Link>, a platform that delivers individualized development plans for athletes and teams, leveraging an open-source marketplace of training services and digital products. 10k combines my interests in software development, business strategy, and innovation within the sports and tech ecosystem.
                    </p>
                    <p>
                        My long-term goal is to work in the startup space, collaborating with driven teams that use technology to solve real-world problems and create meaningful impact. I'm always looking to connect with founders, engineers, and investors who share a vision for building something great from the ground up.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

function VideoBand() {
    return (
        <section className={styles.videoband} id="film">
            <video
                className={styles.videobandVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={landingBackground}
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className={styles.videobandScrim} />
        </section>
    );
}

function ExperienceTeaser() {
    return (
        <section className={styles.band} id="experience">
            <div className={styles.wrap}>
                <Reveal className={styles.expHead}>
                    <div className={styles.expIntro}>
                        <span className={styles.eyebrow}>What I'm building</span>
                        <h2 className={styles.sectionTitle} style={{ marginTop: 14 }}>Experience</h2>
                        <p>The experiences and projects that have shaped my work — sport, coaching, and systems, treated as parts of the same craft.</p>
                    </div>
                    <Link className={styles.btn} to="/my-work">View Full Experience →</Link>
                </Reveal>

                <Reveal className={styles.expRoles} delay={0.05}>
                    {ROLES.map((r) => (
                        <div className={styles.roleCard} key={r.title}>
                            <span className={styles.roleCardPeriod}>{r.period}</span>
                            <h3 className={styles.roleCardTitle}>{r.title}</h3>
                            <p className={styles.roleCardOrg}>{r.org}</p>
                            <p className={styles.roleCardDesc}>{r.desc}</p>
                        </div>
                    ))}
                </Reveal>

                <div className={styles.expSub}>
                    <Reveal className={styles.panel} delay={0.1}>
                        <p className={styles.panelLabel}>Education</p>
                        {EDU.map((e) => (
                            <div className={styles.eduItem} key={e.degree}>
                                <div className={styles.eduItemTop}>
                                    <h4 className={styles.eduItemSchool}>{e.school}</h4>
                                    <span className={styles.eduItemDate}>{e.date}</span>
                                </div>
                                <p className={styles.eduItemDegree}>{e.degree}</p>
                                <p className={styles.eduItemDetail}>{e.detail}</p>
                            </div>
                        ))}
                    </Reveal>
                    <Reveal className={styles.panel} delay={0.15}>
                        <p className={styles.panelLabel}>Skills</p>
                        {Object.entries(SKILLS).map(([group, items]) => (
                            <div className={styles.skillGroup} key={group}>
                                <p className={styles.skillGroupLabel}>{group}</p>
                                <div className={styles.skillTags}>
                                    {items.map((s) => <span className={styles.skillChit} key={s}>{s}</span>)}
                                </div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function Socials() {
    return (
        <section className={`${styles.band} ${styles.bandCard} ${styles.bandTopline}`} id="socials">
            <div className={styles.wrap}>
                <Reveal className={styles.socials}>
                    <span className={styles.eyebrow}>Connect</span>
                    <h2 className={styles.socialsTitle}>Let's talk</h2>
                    <p className={styles.socialsSub}>DM me to connect — sport, building, or anything in between.</p>
                    <div className={styles.socialsLinks}>
                        <a href="https://instagram.com/blake.wello" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={instagram} alt="Instagram" /></a>
                        <a href="https://www.linkedin.com/in/blake-wellington-4140a8117/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src={linkedIn} alt="LinkedIn" /></a>
                    </div>
                    <div className={styles.instagramEmbed}>
                        <behold-widget feed-id="EEKQrF1DtYOHNWxOwhNx"></behold-widget>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function Homepage() {
    // Honor a #hash arriving from another page (e.g. nav "Connect" -> /#socials)
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.slice(1);
            const t = setTimeout(() => scrollToId(id), 120);
            return () => clearTimeout(t);
        }
    }, []);

    // Robustness guard: some embed/capture/print contexts freeze CSS transitions,
    // which would leave scroll-reveal content stuck hidden. Probe whether a
    // transition actually progresses; if it doesn't, hard-set all reveals visible.
    // Real browser tabs animate normally, so this is a no-op there.
    useEffect(() => {
        const probe = document.createElement('div');
        probe.style.cssText = 'position:fixed;left:-9999px;top:0;width:2px;height:2px;opacity:0;transition:opacity .18s linear;pointer-events:none;';
        document.body.appendChild(probe);
        void probe.offsetWidth; // force reflow so the transition has a start frame
        probe.style.opacity = '1';
        const id = setTimeout(() => {
            const progressed = parseFloat(getComputedStyle(probe).opacity) > 0.2;
            probe.remove();
            if (progressed) return; // transitions work — leave reveals to the observer
            document.querySelectorAll(`.${styles.reveal}`).forEach((el) => {
                el.style.transition = 'none';
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }, 240);
        return () => clearTimeout(id);
    }, []);

    return (
        <div id="top" className={styles.page}>
            <NavBar />
            <Hero />
            <About />
            <VideoBand />
            <ExperienceTeaser />
            <Socials />
            <Footer />
        </div>
    );
}

export default Homepage;
