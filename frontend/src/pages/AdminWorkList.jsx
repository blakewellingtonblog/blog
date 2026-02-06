import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminExperiences, deleteExperience } from '@shared/redux/slices/workSlice';
import styles from '../styles/Pages/AdminWorkList.module.css';

function AdminWorkList() {
    const dispatch = useDispatch();
    const { experiences } = useSelector((state) => state.work);

    useEffect(() => {
        dispatch(fetchAdminExperiences());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this experience and all its timeline events and featured posts?')) {
            dispatch(deleteExperience(id));
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Experience</h1>
                <Link to="/admin/work/new" className="button">Add Experience</Link>
            </div>

            {experiences.length > 0 ? (
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <span>Title</span>
                        <span>Slug</span>
                        <span>Status</span>
                        <span>Order</span>
                        <span>Actions</span>
                    </div>
                    {experiences.map((exp) => (
                        <div key={exp.id} className={styles.tableRow}>
                            <Link to={`/admin/work/${exp.id}`} className={styles.titleLink}>
                                {exp.title}
                            </Link>
                            <span className={styles.slug}>{exp.slug}</span>
                            <span>
                                <span className={`chit ${exp.is_active ? '' : styles.inactive}`}>
                                    {exp.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </span>
                            <span className={styles.order}>{exp.sort_order}</span>
                            <div className={styles.colActions}>
                                <Link to={`/admin/work/${exp.id}`} className="button-outline">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(exp.id)}
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
                    <p>No work experiences yet.</p>
                    <Link to="/admin/work/new" className="button">Add your first experience</Link>
                </div>
            )}
        </div>
    );
}

export default AdminWorkList;
