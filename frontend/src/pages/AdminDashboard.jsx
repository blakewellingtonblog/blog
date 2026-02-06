import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminPosts } from '@shared/redux/slices/blogSlice';
import { fetchPortfolioItems } from '@shared/redux/slices/portfolioSlice';
import styles from '../styles/Pages/AdminDashboard.module.css';

function AdminDashboard() {
    const dispatch = useDispatch();
    const blogItems = useSelector((state) => state.blog.adminItems);
    const portfolioItems = useSelector((state) => state.portfolio.items);

    useEffect(() => {
        dispatch(fetchAdminPosts());
        dispatch(fetchPortfolioItems());
    }, [dispatch]);

    const publishedCount = blogItems.filter(p => p.status === 'published').length;
    const draftCount = blogItems.filter(p => p.status === 'draft').length;

    return (
        <div className={styles.page}>
            <h1>Welcome, Blake</h1>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{publishedCount}</span>
                    <span className={styles.statLabel}>Published Posts</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{draftCount}</span>
                    <span className={styles.statLabel}>Drafts</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{portfolioItems.length}</span>
                    <span className={styles.statLabel}>Portfolio Items</span>
                </div>
            </div>
            <div className={styles.actions}>
                <h2>Quick Actions</h2>
                <div className={styles.actionGrid}>
                    <Link to="/admin/posts/new" className="button">New Blog Post</Link>
                    <Link to="/admin/portfolio/new" className="button-outline">Add Portfolio Item</Link>
                    <Link to="/admin/athletics" className="button-outline">Manage Services</Link>
                </div>
            </div>
            {blogItems.length > 0 && (
                <div className={styles.recentSection}>
                    <h2>Recent Posts</h2>
                    <div className={styles.recentList}>
                        {blogItems.slice(0, 5).map(post => (
                            <div key={post.id} className={styles.recentItem}>
                                <Link to={`/admin/posts/${post.id}/edit`} className={styles.recentTitle}>
                                    {post.title}
                                </Link>
                                <span className={`chit`}>{post.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
