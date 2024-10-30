import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from 'pages/main/Main'
import ArticlePage from 'pages/article/ArticlePage';
import { CategoryPage } from 'pages/category/CategoryPage';
import { TagPage } from 'pages/tag/TagPage';
import { ArticleListPage } from 'pages/article/ArticleListPage';
// util
import ScrollToTop from './ScrollToTop';


const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public pages */}
                <Route path="/" element={<Main />} />
                <Route path="/article">
                    <Route index element={<ArticleListPage />} />
                    {/* <Route path="popular" element={<ArticleListPage />} /> */}
                    {/* <Route path="pinned" element={<ArticleListPage />} /> */}
                    <Route path=":slug" element={<ArticlePage />} />
                </Route>
                <Route path="/category">
                    <Route index element={<CategoryPage />} />
                    <Route path=":slug" element={<CategoryPage />} />
                </Route>
                <Route path="/tag">
                    <Route index element={<TagPage />} />
                    <Route path=":slug" element={<TagPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
