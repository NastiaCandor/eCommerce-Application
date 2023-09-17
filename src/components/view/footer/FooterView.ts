import Router from '../../router/Router';
import PAGES from '../../router/utils/pages';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import footerParams from './footer-params';

export default class FooterView extends View {
  constructor(private router: Router) {
    super(footerParams.footer);
  }

  public render(): void {
    this.configure();
    this.appendToDOM();
  }

  protected configure(): void {
    const container = new ElementCreator(footerParams.container);
    const qcLink = new ElementCreator(footerParams.text2);
    this.linkHandler(qcLink);

    const elements = [new ElementCreator(footerParams.linkRS), new ElementCreator(footerParams.text1), qcLink];
    elements.forEach((element) => container.addInnerElement(element));
    this.addInnerElement(container);
  }

  private linkHandler(link: ElementCreator) {
    link.setMouseEvent((evt) => {
      evt.preventDefault();
      this.router.navigate(PAGES.CONTACTS);
    });
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
