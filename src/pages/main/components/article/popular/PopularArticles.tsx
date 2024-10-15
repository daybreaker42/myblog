import { useEffect } from 'react';
// import components
import PopularArticleCard from './PopularArticleCard';
import styles from './PopularArticles.module.css';
// import models
import { Article } from 'models/model';
// import utils
import { useFetchArray } from 'utils/fetch';
import { supabase } from 'utils/supabase';
// import icons
import {ReactComponent as ArrowRight} from 'assets/icons/arrow_forward.svg';
import { useNavigate } from 'react-router-dom';

// constants
const POPULAR_ARTICLE_COUNT = 7;

/**
 * fetch Popular Articles
 * @returns Popular Articles data
 */
const fetchPopularArticles = async () => {
    const { data, error } = await supabase
        .from('article')
        .select(Article.getArticleDefaultColumns())
        .order('title', { ascending: true })
        .order('comment_cnt', { ascending: false })
        .order('like_cnt', { ascending: false })
        .order('view_cnt', { ascending: false })
        .limit(POPULAR_ARTICLE_COUNT);

    return { data, error };
}

const processPopularArticles = (data: any) => {
    // console.log(`data - ${data}`);
    const proecessedDatas: Article[] = data.map((article: any) => new Article(article));
    // proecessedDatas.forEach((article: Article) => {
    //     console.log(`article - ${article.toJsonString()}`);
    // });
    
    return proecessedDatas;
}

/**
 * Popular Articles 컴포넌트
 */
const PopularArticles = () => {
    const { data: articles, loading, error, fetchData } = useFetchArray<Article>();
    const navigation = useNavigate();

    useEffect(() => {
        fetchData(fetchPopularArticles, processPopularArticles);
        
    }, [fetchData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;
    if (!articles){
        return <div>No data</div>;
    }
    // console.log(`articles - ${articles}`);
    
    return (
        <div className={styles['main']}>
            <header>
                <h2>Popular</h2>
                <button className={`clickable`} onClick={()=>{
                    navigation('/article/popular');
                }}>더보기 <ArrowRight height={'1rem'}/></button>
            </header>
            <div className={styles['article-list']}>
                {articles.map((article: Article, index: number) => (
                    <PopularArticleCard key={index} data={article}/>
                ))}
            </div>
        </div>
    );
};

export default PopularArticles;