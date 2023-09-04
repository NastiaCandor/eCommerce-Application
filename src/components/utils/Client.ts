/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
import {
  Address,
  ApiRoot,
  CustomerDraft,
  CustomerSignin,
  createApiBuilderFromCtpClient,
  // CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { ctpClient, SECRET, ID } from './BuildClient';
import { ACCESS_TOKEN } from '../constants';

import { EndPointsObject, PrefetchedData, PrefetchedGenres } from '../../types';

export default class ClientAPI {
  apiBuilder: ApiRoot;

  apiRoot: ByProjectKeyRequestBuilder;

  prefetchedData: PrefetchedData;

  constructor() {
    this.apiBuilder = createApiBuilderFromCtpClient(ctpClient);
    this.apiRoot = this.apiBuilder.withProjectKey({ projectKey: 'ecommerce-quantum' });
    this.prefetchedData = <PrefetchedData>{};
  }

  public async loginClient(clientEmail: string, clientPassword: string) {
    const body: CustomerSignin = {
      email: clientEmail,
      password: clientPassword,
    };
    const loginAPI = await this.apiRoot.login().post({ body }).execute();
    return loginAPI;
  }

  public async getProductById(productID: string) {
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-quantum' });
    const getProduct = apiRoot.productProjections().withId({ ID: productID }).get().execute();
    // const getProduct2 = apiRoot.categories().get().execute();
    // getProduct2.then(console.log).catch(console.log);
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
      const data = await this.apiRoot.products().get().execute();
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
        where: `categories(id="${id}")`,
      },
    };
    try {
      const data = await this.apiRoot.productProjections().get(query).execute();
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
      if (!this.prefetchedData.genres) await this.prefetchGenres();
      if (!this.prefetchedData.attributes) await this.prefetchProductAttributes();
      if (!this.prefetchedData.prices) await this.prefetchMinMaxPrices();
    } catch (e) {
      console.error(`Error while gathering the prefetch data: ${e}`);
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
    console.log(endPoints);
    const query = {
      queryArgs: {
        filter: endPoints.filter,
        priceCurrency: 'USD',
        sort: ['variants.scopedPrice.currentValue.centAmount asc'],
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
    document.cookie = `${ACCESS_TOKEN}=${token}; expires=${new Date(Date.now() + time).toUTCString()}; path=/;`;
  }

  public get getPrefetchedData() {
    return this.prefetchedData;
  }
}
