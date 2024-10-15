import { useEffect } from 'react';
import styles from './ArticlePinned.module.css';
import { useNavigate } from 'react-router-dom';

// model imports
import { Article } from 'models/model';

// svg imports
import { ReactComponent as ArrowRight } from 'assets/icons/arrow_forward.svg';
import { ReactComponent as Pinned } from 'assets/icons/pin.svg';
import { useFetchArray } from 'utils/fetch';
import { supabase } from 'utils/supabase';

// component imports
import ArticlePinnedCard from './ArticlePinnedCard';

// constants
const PINNED_ARTICLE_LIMIT = 8;

// mockup data
// const mockupData = {
//     success: true,
//     length: 4,
//     data: [
//         {
//             id: 1,
//             title: '이것은 100자 내외의 제목입니다. 이 제목은 예시로 작성된 것이며, 실제 제목은 상황에 맞게 변경될 수 있습니다.',
//             createdAt: '2024-10-11',
//         },
//         {
//             id: 2,
//             title: '제목2',
//             createdAt: '2024-10-11',
//         },
//         {
//             id: 3,
//             title: '제목3',
//             createdAt: '2024-10-11',
//         },
//     ]
// }

/**
 * fetch pinned articles
 */
const fetchPinnedArticles = async () => {
    const { data, error } = await supabase
    .from('article')
    .select(Article.getArticleDefaultColumns())
    .eq('isPinned', true)
    .limit(PINNED_ARTICLE_LIMIT);

    // console.log(`fetchPinnedArticles data - ${JSON.stringify(data)}`);
    
    
    return { data, error };
}

/**
 * process pinned articles
 */
const processPinnedArticles = (data: any) => {
    const processedData: Article[] = data.map((article: any) => new Article(article));
    return processedData;
}

/**
 * ArticlePinnedArea Component
 */
const ArticlePinnedArea = () => {
    const navigation = useNavigate();
    const { data: pinnedArticles, loading, error, fetchData } = useFetchArray<Article>();

    useEffect(() => {
        // fetch pinned articles
        fetchData(fetchPinnedArticles, processPinnedArticles);
    }, [fetchData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!</div>;
    if (!pinnedArticles) return <div>No data</div>;    

    return (
        <section className={styles.pinned__area}>
            <header className={styles.pinned__area__title}>
                <h2 className={styles.pin}><Pinned className={styles.icon} />Pinned</h2>
                {/* 더보기 버튼 */}
                <span className={`${styles.more} clickable`} onClick={() => {
                    navigation('/article/pinned');
                }}>더보기<ArrowRight className={styles.icon} /></span>
            </header>
            <ul className={styles.pinned__area__content}>
                {pinnedArticles.map((article: Article, index: number) => {
                    return (
                        <ArticlePinnedCard key={`article-pinned-${index}`} article={article} />
                    );
                })}
            </ul>
        </section>
    );
}

export default ArticlePinnedArea;