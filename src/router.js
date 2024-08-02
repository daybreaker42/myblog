import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main/Main'
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import Category from './pages/Category/Category';
import Tags from './pages/Tags/Tags';
import Settings from './pages/Settings/Settings';

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
