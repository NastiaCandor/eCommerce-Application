import View from '../View';
import mainContentParams from './main-content-params';

export default class MainView extends View {
  constructor() {
    super(mainContentParams.main);
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.appendToDOM();
  }

  public setContent(view: HTMLElement): void {
    this.getElement().replaceChildren(view);
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
