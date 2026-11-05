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
        period: 'Dec 2022 – Present',
        title: 'Founder & Product Lead',
        org: '10k Athletics',
        desc: 'Founded and run a sports-tech platform built around individual development plans. Secured $45K in non-dilutive funding, built and managed the budget across design, engineering, and go-to-market, defined and tracked KPIs, and shipped through a 50-user beta.',
    },
    {
        period: 'Dec 2023 – Dec 2024',
        title: 'Website Manager & Systems Lead',
        org: 'The Farm FC',
        desc: 'Built the organization\'s website and the systems behind it: CRM workflows, cleaner customer data, and internal order tracking that gave staff operational visibility they didn\'t have before.',
    },
    {
        period: 'Feb 2025 – Present',
        title: 'Soccer Coach',
        org: 'Kent Denver School',
        desc: 'Head and assistant coach across program levels. Training plans built from player performance data, individualized feedback, and a bias toward structure over hype.',
    },
];

const EDU = [
    { school: 'Regis University', date: 'Aug 2026 – May 2027', degree: 'M.S. Applied Artificial Intelligence', detail: 'Anderson School of Business and Computing' },
    { school: 'Regis University', date: 'Aug 2022 – May 2026', degree: 'B.S. Finance, Minor in Computer Science', detail: 'Anderson School of Business · Cumulative GPA 3.7' },
];

const SKILLS = {
    'Finance & Analysis': ['Financial Modeling', 'Financial Statement Analysis', 'Budgeting & Forecasting', 'Capital Allocation', 'Valuation Fundamentals', 'Variance Analysis', 'KPI Definition & Tracking', 'Data Analysis', 'Excel', 'SQL / PostgreSQL', 'Python'],
    Product: ['Product Discovery', 'User Interviews', 'MVP Definition', 'PRDs', 'Roadmapping', 'Go-to-Market'],
    Technical: ['React', 'React Native', 'TypeScript', 'FastAPI', 'REST APIs', 'Auth'],
    Tools: ['Posthog', 'Supabase', 'Figma', 'Notion', 'GitHub', 'Jira'],
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
                        I'm a student-athlete at Regis University with a B.S. in Finance and a minor in Computer Science, now pursuing a master's degree in applied artificial intelligence. I'm drawn to work where careful analysis and real execution meet.
                    </p>
                    <p>
                        For the past three years I've been the founder of <Link to="/my-work">10k Athletics</Link>, a platform that delivers individualized development plans for athletes and teams. Running it has meant owning the numbers as much as the product: securing $45K in non-dilutive funding, building and managing the budget across design, engineering, and go-to-market, defining and tracking the KPIs we measured ourselves against, and turning market research into decisions about what to build and what to cut.
                    </p>
                    <p>
                        I'm open about what comes next. That could be a financial analyst or FP&amp;A role where I can put my finance training and modeling skills to work, an analytics or operations seat, or a product team at an early-stage company. What matters most to me is working with people who take the problem seriously and want to get a little better at it every week.
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
                        <span className={styles.eyebrow}>Background</span>
                        <h2 className={styles.sectionTitle} style={{ marginTop: 14 }}>Experience</h2>
                        <p>Finance training, three years of running a company, and years of coaching. Different settings, same discipline: set clear standards, measure honestly, and improve a little at a time.</p>
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
                    <p className={styles.socialsSub}>Reach out about finance, analytics, product, sport, or anything in between.</p>
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
