/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

export default class ClientAPI {
  public loginClient(clientEmail: string, clientPassword: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const loginAPI = () =>
      apiRoot
        .login()
        .post({
          body: {
            email: clientEmail,
            password: clientPassword,
          },
        })
        .execute();
    return loginAPI;
  }
}
