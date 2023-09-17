// import { ACCESS_TOKEN, COOKIE_RESET_DATE } from '../constants';
/* eslint-disable @typescript-eslint/return-await */
import PAGES from '../router/utils/pages';
import Router from '../router/Router';
import CartView from '../view/cart/CartView';
import HeaderView from '../view/header/HeaderView';
import LoginView from '../view/login/LoginView';
import MainView from '../view/main/MainView';
import NotFoundView from '../view/not-found-page/NotFoundView';
import CatalogView from '../view/pages/catalog/CatalogView';
import ContactsView from '../view/pages/contacts/ContactsView';
import ShippingView from '../view/pages/shipping/ShippingView';
import ProfileView from '../view/profile/ProfileView';
import RegView from '../view/registration/reg-view';
import AboutView from '../view/pages/about/AboutView';
import Routes from '../router/utils/Routes';
import { PrefetchedData, Route, RouteCallbacks } from '../../types';
import ClientAPI from '../utils/Client';
import State from '../state/State';
import ProductView from '../view/product-page/ProductView';
import SpinnerView from '../utils/SpinnerView';
import FooterView from '../view/footer/FooterView';

export default class App {
  private header: HeaderView;

  private contentContainer: MainView;

  private router: Router;

  private signupForm: RegView;

  private loginForm: LoginView;

  private routesClass: Routes;

  private catalogView: CatalogView;

  private clientApi: ClientAPI;

  private routes: Route[];

  private state: State;

  private isCatalogLeaved: boolean;

  private isStarted: boolean;

  private prefetchedData: PrefetchedData;

  private spinner: SpinnerView;

  private notFoundView: NotFoundView;

  private footerView: FooterView;

  constructor(clientApi: ClientAPI, spinner: SpinnerView) {
    this.state = new State();
    this.clientApi = clientApi;
    this.spinner = spinner;
    this.routesClass = new Routes(this.getRoutesCallbacks(), this.clientApi);
    this.footerView = new FooterView();
    this.prefetchedData = this.clientApi.prefetchedData;
    this.routes = this.routesClass.getRoutes();
    this.router = new Router(this.routes, this.state, this.routesClass.getTitlesMap);
    this.footerView = new FooterView(this.router);
    this.notFoundView = new NotFoundView(this.router);
    this.contentContainer = new MainView();
    this.catalogView = new CatalogView(this.clientApi, this.router, this.spinner);
    this.header = new HeaderView(this.router);
    this.signupForm = new RegView(this.router, this.clientApi);
    this.loginForm = new LoginView(this.router, this.clientApi);
    this.isCatalogLeaved = false;
    this.isStarted = false;
  }

  public async start() {
    this.header.render();
    this.contentContainer.render();
    await this.catalogView.render();
    this.footerView.render();
    this.router.navigate(window.location.pathname);
    this.isStarted = true;
    this.spinner.removeSelfFromNode();
  }

  private setContent(page: string, view: HTMLElement) {
    if (!page.replace('/', '').startsWith('catalog')) {
      this.isCatalogLeaved = true;
    } else {
      this.catalogView.updateCrumbNavigation();
      this.isCatalogLeaved = false;
    }
    this.header.updateIcons();
    this.header.updateLinksStatus(page);
    this.contentContainer.setContent(view);
  }

  private loadMainPage() {
    const main = new AboutView().getElement();
    this.setContent(PAGES.MAIN, main);
  }

  private loadLoginPage() {
    this.setContent(PAGES.LOG_IN, this.loginForm.getElement());
  }

  private loadCartPage() {
    const cart = new CartView().getElement();
    this.setContent(PAGES.CART, cart);
  }

  private loadContactsPage() {
    const contacts = new ContactsView().getElement();
    this.setContent(PAGES.CONTACTS, contacts);
  }

  private loadSignupPage() {
    this.setContent(PAGES.SIGN_UP, this.signupForm.getElement());
  }

  private loadProfilePage() {
    this.setContent(PAGES.PROFILE, new ProfileView(this.router, this.clientApi).getElement());
  }

  private loadShippingPage() {
    const shipping = new ShippingView().getElement();
    this.setContent(PAGES.SHIPPING, shipping);
  }

  private loadNotFoundPage() {
    this.setContent(PAGES.CATALOG, this.notFoundView.getElement());
  }

  private async loadCatalogPage() {
    if (!this.isCatalogLeaved) {
      await this.catalogView.assambleCards().then((element) => {
        const wrapper = this.catalogView.getWrapper;
        if (wrapper) {
          this.catalogView.replaceCardsAndReturnElement(wrapper, element);
          this.setContent(PAGES.CATALOG, this.catalogView.getElement());
        }
      });
    } else {
      const url = this.state.getCatalogState.get('prevurl');
      if (url && url?.split('/').length > 1) {
        this.router.navigate(url);
        return;
      }
      this.setContent(PAGES.CATALOG, this.catalogView.getElement());
      return;
    }
  }

  private async loadCategoriesPage() {
    this.catalogView.resetPageCounters();
    await this.catalogView.proceedToCategories();
    this.setContent(PAGES.CATALOG, this.catalogView.getElement());
  }

  private async loadProductPage(id: string) {
    if (!id) {
      this.router.navigate(PAGES.CATALOG);
      return;
    }

    // failed to implement spinner while loading, can't figure out where i gone wrong. TODO:
    // work something out or leave that idea
    // this.setContent(PAGES.PRODUCT, this.spinner.getElement());
    let cardData;

    this.prefetchedData.productsUrl.ids.forEach((key, value) => {
      if (key === id) cardData = value;
    });
    if (cardData) {
      const product = new ProductView(
        this.clientApi,
        cardData,
        this.catalogView.breadCrumbView,
        // eslint-disable-next-line @typescript-eslint/comma-dangle, comma-dangle
        this.router
      ).getElement();
      this.setContent(PAGES.CATALOG, product);
    } else {
      this.loadCatalogPage();
    }
  }

  private logoutUser() {
    this.router.stateDeleteToken();
    this.clientApi.resetDefaultClientAPI();
    this.router.navigate(PAGES.MAIN);
    this.resetForms();
  }

  private loadFilterPage() {
    this.setContent(PAGES.CATALOG, this.catalogView.getElement());
    if (!this.isStarted) {
      this.router.navigate(PAGES.CATALOG);
    }
  }

  private resetForms(): void {
    this.signupForm = new RegView(this.router, this.clientApi);
    this.loginForm = new LoginView(this.router, this.clientApi);
  }

  private async mountCategory(key: string) {
    this.catalogView.resetPageCounters();
    await this.catalogView.mountCategory(key);
    this.setContent(PAGES.CATALOG, this.catalogView.getElement());
  }

  private getRoutesCallbacks(): RouteCallbacks {
    return {
      loadContactsPage: this.loadContactsPage.bind(this),
      loadShippingPage: this.loadShippingPage.bind(this),
      loadNotFoundPage: this.loadNotFoundPage.bind(this),
      loadCatalogPage: this.loadCatalogPage.bind(this),
      loadProfilePage: this.loadProfilePage.bind(this),
      loadSignupPage: this.loadSignupPage.bind(this),
      loadLoginPage: this.loadLoginPage.bind(this),
      loadMainPage: this.loadMainPage.bind(this),
      loadCartPage: this.loadCartPage.bind(this),
      loadCategoriesPage: this.loadCategoriesPage.bind(this),
      logoutUser: this.logoutUser.bind(this),
      loadProductPage: this.loadProductPage.bind(this),
      mountCategory: this.mountCategory.bind(this),
      loadFilterPage: this.loadFilterPage.bind(this),
    };
  }
}
