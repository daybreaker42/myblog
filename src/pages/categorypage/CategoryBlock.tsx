import { CategoryWithArticles } from "models/model";
import styles from './CategoryPage.module.css';
import { ReactComponent as RightArrow } from 'assets/icons/arrow_forward.svg';
import { Link } from "react-router-dom";

const CategoryBlock = ({ category }: { category: CategoryWithArticles }) => {
    const backgroundImageStyle = category.thumbnail_img
        ? { backgroundImage: `url(${category.thumbnail_img})` }
        : {};

    return (
        <li className={styles['category-block']} style={backgroundImageStyle}>
            <header>
                <h3>{category.name}</h3>
                <span>&#40;{category.parseArticleCnt()}&#41;</span>
            </header>
            <ul>
                {category.articles.map((article, index) => (
                    <li key={index} title={article.title}>
                        <a href={`/article/${article.slug}`}>{article.title}</a>
                    </li>
                ))}
            </ul>
            {category.article_cnt > 10 ? (
                <footer>
                    <Link to={`/category/${category.name}`}>
                        <span>더보기</span>
                        <RightArrow style={{ height: '16px' }} />
                    </Link>
                </footer>
            ) : null}
        </li>
    );
};

export default CategoryBlock;