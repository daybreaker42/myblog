import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from 'pages/main/Main'
import ArticlePage from 'pages/article/ArticlePage';
import ScrollToTop from './ScrollToTop';


const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public pages */}
                <Route path="/" element={<Main />} />
                <Route path="/article">
                    <Route index element={<ArticlePage />} />
                    {/* <Route path="popular" element={<ArticleList />} /> */}
                    {/* <Route path="pinned" element={<ArticleList />} /> */}
                    <Route path=":slug" element={<ArticlePage />} />
                </Route>


            </Routes>
        </BrowserRouter>
    );
};

export default Router;
