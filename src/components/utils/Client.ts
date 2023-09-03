/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerChangePassword,
  CustomerDraft,
  CustomerSignin,
  CustomerUpdate,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient } from './BuildClient';
import { ACCESS_TOKEN, CUSTOMER_ID } from '../constants';

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

  public getCustomerByEmail(customerEmail: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      queryArgs: {
        where: `email="${customerEmail}"`,
      },
    };
    const customersAPI = () => apiRoot.customers().get(args).execute();
    return customersAPI;
  }

  public getCustomerByID(customerID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const customerAPI = () => apiRoot.customers().withId(args).get().execute();
    return customerAPI;
  }

  public async updateCustomerBasicInfo(
    customerVersion: number,
    customerID: string,
    newEmail: string,
    newFirstName: string,
    newLastName: string,
    newDateOfBirth: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'changeEmail',
          email: newEmail,
        },
        {
          action: 'setFirstName',
          firstName: newFirstName,
        },
        {
          action: 'setLastName',
          lastName: newLastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: newDateOfBirth,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async updateCustomerAddress(
    customerID: string,
    customerVersion: number,
    adrsID: string,
    newStreet: string,
    newCity: string,
    newCountry: string,
    newPostcode: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'changeAddress',
          addressId: adrsID,
          address: {
            streetName: newStreet,
            city: newCity,
            country: newCountry,
            postalCode: newPostcode,
          },
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addBillingAddressID(customerID: string, customerVersion: number, lastAddressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addBillingAddressId',
          addressId: lastAddressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addShippingAddressID(customerID: string, customerVersion: number, lastAddressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId: lastAddressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async setDefaultBillingAddress(customerID: string, customerVersion: number, addressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId: addressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async setDefaultShippingAddress(customerID: string, customerVersion: number, addressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'setDefaultShippingAddress',
          addressId: addressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addAddress(
    customerID: string,
    customerVersion: number,
    newStreet: string,
    newCity: string,
    newCountry: string,
    newPostcode: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: newStreet,
            city: newCity,
            country: newCountry,
            postalCode: newPostcode,
          },
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async deleteCustomerAddress(customerID: string, customerVersion: number, adrsID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'removeAddress',
          addressId: adrsID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public changePassword(customerID: string, customerVersion: number, currentPassword: string, newPassword: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const body: CustomerChangePassword = {
      id: customerID,
      version: customerVersion,
      currentPassword,
      newPassword,
    };
    const customerAPI = () => apiRoot.customers().password().post({ body }).execute();
    return customerAPI;
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
    const expirationTime = new Date(Date.now() + time * 1000).toUTCString();
    document.cookie = `${ACCESS_TOKEN}=${token}; expires=${expirationTime}; path=/;`;
  }

  public setCustomerIDCookie(id: string): void {
    const expirationTime = new Date(Date.now() + 172800 * 1000).toUTCString();
    document.cookie = `${CUSTOMER_ID}=${id}; expires=${expirationTime}; path=/;`;
  }
}
