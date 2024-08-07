import { NavLink } from 'react-router-dom';
import './Nav.css';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import SearchBar from '../searchBar/SearchBar';

function Nav() {
    return <nav className="nav">
        <div className='nav-center'>
            <NavLink to='/' className='navlink' activeclassname="active"><span>Home</span></NavLink>
            <NavLink to='/category' className='navlink' activeclassname="active"><span>Category</span></NavLink>
            <NavLink to='/tags' className='navlink' activeclassname="active"><span>Tags</span></NavLink>
            <NavLink to='/about' className='navlink' activeclassname="active"><span>About</span></NavLink>
            <SearchBar />
        </div>

        <div className='nav-right'>
            <NavLink to='/profile' className='navlink' activeclassname="active"><div><Account /></div></NavLink>
            <NavLink to='/settings' className='navlink' activeclassname="active"><div><Settings /></div></NavLink>
        </div>
    </nav >;
}


export default Nav;