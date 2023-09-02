/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient,
  // CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { ctpClient, SECRET, ID } from './BuildClient';
import { ACCESS_TOKEN } from '../constants';

export default class ClientAPI {
  apiBuilder: ApiRoot;

  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.apiBuilder = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.apiBuilder.withProjectKey({ projectKey: 'ecommerce-quantum' });
  }

  public async loginClient(clientEmail: string, clientPassword: string) {
    const body: CustomerSignin = {
      email: clientEmail,
      password: clientPassword,
    };
    const loginAPI = await this.apiRoot.login().post({ body }).execute();
    return loginAPI;
  }

  public getCustomers() {
    const args = {
      queryArgs: {
        limit: 500,
      },
    };
    const customersAPI = () => this.apiRoot.customers().get(args).execute();
    return customersAPI;
  }

  public async registerClient(
    newEmail: string,
    newPassword: string,
    newFName: string,
    newLName: string,
    newDateOfBirth: string,
    addressesArr: Address[],
    newShipAdrs: number[],
    newBillAdrs: number[],
    defaultShip: number | undefined,
    defaultBill: number | undefined
  ) {
    const body: CustomerDraft = {
      email: newEmail,
      password: newPassword,
      firstName: newFName,
      lastName: newLName,
      dateOfBirth: newDateOfBirth,
      addresses: addressesArr,
      shippingAddresses: newShipAdrs,
      billingAddresses: newBillAdrs,
      defaultShippingAddress: defaultShip,
      defaultBillingAddress: defaultBill,
    };

    const registerAPI = await this.apiRoot.customers().post({ body }).execute();
    return registerAPI;
  }

  public async getCategoryId(category: string) {
    const categoryKey = { key: category };
    try {
      const data = await this.apiRoot.categories().withKey(categoryKey).get().execute();
      if (data.statusCode === 200) {
        return data.body.id;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return `Unable to fetch ${category}`;
  }

  public async getAllCardsData() {
    try {
      const data = await this.apiRoot.products().get().execute();
      if (data.statusCode === 200) {
        return data.body.results;
      }
    } catch (e) {
      console.log(`Error occured while fetching cards data: ${e}`);
    }
  }

  public async getMinPrice() {
    const cheapPriceQuary = {
      queryArgs: {
        sort: ['price asc'],
        limit: 1,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().search().get(cheapPriceQuary).execute();
      if (data.statusCode === 200 && data.body.results[0].masterVariant.prices) {
        return data.body.results[0].masterVariant.prices[0].value.centAmount;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return console.error('Unable to fetch');
  }

  public async getMaxPrice() {
    const expensivePriceQuary = {
      queryArgs: {
        sort: ['price desc'],
        limit: 1,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().search().get(expensivePriceQuary).execute();
      if (data.statusCode === 200 && data.body.results[0].masterVariant.prices) {
        return data.body.results[0].masterVariant.prices[0].value.centAmount;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return console.error('Unable to fetch');
  }

  public async getGenresById(id: string) {
    const query = {
      queryArgs: {
        where: `parent(id="${id}")`,
      },
    };
    try {
      const data = await this.apiRoot.categories().get(query).execute();
      if (data.statusCode === 200) {
        const response = data.body;
        return response.results;
      }
    } catch (e) {
      console.log(`Unable to fetch ${id}, status code ${e}`);
    }
  }

  public async getSpecificGenreById(id: string) {
    const query = {
      queryArgs: {
        where: `categories(id="${id}")`,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().get(query).execute();
      if (data.statusCode === 200) {
        const response = data.body;
        return response;
      }
    } catch (e) {
      console.log(`Unable to fetch ${id}, status code ${e}`);
    }
  }

  public async obtainUserAccessToken(clientEmail: string, clientPassword: string) {
    const url = 'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce-quantum/customers/token';
    const credentials = {
      clientId: ID,
      clientSecret: SECRET,
    };
    const authString = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${clientEmail}&password=${clientPassword}`,
    });

    try {
      const data = await response.json();
      this.setAccessTokenCookie(data.access_token, data.expires_in);
    } catch (e) {
      console.log(`${e} occured when fetching access token!`);
    }
  }

  private setAccessTokenCookie(token: string, time: number): void {
    document.cookie = `${ACCESS_TOKEN}=${token}; expires=${new Date(Date.now() + time).toUTCString()}; path=/;`;
  }
}
