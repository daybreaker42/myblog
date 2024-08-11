import './ArticleCard.css';
import leaves from '../../assets/images/leaves.jpg';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

/**
 * ArticleCard component
 * @param {Object} article - article object
 * @param {string} article.title - article title
 * @param {Object} article.info - article information
 * @param {Object} article.info.user - user information
 * @param {string} article.info.user.name - user name
 * @param {string} article.info.createdAt - article creation date
 * @param {Object} article.info.readingTime - article reading time
 * @param {number} article.info.readingTime.value - article reading time value
 * @param {string} article.info.readingTime.unit - article reading time unit
 * @param {Object} article.data - article data
 * @param {number} article.data.viewCnt - article view count
 * @param {number} article.data.commentCnt - article comment count
 * @returns {JSX.Element}
 */
function ArticleCard({ article }) {
    const [menuVisible, setMenuVisible] = useState(false);
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
    }, [menuVisible]);

    const toggleMenu = (event) => {
        preventEvent(event);
        setMenuVisible(!menuVisible);
    };



    return (
        <Link to={`/article/${article.id}`}>
            <article class="card">

                <img src={leaves} alt={article.title} className='card-thumbnail' />
                <div class="card-content">
                    <h2 class="card-title">{article.title}</h2>
                    <p class="card-summary">{article.content}</p>
                    <div class="card-meta">
                        <span class="card-author">작성자: {article.info.user.name}</span>
                        <span class="card-date">{article.info.createdAt}</span>
                    </div>
                    <div class="card-stats">
                        <span class="card-read-time">읽는 시간: {article.info.readingTime.value}{article.info.readingTime.unit}</span>
                        <span class="card-views">조회수: {article.data.viewCnt}</span>
                        <span class="card-comments">댓글: {article.data.commentCnt}</span>
                    </div>
                </div>
            </article>
        </Link >
    );
}

// 더보기 버튼을 누르면 나오는 메뉴
function ArticleMenu({ article }) {
    return (
        <section className='article-menu' onClick={(event) => {
            preventEvent(event);
        }}>
            {/* 권한 있을 경우에만 수정, 삭제 버튼 나오게 */}
            <button onClick={(event) => {
                preventEvent(event);
                console.log(`edit article ${article.id}`)
            }}>수정</button>
            <button onClick={(event) => {
                preventEvent(event);
                console.log(`delete article ${article.id}`)
            }}>삭제</button>
            <button onClick={(event) => {
                preventEvent(event);
                console.log(`share article ${article.id}`)
            }}>공유</button>

        </section>
    );
}

const preventEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
};

export default ArticleCard;