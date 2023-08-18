import { Route, UserRequest } from '../../types';
import PAGES from './pages';

export default class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    this.startInit();
  }

  public navigate(url: string) {
    const request = this.parseUrl(url);
    const pathToFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathToFind);
    if (!route) {
      this.redirectToNotFound();
      return;
    }

    window.history.pushState(null, '', route?.path);
    route.callback();
  }

  private parseUrl(url: string): UserRequest {
    const result = <UserRequest>{};
    const path = url.split('/');
    [result.path = '', result.resource = ''] = path;
    return result;
  }

  private redirectToNotFound(): void {
    const routeToNotFound = this.routes.find((route) => route.path === PAGES.NOT_FOUND);
    if (routeToNotFound) this.navigate(routeToNotFound.path);
  }

  private urlChangeHandler(): void {
    const path = this.getCurrentPath();
    this.navigate(path);
  }

  private getCurrentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }

  private startInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      const path = this.getCurrentPath();
      this.navigate(path);
    });

    window.addEventListener('popstate', this.urlChangeHandler.bind(this));
  }
}
