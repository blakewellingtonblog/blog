import React, { useEffect } from 'react';
import styles from '../styles/Pages/HomePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPublishedPosts } from '@shared/redux/slices/blogSlice';
import useScrollAnimation from '../hooks/useScrollAnimation';
import BlogCard from './BlogCard';

function BlogSection() {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.blog);
    const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

    useEffect(() => {
        dispatch(fetchPublishedPosts({ page: 1 }));
    }, [dispatch]);

    const featured = items[0];
    const remaining = items.slice(1, 4);

    const featuredDate = featured?.published_at
        ? new Date(featured.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : null;

    return (
        <div className={styles.blogSection}>
            <h1 className={styles.sectionTitle}>Latest Posts</h1>
            {status === 'loading' && <p style={{ color: 'var(--sub-text)', textAlign: 'center' }}>Loading...</p>}

            {featured && (
                <Link to={`/blog/${featured.slug}`} className={styles.featuredPost}>
                    {featured.cover_image_url && (
                        <div className={styles.featuredImageWrap}>
                            <img src={featured.cover_image_url} alt={featured.title} className={styles.featuredImage} />
                        </div>
                    )}
                    <div className={styles.featuredBody}>
                        <span className={styles.featuredLabel}>Latest</span>
                        <h2 className={styles.featuredTitle}>{featured.title}</h2>
                        {featured.excerpt && <p className={styles.featuredExcerpt}>{featured.excerpt}</p>}
                        {featuredDate && <span className={styles.featuredDate}>{featuredDate}</span>}
                        {featured.tags?.length > 0 && (
                            <div className={styles.featuredTags}>
                                {featured.tags.map(tag => (
                                    <span key={tag.id} className="chit">{tag.name}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            )}

            {remaining.length > 0 && (
                <div
                    ref={gridRef}
                    className={`${styles.blogGrid} ${gridVisible ? styles.blogGridVisible : ''}`}
                >
                    {remaining.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}

            {items.length > 0 && (
                <div className={styles.blogFooter}>
                    <Link to="/blog" className="button-outline">View All Posts</Link>
                </div>
            )}
        </div>
    );
}

export default BlogSection;
