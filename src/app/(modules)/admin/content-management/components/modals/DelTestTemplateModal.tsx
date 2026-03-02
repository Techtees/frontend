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
import { delTestTemplate } from '@/requests/admin';
import * as ToastLib from '@/atoms/Toast';

const DeleteTestTemplateModal = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, data }
  } = useStore();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (testId: string) => delTestTemplate(testId),
    onSuccess: () => {
      ToastLib.Toast.success('Test template deleted successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.TEST_TEMPLATES
      });
      toggleModals({});
    },
    onError: () => {
      ToastLib.Toast.error('Failed to delete test template');
    }
  });

  return (
    <Dialog
      modal={true}
      onOpenChange={() => toggleModals({ name: AppModals.DEL_TEST_TEMPLATE_MODAL, open: false })}
      open={isOpen.DEL_TEST_TEMPLATE_MODAL}
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Test Template</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this test template? This action is permanent.
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
            onClick={() => deleteMutation.mutate(data.id)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default observer(DeleteTestTemplateModal);
