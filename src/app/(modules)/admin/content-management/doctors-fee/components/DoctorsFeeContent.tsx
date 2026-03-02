'use client';
import DoctorsFeeLoader from './DoctorsFeeLoader';
import DoctorFee from './DoctorFee';
import EmptyDoctorsFee from './EmptyDoctorsFee';

interface IDoctorsFeeContentProps {
  data: TAdminDoctorsFeeResp | undefined;
  isLoading: boolean;
}

const DoctorsFeeContent = ({ isLoading, data }: IDoctorsFeeContentProps) => {
  return (
    <div className="w-full">
      {isLoading && <DoctorsFeeLoader />}

      {data && (
        <div className="flex flex-col space-y-6">
          {data.features.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {data.features.map((el) => (
                <DoctorFee key={el.id} doctorFee={el} />
              ))}
            </div>
          ) : (
            <EmptyDoctorsFee />
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsFeeContent;
