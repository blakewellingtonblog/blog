import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSettings } from '@shared/redux/slices/settingsSlice';
import styles from '../styles/Pages/AdminSettingsEditor.module.css';

function AdminSettingsEditor() {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings.data);
    const [form, setForm] = useState({
        hero_tagline: '',
        about_text: '',
        athletics_intro: '',
        athletics_philosophy: '',
        contact_email: '',
        social_instagram: '',
        social_linkedin: '',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            setForm({
                hero_tagline: settings.hero_tagline || '',
                about_text: settings.about_text || '',
                athletics_intro: settings.athletics_intro || '',
                athletics_philosophy: settings.athletics_philosophy || '',
                contact_email: settings.contact_email || '',
                social_instagram: settings.social_instagram || '',
                social_linkedin: settings.social_linkedin || '',
            });
        }
    }, [settings]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await dispatch(updateSettings(form)).unwrap();
            setSaved(true);
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Site Settings</h1>
                <button onClick={handleSave} className="button" disabled={saving}>
                    {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
                </button>
            </div>

            <div className={styles.sections}>
                <div className={styles.section}>
                    <h2>General</h2>
                    <label className={styles.label}>Hero Tagline</label>
                    <input
                        type="text"
                        value={form.hero_tagline}
                        onChange={(e) => handleChange('hero_tagline', e.target.value)}
                        className={styles.input}
                    />
                    <label className={styles.label}>Contact Email</label>
                    <input
                        type="email"
                        value={form.contact_email}
                        onChange={(e) => handleChange('contact_email', e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.section}>
                    <h2>Social Links</h2>
                    <label className={styles.label}>Instagram URL</label>
                    <input
                        type="url"
                        value={form.social_instagram}
                        onChange={(e) => handleChange('social_instagram', e.target.value)}
                        className={styles.input}
                        placeholder="https://instagram.com/..."
                    />
                    <label className={styles.label}>LinkedIn URL</label>
                    <input
                        type="url"
                        value={form.social_linkedin}
                        onChange={(e) => handleChange('social_linkedin', e.target.value)}
                        className={styles.input}
                        placeholder="https://linkedin.com/in/..."
                    />
                </div>

                <div className={styles.section}>
                    <h2>About</h2>
                    <label className={styles.label}>About Text</label>
                    <textarea
                        value={form.about_text}
                        onChange={(e) => handleChange('about_text', e.target.value)}
                        className={styles.textarea}
                        rows={6}
                    />
                </div>

                <div className={styles.section}>
                    <h2>10k Athletics</h2>
                    <label className={styles.label}>Athletics Intro</label>
                    <textarea
                        value={form.athletics_intro}
                        onChange={(e) => handleChange('athletics_intro', e.target.value)}
                        className={styles.textarea}
                        rows={3}
                    />
                    <label className={styles.label}>Athletics Philosophy</label>
                    <textarea
                        value={form.athletics_philosophy}
                        onChange={(e) => handleChange('athletics_philosophy', e.target.value)}
                        className={styles.textarea}
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminSettingsEditor;
