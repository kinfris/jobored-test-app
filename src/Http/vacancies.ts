import { $api } from '@/Http/instance';
import { QueryType } from '@/Http/types';
import { itemsPerPage } from '@/components/PagitationContainer/constants';
import { defaultCategory } from '@/Http/constants';

const defaultQuery = {
  salaryFrom: '',
  salaryTo: '',
  keyword: '',
  catalogues: defaultCategory,
  page: 1,
};

export const VacancyService = {
  async login() {
    const response = await $api.get(
      '/oauth2/password?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0'
    );
    return response;
  },

  async getVacancies(query: QueryType = defaultQuery) {
    const queryString = [];

    if (query.salaryFrom) {
      queryString.push(`payment_from=${query.salaryFrom}`);
    }
    if (query.salaryTo) {
      queryString.push(`payment_to=${query.salaryTo}`);
    }
    if (query.keyword) {
      queryString.push(`keyword=${query.keyword}`);
    }
    if (query.catalogues) {
      queryString.push(`catalogues=${query.catalogues}`);
    } else {
      queryString.push(`catalogues=${defaultCategory}`);
    }
    if (query.page) {
      queryString.push(`page=${query.page}`);
    }
    const access_token = localStorage.getItem('access_token');

    const response = await $api(
      `/vacancies/?${queryString.join('&')}&count=${itemsPerPage}&published=1`,
      {
        headers: {
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          access_token,
          'x-api-app-id':
            'v3.r.137528818.42ccfb7041ed0160dabfa6a739a631448f0ff724.49cb285f6936b5889d7540c35b5edf9f2d427a0a',
          client_id: '2388',
        },
      }
    );
    return response;
  },
  async getAllVacancies() {
    const response = await $api(`/vacancies/?catalogues=${defaultCategory}`, {
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        access_token:
          'v3.r.137440105.041d2e6c58c1314e6a2157b49200cf2f1665835e.4838e8f3fc75f96636e9c206e8fbfc1cd8c15dc8',
        'x-api-app-id':
          'v3.r.137528818.42ccfb7041ed0160dabfa6a739a631448f0ff724.49cb285f6936b5889d7540c35b5edf9f2d427a0a',
        client_id: '2388',
      },
    });
    return response;
  },
  async getVacancyById(id: number) {
    const access_token = localStorage.getItem('access_token');
    const response = await $api(`/vacancies/${id}`, {
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        access_token,
        'x-api-app-id':
          'v3.r.137528818.42ccfb7041ed0160dabfa6a739a631448f0ff724.49cb285f6936b5889d7540c35b5edf9f2d427a0a',
        client_id: '2388',
      },
    });
    return response;
  },

  async getCatalogues() {
    const response = await $api(`/catalogues/parent/${defaultCategory}`, {
      maxRedirects: 2,
    });
    return response;
  },

  async getFavoriteVacancies(ids: Array<number>) {
    const queryParams = ids.map(
      (id, index) => `ids[${index}]=${id}${index !== ids.length - 1 ? '&' : ''}`
    );
    const response = await $api(`/vacancies/?ids=${queryParams.join('')}`, {
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        access_token:
          'v3.r.137440105.041d2e6c58c1314e6a2157b49200cf2f1665835e.4838e8f3fc75f96636e9c206e8fbfc1cd8c15dc8',
        'x-api-app-id':
          'v3.r.137528818.42ccfb7041ed0160dabfa6a739a631448f0ff724.49cb285f6936b5889d7540c35b5edf9f2d427a0a',
        client_id: '2388',
      },
    });
    return response;
  },
};
