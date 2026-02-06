import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfluences } from '@shared/redux/slices/influencesSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/Pages/InfluencesPage.module.css';

const CATEGORIES = [
    { key: null, label: 'All' },
    { key: 'book', label: 'Books' },
    { key: 'podcast', label: 'Podcasts' },
    { key: 'creator', label: 'Creators' },
];

const CATEGORY_ICONS = {
    book: '\u{1F4DA}',
    podcast: '\u{1F399}',
    creator: '\u{1F3AC}',
};

function InfluencesPage() {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.influences);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchInfluences(activeCategory));
    }, [dispatch, activeCategory]);

    return (
        <div className={styles.page}>
            <NavBar />
            <div className={styles.content}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Influences</h1>
                    <p className={styles.heroSubtitle}>
                        Books, podcasts, and creators that have shaped my thinking.
                    </p>
                </div>

                <div className={styles.filters}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`chit ${activeCategory === cat.key ? '' : styles.inactive}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {status === 'loading' && <p className={styles.loading}>Loading...</p>}

                <div className={styles.grid}>
                    {items.map((item) => {
                        const Wrapper = item.link_url ? 'a' : 'div';
                        const wrapperProps = item.link_url
                            ? { href: item.link_url, target: '_blank', rel: 'noopener noreferrer' }
                            : {};
                        return (
                            <Wrapper key={item.id} className={styles.card} {...wrapperProps}>
                                {item.image_url ? (
                                    <div className={styles.cardImage}>
                                        <img src={item.image_url} alt={item.title} />
                                    </div>
                                ) : (
                                    <div className={styles.cardPlaceholder}>
                                        {CATEGORY_ICONS[item.category] || ''}
                                    </div>
                                )}
                                <div className={styles.cardBody}>
                                    <span className={styles.cardCategory}>{item.category}</span>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    {item.author && (
                                        <p className={styles.cardAuthor}>by {item.author}</p>
                                    )}
                                    {item.description && (
                                        <p className={styles.cardDescription}>{item.description}</p>
                                    )}
                                    {item.link_url && (
                                        <span className={styles.cardLink}>View &rarr;</span>
                                    )}
                                </div>
                            </Wrapper>
                        );
                    })}
                </div>

                {items.length === 0 && status !== 'loading' && (
                    <p className={styles.empty}>No influences to show yet. Check back soon.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default InfluencesPage;
