import RegView from '../view/registration/reg-view';
import HeaderView from '../view/header/header-view';

export default class App {
  private regWrapper: RegView;

  private header: HeaderView;

  constructor() {
    this.header = new HeaderView();
    this.regWrapper = new RegView();
    this.start();
  }

  public start(): void {
    this.header.render();
    this.regWrapper.render();
  }
}
