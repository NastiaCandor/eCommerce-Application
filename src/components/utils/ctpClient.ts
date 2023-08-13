// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

const projectKeyValue = 'ecommerce-quantum';

// eslint-disable-next-line max-len
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKeyValue });

// eslint-disable-next-line import/prefer-default-export
export async function getProjectDetails() {
  try {
    const message = await apiRoot.get().execute();
    return console.log(message);
  } catch (message_1) {
    return console.error(message_1);
  }
}
