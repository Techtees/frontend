'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Edit2, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface IDoctorFeeProps {
  doctorFee: TAdminDoctorFeeItem;
}

const DoctorFee = ({ doctorFee }: IDoctorFeeProps) => {
  const { id, feature, value, status } = doctorFee;
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <Card className="relative w-full p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold capitalize">
              {feature.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <Badge variant={status === 'active' ? 'default' : 'secondary'}>{status}</Badge>
          </div>
          <p className="text-2xl font-bold text-primary">₦{Number(value).toLocaleString()}</p>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              toggleModals({
                name: AppModals.CREATE_DOCTOR_FEE_MODAL,
                open: true,
                id: id,
                feature: feature,
                value: value
              })
            }
          >
            <Edit2 className="h-4 w-4" />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            onClick={() =>
              toggleModals({
                name: AppModals.DEL_DOCTOR_FEE_MODAL,
                open: true,
                id: id
              })
            }
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorFee;
