import { Link } from 'react-router-dom';
import styles from './TagBlock.module.css';
import { Tag } from 'models/model';

const TagBlock = ({ tag } : { tag: Tag }) => {
    return (
        <li className={styles['tag-item']}>
            <Link to={`/tags/${tag.name}`} area-label={`Tag: ${tag.name}, Articles: ${tag.article_cnt}`}>
                <h2># {tag.name}</h2>
                <span>&#40;{tag.article_cnt}&#41;</span>
            </Link>
        </li>
    );
}

export default TagBlock;