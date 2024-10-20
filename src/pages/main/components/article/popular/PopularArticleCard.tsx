import { ArticleWithCategory } from "models/model";
import styles from './PopularArticleCard.module.css';
import { Link } from "react-router-dom";

const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * PopularArticleCard 컴포넌트
 * 
 * 인기 게시글 카드 컴포넌트
 */
const PopularArticleCard = ({data} : {data: ArticleWithCategory}) => {
    const truncatedTitle = truncateText(data.title, 30);
    const truncatedContent = truncateText(data.content, 100);

    return (
        <Link className={styles['card']} to={`/article/${data.slug}`}>
            <img className={styles['img']} src={data.thumbnailImg ?? 'https://via.placeholder.com/150'} alt="article" />
            <div className={styles['main']}>
                <h3>{truncatedTitle}</h3>
                <p>{truncatedContent}</p>
                <section className={styles["meta"]}>
                    <span>{data.getFormattedDate()}</span>
                    <span>{data.category.name}</span>
                    {/* <span>{data.view_cnt}</span> */}
                    <span>댓글 {data.comment_cnt}</span>
                    {/* <span>{data.like_cnt}</span> */}
                    <span>{data.readingTime}{data.unit}</span>
                </section>
            </div>
        </Link>
    );
};

export default PopularArticleCard;