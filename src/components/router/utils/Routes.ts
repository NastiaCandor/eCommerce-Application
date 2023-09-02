import { Path, Route, RouteCallbacks } from '../../../types';
import PAGES from './pages';
import ClientAPI from '../../utils/Client';
import State from '../../state/State';

export default class Routes {
  private callbacks: RouteCallbacks;

  private clientApi: ClientAPI;

  private state: State;

  constructor(callbacks: RouteCallbacks, clientApi: ClientAPI, state: State) {
    this.state = state;
    this.callbacks = callbacks;
    this.clientApi = clientApi;
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
    const paths: Path[] = this.state.getPaths();
    if (paths) {
      const stashedRoutes = paths.map((item) => {
        const obj: Route = {
          path: item.path as string,
          callback: () => {
            this.callbacks.mountCategory(item.key as string);
          },
        };
        return obj;
      });
      stashedRoutes.forEach((item) => routes.push(item));
    }
    return routes;
  }

  public async fetchAvailiableCategories(): Promise<Path[] | void> {
    try {
      const id = await this.clientApi.getCategoryId('genres');
      const data = await this.clientApi.getGenresById(id);
      if (data) {
        const genresKeys = data.map((item) => item.key);
        const cb: Path[] = genresKeys.map((keyPath) => ({
          path: `${PAGES.CATEGORY}/${keyPath}`,
          key: keyPath,
        }));
        return cb;
      }
    } catch (e) {
      console.error('here');
    }
  }
}
