import { Route, UserRequest } from '../../types';

export default class Router {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  public navigate(url: string) {
    const request = this.parseUrl(url);
    const pathToFind = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathToFind);
    if (!route) {
      this.redirectToNotFound();
      return;
    }

    route.callback();
  }

  private parseUrl(url: string): UserRequest {
    const result = <UserRequest>{};
    const path = url.split('/');
    [result.path = '', result.resource = ''] = path;
    return result;
  }

  private redirectToNotFound(): void {
    //
  }
}
