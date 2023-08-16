import Router from '../router/router';
import HeaderView from '../view/header/header-view';

export default class App {
  private header: HeaderView;

  private router: Router;

  constructor() {
    this.router = new Router();
    this.header = new HeaderView(this.router);
  }

  public start(): void {
    this.header.render();
  }
}
