import { useQuery } from "@tanstack/react-query";
import { PINNED_ARTICLE_COLUMNS } from "utils/constants";
import jsonToArticle from "utils/jsonConvert";
import { supabase } from "utils/supabase";
import PinnedArticleCard from "./PinnedArticleCard";
import { ArticleStatus, TimeUnit } from "types/type";

const PINNED_ARTICLE_SHOW_NUM = 10; // 고정글 최대 10개까지만 보여주기

/**
 * 고정글(공지사항)을 가져옵니다.
 * - 최신순으로 정렬
 * - 최대 10개까지만 가져옵니다. - PINNED_ARTICLE_SHOW_NUM에 정의됨
 */
async function fetchPinnedArticles() {
    const { data, count, error } = await supabase
    .from("article")
    .select(PINNED_ARTICLE_COLUMNS, { count: "exact"})
    .eq("is_pinned", true)
    .order("created_at", { ascending: false })
    .limit(PINNED_ARTICLE_SHOW_NUM);

    if (error) {
        throw error;
    }

    // // 5초 대기
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return { data: jsonToArticle(data), count };
}


export default function PinnedArticleSection() {
    const {data, isFetching, isError, error} = useQuery({
        queryKey: ["pinnedArticles"],
        queryFn: fetchPinnedArticles,
        placeholderData: { data: [], count: 0 },
        retry: 1,
        staleTime: 1000 * 60 * 1, // 1분
    });

    if (isFetching) {
        return <div>로딩 중...</div>;
    }
    if (isError) {
        return <div>에러 발생: {error.message}</div>;
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-amber-500">📌 공지사항</h2>
                    <span className="text-sm text-gray-400">(2개의 고정글)</span>
                </div>
                <a href="/notices" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                    더보기 →
                </a>
            </div>

            <div className="grid gap-4">
                <PinnedArticleCard article={{
                    id: 1,
                    title: '공지사항1',
                    description: '공지사항1입니다.',
                    created_at: new Date(),
                    reading_time: 5,
                    view_cnt: 100,
                    like_cnt: 10,
                    slug: 'notice1',
                    content: '공지사항1입니다.',
                    status: ArticleStatus.NORMAL,
                    category_id: 1,
                    is_comment_blocked: false,
                    thumbnail_img: 'https://via.placeholder.com/150',
                    time_unit: TimeUnit.SEC,
                    comment_cnt: 10,
                    is_upload_queued: false,
                    is_pinned: true
                }} />
            </div>
        </div>

    );
}