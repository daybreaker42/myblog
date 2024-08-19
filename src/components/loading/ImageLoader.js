import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageLoader.module.css';  // CSS 모듈 임포트 가정

const ImageLoader = ({
    src,
    alt,
    width,
    height,
    loadingIndicator: LoadingIndicator,
    errorIndicator: ErrorIndicator,
    lazy = true
}) => {
    const [status, setStatus] = useState(lazy ? 'idle' : 'loading');
    const imageRef = useRef(null);

    useEffect(() => {
        let observer;
        let didCancel = false;

        if (lazy) {
            observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && status === 'idle' && !didCancel) {
                            setStatus('loading');
                        }
                    });
                },
                {
                    rootMargin: '200px',
                }
            );

            if (imageRef.current) {
                observer.observe(imageRef.current);
            }
        }

        return () => {
            didCancel = true;
            if (lazy && observer && imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [lazy, status]);

    useEffect(() => {
        if (status !== 'loading') return;

        const image = new Image();
        image.src = src;
        image.onload = () => setStatus('loaded');
        image.onerror = () => setStatus('error');

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [src, status]);

    return (
        <div
            ref={imageRef}
            className={styles.imageContainer}
            style={{ width, height, maxWidth: '18.75rem' }}
        >
            {status === 'loading' && (
                <div className={styles.loadingOverlay}>
                    {LoadingIndicator ? <LoadingIndicator /> : <DefaultLoadingIndicator />}
                </div>
            )}
            {status === 'error' && (
                <div className={styles.errorOverlay}>
                    {ErrorIndicator ? <ErrorIndicator /> : <DefaultErrorIndicator />}
                </div>
            )}
            {status === 'loaded' && (
                <img
                    src={src}
                    alt={alt}
                    className={styles.image}
                />
            )}
        </div>
    );
};

const DefaultLoadingIndicator = () => (
    <div className={styles.loadingContainer}>
        <svg className={styles.loadingIcon} viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
    </div>
);

const DefaultErrorIndicator = () => (
    <div className={styles.errorContainer}>
        <p>Failed to load image</p>
    </div>
);

export default ImageLoader;