import { Link, NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import SearchBar from '../searchBar/SearchBar';

import styles from './Nav.module.css';

/**
 * navItems
 * @type {Array<Object>}
 * @property {string} name - 버튼에 표시되는 이름
 * @property {string} path - 이동하는 path
 * @returns {Array<Object>}
 */
const navItems = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Category',
        path: '/category',
    },
    {
        name: 'Tags',
        path: '/tags',
    },
    {
        name: 'About',
        path: '/about',
    }
];

function Nav() {
    // useLocator로 현재 페이지를 가져와서 active 클래스를 추가해준다.
    const location = useLocation(); // 현재 페이지 경로를 가져옴
    const path = location.pathname; // 현재 페이지 경로를 가져옴
    console.log(`location - `, location);
    console.log(`location - `, location.pathname);


    return <nav className={styles.nav}>
        <div className={styles['nav-center']}>
            {navItems.map((item, index) => (
                <NavLink key={`nav-${index}`} to={item.path} className={styles.navlink} activeclassname={styles.active} ><span>{item.name}</span></NavLink>
            ))}
        </div>

        <div className={styles['nav-right']}>
            <Link to='/profile' className={styles.navlink} ><div><Account /></div></Link>
            <Link to='/settings' className={styles.navlink} ><div><Settings /></div></Link>
        </div>
    </nav >;
}


export default Nav;