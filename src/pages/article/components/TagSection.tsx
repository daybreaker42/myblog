// util import
import preventEvent from 'components/article/utils/preventEvent';
// css import
import styles from '../ArticlePage.module.css';
import { Tag } from 'models/model';

function TagSection({ tags }: { tags: Tag[] }) : JSX.Element {
    if (!tags) return (
        <div className={styles["article-tags"]}>
        </div>
    );
    return (
        <div className={styles["article-tags"]}>
            {tags.map((tag, index: number) => (
                <a key={index} href={`/tags/${tag.name}`}>
                    <span className={styles["tag"]}>
                        {tag.name}
                    </span>
                </a>
            ))}
        </div>
    )
}

export default TagSection;