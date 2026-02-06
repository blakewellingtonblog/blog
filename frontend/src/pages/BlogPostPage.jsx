import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostBySlug, clearCurrentPost } from '@shared/redux/slices/blogSlice';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/Pages/BlogPostPage.module.css';

function BlogPostPage() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { current: post, status } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchPostBySlug(slug));
        return () => dispatch(clearCurrentPost());
    }, [dispatch, slug]);

    if (status === 'loading' || !post) {
        return (
            <div className={styles.page}>
                <NavBar />
                <div className={styles.content}>
                    <p className={styles.loading}>Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : null;

    return (
        <div className={styles.page}>
            <NavBar />
            <article className={styles.content}>
                {post.cover_image_url && (
                    <img src={post.cover_image_url} alt={post.title} className={styles.coverImage} />
                )}
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                    {date && <span>{date}</span>}
                    {post.tags?.length > 0 && (
                        <div className={styles.tags}>
                            {post.tags.map(tag => (
                                <span key={tag.id} className="chit">{tag.name}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: post.content_html }}
                />
                <div className={styles.back}>
                    <Link to="/blog" className="button-outline">Back to Blog</Link>
                </div>
            </article>
            <Footer />
        </div>
    );
}

export default BlogPostPage;
