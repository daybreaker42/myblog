import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// component imports
import Nav from 'components/nav/Nav';
import PageButtons from 'components/pagenation/Pagenation';
import Footer from 'components/footer/Footer';
import ArticlePinned from './components/article/pinned/ArticlePinned';
import Article from './components/article/Article';

// css imports
import styles from './Main.module.css';
import config from '../../config';
import Aside from './components/aside/Aside';

// TODO - 반응형 추가
function Main() {
    const [posts, setPosts] = useState([]);
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
        <>
            {/* helmet */}
            <Helmet>
                <title>Home | {`${config.appName}`}</title>
                <meta name='description' content='Home page' />
            </Helmet>
            {/* aside, main */}
            <div className={styles['main-root']}>
                <Aside />
                <main className={styles['main-main']}>
                    <Nav />
                    <section className={styles.title}>
                        <h1>한성준의 블로그</h1>
                        <p>결과보다는 과정을, 속도보다는 방향을, 무엇보다 꾸준함을.</p>
                    </section>
                    <section className={styles['main-body']}>
                        {/* pinned articles */}
                        <ArticlePinned article={posts[0]} />

                        {/* article - page 1 contents */}
                        <Article />
                    </section>
                </main>
            </div>
            {/* footer */}
            <Footer />
        </>
    );
}

export default Main;