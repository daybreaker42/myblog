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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FilterOption } from 'models/interface';

// constants
const ARTICLE_PER_PAGE = 10;
/**
 * ARTICLE_TYPE
 * recent, popular, filter
 */
const enum ARTICLE_TYPE {
    RECENT = 'recent',
    POPULAR = 'popular',
    FILTER = 'filter',
}
// sort types - recent, popular, filter
const headerTypes = [
    {
        name: 'Recent',
        type: ARTICLE_TYPE.RECENT,
        content: () => 'Recent',
    },
    {
        name: 'Popular',
        type: ARTICLE_TYPE.POPULAR,
        content: () => 'Popular',
    },
    // {
    //     name: 'Filter',
    //     type: ARTICLE_TYPE.FILTER,
    //     content: () => (
    //         <Filter />
    //     ),
    // }
];
// TODO - options 목록 가져오기
const FILTER_OPTIONS : FilterOption[] = [
    { value: 'option-1', label: '작성일 내림차순' },
    { value: 'option-2', label: '조회수 내림차순' },
    { value: 'option-3', label: '좋아요 내림차순' },
    { value: 'option-4', label: '작성일 오름차순' },
    { value: 'option-5', label: '조회수 오름차순' },
    { value: 'option-6', label: '좋아요 오름차순' },
];

// mokup data
// const sectionData = {
//     name: 'section',
//     articles: [
//         {
//             id: 1,
//             slug: 'slug2',
//             title: '제목2',
//             content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
//             writer: '작성자2',
//             createdAt: '2024-10-11',
//             readingTime: {
//                 time: 5,
//                 unit: '분'
//             },
//             commentCnt: 1,
//             likesCnt: 3,
//             viewCnt: 10,
//             category: 'category1',
//             tags: ['tag1', 'tag2', 'tag3'],
//         },
//         {
//             id: 2,
//             slug: 'slug2',
//             title: '제목2',
//             content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
//             writer: '작성자2',
//             createdAt: '2024-10-11',
//             readingTime: {
//                 time: 5,
//                 unit: '분'
//             },
//             commentCnt: 1,
//             likesCnt: 3,
//             viewCnt: 10,
//             category: 'category1',
//             tags: ['tag1', 'tag2', 'tag3'],
//         },
//         {
//             id: 3,
//             slug: 'slug3',
//             title: '제목3',
//             content: `제목학원이란 2040년까지 흥할 줄 알았지만, 그러지 못했던 비운의 사이트이다. 어떤 사진을 올리면 그것에 대한 재밌는 제목을 댓글로 짓는 사이트인데 지금 봐도 제법 잘 쓴 제목들이 많다. 필자는 여기서...`,
//             writer: '작성자2',
//             createdAt: '2024-10-11',
//             readingTime: {
//                 time: 5,
//                 unit: '분'
//             },
//             commentCnt: 1,
//             likesCnt: 3,
//             viewCnt: 10,
//             category: 'category1',
//             tags: ['tag1', 'tag2', 'tag3'],
//         },
//     ],

// };

/**
 * getArticlesWithPagenation
 * 
 * article 데이터를 fetch하는 함수
 */
async function getArticlesWithPagenation({page = 1, type = ARTICLE_TYPE.RECENT}): Promise<{ parsedArticle: Article[]; count: number | null | undefined; }> {
    // 1. supabase로부터 article 데이터를 fetch
    
    // fetch article data
    const startPage = (page - 1) * ARTICLE_PER_PAGE;
    const endPage = page * ARTICLE_PER_PAGE - 1;
    let data, error, count;
    
    if(type === ARTICLE_TYPE.RECENT) {
    ({ data, error, count } = await supabase
        .from('article')
        .select(Article.getArticleDefaultColumns(), { count: 'exact' })
        .eq('status', 'NORMAL')
        .range(startPage, endPage)
        .order('created_at', { ascending: false }));
        
    } else if(type === ARTICLE_TYPE.POPULAR) {
        ({ data, error, count } = await supabase
        .from('article')
        .select(Article.getArticleDefaultColumns(), { count: 'exact' })
        .eq('status', 'NORMAL')
        .range(startPage, endPage)
        .order('view_cnt', { ascending: false })
        .order('like_cnt', { ascending: false })
        .order('comment_cnt', { ascending: false })
        .order('title', { ascending: true }));
    }else if(type === ARTICLE_TYPE.FILTER) {
        // filter 적용
    }
    
    if (error) {
        throw error;
    }
    
    // 2. fetch한 데이터를 Article 객체로 변환
    let parsedArticle = (data || []).map(article => new Article(article)); // 수정: articleDatas가 undefined일 경우 빈 배열로 대체
    return { parsedArticle, count };
};


/**
 * ArticleSection
 * 
 * ArticleCard를 렌더링하는 컴포넌트
 */
const ArticleSection = () => {
    const [type, setType] = useState(ARTICLE_TYPE.RECENT) // recent, popular, filter
    const [page, setPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);

    const {
        data,
        isLoading,
        isError,
        error,
        // isPreviousData,
      } = useQuery({
        queryKey: ['articles', page, type ],
        queryFn: () => getArticlesWithPagenation({ page: page }),
        placeholderData: keepPreviousData,  // 로딩 중일때 이전 데이터 유지하는 옵션
      });
    
    const totalPages = data?.count ? Math.ceil(data.count / ARTICLE_PER_PAGE) : 0;

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error: {error.message}</div>;
    if(!data) return <div>No data</div>;


    return (
        <section className={styles['article-container']}>
            <header className={styles['header']}>
                {headerTypes.map((headerType, index) => (
                    <span
                        key={`header-${index}`}
                        className={type === headerType.type ? styles['selected'] : ''}
                        onClick={() => setType(headerType.type)}
                    >
                        {headerType.content()}
                    </span>
                ))}
                <span className={styles['filter']}>
                    <Filter options={FILTER_OPTIONS} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
                </span>
            </header>
            <ul className={styles['article-list']}>
                {data.parsedArticle.map((article, index) => (
                    <ArticleCard key={`article-${index}`} article={article} />
                ))}
            </ul>
            <Pagination currentPage={page}  totalPages={totalPages} setPage={setPage}/>
        </section>
    );
}

export default ArticleSection;