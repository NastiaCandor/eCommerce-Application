import { PrefetchedGenres, Route, RouteCallbacks } from '../../../types';
import PAGES from './pages';
import ClientAPI from '../../utils/Client';

export default class Routes {
  private callbacks: RouteCallbacks;

  private prefetchedData: PrefetchedGenres[];

  constructor(callbacks: RouteCallbacks, clientApi: ClientAPI) {
    this.callbacks = callbacks;
    this.prefetchedData = clientApi.getPrefetchedData.genres;
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
          this.callbacks.loadCatalogPage();
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
        callback: () => {
          this.callbacks.loadProductPage();
        },
      },
    ];

    this.prefetchedData
      .map((route) => ({
        path: `${PAGES.CATEGORY}/${route.key}`,
        callback: () => {
          this.callbacks.mountCategory(route.key);
        },
      }))
      .forEach((item) => routes.push(item));
    return routes;
  }
}
