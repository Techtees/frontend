'use client';
import { useFetchPatients } from '@/hooks/admin/useFetchPatients';
import { columns } from './components/columns';
import PatientsTable from './components/PatientsTable';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { pagination } from '@/constants/data';
import { observer } from 'mobx-react-lite';

const PatientManagementView = () => {
  const [data, setData] = useState<Array<TAdminPatientItem>>([]);
  const [dataPagination, setDataPagination] = useState<TPaginationResponse>(pagination);
  const {
    AdminStore: { queries }
  } = useStore();
  const { data: patientData, isLoading } = useFetchPatients(queries.PATIENTS);

  useEffect(() => {
    if (!isLoading && patientData !== undefined) {
      setData(patientData.patients);
      setDataPagination(patientData.pagination);
    }
  }, [isLoading, patientData]);

  return (
    <div className="w-full">
      <PatientsTable {...{ data, pagination: dataPagination, isLoading, columns }} />
    </div>
  );
};

export default observer(PatientManagementView);
