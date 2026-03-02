import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminTestTemplateSchema, TAdminTestTemplateSchema } from './validation';
import { Button } from '@/components/ui/button';
import { Loader, Plus, Trash2 } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';
import InputField from '@/atoms/fields/NewInput';
import { postTestTemplate } from '@/requests/admin';
import { useFetchTestTemplateById } from '@/hooks/admin/useFetchTestTemplateById';
import { useFetchSingleTestId } from '@/hooks/admin/useFetchSingleTestId';
import { useEffect, useMemo } from 'react';
import * as ToastLib from '@/atoms/Toast';

const AdminTestTemplateModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, testTemplateModal }
  } = useStore();

  const queryClient = useQueryClient();
  const hasTestId = Boolean(testTemplateModal.testId);
  const { data, status } = useFetchTestTemplateById(hasTestId ? testTemplateModal.testId : '');
  const templateTestId = data?.testId || data?.test?.id || testTemplateModal.testId;
  const { data: testData } = useFetchSingleTestId(templateTestId || '');

  const form = useForm<TAdminTestTemplateSchema>({
    defaultValues: {
      testId: '',
      parameters: [{ name: '', measurement_unit: '', reference_range: '' }]
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminTestTemplateSchema),
    reValidateMode: 'onSubmit'
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'parameters'
  });

  const mutation = useMutation({
    mutationFn: postTestTemplate,
    onSuccess: () => {
      ToastLib.Toast.success(data ? 'Template updated.' : 'Template created.');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.TEST_TEMPLATES
      });
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to save test template.');
    }
  });

  const testDisplayName = useMemo(() => {
    return data?.test?.name || data?.testName || testData?.name || templateTestId || '';
  }, [data?.test?.name, data?.testName, testData?.name, templateTestId]);

  const onSubmit: SubmitHandler<TAdminTestTemplateSchema> = (formData) => {
    if (!formData.testId) {
      ToastLib.Toast.error('Please select a test.');
      return;
    }

    mutation.mutate({
      testId: formData.testId,
      parameters: formData.parameters
    });
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  const handleAddParameter = () => {
    append({ name: '', measurement_unit: '', reference_range: '' });
  };

  useEffect(() => {
    if (data) {
      const normalizedParams = (data.parameters || []).map((parameter) => ({
        name: parameter.name,
        measurement_unit:
          (parameter as any).measurement_unit || (parameter as any).measurementUnit || '',
        reference_range:
          (parameter as any).reference_range || (parameter as any).referenceRange || ''
      }));
      form.reset({
        testId: templateTestId || '',
        parameters: normalizedParams.length
          ? normalizedParams
          : [{ name: '', measurement_unit: '', reference_range: '' }]
      });
    } else {
      form.reset({
        testId: templateTestId || '',
        parameters: [{ name: '', measurement_unit: '', reference_range: '' }]
      });
    }
  }, [data, form, templateTestId]);

  if (hasTestId && status === 'pending') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.ADMIN_TEST_TEMPLATE}
        className="!max-w-[600px]"
        title="Test Template"
      >
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading template...</span>
        </div>
      </XModal>
    );
  }

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.ADMIN_TEST_TEMPLATE}
      className="!max-w-[600px]"
      title="Test Template"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={mutation.isPending} className="w-full">
              <FormField
                control={form.control}
                name="testId"
                render={({ field }) => (
                  <div className="space-y-2">
                    <InputField label="Test" placeholder="" value={testDisplayName} disabled />
                    <input type="hidden" {...field} value={field.value || templateTestId || ''} />
                  </div>
                )}
              />

              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-neutral-700">Parameters</h4>
                <Button type="button" variant="outline" onClick={handleAddParameter}>
                  <Plus size={16} /> Add parameter
                </Button>
              </div>

              <div className="flex flex-col space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="rounded-lg border border-neutral-100 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">
                        Parameter {index + 1}
                      </span>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-200 text-red-500"
                          onClick={() => remove(index)}
                        >
                          <Trash2 size={14} /> Remove
                        </Button>
                      )}
                    </div>

                    <div className="mt-3 flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name={`parameters.${index}.name`}
                        render={({ field: paramField }) => (
                          <InputField label="Name" placeholder="Haemoglobin (Hb)" {...paramField} />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`parameters.${index}.measurement_unit`}
                        render={({ field: paramField }) => (
                          <InputField label="Measurement unit" placeholder="g/dL" {...paramField} />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`parameters.${index}.reference_range`}
                        render={({ field: paramField }) => (
                          <InputField
                            label="Reference range"
                            placeholder="M: 13.0-17.0 / F: 12.0-15.0"
                            {...paramField}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={mutation.isPending}>
                {mutation.isPending && <Loader className="animate-spin" />}
                {data ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminTestTemplateModal);
