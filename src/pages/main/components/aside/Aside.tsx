import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Aside.module.css';
import CategoryAside from '../categoryAside/CategoryAside';

import { ReactComponent as RightArrow } from 'assets/icons/arrow_forward.svg';

const Aside = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className={styles['aside']}>
            <h2 className='clickable' onClick={() => {
                console.log(`location.href - `, location.pathname);
                if (location.pathname !== '/') navigate('/');
            }}>성준의 Blog</h2>
            {/* github commit graph */}
            <section className={styles['github-commit']}>
                <a className={`clickable`} href='https://github.com/fclipse' target="_blank" rel="noopener noreferrer">
                    <span>Github</span>
                    <RightArrow />
                </a>
                <div className={styles['github-commit-graph']}>
                    github commit graph
                    <img src="https://ghchart.rshah.org/fclipse" alt='github commit graph' />
                </div>
            </section>
            {/* 방문자 수 */}
            <section className={styles['visits']}>
                <h2>방문자 수</h2>
                <ul>
                    <li>
                        <h3>누적</h3>
                        <span>1230명</span>
                    </li>
                    <li>
                        <h3>오늘</h3>
                        <span>123명</span>
                    </li>
                </ul>
            </section>
            {/* category */}
            <CategoryAside />
        </aside>
    );
}

export default Aside;