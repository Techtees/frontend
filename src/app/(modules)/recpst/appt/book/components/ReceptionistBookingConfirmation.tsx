import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import {
  CalendarIcon,
  MapPinIcon,
  User2Icon,
  MailIcon,
  PhoneIcon,
  StethoscopeIcon
} from 'lucide-react';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { useReceptionistBookAppointment } from '@/hooks/recpst/useBookAppointment';
import toast from 'react-hot-toast';

import { useState } from 'react';
import PaymentProcessingDialog from '@/app/(modules)/patient/appointment/booking/components/PaymentProcessingDialog';
import { useRouter } from 'next/navigation';
import { useDoctorRecommendationFee } from '@/hooks/patient/useDoctorRecommendationFee';
import ROUTES from '@/constants/routes';

interface BookingSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  bookingData: BookingForm;
  onConfirm?: () => void;
}

const ReceptionistBookingConfirmationDialog = ({
  open,
  onClose,
  bookingData,
  onConfirm
}: BookingSummaryDialogProps) => {
  const {
    CartStore: { items, total, itemCount, clearCart }
  } = useStore();

  const router = useRouter();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const { fee: doctorRecommendationFee } = useDoctorRecommendationFee();

  const { mutate: bookAppointment, isPending } = useReceptionistBookAppointment();

  const handleBookingSubmission = async () => {
    try {
      const payload: BookAppointmentDTO = {
        ...bookingData,
        email: bookingData.email.trim() || undefined
      };

      bookAppointment(payload, {
        onSuccess: (response) => {
          toast.success('Appointment booked successfully');
          clearCart();
          if (bookingData.paymentMethod === 'location') {
            router.push(ROUTES.RECPTS_APOINTMENT.path);
          }
          if (response?.data?.data?.paymentLink) {
            setPaymentLink(response.data.data.paymentLink);
          }
        },
        onError: (error) => {
          toast.error('Booking failed');
        }
      });
    } catch (error) {
      console.error('Error during booking submission:', error);
    }
  };

  return (
    <>
      <Dialog
        open={open && !paymentLink}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogHeader>
              <DialogTitle>Booking Summary</DialogTitle>
            </DialogHeader>
            <DialogDescription>Make sure the appointment details are correct</DialogDescription>

            <div className="divide-y">
              {/* Personal Information */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Patient Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User2Icon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">{bookingData.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">{bookingData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">{bookingData.phoneNumber}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Appointment Details</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">
                      {bookingData.availableDate
                        ? new Date(bookingData.availableDate).toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })
                        : undefined}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="text-gray-400 h-4 w-4" />
                    <div className="text-sm">
                      <span className="font-medium">{bookingData.location.type}: </span>
                      <span>{bookingData.location.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StethoscopeIcon className="text-gray-400 h-4 w-4" />
                    <div className="text-sm">
                      <span className="font-medium">Doctor Recommendation: </span>
                      <span
                        className={
                          bookingData.wantDoctorRecommendation === 'yes'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }
                      >
                        {bookingData.wantDoctorRecommendation === 'yes'
                          ? `Yes (₦${doctorRecommendationFee.toLocaleString()})`
                          : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Tests */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Selected Tests</h2>
                <div className="space-y-2">
                  {items.map((test, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{test.item.name}</span>
                      <span className="font-medium">
                        ₦
                        {test.item.discountedPrice
                          ? test.item.discountedPrice.toLocaleString()
                          : test.item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Price Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tests Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  {bookingData.wantDoctorRecommendation === 'yes' && (
                    <div className="flex justify-between text-sm">
                      <span>Doctor Recommendation Fee</span>
                      <span>₦{doctorRecommendationFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>
                        ₦
                        {(
                          total +
                          (bookingData.wantDoctorRecommendation === 'yes'
                            ? doctorRecommendationFee
                            : 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Payment Method</h2>
                <div className="text-sm">
                  <span className="text-blue-700 rounded-md bg-blue-100 px-2 py-1">
                    {bookingData.paymentMethod === 'via_card'
                      ? 'Online Payment'
                      : 'Pay at Location'}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex justify-end gap-4">
            <Button variant="outlined" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleBookingSubmission} isLoading={isPending}>
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {paymentLink && (
        <PaymentProcessingDialog
          paymentLink={paymentLink}
          onComplete={() => {
            setPaymentLink(null);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ReceptionistBookingConfirmationDialog;
