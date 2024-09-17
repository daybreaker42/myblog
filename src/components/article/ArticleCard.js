import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
 * @param {string} article.id - article id
 * @param {string} article.title - article title
 * @param {string} article.content - article content
 * @param {string} article.writer - user name
 * @param {string} article.createdAt - article creation date
 * @param {Object} article.readingTime - article reading time
 * @param {number} article.readingTime.time - article reading time value
 * @param {string} article.readingTime.unit - article reading time unit
 * @param {number} article.viewCnt - article view count
 * @param {number} article.commentCnt - article comment count
 * @param {number} article.likesCnt - article like count
 * @param {string} article.category - article category
 * @param {Array<string>} article.tags - article tags
 * 
 * 
 * @returns {JSX.Element}
 */
function ArticleCard({ article }) {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <Link to={`/article/${article.id}`} className={styles.card}>
            <div className={styles.thumbnail}>
                <ImageLoader src={'https://picsum.photos/300/200'} alt={article.title} />
            </div>
            {/* <img loading='lazy' src={'https://picsum.photos/300/200'} alt={article.title} /> */}
            <div className={styles["card-content"]}>
                <header className={styles['card-top']}>
                    <h2 className={styles["card-title"]}>
                        {article.title}
                    </h2>
                    <ArticleMenuButton menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
                </header>
                <p className='multi-line-ellipsis'>
                    {article.content}
                </p>
                <div className={styles["card-meta"]}>
                    <div className={styles["meta-left"]}>
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                                navigate(`/category?name=${article.category}`);
                            }
                        }>
                            <span className={styles["card-category"]}>
                                {article.category}
                            </span>
                        </button>

                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["card-date"]}>
                                {article.createdAt}
                            </span>
                        </button>

                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["card-views"]}>
                                조회: {article.viewCnt}
                            </span>
                        </button>

                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["card-comments"]}>
                                댓글: {article.commentCnt}
                            </span>
                        </button>

                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["card-read-time"]}>
                                {/* 읽는 시간: {article.readingTime.time}{article.info.readingTime.unit} */}
                            </span>
                        </button>

                    </div>
                    <div className={styles["meta-right"]}>
                        <div className={styles["card-tags"]}>
                            {article.tags.map((tag, index) => {
                                return (
                                    <button key={`tag-${index}`} onClick={
                                        (e) => {
                                            preventEvent(e);
                                            navigate(`/tag?name=${tag}`);
                                        }
                                    }>
                                        <span className={styles["tag"]}>
                                            # {tag}
                                        </span>
                                    </button>

                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ArticleMenu article={article} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </Link >
    );
};


export default ArticleCard;