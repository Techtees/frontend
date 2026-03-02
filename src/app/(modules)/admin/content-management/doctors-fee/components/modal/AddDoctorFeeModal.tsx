import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { AdminCreateDoctorFeeSchema, TAdminCreateDoctorFeeSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useMutation } from '@tanstack/react-query';
import { postCreateDoctorFee, putUpdateDoctorFee } from '@/requests/admin';
import * as ToastLib from '@/atoms/Toast';

const AdminDoctorFeeModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, doctorFeeModal }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = doctorFeeModal.id !== '';

  const form = useForm<TAdminCreateDoctorFeeSchema>({
    defaultValues: {
      feature: '',
      value: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminCreateDoctorFeeSchema),
    reValidateMode: 'onSubmit'
  });

  const createMutation = useMutation({
    mutationFn: postCreateDoctorFee,
    onSuccess: () => {
      ToastLib.Toast.success('Doctor fee created successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.DOCTORS_FEES
      });
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create doctor fee');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { feature?: string; value?: string } }) =>
      putUpdateDoctorFee(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Doctor fee updated successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.DOCTORS_FEES
      });
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update doctor fee');
    }
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit: SubmitHandler<TAdminCreateDoctorFeeSchema> = (formData) => {
    if (isEditMode) {
      updateMutation.mutate({
        id: doctorFeeModal.id,
        payload: formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        feature: doctorFeeModal?.feature || '',
        value: doctorFeeModal?.value || ''
      });
    } else {
      form.reset({
        feature: '',
        value: ''
      });
    }
  }, [isEditMode, doctorFeeModal, form]);

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.CREATE_DOCTOR_FEE_MODAL}
      title={isEditMode ? 'Edit Doctor Fee' : 'Add Doctor Fee'}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <FormField
              control={form.control}
              name="feature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., doctorRecommendation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Add'} Doctor Fee
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminDoctorFeeModal);
