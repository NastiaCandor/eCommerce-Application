/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ctpClient from './BuildClient';

export default class ClientAPI {
  test: ApiRoot;

  apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.test = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.test.withProjectKey({ projectKey: 'ecommerce-quantum' });
  }

  public loginClient(clientEmail: string, clientPassword: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const body: CustomerSignin = {
      email: clientEmail,
      password: clientPassword,
    };
    const loginAPI = () => apiRoot.login().post({ body }).execute();
    return loginAPI;
  }

  public registerClient(
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

    const registerAPI = () => apiRoot.customers().post({ body }).execute();
    return registerAPI;
  }
}
