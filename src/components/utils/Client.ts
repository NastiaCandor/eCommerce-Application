/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerChangePassword,
  CustomerDraft,
  CustomerSignin,
  CustomerUpdate,
  MyCartUpdate,
  createApiBuilderFromCtpClient,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient, getExistingTokenFlow, ID, SECRET } from './BuildClient';
import { ACCESS_TOKEN, ANONYMOUS_TOKEN, COOKIE_RESET_DATE, CUSTOMER_ID } from '../constants';

import { EndPointsObject, PrefetchedData, PrefetchedGenres } from '../../types';

enum UserState {
  Observer,
  Logged,
  Anonymous,
}

export default class ClientAPI {
  public prefetchedData: PrefetchedData;

  private apiBuilder: ApiRoot;

  private apiRoot: ByProjectKeyRequestBuilder;

  private anonymousId: string;

  private userLogged: UserState;

  private anonymousCartId: string;

  private cartId: string;

  private cartVersion: number;

  constructor() {
    this.apiBuilder = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.apiBuilder.withProjectKey({ projectKey: 'ecommerce-quantum' });
    this.prefetchedData = {
      genres: [],
      attributes: {
        condition: [],
        label: [],
        lp: [],
      },
      prices: {
        max: 0,
        min: 0,
        avg: 0,
        maxFractured: 0,
        minFractured: 0,
      },
      productsUrl: {
        ids: new Map<string, string>(),
        keys: [],
      },
    };
    this.userLogged = this.checkUserLogged();
    this.anonymousId = '';
    this.anonymousCartId = '';
    this.cartId = '';
    this.cartVersion = 1;
  }

  public resetDefaultClientAPI() {
    this.userLogged = UserState.Observer;
    this.apiBuilder = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.apiBuilder.withProjectKey({ projectKey: 'ecommerce-quantum' });
    this.anonymousId = '';
    this.anonymousCartId = '';
    this.cartId = '';
    this.cartVersion = 1;
  }

  private checkUserLogged() {
    const loggedToken = this.getAccessToken(ACCESS_TOKEN);
    const anonymToken = this.getAccessToken(ANONYMOUS_TOKEN);
    if (loggedToken === '' && anonymToken === '') return UserState.Observer;
    if (loggedToken !== '') {
      this.apiRoot = createApiBuilderFromCtpClient(getExistingTokenFlow(`Bearer ${loggedToken}`)).withProjectKey({
        projectKey: 'ecommerce-quantum',
      });
      return UserState.Logged;
    }
    this.apiRoot = createApiBuilderFromCtpClient(getExistingTokenFlow(`Bearer ${anonymToken}`)).withProjectKey({
      projectKey: 'ecommerce-quantum',
    });
    return UserState.Anonymous;
  }

  private getAccessToken(tokenType: string) {
    if (document.cookie === '') return '';
    const allCookies = document.cookie.split(';');
    const isAccessTokenExist = allCookies.some((token) => token.startsWith(tokenType));
    if (!isAccessTokenExist) return '';
    const token = document.cookie
      .split('; ')
      .filter((el) => el.includes(tokenType))
      .map((el) => el.split('='))[0]
      .filter((el) => !el.includes(tokenType))[0];
    return token;
  }

  private deleteAnonymousToken() {
    document.cookie = `${ANONYMOUS_TOKEN}${COOKIE_RESET_DATE}`;
  }

  private updateApiRoot(tokenType: string) {
    const token = this.getAccessToken(tokenType);
    this.apiRoot = createApiBuilderFromCtpClient(getExistingTokenFlow(`Bearer ${token}`)).withProjectKey({
      projectKey: 'ecommerce-quantum',
    });
  }

  private async getActiveCartAPI() {
    if (this.userLogged === UserState.Observer) {
      await this.obtainAnonymusAccessToken();
      await this.updateApiRoot(ANONYMOUS_TOKEN);
      this.userLogged = UserState.Anonymous;
      await this.createCart();
    } else {
      const cartInfo = this.apiRoot.me().carts().get().execute();
      await cartInfo
        .then(async (data) => {
          if (data.body.count === 0) {
            await this.createCart();
          } else {
            await this.getCartId();
          }
        })
        .catch(console.error);
    }
  }

  public async getActiveCartData() {
    await this.getActiveCartAPI();
    const activeCartData = this.apiRoot.me().activeCart().get().execute();
    return activeCartData;
  }

  private async getCartId() {
    const cartInfo = this.apiRoot.me().activeCart().get().execute();
    await cartInfo
      .then(async (data) => {
        this.cartId = data.body.id;
        this.cartVersion = data.body.version;
      })
      .catch((error) => `Error while fetching cart ID: ${error}`);
  }

  private async createCart() {
    const cartInfo = this.apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    await cartInfo
      .then(async (data) => {
        const anonumousId = data.body.anonymousId;
        if (anonumousId !== undefined) this.anonymousId = anonumousId;
        const anonymousCartId = data.body.id;
        if (anonymousCartId !== undefined) this.anonymousCartId = anonymousCartId;
        await this.getCartId();
      })
      .catch(console.log);
  }

  private async obtainAnonymusAccessToken() {
    const url = 'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce-quantum/anonymous/token';
    const credentials = {
      clientId: ID,
      clientSecret: SECRET,
    };
    const authString = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    try {
      const data = await response.json();
      this.setAnonymousTokenCookie(data.access_token, data.expires_in);
    } catch (e) {
      console.log(`${e} occured when fetching access token!`);
    }
  }

  private setAnonymousTokenCookie(token: string, time: number): void {
    const expirationTime = new Date(Date.now() + time * 1000).toUTCString();
    document.cookie = `${ANONYMOUS_TOKEN}=${token}; expires=${expirationTime}; path=/;`;
  }

  public async loginClient(clientEmail: string, clientPassword: string) {
    let body: CustomerSignin;
    if (this.anonymousId !== '' && this.anonymousCartId !== '') {
      body = {
        email: clientEmail,
        password: clientPassword,
        anonymousId: this.anonymousId,
        anonymousCartId: this.anonymousCartId,
        anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
        updateProductData: true,
      };
    } else {
      body = {
        email: clientEmail,
        password: clientPassword,
        anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
      };
    }
    const loginAPI = this.apiRoot.me().login().post({ body }).execute();
    await this.obtainUserAccessToken(clientEmail, clientPassword);
    this.userLogged = UserState.Logged;
    await this.deleteAnonymousToken();
    await this.updateApiRoot(ACCESS_TOKEN);
    await this.getActiveCartAPI();
    return loginAPI;
  }

  public async getCustomerCart(customerId: string) {
    const args = {
      customerId,
    };
    const customersAPI = this.apiRoot.carts().withCustomerId(args).get().execute();
    return customersAPI;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  public async getCartDiscountByID(ID: string) {
    const codes = this.apiRoot.cartDiscounts().withId({ ID }).get().execute();
    return codes;
  }

  public async getDiscountCodes() {
    const codes = this.apiRoot.discountCodes().get().execute();
    return codes;
  }

  public async getCartDiscounts() {
    const codes = this.apiRoot.cartDiscounts().get().execute();
    return codes;
  }

  public async updateItemInCart(lineItemID: string, quantity: number) {
    await this.getActiveCartAPI();
    const body: MyCartUpdate = {
      version: this.cartVersion,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: lineItemID,
          quantity,
        },
      ],
    };
    const updateCartAPI = this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartId })
      .post({
        body,
      })
      .execute();
    // const customersAPI = this.apiRoot.carts().withId(args).post({ body }).execute();
    return updateCartAPI;
  }

  public async removeItemFromCart(lineItemID: string) {
    await this.getActiveCartAPI();
    const body: MyCartUpdate = {
      version: this.cartVersion,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItemID,
        },
      ],
    };
    const removeItemAPI = this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartId })
      .post({
        body,
      })
      .execute();
    return removeItemAPI;
  }

  public async removeAllItemsFromCart(itemIDArr: string[]) {
    await this.getActiveCartAPI();

    const actionsArr: MyCartUpdateAction[] = [];
    itemIDArr.forEach((item) => {
      const actionObj: MyCartUpdateAction = {
        action: 'removeLineItem',
        lineItemId: item,
      };
      actionsArr.push(actionObj);
    });
    const body: MyCartUpdate = {
      version: this.cartVersion,
      actions: actionsArr,
    };
    // const customersAPI = this.apiRoot.me().carts().post({ body }).execute();
    // const customersAPI = this.apiRoot.carts().withId(args).post({ body }).execute();
    const removeAllItemsAPI = this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartId })
      .post({
        body,
      })
      .execute();
    return removeAllItemsAPI;
  }

  public async applyPromoCode(promocode: string) {
    await this.getActiveCartAPI();
    const body: MyCartUpdate = {
      version: this.cartVersion,
      actions: [
        {
          action: 'addDiscountCode',
          code: promocode,
        },
      ],
    };
    const promocodeAPI = this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartId })
      .post({
        body,
      })
      .execute();
    return promocodeAPI;
  }

  public async getProductById(productID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const getProduct = apiRoot.productProjections().withId({ ID: productID }).get().execute();
    return getProduct;
  }

  public async getSearchProduct(search: string, limitNum: number) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const getProduct = apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          fuzzy: true,
          limit: limitNum,
          'text.en-US': search,
        },
      })
      .execute();
    return getProduct;
  }

  public async getDiscountById(discountID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const getProduct = apiRoot.productDiscounts().withId({ ID: discountID }).get().execute();
    return getProduct;
  }

  public getCustomers() {
    const args = {
      queryArgs: {
        limit: 500,
      },
    };
    const customersAPI = () => this.apiRoot.customers().get(args).execute();
    return customersAPI;
  }

  public getCustomerByEmail(customerEmail: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      queryArgs: {
        where: `email="${customerEmail}"`,
      },
    };
    const customersAPI = () => apiRoot.customers().get(args).execute();
    return customersAPI;
  }

  public getCustomerByID(customerID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const customerAPI = () => apiRoot.customers().withId(args).get().execute();
    return customerAPI;
  }

  public async updateCustomerBasicInfo(
    customerVersion: number,
    customerID: string,
    newEmail: string,
    newFirstName: string,
    newLastName: string,
    newDateOfBirth: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'changeEmail',
          email: newEmail,
        },
        {
          action: 'setFirstName',
          firstName: newFirstName,
        },
        {
          action: 'setLastName',
          lastName: newLastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: newDateOfBirth,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async updateCustomerAddress(
    customerID: string,
    customerVersion: number,
    adrsID: string,
    newStreet: string,
    newCity: string,
    newCountry: string,
    newPostcode: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'changeAddress',
          addressId: adrsID,
          address: {
            streetName: newStreet,
            city: newCity,
            country: newCountry,
            postalCode: newPostcode,
          },
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addBillingAddressID(customerID: string, customerVersion: number, lastAddressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addBillingAddressId',
          addressId: lastAddressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addShippingAddressID(customerID: string, customerVersion: number, lastAddressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId: lastAddressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async setDefaultBillingAddress(customerID: string, customerVersion: number, addressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId: addressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async setDefaultShippingAddress(customerID: string, customerVersion: number, addressID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'setDefaultShippingAddress',
          addressId: addressID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async addAddress(
    customerID: string,
    customerVersion: number,
    newStreet: string,
    newCity: string,
    newCountry: string,
    newPostcode: string
  ) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: newStreet,
            city: newCity,
            country: newCountry,
            postalCode: newPostcode,
          },
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public async deleteCustomerAddress(customerID: string, customerVersion: number, adrsID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const args = {
      ID: customerID,
    };
    const body: CustomerUpdate = {
      version: customerVersion,
      actions: [
        {
          action: 'removeAddress',
          addressId: adrsID,
        },
      ],
    };
    const customerAPI = await apiRoot.customers().withId(args).post({ body }).execute();
    return customerAPI;
  }

  public changePassword(customerID: string, customerVersion: number, currentPassword: string, newPassword: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const body: CustomerChangePassword = {
      id: customerID,
      version: customerVersion,
      currentPassword,
      newPassword,
    };
    const customerAPI = () => apiRoot.customers().password().post({ body }).execute();
    return customerAPI;
  }

  public async registerClient(
    newEmail: string,
    newPassword: string,
    newFName: string,
    newLName: string,
    newDateOfBirth: string,
    addressesArr: Address[],
    newShipAdrs: number[],
    newBillAdrs: number[],
    defaultShip: number | undefined,
    defaultBill: number | undefined
  ) {
    const body: CustomerDraft = {
      email: newEmail,
      password: newPassword,
      firstName: newFName,
      lastName: newLName,
      dateOfBirth: newDateOfBirth,
      addresses: addressesArr,
      shippingAddresses: newShipAdrs,
      billingAddresses: newBillAdrs,
      defaultShippingAddress: defaultShip,
      defaultBillingAddress: defaultBill,
    };

    const registerAPI = await this.apiRoot.customers().post({ body }).execute();
    return registerAPI;
  }

  public async getCategoryId(category: string) {
    const categoryKey = { key: category };
    try {
      const data = await this.apiRoot.categories().withKey(categoryKey).get().execute();
      if (data.statusCode === 200) {
        return data.body.id;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return `Unable to fetch ${category}`;
  }

  public async getAllCardsData() {
    try {
      const data = await this.apiRoot.productProjections().search().get().execute();
      if (data.statusCode === 200) {
        return data.body.results;
      }
    } catch (e) {
      console.log(`Error occured while fetching cards data: ${e}`);
    }
  }

  public async getMinPrice() {
    const cheapPriceQuary = {
      queryArgs: {
        sort: ['price asc'],
        limit: 1,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().search().get(cheapPriceQuary).execute();
      const { prices } = data.body.results[0].masterVariant;
      if (data.statusCode === 200 && prices) {
        return prices[0].value.centAmount;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return console.error('Unable to fetch');
  }

  public async getMaxPrice() {
    const discountedPricesQuary = {
      queryArgs: {
        where: 'masterVariant(prices(discounted(value(centAmount > 1))))',
        limit: 100,
      },
    };
    const discountlessPricesQuary = {
      queryArgs: {
        sort: ['price asc'],
        limit: 1,
      },
    };
    try {
      const discounted = await this.apiRoot.productProjections().get(discountedPricesQuary).execute();
      const discountless = await this.apiRoot.productProjections().search().get(discountlessPricesQuary).execute();
      if (discounted.statusCode === 200 && discountless.statusCode === 200) {
        const pricesArray = discounted.body.results.map((item) => {
          if (item.masterVariant.prices) {
            return item.masterVariant.prices[0].discounted?.value.centAmount || 0;
          }
          return 0;
        });
        let maxPrice = Math.max(...pricesArray);
        if (discountless.body.results[0].masterVariant.price) {
          maxPrice = Math.max(discountless.body.results[0].masterVariant.price.value.centAmount, maxPrice);
        }
        return maxPrice;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
    return console.error('Unable to fetch');
  }

  public async getGenresById(id: string) {
    const query = {
      queryArgs: {
        where: `parent(id="${id}")`,
      },
    };
    try {
      const data = await this.apiRoot.categories().get(query).execute();
      if (data.statusCode === 200) {
        const response = data.body;
        return response.results;
      }
    } catch (e) {
      console.log(`Unable to fetch ${id}, status code ${e}`);
    }
  }

  public async getSpecificGenreById(id: string) {
    const query = {
      queryArgs: {
        filter: `categories.id:"${id}"`,
        limit: 100,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().search().get(query).execute();
      if (data.statusCode === 200) {
        const response = data.body;
        return response;
      }
    } catch (e) {
      console.log(`Unable to fetch ${id}, status code ${e}`);
    }
  }

  public async prefetchData() {
    try {
      await this.prefetchGenres();
      await this.prefetchProductUrl();
      await this.prefetchProductAttributes();
      await this.prefetchMinMaxPrices();
    } catch (e) {
      console.error(`Error while gathering the prefetch data: ${e}`);
    }
  }

  private async prefetchProductUrl() {
    const query = {
      queryArgs: {
        filter: ['key:exists', 'id:exists', 'variants.attributes.singer:exists'],
        limit: 100,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().search().get(query).execute();
      if (data.statusCode === 200) {
        const { results } = data.body;
        results.forEach((item) => {
          this.prefetchedData.productsUrl.ids.set(item.id, item.key?.split('-').join('_') ?? 'broken-key');
          const key = [item.key ?? 'broken-key'];
          const { attributes } = item.masterVariant;
          if (attributes) {
            attributes.forEach((attr) => (attr.name === 'singer' ? key.push(attr.value) : ''));
            this.prefetchedData.productsUrl.keys.push(key);
          }
        });
      }
    } catch (e) {
      console.error(`Error while pre-fetching ProductUrl: ${e}`);
    }
  }

  private async prefetchGenres() {
    try {
      const id = await this.getCategoryId('genres');
      const categories = await this.getGenresById(id);
      if (categories) {
        this.prefetchedData.genres = categories.map((category) => {
          const obj: PrefetchedGenres = {
            key: `${category.key}`,
            name: category.name['en-US'],
            id: category.id,
          };
          return obj;
        });
      }
    } catch (e) {
      console.error(`Error while fetching genres: ${e}`);
    }
  }

  public async getProductVariantAttributes() {
    const query = {
      queryArgs: {
        limit: 100,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().get(query).execute();
      if (data.statusCode === 200) {
        return data.body.results;
      }
    } catch (e) {
      console.log(`An error has occured ${e}`);
    }
  }

  private async prefetchProductAttributes() {
    try {
      const fetchedAttributes = await this.getProductVariantAttributes();
      if (fetchedAttributes) {
        const [conditionsSet, labelSet, LpsSet] = [new Set<string>(), new Set<string>(), new Set<string>()];
        fetchedAttributes.forEach((attribute) => {
          const { attributes } = attribute.masterVariant;
          if (attributes) {
            attributes.forEach((attr) => {
              if (attr.name === 'condition') conditionsSet.add(attr.value.trim());
              if (attr.name === 'label') labelSet.add(attr.value.trim());
              if (attr.name === 'LP') LpsSet.add(attr.value.key.trim());
            });
          }
        });
        const conditionArr: string[] = [];
        const labelArr: string[] = [];
        const lpsArr: string[] = [];

        conditionsSet.forEach((condition) => conditionArr.push(condition));
        labelSet.forEach((label) => labelArr.push(label));
        LpsSet.forEach((lp) => lpsArr.push(lp));
        this.prefetchedData.attributes = {
          condition: conditionArr,
          label: labelArr,
          lp: lpsArr,
        };
      }
    } catch (e) {
      console.error(`Error while fetching genres: ${e}`);
    }
  }

  private async prefetchMinMaxPrices() {
    try {
      const minPrice = await this.getMinPrice();
      const maxPrice = await this.getMaxPrice();
      if (minPrice && maxPrice) {
        const avgPrice = minPrice + maxPrice / 2;
        const minFracturedPrice = avgPrice / 2;
        const maxFracturedPrice = avgPrice + avgPrice / 2;
        const prices = {
          min: minPrice,
          avg: avgPrice,
          max: maxPrice,
          minFractured: minFracturedPrice,
          maxFractured: maxFracturedPrice,
        };
        this.prefetchedData.prices = prices;
      }
    } catch (e) {
      console.error(`Error while prefetching min-max prices: ${e}`);
    }
  }

  public async fetchFilterQuary(endPoints: EndPointsObject) {
    const query = {
      queryArgs: {
        filter: endPoints.filter,
        priceCurrency: 'USD',
        sort: endPoints.sort,

        limit: 100,
      },
    };

    try {
      const data = await this.apiRoot.productProjections().search().get(query).execute();
      if (data.statusCode === 200) {
        console.log(data.body.results);
        return data.body.results;
      }
    } catch (e) {
      console.error(`Unable to fetch filter quary: ${e}`);
    }
  }

  public async obtainUserAccessToken(clientEmail: string, clientPassword: string) {
    const url = 'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerce-quantum/customers/token';
    const credentials = {
      clientId: ID,
      clientSecret: SECRET,
    };
    const authString = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${clientEmail}&password=${clientPassword}`,
    });

    try {
      const data = await response.json();
      this.setAccessTokenCookie(data.access_token, data.expires_in);
    } catch (e) {
      console.log(`${e} occured when fetching access token!`);
    }
  }

  private setAccessTokenCookie(token: string, time: number): void {
    const expirationTime = new Date(Date.now() + time * 1000).toUTCString();
    document.cookie = `${ACCESS_TOKEN}=${token}; expires=${expirationTime}; path=/;`;
  }

  public setCustomerIDCookie(id: string): void {
    console.log(document.cookie);

    const expirationTime = new Date(Date.now() + 172800 * 1000).toUTCString();
    document.cookie = `${CUSTOMER_ID}=${id}; expires=${expirationTime}; path=/;`;
  }

  public get getPrefetchedData() {
    return this.prefetchedData;
  }
}
