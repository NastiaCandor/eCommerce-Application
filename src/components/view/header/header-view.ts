import ElementCreator from '../../utils/element-creator';
import View from '../view';
import AuthenticationView from './auth-component/auth-view';
import headerParams from './header-params';
import NavigationView from './nav-component/nav-view';
import '../../../assets/img/icons8-cheburashka-48.svg';
import wrapperParams from '../wrapper-params';

export default class HeaderView extends View {
  constructor() {
    super(headerParams.header);
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
    this.appendToDOM();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(headerParams.innerWrapper);
    this.injectLogoLink(innerWrapper);
    this.injectNavigationLinks(innerWrapper);
    this.injectAuthLinks(innerWrapper);
    wrapper.addInnerElement(innerWrapper);
    this.addInnerElement(wrapper);
  }

  private injectLogoLink(wrapper: ElementCreator): void {
    const logo = new ElementCreator(headerParams.logo);
    wrapper.addInnerElement(logo);
  }

  private injectNavigationLinks(wrapper: ElementCreator): void {
    wrapper.addInnerElement(new NavigationView());
  }

  private injectAuthLinks(wrapper: ElementCreator): void {
    wrapper.addInnerElement(new AuthenticationView());
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
