import { useQuery } from "@tanstack/react-query";
import { Tag } from "types/type";
import { jsonToTags } from "utils/jsonConvert";
import { supabase } from "utils/supabase";
import PopularTagBlock from "./PopularTagBlock";
import { ErrorCard } from "components/error/ErrorCard";

/**
 * 인기 태그 목록 가져오기
 * - 개수: 10개
 * - 정렬: 게시물 개수 내림차순
 */
async function fetchPopularTags(): Promise<Tag[]>{
    const {data, error} = await supabase
    .from('tags')
    .select('*')
    .order('total_article_cnt', {ascending: false})
    .limit(10);
    
    if(error){
        console.error('Error fetching popular tags:', error);
        throw error;
    }
    console.log(data);
    
    const processedTags = jsonToTags(data) as Tag[];
    console.log(processedTags);
    
    return processedTags;
}

/**
 * 인기 태그 섹션
 * - 인기 태그 목록을 가져와서 PopularTagBlock으로 렌더링
 */
export default function PopularTagSection(){
    const {data, isFetching, error} = useQuery({
        queryKey: ['popular-tags'],
        queryFn: fetchPopularTags,
        staleTime: 1000 * 60 * 60 * 1, // 1시간
        gcTime: 1000 * 60 * 60 * 1,    // 캐시: 1시간
        retry: 0,
    });


    if(isFetching){
        return <div>Loading...</div>
    }
    // if(error){
    //     console.error({ error });
    //     return <ErrorCard error={error}/>
    // }
    return (
        <section className="mb-12">
            <h2 className="text-lg font-semibold mb-4 text-amber-500">인기 태그</h2>
            { error ? <ErrorCard error={error}/> :
                <div className="flex flex-wrap gap-3">
                {data?.map(tag => (
                    <PopularTagBlock key={tag.id} name={tag.name} count={tag.total_article_cnt} />
                ))}
            </div>
            }
        </section>
    );
}