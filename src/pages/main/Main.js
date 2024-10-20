import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// component imports
import Nav from 'components/nav/Nav';
import PageButtons from 'components/pagenation/Pagenation';
import Footer from 'components/footer/Footer';
import ArticlePinned from './components/article/pinned/ArticlePinnedArea';
import PopularArticles from './components/article/popular/PopularArticles';
import ArticleSection from './components/article/ArticleSection';

// css imports
import styles from './Main.module.css';
import config from 'config';
import Aside from './components/aside/Aside';

// TODO - 반응형 추가
function Main() {
    return (
        <>
            {/* helmet */}
            <Helmet>
                <title>Home | {`${config.appName}`}</title>
                <meta name='description' content='Home page' />
            </Helmet>
            {/* aside, main */}
            <div className={styles['root']}>
                <Aside />
                <main className={styles['main']}>
                    <header className="App-header">
                        <Nav />
                    </header>
                    <section className={styles.title}>
                        <h1>한성준의 블로그</h1>
                        <p>결과보다는 과정을, 속도보다는 방향을, 무엇보다 꾸준함을.</p>
                    </section>
                    <section className={styles['main-body']}>
                        {/* pinned articles */}
                        <ArticlePinned />
                        {/* Popular articles */}
                        <PopularArticles />
                        {/* article - page 1 contents */}
                        <ArticleSection />
                    </section>
                </main>
            </div>
            {/* footer */}
            <Footer />
        </>
    );
}

export default Main;