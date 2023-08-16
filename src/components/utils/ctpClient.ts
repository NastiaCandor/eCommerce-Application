// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

const projectKeyValue = 'ecommerce-quantum';

export default class ApiRequests {
  // public apiRoot
  static apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKeyValue,
  });

  static async getCountries(): Promise<void | string[]> {
    try {
      const message = await this.apiRoot.get().execute();
      const { countries } = message.body;
      console.log(countries);
      return countries;
    } catch (message_1) {
      return console.log(message_1);
    }
  }

  // public async getCountries(): Promise<void | string[]> {
  //   try {
  //     const message = await this.apiRoot.get().execute();
  //     const { countries } = message.body;
  //     console.log(countries);
  //     return countries;
  //   } catch (message_1) {
  //     return console.log(message_1);
  //   }
  // }
}
