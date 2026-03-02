import { useCallback } from 'react';
import { superAdmin } from './FetchKeyFactory';
import { useQuery } from '@tanstack/react-query';

const select = (res: INBTServerResp<TAdminDoctorsFeeResp>) => res.data;

export function useFetchDoctorsFees(): IQueryHookResponse<TAdminDoctorsFeeResp | undefined> {
  const meta = superAdmin.getDoctorsFees();
  const memoizedSelect = useCallback(select, []);

  const { data, isLoading, status, error } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, isLoading, status, error };
}
