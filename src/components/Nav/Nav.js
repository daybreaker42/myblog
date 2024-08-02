import { Link } from 'react-router-dom';
import './Nav.css';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import SearchBar from '../searchBar/SearchBar';

function Nav() {
    return <nav className="nav">
        <div className='nav-center'>
            <Link to='/' className='navlink'><span>Home</span></Link>
            <Link to='/category' className='navlink'><span>Category</span></Link>
            <Link to='/tags' className='navlink'><span>Tags</span></Link>
            <Link to='/about' className='navlink'><span>About</span></Link>
            <SearchBar />
        </div>

        <div className='nav-right'>
            <Link to='/profile' className='navlink'><div><Account /></div></Link>
            <Link to='/settings' className='navlink'><div><Settings /></div></Link>
        </div>
    </nav >;
}


export default Nav;