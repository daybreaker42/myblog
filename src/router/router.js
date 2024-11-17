import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// pages
import Main from 'page/main/Main'
// utils
import ScrollToTop from './ScrollToTop';
import ArticleDetail from 'page/articles/ArticleDetail';
import Category from 'page/category/Category';
import CategorySearchLayout from 'page/category/CategorySearchLayout';
import About from 'page/about/About';
import Tag from 'page/tag/Tag';
import AdminMain from 'page/admin/AdminMain';

export const PATH = {
    HOME: '/',
    ARTICLE: '/article',
    CATEGORY: '/category',
    TAG: '/tag',
    ABOUT: '/about',
    ADMIN: '/admin',
    NOT_FOUND: '*',
};

const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public pages */}
                <Route path={PATH.HOME} element={<Main />} />
                <Route path={PATH.ARTICLE} element={<Navigate to={PATH.HOME} replace />} /> {/* redirect to home */}
                <Route path={PATH.ARTICLE}>
                    <Route path=":slug" element={<ArticleDetail />} />
                </Route>

                <Route path={PATH.CATEGORY}>
                    <Route index element={<Category />} />
                    <Route path=":slug" element={<CategorySearchLayout />} />
                </Route>
                <Route path={PATH.TAG}>
                    <Route index element={<Tag />} />
                    <Route path=":slug" element={<CategorySearchLayout />} />
                </Route>
                <Route path={PATH.ABOUT} element={<About />} />

                {/* admin pages */}
                <Route path={PATH.ADMIN} element={<AdminMain to={PATH.ADMIN} />} />
                <Route path={PATH.NOT_FOUND} element={<div className='grid place-items-center text-white min-h-screen'>404 Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
