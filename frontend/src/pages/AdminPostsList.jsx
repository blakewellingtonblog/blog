import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminPosts, deletePost, publishPost, unpublishPost } from '@shared/redux/slices/blogSlice';
import styles from '../styles/Pages/AdminPostsList.module.css';

function AdminPostsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adminItems, status } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchAdminPosts());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this post?')) {
            dispatch(deletePost(id));
        }
    };

    const handleTogglePublish = (post) => {
        if (post.status === 'published') {
            dispatch(unpublishPost(post.id));
        } else {
            dispatch(publishPost(post.id));
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Blog Posts</h1>
                <Link to="/admin/posts/new" className="button">New Post</Link>
            </div>
            {status === 'loading' && <p>Loading...</p>}
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span className={styles.colTitle}>Title</span>
                    <span className={styles.colStatus}>Status</span>
                    <span className={styles.colDate}>Updated</span>
                    <span className={styles.colActions}>Actions</span>
                </div>
                {adminItems.map(post => (
                    <div key={post.id} className={styles.tableRow}>
                        <span className={styles.colTitle}>
                            <Link to={`/admin/posts/${post.id}/edit`} className={styles.titleLink}>
                                {post.title}
                            </Link>
                        </span>
                        <span className={styles.colStatus}>
                            <span className="chit">{post.status}</span>
                        </span>
                        <span className={styles.colDate}>
                            {new Date(post.updated_at).toLocaleDateString()}
                        </span>
                        <span className={styles.colActions}>
                            <button
                                onClick={() => handleTogglePublish(post)}
                                className="button-outline"
                            >
                                {post.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                                onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                                className="button-outline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                ))}
                {adminItems.length === 0 && status !== 'loading' && (
                    <div className={styles.empty}>
                        <p>No posts yet.</p>
                        <Link to="/admin/posts/new" className="button">Create your first post</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPostsList;
