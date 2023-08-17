import { Route } from '../../types';
import PAGES from '../router/pages';
import Router from '../router/Router';
import HeaderView from '../view/header/HeaderView';
import LoginView from '../view/login/LoginView';
import MainView from '../view/main/MainView';
import RegView from '../view/registration/reg-view';

export default class App {
  private header: HeaderView;

  private main: MainView;

  private router: Router;

  private routes: Route[];

  constructor() {
    this.routes = this.createRoutes();
    this.main = new MainView();
    this.router = new Router(this.routes);
    this.header = new HeaderView(this.router);
  }

  public start(): void {
    this.header.render();
    this.main.render();
  }

  private setContent(view: HTMLElement) {
    this.main.setContent(view);
  }

  private createRoutes(): Route[] {
    return [
      {
        path: '',
        callback: () => {
          // this.setContent();
        },
      },
      {
        path: `${PAGES.INDEX}`,
        callback: () => {},
      },
      {
        path: `${PAGES.ACCOUNT.LOG_IN}`,
        callback: () => {
          this.setContent(new LoginView().getElement());
        },
      },
      {
        path: `${PAGES.ACCOUNT.SIGN_UP}`,
        callback: () => {
          this.setContent(new RegView().getElement());
        },
      },
      // {
      //   path: `${PAGES.ACCOUNT.USER_PROFILE}`,
      //   callback: () => {},
      // },
    ];
  }
}
