import { Link } from 'react-router-dom';
import styles from './TagBlock.module.css';
import { Tag } from 'models/model';

const TagBlock = ({ tag } : { tag: Tag }) => {
    return (
        <li className={styles['category-item']}>
            <Link to={`/tags/${tag.name}`} className={styles['category-link']}>
                <div className={styles['category-info']}>
                    <h2 className={styles['category-name']}>{tag.name}</h2>
                    {/* <p className={styles['category-description']}>{tag.description}</p> */}
                </div>
                <div className={styles['category-stats']}>
                    <span className={styles['category-count']}>{tag.article_cnt}개</span>
                    {/* <span className={styles['category-views']}>{tag.total_view_cnt}회</span>
                    <span className={styles['category-likes']}>{tag.total_like_cnt}개</span> */}
                </div>
            </Link>
        </li>
    );
}

export default TagBlock;