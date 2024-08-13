import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// import icons
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
// imports css
import styles from './ArticleCard.module.css';
// import image
import leaves from '../../assets/images/leaves.jpg';

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
            <article className={styles.card}>

                <img src={leaves} alt={article.title} className={styles['card-thumbnail']} />
                <div className={styles["card-content"]}>
                    <h2 className={styles["card-title"]}>{article.title}</h2>
                    <p className={styles["card-summary"]}>{article.content}</p>
                    <div className={styles["card-meta"]}>
                        <span className={styles["card-author"]}>작성자: {article.info.user.name}</span>
                        <span className={styles["card-date"]}>{article.info.createdAt}</span>
                    </div>
                    <div className={styles["card-stats"]}>
                        <span className={styles["card-read-time"]}>읽는 시간: {article.info.readingTime.value}{article.info.readingTime.unit}</span>
                        <span className={styles["card-views"]}>조회수: {article.data.viewCnt}</span>
                        <span className={styles["card-comments"]}>댓글: {article.data.commentCnt}</span>
                    </div>
                </div>
            </article>
        </Link >
    );
}

// 더보기 버튼을 누르면 나오는 메뉴
function ArticleMenu({ article }) {
    return (
        <section className={styles['article-menu']} onClick={(event) => {
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