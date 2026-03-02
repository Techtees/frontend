'use client';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import {
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Dialog
} from '@/components/ui/dialog';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import Button from '@/atoms/Buttons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';
import server from '@/requests';
import * as ToastLib from '@/atoms/Toast';

const DeleteDoctorFee = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, doctorFeeModal }
  } = useStore();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => server.delete(SUPER_ADMIN.UPDATE_DOCTOR_FEE.replace(':id', id)),
    onSuccess: () => {
      ToastLib.Toast.success('Doctor fee deleted successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.DOCTORS_FEES
      });
      toggleModals({});
    },
    onError: () => {
      ToastLib.Toast.error('Failed to delete doctor fee');
    }
  });

  return (
    <Dialog
      modal={true}
      onOpenChange={() => toggleModals({ name: AppModals.DEL_DOCTOR_FEE_MODAL, open: false })}
      open={isOpen.DEL_DOCTOR_FEE_MODAL}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Doctor Fee</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this doctor fee? This action is permanent.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 flex items-center justify-between space-x-3 sm:justify-end">
          <Button
            type="button"
            variant="transparent"
            text="Discard"
            disabled={deleteMutation.isPending}
            className="h-11 w-36"
            onClick={() => toggleModals({})}
          />
          <Button
            type="button"
            variant="danger"
            text="Delete"
            disabled={deleteMutation.isPending}
            isLoading={deleteMutation.isPending}
            className="h-11 w-36"
            onClick={() => deleteMutation.mutate(doctorFeeModal.id)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default observer(DeleteDoctorFee);
