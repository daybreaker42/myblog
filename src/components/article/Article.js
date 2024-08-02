import './Article.css';
import leaves from '../../assets/images/leaves.jpg';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';

function Article({ articleInstance }) {
    return (
        <article>
            {/* <img src={articleInstance.image} alt={articleInstance.title} /> */}
            <img src={leaves} alt={articleInstance.title} />
            <section className='article-body'>
                <span className='article-title'>{articleInstance.title}</span>
                <section className='article-details'>
                    <section className='article-info'>
                        <span>{`${articleInstance.articleInfo.user.name} · ${articleInstance.articleInfo.createdAt} · `}</span>
                        <span style={{ width: '20px', height: '20px' }}><TimerIcon /></span>
                        <span>{articleInstance.articleInfo.readingTime.value} {articleInstance.articleInfo.readingTime.unit}</span>
                    </section>
                    <section className='article-data'>
                        <span>{`views ${articleInstance.articledata.viewCnt} · comments ${articleInstance.articledata.commentCnt}`}</span>
                    </section>
                </section>
            </section>
        </article >
    );
}

export default Article;