import React from 'react';
import styles from './ArticlePinned.module.css';
import { Link, useNavigate } from 'react-router-dom';

// svg imports
import { ReactComponent as ArrowRight } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as Pinned } from 'assets/icons/pin.svg';

const mockupData = {
    success: true,
    length: 4,
    data: [
        {
            id: 1,
            title: '이것은 100자 내외의 제목입니다. 이 제목은 예시로 작성된 것이며, 실제 제목은 상황에 맞게 변경될 수 있습니다.',
            createdAt: '2024-10-11',
        },
        {
            id: 2,
            title: '제목2',
            createdAt: '2024-10-11',
        },
        {
            id: 3,
            title: '제목3',
            createdAt: '2024-10-11',
        },
    ]
}

const ArticlePinnedArea = () => {
    const navigation = useNavigate();
    return (
        <section className={styles.pinned__area}>
            <header className={styles.pinned__area__title}>
                <h1 className={styles.pin}><Pinned />Pinned</h1>
                <span className={`${styles.more} clickable`} onClick={() => {
                    navigation('/pinned');
                }}>더보기<ArrowRight /></span>
            </header>
            <ul className={styles.pinned__area__content}>
                {mockupData.data.map((article, index) => {
                    return (
                        <ArticlePinned key={`article-pinned-${index}`} article={article} />
                    );
                })}
            </ul>
        </section>
    );
}

const ArticlePinned = ({ article }) => {
    return (
        <Link className={styles.pinned}>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.info}>{article.createdAt}</p>
        </Link>
    );
}

export default ArticlePinnedArea;