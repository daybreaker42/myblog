import './Article.css';
import leaves from '../../assets/images/leaves.jpg';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as MoreVertIcon } from '../../assets/icons/more_vert.svg';

function Article({ articleInstance }) {
    return (
        <article>
            {/* TODO - image fetching한거로 설정하기 */}
            {/* <img src={articleInstance.image} alt={articleInstance.title} /> */}
            <img src={leaves} alt={articleInstance.title} />
            <section className='article-body'>
                <section className='article-header'>
                    <span className='article-title'>{articleInstance.title}</span>
                    <button className='article-button'>
                        <MoreVertIcon />
                    </button>
                </section>

                <section className='article-details'>
                    <section className='article-info'>
                        <span>{`${articleInstance.articleInfo.user.name} · ${articleInstance.articleInfo.createdAt} · `}</span>
                        <span style={{ width: '20px', height: '20px' }}><TimerIcon /></span>
                        <span>{articleInstance.articleInfo.readingTime.value}{articleInstance.articleInfo.readingTime.unit}</span>
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