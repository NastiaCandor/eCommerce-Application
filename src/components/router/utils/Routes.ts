import { Route, RouteCallbacks } from '../../../types';
import PAGES from './pages';

export default class Routes {
  constructor(private callbacks: RouteCallbacks) {
    this.callbacks = callbacks;
  }

  public getRoutes(): Route[] {
    return [
      {
        path: '',
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
    ];
  }
}
