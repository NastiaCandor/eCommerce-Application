import { wrapperParams } from '../../../types';
import ElementCreator from '../../utils/element-creator';
import View from '../View';
import notFoundParams from './not-found-params';

export default class NotFoundView extends View {
  constructor() {
    super(notFoundParams.section);
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
    this.appendToDom();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(notFoundParams.innerWrapper);

    this.injectErrorNumber(innerWrapper);
    this.injectTitle(innerWrapper);
    this.injectSubtitle(innerWrapper);
    this.injectBackToMainBtn(innerWrapper);

    wrapper.getElement().classList.add('not-found__wrapper');
    wrapper.addInnerElement(innerWrapper);
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

  private injectBackToMainBtn(wrapper: ElementCreator): void {
    const element = new ElementCreator(notFoundParams.backToMainBtn).getElement();
    element.setAttribute('href', '#');
    wrapper.addInnerElement(element);
  }

  private appendToDom(): void {
    document.body.appendChild(this.getElement());
  }
}
