import { useQuery } from '@tanstack/react-query';
import { TestService } from '@/requests/test';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useTestsSingle = () => {
  return useQuery<AllTestResponse>({
    queryKey: ['allSingle-test'],
    queryFn: TestService.getAllTests
  });
};

export const useTestPackages = () => {
  return useQuery<AllPackageTestResponse>({
    queryKey: ['test-packages'],
    queryFn: TestService.getPackageTest
  });
};

export const useAllCategoryTests = (params?: TestQueryParams, enabled: boolean = true) => {
  return useQuery<PaginatedResponse<any>>({
    queryKey: ['all-category-tests', params],
    queryFn: () => TestService.getAllCategoryTests(params),
    enabled: enabled && !!(params?.type || params?.category),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

//  package and categorty tests custom hooks
export const useTestsWithLoadMore = (
  type?: 'SINGLE' | 'PACKAGE',
  category?: 'MOLECULAR' | 'ADVANCED_IMAGING',
  search?: string,
  enabled: boolean = true
) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Base query parameters
  const baseParams = {
    ...(type && { type }),
    ...(category && { category }),
    limit: 5, // Fixed limit of 5 per load
    page,
    ...(search && { search }),
    status: 'ACTIVE' as const // Only show active tests
  };

  const { data, isLoading, error, refetch } = useAllCategoryTests(baseParams, enabled);

  // Reset when search or tab changes
  useEffect(() => {
    if (enabled) {
      setPage(1);
      setAllData([]);
    }
  }, [type, category, search, enabled]);

  // Accumulate data when new data arrives
  useEffect(() => {
    if (enabled && data?.data?.requests) {
      if (page === 1) {
        // First load or reset
        setAllData(data.data.requests);
      } else {
        // Load more - append new data
        setAllData((prev) => [...prev, ...data.data.requests]);
      }
      setIsLoadingMore(false);
    }
  }, [data, page, enabled]);

  const loadMore = useCallback(() => {
    // Always try to load more if we have data and not currently loading
    if (allData.length > 0 && !isLoading && enabled) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [allData.length, isLoading, enabled]);

  // Determine if there are more items - be more permissive
  const hasMore = useMemo(() => {
    if (!enabled) return false;

    // If we have pagination info and it says hasNext, use that
    if (data?.data?.pagination?.hasNext !== undefined) {
      return data.data.pagination.hasNext;
    }

    // If we just loaded exactly 5 items (our limit), assume there might be more
    if (data?.data?.requests?.length === 5) {
      return true;
    }

    // If we have no data yet, don't show load more
    if (allData.length === 0) {
      return false;
    }

    // Default to false
    return false;
  }, [data?.data?.pagination?.hasNext, data?.data?.requests?.length, allData.length, enabled]);

  const totalItems = data?.data?.pagination?.total || 0;

  return {
    data: enabled ? allData : [],
    isLoading: isLoading && page === 1 && enabled, // Only show loading for initial load
    isLoadingMore: isLoadingMore && enabled,
    error: enabled ? error : null,
    loadMore,
    hasMore: hasMore && enabled,
    totalItems: enabled ? totalItems : 0,
    currentCount: enabled ? allData.length : 0,
    refetch: () => {
      if (enabled) {
        setPage(1);
        setAllData([]);
        refetch();
      }
    }
  };
};

// Specific hooks for each test type
export const useLabTestsWithLoadMore = (search?: string, enabled: boolean = true) => {
  return useTestsWithLoadMore('SINGLE', undefined, search, enabled);
};

export const usePackageTestsWithLoadMore = (search?: string, enabled: boolean = true) => {
  return useTestsWithLoadMore('PACKAGE', undefined, search, enabled);
};

export const useMolecularTestsWithLoadMore = (search?: string, enabled: boolean = true) => {
  return useTestsWithLoadMore(undefined, 'MOLECULAR', search, enabled);
};

export const useAdvancedImagingTestsWithLoadMore = (search?: string, enabled: boolean = true) => {
  return useTestsWithLoadMore(undefined, 'ADVANCED_IMAGING', search, enabled);
};
