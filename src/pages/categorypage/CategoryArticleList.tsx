import { useQuery } from "@tanstack/react-query";
import Loading from "components/loading/loading/Loading";
import { ArticleWithCategory } from "models/model";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { supabase } from "utils/supabase";

import ArticleCard from "components/article/ArticleCard";
import Nav from "components/nav/Nav";
import config from 'config';

import categoryStyle from "pages/categorypage/CategoryPage.module.css";
import styles from "pages/tagspage/TagsPage.module.css";

async function getArticleByCategoryName(category:string) {
    const { data: categoryData, error: categoryError } = await supabase
        .from('category')
        .select('id')
        .eq('name', category)
        .single();

    if (categoryError) throw new Error(categoryError.message);

    // console.log(`categoryData - ${categoryData.id}`);
    
    const { data: articlesData, count, error: articlesError } = await supabase
        .from('article')
        .select(ArticleWithCategory.getArticleDefaultColumns(), { count: 'exact' })
        .eq('category_id', categoryData.id);

    if (articlesError) throw new Error(articlesError.message);

    const parsedData = (articlesData || []).map((article: any) => new ArticleWithCategory(article));    
    return { articles: parsedData, count };
}

const CategoryArticleList = () => {
    const { category = 'not-found' } = useParams();
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['category', category],
        queryFn: () => getArticleByCategoryName(category),
    });
    
    if (isPending) return <Loading />;
    if (isError) return <p>Error: {error.message}</p>;
    
    return (
        <div className={categoryStyle['root']}>
            <Helmet>
                <title>Category | {`${config.appName}`}</title>
                <meta name='description' content='Tags page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main className={categoryStyle['page']}>
                <div>
                    {/* 공지용 부분 */}
                </div>
                <section className={categoryStyle['body']}>
                    <header className={`${categoryStyle['head']} ${categoryStyle['item-2']}`}>
                        <h1># {category}</h1>
                        <span className={categoryStyle['dash']}></span>
                        <span className={categoryStyle['count']}>{data.count}개</span>
                    </header>
                    <div className={categoryStyle['item-5']}>
                        <ul className={styles['tags-list']}>
                            {data.articles.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CategoryArticleList;