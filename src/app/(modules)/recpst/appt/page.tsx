'use client';
import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROUTES from '@/constants/routes';
import PendingAppt from './components/PendingAppt';
import BookedAppt from './components/BookedAppt';
import Button from '@/atoms/Buttons';
import { useRouter } from 'next/navigation';
import { CalendarPlus } from 'lucide-react';

export default function QCPage() {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push(ROUTES.RECPTS_BOOK_APOINTMENT.path);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="pending" className="flex w-full flex-col space-y-2">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="pending">Booked</TabsTrigger>
            <TabsTrigger value="history">Pending</TabsTrigger>
          </TabsList>
          <Button
            variant="filled"
            onClick={handleBookAppointment}
            className="flex w-[200px] items-center  gap-2"
          >
            <CalendarPlus size={18} />
            Book Appointment
          </Button>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="pending">
            <BookedAppt />
          </TabsContent>
          <TabsContent className="w-full" value="history">
            <PendingAppt />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
