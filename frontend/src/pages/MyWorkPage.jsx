import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences } from '@shared/redux/slices/workSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroCanvas from '../components/HeroCanvas';
import { RESUME, PRODUCT_WORK } from '../config/portfolioAssets';
import styles from '../styles/Pages/MyWorkPage.module.css';

function MyWorkPage() {
    const dispatch = useDispatch();
    const { experiences, status } = useSelector((state) => state.work);

    useEffect(() => {
        dispatch(fetchExperiences());
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <NavBar />
            <section className={styles.hero}>
                <HeroCanvas className={styles.heroCanvas} intensity={70} />
                <div className={styles.heroVignette} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Experience</h1>
                    <p className={styles.heroSubtitle}>
                        The roles, projects, and education that have shaped my work, from finance and analysis to building and coaching.
                    </p>
                    <div className={styles.heroActions}>
                        <a className="button" href={RESUME.href} download>Download Résumé ↓</a>
                    </div>
                </div>
            </section>

            {status === 'loading' && (
                <div className={styles.loading}>Loading...</div>
            )}

            <section className={styles.experienceList}>
                {experiences.map((exp) => (
                    <Link
                        key={exp.id}
                        to={`/my-work/${exp.slug}`}
                        className={styles.card}
                    >
                        {exp.header_image_url && (
                            <div className={styles.cardImage}>
                                <img src={exp.header_image_url} alt={exp.title} />
                            </div>
                        )}
                        <div className={styles.cardBody}>
                            <h2 className={styles.cardTitle}>{exp.title}</h2>
                            {exp.subtitle && (
                                <p className={styles.cardSubtitle}>{exp.subtitle}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </section>

            {experiences.length === 0 && status !== 'loading' && (
                <div className={styles.empty}>
                    <p>No experiences to show yet.</p>
                </div>
            )}

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Selected Work</h2>
                <div className={styles.pwCard}>
                    <p className={styles.pwLead}>
                        Applied work from <strong>10k Athletics</strong>, the sports-tech platform I founded. The live
                        product is the fastest way to see it. The case studies show the reasoning behind specific
                        decisions: a build-vs-buy analysis of marketplace payment infrastructure, a data-driven diagnosis
                        of a zero-activation launch, and a feature-scoping call with real engineering tradeoffs.
                    </p>
                    <div className={styles.pwRow}>
                        <a className="button-outline" href={PRODUCT_WORK.live.site} target="_blank" rel="noopener noreferrer">Live product ↗</a>
                        <a className="button-outline" href={PRODUCT_WORK.live.appStore} target="_blank" rel="noopener noreferrer">App Store ↗</a>
                    </div>
                    <p className={styles.pwNote}>
                        Sign-up access code: <span className={styles.pwCode}>{PRODUCT_WORK.live.accessCode}</span>
                    </p>
                    <div className={styles.pwDivider} />
                    <p className={styles.pwGroupLabel}>Downloads</p>
                    <div className={styles.pwRow}>
                        <a className="button-outline" href={PRODUCT_WORK.packet.href} download>{PRODUCT_WORK.packet.label} ↓</a>
                        {PRODUCT_WORK.caseStudies.map((d) => (
                            <a key={d.href} className="button-outline" href={d.href} download>{d.label} ↓</a>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.educationList}>
                    <div className={styles.eduCard}>
                        <div className={styles.eduHeader}>
                            <h3 className={styles.eduSchool}>Regis University</h3>
                            <span className={styles.eduDate}>Expected Aug 2026 - May 2027</span>
                        </div>
                        <p className={styles.eduProgram}>Anderson School of Business and Computing</p>
                        <p className={styles.eduDegree}>Master of Science in Applied Artificial Intelligence</p>
                    </div>
                    <div className={styles.eduCard}>
                        <div className={styles.eduHeader}>
                            <h3 className={styles.eduSchool}>Regis University</h3>
                            <span className={styles.eduDate}>Aug 2022 - May 2026</span>
                        </div>
                        <p className={styles.eduProgram}>Anderson School of Business and Computing</p>
                        <p className={styles.eduDegree}>Bachelor of Science in Finance, Minor in Computer Science</p>
                        <p className={styles.eduDetail}>Cumulative GPA 3.7</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.skillsGroup}>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Finance &amp; Analysis</h4>
                        <div className={styles.skillTags}>
                            {['Financial Modeling', 'Excel', 'Budget Allocation', 'KPI Definition', 'Market Research', 'A/B Testing', 'SQL/PostgreSQL', 'Python'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Product</h4>
                        <div className={styles.skillTags}>
                            {['Product Discovery', 'User Interviews', 'MVP Definition', 'PRDs', 'Feature Prioritization', 'Roadmapping', 'Agile/Scrum', 'Go-to-Market Strategy'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Technical</h4>
                        <div className={styles.skillTags}>
                            {['React', 'React Native', 'JavaScript', 'TypeScript', 'FastAPI', 'Java', 'C', 'C++', 'REST APIs', 'HTML/CSS', 'Authentication'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Tools</h4>
                        <div className={styles.skillTags}>
                            {['Supabase', 'Figma', 'Notion', 'GitHub', 'GitLab', 'Jira'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default MyWorkPage;
