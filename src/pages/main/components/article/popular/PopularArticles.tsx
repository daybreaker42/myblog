// import components
import PopularArticleCard from './PopularArticleCard';
import styles from './PopularArticles.module.css';
// import models
import { ArticleWithCategory } from 'models/model';
// import utils
import { supabase } from 'utils/supabase';
// import icons
import {ReactComponent as ArrowRight} from 'assets/icons/arrow_forward.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingBlock from 'components/loading/loading/LoadingBlock';

// constants
const POPULAR_ARTICLE_COUNT = 7;

/**
 * fetch Popular Articles
 * @returns Popular Articles data
 */
async function fetchPopularArticles() : Promise<ArticleWithCategory[]> {
    const { data, error } = await supabase
        .from('article')
        .select(ArticleWithCategory.getArticleDefaultColumns())
        .order('view_cnt', { ascending: false })
        .order('like_cnt', { ascending: false })
        .order('comment_cnt', { ascending: false })
        .order('title', { ascending: true })
        .limit(POPULAR_ARTICLE_COUNT);

    if (error) {
        throw error;
    }
    const parsedData = (data || []).map((article: any) => new ArticleWithCategory(article));
    return parsedData;
}

/**
 * Popular Articles 컴포넌트
 */
const PopularArticles = () => {
    const navigation = useNavigate();
    const {data, isPending, isError, error } = useQuery({
        queryKey: ['popularArticles'],
        queryFn: fetchPopularArticles,
    });


    if (isPending) return <LoadingBlock />;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data){
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
                {data.map((article: ArticleWithCategory, index: number) => (
                    <PopularArticleCard key={index} data={article}/>
                ))}
            </div>
        </div>
    );
};

export default PopularArticles;