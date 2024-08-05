import { NavLink } from 'react-router-dom';
import './Nav.css';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import SearchBar from '../searchBar/SearchBar';

function Nav() {
    return <nav className="nav">
        <div className='nav-center'>
            <NavLink to='/' className='navlink' activeClassName="active"><span>Home</span></NavLink>
            <NavLink to='/category' className='navlink' activeClassName="active"><span>Category</span></NavLink>
            <NavLink to='/tags' className='navlink' activeClassName="active"><span>Tags</span></NavLink>
            <NavLink to='/about' className='navlink' activeClassName="active"><span>About</span></NavLink>
            <SearchBar />
        </div>

        <div className='nav-right'>
            <NavLink to='/profile' className='navlink' activeClassName="active"><div><Account /></div></NavLink>
            <NavLink to='/settings' className='navlink' activeClassName="active"><div><Settings /></div></NavLink>
        </div>
    </nav >;
}


export default Nav;