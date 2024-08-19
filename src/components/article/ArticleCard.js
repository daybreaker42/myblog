import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// import components
import { ArticleMenu, ArticleMenuButton } from './ArticleMenu';


// import utils
import preventEvent from './utils/preventEvent';

// import icons
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

// imports css
import styles from './ArticleCard.module.css';
import ImageLoader from 'components/loading/ImageLoader';

/**
 * ArticleCard component
 * @param {Object} article - article object
 * @param {string} article.title - article title
 * @param {string} article.content - article content
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
 * @param {string} article.category - article category
 * @param {Array<string>} article.tags - article tags
 * 
 * 
 * @returns {JSX.Element}
 */
function ArticleCard({ article }) {
    const [isLoading, setIsLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <Link to={`/article/${article.id}`}>
            <article className={styles.card}>
                <ImageLoader className={styles['thumbnail']} src={'https://picsum.photos/300/200'} alt={article.title} />
                {/* <img loading='lazy' src={'https://picsum.photos/300/200'} alt={article.title} /> */}
                <div className={styles["card-content"]}>
                    <div className={styles['card-top']}>
                        <h2 className={styles["card-title"]}>
                            {article.title}
                        </h2>
                        <ArticleMenuButton menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
                    </div>
                    <p className={styles["card-summary"]}>
                        {article.content}
                    </p>
                    <div className={styles["card-meta"]}>
                        <span className={styles["card-author"]}>
                            작성자: {article.info.user.name}
                        </span>
                        <span className={styles["card-date"]}>
                            작성일: {article.info.createdAt}
                        </span>
                        <span className={styles["card-read-time"]}>
                            읽는 시간: {article.info.readingTime.value}{article.info.readingTime.unit}
                        </span>
                        <span className={styles["card-views"]}>
                            조회수: {article.data.viewCnt}
                        </span>
                        <span className={styles["card-comments"]}>
                            댓글: {article.data.commentCnt}
                        </span>
                    </div>
                </div>

                <ArticleMenu article={article} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            </article>
        </Link >
    );
}


export default ArticleCard;