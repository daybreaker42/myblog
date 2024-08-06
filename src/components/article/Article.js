import './Article.css';
import leaves from '../../assets/images/leaves.jpg';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';

function Article({ article }) {
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
                        <span>{`${article.articleInfo.user.name} · ${article.articleInfo.createdAt} · `}</span>
                        <span style={{ width: '20px', height: '20px' }}><TimerIcon /></span>
                        <span>{article.articleInfo.readingTime.value}{article.articleInfo.readingTime.unit}</span>
                    </section>
                    <section className='article-data'>
                        <span>{`views ${article.articledata.viewCnt} · comments ${article.articledata.commentCnt}`}</span>
                    </section>
                </section>
            </section>
        </article >
    );
}

export default Article;