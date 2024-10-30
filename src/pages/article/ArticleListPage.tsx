// ArticleListPage.tsx
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { ArticleWithCategory } from 'models/model';
import { ArticleCard } from 'components/article_card/ArticleCard';
import Pagination from 'components/pagenation/Pagination';
import { supabase } from 'utils/supabase';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Nav from 'components/nav/Nav';

type SortOption = 'latest' | 'oldest' | 'popular';
const ITEMS_PER_PAGE = 10;

const fetchArticles = async ({ currentPage, sortBy, } : { currentPage: number, sortBy: SortOption}) => {
    let query = supabase
    .from('article')
    .select(`
        ${ArticleWithCategory.getArticleDefaultColumns()}`, { count: 'exact' })
    .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

    // Apply sorting
    switch (sortBy) {
    case 'latest':
        query = query.order('created_at', { ascending: false });
        break;
    case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
    case 'popular':
        query = query.order('view_cnt', { ascending: false });
        break;
    }

    const { data, error: supabaseError, count } = await query;

    if (supabaseError) {
        const errorMessage = supabaseError instanceof Error ? supabaseError.message : '게시물을 불러오는데 실패했습니다.';
        toast.error(errorMessage);
        throw supabaseError
    };

        const articles = data.map(article => new ArticleWithCategory(article));
        // setArticles(articles);
        // Calculate total pages from count
        // const total = data?.count ?? 0;
        // setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    return { data: articles, count: count ?? 0 };
  };

export const ArticleListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    let totalPages = 1;
    // const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState<SortOption>('latest');

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // 페이지 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (newSort: SortOption) => {
        setSortBy(newSort);
        setCurrentPage(1); // 정렬 변경시 첫 페이지로 이동
    };

    
    const { data, isPending, isError, error } = useQuery<{ data: ArticleWithCategory[], count: number }, Error>({
        queryKey: ['articles', currentPage, sortBy],
        queryFn: () => fetchArticles({ currentPage, sortBy }),
    });
    console.log(`count: ${data?.count}`);
    
    // setTotalPages(Math.ceil(data?.count ?? 0 / ITEMS_PER_PAGE));
    totalPages = Math.ceil(data?.count ?? 0 / ITEMS_PER_PAGE);

  return (
    <div>
        {/* <Nav isDarkMode={isDarkMode}  /> */}
        <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <header className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                <h1 className="text-4xl font-bold mb-2">전체 게시물</h1>
                <p className="text-gray-400">총 {data?.count}개의 게시물이 있습니다.</p>
                </div>
                <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="bg-gray-800 rounded-lg px-4 py-2 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                    <option value="popular">인기순</option>
                </select>
                </div>
            </div>
            </header>

            {isPending ? (
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                <div 
                    key={i} 
                    className="bg-gray-800 rounded-lg h-48 animate-pulse"
                />
                ))}
            </div>
            ) : isError ? (
            <div className="text-center py-12">
                <p className="text-red-400 mb-4">{error.message}</p>
                <button 
                onClick={() => setCurrentPage(1)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                다시 시도하기
                </button>
            </div>
            ) : data?.count === 0 ? (
            <div className="text-center py-12 text-gray-400">
                게시물이 없습니다.
            </div>
            ) : (
            <div className="space-y-6 mb-12">
                {data.data.map((article: ArticleWithCategory) => (
                <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            )}

            {totalPages > 1 && !isPending && !error && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            )}
        </div>
        </div>
    </div>
  );
};