import { Route, UserRequest } from '../../types';
import State from '../state/State';
import PAGES from './utils/pages';
import { linksForSignedIn, linksForSignedOut } from './utils/redirectsUrl';

export default class Router {
  private routes: Route[];

  private state: State;

  constructor(routes: Route[]) {
    this.state = new State();
    this.routes = routes;
    this.startInit();
  }

  public navigate(url: string) {
    this.state.pushState(url);
    this.redirectUrl(this.currentPath);
  }

  private redirectUrl(url: string): void {
    if (this.signedInUserAccess(url) || this.signedOutUserAccess(url)) {
      this.routeTo(PAGES.MAIN);
      return;
    }
    this.routeTo(url);
  }

  private parseUrl(url: string): UserRequest {
    const result = <UserRequest>{};
    const path = url.split('/');
    [result.path = '', result.resource = ''] = path;
    return result;
  }

  public stateDeleteToken(): void {
    this.state.deleteAccessToken();
  }

  private routeTo(path: string) {
    const request = this.parseUrl(path);
    const pathToFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathToFind);
    if (!route) {
      this.redirectToNotFound();
      return;
    }
    this.state.setPageTitle(route.path);
    route.callback();
  }

  private redirectToNotFound(): void {
    const routeToNotFound = this.routes.find((route) => route.path === PAGES.NOT_FOUND);
    if (routeToNotFound) {
      this.state.setPageTitle(routeToNotFound.path);
      routeToNotFound.callback();
    }
  }

  private urlChangeHandler(redirectTo: string = this.currentPath): void {
    this.redirectUrl(redirectTo);
  }

  private signedOutUserAccess(url: string): boolean {
    if (this.state.isAccessTokenValid() && linksForSignedOut.includes(url)) {
      return true;
    }
    return false;
  }

  private signedInUserAccess(url: string): boolean {
    if (!this.state.isAccessTokenValid() && linksForSignedIn.includes(url)) {
      return true;
    }
    return false;
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

  private get currentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}
