import React, { useState, useEffect } from 'react';
import styles from './Article.module.css';

import ArticleCard from 'components/article/ArticleCard';
import Pagination from 'components/pagenation/Pagenation';
import Filter from 'components/filter/Filter';

const sectionData = {
    name: 'section',
    articles: [
        {
            id: 1,
            slug: 'slug2',
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 2,
            slug: 'slug2',
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 3,
            slug: 'slug3',
            title: '제목3',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ],

};

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [type, setType] = useState('recent'); // recent, popular, filter
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const headerTypes = [
        {
            name: 'Recent',
            type: 'recent',
            content: () => 'Recent',
        },
        {
            name: 'Popular',
            type: 'popular',
            content: () => 'Popular',
        },
        {
            name: 'Filter',
            type: 'filter',
            content: () => (
                <Filter />
            ),
        }
    ];



    useEffect(() => {
        const fetchArticles = async () => {
            // const data = await getArticlesByCategory(type, page);
            const data = sectionData.articles;
            setArticles(data);
            setTotalPages(100);

        }

        fetchArticles();
    }, []);

    return (
        <section className={styles['article-container']}>
            <header className={styles.header}>
                {headerTypes.map((headerType, index) => (
                    <span
                        key={`header-${index}`}
                        className={type === headerType.type ? styles.selected : ''}
                        onClick={() => setType(headerType.type)}
                    >
                        {headerType.content()}
                    </span>
                ))}
            </header>
            <ul className={styles['article-list']}>
                {articles.map((article, index) => (
                    <ArticleCard key={`article-${index}`} article={article} />
                ))}
            </ul>
            <Pagination currentPage={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
        </section>
    );
}

export default Article;