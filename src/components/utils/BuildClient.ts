import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

// const ID = 'R_YOG6dDBJARc-I5kIvyp6eN' old;
const ID = 'zLvduWdvQPS-Xtrrr256oLRV';
// const SECRET = 'ZCywDVZrjZa-YiOA1PP0wC4dB8MtScTK' old;
const SECRET = 'hqnEtBSOTXVTLwYjLusMbUN92YeaG010';
// const PROJECT_KEY = 'ecommerce-quantum' old;
const PROJECT_KEY = 'vinyl-vibe-store';
const AUTH_HOST = 'https://auth.europe-west1.gcp.commercetools.com';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_HOST,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: ID,
    clientSecret: SECRET,
  },
  scopes: [
    // eslint-disable-next-line max-len
    // 'view_shopping_lists:ecommerce-quantum introspect_oauth_tokens:ecommerce-quantum manage_my_shopping_lists:ecommerce-quantum view_payments:ecommerce-quantum view_orders:ecommerce-quantum manage_my_profile:ecommerce-quantum view_order_edits:ecommerce-quantum view_categories:ecommerce-quantum view_standalone_prices:ecommerce-quantum view_connectors:ecommerce-quantum view_discount_codes:ecommerce-quantum view_cart_discounts:ecommerce-quantum view_attribute_groups:ecommerce-quantum manage_my_quote_requests:ecommerce-quantum manage_my_quotes:ecommerce-quantum manage_my_business_units:ecommerce-quantum view_product_selections:ecommerce-quantum view_shipping_methods:ecommerce-quantum view_products:ecommerce-quantum create_anonymous_token:ecommerce-quantum manage_customers:ecommerce-quantum manage_my_payments:ecommerce-quantum view_states:ecommerce-quantum view_types:ecommerce-quantum manage_my_orders:ecommerce-quantum',
    'manage_shipping_methods:vinyl-vibe-store manage_my_shopping_lists:vinyl-vibe-store manage_categories:vinyl-vibe-store manage_payments:vinyl-vibe-store manage_my_payments:vinyl-vibe-store manage_cart_discounts:vinyl-vibe-store manage_quote_requests:vinyl-vibe-store view_cart_discounts:vinyl-vibe-store view_products:vinyl-vibe-store manage_states:vinyl-vibe-store introspect_oauth_tokens:vinyl-vibe-store view_standalone_prices:vinyl-vibe-store view_shopping_lists:vinyl-vibe-store manage_business_units:vinyl-vibe-store view_order_edits:vinyl-vibe-store manage_orders:vinyl-vibe-store manage_my_quote_requests:vinyl-vibe-store manage_discount_codes:vinyl-vibe-store manage_customers:vinyl-vibe-store manage_attribute_groups:vinyl-vibe-store manage_products:vinyl-vibe-store manage_my_quotes:vinyl-vibe-store view_categories:vinyl-vibe-store view_business_units:vinyl-vibe-store create_anonymous_token:vinyl-vibe-store manage_product_selections:vinyl-vibe-store manage_my_orders:vinyl-vibe-store view_quote_requests:vinyl-vibe-store manage_shopping_lists:vinyl-vibe-store view_published_products:vinyl-vibe-store manage_types:vinyl-vibe-store manage_my_business_units:vinyl-vibe-store manage_connectors:vinyl-vibe-store manage_my_profile:vinyl-vibe-store',
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
  .withUserAgentMiddleware()
  .build();

// EXISTING TOKEN FLOW
type ExistingTokenMiddlewareOptions = {
  force?: boolean;
};

// Function to get Existing Token Flow for ClientBuilder
export function getExistingTokenFlow(existingToken: string) {
  const authorization = existingToken;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };
  const loggedClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withExistingTokenFlow(authorization, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return loggedClient;
}

export { ctpClient, SECRET, ID };
