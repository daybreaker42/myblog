import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from 'pages/main/Main'
import Profile from 'pages/profile/Profile';
import About from 'pages/about/About';
import CategoryPage from 'pages/categorypage/CategoryPage';
import Tags from 'pages/tagspage/TagsPage';
import TagArticleList from 'pages/tagspage/TagArticleList';
import Settings from 'pages/settings/Settings';
import ArticlePage from 'pages/article/ArticlePage';
import Test from 'pages/test/Test';

import Loading from 'components/loading/loading/Loading';

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
                <Route path='/tags'>
                    <Route index element={<Tags />} />
                    <Route path=':tag' element={<TagArticleList />} />
                </Route>
                <Route path='/about' element={<About />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/settings' element={<Settings />} />
                <Route path="/article">
                    <Route index element={<ArticlePage />} />
                    <Route path="popular" element={<ArticleList />} />
                    <Route path="pinned" element={<ArticleList />} />
                    <Route path=":slug" element={<ArticlePage />} />
                </Route>

                {/* FIXME NOTE - 맨 밑 빼고 여기는 개발 테스트용임 나중에 지우기  */}
                <Route path='/test' element={<Test />} />
                <Route path='/loading' element={<Loading />} />

                <Route path='*' element={<Error typeNum={404} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
