import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminTestTemplateItem | TAdminTestTemplateItem[]>) => res.data;

export function useFetchTestTemplateById(
  testId: string
): IQueryHookResponse<TAdminTestTemplateItem | undefined> {
  const meta = superAdmin.getTestTemplateById(testId);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    enabled: Boolean(testId)
  });

  const normalizedData = useMemo(() => {
    if (!data) return undefined;
    if (Array.isArray(data)) {
      return data.find((item) => item.testId === testId) ?? data[0];
    }
    return data;
  }, [data, testId]);

  return { data: normalizedData, isLoading, status, error };
}
