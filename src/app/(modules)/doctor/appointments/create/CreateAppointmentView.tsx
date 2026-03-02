'use client';
import { Text } from '@/lib/utils/Text';
import { Title } from '@/atoms/typographys';
import Cards from '@/atoms/Cards';
import Input from '@/atoms/fields/Input';
import Button from '@/atoms/Buttons';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useEffect } from 'react';

import { useStore } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import TestModalDialog from '@/app/(modules)/patient/appointment/booking/components/TestModal';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { CircleX } from 'lucide-react';
import { useDoctorRecommendationFee } from '@/hooks/patient/useDoctorRecommendationFee';

type LocationType = 'Lab' | 'Custom';

const LAB_LOCATIONS = [
  { id: 'lab1', name: 'Lab1', address: 'Medicare Hospital, 18 Iwaya Rd, Lagos' },
  { id: 'lab2', name: 'Lab2', address: 'Central Lab, 45 Victoria Island, Lagos' },
  { id: 'lab3', name: 'Lab3', address: 'Advanced Diagnostics, 12 Ikeja GRA, Lagos' }
];

const CreateAppointmentView = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isBookingConfirmationDialogOpen, setIsBookingConfirmationDialogOpen] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

  const {
    CartStore: { items, total, removeItem }
  } = useStore();
  const { fee: doctorRecommendationFee } = useDoctorRecommendationFee();

  const handleTestModal = () => {
    setIsTestModalOpen(true);
  };

  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    email: '',
    phoneNumber: '+234',
    location: {
      type: 'Lab' as LocationType,
      address: LAB_LOCATIONS[0].address
    },
    availableDate: new Date(),
    paymentMethod: 'via_card',
    wantDoctorRecommendation: 'no',
    testRequests: []
  });

  // Update testRequests when cart items change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      testRequests: items.map((item) => ({
        entityType: item.type.toUpperCase(),
        testId: item.id
      }))
    }));
  }, [items, isTestModalOpen]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {};
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length < 8) {
      newErrors.phoneNumber = 'Phone number must be at least 8 digits';
    }
    if (!formData.location.address.trim()) {
      newErrors.location = ' Location is  required';
    }

    if (!formData.availableDate) {
      newErrors.availableDate = 'Please select a date';
    } else {
      // Convert the ISO string back to a Date object for comparison
      const selectedDate = new Date(formData.availableDate);
      selectedDate.setHours(0, 0, 0, 0); // Remove time component

      if (selectedDate < currentDate) {
        newErrors.availableDate = 'Date cannot be in the past';
      }
    }

    if (formData.testRequests.length === 0) {
      newErrors.testRequests = 'Please select at least one test';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingConfirmation = () => {
    if (validateForm()) {
      setIsBookingConfirmationDialogOpen(true);
    }
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      location: {
        type: value as LocationType,
        address: value === 'Lab' ? 'Medicare Hospital, 18 Iwaya Rd, Lagos' : ''
      },
      // Automatically set payment method to online for custom location
      paymentMethod: value === 'Custom' ? 'via_card' : prev.paymentMethod
    }));
  };

  const handlePaymentMethod = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      paymentMethod: value
    }));
  };

  const handleDoctorRecommendation = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      wantDoctorRecommendation: value as 'yes' | 'no'
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev: any) => ({
      ...prev,
      availableDate: date ? date.toISOString() : undefined
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Ensure phone number always starts with +234
      if (!value.startsWith('+234')) {
        const newValue = '+234' + value.replace(/^\+234/, '');
        setFormData((prev: any) => ({
          ...prev,
          [name]: newValue
        }));
        return;
      }
      // Remove any non-numeric characters after +234
      const numericPart = value.slice(4).replace(/\D/g, '');
      const newValue = '+234' + numericPart;
      setFormData((prev: any) => ({
        ...prev,
        [name]: newValue
      }));
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLabSelection = (labId: string) => {
    const selectedLab = LAB_LOCATIONS.find((lab) => lab.id === labId);
    if (selectedLab) {
      setFormData((prev: any) => ({
        ...prev,
        location: {
          ...prev.location,
          address: selectedLab.address
        }
      }));
    }
  };
  return (
    <>
      <Cards className="p-[5px] sm:bg-white sm:p-[10px] md:p-[45px] ">
        <Title text="Book appointment for patients" />
        <Text variant="body" className="mb-4">
          So our team can reach out to you on time
        </Text>
        <form action="" id="bookingForm">
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <Input
              type="text"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <div className="w-[100%]">
              <Label className="pb-10 font-normal">Available Date</Label>
              <DateTimePicker
                value={formData.availableDate}
                hourCycle={24}
                onChange={handleDateSelect}
                granularity="minute"
                timeInterval={30}
                minHour={8}
                maxHour={18}
                hidden={(date) => {
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0);

                  return date < currentDate || date.getDay() === 0;
                }}
                className="w-full"
              />
              {errors.availableDate && (
                <span className="mt-1 text-sm text-red-500">{errors.availableDate}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <div className="flex-1">
              <Input
                type="text"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-700 mb-1 block text-sm font-medium">Phone Number</label>
              <div className="relative">
                <div className="flex">
                  <div className="border-gray-300 bg-gray-50 text-gray-500 flex items-center rounded-l-md border border-r-0 px-3 py-2 text-sm">
                    +234
                  </div>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber.slice(4)}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '');
                      setFormData((prev: any) => ({
                        ...prev,
                        phoneNumber: '+234' + numericValue
                      }));
                    }}
                    className={`focus:ring-blue-500 focus:border-blue-500 flex-1 rounded-r-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                    maxLength={10}
                  />
                </div>
                {errors.phoneNumber && (
                  <span className="mt-1 text-sm text-red-500">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <div className="flex w-full flex-col ">
              <Label className="mb-2">Available Test</Label>
              <Button
                variant="secondary"
                type="button"
                className="bg-blue-50/50"
                onClick={handleTestModal}
              >
                Select Test
              </Button>

              {items.length === 0 ? (
                <></>
              ) : (
                <>
                  <div className="mt-3 flex h-[100px] flex-col overflow-auto border-2">
                    {items.map((item) => (
                      <div className="flexBetween items-center p-3" key={item.id}>
                        <p>
                          {item.item.name}{' '}
                          <span className="ml-5 text-red-200">
                            {' '}
                            ₦
                            {item.item.discountedPrice
                              ? item.item.discountedPrice
                              : item.item.price}
                          </span>
                        </p>
                        <CircleX
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {errors.testRequests && (
                <div className="mt-1 text-sm text-red-500">{errors.testRequests}</div>
              )}
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-3">Location</Label>
              <RadioGroup value={formData.location.type} onValueChange={handleLocationChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lab" id="r1" />
                  <Label htmlFor="r1">Lab</Label>
                  <div className="w-80 rounded-md">
                    <Select
                      disabled={formData.location.type !== 'Lab'}
                      value={
                        LAB_LOCATIONS.find((lab) => lab.address === formData.location.address)
                          ?.id || LAB_LOCATIONS[0].id
                      }
                      onValueChange={handleLabSelection}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a lab location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LAB_LOCATIONS.map((lab) => (
                          <SelectItem key={lab.id} value={lab.id}>
                            {lab.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Custom" id="r2" />
                  <Label htmlFor="r2">Custom</Label>
                  <div className="w-80  rounded-md pt-4">
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      value={formData.location.type === 'Custom' ? formData.location.address : ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            address: e.target.value
                          }
                        }))
                      }
                    />
                    {formData.location.type === 'Custom' && (
                      <p className="text-blue-600 mt-1 text-xs">
                        Note: Custom location requires online payment
                      </p>
                    )}
                  </div>
                  {errors.location && (
                    <div className="mt-1 text-sm text-red-500">{errors.location}</div>
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-3 w-full">
            <div className="flex w-full flex-col">
              <Label className="mb-3">Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={handlePaymentMethod}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="via_card" id="r3" />
                  <Label htmlFor="r3">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="location"
                    id="r4"
                    disabled={formData.location.type === 'Custom'}
                  />
                  <Label
                    htmlFor="r4"
                    className={
                      formData.location.type === 'Custom' ? 'cursor-not-allowed opacity-50' : ''
                    }
                  >
                    Pay at location
                  </Label>
                </div>
              </RadioGroup>
              {formData.location.type === 'Custom' && (
                <p className="text-gray-500 mt-2 text-xs italic">
                  Pay at location is only available for lab locations
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 w-full">
            <div className="flex w-full flex-col">
              <Label className="mb-3">Doctor Recommendation</Label>
              <RadioGroup
                value={formData.wantDoctorRecommendation}
                onValueChange={handleDoctorRecommendation}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dr-yes" />
                  <Label htmlFor="dr-yes">Yes (₦{doctorRecommendationFee.toLocaleString()})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dr-no" />
                  <Label htmlFor="dr-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-5">
            <Button
              variant="filled"
              type="button"
              text="Confirm"
              onClick={handleBookingConfirmation}
              disabled={items.length === 0}
              form="bookingForm"
            />
          </div>
        </form>
      </Cards>
      <TestModalDialog open={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} />
      {isBookingConfirmationDialogOpen && (
        <AppointmentConfirmation
          open={isBookingConfirmationDialogOpen}
          onClose={() => setIsBookingConfirmationDialogOpen(false)}
          bookingData={formData}
          // onConfirm={handleFinalBooking}
        />
      )}
    </>
  );
};

export default CreateAppointmentView;
