import './ArticleCard.css';
import leaves from '../../assets/images/leaves.jpg';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';

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
    return (
        <article>
            {/* TODO - image fetching한거로 설정하기 */}
            {/* <img src={article.image} alt={article.title} /> */}
            <img src={leaves} alt={article.title} />
            <section className='article-body'>
                <section className='article-header'>
                    <span className='article-title'>{article.title}</span>
                    <button className='article-button'>
                        <MoreVertIcon />
                    </button>
                </section>

                <section className='article-details'>
                    <section className='article-info'>
                        <span>{`${article.info.user.name} · ${article.info.createdAt} · `}</span>
                        <span style={{ width: '20px', height: '20px' }}><TimerIcon /></span>
                        <span>{article.info.readingTime.value}{article.info.readingTime.unit}</span>
                    </section>
                    <section className='article-data'>
                        <span>{`views ${article.data.viewCnt} · comments ${article.data.commentCnt}`}</span>
                    </section>
                </section>
            </section>
        </article >
    );
}

export default ArticleCard;