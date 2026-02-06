import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience, clearCurrent } from '@shared/redux/slices/workSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
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

    const timeline = current.timeline || [];
    const featuredPosts = current.featured_posts || [];

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
                <div className={styles.headerPlain}>
                    <h1>{current.title}</h1>
                    {current.subtitle && <p>{current.subtitle}</p>}
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

            {featuredPosts.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Featured Posts</h2>
                    <div className={styles.postsGrid}>
                        {featuredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            )}

            {timeline.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Timeline</h2>
                    <div className={styles.timeline}>
                        {timeline.map((event) => (
                            <div key={event.id} className={styles.timelineEvent}>
                                <div className={styles.timelineDateCol}>
                                    <span className={styles.timelineDate}>
                                        {new Date(event.event_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                        })}
                                    </span>
                                    <div className={styles.timelineDot} />
                                </div>
                                <div className={styles.timelineContent}>
                                    <h3 className={styles.timelineTitle}>{event.title}</h3>
                                    {event.subtitle && (
                                        <p className={styles.timelineSubtitle}>{event.subtitle}</p>
                                    )}
                                    {event.photo_url && (
                                        <img
                                            src={event.photo_url}
                                            alt={event.title}
                                            className={styles.timelinePhoto}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}

export default ExperiencePage;
