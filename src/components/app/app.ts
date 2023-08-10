import RegView from '../view/registration/reg-view';

export default class App {
  private regWrapper: RegView;

  constructor() {
    this.regWrapper = new RegView();
    this.start();
  }

  public start(): void {
    this.regWrapper.render();
  }
}
