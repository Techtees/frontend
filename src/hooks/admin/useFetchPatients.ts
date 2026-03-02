import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminPatientsResp>) => res.data;

export function useFetchPatients(
  query: Partial<TAdminPatientQuery>
): IQueryHookResponse<TAdminPatientsResp | undefined> {
  const meta = superAdmin.getPatients(query);
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
