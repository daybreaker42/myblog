import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// component imports
import Nav from 'components/nav/Nav';
import CategoryAside from 'components/categoryAside/CategoryAside';
import Filter from 'components/filter/Filter';
import Social from './components/Social';
import ArticleCard from 'components/article/ArticleCard';
import PageButtons from 'components/pageButton/PageButtons';
import Footer from 'components/footer/Footer';

// css imports
import styles from './Main.module.css';
import config from '../../config';

// TODO - 반응형 추가
function Main() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    useEffect(() => {
        // console.log(`main page loaded`);
        // fetch data from api
        setPosts([
            {
                id: 1,
                title: '이 제목은 너무 길어서 화면에 전부 담지 못합니다. 이 제목은 너무 길어서 화면에 전부 담지 못합니다. 이 제목은 너무 길어서 화면에 전부 담지 못합니다.',
                content: '내용 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다. 이 내용은 너무 길어서 화면에 전부 담지 못합니다.',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 2,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 3,
                title: `post title 2`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 4,
                title: `post title 3`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 5,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 6,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 7,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 8,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 9,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 10,
                title: `post title 1`,
                content: '내용',
                info: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                    createdAt: '2021-01-01',
                    readingTime: {
                        value: 5,
                        unit: 'm',
                    },
                },
                data: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
                category: 'category-1',
                tags: ['tag-1', 'tag-2', 'tag-3'],
            },
        ]);
        // TODO - 백엔드 구현 후 다시 작성

        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setPosts(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

    }, []);

    return (
        <div>
            <Helmet>
                <title>Home | {`${config.appName}`}</title>
                <meta name='description' content='Home page' />
            </Helmet>

            <header className={styles["App-header"]}>
                <Nav />
            </header>

            <main className={styles['main-main']}>
                <h1 className={styles.title}>siejwkaodj's blog</h1>
                <section className={styles['main-body']}>
                    <Filter />
                    <section className={styles['main-middle']}>
                        <CategoryAside />
                        <section className={styles['main-content']}>
                            {posts.map((item, index) => (
                                <ArticleCard key={`article-${item.id || index}`} article={item} />
                            ))}
                        </section>
                        <Social />
                    </section>
                </section>
                <PageButtons currentPage={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
            </main>
            <Footer />
        </div>
    );
}

export default Main;