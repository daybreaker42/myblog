import { useState, useEffect } from 'react';
import styles from './ArticleSection.module.css';
// supabase client
import { supabase } from 'utils/supabase';
// components import
import ArticleCard from 'components/article/ArticleCard';
import Pagination from 'components/pagenation/Pagenation';
import Filter from 'components/filter/Filter';

// model import
import { Article } from 'models/model';

// mokup data
const sectionData = {
    name: 'section',
    articles: [
        {
            id: 1,
            slug: 'slug2',
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 2,
            slug: 'slug2',
            title: '제목2',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 3,
            slug: 'slug3',
            title: '제목3',
            content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
            writer: '작성자2',
            createdAt: '2024-10-11',
            readingTime: {
                time: 5,
                unit: '분'
            },
            commentCnt: 1,
            likesCnt: 3,
            viewCnt: 10,
            category: 'category1',
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ],

};

// CONSTANTS
const ARTICLE_PER_PAGE: number = 10;
const ARTICLE_DATA_COLUMNS: string[] = [
    'id',
    'created_at',
    'title',
    'content',
    'category_id',
    'slug',
    'thumbnail_img',
    'reading_time',
    'unit',
    'view_cnt',
    'like_cnt',
    'comment_cnt',
];

/**
 * ArticleSection
 * 
 * ArticleCard를 렌더링하는 컴포넌트
 */
const ArticleSection = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [type, setType] = useState('recent'); // recent, popular, filter
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    // const [category, setCategory] = useState('all');

    // sort types - recent, popular, filter
    const headerTypes = [
        {
            name: 'Recent',
            type: 'recent',
            content: () => 'Recent',
        },
        {
            name: 'Popular',
            type: 'popular',
            content: () => 'Popular',
        },
        {
            name: 'Filter',
            type: 'filter',
            content: () => (
                <Filter />
            ),
        }
    ];

    // 처음 page load시 실행
    useEffect(() => {
        getArticlesWithPagenation();
    }, []);

    /**
     * getArticlesWithPagenation
     * 
     * article 데이터를 fetch하는 함수
     */
    async function getArticlesWithPagenation(page = 1, pageSize = ARTICLE_PER_PAGE) {
        try {
            // 1. supabase로부터 article 데이터를 fetch
            setIsLoading(true);
            let { data: articleDatas, error, count } = await supabase
                .from('article')
                .select(`
                    ${ARTICLE_DATA_COLUMNS.join(', ')},
                    category:category_id(*),
                    article_tags(
                    id,
                    tags(
                        id,
                        name
                    )
                    )
                `, { count: 'exact' })
                .eq('status', 'NORMAL')
                .range((page - 1) * pageSize, page * pageSize - 1)
                .order('created_at', { ascending: false });


            if (error) {
                console.error('Error fetching posts:', error);
                return;
            }
            // console.log('articleDatas:', articleDatas);
            // set currentPage
            setCurrentPage(page);
            
            // count를 이용해 totalPages 계산
            if (count !== undefined && count !== null) {
                setTotalPages(Math.ceil(count / pageSize));
            } else {
                setTotalPages(0);
            }
            
            // 2. fetch한 데이터를 Article 객체로 변환
            let parsedArticle = (articleDatas || []).map(article => new Article(article)); // 수정: articleDatas가 undefined일 경우 빈 배열로 대체
            setArticles(parsedArticle); // 수정: setArticles 함수 호출 추가
            setIsLoading(false);
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };


    return (
        <section className={styles['article-container']}>
            <header className={styles.header}>
                {headerTypes.map((headerType, index) => (
                    <span
                        key={`header-${index}`}
                        className={type === headerType.type ? styles.selected : ''}
                        onClick={() => setType(headerType.type)}
                    >
                        {headerType.content()}
                    </span>
                ))}
            </header>
            <ul className={styles['article-list']}>
                {articles.map((article, index) => (
                    <ArticleCard key={`article-${index}`} article={article} />
                ))}
            </ul>
            <Pagination currentPage={currentPage}  totalPages={totalPages} getArticlesWithPagenation={getArticlesWithPagenation}/>
        </section>
    );
}

export default ArticleSection;