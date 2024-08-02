import React, { useEffect } from 'react';

// component imports
import Nav from '../../components/nav/Nav';
import CategoryAside from '../../components/categoryAside/CategoryAside';
import Filter from './Filter';
import Social from './Social';
import Article from '../../components/article/Article';

// css imports
import './Main.css';

function Main() {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => {
        console.log(`main page loaded`);
        // fetch data from api
        setPosts([
            {
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
                            {posts.map((item) => (
                                <Article key={item.id} articleInstance={item} />
                            ))}
                        </section>
                        <Social />
                    </section>


                </section>

            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default Main;