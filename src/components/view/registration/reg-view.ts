import ElementCreator from '../../utils/element-creator';
import View from '../view';
import regParams from './reg-params';
import wrapperParams from '../wrapper-params';
import FormView from './form-component/form-view';

export default class RegView extends View {
  constructor() {
    super(regParams.regWrapper);
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderForm();
    this.appendToDOM();
  }

  private renderForm(): void {
    // this.insertForm(wrapper);
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(regParams.innerWrapper);
    this.insertForm(innerWrapper);
    wrapper.addInnerElement(innerWrapper);
    this.addInnerElement(wrapper);
  }

  private insertForm(parent: ElementCreator): void {
    parent.addInnerElement(new FormView());
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
