import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import regParams from './reg-params';
import wrapperParams from '../wrapper-params';
import FormView from './form-component/form-view';
import Router from '../../router/Router';
import ClientAPI from '../../utils/Client';

export default class RegView extends View {
  private router: Router;

  private clientAPI: ClientAPI;

  constructor(router: Router, clientAPI: ClientAPI) {
    super(regParams.regWrapper);
    this.router = router;
    this.clientAPI = clientAPI;
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
    wrapper.addInnerElement(new FormView(this.router, this.clientAPI));
    this.addInnerElement(wrapper);
  }
}
