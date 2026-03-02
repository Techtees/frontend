'use client';
import Button from '@/atoms/Buttons';
import { EnumTestStatus } from '@/atoms/Buttons/Status';
import { Paragraph } from '@/atoms/typographys';
import { useFetchTestByID } from '@/hooks/labTech/useFetchTestByID';
import { useUpdateTestStatus } from '@/hooks/labTech/useUpdateTestStatus';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { ChevronLeft, Pause, Play, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TestDetailsInfo from '@/components/common/TestDetailsInfo';

interface ITestDetailModalProps {
  id: string;
}

const TestDetailModal = ({ id }: ITestDetailModalProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, status } = useFetchTestByID(id);
  const { mutateTestStatus, isPending } = useUpdateTestStatus();

  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <div className="flex h-24 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
          <div className="flex h-80 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
        </>
      )}
      {status === 'success' && (
        <>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-start space-x-2"
          >
            <ChevronLeft />
            <Paragraph text="Back" />
          </button>

          <TestDetailsInfo data={data} />

          <div className="flex w-fit items-center justify-start space-x-2">
            {data?.status === EnumTestStatus.PENDING && (
              <Button
                className="w-32"
                disabled={isPending}
                isLoading={isPending}
                variant="filled"
                leftIcon={<Play />}
                text="Start Test"
                onClick={() =>
                  mutateTestStatus({
                    id: data.id,
                    payload: { status: EnumTestStatus.IN_PROGRESS }
                  })
                }
              />
            )}

            {data?.status === EnumTestStatus.IN_PROGRESS && (
              <Button
                className="w-32"
                disabled={isPending}
                isLoading={isPending}
                variant="filled"
                leftIcon={<Pause />}
                text="Pause Test"
                onClick={() =>
                  mutateTestStatus({
                    id: data.id,
                    payload: { status: EnumTestStatus.PENDING }
                  })
                }
              />
            )}

            {data?.status === EnumTestStatus.IN_PROGRESS && (
              <Button
                className="w-32"
                variant="light"
                leftIcon={<Upload />}
                text="Upload Result"
                onClick={() =>
                  toggleModals({
                    open: true,
                    name: AppModals.RESULT_UPLOAD_MODAL,
                    testId: data.id,
                    originalTestId: data?.test?.id
                  })
                }
              />
            )}
          </div>
        </>
      )}
      {status === 'error' && <>error getting test!</>}
    </div>
  );
};

export default TestDetailModal;
