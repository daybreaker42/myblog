import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import config from 'config';
import { supabase } from 'utils/supabase';
import Masonry from 'react-masonry-css';

// styles
import styles from './CategoryPage.module.css';
// components
import Nav from 'components/nav/Nav';
import Search from 'components/search/Search';
import CategoryBlock from './CategoryBlock';
import Filter from 'components/filter/Filter';
// models
import { Article, CategoryWithArticles } from 'models/model';
import { FilterOption } from 'models/interface';
import { getRandomInt } from 'utils/random';
import { applyOrder } from 'utils/applyOrder';

// constants
const FILTER_OPTIONS: FilterOption[] = [
    { value: '게시물 수 내림차순', label: '게시물 수 내림차순' },
    { value: '게시물 수 오름차순', label: '게시물 수 오름차순' },
    { value: '조회수 내림차순', label: '조회수 내림차순' },
    { value: '조회수 오름차순', label: '조회수 오름차순' },
    { value: '좋아요 내림차순', label: '좋아요 내림차순' },
    { value: '좋아요 오름차순', label: '좋아요 오름차순' },
    { value: '작성일 내림차순', label: '작성일 내림차순' },
    { value: '작성일 오름차순', label: '작성일 오름차순' },
];
// masonry breakpoint
// item width = 236px
const breakpointColumnsObj = {
    default: 4,
    1532: 3,
    1280: 2,
    1028: 1
  };
  

// mockup data
const mockupData: {success: boolean, length: number, data: {count: number, processedData: CategoryWithArticles[]}} = {
    success: true,
    length: 4,
    data: {
        count: 14,
        processedData: Array.from({ length: 14 }, (_, index) => ({
            id: index,
            name: `Category ${index}`,
            description: 'This is a category description',
            createdAt: '2024-10-11',
            article_cnt: getRandomInt(1, 20),
            total_view_cnt: 100,
            total_like_cnt: 50,
            color: '#000000',
            articles: Array.from({ length: getRandomInt(1, 10) }, (_, index) => ({
                id: index,
                title: `Article ${index}`,
                slug: `article-${index}`,
            })),
        })).map((category) => new CategoryWithArticles(category))
},
};



// fetch categories from supabase
async function fetchCategories({ selectedFilter, search }: { selectedFilter: FilterOption, search: string }) : Promise<{processedData: CategoryWithArticles[], count: number}> {
    let query = supabase
        .from('category')
        .select(`
            *,
            articles:article!category_id(
                id,
                slug,
                title
            )
        `, { count: 'exact' })
        .limit(10, { foreignTable: 'articles' });

    if (search) {
        query = query.ilike('name', `%${search}%`);
    }
    
    // filter 적용에 따라 정렬 방식 변경
    if (selectedFilter) {
        switch (selectedFilter.value) {
            case '게시물 수 내림차순':
                query = applyOrder(query, 'article_cnt', false);
                break;
            case '게시물 수 오름차순':
                query = applyOrder(query, 'article_cnt', true);
                break;
            case '조회수 내림차순':
                query = applyOrder(query, 'total_view_cnt', false);
                break;
            case '조회수 오름차순':
                query = applyOrder(query, 'total_view_cnt', true);
                break;
            case '좋아요 내림차순':
                query = applyOrder(query, 'total_like_cnt', false);
                break;
            case '좋아요 오름차순':
                query = applyOrder(query, 'total_like_cnt', true);
                break;
            case '작성일 내림차순':
                query = applyOrder(query, 'created_at', false);
                break;
            case '작성일 오름차순':
                query = applyOrder(query, 'created_at', true);
                break;
            default:
                query = applyOrder(query, 'name', true);
                break;
        }
    }

    const { data, count, error } = await query;

    if (error) {
        console.error('Error fetching data:', error);
        // 사용자에게 적절한 피드백 제공
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }

    console.log(data);
    
    
    const processedData: CategoryWithArticles[] = data.map((category: CategoryWithArticles) => new CategoryWithArticles(category));
    return {processedData, count: count ?? 0};
}

function CategoryPage() {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTER_OPTIONS[0]);
    // supabase - reat query
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['categories', { search }],
        queryFn: () => fetchCategories({ selectedFilter, search }),
    });
    // mockup data 사용
    // const { data, isPending, isError, error } = { data: mockupData.data, isPending: false, isError: false, error: {message: 'asdf'} };

    // console.log(`processData: ${data.toString()}`);
    // console.log(`search: ${search}`);
    
    
    if (isPending) {
        return <div>Loading...</div>;
    }
    if(isError) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div className={styles['root']}>
            <Helmet>
                <title>Category | {`${config.appName}`}</title>
                <meta name='description' content='Category page' />
            </Helmet>
            <header className="App-header">
                <Nav />
            </header>
            <main className={styles['page']}>
                <div>
                    {/* 공지용 부분 */}
                </div>
                <section className={styles['body']}>
                    <header className={`${styles['head']} ${styles['item-2']}`}>
                        <h1>Category Page</h1>
                        <span className={styles['dash']}></span>
                        <span className={styles['count']}>{data.count}개</span>
                    </header>
                    <aside className={`${styles['aside']} ${styles['item-4']}`}>
                        <Filter options={FILTER_OPTIONS} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
                        <Search search={search} setSearch={setSearch} />
                    </aside>
                    <div className={styles['item-5']}>
                        <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={styles['list']}
                        columnClassName={styles['list-column']}>
                            {data.processedData.map((category: CategoryWithArticles, index: number) => (
                                <CategoryBlock key={index} category={category} />
                            ))}
                        </Masonry>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default CategoryPage;