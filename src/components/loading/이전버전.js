import React, { useState, useEffect } from 'react';
import styles from './ImageLoader.module.css';  // CSS 모듈 임포트 가정

/**
 * 현재버전과의 차이점 (구버전 기준)
 * 1. 이미지 로딩 완료시 transition이 부드러움
 * 2. lazyloading 없음
 * 3. error handle 없음
 * 4. 사용자 정의 indicator 넣는 기능 없음
 */

const ImageLoader = ({ src, alt, width, height }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setIsLoaded(true);
        };
        img.src = src;
    }, [src]);

    return (
        <div className={styles.imageContainer} style={{ width, height, maxWidth: '18.75rem' }}>
            <div className={`${styles.loadingOverlay} ${isLoaded ? styles.hidden : ''}`}>
                <ImageLoading />
            </div>
            <img
                src={src}
                alt={alt}
                className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
            />
        </div>
    );
};

const ImageLoading = () => {
    return (
        <div className={styles.loadingContainer}>
            <svg className={styles.loadingIcon} viewBox="0 0 24 24">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        </div>
    );
};

export default ImageLoader;