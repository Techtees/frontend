import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const DoctorsFeeLoader = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-24 w-full" />

      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
};

export default DoctorsFeeLoader;
