'use client';
import { useEffect } from 'react';
import { XModal } from '@/atoms/modal';
import { Paragraph } from '@/atoms/typographys';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  fileObjectSchema,
  testResultsSchema,
  TRemoteFile,
  TTestResultsTypeSchema
} from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/atoms/Buttons';
import { ChevronsDown, Plus, Trash, Upload } from 'lucide-react';
import { useFetchTestByID } from '@/hooks/labTech/useFetchTestByID';
import { useFetchTestTemplateById } from '@/hooks/admin/useFetchTestTemplateById';
import TestDetailsInfo from '@/components/common/TestDetailsInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '@/atoms/Toast';
import { postUploadResult } from '@/requests/test';
import { labTech } from '@/hooks/labTech/FetchKeyFactory';
import { qualityControl } from '@/hooks/qualityControl/FetchkeyFactory';
import InputField from '@/atoms/fields/NewInput';
import { Form, FormField } from '@/components/ui/form';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { testResultStatus } from '@/constants/data';
import FilePreview from '@/components/common/FileUpload/FilePreview';

const ResultUploadModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, testDetails },
    LabTechStore: { addTestFiles, testFiles, removeTestFiles }
  } = useStore();

  const { data, status } = useFetchTestByID(testDetails.testId);
  const templateTestId = testDetails.originalTestId || data?.test?.id || '';
  const { data: templateData } = useFetchTestTemplateById(templateTestId);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { testRequestId: string; result: TTestResultsTypeSchema }) =>
      postUploadResult(params.testRequestId, params.result),
    onError: () => {
      Toast.error('Result upload failed!');
    },
    onSuccess: () => {
      toggleModals({});
      queryClient.invalidateQueries({ queryKey: labTech.getDashboard().keys() });
      queryClient.invalidateQueries({
        queryKey: qualityControl.getHistory({ limit: 10, page: 1 }).keys()
      });
      Toast.success('Result upload successful!');
    }
  });

  const form = useForm<TTestResultsTypeSchema>({
    defaultValues: {
      data: [{ parameter: '', result: '', range: '', unit: '', reference: '' }]
    },
    mode: 'onChange',
    resolver: zodResolver(testResultsSchema),
    reValidateMode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'data'
  });

  const {
    fields: mediaFields,
    append: mediaAppend,
    remove: mediaRemove,
    update: mediaUpdate
  } = useFieldArray({
    control: form.control,
    name: 'media'
  });
  const media = useWatch({ control: form.control, name: 'media' });

  const handleUpdate = (index: number, remoteFile: TRemoteFile) => {
    mediaUpdate(index, { file: remoteFile });

    if (testFiles.length && !testFiles.find((file) => file.uuid === remoteFile.uuid)) {
      addTestFiles(remoteFile);
    }
  };

  const handleRemove = (idx: number, media_uuid?: string) => {
    if (media_uuid) {
      removeTestFiles(media_uuid);
    }
    mediaRemove(idx);
  };

  const handlerFn = (_files: File[]) => {
    mediaAppend(_files.map((file) => ({ file })));
    toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false });
  };

  const onSubmit: SubmitHandler<TTestResultsTypeSchema> = async (formData) => {
    if (testDetails.testId) {
      mutate({ testRequestId: testDetails.testId, result: formData });
    }
  };

  const disableSubmit = (() => {
    if (media && media.length > 0) {
      const hasUnprocessedFiles = media.some((el) => el.file instanceof File);
      return hasUnprocessedFiles;
    }
    return true;
  })();

  const templateRowCount = templateData?.parameters?.length ?? 0;

  const applyTemplateRows = () => {
    const normalizedRows = (templateData?.parameters || []).map((parameter) => ({
      parameter: parameter.name || '',
      result: '',
      unit: (parameter as any).measurementUnit || (parameter as any).measurement_unit || '',
      range: (parameter as any).referenceRange || (parameter as any).reference_range || '',
      reference: ''
    }));

    const currentMedia = form.getValues('media') || [];

    form.reset({
      data: normalizedRows.length
        ? normalizedRows
        : [{ parameter: '', result: '', range: '', unit: '', reference: '' }],
      media: currentMedia
    });
  };

  useEffect(() => {
    if (!isOpen.RESULT_UPLOAD_MODAL) return;
    applyTemplateRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen.RESULT_UPLOAD_MODAL, templateData]);

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.RESULT_UPLOAD_MODAL, open: false })}
      bgClose={false}
      isOpen={isOpen.RESULT_UPLOAD_MODAL}
      className="!max-w-[1440px]"
      title="Result Upload"
    >
      <div className="flex w-full flex-col space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-1 overflow-x-scroll"
          >
            <Paragraph className="text-lg !font-medium" text="Test Result" />

            <fieldset disabled={isPending} className="flex w-full flex-col space-y-1">
              <div className="h-auto max-h-[250px] w-full overflow-y-scroll">
                <Table className="relative">
                  <TableHeader className="sticky top-0 z-30">
                    <TableRow>
                      <TableHead className="w-[10px]">S/N</TableHead>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead className="">Unit</TableHead>
                      <TableHead className="">Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[20px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => {
                      return (
                        <TableRow key={field.id} className="hover:!bg-transparent">
                          <TableCell>
                            <div className="">
                              <p>{index + 1}</p>
                              <p className="invisible">pad</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`data.${index}.parameter`}
                              render={({ field }) => (
                                <div>
                                  <InputField
                                    label=""
                                    required
                                    disabled={index < templateRowCount}
                                    {...field}
                                  />
                                </div>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`data.${index}.result`}
                              render={({ field }) => (
                                <div>
                                  <InputField label="" required {...field} />
                                </div>
                              )}
                            />
                          </TableCell>
                          <TableCell className="">
                            <FormField
                              control={form.control}
                              name={`data.${index}.unit`}
                              render={({ field }) => (
                                <div>
                                  <InputField
                                    label=""
                                    required
                                    disabled={index < templateRowCount}
                                    {...field}
                                  />
                                </div>
                              )}
                            />
                          </TableCell>
                          <TableCell className="">
                            <FormField
                              control={form.control}
                              name={`data.${index}.range`}
                              render={({ field }) => (
                                <div>
                                  <InputField
                                    label=""
                                    required
                                    disabled={index < templateRowCount}
                                    {...field}
                                  />
                                </div>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`data.${index}.reference`}
                              render={({ field }) => (
                                <div>
                                  <InputSelect
                                    items={testResultStatus}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    label=""
                                    placeholder="select status..."
                                    required
                                    {...field}
                                  />
                                </div>
                              )}
                            />
                          </TableCell>
                          <TableCell className="w-[20px]">
                            <div
                              className={`cursor-pointer flex-col items-center justify-center text-red-400 ${fields.length > 1 ? 'flex' : 'hidden'}`}
                              onClick={() => remove(index)}
                            >
                              <Trash size={20} />
                              <p className="invisible">pad</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="mt-4 w-fit">
                  <Button
                    variant="filled"
                    type="button"
                    text="upload"
                    className="!h-[35px] !w-auto !text-xs"
                    leftIcon={<Upload size={15} />}
                    onClick={() =>
                      toggleModals({
                        open: true,
                        name: AppModals.FILE_UPLOAD_MODAL,
                        handlerFn
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="light"
                    type="button"
                    text="Reset template"
                    className="!h-[35px] !w-auto !text-xs"
                    onClick={applyTemplateRows}
                    disabled={templateRowCount === 0}
                  />
                  <Button
                    variant="light"
                    type="button"
                    text="Add parameter"
                    className="!h-[35px] !w-auto !text-xs"
                    leftIcon={<Plus size={15} />}
                    onClick={() =>
                      append({
                        parameter: '',
                        result: '',
                        range: '',
                        unit: '',
                        reference: ''
                      })
                    }
                  />
                  <Button
                    className="!h-[35px] !w-auto !text-xs"
                    variant="filled"
                    text="Submit Result"
                    type="submit"
                    disabled={disableSubmit || isPending}
                    isLoading={isPending}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mt-4 flex w-full flex-wrap justify-start gap-5">
                  {mediaFields.map(({ id, file }, idx) => (
                    <FilePreview
                      key={id}
                      {...{ file, id, idx, bucket: 'cloudinary' }}
                      remove={handleRemove}
                      update={handleUpdate}
                      error={form.formState.errors?.media?.[idx]?.message}
                    />
                  ))}
                </div>
              </div>
            </fieldset>
          </form>
        </Form>

        <div className="flex w-full flex-col space-y-3">
          <div className="flex w-full flex-col space-y-3 overflow-x-clip">
            {status === 'success' && (
              <Collapsible className="w-full">
                <CollapsibleTrigger className="w-full bg-neutral-50 p-2">
                  <div className="flex w-full items-center justify-between">
                    <Paragraph className="text-lg !font-medium" text="Test" />
                    <ChevronsDown />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <TestDetailsInfo data={data} />
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      </div>
    </XModal>
  );
};

export default observer(ResultUploadModal);
