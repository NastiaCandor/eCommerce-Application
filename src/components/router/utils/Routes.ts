import { PrefetchedData, Route, RouteCallbacks } from '../../../types';
import PAGES from './pages';
import ClientAPI from '../../utils/Client';

export default class Routes {
  private callbacks: RouteCallbacks;

  private prefetchedData: PrefetchedData;

  constructor(callbacks: RouteCallbacks, clientApi: ClientAPI) {
    this.callbacks = callbacks;
    this.prefetchedData = clientApi.getPrefetchedData;
  }

  public getRoutes(): Route[] {
    const routes = [
      {
        path: '/',
        callback: () => {
          this.callbacks.loadMainPage();
        },
      },
      {
        path: `${PAGES.LOG_IN}`,
        callback: () => {
          this.callbacks.loadLoginPage();
        },
      },
      {
        path: `${PAGES.CART}`,
        callback: () => {
          this.callbacks.loadCartPage();
        },
      },
      {
        path: `${PAGES.SIGN_UP}`,
        callback: () => {
          this.callbacks.loadSignupPage();
        },
      },
      {
        path: `${PAGES.PROFILE}`,
        callback: () => {
          this.callbacks.loadProfilePage();
        },
      },
      {
        path: `${PAGES.MAIN}`,
        callback: () => {
          this.callbacks.loadMainPage();
        },
      },
      {
        path: `${PAGES.LOG_OUT}`,
        callback: () => {
          this.callbacks.logoutUser();
        },
      },
      {
        path: `${PAGES.CATALOG}`,
        callback: () => {
          this.callbacks.loadCatalogPage();
        },
      },
      {
        path: `${PAGES.CATEGORIES}`,
        callback: () => {
          this.callbacks.loadCategoriesPage();
        },
      },
      {
        path: `${PAGES.CONTACTS}`,
        callback: () => {
          this.callbacks.loadContactsPage();
        },
      },
      {
        path: `${PAGES.SHIPPING}`,
        callback: () => {
          this.callbacks.loadShippingPage();
        },
      },
      {
        path: `${PAGES.NOT_FOUND}`,
        callback: () => {
          this.callbacks.loadNotFoundPage();
        },
      },
      {
        path: `${PAGES.PRODUCT}`,
        callback: (id?: string) => {
          this.callbacks.loadProductPage(id ?? '');
        },
      },
      {
        path: `${PAGES.PRODUCTS}`,
        callback: (id?: string) => {
          this.callbacks.loadProductPage(id ?? '');
        },
      },
    ];

    this.prefetchedData.genres
      .map((route) => ({
        path: `${PAGES.CATEGORY}/${route.key}`,
        callback: () => {
          this.callbacks.mountCategory(route.key);
        },
      }))
      .forEach((item) => routes.push(item));
    this.prefetchedData.genres
      .map((route) => ({
        path: `${PAGES.CATEGORY}/${route.key}`,
        callback: () => {
          this.callbacks.mountCategory(route.key);
        },
      }))
      .forEach((item) => routes.push(item));

    const { keys } = this.prefetchedData.productsUrl;
    const productRoutes = this.linkNamesHelper(keys);
    productRoutes
      .map(([route, ,]) => ({
        path: `${PAGES.PRODUCT}/${route}`,
        callback: () => {
          this.callbacks.loadProductPage(route);
        },
      }))
      .forEach((route) => routes.push(route));

    return routes;
  }

  private linkNamesHelper(keys: string[][]) {
    const values = keys.map(([record, singer]) => {
      const recordName = this.formatRecordName(record);
      const route = this.formatRecordName(record, true);
      const title = `${recordName} - ${singer}`;
      return [route, title];
    });
    return values;
  }

  private formatRecordName(record: string, isRoute = false): string {
    if (isRoute) {
      return record.split('-').join('_');
    }
    return record
      .split('-')
      .map((item) => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`)
      .join(' ');
  }

  public get getTitlesMap(): Map<string, string> {
    const titlesMap: Map<string, string> = new Map();
    const { keys } = this.prefetchedData.productsUrl;
    const array = this.linkNamesHelper(keys);
    array.forEach(([key, value]) => titlesMap.set(key, value));
    return titlesMap;
  }
}
