import { Route } from '../../types';
import PAGES from '../router/pages';
import Router from '../router/Router';
import CartView from '../view/cart/CartView';
import HeaderView from '../view/header/HeaderView';
import LoginView from '../view/login/LoginView';
import MainView from '../view/main/MainView';
import NotFoundView from '../view/not-found-page/NotFoundView';
// import AboutView from '../view/pages/about/AboutView';
import CatalogView from '../view/pages/catalog/CatalogView';
import ContactsView from '../view/pages/contacts/ContactsView';
import ShippingView from '../view/pages/shipping/ShippingView';
import ProfileView from '../view/profile/ProfileView';
import RegView from '../view/registration/reg-view';
import { ACCESS_TOKEN } from '../constants';
import AboutView from '../view/pages/about/AboutView';

export default class App {
  private header: HeaderView;

  private mainContainer: MainView;

  private router: Router;

  private shippingView: ShippingView;

  // private catalogView: CatalogView;

  private aboutView: AboutView;

  private regView: RegView;

  private contactsView: ContactsView;

  private loginView: LoginView;

  private notFoundView: NotFoundView;

  constructor() {
    const routes = this.createRoutes();
    this.mainContainer = new MainView();
    this.router = new Router(routes);
    this.header = new HeaderView(this.router);
    this.regView = new RegView(this.router);
    this.loginView = new LoginView(this.router);
    this.shippingView = new ShippingView();
    this.notFoundView = new NotFoundView();
    // this.catalogView = new CatalogView();
    this.contactsView = new ContactsView();
    this.aboutView = new AboutView();
  }

  public start(): void {
    this.header.render();
    this.mainContainer.render();
  }

  private setContent(page: string, view: HTMLElement) {
    this.header.updateIcons();
    this.header.updateLinksStatus(page);
    this.mainContainer.setContent(view);
  }

  private deleteToken(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
  }

  private checkToken(name: string): boolean {
    const allCookies = document.cookie.split(';');
    const isAccessTokenExist = allCookies.some((token) => token.startsWith(`${name}=`));
    return isAccessTokenExist;
  }

  private resetInputs(): void {
    this.regView = new RegView(this.router);
    this.loginView = new LoginView(this.router);
  }

  private createRoutes(): Route[] {
    return [
      {
        path: '',
        callback: () => {
          this.setContent(PAGES.MAIN, this.aboutView.getElement());
        },
      },
      {
        path: `${PAGES.INDEX}`,
        callback: () => {},
      },
      {
        path: `${PAGES.LOG_IN}`,
        callback: () => {
          if (this.checkToken(ACCESS_TOKEN)) {
            this.setContent(PAGES.MAIN, this.aboutView.getElement());
            return;
          }
          this.setContent(PAGES.LOG_IN, this.loginView.getElement());
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
          if (this.checkToken(ACCESS_TOKEN)) {
            this.setContent(PAGES.MAIN, this.aboutView.getElement());
            return;
          }
          this.resetInputs();
          this.setContent(PAGES.SIGN_UP, this.regView.getElement());
        },
      },
      {
        path: `${PAGES.PROFILE}`,
        callback: () => {
          if (!this.checkToken(ACCESS_TOKEN)) {
            this.setContent(PAGES.MAIN, this.aboutView.getElement());
            return;
          }
          this.setContent(PAGES.PROFILE, new ProfileView().getElement());
        },
      },
      {
        path: `${PAGES.MAIN}`,
        callback: () => {
          this.setContent(PAGES.MAIN, this.aboutView.getElement());
        },
      },
      {
        path: `${PAGES.LOG_OUT}`,
        callback: () => {
          if (!this.checkToken(ACCESS_TOKEN)) {
            this.setContent(PAGES.MAIN, this.aboutView.getElement());
            return;
          }
          this.deleteToken(ACCESS_TOKEN);
          this.setContent(PAGES.MAIN, this.aboutView.getElement());
        },
      },
      {
        path: `${PAGES.CATALOG}`,
        callback: () => {
          const catalog = new CatalogView();
          this.header.getUnnItems.forEach((value) => catalog.addInnerElement(value));
          this.setContent(PAGES.CATALOG, catalog.getElement());
        },
      },
      {
        path: `${PAGES.CONTACT_US}`,
        callback: () => {
          this.setContent(PAGES.CONTACT_US, this.contactsView.getElement());
        },
      },
      {
        path: `${PAGES.SHIPPING}`,
        callback: () => {
          this.setContent(PAGES.SHIPPING, this.shippingView.getElement());
        },
      },
      {
        path: `${PAGES.NOT_FOUND}`,
        callback: () => {
          this.setContent(PAGES.NOT_FOUND, this.notFoundView.getElement());
        },
      },
    ];
  }
}
