import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioItems, fetchCategories } from '@shared/redux/slices/portfolioSlice';
import MediaCard from '../components/MediaCard';
import Lightbox from '../components/Lightbox';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/Pages/PortfolioPage.module.css';

function PortfolioPage() {
    const dispatch = useDispatch();
    const { items, categories, status } = useSelector((state) => state.portfolio);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [lightboxItem, setLightboxItem] = useState(null);

    useEffect(() => {
        dispatch(fetchPortfolioItems({ category: activeCategory, mediaType: activeType }));
        dispatch(fetchCategories());
    }, [dispatch, activeCategory, activeType]);

    return (
        <div className={styles.page}>
            <NavBar />
            <div className={styles.content}>
                <h1 className={styles.heading}>Creative Work</h1>
                <p className={styles.subheading}>Photography &amp; Videography</p>

                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`chit ${!activeCategory ? '' : styles.inactive}`}
                        >All</button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                                className={`chit ${activeCategory === cat ? '' : styles.inactive}`}
                            >{cat}</button>
                        ))}
                    </div>
                    <div className={styles.filterGroup}>
                        <button
                            onClick={() => setActiveType(null)}
                            className={`chit ${!activeType ? '' : styles.inactive}`}
                        >All Media</button>
                        <button
                            onClick={() => setActiveType(activeType === 'photo' ? null : 'photo')}
                            className={`chit ${activeType === 'photo' ? '' : styles.inactive}`}
                        >Photos</button>
                        <button
                            onClick={() => setActiveType(activeType === 'video' ? null : 'video')}
                            className={`chit ${activeType === 'video' ? '' : styles.inactive}`}
                        >Videos</button>
                    </div>
                </div>

                {status === 'loading' && <p className={styles.loading}>Loading...</p>}

                <div className={styles.grid}>
                    {items.map(item => (
                        <MediaCard key={item.id} item={item} onClick={setLightboxItem} />
                    ))}
                </div>

                {items.length === 0 && status !== 'loading' && (
                    <p className={styles.empty}>No portfolio items yet. Check back soon.</p>
                )}
            </div>
            <Footer />

            {lightboxItem && (
                <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
            )}
        </div>
    );
}

export default PortfolioPage;
