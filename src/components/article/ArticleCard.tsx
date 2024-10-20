import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import components
import { ArticleMenu, ArticleMenuButton } from './ArticleMenu';


// import utils
import preventEvent from './utils/preventEvent';

// import icons
// import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
// import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';
// import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

// imports css
import styles from './ArticleCard.module.css';
import ImageLoader from 'components/loading/ImageLoader';

// imports models
import { ArticleWithCategory, Tag } from 'models/model';

// TODO - 911px 이하 즈음에 tag/category가 overflow되고, height가 계속 늘어나는 문제 해결하기

const ArticleCard = ({ article }: { article: ArticleWithCategory}) => {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    
    return (
        <Link to={`/article/${article.slug}`} className={styles['card']}>
            <div className={styles.thumbnail}>
                <ImageLoader src={'https://picsum.photos/300/200'} alt={article.title} width={undefined} height={undefined} loadingIndicator={undefined} errorIndicator={undefined} />
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
                                navigate(`/category?name=${article.category.name}`);
                            }
                        }>
                            <span className={styles["category"]} style={{ '--label-color': article.category.color } as React.CSSProperties}                            >
                                {article.category.name}
                            </span>
                        </button>
                        {/* 날짜 표시 */}
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["date"]}>
                                {article.getFormattedDate()}
                            </span>
                        </button>
                        {/* 조회수 표시 */}
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["views"]}>
                                조회: {article.view_cnt}
                            </span>
                        </button>
                        {/* 댓글 수 표시 */}
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["comments"]}>
                                댓글: {article.comment_cnt}
                            </span>
                        </button>
                        {/* 좋아요 수 표시 */}
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["likes"]}>
                                좋아요: {article.like_cnt}
                            </span>
                        </button>
                        {/* 읽는 시간 표시 */}
                        <button onClick={
                            (e) => {
                                preventEvent(e);
                            }
                        }>
                            <span className={styles["read-time"]}>
                                읽는 시간: {article.readingTime}{article.unit}
                            </span>
                        </button>

                    </div>
                    <div className={styles["meta-right"]}>
                        <div className={styles["card-tags"]}>
                            {article.tags.map((tag: Tag, index: number) => {
                                return (
                                    <button key={`tag-${index}`} onClick={
                                        (e) => {
                                            preventEvent(e);
                                            navigate(`/tag?name=${tag.name}`);
                                        }
                                    }>
                                        <span className={styles["tag"]}>
                                            # {tag.name}
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