import { Link } from 'react-router-dom';
import './Nav.css';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import SearchBar from '../SearchBar/SearchBar';

function Nav() {
    return <nav className="nav">
        <div className='nav-center'>
            <Link to='/' className='navlink'>Home</Link>
            <Link to='/category' className='navlink'>Category</Link>
            <Link to='/tags' className='navlink'>Tags</Link>
            <Link to='/about' className='navlink'>About</Link>
            <SearchBar />
        </div>

        <div className='nav-right'>
            <Link to='/profile' className='navlink'><div><Account /></div></Link>
            <Link to='/settings' className='navlink'><div><Settings /></div></Link>
        </div>
    </nav >;
}


export default Nav;