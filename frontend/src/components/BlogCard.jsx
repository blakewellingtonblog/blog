import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Components/BlogCard.module.css';

function BlogCard({ post }) {
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : null;

    return (
        <Link to={`/blog/${post.slug}`} className={styles.card}>
            {post.cover_image_url && (
                <div className={styles.imageWrapper}>
                    <img src={post.cover_image_url} alt={post.title} className={styles.image} />
                </div>
            )}
            <div className={styles.body}>
                <h3 className={styles.title}>{post.title}</h3>
                {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                {date && <span className={styles.date}>{date}</span>}
                {post.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {post.tags.map(tag => (
                            <span key={tag.id} className="chit">{tag.name}</span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

export default BlogCard;
