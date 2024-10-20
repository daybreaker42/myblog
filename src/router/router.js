import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from 'pages/main/Main'
import Profile from 'pages/profile/Profile';
import About from 'pages/about/About';
import CategoryPage from 'pages/categorypage/CategoryPage';
import Tags from 'pages/tags/Tags';
import Settings from 'pages/settings/Settings';
import ArticlePage from 'pages/article/ArticlePage';
import Test from 'pages/test/Test';

// error pages
import Error from 'pages/errors/Error';
import ScrollToTop from './ScrollToTop';
import ArticleList from 'pages/article/list/ArticleList';


const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/category' element={<CategoryPage />} />
                <Route path='/tags' element={<Tags />} />
                <Route path='/about' element={<About />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/settings' element={<Settings />} />
                <Route path="/article">
                    <Route index element={<ArticlePage />} />
                    <Route path="popular" element={<ArticleList />} />
                    <Route path="pinned" element={<ArticleList />} />
                    <Route path=":slug" element={<ArticlePage />} />
                </Route>
                <Route path='/test' element={<Test />} />
                {/* <Route path='*' element={<Error404 />} /> */}
                <Route path='*' element={<Error typeNum={404} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
