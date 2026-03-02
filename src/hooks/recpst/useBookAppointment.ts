import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookAppointment } from '@/requests/recept';

export const useReceptionistBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receptionist-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['approved-appointments'] });
    }
  });
};
