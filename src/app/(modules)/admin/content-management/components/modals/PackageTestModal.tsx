import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminPackageTestSchema, TAdminPackageTestSchema } from './validation';
import Input from '@/atoms/fields/NewInput';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import TextareaField from '@/atoms/fields/TextAreaField';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import InputMultiSelect from '@/atoms/fields/InputMultiSelect';
import { Option } from '@/components/ui/multi-select';
import { useFetchInfiniteSingleTest } from '@/hooks/admin/useFetchSingleTest';
import { useInView } from '@/hooks/useInView';
import { useFetchPackageTestId } from '@/hooks/admin/useFetchPackageTestId';
import InputNumberField from '@/atoms/fields/NumberInput';

const AdminPackageTest = () => {
  const [tests, setTests] = useState<Array<Option>>([]);
  const {
    AppConfigStore: { isOpen, toggleModals, testDetails },
    AdminStore: { addPackageTest, updatePackageTest, isLoading }
  } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () => ({
      root: scrollRef.current,
      threshold: 0.1
    }),
    [scrollRef.current]
  );
  const { ref: lastRef, inView } = useInView(options);
  const {
    processedData,
    isLoading: isTestDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchInfiniteSingleTest({ limit: 10, page: 1, status: 'ACTIVE' });

  const queryClient = useQueryClient();
  const isEditMode = testDetails.testId !== '';

  const { data, status } = useFetchPackageTestId(testDetails.testId);

  const form = useForm<TAdminPackageTestSchema>({
    defaultValues: {
      name: '',
      description: '',
      requirements: '',
      testIds: []
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminPackageTestSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TAdminPackageTestSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.STATS
      });
      toggleModals();
    };

    if (isEditMode) {
      updatePackageTest(testDetails.testId, formData, cbFn);
    } else {
      addPackageTest(formData, cbFn);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode && data) {
      const resetData: any = {
        name: data.name || '',
        description: data.description || '',
        testIds: data?.tests?.map((test) => ({ value: test.id, label: test.name })) ?? []
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
        testIds: []
      });
    }
  }, [isEditMode, data, form]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  useEffect(() => {
    if (!isTestDataLoading && processedData.length > 0) {
      setTests(processedData);
    }
  }, [isTestDataLoading, processedData]);

  if (isEditMode && status === 'pending') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.ADMIN_PACKAGE_TEST}
        className="!max-w-[350px]"
        title="Package Test"
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
        isOpen={isOpen.ADMIN_PACKAGE_TEST}
        className="!max-w-[350px]"
        title="Package Test"
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
      isOpen={isOpen.ADMIN_PACKAGE_TEST}
      className="!max-w-[350px]"
      title="Package Test"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.package_test} className="w-full">
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
                name="testIds"
                render={({ field }) => (
                  <InputMultiSelect
                    required
                    {...field}
                    label={'Add Tests'}
                    isFetching={isTestDataLoading || isFetchingNextPage}
                    options={tests}
                    placeholder="Add tests to package..."
                    lastElementRef={lastRef}
                    fetchNextPage={() => fetchNextPage()}
                    hasNextPage={hasNextPage}
                    emptyIndicator={
                      <p className="text-gray-600 dark:text-gray-400 text-center text-lg leading-10">
                        No Tests available.
                      </p>
                    }
                  />
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
                )}
              />
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.package_test}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading.package_test}>
                {isLoading.package_test && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminPackageTest);
