import { CategoryWithArticles } from "models/model";

import styles from './CategoryPage.module.css';

const CategoryBlock = ({ category }: { category: CategoryWithArticles }) => {
    return (
        <li className={styles['category-block']}>
            <header>
                <h3>{category.name}</h3>
                <span>&#40;{category.parseArticleCnt()}&#41;</span>
            </header>
            <ul>
                {category.articles.map((article, index) => (
                    <li key={index}>
                        <a href={`/article/${article.slug}`}>{article.title}</a>
                    </li>
                ))}
            </ul>
        </li>
    )
}

export default CategoryBlock;