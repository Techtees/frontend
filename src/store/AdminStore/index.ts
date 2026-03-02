import { action, flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import initializer from '@/utils/initializer';
import { parseError } from '@/utils/errorHandler';
import toast from 'react-hot-toast';
import {
  postAdduser,
  postAddSingleTest,
  IPostAddSingleTest,
  IPostAddPackageTest,
  postAddPackageTest,
  putUpdateSingleTest,
  putUpdatePackageTest,
  putUpdateHero,
  postCreateHeroLanding,
  putUpdateHeroCarousel,
  delHeroCarousel,
  postCreateTestimonial,
  putUpdateTestimonial,
  delTestimonial,
  delPartner,
  putUpdatePartner,
  postCreatePartner
} from '@/requests/admin';
import { AxiosResponse } from 'axios';
import {
  TAdminPackageTestSchema,
  TAdminSingleTestSchema
} from '@/app/(modules)/admin/content-management/components/modals/validation';
import {
  TAdminCreateHeroSchema,
  TAdminHeroCarouselSchema
} from '@/app/(modules)/admin/content-management/hero/validation';
import { TAdminTestimonialSchema } from '@/app/(modules)/admin/content-management/testimonials/validation';
import { de } from 'date-fns/locale';
import { TAdminCreatePartnerSchema } from '@/app/(modules)/admin/content-management/partners/validation';

export enum EnumAdminQueryType {
  USERS = 'USERS',
  PATIENTS = 'PATIENTS'
}

const INIT_IS_LOADING = {
  add_user: false,
  single_test: false,
  package_test: false,
  create_hero: false,
  update_hero: false,
  del_carousel: false,
  create_testimonial: false,
  del_testimonial: false,
  create_partner: false,
  del_partner: false
};

export type TAdminHeroCarousel = {
  carousel: Array<TAdminHeroCarouselSchema>;
};

class AdminStore {
  rootStore: RootStore;
  defaultquery = { limit: 10, page: 1 };
  queries: Record<EnumAdminQueryType, Partial<TGeneralPaginatedQuery | TAdminPatientQuery>> = {
    [EnumAdminQueryType.USERS]: { ...this.defaultquery },
    [EnumAdminQueryType.PATIENTS]: { ...this.defaultquery }
  };
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      queries: observable,
      defaultquery: observable,
      isLoading: observable,

      applyQuery: action.bound,
      resetQuery: action.bound,
      setLimit: action.bound,
      setPage: action.bound,

      addUser: flow.bound,
      addSingleTest: flow.bound,
      updateSingleTest: flow.bound,
      addPackageTest: flow.bound,
      createHeroSection: flow.bound,
      updatePackageTest: flow.bound,
      updateHeroSection: flow.bound,
      updateHeroCarousel: flow.bound,
      deleteHeroCarousel: flow.bound,
      createTestimonial: flow.bound,
      createPartner: flow.bound,
      updatePartner: flow.bound,
      updateTestimonial: flow.bound,
      deleteTestimonial: flow.bound,
      deletePartner: flow.bound
    });

    this.rootStore = _rootStore;
  }

  applyQuery(
    _query: Partial<TGeneralPaginatedQuery | TAdminPatientQuery>,
    dataType: EnumAdminQueryType = EnumAdminQueryType.USERS
  ) {
    this.queries[dataType] = { ...this.queries[dataType], ..._query };
  }

  resetQuery(dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    const { limit, page } = this.queries[dataType];
    this.queries[dataType] = { limit, page };
  }

  setPage(_page: number, dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    this.queries[dataType].page = _page;
  }

  setLimit(_limit: number, dataType: EnumAdminQueryType = EnumAdminQueryType.USERS) {
    this.queries[dataType].limit = _limit;
  }

  *addUser(_payload: TAdminAdduserSchema, cb?: () => void) {
    this.isLoading.add_user = true;
    this.errors.add_user = '';
    try {
      const resp = (yield postAdduser(_payload)) as AxiosResponse<INBTServerResp<string>>;
      toast.success(resp.data.message);

      cb?.();
    } catch (error) {
      this.errors.add_user = parseError(error);
      toast.error(this.errors.add_user);
    } finally {
      this.isLoading.add_user = false;
    }
  }

  *addSingleTest(_payload: TAdminSingleTestSchema, cb?: () => void) {
    this.isLoading.single_test = true;
    this.errors.single_test = '';
    try {
      if (_payload.requirements) {
        _payload.requirements = _payload.requirements.split(',') as any;
      } else {
        _payload.requirements = [''] as any;
      }
      yield postAddSingleTest(_payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.single_test = false;
    }
  }

  *updateSingleTest(id: string, _payload: TAdminSingleTestSchema, cb?: () => void) {
    this.isLoading.single_test = true;
    this.errors.single_test = '';
    try {
      if (_payload.requirements) {
        _payload.requirements = _payload.requirements.split(',') as any;
      } else {
        _payload.requirements = [''] as any;
      }

      yield putUpdateSingleTest({ id, payload: _payload });
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.single_test = false;
    }
  }

  *addPackageTest(_payload: TAdminPackageTestSchema, cb?: () => void) {
    this.isLoading.package_test = true;
    this.errors.package_test = '';
    try {
      if (_payload.requirements) {
        _payload.requirements = _payload.requirements.split(',') as any;
      } else {
        _payload.requirements = [''] as any;
      }
      if (_payload.testIds) {
        _payload.testIds = _payload.testIds.map((test) => test.value) as any;
      }
      yield postAddPackageTest(_payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.package_test = false;
    }
  }

  *updatePackageTest(id: string, payload: Partial<TAdminPackageTestSchema>, cb?: () => void) {
    this.isLoading.package_test = true;
    this.errors.package_test = '';
    try {
      if (payload.requirements) {
        payload.requirements = payload.requirements.split(',') as any;
      }
      if (payload.testIds) {
        payload.testIds = payload.testIds.map((test) => test.value) as any;
      }
      yield putUpdatePackageTest({ id, payload });
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.package_test = false;
    }
  }

  *createHeroSection(payload: TAdminCreateHeroSchema, cb?: () => void) {
    this.isLoading.create_hero = true;
    this.errors.create_hero = '';
    try {
      yield postCreateHeroLanding(payload);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      cb?.();
      this.isLoading.create_hero = false;
    }
  }

  *updateHeroSection(
    payload: Partial<TAdminCreateHeroSchema | TAdminHeroCarousel>,
    cb?: () => void
  ) {
    this.isLoading.create_hero = true;
    this.errors.create_hero = '';
    try {
      yield putUpdateHero(payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.create_hero = false;
    }
  }

  *updateHeroCarousel(id: string, payload: Partial<TAdminHeroCarouselSchema>, cb?: () => void) {
    this.isLoading.create_hero = true;
    this.errors.create_hero = '';
    try {
      yield putUpdateHeroCarousel(id, payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.create_hero = false;
    }
  }

  *deleteHeroCarousel(id: string, cb?: () => void) {
    this.isLoading.del_carousel = true;
    this.errors.del_carousel = '';
    try {
      yield delHeroCarousel(id);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.del_carousel = false;
    }
  }

  *createTestimonial(payload: TAdminTestimonialSchema, cb?: () => void) {
    this.isLoading.create_testimonial = true;
    this.errors.create_testimonial = '';
    try {
      yield postCreateTestimonial(payload);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      cb?.();
      this.isLoading.create_testimonial = false;
    }
  }

  *createPartner(payload: TAdminCreatePartnerSchema, cb?: () => void) {
    this.isLoading.create_partner = true;
    this.errors.create_partner = '';
    try {
      yield postCreatePartner(payload);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      cb?.();
      this.isLoading.create_partner = false;
    }
  }

  *updateTestimonial(id: string, payload: Partial<TAdminTestimonialSchema>, cb?: () => void) {
    this.isLoading.create_testimonial = true;
    this.errors.create_testimonial = '';
    try {
      yield putUpdateTestimonial(id, payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.create_testimonial = false;
    }
  }

  *updatePartner(id: string, payload: Partial<TAdminCreatePartnerSchema>, cb?: () => void) {
    this.isLoading.create_partner = true;
    this.errors.create_partner = '';
    try {
      yield putUpdatePartner(id, payload);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.create_partner = false;
    }
  }

  *deleteTestimonial(id: string, cb?: () => void) {
    this.isLoading.del_testimonial = true;
    this.errors.del_testimonial = '';
    try {
      yield delTestimonial(id);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.del_testimonial = false;
    }
  }

  *deletePartner(id: string, cb?: () => void) {
    this.isLoading.del_partner = true;
    this.errors.del_partner = '';
    try {
      yield delPartner(id);
      cb?.();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.del_partner = false;
    }
  }
}

export default AdminStore;
