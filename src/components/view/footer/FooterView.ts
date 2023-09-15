import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import footerParams from './footer-params';

export default class FooterView extends View {
  constructor() {
    super(footerParams.footer);
  }

  public render(): void {
    this.configure();
    this.appendToDOM();
  }

  protected configure(): void {
    const container = new ElementCreator(footerParams.container);
    const elements = [
      new ElementCreator(footerParams.linkRS),
      new ElementCreator(footerParams.text1),
      new ElementCreator(footerParams.text2),
    ];
    elements.forEach((element) => container.addInnerElement(element));
    this.addInnerElement(container);
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
