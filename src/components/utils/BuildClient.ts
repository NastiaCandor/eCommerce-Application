import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const ID = 'R_YOG6dDBJARc-I5kIvyp6eN';
const SECRET = 'ZCywDVZrjZa-YiOA1PP0wC4dB8MtScTK';

// Configure authMiddlewareOptions
// export const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: 'https://auth.europe-west1.gcp.commercetools.com',
//   projectKey: 'ecommerce-quantum',
//   credentials: {
//     clientId: ID,
//     clientSecret: SECRET,
//   },
//   scopes: [
// eslint-disable-next-line max-len
//     'view_shopping_lists:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum view_payments:ecommerce-quantum view_orders:ecommerce-quantum manage_my_profile:ecommerce-quantum view_order_edits:ecommerce-quantum view_categories:ecommerce-quantum view_standalone_prices:ecommerce-quantum view_connectors:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum view_attribute_groups:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum view_product_selections:ecommerce-quantum view_shipping_methods:ecommerce-quantum view_products:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_customers:ecommerce-quantum manage_my_payments:ecommerce-quantum view_states:ecommerce-quantum view_types:ecommerce-quantum manage_my_orders:ecommerce-quantum',
//   ],
//   fetch,
// };

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-quantum',
  credentials: {
    clientId: 'm8b3A8kYJ1zazakVPpVgS0kK',
    clientSecret: 'xe1l9qhNQHlb3YBOtNo_XzK5_8FawFLh',
  },
  scopes: [
    'manage_attribute_groups:ecommerce-quantum manage_my_profile:ecommerce-quantum manage_categories:ecommerce-quantum manage_api_clients:ecommerce-quantum manage_my_orders:ecommerce-quantum manage_payments:ecommerce-quantum manage_product_selections:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum manage_order_edits:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_cart_discounts:ecommerce-quantum manage_extensions:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum manage_business_units:ecommerce-quantum manage_project:ecommerce-quantum manage_import_containers:ecommerce-quantum manage_connectors_deployments:ecommerce-quantum manage_orders:ecommerce-quantum manage_customer_groups:ecommerce-quantum manage_audit_log:ecommerce-quantum manage_customers:ecommerce-quantum manage_my_payments:ecommerce-quantum manage_products:ecommerce-quantum manage_discount_codes:ecommerce-quantum manage_associate_roles:ecommerce-quantum manage_connectors:ecommerce-quantum',
  ],
};
export const anonMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-quantum',
  credentials: {
    clientId: ID,
    clientSecret: SECRET,
    // anonymousId: 'anonID123',
  },
  scopes: [
    'view_shopping_lists:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum view_payments:ecommerce-quantum view_orders:ecommerce-quantum manage_my_profile:ecommerce-quantum view_order_edits:ecommerce-quantum view_categories:ecommerce-quantum view_standalone_prices:ecommerce-quantum view_connectors:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum view_attribute_groups:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum view_product_selections:ecommerce-quantum view_shipping_methods:ecommerce-quantum view_products:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_customers:ecommerce-quantum manage_my_payments:ecommerce-quantum view_states:ecommerce-quantum view_types:ecommerce-quantum manage_my_orders:ecommerce-quantum',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()

  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();

export { ctpClient, SECRET, ID };
