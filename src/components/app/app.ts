import RegView from '../view/registration/reg-view';

export default class App {
  private regWrapper: RegView;

  constructor() {
    this.regWrapper = new RegView();
    this.start();
  }

  public start(): void {
    this.regWrapper.render();

import HeaderView from '../view/header/header-view';

export default class App {
  private header: HeaderView;

  constructor() {
    this.header = new HeaderView();
  }

  public start(): void {
    this.header.render();

  }
}
