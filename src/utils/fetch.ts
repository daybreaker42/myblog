import { useState, useCallback } from 'react';

/**
// data fetch example

// 1. supabase init
import supabase from 'utils/supabase';

// 2. fetch function
const fetchArticle = (slug: string): (() => Promise<{ data: any; error: any }>) => async () => {
    const { data, error } = await supabase
        .from('article')
        .select(`${ARTICLE_DATA_COLUMNS.join(', ')},
        category:category_id(*),
        article_tags(
        id,
        tags(
            id,
            name
        )
        )`)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching article:', error.message);
        return { data: null, error };
    }
    // console.log('fetchArticle data:', data);
    
    return { data, error };
};

// 3. data process function
const processArticle = (data: any) => {
    return data;
}

// 4. Fetch data from server
const { data, loading, error, fetchData } = useFetch<Article>();
useEffect(() => {
    fetchData(fetchArticle, processArticle);
}, []);
*/



/**
 * Fetch data from server
 */
export const useFetch = <T, >() => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    
    const fetchData = useCallback(async (
        queryFn: () => PromiseLike<{ data: any; error: any; }> | { data: any; error: any; },
        processFn = (data: any) => data
    ) => {
        setLoading(true);
        setError(null);
    
        try {
            const { data, error } = await queryFn();
        
            if (error) throw error;
        
            const processedData = processFn(data || []) as T;
            setData(processedData);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);
    
    return {
        data,
        loading,
        error,
        fetchData
    };
};

/**
 * Fetch data from server
 */
export const useFetchArray = <T, >() => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    
    const fetchData = useCallback(async (
        queryFn: () => PromiseLike<{ data: any; error: any; }> | { data: any; error: any; },
        processFn = (data: any) => data
    ) => {
        setLoading(true);
        setError(null);
    
        try {
            const { data, error } = await queryFn();
        
            if (error) throw error;
        
            const processedData = processFn(data || []) as T[];
            // console.log('processedData:', processedData);
            
            setData(processedData);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);
    
    return {
        data,
        loading,
        error,
        fetchData
    };
};

/**
 * Fetch data with pagination
 */
export const usePaginatedFetch = <T,>(initialPageSize = 10) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);

    const fetchData = useCallback(async (
        queryFn: (page: number, pageSize: number) => PromiseLike<{ data: any; error: any; }> | { data: any; error: any; },
        processFn = (data: any) => data
    ) => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await queryFn(currentPage, pageSize);

            if (error) throw error;

            const processedData = processFn(data || []) as T[];
            setData(processedData);
            setTotalPages(Math.ceil(data.length / pageSize)); // 수정: totalPages 계산
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    return {
        data,
        loading,
        error,
        totalPages,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        fetchData
    };
};