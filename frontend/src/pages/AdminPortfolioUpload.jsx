import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPortfolioItem } from '@shared/redux/slices/portfolioSlice';
import ImageUploader from '../components/ImageUploader';
import uploadApi from '@shared/axios/uploadApi';
import styles from '../styles/Pages/AdminPortfolioUpload.module.css';

function AdminPortfolioUpload() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('photo');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleFileUpload = async (file) => {
        setUploading(true);
        try {
            const result = await uploadApi.uploadPortfolioMedia(file);
            setMediaUrl(result.url);
            setMediaType(result.media_type);
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !mediaUrl) return;
        setSaving(true);
        try {
            await dispatch(createPortfolioItem({
                title,
                description,
                category: category || null,
                media_url: mediaUrl,
                media_type: mediaType,
            })).unwrap();
            navigate('/admin/portfolio');
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <h1>Add Portfolio Item</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.uploadSection}>
                    <ImageUploader
                        onUpload={handleFileUpload}
                        accept={{
                            'image/*': [],
                            'video/mp4': [],
                            'video/quicktime': [],
                            'video/webm': [],
                        }}
                        label={uploading ? 'Uploading...' : 'Upload photo or video'}
                        currentUrl={mediaType === 'photo' ? mediaUrl : null}
                    />
                    {mediaUrl && (
                        <p className={styles.uploaded}>
                            Uploaded: <span className="chit">{mediaType}</span>
                        </p>
                    )}
                </div>

                <label className={styles.label}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />

                <label className={styles.label}>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    rows={3}
                />

                <label className={styles.label}>Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. athletics, lifestyle, commercial"
                />

                <div className={styles.actions}>
                    <button type="button" onClick={() => navigate('/admin/portfolio')} className="button-outline">
                        Cancel
                    </button>
                    <button type="submit" className="button" disabled={saving || !mediaUrl}>
                        {saving ? 'Saving...' : 'Save Item'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminPortfolioUpload;
