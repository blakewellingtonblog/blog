import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience, clearCurrent } from '@shared/redux/slices/workSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroCanvas from '../components/HeroCanvas';
import { EXPERIENCE_LINKS } from '../config/portfolioAssets';
import styles from '../styles/Pages/ExperiencePage.module.css';

function ExperiencePage() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { current, status } = useSelector((state) => state.work);

    useEffect(() => {
        dispatch(fetchExperience(slug));
        return () => dispatch(clearCurrent());
    }, [dispatch, slug]);

    if (status === 'loading' || !current) {
        return (
            <div className={styles.page}>
                <NavBar />
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    const extras = EXPERIENCE_LINKS[slug];

    return (
        <div className={styles.page}>
            <NavBar />

            {current.header_image_url && (
                <div className={styles.headerImage}>
                    <img src={current.header_image_url} alt={current.title} />
                    <div className={styles.headerOverlay}>
                        <h1 className={styles.headerTitle}>{current.title}</h1>
                        {current.subtitle && (
                            <p className={styles.headerSubtitle}>{current.subtitle}</p>
                        )}
                    </div>
                </div>
            )}

            {!current.header_image_url && (
                <div className={styles.headerAnimated}>
                    <HeroCanvas className={styles.headerCanvas} intensity={70} />
                    <div className={styles.headerVignette} />
                    <div className={styles.headerAnimatedContent}>
                        <h1 className={styles.headerTitle}>{current.title}</h1>
                        {current.subtitle && (
                            <p className={styles.headerSubtitle}>{current.subtitle}</p>
                        )}
                    </div>
                </div>
            )}

            {current.description_html && (
                <section className={styles.section}>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: current.description_html }}
                    />
                </section>
            )}

            {extras && (extras.links?.length > 0 || extras.documents?.length > 0) && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Links &amp; Downloads</h2>
                    <div className={styles.linkRow}>
                        {extras.links?.map((l) => (
                            <a key={l.url} className="button-outline" href={l.url} target="_blank" rel="noopener noreferrer">
                                {l.label} ↗
                            </a>
                        ))}
                        {extras.documents?.map((d) => (
                            <a key={d.href} className="button-outline" href={d.href} download>
                                {d.label} ↓
                            </a>
                        ))}
                    </div>
                    {extras.note && <p className={styles.linkNote}>{extras.note}</p>}
                </section>
            )}

            <Footer />
        </div>
    );
}

export default ExperiencePage;
