import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import mainParams from './main-params';

export default class MainView extends View {
  private innerWrapper: HTMLElement;

  constructor() {
    super(mainParams.main);
    this.innerWrapper = this.renderInnerWrapper();
  }

  public render(): void {
    this.configure();
    this.appendToDOM();
  }

  protected configure(): void {
    this.addInnerElement(this.innerWrapper);
  }

  private renderInnerWrapper(): HTMLElement {
    const wrapper = new ElementCreator(mainParams.wrapper);
    return wrapper.getElement();
  }

  public setContent(view: HTMLElement): void {
    this.innerWrapper.replaceChildren(view);
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
