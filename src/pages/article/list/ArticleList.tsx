import { useEffect } from "react";
// models import
import { Article } from "models/model";
// utils import
import { supabase } from "utils/supabase";
// import { ARTICLE_PER_PAGE } from "utils/constants";
// styles import
import styles from './ArticleList.module.css';
import { useQuery } from "@tanstack/react-query";

// constants
const ARTICLE_PER_PAGE = 10;

// 한번에 로드할 게시글 수
let articlePerPage = ARTICLE_PER_PAGE;

async function fetchArticles({page} : {page: number}) {
    const {data, error} = await supabase
    .from('article')
    .select(Article.getArticleDefaultColumns())
    .order('created_at', { ascending: false })
    .range((page - 1) * ARTICLE_PER_PAGE, (page - 1) * ARTICLE_PER_PAGE - 1);

    if(error){
        throw error;
    }

    const processedData: Article[] = data.map((article: any) => new Article(article));
    return processedData;
}


const ArticleList = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey:['articles'], 
        queryFn: () => fetchArticles({page: 1})
    });

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data</p>;

    return (
        <div className={styles['list']}>
        {data.map((article: any) => (
            <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            </div>
        ))}
        </div>
    );
};

export default ArticleList;