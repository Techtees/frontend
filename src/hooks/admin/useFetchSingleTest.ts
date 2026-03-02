import { useCallback, useMemo } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getSingleTests } from '@/requests/admin';

const select = (res: INBTServerResp<INBTPaginatedData<TAdminTestItem>>) => res.data;

export function useFetchSingleTest(
  query: Partial<TAdminTestQuery>
): IQueryHookResponse<INBTPaginatedData<TAdminTestItemBase> | undefined> {
  const meta = superAdmin.getSingleTest(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}

export function useFetchInfiniteSingleTest(query: TAdminTestQuery) {
  const meta = superAdmin.getSingleTest(query);

  const queryKey = meta?.keys();
  queryKey.push('infinite');

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<INBTPaginatedData<TAdminTestItemBase>, Error>({
      queryKey: queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getSingleTests({ ...query, page: pageParam as number });
        return res.data.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.pagination) {
          return null;
        }
        const { totalPages, page } = lastPage.pagination;
        if (totalPages > page) {
          return page + 1;
        }
        return null;
      },
      enabled: !!queryKey && queryKey.length > 0
    });

  const processedData = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages
      .flatMap((page) => page?.requests ?? [])
      .map((el) => ({
        value: el.id,
        label: el.name,
        disabled: el.status === 'inactive'
      }));
  }, [data]);

  return {
    data,
    processedData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };
}
