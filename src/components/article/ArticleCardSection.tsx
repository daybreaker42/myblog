import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ErrorCard } from "components/error/ErrorCard";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTICLE_CARD_COLUMNS, ARTICLES_PER_PAGE, FILTER_RANGE, SORT_TYPES } from "utils/constants";
import jsonToArticle from "utils/jsonConvert";
import { supabase } from "utils/supabase";
import { ArticleCard } from "./ArticleCard";
import Pagination from "components/Pagination";
import { transformCreatedAt } from "utils/date";


interface FetchArticlesParams {
    sortType: string;
    filterRange: number;
    page: number;
}

/**
 * 게시물 목록을 가져와 ArticleCard 컴포넌트로 렌더링합니다.
 */
async function fetchArticles({ sortType, filterRange, page }: FetchArticlesParams) {
    let query = supabase.from("article").select(ARTICLE_CARD_COLUMNS, { count: "exact" });

    // filterRange 필터링
    if (filterRange === FILTER_RANGE.WEEK) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte("created_at", transformCreatedAt(weekAgo));
    } else if (filterRange === FILTER_RANGE.MONTH) {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte("created_at", transformCreatedAt(monthAgo));
    } else if (filterRange === FILTER_RANGE.YEAR) {
        const yearAgo = new Date();
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        query = query.gte("created_at", transformCreatedAt(yearAgo));
    }

    // page 필터링
    const from = (page - 1) * ARTICLES_PER_PAGE;
    const to = from + ARTICLES_PER_PAGE - 1;

    if (sortType === SORT_TYPES.LATEST) {
        query = query.order("created_at", { ascending: false }).range(from, to);
    } else {
        query = query.order("view_cnt", { ascending: false }).range(from, to);
    }

    const { data, count, error } = await query;

    if (error) {
        throw error;
    }

    // // 5초 대기
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log({ data});
    
    const processedData = jsonToArticle(data);
    return { processedData, count };
}


export default function ArticleCardSection() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const [sortType, setSortType] = useState(SORT_TYPES.LATEST);
    const [filterRange, setFilterRange] = useState(FILTER_RANGE.ALL);

    // tanstack query - config
    const { data, isFetching, isError, error } = useQuery({
        queryKey: ["article-cards", sortType, filterRange, page], 
        queryFn: ()=> fetchArticles({ sortType, filterRange, page }),
        retry: 1,
        staleTime: 1000 * 60 * 1, // 1분
    });
    const total = data?.count || 0;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    // console.log(`sortType: ${sortType}, filterRange: ${filterRange}`);
//    console.log({ data });
    

    return (
        <>
            {/* <!-- 탭 네비게이션 --> */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-800">
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 transition-colors duration-300 ${sortType === SORT_TYPES.LATEST ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-amber-500 border-b-2 border-transparent'}`}
                        onClick={() => setSortType(SORT_TYPES.LATEST)}
                    >
                        최신글
                    </button>
                    <button
                        className={`px-4 py-2 transition-colors duration-300 ${sortType === SORT_TYPES.POPULAR ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-amber-500 border-b-2 border-transparent'}`}
                        onClick={() => setSortType(SORT_TYPES.POPULAR)}
                    >
                        인기글
                    </button>
                </div>

                {/* 검색 범위 filter */}
                <div className="flex items-center gap-2">
                    <select
                        className="bg-[#111111] border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-400 focus:outline-none focus:border-amber-500"
                        value={filterRange}
                        onChange={(e) => setFilterRange(Number(e.target.value))}
                    >
                        <option value={FILTER_RANGE.ALL}>전체</option>
                        <option value={FILTER_RANGE.WEEK}>최근 일주일</option>
                        <option value={FILTER_RANGE.MONTH}>최근 한 달</option>
                        <option value={FILTER_RANGE.YEAR}>최근 일 년</option>
                    </select>
                </div>
            </div>
                
            {/* <!-- 게시물 그리드 --> */}
            <div className="grid gap-6">
                {isFetching ? <div>Loading...</div> : 
                    isError ? <ErrorSection error={error} setSearchParams={setSearchParams} navigate={navigate} /> :
                     !data ? <div>데이터가 없습니다.</div> :                    
                        data.processedData.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                }
            </div>
            
            {/* <!-- 페이지네이션 --> */}
            <Pagination total={total} page={page} perPage={ARTICLES_PER_PAGE} onPageChange={handlePageChange}/>
        </>
    );
}

function ErrorSection({error, setSearchParams, navigate}: {error: any, setSearchParams: any, navigate: any}) {
    if(error.code === 'PGRST103'){
        return <ErrorCard error={error} buttonName="1페이지로 이동" handleFn={()=>setSearchParams({ page: "1"})} />;
    }
    return <ErrorCard error={error} buttonName="홈으로 이동" handleFn={()=>navigate('/')} />;
}
