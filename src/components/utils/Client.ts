import { ApiRoot, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
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
}