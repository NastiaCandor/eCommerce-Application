import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import regParams from './reg-params';
import wrapperParams from '../wrapper-params';
import FormView from './form-component/form-view';

export default class RegView extends View {
  constructor() {
    super(regParams.regWrapper);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderForm();
  }

  private renderForm(): void {
    const wrapper = new ElementCreator(wrapperParams);
    this.insertForm(wrapper);
    this.addInnerElement(wrapper);
  }

  private insertForm(parent: ElementCreator): void {
    parent.addInnerElement(new FormView());
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
