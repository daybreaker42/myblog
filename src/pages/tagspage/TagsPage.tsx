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

// utils
import { fetchData } from './common/fetchData';
import { getRandomInt, getRandomString } from 'utils/random';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FILTER_OPTIONS } from './common/tagFilterOptions';
import Loading from 'components/loading/loading/Loading';
// constants

// mockup data
// const data = {
//     count: 200,
//     processedData: Array.from({ length: 200 }, (_, index) => ({
//         id: index,
//         name: getRandomString(getRandomInt(5, 15)),
//         article_cnt: getRandomInt(1, 20),
//     })).map((tag) => new Tag(tag)),
// };



/**
 * Tags Page
 */
function Tags() {
    const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
    const [search, setSearch] = useState('');
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['tags', { search, selectedFilter }], 
        queryFn: () => fetchData({ selectedFilter, search }),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <Loading />;
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