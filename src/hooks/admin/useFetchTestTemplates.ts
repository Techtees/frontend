import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdmin } from './FetchKeyFactory';

const select = (res: INBTServerResp<TAdminTestTemplateItem[]>) => res.data;

export function useFetchTestTemplates(): IQueryHookResponse<TAdminTestTemplateItem[] | undefined> {
  const meta = superAdmin.getTestTemplates();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
