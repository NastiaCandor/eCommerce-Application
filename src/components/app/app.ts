import LoginView from '../view/login/LoginView';

export default class App {
  loginView: LoginView;

  constructor() {
    this.loginView = new LoginView();
  }

  public start(): void {
    this.loginView.render();
  }
}
