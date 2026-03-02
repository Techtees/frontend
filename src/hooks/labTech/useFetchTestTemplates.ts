import { useQuery } from '@tanstack/react-query';
import { labTech } from './FetchKeyFactory';
import { useCallback } from 'react';

function select(res: INBTServerResp<TTestTemplatesResp>) {
  return res.data;
}

export function useFetchTestTemplates(): IQueryHookResponse<TTestTemplatesResp | undefined> {
  const meta = labTech.getTestTemplates();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, error, status };
}
