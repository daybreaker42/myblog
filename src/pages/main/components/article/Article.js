import React, { useState, useEffect } from 'react';
import styles from './Article.module.css';

import ArticleCard from 'components/article/ArticleCard';
import Pagination from 'components/pageButton/PageButtons';
import Filter from 'components/filter/Filter';

const sectionData = {
    name: 'section',
    articles: [
        {
            id: 1,
            slug: 'slug1',
            title: '제목1',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10
        },
        {
            id: 2,
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
            viewCnt: 10
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
            viewCnt: 10
        },
    ],

};

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [type, setType] = useState('recent'); // recent, popular, filter

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
            setPageInfo({
                page: 1,
                totalPage: 10,
                totalCnt: 100
            });
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
                {/* <span className={type === 'recent' ? styles.selected : ''} onClick={() => { setType('recent') }}>Recent</span>
                <span className={type === 'popular' ? styles.selected : ''} onClick={() => { setType('popular') }}>Popular</span>
                <span className={type === 'filter' ? styles.selected : ''} onClick={() => { setType('filter') }}>필터<Filter /></span> */}
            </header>
            <ul className={styles['article-list']}>
                {/* {articles.map((article, index) => (
                    <ArticleCard key={`article-${index}`} article={article} />
                ))} */}
            </ul>
            <Pagination pageInfo={pageInfo} />
        </section>
    );
}

export default Article;