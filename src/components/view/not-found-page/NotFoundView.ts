import { wrapperParams } from '../../constants';
import Router from '../../router/Router';
import PAGES from '../../router/utils/pages';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import notFoundParams from './not-found-params';

export default class NotFoundView extends View {
  constructor(private router: Router) {
    super(notFoundParams.section);
    this.router = router;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(notFoundParams.innerWrapper);

    this.injectErrorNumber(innerWrapper);
    this.injectTitle(innerWrapper);
    this.injectSubtitle(innerWrapper);
    this.injectBackToCatalogBtn(innerWrapper);

    wrapper.getElement().classList.add('not-found__wrapper');
    wrapper.addInnerElement(innerWrapper);
    this.addInnerElement(wrapper);
    this.addInnerElement(wrapper);
  }

  private injectTitle(wrapper: ElementCreator): void {
    const title = new ElementCreator(notFoundParams.title);
    wrapper.addInnerElement(title);
  }

  private injectErrorNumber(wrapper: ElementCreator): void {
    const element = new ElementCreator(notFoundParams.errorNumber);
    wrapper.addInnerElement(element);
  }

  private injectSubtitle(wrapper: ElementCreator): void {
    const element = new ElementCreator(notFoundParams.subtitle);
    wrapper.addInnerElement(element);
  }

  private injectBackToCatalogBtn(wrapper: ElementCreator): void {
    const element = new ElementCreator(notFoundParams.backToCatalogBtn).getElement();
    this.backToMainCbHandler(element);
    wrapper.addInnerElement(element);
  }

  private backToMainCbHandler(btn: HTMLElement): void {
    btn.addEventListener('click', () => this.router.navigate(PAGES.CATALOG));
  }
}
