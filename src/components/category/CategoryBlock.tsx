import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Category } from "types/type";

import { CATEGORY_BLOCK_COLUMNS } from "utils/constants";
import { jsonToCategory } from "utils/jsonConvert";
import { supabase } from "utils/supabase";

async function fetchCategory(category_id: number): Promise<Category> {
    const { data, error } = await supabase
        .from("category")
        .select(CATEGORY_BLOCK_COLUMNS)
        .eq("id", category_id)
        .single();

    if (error) {
        throw error;
    }

    // 5초 대기
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const category = jsonToCategory(data);
    return category;
}

// TODO - 나중에 suspense 등 사용해서 articlecard와의 waterfall 현상 제거하기
export default function CategoryBlock({ category_id }: { category_id: number }) {
    const { data, isFetching, isError, error } = useQuery<Category>({
        queryKey: ["category-block", category_id],
        queryFn: () => fetchCategory(category_id),
        staleTime: 1000 * 60 * 60 * 1, // 1시간
        gcTime: 1000 * 60 * 60 * 1,    // 캐시: 1시간
        retry: 1,
    });

    if(isError){
        console.error({ error });
    }

    return (
        <Link to={`/category/${data?.name}`}>
            {isFetching ? (
                <span className="px-2 py-1 bg-amber-500 text-black text-sm rounded-md">...</span>
            ) : isError ? (
                <span className="px-2 py-1 bg-red-500 text-white text-sm rounded-md">...</span>
            ) : (
                <span className="px-2 py-1 bg-amber-500 text-black text-sm rounded-md">{data?.name}</span>
            )}
        </Link>
    );
}