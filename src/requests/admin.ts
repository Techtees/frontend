import server from '.';
import { SUPER_ADMIN } from '@/constants/api';
import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import {
  TAdminCreateHeroSchema,
  TAdminHeroCarouselSchema
} from '@/app/(modules)/admin/content-management/hero/validation';
import { TAdminHeroCarousel } from '@/store/AdminStore';
import { TAdminTestimonialSchema } from '@/app/(modules)/admin/content-management/testimonials/validation';
import { TAdminCreatePartnerSchema } from '@/app/(modules)/admin/content-management/partners/validation';
import {
  TAdminPackageTestSchema,
  TAdminSingleTestSchema
} from '@/app/(modules)/admin/content-management/components/modals/validation';

export interface IPostAddSingleTest {
  name: string;
  description: string;
  category: string;
  price: number;
  discountedPrice: number;
  requirements: Array<string>;
}

export interface IPostAddPackageTest {
  name: string;
  description: string;
  requirements: Array<string>;
  testIds: Array<string>;
  price?: number;
  discountedPrice?: number;
}

// get
export const getSingleTests = async (params: Partial<TAdminTestQuery>) => {
  return server.get<INBTServerResp<INBTPaginatedData<TAdminTestItemBase>>>(
    SUPER_ADMIN.SINGLE_TEST,
    {
      params
    }
  );
};

export const getTestTemplates = async (params?: { testId?: string }) =>
  server.get<INBTServerResp<TAdminTestTemplateResp>>(SUPER_ADMIN.TEST_TEMPLATES, {
    params
  });

// post requests
export const postAdduser = async (payload: TAdminAdduserSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.ADD_USER, payload);

export const postAddSingleTest = async (payload: TAdminSingleTestSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.CREATE_SINGLE_TEST, payload);

export const postAddPackageTest = async (payload: TAdminPackageTestSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.CREATE_PACKAGE_TEST, payload);

export const postTestTemplate = async (payload: TAdminTestTemplatePayload) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.TEST_TEMPLATES, payload);

export const postCreateHeroLanding = async (payload: TAdminCreateHeroSchema) =>
  server.post(SUPER_ADMIN.CREATE_LANDING, payload);

export const postCreateTestimonial = async (payload: TAdminTestimonialSchema) => {
  server.post(SUPER_ADMIN.TESTIMONIALS, { ...payload, rating: Number(payload.rating) });
};

export const postCreatePartner = async (payload: TAdminCreatePartnerSchema) => {
  server.post(SUPER_ADMIN.CONTENT_PARTNERS, payload);
};

export const postCreateDoctorFee = async (payload: { feature: string; value: string }) =>
  server.post(SUPER_ADMIN.DOCTORS_FEES, payload);

// put requests
export const putUpdateSingleTest = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<TAdminSingleTestSchema>;
}) => server.put(SUPER_ADMIN.UPDATE_SINGLE_TEST.replace(':id', id), payload);

export const putUpdatePackageTest = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<TAdminPackageTestSchema>;
}) => server.put(SUPER_ADMIN.UPDATE_PACKAGE_TEST.replace(':id', id), payload);

export const putUpdateHero = async (
  payload: Partial<TAdminCreateHeroSchema | TAdminHeroCarousel>
) => server.put(SUPER_ADMIN.CREATE_LANDING, payload);

export const putUpdateHeroCarousel = async (
  id: string,
  payload: Partial<TAdminHeroCarouselSchema>
) => server.put(SUPER_ADMIN.SINGLE_LANDING.replace(':id', id), payload);

export const putUpdateTestimonial = async (id: string, payload: Partial<TAdminTestimonialSchema>) =>
  server.put(SUPER_ADMIN.SINGLE_TESTIMONIAL.replace(':id', id), payload);

export const putUpdatePartner = async (id: string, payload: Partial<TAdminCreatePartnerSchema>) =>
  server.put(SUPER_ADMIN.CONTENT_PARTNERS.concat(':/id').replace(':id', id), payload);

export const putUpdateDoctorFee = async (
  id: string,
  payload: { feature?: string; value?: string }
) => server.put(SUPER_ADMIN.UPDATE_DOCTOR_FEE.replace(':id', id), payload);

export const suspendUser = async (id: string) =>
  server.put(SUPER_ADMIN.SUSPEND_USER.replace(':id', id));

export const unSuspendUser = async (id: string) => {
  return server.put(SUPER_ADMIN.UNSUSPEND_USER.replace(':id', id), { status: 'active' });
};
export const toggleTestAvailability = async (arg: {
  type: string;
  id: string;
  payload: { status: string };
}) => {
  const { type, id, payload } = arg;
  return server.put(
    type === 'single'
      ? SUPER_ADMIN.TOGGLE_TEST_AVAILABILITY.replace(':id', id)
      : SUPER_ADMIN.TOGGLE_PACKAGE_TEST.replace(':id', id),
    payload
  );
};

// delete requests
export const deleteUser = async (id: string) =>
  server.delete(SUPER_ADMIN.DELETE_USER.replace(':id', id));

export const delHeroCarousel = async (id: string) =>
  server.delete(SUPER_ADMIN.SINGLE_LANDING.replace(':id', id));

export const delTestimonial = async (id: string) =>
  server.delete(SUPER_ADMIN.SINGLE_TESTIMONIAL.replace(':id', id));

export const delPartner = async (id: string) =>
  server.delete(SUPER_ADMIN.CONTENT_PARTNERS.concat('/:id').replace(':id', id));

export const delTestTemplate = async (testId: string) =>
  server.delete(SUPER_ADMIN.TEST_TEMPLATE_ID.replace(':testId', testId));
