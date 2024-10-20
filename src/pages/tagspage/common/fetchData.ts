import { FilterOption } from "models/interface";
import { Tag } from "models/model";
import { applyOrder } from "utils/applyOrder";
import { supabase } from "utils/supabase";

export async function fetchData({ selectedFilter, search} : { selectedFilter: FilterOption, search: string }) {
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
            case '이름 내림차순':
                query = applyOrder(query, 'name', false);
                break;
            case '이름 오름차순':
                query = applyOrder(query, 'name', true);
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
