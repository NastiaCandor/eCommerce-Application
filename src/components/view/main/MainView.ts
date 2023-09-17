import View from '../View';
import mainParams from './main-params';

export default class MainView extends View {
  constructor() {
    super(mainParams.main);
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
