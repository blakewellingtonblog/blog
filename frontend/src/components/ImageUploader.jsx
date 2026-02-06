import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from '../styles/Components/ImageUploader.module.css';

function ImageUploader({ onUpload, accept = { 'image/*': [] }, label = 'Upload Image', currentUrl = null }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0 && onUpload) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
    });

    return (
        <div className={styles.wrapper}>
            {currentUrl && (
                <div className={styles.preview}>
                    <img src={currentUrl} alt="Preview" />
                </div>
            )}
            <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dragging : ''}`}>
                <input {...getInputProps()} />
                <p>{isDragActive ? 'Drop file here...' : label}</p>
                <span className={styles.hint}>Click or drag and drop</span>
            </div>
        </div>
    );
}

export default ImageUploader;
