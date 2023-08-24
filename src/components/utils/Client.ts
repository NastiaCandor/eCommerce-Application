/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerDraft,
  CustomerSignin,
  // QueryParam,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient } from './BuildClient';
import { ACCESS_TOKEN } from '../constants';

export default class ClientAPI {
  test: ApiRoot;

  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.test = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.test.withProjectKey({ projectKey: 'ecommerce-quantum' });
  }

  public async loginClient(clientEmail: string, clientPassword: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const body: CustomerSignin = {
      email: clientEmail,
      password: clientPassword,
    };
    const loginAPI = await apiRoot.login().post({ body }).execute();
    return loginAPI;
  }

  public getCustomers() {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      queryArgs: {
        limit: 500,
      },
    };
    const customersAPI = () => apiRoot.customers().get(args).execute();
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
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
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

    const registerAPI = await apiRoot.customers().post({ body }).execute();
    return registerAPI;
  }

  public async obtainUserAccessToken(clientEmail: string, clientPassword: string) {
    const url = 'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce-quantum/customers/token';
    const credentials = {
      clientId: 'dS_IDDkqYFktWCp4tVv8XbIR',
      clientSecret: 'xR6ABVakMAv1yPHq6tLugX4jGCV5khR2',
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

    const data = await response.json();
    if (data) {
      this.setAccessTokenCookie(data.access_token, data.expires_in);
    }
  }

  private setAccessTokenCookie(token: string, time: number): void {
    document.cookie = `${ACCESS_TOKEN}=${token}; expires=${new Date(Date.now() + time).toUTCString()}; path=/;`;
  }
}
