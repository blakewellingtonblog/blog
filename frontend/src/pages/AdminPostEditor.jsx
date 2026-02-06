import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, fetchAdminPost, clearCurrentPost, fetchTags } from '@shared/redux/slices/blogSlice';
import TipTapEditor from '../components/TipTapEditor';
import ImageUploader from '../components/ImageUploader';
import uploadApi from '@shared/axios/uploadApi';
import styles from '../styles/Pages/AdminPostEditor.module.css';

function AdminPostEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPost = useSelector((state) => state.blog.current);
    const tags = useSelector((state) => state.blog.tags);
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [content, setContent] = useState(null);
    const [contentHtml, setContentHtml] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        dispatch(fetchTags());
        if (isEdit) {
            dispatch(fetchAdminPost(id));
        }
        return () => dispatch(clearCurrentPost());
    }, [dispatch, id, isEdit]);

    useEffect(() => {
        if (isEdit && currentPost) {
            setTitle(currentPost.title || '');
            setSlug(currentPost.slug || '');
            setExcerpt(currentPost.excerpt || '');
            setCoverImageUrl(currentPost.cover_image_url || '');
            setContent(currentPost.content || null);
            setContentHtml(currentPost.content_html || '');
            setSelectedTags(currentPost.tags?.map(t => t.id) || []);
        }
    }, [isEdit, currentPost]);

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleTitleChange = (value) => {
        setTitle(value);
        if (!isEdit || slug === generateSlug(currentPost?.title || '')) {
            setSlug(generateSlug(value));
        }
    };

    const handleEditorUpdate = useCallback(({ json, html }) => {
        setContent(json);
        setContentHtml(html);
    }, []);

    const handleCoverUpload = async (file) => {
        try {
            const result = await uploadApi.uploadBlogImage(file, 'covers');
            setCoverImageUrl(result.url);
        } catch (err) {
            console.error('Cover upload failed:', err);
        }
    };

    const handleToggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleSave = async (status = 'draft') => {
        if (!title || !slug) return;
        setSaving(true);
        const postData = {
            title,
            slug,
            excerpt,
            content: content || { type: 'doc', content: [] },
            content_html: contentHtml,
            cover_image_url: coverImageUrl || null,
            status,
            tag_ids: selectedTags,
        };

        try {
            if (isEdit) {
                await dispatch(updatePost({ id, data: postData })).unwrap();
            } else {
                const result = await dispatch(createPost(postData)).unwrap();
                navigate(`/admin/posts/${result.id}/edit`, { replace: true });
            }
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>{isEdit ? 'Edit Post' : 'New Post'}</h1>
                <div className={styles.headerActions}>
                    <button onClick={() => handleSave('draft')} className="button-outline" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Draft'}
                    </button>
                    <button onClick={() => handleSave('published')} className="button" disabled={saving}>
                        {saving ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.main}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Post title"
                        className={styles.titleInput}
                    />
                    <div className={styles.slugRow}>
                        <label className={styles.label}>Slug:</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className={styles.slugInput}
                        />
                    </div>
                    <TipTapEditor
                        content={content}
                        onUpdate={handleEditorUpdate}
                        placeholder="Start writing your post..."
                    />
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.sidebarSection}>
                        <h3>Cover Image</h3>
                        <ImageUploader
                            onUpload={handleCoverUpload}
                            currentUrl={coverImageUrl}
                            label="Upload cover image"
                        />
                    </div>

                    <div className={styles.sidebarSection}>
                        <h3>Excerpt</h3>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Brief description for preview cards..."
                            className={styles.excerptInput}
                            rows={3}
                        />
                    </div>

                    <div className={styles.sidebarSection}>
                        <h3>Tags</h3>
                        <div className={styles.tagList}>
                            {tags.map(tag => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => handleToggleTag(tag.id)}
                                    className={`chit ${selectedTags.includes(tag.id) ? styles.tagSelected : styles.tagUnselected}`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                            {tags.length === 0 && (
                                <p className={styles.hint}>No tags yet. Create tags in the admin panel.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPostEditor;
