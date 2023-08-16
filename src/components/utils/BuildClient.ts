import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

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
  fetch,
};

// Configure httpMiddlewareOptions

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // view all responses and requests
  .build();

// Export the ClientBuilder
export default ctpClient;

