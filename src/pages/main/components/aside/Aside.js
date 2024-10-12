// imports Aside from './components/Aside';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Aside.module.css';
import CategoryAside from '../categoryAside/CategoryAside';

const Aside = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside>
            <h2 className='clickable' onClick={() => {
                console.log(`location.href - `, location.pathname);
                if (location.pathname !== '/') navigate('/');
            }}>성준의 Blog</h2>
            {/* github commit graph */}
            <section className={styles['github-commit']}>
                <h2>Github Commit Status</h2>
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