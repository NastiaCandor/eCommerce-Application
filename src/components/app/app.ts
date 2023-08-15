import HeaderView from '../view/header/header-view';

export default class App {
  private header: HeaderView;

  constructor() {
    this.header = new HeaderView();
    this.start();
  }

  public start(): void {
    this.header.render();
  }
}
