'use client';
import { useFetchPatientInfo } from '@/hooks/user/useFetchPatientInfo';
import RecptRegView from './RecptRegView';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const PatientInfoView = ({ id }: { id: string }) => {
  const [patientData, setPatientData] = useState<TPatientInfoResp>();
  const { data, isLoading } = useFetchPatientInfo(id);

  const {
    PatientStore: { receptSetPatientInfo, resetPatientStore, personalInfo }
  } = useStore();

  useEffect(() => {
    if (!isLoading && data != undefined) {
      resetPatientStore();
      setPatientData(data);

      receptSetPatientInfo(data);
    }
  }, [data, isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full max-w-4xl flex-col justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Skeleton className="h-96 w-full overflow-clip rounded-lg md:w-[50%]" />
          <Skeleton className="h-96 w-full rounded-lg p-4 md:w-[50%]" />
        </div>
      ) : (
        patientData && <RecptRegView patientData={patientData} />
      )}
    </>
  );
};

export default observer(PatientInfoView);
