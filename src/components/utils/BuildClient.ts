import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const ID = 'R_YOG6dDBJARc-I5kIvyp6eN';
const SECRET = 'ZCywDVZrjZa-YiOA1PP0wC4dB8MtScTK';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-quantum',
  credentials: {
    clientId: ID,
    clientSecret: SECRET,
  },
  scopes: [
    'view_shopping_lists:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum view_payments:ecommerce-quantum view_orders:ecommerce-quantum manage_my_profile:ecommerce-quantum view_order_edits:ecommerce-quantum view_categories:ecommerce-quantum view_standalone_prices:ecommerce-quantum view_connectors:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum view_attribute_groups:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum view_product_selections:ecommerce-quantum view_shipping_methods:ecommerce-quantum view_products:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_customers:ecommerce-quantum manage_my_payments:ecommerce-quantum view_states:ecommerce-quantum view_types:ecommerce-quantum manage_my_orders:ecommerce-quantum',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
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
