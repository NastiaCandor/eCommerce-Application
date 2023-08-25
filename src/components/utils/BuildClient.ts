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
    clientId: 'ETd8705V3-XUvzc6djOCx_Cg',
    clientSecret: 'MGqojSSUE-nXrlFdR7tEE73Vn767gwKW',
  },
  scopes: [
    'view_shopping_lists:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum view_payments:ecommerce-quantum view_orders:ecommerce-quantum manage_my_profile:ecommerce-quantum view_order_edits:ecommerce-quantum view_categories:ecommerce-quantum view_standalone_prices:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum view_product_selections:ecommerce-quantum view_shipping_methods:ecommerce-quantum manage_my_payments:ecommerce-quantum view_states:ecommerce-quantum view_published_products:ecommerce-quantum manage_customers:ecommerce-quantum view_types:ecommerce-quantum manage_my_orders:ecommerce-quantum',
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
