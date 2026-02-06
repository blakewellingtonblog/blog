import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminInfluences, deleteInfluence } from '@shared/redux/slices/influencesSlice';
import styles from '../styles/Pages/AdminInfluences.module.css';

function AdminInfluencesList() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.influences);

    useEffect(() => {
        dispatch(fetchAdminInfluences());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this influence?')) {
            dispatch(deleteInfluence(id));
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Influences</h1>
                <Link to="/admin/influences/new" className="button">Add Influence</Link>
            </div>

            {items.length > 0 ? (
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <span>Title</span>
                        <span>Category</span>
                        <span>Author</span>
                        <span>Status</span>
                        <span>Actions</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.id} className={styles.tableRow}>
                            <Link to={`/admin/influences/${item.id}`} className={styles.titleLink}>
                                {item.title}
                            </Link>
                            <span>
                                <span className={styles.categoryChit}>{item.category}</span>
                            </span>
                            <span className={styles.author}>{item.author || '—'}</span>
                            <span>
                                <span className={`chit ${item.is_active ? '' : styles.inactive}`}>
                                    {item.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </span>
                            <div className={styles.colActions}>
                                <Link to={`/admin/influences/${item.id}`} className="button-outline">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className={styles.deleteBtn}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>No influences yet.</p>
                    <Link to="/admin/influences/new" className="button">Add your first influence</Link>
                </div>
            )}
        </div>
    );
}

export default AdminInfluencesList;
