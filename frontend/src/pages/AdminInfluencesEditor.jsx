import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import influencesApi from '@shared/axios/influencesApi';
import styles from '../styles/Pages/AdminInfluences.module.css';

function AdminInfluencesEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('book');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) {
            loadInfluence();
        }
    }, [id]);

    const loadInfluence = async () => {
        try {
            const items = await influencesApi.fetchAdminInfluences();
            const item = items.find((i) => i.id === id);
            if (item) {
                setTitle(item.title);
                setCategory(item.category);
                setAuthor(item.author || '');
                setDescription(item.description || '');
                setImageUrl(item.image_url || '');
                setLinkUrl(item.link_url || '');
                setSortOrder(item.sort_order || 0);
                setIsActive(item.is_active);
            }
        } catch {
            toast.error('Failed to load influence');
        }
    };

    const handleSave = async () => {
        if (!title) {
            toast.error('Title is required');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                title,
                category,
                author: author || null,
                description: description || null,
                image_url: imageUrl || null,
                link_url: linkUrl || null,
                sort_order: sortOrder,
                is_active: isActive,
            };
            if (isNew) {
                const created = await influencesApi.createInfluence(payload);
                toast.success('Influence created');
                navigate(`/admin/influences/${created.id}`);
            } else {
                await influencesApi.updateInfluence(id, payload);
                toast.success('Influence saved');
            }
        } catch {
            toast.error('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>{isNew ? 'New Influence' : 'Edit Influence'}</h1>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Details</h2>
                <div className={styles.formGrid}>
                    <label className={styles.field}>
                        <span>Title</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                            placeholder="e.g. Atomic Habits"
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Category</span>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="book">Book</option>
                            <option value="podcast">Podcast</option>
                            <option value="creator">Creator</option>
                        </select>
                    </label>
                    <label className={styles.field}>
                        <span>Author / Host / Creator</span>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className={styles.input}
                            placeholder="e.g. James Clear"
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Link URL</span>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className={styles.input}
                            placeholder="https://..."
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Image URL</span>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={styles.input}
                            placeholder="https://..."
                        />
                    </label>
                    <div className={styles.fieldRow}>
                        <label className={styles.field}>
                            <span>Sort Order</span>
                            <input
                                type="number"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                                className={styles.input}
                            />
                        </label>
                        <label className={styles.fieldCheckbox}>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                            <span>Active</span>
                        </label>
                    </div>
                </div>
                <label className={styles.field}>
                    <span>Description</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                        rows={4}
                        placeholder="Why this is influential..."
                    />
                </label>
                <button onClick={handleSave} className="button" disabled={saving}>
                    {saving ? 'Saving...' : isNew ? 'Create Influence' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}

export default AdminInfluencesEditor;
