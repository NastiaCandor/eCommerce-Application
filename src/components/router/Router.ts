import { Route, UserRequest } from '../../types';
import PAGES from './utils/pages';

export default class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    this.startInit();
  }

  public navigate(url: string) {
    window.history.pushState(null, '', url);
    this.routeTo(this.currentPath);
  }

  private setPageTitle(url: string): void {
    document.title = this.formatPageTitle(url);
  }

  private formatPageTitle(url: string): string {
    return `Vinyl Vibe Store - ${url.slice(0, 1).toUpperCase()}${url.replace('_', ' ').slice(1)}`;
  }

  private parseUrl(url: string): UserRequest {
    const result = <UserRequest>{};
    const path = url.split('/');
    [result.path = '', result.resource = ''] = path;
    return result;
  }

  private routeTo(path: string) {
    const request = this.parseUrl(path);
    const pathToFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathToFind);

    if (!route) {
      this.redirectToNotFound();
      return;
    }
    this.setPageTitle(this.currentPath);
    route.callback();
  }

  private redirectToNotFound(): void {
    const routeToNotFound = this.routes.find((route) => route.path === PAGES.NOT_FOUND);
    if (routeToNotFound) {
      this.setPageTitle(routeToNotFound.path);
      routeToNotFound.callback();
    }
  }

  private urlChangeHandler(): void {
    this.routeTo(this.currentPath);
  }

  private startInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.urlChangeHandler();
    });

    window.addEventListener('hashchange', () => {
      this.urlChangeHandler();
    });

    window.addEventListener('popstate', () => {
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
