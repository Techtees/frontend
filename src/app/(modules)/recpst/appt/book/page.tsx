import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import ReceptionistBookingView from '@/app/(modules)/recpst/appt/book/ReceptionistBookingView';

const { title, description } = ROUTES.RECPTS_BOOK_APOINTMENT;

export const metadata: Metadata = {
  title,
  description
};

const ReceptionistBookAppointmentPage = () => {
  return <ReceptionistBookingView />;
};

export default ReceptionistBookAppointmentPage;
