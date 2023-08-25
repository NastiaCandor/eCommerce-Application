import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import regParams from './reg-params';
import wrapperParams from '../wrapper-params';
import FormView from './form-component/form-view';
import Router from '../../router/Router';

export default class RegView extends View {
  private router: Router;

  constructor(router: Router) {
    super(regParams.regWrapper);
    this.router = router;
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
    wrapper.addInnerElement(new FormView(this.router));
    this.addInnerElement(wrapper);
  }
  // unnecessary method ?  >
  // private insertForm(parent: ElementCreator): void {
  //   parent.addInnerElement(new FormView());
  // }
}
