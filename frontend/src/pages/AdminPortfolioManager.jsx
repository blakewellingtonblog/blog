import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioItems, deletePortfolioItem } from '@shared/redux/slices/portfolioSlice';
import styles from '../styles/Pages/AdminPortfolioManager.module.css';

function AdminPortfolioManager() {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(fetchPortfolioItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this portfolio item?')) {
            dispatch(deletePortfolioItem(id));
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Creative Work</h1>
                <Link to="/admin/portfolio/new" className="button">Add Item</Link>
            </div>
            {status === 'loading' && <p>Loading...</p>}
            <div className={styles.grid}>
                {items.map(item => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.thumb}>
                            {item.media_type === 'video' ? (
                                <div className={styles.videoPlaceholder}>
                                    <span>&#9654;</span>
                                </div>
                            ) : (
                                <img src={item.media_url} alt={item.title} />
                            )}
                        </div>
                        <div className={styles.cardBody}>
                            <h3>{item.title}</h3>
                            <div className={styles.cardMeta}>
                                <span className="chit">{item.media_type}</span>
                                {item.category && <span className="chit">{item.category}</span>}
                            </div>
                            <div className={styles.cardActions}>
                                <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && status !== 'loading' && (
                <div className={styles.empty}>
                    <p>No portfolio items yet.</p>
                    <Link to="/admin/portfolio/new" className="button">Upload your first item</Link>
                </div>
            )}
        </div>
    );
}

export default AdminPortfolioManager;
