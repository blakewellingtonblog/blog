import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishedPosts, fetchTags } from '@shared/redux/slices/blogSlice';
import BlogCard from '../components/BlogCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/Pages/BlogListPage.module.css';

function BlogListPage() {
    const dispatch = useDispatch();
    const { items, tags, total, page, status } = useSelector((state) => state.blog);
    const [activeTag, setActiveTag] = useState(null);
    const perPage = 10;

    useEffect(() => {
        dispatch(fetchPublishedPosts({ page: 1, tag: activeTag }));
        dispatch(fetchTags());
    }, [dispatch, activeTag]);

    const handleTagClick = (slug) => {
        setActiveTag(slug === activeTag ? null : slug);
    };

    const handlePageChange = (newPage) => {
        dispatch(fetchPublishedPosts({ page: newPage, tag: activeTag }));
        window.scrollTo(0, 0);
    };

    const totalPages = Math.ceil(total / perPage);

    return (
        <div className={styles.page}>
            <NavBar />
            <div className={styles.content}>
                <h1 className={styles.heading}>Blog</h1>
                {tags.length > 0 && (
                    <div className={styles.tags}>
                        <button
                            onClick={() => setActiveTag(null)}
                            className={`chit ${!activeTag ? '' : styles.tagInactive}`}
                        >All</button>
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                onClick={() => handleTagClick(tag.slug)}
                                className={`chit ${activeTag === tag.slug ? '' : styles.tagInactive}`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                )}
                {status === 'loading' && <p className={styles.loading}>Loading...</p>}
                <div className={styles.grid}>
                    {items.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
                {items.length === 0 && status !== 'loading' && (
                    <p className={styles.empty}>No posts yet. Check back soon.</p>
                )}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => handlePageChange(p)}
                                className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BlogListPage;
