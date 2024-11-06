import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages
import Main from 'page/main/Main'
// utils
import ScrollToTop from './ScrollToTop';
import Article from 'page/articles/Article';
import ArticleDetail from 'page/articles/ArticleDetail';
import Category from 'page/category/Category';
import CategorySearchLayout from 'page/category/CategorySearchLayout';
import About from 'page/about/About';
import Tag from 'page/tag/Tag';


const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public pages */}
                <Route path="/" element={<Main />} />
                <Route path="article">
                    <Route index element={<Article />} />
                    <Route path=":slug" element={<ArticleDetail />} />
                </Route>

                <Route path="/category">
                    <Route index element={<Category />} />
                    <Route path=":slug" element={<CategorySearchLayout />} />
                </Route>
                <Route path="/tag">
                    <Route index element={<Tag />} />
                    <Route path=":slug" element={<CategorySearchLayout />} />
                </Route>
                <Route path='/about' element={<About />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
