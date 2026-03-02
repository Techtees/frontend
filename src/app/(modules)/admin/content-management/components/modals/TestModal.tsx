import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminSingleTestSchema, TAdminSingleTestSchema } from './validation';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { testCategory } from '@/constants/data';
import Input from '@/atoms/fields/NewInput';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import TextareaField from '@/atoms/fields/TextAreaField';
import InputNumberField from '@/atoms/fields/NumberInput';
import { useFetchSingleTestId } from '@/hooks/admin/useFetchSingleTestId';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';

const AdminTestModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, testDetails },
    AdminStore: { addSingleTest, updateSingleTest, isLoading }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = testDetails.testId !== '';

  const { data, status } = useFetchSingleTestId(testDetails.testId);

  const form = useForm<TAdminSingleTestSchema>({
    defaultValues: {
      name: '',
      description: '',
      requirements: '',
      category: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminSingleTestSchema),
    reValidateMode: 'onSubmit'
  });

  useEffect(() => {
    if (isEditMode && data) {
      const resetData: any = {
        name: data.name || '',
        description: data.description || '',
        testIds: data?.tests?.map((test) => ({ value: test.id, label: test.name })) ?? [],
        category: data.category
      };

      if (data.price) resetData.price = data.price;
      if (data.discountedPrice) resetData.discountedPrice = data.discountedPrice;
      if (data.requirements.length > 0) resetData.requirements = data.requirements.join(', ');

      form.reset(resetData);
    } else if (!isEditMode) {
      form.reset({
        name: '',
        description: '',
        requirements: '',
        category: ''
      });
    }
  }, [isEditMode, data, form]);

  const onSubmit: SubmitHandler<TAdminSingleTestSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.STATS
      });
      toggleModals();
    };
    if (isEditMode) {
      updateSingleTest(testDetails.testId, formData, cbFn);
      return;
    }
    addSingleTest(formData, cbFn);
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  if (isEditMode && status === 'pending') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.ADMIN_SINGLE_TEST}
        className="!max-w-[350px]"
        title="Single Test"
      >
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading test data...</span>
        </div>
      </XModal>
    );
  }

  if (isEditMode && status === 'error') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.ADMIN_SINGLE_TEST}
        className="!max-w-[350px]"
        title="Single Test"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4 text-red-500">Failed to load test data. Please try again.</p>
          <Button onClick={handleCloseModal} variant="outline">
            Close
          </Button>
        </div>
      </XModal>
    );
  }

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.ADMIN_SINGLE_TEST}
      className="!max-w-[350px]"
      title="Single Test"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.single_test} className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div>
                    <Input label="Name" placeholder="test name..." required {...field} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div>
                    <TextareaField
                      label="Description"
                      placeholder="test description..."
                      required
                      {...field}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <div>
                    <TextareaField
                      label="Requirements"
                      placeholder="Requirement 1, requirement 2, ....."
                      description="separate requirements with ','"
                      {...field}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field: { onChange, ...rest } }) => (
                  <div>
                    <InputNumberField
                      label="Price"
                      prefix="₦"
                      thousandSeparator=","
                      min={1}
                      decimalScale={0}
                      placeholder="₦10,000.00"
                      allowNegative={false}
                      allowLeadingZeros={false}
                      valueIsNumericString={true}
                      onValueChange={(values) => {
                        onChange(parseInt(values.value) || 0);
                      }}
                      {...rest}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="discountedPrice"
                render={({ field: { onChange, ...rest } }) => (
                  <div>
                    <InputNumberField
                      label="Discounted price"
                      thousandSeparator=","
                      prefix="₦"
                      min={1}
                      decimalScale={0}
                      placeholder="₦10,000.00"
                      allowNegative={false}
                      allowLeadingZeros={false}
                      valueIsNumericString={true}
                      onValueChange={(values) => {
                        onChange(parseInt(values.value) || 0);
                      }}
                      {...rest}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <div>
                    <InputSelect
                      label="Category"
                      placeholder="Select a category"
                      items={testCategory}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    />
                  </div>
                )}
              />
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.single_test}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading.single_test}>
                {isLoading.single_test && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminTestModal);
