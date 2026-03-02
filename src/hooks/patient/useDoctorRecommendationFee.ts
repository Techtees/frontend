import { useQuery } from '@tanstack/react-query';
import server from '@/requests';
import { SUPER_ADMIN } from '@/constants/api';

type DoctorFeeResponse = {
  features: Array<{
    id: string;
    feature: string;
    value: string;
    status: string;
  }>;
};

const fetchDoctorFees = async (): Promise<DoctorFeeResponse> => {
  const response = await server.get<{
    data: DoctorFeeResponse;
  }>(SUPER_ADMIN.DOCTORS_FEES);
  return response.data.data;
};

export const useDoctorRecommendationFee = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['doctorRecommendationFee'],
    queryFn: fetchDoctorFees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: true // Always fetch on mount
  });

  const recommendationFee = data?.features?.find(
    (feature) => feature.feature === 'doctorRecommendation'
  )?.value;

  // Return the fee, with fallback to 2000 only after first load attempt
  const fee = recommendationFee ? Number(recommendationFee) : 2000;

  return {
    fee,
    isLoading,
    isSuccess,
    error
  };
};
