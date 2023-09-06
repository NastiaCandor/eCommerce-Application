import { Route, UserRequest } from '../../types';
import State from '../state/State';
import PAGES from './utils/pages';
import { linksForSignedIn, linksForSignedOut } from './utils/redirectsUrl';

export default class Router {
  private routes: Route[];

  private state: State;

  private titlesMap: Map<string, string>;

  private request = <UserRequest>{};
  
  constructor(routes: Route[], state: State, titlesMap: Map<string, string>) {
    this.state = state;
    this.routes = routes;
    this.titlesMap = titlesMap;
    this.request = <UserRequest>{};
    this.startInit();
  }

  public navigate(url: string, productId = '') {
    this.state.pushState(url);
    this.processUrl(this.currentPath, productId);
  }

  private processUrl(url: string, productId = ''): void {
    if (this.signedInUserAccess(`/${url}`) || this.signedOutUserAccess(`/${url}`)) {
      this.state.replaceState(PAGES.MAIN);
      this.routeTo(PAGES.MAIN);
      return;
    }
    this.routeTo(url, productId);
  }

  public stateDeleteToken(): void {
    this.state.deleteAccessToken();
  }

  private routeTo(path: string, productId = '') {
    this.request = this.parseUrl(path);
    let pathToFind =
      this.request.resource === '' ? `/${this.request.path}` : `${this.request.path}/${this.request.resource}`;
    let route = this.routes.find((item) => item.path === pathToFind);
    if (this.request.category) {
      pathToFind = this.request.id
        ? `/${pathToFind}/${this.request.category}/${this.request.id}`
        : `/${pathToFind}/${this.request.category}`;
      route = this.routes.find((item) => pathToFind === item.path);
    }
    if (!route) {
      this.redirectToNotFound();
      return;
    }
    if (path && productId) {
      const title = this.titlesMap.get(this.request.category);

    if (path && productId) {
      const title = this.titlesMap.get(request.category);
      if (title) {
        this.state.setPageTitle(title, true);
      }
      route.callback(productId);
      return;
    }
    if (this.request.category) {
      this.state.setPageTitle(`${this.request.category}${this.request.id ?? ''}`, false);
    } else if (this.request.resource) {
      this.state.setPageTitle(`${this.request.path}`, false);
    } else {
      this.state.setPageTitle(route.path);
    }

    route.callback();
  }

  private parseUrl(url: string): UserRequest {
    const result = <UserRequest>{};
    const path = url.split('/');
    [result.path = '', result.resource = '', result.category = '', result.id = ''] = path;
    return result;
  }

  private redirectToNotFound(): void {
    const routeToNotFound = this.routes.find((route) => route.path === PAGES.NOT_FOUND);
    if (routeToNotFound) {
      this.state.setPageTitle(routeToNotFound.path);
      routeToNotFound.callback();
    }
  }

  private urlChangeHandler(redirectTo: string = this.currentPath): void {
    this.processUrl(redirectTo);
  }

  private signedOutUserAccess(url: string): boolean {
    return this.state.isAccessTokenValid() && linksForSignedOut.includes(url);
  }

  private signedInUserAccess(url: string): boolean {
    return !this.state.isAccessTokenValid() && linksForSignedIn.includes(url);
  }

  private startInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.urlChangeHandler();
    });

    window.addEventListener('hashchange', () => {
      this.urlChangeHandler();
    });

    window.addEventListener('popstate', (evt) => {
      if (evt.target instanceof Window && this.currentPath === PAGES.LOG_OUT) {
        this.urlChangeHandler(PAGES.MAIN);
        return;
      }
      this.urlChangeHandler();
    });
  }

  public get currentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}
