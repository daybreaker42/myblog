import React, { useState, useEffect } from 'react';

// component imports
import Nav from '../../components/nav/Nav';
import CategoryAside from '../../components/categoryAside/CategoryAside';
import Filter from './Filter';
import Social from './Social';
import Article from '../../components/article/Article';

// css imports
import './Main.css';
import PageButtons from '../../components/pageButton/PageButtons';

// TODO - 반응형 추가
function Main() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    useEffect(() => {
        console.log(`main page loaded`);
        // fetch data from api
        setPosts([
            {
                id: 1,
                title: '이 제목은 너무 길어서 화면에 전부 담지 못합니다. 이 제목은 너무 길어서 화면에 전부 담지 못합니다. 이 제목은 너무 길어서 화면에 전부 담지 못합니다.',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 2,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 3,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 4,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 5,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 6,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 7,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 8,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 9,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
            },
            {
                id: 10,
                title: 'First Post',
                articleInfo: {
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
                articledata: {
                    viewCnt: 1,
                    commentCnt: 100,
                },
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
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <h1 className='title'>siejwkaodj's blog</h1>
                <section className='main-body'>
                    <Filter />
                    <section className='main-middle'>
                        <CategoryAside />
                        <section className='main-content'>
                            {posts.map((item, index) => (
                                <Article key={`article-${item.id || index}`} article={item} />
                            ))}
                        </section>
                        <Social />
                    </section>
                </section>
                <PageButtons currentPage={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default Main;