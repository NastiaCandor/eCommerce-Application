import { Route } from '../../types';
import PAGES from '../router/pages';
import Router from '../router/Router';
import CartView from '../view/cart/CartView';
import HeaderView from '../view/header/HeaderView';
import LoginView from '../view/login/LoginView';
import MainView from '../view/main/MainView';
import NotFoundView from '../view/not-found-page/NotFoundView';
import AboutView from '../view/pages/about/AboutView';
import CatalogView from '../view/pages/catalog/CatalogView';
import ContactsView from '../view/pages/contacts/ContactsView';
import ShippingView from '../view/pages/shipping/ShippingView';
import RegView from '../view/registration/reg-view';

export default class App {
  private header: HeaderView;

  private main: MainView;

  private router: Router;

  constructor() {
    const routes = this.createRoutes();
    this.main = new MainView();
    this.router = new Router(routes);
    this.header = new HeaderView(this.router);
  }

  public start(): void {
    this.header.render();
    this.main.render();
  }

  private setContent(page: string, view: HTMLElement) {
    this.header.updateLinksStatus(page);
    this.main.setContent(view);
  }

  private createRoutes(): Route[] {
    return [
      {
        path: '',
        callback: () => {},
      },
      {
        path: `${PAGES.INDEX}`,
        callback: () => {},
      },
      {
        path: `${PAGES.LOG_IN}`,
        callback: () => {
          this.setContent(PAGES.LOG_IN, new LoginView().getElement());
        },
      },
      {
        path: `${PAGES.CART}`,
        callback: () => {
          this.setContent(PAGES.CART, new CartView().getElement());
        },
      },
      {
        path: `${PAGES.SIGN_UP}`,
        callback: () => {
          this.setContent(PAGES.SIGN_UP, new RegView().getElement());
        },
      },
      {
        path: `${PAGES.USER_PROFILE}`,
        callback: () => {},
      },
      {
        path: `${PAGES.ABOUT_US}`,
        callback: () => {
          const aboutView = new AboutView().getElement();
          this.setContent(PAGES.ABOUT_US, aboutView);
        },
      },
      {
        path: `${PAGES.CATALOG}`,
        callback: () => {
          this.setContent(PAGES.CATALOG, new CatalogView().getElement());
        },
      },
      {
        path: `${PAGES.CONTACT_US}`,
        callback: () => {
          const contactsView = new ContactsView().getElement();
          this.setContent(PAGES.CONTACT_US, contactsView);
        },
      },
      {
        path: `${PAGES.SHIPPING}`,
        callback: () => {
          const shippingView = new ShippingView().getElement();
          this.setContent(PAGES.SHIPPING, shippingView);
        },
      },
      {
        path: `${PAGES.NOT_FOUND}`,
        callback: () => {
          const notFoundView = new NotFoundView().getElement();
          this.setContent(PAGES.NOT_FOUND, notFoundView);
        },
      },
    ];
  }
}
