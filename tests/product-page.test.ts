/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TypedMoney, Price, ProductDiscount } from '@commercetools/platform-sdk';
import ClientAPI from '../src/components/utils/Client';
import ProductView from '../src/components/view/product-page/ProductView';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('Product Page', () => {
  let productView: ProductView;
  const wrapperTest = {
    tag: 'wrapper',
  };
  let wrapper: ElementCreator;
  let prices: Price[];
  let clientAPI: any;

  beforeEach(() => {
    clientAPI = {
      test: {
        baseUri: 'https://api.europe-west1.gcp.commercetools.com',
      },
      apiRoot: {
        args: {
          pathArgs: { projectKey: 'ecommerce-quantum' },
          baseUri: 'https://api.europe-west1.gcp.commercetools.com',
        },
        executeRequest: () => {},
      },
      getProductById: (value: string) => Promise.resolve(value),
      loginClient: (value: string) => Promise.resolve(value),
      getDiscountById: (value: string) => Promise.resolve(value),
      getCustomers: (value: string) => Promise.resolve(value),
      registerClient: (value: string) => Promise.resolve(value),
      obtainUserAccessToken: (value: string) => Promise.resolve(value),
      setAccessTokenCookie: (value: string) => Promise.resolve(value),
    };
    productView = new ProductView(<ClientAPI>(<unknown>clientAPI), '5673e423-c01e-4b35-9ef0-86b1043d08b4');
    Object.defineProperties(productView, {
      clientAPI: {
        value: clientAPI,
      },
    });
    wrapper = new ElementCreator(wrapperTest);
    prices = [
      {
        value: {
          centAmount: 2000,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
        id: '',
      },
    ];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Postcode ProductView should be an ElementCreator instance', () => {
    expect(productView).toBeInstanceOf(ProductView);
  });

  it('formatMoney(money) 5200 USD to equal be $52.50', () => {
    const money: TypedMoney = {
      centAmount: 5250,
      currencyCode: 'USD',
      fractionDigits: 2,
      type: 'centPrecision',
    };
    const test = Object.getPrototypeOf(productView);
    expect(test.formatMoney(money)).toBe('$52.50');
  });

  it('formatMoney(money) 5200 EUR to equal be €52.50', () => {
    const money: TypedMoney = {
      centAmount: 50,
      currencyCode: 'EUR',
      fractionDigits: 2,
      type: 'centPrecision',
    };
    const test = Object.getPrototypeOf(productView);
    expect(test.formatMoney(money)).toBe('€0.50');
  });

  it('priceDisplay() should trigger injectProductPrice() if there is price on product', () => {
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectProductPrice');
    test.priceDisplay(wrapper, prices);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('priceDisplay() should not trigger injectProductPrice() if there is no price on product', () => {
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectProductPrice');
    test.priceDisplay(wrapper, []);
    expect(methodToSpy).toHaveBeenCalledTimes(0);
  });

  it('injectPhoto() should trigger injectNoImage() if there is no image of a product', () => {
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectNoImage');
    test.injectPhoto(wrapper, []);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('fillProductInfoSide() should not trigger injectProductSubtitle() if there is no atributes of a product', () => {
    const body = {
      name: 'name',
      masterVariant: {
        name: 'f',
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectProductSubtitle');
    test.fillProductInfoSide(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(0);
  });

  it('fillProductInfoSide() should trigger injectProductSubtitle() if there is atributes of a product', () => {
    const body = {
      name: 'name',
      masterVariant: {
        name: 'f',
        attributes: [{}, { lable: 'label' }, { value: { lable: 'label' } }, { lable: 'label' }],
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectProductSubtitle');
    test.fillProductInfoSide(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('fillProductAside() should not trigger priceDisplay() if there are no prices of a product', () => {
    const body = {
      name: 'name',
      masterVariant: {
        name: 'f',
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'priceDisplay');
    test.fillProductAside(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(0);
  });

  it('fillProductAside() should trigger priceDisplay() if there are prices of a product', () => {
    const body = {
      name: 'name',
      masterVariant: {
        name: 'f',
        prices,
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'priceDisplay');
    test.fillProductAside(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('injectNotFoundMessage() should return undefined', () => {
    const test = Object.getPrototypeOf(productView);
    expect(test.injectNotFoundMessage(wrapper)).toBeUndefined();
  });

  it('fillProductAside() should trigger injectDescription() if there is description of a product', () => {
    const body = {
      description: 'name',
      masterVariant: {
        name: 'f',
        prices,
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectDescription');
    test.fillAdditionalSide(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('fillProductPhotoSide() should not trigger injectPhoto() if there are no images of a product', () => {
    const body = {
      description: 'name',
      masterVariant: {
        name: 'f',
        prices,
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectPhoto');
    test.fillProductPhotoSide(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(0);
  });

  it('fillProductPhotoSide() should trigger injectPhoto() if there are images of a product', () => {
    const body = {
      description: 'name',
      masterVariant: {
        name: 'f',
        prices,
        images: [],
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectPhoto');
    test.fillProductPhotoSide(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('fillProductAside() should trigger injectPhoto() if there are images of a product', () => {
    const body = {
      description: 'name',
      masterVariant: {
        name: 'f',
        prices,
        images: [1, 2],
        availability: { availableQuantity: 1 },
      },
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectAviabilityInfo');
    test.fillProductAside(wrapper, body);
    expect(methodToSpy).toHaveBeenCalledTimes(1);
  });

  it('injectProductPrice() should not trigger injectProductPrice() if there is no discounted price on product', () => {
    const priceTest: Price = {
      value: {
        centAmount: 2000,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision',
      },
      id: '',
    };
    const test = Object.getPrototypeOf(productView);
    const methodToSpy = jest.spyOn(test, 'injectDiscountedPrices');
    test.injectProductPrice(wrapper, priceTest);
    expect(methodToSpy).toHaveBeenCalledTimes(0);
  });

  it('injectDiscountInfo() should return undefined', () => {
    const priceTest: ProductDiscount = {
      value: {
        type: 'relative',
        permyriad: 2000,
      },
      id: '',
      name: { 'en-US': 'name' },
      createdAt: '',
      isActive: true,
      version: 10,
      lastModifiedAt: '',
      predicate: '',
      sortOrder: '0',
      references: [],
      description: { 'en-US': 'name' },
    };
    const test = Object.getPrototypeOf(productView);
    expect(test.injectDiscountInfo(wrapper, priceTest)).toBeUndefined();
  });

  it('injectTrackList() should return undefined', () => {
    const text = 'fff\nvddvdv';
    const test = Object.getPrototypeOf(productView);
    expect(test.injectTrackList(wrapper, text)).toBeUndefined();
  });
});