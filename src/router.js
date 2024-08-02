import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main/Main'
import Profile from './pages/profile/Profile';
import About from './pages/about/About';
import Category from './pages/category/Category';
import Tags from './pages/tags/Tags';
import Settings from './pages/settings/Settings';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path='/category' element={<Category />} />
                <Route path='/tags' element={<Tags />} />
                <Route path='/about' element={<About />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
