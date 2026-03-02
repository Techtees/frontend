import { RECEPTIONIST } from '@/constants/api';
import server from '.';
import { TApptInfoSchema } from '@/app/(modules)/recpst/appt/components/modals/UpdateApptModal';

export const putUpdateAppt = ({ id, payload }: { id: string; payload: TApptInfoSchema }) => {
  return server.put<INBTServerResp<string>>(
    RECEPTIONIST.UPDATE_APPOINTMENT.replace(':id', id),
    payload
  );
};

export const postBookAppointment = (payload: BookAppointmentDTO) => {
  return server.post<Appointment>(RECEPTIONIST.BOOK_APPOINTMENT, payload);
};
