import React, { useState, useEffect, useRef } from 'react';

import styles from './ArticleMenu.module.css';
import preventEvent from './utils/preventEvent';
// import { isVisible } from '@testing-library/user-event/dist/utils';

import { ReactComponent as MoreVertIcon } from 'assets/icons/more_vert.svg';


function ArticleMenuButton({ menuVisible, setMenuVisible }) {
    function toggleMenu(event, menuVisible, setMenuVisible) {
        preventEvent(event);
        setMenuVisible(!menuVisible);
    }
    return (
        <MoreVertIcon className={styles['article-menu-button']} onClick={(event) => { toggleMenu(event, menuVisible, setMenuVisible) }} />
    );
}

// 더보기 버튼을 누르면 나오는 메뉴
function ArticleMenu({ article, menuVisible, setMenuVisible }) {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        if (menuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible, setMenuVisible]);

    if (!menuVisible) {
        return null;
    }

    return (
        <section ref={menuRef} className={`${styles['article-menu']} ${menuVisible ? 'visible' : 'none'}`} onClick={(event) => {
            preventEvent(event);
        }}>
            {/* 권한 있을 경우에만 수정, 삭제 버튼 나오게 */}
            <button onClick={(event) => {
                preventEvent(event);
                // console.log(`edit article ${article.id}`)
            }}>수정</button>
            <button onClick={(event) => {
                preventEvent(event);
                // console.log(`delete article ${article.id}`)
            }}>삭제</button>
            <button onClick={(event) => {
                preventEvent(event);
                // console.log(`share article ${article.id}`)
            }}>공유</button>

        </section>
    );
}

export { ArticleMenuButton, ArticleMenu };