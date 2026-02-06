import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import workApi from '@shared/axios/workApi';
import blogApi from '@shared/axios/blogApi';
import uploadApi from '@shared/axios/uploadApi';
import ImageUploader from '../components/ImageUploader';
import TipTapEditor from '../components/TipTapEditor';
import styles from '../styles/Pages/AdminWorkEditor.module.css';

function AdminWorkEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    // Experience details
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState(null);
    const [descriptionHtml, setDescriptionHtml] = useState('');
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [saving, setSaving] = useState(false);

    // Featured posts
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState('');

    // Timeline
    const [timeline, setTimeline] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({
        event_date: '',
        title: '',
        subtitle: '',
        photo_url: '',
    });

    useEffect(() => {
        if (!isNew) {
            loadExperience();
            loadFeaturedPosts();
            loadTimeline();
        }
        loadAllPosts();
    }, [id]);

    const loadExperience = async () => {
        try {
            const experiences = await workApi.fetchAdminExperiences();
            const exp = experiences.find((e) => e.id === id);
            if (exp) {
                setTitle(exp.title);
                setSlug(exp.slug);
                setSubtitle(exp.subtitle || '');
                setDescription(exp.description || null);
                setDescriptionHtml(exp.description_html || '');
                setHeaderImageUrl(exp.header_image_url || '');
                setSortOrder(exp.sort_order || 0);
                setIsActive(exp.is_active);
            }
        } catch {
            toast.error('Failed to load experience');
        }
    };

    const loadFeaturedPosts = async () => {
        try {
            const data = await workApi.fetchFeaturedPosts(id);
            setFeaturedPosts(data);
        } catch {
            /* empty */
        }
    };

    const loadTimeline = async () => {
        try {
            const data = await workApi.fetchTimeline(id);
            setTimeline(data);
        } catch {
            /* empty */
        }
    };

    const loadAllPosts = async () => {
        try {
            const data = await blogApi.fetchAdminPosts();
            setAllPosts(data);
        } catch {
            /* empty */
        }
    };

    // Auto-generate slug from title
    const handleTitleChange = (val) => {
        setTitle(val);
        if (isNew) {
            setSlug(
                val
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
            );
        }
    };

    const handleImageUpload = async (file) => {
        try {
            const data = await uploadApi.uploadWorkImage(file);
            setHeaderImageUrl(data.url);
            toast.success('Image uploaded');
        } catch {
            toast.error('Upload failed');
        }
    };

    // Save experience
    const handleSave = async () => {
        if (!title || !slug) {
            toast.error('Title and slug are required');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                title,
                slug,
                subtitle: subtitle || null,
                description: description || { type: 'doc', content: [] },
                description_html: descriptionHtml,
                header_image_url: headerImageUrl || null,
                sort_order: sortOrder,
                is_active: isActive,
            };
            if (isNew) {
                const created = await workApi.createExperience(payload);
                toast.success('Experience created');
                navigate(`/admin/work/${created.id}`);
            } else {
                await workApi.updateExperience(id, payload);
                toast.success('Experience saved');
            }
        } catch {
            toast.error('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    // Featured posts management
    const handleAddFeatured = async () => {
        if (!selectedPostId) return;
        const already = featuredPosts.some((p) => p.id === selectedPostId);
        if (already) {
            toast.error('Post already featured');
            return;
        }
        const newList = [
            ...featuredPosts.map((p, i) => ({
                post_id: p.id,
                sort_order: i,
            })),
            { post_id: selectedPostId, sort_order: featuredPosts.length },
        ];
        try {
            await workApi.updateFeaturedPosts(id, newList);
            await loadFeaturedPosts();
            setSelectedPostId('');
            toast.success('Post featured');
        } catch {
            toast.error('Failed to add featured post');
        }
    };

    const handleRemoveFeatured = async (postId) => {
        const newList = featuredPosts
            .filter((p) => p.id !== postId)
            .map((p, i) => ({ post_id: p.id, sort_order: i }));
        try {
            await workApi.updateFeaturedPosts(id, newList);
            await loadFeaturedPosts();
            toast.success('Post removed');
        } catch {
            toast.error('Failed to remove post');
        }
    };

    // Timeline management
    const resetEventForm = () => {
        setEditingEvent(null);
        setEventForm({ event_date: '', title: '', subtitle: '', photo_url: '' });
    };

    const handleEventImageUpload = async (file) => {
        try {
            const data = await uploadApi.uploadWorkImage(file);
            setEventForm((prev) => ({ ...prev, photo_url: data.url }));
            toast.success('Photo uploaded');
        } catch {
            toast.error('Upload failed');
        }
    };

    const handleSaveEvent = async () => {
        if (!eventForm.event_date || !eventForm.title) {
            toast.error('Date and title are required');
            return;
        }
        try {
            if (editingEvent) {
                await workApi.updateTimelineEvent(editingEvent, {
                    event_date: eventForm.event_date,
                    title: eventForm.title,
                    subtitle: eventForm.subtitle || null,
                    photo_url: eventForm.photo_url || null,
                });
                toast.success('Event updated');
            } else {
                await workApi.createTimelineEvent(id, {
                    event_date: eventForm.event_date,
                    title: eventForm.title,
                    subtitle: eventForm.subtitle || null,
                    photo_url: eventForm.photo_url || null,
                });
                toast.success('Event added');
            }
            resetEventForm();
            await loadTimeline();
        } catch {
            toast.error('Failed to save event');
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event.id);
        setEventForm({
            event_date: event.event_date,
            title: event.title,
            subtitle: event.subtitle || '',
            photo_url: event.photo_url || '',
        });
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm('Delete this timeline event?')) return;
        try {
            await workApi.deleteTimelineEvent(eventId);
            await loadTimeline();
            toast.success('Event deleted');
        } catch {
            toast.error('Failed to delete event');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>{isNew ? 'New Experience' : 'Edit Experience'}</h1>
            </div>

            {/* Section 1: Experience Details */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Details</h2>
                <div className={styles.formGrid}>
                    <label className={styles.field}>
                        <span>Title</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Slug</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.field}>
                        <span>Subtitle</span>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className={styles.input}
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
                <div className={styles.field}>
                    <span>Description</span>
                    <TipTapEditor
                        content={description}
                        onUpdate={({ json, html }) => {
                            setDescription(json);
                            setDescriptionHtml(html);
                        }}
                        placeholder="Write about this experience..."
                    />
                </div>
                <div className={styles.field}>
                    <span>Header Image</span>
                    <ImageUploader
                        onUpload={handleImageUpload}
                        currentUrl={headerImageUrl}
                        label="Upload header image"
                    />
                </div>
                <button onClick={handleSave} className="button" disabled={saving}>
                    {saving ? 'Saving...' : isNew ? 'Create Experience' : 'Save Changes'}
                </button>
            </div>

            {/* Section 2 & 3: Only show after experience is created */}
            {!isNew && (
                <>
                    {/* Section 2: Featured Posts */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Featured Posts</h2>
                        {featuredPosts.length > 0 && (
                            <div className={styles.featuredList}>
                                {featuredPosts.map((post) => (
                                    <div key={post.id} className={styles.featuredItem}>
                                        <span className={styles.featuredTitle}>{post.title}</span>
                                        <button
                                            onClick={() => handleRemoveFeatured(post.id)}
                                            className={styles.removeBtn}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.addFeatured}>
                            <select
                                value={selectedPostId}
                                onChange={(e) => setSelectedPostId(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Select a post...</option>
                                {allPosts
                                    .filter((p) => p.status === 'published')
                                    .map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.title}
                                        </option>
                                    ))}
                            </select>
                            <button onClick={handleAddFeatured} className="button">
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Section 3: Timeline */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Timeline</h2>
                        {timeline.length > 0 && (
                            <div className={styles.timelineList}>
                                {timeline.map((event) => (
                                    <div key={event.id} className={styles.timelineItem}>
                                        <div className={styles.timelineItemInfo}>
                                            <span className={styles.timelineDate}>
                                                {event.event_date}
                                            </span>
                                            <span className={styles.timelineTitle}>
                                                {event.title}
                                            </span>
                                            {event.subtitle && (
                                                <span className={styles.timelineSub}>
                                                    {event.subtitle}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.timelineItemActions}>
                                            {event.photo_url && (
                                                <img
                                                    src={event.photo_url}
                                                    alt=""
                                                    className={styles.timelineThumb}
                                                />
                                            )}
                                            <button
                                                onClick={() => handleEditEvent(event)}
                                                className="button-outline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(event.id)}
                                                className={styles.deleteBtn}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={styles.eventForm}>
                            <h3>
                                {editingEvent ? 'Edit Event' : 'Add Event'}
                            </h3>
                            <div className={styles.eventFormGrid}>
                                <label className={styles.field}>
                                    <span>Date</span>
                                    <input
                                        type="date"
                                        value={eventForm.event_date}
                                        onChange={(e) =>
                                            setEventForm((prev) => ({
                                                ...prev,
                                                event_date: e.target.value,
                                            }))
                                        }
                                        className={styles.input}
                                    />
                                </label>
                                <label className={styles.field}>
                                    <span>Title</span>
                                    <input
                                        type="text"
                                        value={eventForm.title}
                                        onChange={(e) =>
                                            setEventForm((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                        className={styles.input}
                                    />
                                </label>
                            </div>
                            <label className={styles.field}>
                                <span>Subtitle</span>
                                <input
                                    type="text"
                                    value={eventForm.subtitle}
                                    onChange={(e) =>
                                        setEventForm((prev) => ({
                                            ...prev,
                                            subtitle: e.target.value,
                                        }))
                                    }
                                    className={styles.input}
                                />
                            </label>
                            <div className={styles.field}>
                                <span>Photo (optional)</span>
                                <ImageUploader
                                    onUpload={handleEventImageUpload}
                                    currentUrl={eventForm.photo_url}
                                    label="Upload event photo"
                                />
                            </div>
                            <div className={styles.eventFormActions}>
                                <button onClick={handleSaveEvent} className="button">
                                    {editingEvent ? 'Update Event' : 'Add Event'}
                                </button>
                                {editingEvent && (
                                    <button onClick={resetEventForm} className="button-outline">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminWorkEditor;
