import { useQuery } from "@tanstack/react-query";
import { Tag, TagBlock } from "types/type";
import { jsonToTags } from "utils/jsonConvert";
import { supabase } from "utils/supabase";
import PopularTagBlock from "./PopularTagBlock";

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
    return (
        <section className="mb-12">
            <h2 className="text-lg font-semibold mb-4 text-amber-500">인기 태그</h2>
                <div className="flex flex-wrap gap-3">
                {data?.map(tag => (
                    <PopularTagBlock key={tag.id} name={tag.name} count={tag.total_article_cnt} />
                ))}
            </div>
        </section>
    );
}