import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiences } from '@shared/redux/slices/workSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
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
                <h1 className={styles.heroTitle}>Experience</h1>
                <p className={styles.heroSubtitle}>
                    A look at the experiences and projects that have shaped my career.
                </p>
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
                        <h4 className={styles.skillLabel}>Product</h4>
                        <div className={styles.skillTags}>
                            {['Product Discovery', 'User Interviews', 'MVP Definition', 'PRDs', 'Feature Prioritization', 'Roadmapping', 'Agile/Scrum', 'Go-to-Market Strategy', 'KPI Definition', 'A/B Testing', 'Market Research', 'Financial Modeling'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Technical</h4>
                        <div className={styles.skillTags}>
                            {['React', 'React Native', 'JavaScript', 'TypeScript', 'Python', 'FastAPI', 'Java', 'C', 'C++', 'SQL/PostgreSQL', 'REST APIs', 'HTML/CSS', 'Authentication'].map(s => (
                                <span key={s} className={styles.skillChit}>{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.skillCategory}>
                        <h4 className={styles.skillLabel}>Tools</h4>
                        <div className={styles.skillTags}>
                            {['Supabase', 'Figma', 'Notion', 'GitHub', 'GitLab', 'Jira', 'Excel'].map(s => (
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
