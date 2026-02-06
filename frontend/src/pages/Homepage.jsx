import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioItems } from '@shared/redux/slices/portfolioSlice';
import useScrollAnimation from '../hooks/useScrollAnimation';
import styles from '../styles/Pages/HomePage.module.css';
import NavBar from '../components/NavBar';
import BlogSection from '../components/BlogSection';
import AboutMeSection from '../components/AboutMeSection';
import SocialSection from '../components/SocialSection';
import Footer from '../components/Footer';
import MediaCard from '../components/MediaCard';
import headShot from '../assets/headShot.png';
import instagram from '../assets/instagram.png';
import linkedIn from '../assets/linkedIn.png';

function AnimatedSection({ children, className, delay }) {
    const [ref, isVisible] = useScrollAnimation();
    const delayClass = delay ? styles[`animDelay${delay}`] : '';
    return (
        <div
            ref={ref}
            className={`${className || ''} ${styles.animHidden} ${isVisible ? styles.animVisible : ''} ${delayClass}`}
        >
            {children}
        </div>
    );
}

function StaggerGrid({ children, className, visibleClass }) {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? visibleClass : ''}`}
        >
            {children}
        </div>
    );
}

function Homepage() {
    const dispatch = useDispatch();
    const { items: portfolioItems } = useSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(fetchPortfolioItems());
    }, [dispatch]);

    const featuredItems = portfolioItems.slice(0, 6);

    const scrollToContent = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className={styles.page}>
            <div className={styles.landingSection}>
                <video
                    className={styles.landingVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                <div className={styles.landingOverlay} />
                <NavBar />
                <div className={styles.scrollIndicator} onClick={scrollToContent}>
                    <svg viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>

            <AnimatedSection className={styles.introSection}>
                <img src={headShot} className={styles.headShot} alt="Blake Wellington" />
                <div className={styles.introContent}>
                    <h1 className={styles.introName}>Hi I'm <br/><span className={styles.highlight}>Blake Wellington</span></h1>
                    <h3 className={styles.tagline}>Reality is Negotiable</h3>
                    <div className={styles.introLinks}>
                        <a href="https://instagram.com/blake.wello" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedIn} alt="LinkedIn" /></a>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <AboutMeSection />
            </AnimatedSection>

            <AnimatedSection className={styles.section}>
                <BlogSection />
            </AnimatedSection>

            <div className={styles.portfolioSection}>
                <div className={styles.portfolioInner}>
                    <AnimatedSection>
                        <h1 className={styles.sectionTitle}>Creative Work</h1>
                    </AnimatedSection>
                    {featuredItems.length > 0 && (
                        <StaggerGrid
                            className={styles.portfolioGrid}
                            visibleClass={styles.portfolioGridVisible}
                        >
                            {featuredItems.map(item => (
                                <MediaCard key={item.id} item={item} />
                            ))}
                        </StaggerGrid>
                    )}
                    <AnimatedSection className={styles.portfolioFooter}>
                        <Link to="/portfolio" className="button-outline">View All Creative Work</Link>
                    </AnimatedSection>
                </div>
            </div>

            <AnimatedSection>
                <SocialSection />
            </AnimatedSection>
            <Footer />
        </div>
    );
}

export default Homepage;
