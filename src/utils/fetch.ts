import { useState, useCallback } from 'react';
import { supabase } from './supabase'; 

const usePaginatedFetch = (initialPageSize = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize  ] = useState(initialPageSize);

  const fetchData = useCallback(async (
    queryFn: (arg0: number, arg1: number) => PromiseLike<{ data: any; error: any; count: any; }> | { data: any; error: any; count: any; },
    processFn = (data: any) => data,
    page = currentPage
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error, count } = await queryFn(page, pageSize);

      if (error) throw error;

      const processedData = processFn(data || []);
      setData(processedData);
      setCurrentPage(page);

      if (count !== undefined && count !== null) {
        setTotalPages(Math.ceil(count / pageSize));
      } else {
        setTotalPages(0);
      }
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
    setPageSize,
    fetchData
  };
};

export default usePaginatedFetch;