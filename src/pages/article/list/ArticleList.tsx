import { useEffect } from "react";
// models import
import { Article } from "models/model";
// utils import
import { supabase } from "utils/supabase";
import { usePaginatedFetch } from "utils/fetch";
import { ARTICLE_PER_PAGE } from "utils/constants";
// styles import
import styles from './ArticleList.module.css';

// 한번에 로드할 게시글 수
let articlePerPage = ARTICLE_PER_PAGE;

const fetchArticles = async (page: number, pageSize: number) => {
    const response = await supabase
    .from('article')
    .select(Article.getArticleDefaultColumns())
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, (page - 1) * pageSize - 1);

    return response;
}

const processArticles = (data: any) => {
    return data.map((article: any) => new Article(article));
}

const ArticleList = () => {
    const { data, loading, error, currentPage, totalPages, setCurrentPage, pageSize, setPageSize, fetchData } = usePaginatedFetch<Article>(articlePerPage);

    useEffect(() => {
        // fetchData(fetchArticles, processArticles);
    }, [fetchData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
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