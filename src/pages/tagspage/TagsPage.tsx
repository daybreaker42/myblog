import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import config from 'config';
// NOTE - categorypage에 있는 styles 재사용
import categoryStyle from 'pages/categorypage/CategoryPage.module.css';
import styles from './TagsPage.module.css';

// components
import Nav from 'components/nav/Nav';
import Filter from 'components/filter/Filter';
import Search from 'components/search/Search';
import TagBlock from './TagBlock';

// models
import { FilterOption } from 'models/interface';
// utils
import { getRandomInt } from 'utils/random';
import { supabase } from 'utils/supabase';
import { Tag } from 'models/model';
import { useQuery } from '@tanstack/react-query';
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

// mockup data
const data = {
    count: 200,
    processedData: Array.from({ length: 200 }, (_, index) => ({
        id: index,
        name: `Tag ${index}`,
        article_cnt: getRandomInt(1, 20),
    })).map((tag) => new Tag(tag)),
};

async function fetchData({ selectedFilter, search} : { selectedFilter: FilterOption, search: string }) {
    let query = supabase
        .from('tags')
        .select(`*`, { count: 'exact' });

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
    
    
    const processedData: Tag[] = data.map((tag: Tag) => new Tag(tag));
    return {processedData, count: count ?? 0};
}


/**
 * Tags Page
 */
function Tags() {
    const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
    const [search, setSearch] = useState('');
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['tags'], 
        queryFn: () => fetchData({ selectedFilter, search }),
    });

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={categoryStyle['root']}>
            <Helmet>
                <title>Tags | {`${config.appName}`}</title>
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
                        <h1>Tags Page</h1>
                        <span className={categoryStyle['dash']}></span>
                        <span className={categoryStyle['count']}>{data.count}개</span>
                    </header>
                    <aside className={`${categoryStyle['aside']} ${categoryStyle['item-4']}`}>
                        <Filter options={FILTER_OPTIONS} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
                        <Search search={search} setSearch={setSearch} />
                    </aside>
                    <div className={categoryStyle['item-5']}>
                        <ul className={styles['tags-list']}>
                            {data.processedData.map((tag, index) => (
                                <TagBlock key={index} tag={tag} />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Tags;