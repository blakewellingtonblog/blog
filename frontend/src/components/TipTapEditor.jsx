import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import uploadApi from '@shared/axios/uploadApi';
import styles from '../styles/Components/TipTapEditor.module.css';

function MenuBar({ editor }) {
    if (!editor) return null;

    const addImage = useCallback(async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const result = await uploadApi.uploadBlogImage(file, 'content');
                editor.chain().focus().setImage({ src: result.url }).run();
            } catch (err) {
                console.error('Image upload failed:', err);
            }
        };
        input.click();
    }, [editor]);

    const setLink = useCallback(() => {
        const url = window.prompt('Enter URL');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className={styles.toolbar}>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? styles.active : ''}
            >B</button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? styles.active : ''}
            >I</button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? styles.active : ''}
            >U</button>
            <div className={styles.divider} />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
            >H2</button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}
            >H3</button>
            <div className={styles.divider} />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? styles.active : ''}
            >List</button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? styles.active : ''}
            >1. List</button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? styles.active : ''}
            >Quote</button>
            <div className={styles.divider} />
            <button type="button" onClick={setLink}
                className={editor.isActive('link') ? styles.active : ''}
            >Link</button>
            <button type="button" onClick={addImage}>Image</button>
            <div className={styles.divider} />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? styles.active : ''}
            >Code</button>
        </div>
    );
}

function TipTapEditor({ content, onUpdate, placeholder = 'Start writing...' }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({ inline: false, allowBase64: false }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            if (onUpdate) {
                onUpdate({
                    json: editor.getJSON(),
                    html: editor.getHTML(),
                });
            }
        },
    });

    useEffect(() => {
        if (editor && content && !editor.isDestroyed) {
            const current = editor.getJSON();
            const isEmpty = current?.content?.length === 1 &&
                current.content[0]?.content === undefined;
            if (isEmpty) {
                editor.commands.setContent(content);
            }
        }
    }, [editor, content]);

    return (
        <div className={styles.editor}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className={styles.content} />
        </div>
    );
}

export default TipTapEditor;
