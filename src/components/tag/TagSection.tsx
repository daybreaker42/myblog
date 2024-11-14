import { useQuery } from "@tanstack/react-query";
import { TagBlock } from "types/type";
import { jsonToTagBlocks } from "utils/jsonConvert";
import { supabase } from "utils/supabase";
import TagBlockComponent from "./TagBlock";

// Alternative Supabase query using joins
// TODO - 어차피 page에서 여러 article들 보여지면 해당 article들 tag들 모두 가져와야 함 -> 각 card마다 요청 보내지 말고, 한번에 가져오는 최적화 하기
async function fetchTags({ article_id }:{ article_id: number }){
    const { data: tags, count, error } = await supabase
      .from('article_tags')
      .select(`
        tags_id,
        tags (
          id,
          name
        )
      `, { count: 'exact' })
      .eq('article_id', article_id);
  
    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  
    // Extract the tags data from the joined result
    const processedTags: TagBlock[] = jsonToTagBlocks(tags.map(item => item.tags));
    return { data: processedTags, count };
  };

  /**
   * ArticleCard에서 사용되는 TagSection 컴포넌트
   * - ArticleCard의 하단에 보여지는 태그 목록
   */
export default function TagSection({ article_id }: { article_id: number }) {
    const { data, isFetching, error } = useQuery({
        queryKey: ["tags", article_id],
        queryFn: () => fetchTags({ article_id }),
        staleTime: 1000 * 60 * 60 * 1, // 1시간
        gcTime: 1000 * 60 * 60 * 1,    // 캐시: 1시간
        retry: 0,
    });

    if(isFetching){
        return <TagBlockComponent name='...' />
    }
    if(!data) return null;
    if(error){
        console.error({ error });
        return <TagBlockComponent name='...' />
    }
    return (
        <>
            {data?.data?.map(tag => (
                <TagBlockComponent key={tag.id} name={tag.name} />
            ))}
        </>
    );
}