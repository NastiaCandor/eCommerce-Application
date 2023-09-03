import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
// import SdkAuth from '@commercetools/sdk-client-v2';
// import { createRequestBuilder } from '@commercetools/api-request-builder'
// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-quantum',
  credentials: {
    clientId: 'dS_IDDkqYFktWCp4tVv8XbIR',
    clientSecret: 'xR6ABVakMAv1yPHq6tLugX4jGCV5khR2',
  },
  scopes: [
    'view_shipping_methods:ecommerce-quantum create_anonymous_token:ecommerce-quantum view_payments:ecommerce-quantum view_categories:ecommerce-quantum view_types:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum view_published_products:ecommerce-quantum manage_customers:ecommerce-quantum',
  ],
  // eslint-disable-next-line object-shorthand
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-quantum',
  credentials: {
    clientId: 'dS_IDDkqYFktWCp4tVv8XbIR',
    clientSecret: 'xR6ABVakMAv1yPHq6tLugX4jGCV5khR2',
    user: {
      username: '',
      password: '',
    },
  },
  scopes: [`manage_project:${'ecommerce-quantum'}`],
  fetch,
};
const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // view all responses and requests
  .build();

const authClient = new ClientBuilder().withPasswordFlow(passwordAuthMiddlewareOptions).build();

// Export the ClientBuilder
export { ctpClient, authClient };
