import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKeyValue = 'ecommerce-quantum';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKeyValue,
  credentials: {
    clientId: 'keVo9CyFCe8ttWKCQE5zZOr6',
    clientSecret: '63HNzyYWKWMSK2Hxnvjs4MpA25SVUWY7',
  },
  scopes: ['manage_my_shopping_lists:ecommerce-quantum'],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  fetch,
};

// eslint-disable-next-line import/prefer-default-export
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKeyValue)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withUserAgentMiddleware()
  .withLoggerMiddleware()
  .build();
