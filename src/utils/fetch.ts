import { useState, useCallback } from 'react';

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
        currentPage,
        totalPages,
        pageSize,
        setCurrentPage,
        setPageSize,
        fetchData
    };
};