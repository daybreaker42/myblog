import Nav from "components/Nav";
import { Helmet } from "react-helmet-async";
import CategoryCard from "components/category/CategoryCard";
import { supabase } from "utils/supabase";
import { jsonToCategory, jsonToTags } from "utils/jsonConvert";
import { useQuery } from "@tanstack/react-query";
import { ErrorCard } from "components/error/ErrorCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SEARCH_DEBOUNCE_TIME } from "utils/constants";
import TagCard from "components/tag/TagCard";
import { Category, Tag } from "types/type";

const LAYOUT_TYPE = {
    CATEGORY:{
        title: 'Category',
        table: 'category',
        name: '카테고리'
    },
    TAG:{
        title: 'Tag',
        table: 'tags',
        name: '태그'
    }
}

interface CategoryTagSearchProps{
    table: string;
    keyword: string;
}
/**
 * 카테고리 / 태그 페이지 레이아웃
 * - 카테고리와 태그 페이지에서 공통으로 사용되는 레이아웃
 * - 카테고리와 태그 페이지에서는 카테고리/태그 목록을 보여주고 검색 기능을 제공
 * 
 * 카테고리/태그 목록 가져오기
 * - table명을 받아서 카테고리인지 태그인지 구분하여 데이터 가져오기
 * @param table - 카테고리인지 태그인지 구분
 * @param keyword - 검색어
 * @returns {data, count} - 데이터와 데이터 개수 반환
 */
async function fetchCategoryOrTagList({ table, keyword } : CategoryTagSearchProps): Promise<{data: Category[] | Tag[] | undefined, count: number}>{
    if(!table) throw new Error('table is required');
    
    // 일단은 table명을 소문자로 변경하여 category인지 tags인지 확인
    // FIXME 하드코딩한 방식이라 추후 수정 필요
    // TODO - recent_article_date 추가
    const tableName = table.toLowerCase() === 'category' ? 'category' : 'tags';
    let query = supabase
    .from(tableName)
    .select('*', {count: 'exact'});

    // 검색어가 있을 경우 - name 필드에 대소문자 구분없이 검색
    if(keyword){
        query = query.ilike('name', `%${keyword}%`);
    }

    const {data, count, error} = await query;

    if(error){
        console.error('Error fetching categories:', error);
        throw error;
    }
    
    let processedCategories: Category[] | Tag[] | null = null;
    if(tableName === 'category'){
        processedCategories = data.map((item: any) => jsonToCategory(item));
    }else{
        // 태그일 경우
        processedCategories = jsonToTags(data);
    }

    console.log('processedCategories:', processedCategories);
    
    return {data: processedCategories, count: count || 0};
}

/**
 * Tag, Category 페이지 레이아웃 - 서로 공유
 * - 각 페이지 컴포넌트에서 해당 컴포넌트에 title만 바꿔서 전달하는 방식으로 사용
 * - fetch function에서도 기능이 동일하여 title에서 table명을 추출하여(하드코딩 사용) 데이터를 가져옴
 */
export default function CategoryLayout({ title, popular } : { title: string, popular?: JSX.Element }) {
    const appName = process.env.REACT_APP_SITE_NAME;
    const pageType = title === LAYOUT_TYPE.CATEGORY.title ? LAYOUT_TYPE.CATEGORY : LAYOUT_TYPE.TAG;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { data, isFetching, error } = useQuery({
        queryKey: ['category-tags', title, search],
        queryFn: () => fetchCategoryOrTagList({ table: title, keyword: search }),
        staleTime: 1000 * 60 * 60 * 1, // 1시간
        gcTime: 1000 * 60 * 60 * 1, // 캐시: 1시간
        retry: 1,
    });

    // 검색어 debounce 처리 부분
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            // 여기서 검색어 설정
            setSearch(value);
        }, SEARCH_DEBOUNCE_TIME);
    };

    useEffect(() => {
        // 처음 렌더링 시에 txt input에 focus
        if (inputRef.current) {
            inputRef.current.focus();
        }
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);
    
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title} | {appName}</title>
                <meta name="description" content={`${appName} - ${title}페이지`}/>
            </Helmet>
            <div className="Main bg-[#0a0a0a] text-gray-200 min-h-screen">
                <header className="bg-[#111111] border-b border-gray-800 sticky top-0 z-50">
                    <Nav />
                </header>
                <main className="max-w-4xl mx-auto px-4 py-8">
                    {/* <!-- 1. 태그/카테고리 목록 페이지 (/tag 또는 /category) --> */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold mb-8">{title}</h1>
                        
                        {/* <!-- 검색바 --> */}
                        <div className="mb-8">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-full px-4 py-3 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors pl-10"
                                    onChange={handleInputChange}
                                    ref={inputRef}
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* 인기 섹션 */}
                        {popular}

                        {/* <!-- 카테고리/태그 목록 --> */}
                        { data?.count === 0 ?
                            <CategoryCard category={null} keyword={search}/>
                            // pagetype에 따라 grid col 변경 - 카테고리는 2개, 태그는 3개
                        : <ul className={`grid grid-cols-1 ${pageType === LAYOUT_TYPE.CATEGORY ? 'md:grid-cols-2 gap-6' : 'sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
                            { isFetching ? <div>loading...</div>
                                : error ? <ErrorCard error={error} buttonName="홈으로 가기" handleFn={()=>navigate('/')}/>
                                    : data?.data?.map((element: any) => (
                                        <li key={element.id}>{
                                            // pagetype에 따라 카테고리/태그 카드 렌더링
                                                pageType === LAYOUT_TYPE.CATEGORY ?
                                                <CategoryCard category={element} />
                                                : <TagCard tag={element} />
                                            }
                                        </li>
                                    ))}
                        </ul>}
                    </div>
                </main>
            </div>
        </>
    );
}