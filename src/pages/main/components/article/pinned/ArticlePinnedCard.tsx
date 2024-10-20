import { Article } from "models/model";
import { Link } from "react-router-dom";

import styles from './ArticlePinned.module.css';

/**
 * ArticlePinned Component
 */
const ArticlePinnedCard = ({ article} : {article:Article}) => {
    return (
        <Link className={styles.pinned} to={`/article/${article.slug}`}>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.info}>{article.getFormattedDate()}</p>
        </Link>
    );
}

export default ArticlePinnedCard;