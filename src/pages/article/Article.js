import React from 'react';
import Nav from 'components/nav/Nav';

const Article = ({ article }) => {
    return (
        <>
            <header className="App-header">
                <Nav />
            </header>
            <main>
                <section>
                    <h1 className="title">글 제목123</h1>
                    <section className="article-header">
                        <span className="writer"></span>
                        <span className="createdAt"></span>
                        <section className="readingTime">
                            <span className="time">5</span>
                            <span className="unit">m</span>
                        </section>
                    </section>
                    <section className="article-body">
                        <p className="content"></p>
                    </section>
                </section>
                <section>
                    <section className="comment"></section>
                </section>
                <section>
                    <section className="comment-form"></section>
                </section>

                <section className="relatedArticles"></section>
            </main>
            <aside>
                <section className="controllPanel"></section>
                <section className="articleIndex"></section>
            </aside>
            <footer></footer>
        </>
    );
}

export default Article;