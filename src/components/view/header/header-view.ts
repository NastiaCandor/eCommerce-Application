import ElementCreator from '../../utils/element-creator';
import View from '../view';
import UserIconsView from './user-icons-component/user-icons-view';
import headerParams from './header-params';
import NavigationView from './nav-component/nav-view';
import '../../../assets/img/icons8-cheburashka-48.svg';
import wrapperParams from '../wrapper-params';

export default class HeaderView extends View {
  private navigationView: NavigationView;

  private userIconsView: UserIconsView;

  private burgerMenu: HTMLElement;

  constructor() {
    super(headerParams.header);
    this.navigationView = new NavigationView();
    this.userIconsView = new UserIconsView();
    this.burgerMenu = this.createBurgerMenu();
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
    this.injectUserLinks(innerWrapper);
    this.injectBurgerMenuButton(innerWrapper);
    this.injectBurgerMenu(innerWrapper);
    wrapper.addInnerElement(innerWrapper);
    this.addInnerElement(wrapper);
  }

  private injectLogoLink(wrapper: ElementCreator): void {
    const logo = new ElementCreator(headerParams.logo);
    wrapper.addInnerElement(logo);
  }

  private injectNavigationLinks(wrapper: ElementCreator): void {
    wrapper.addInnerElement(this.navigationView);
  }

  private injectUserLinks(wrapper: ElementCreator): void {
    wrapper.addInnerElement(this.userIconsView);
  }

  private injectBurgerMenuButton(wrapper: ElementCreator): void {
    const burgerButton = this.createBurgerButton();
    wrapper.addInnerElement(burgerButton);
  }

  private injectBurgerMenu(wrapper: ElementCreator): void {
    wrapper.addInnerElement(this.burgerMenu);
  }

  private burgerMenuHandler(btn: HTMLElement, menu: HTMLElement) {
    btn.addEventListener('click', () => {
      if (menu instanceof HTMLElement) {
        // ask Natasha about ability to do so:
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        menu.classList.contains('hidden') ? menu.classList.remove('hidden') : menu.classList.add('hidden');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        btn.classList.contains('clicked') ? btn.classList.remove('clicked') : btn.classList.add('clicked');
        // if she denied to allow - replace with if/else statement
      }
    });
  }

  private createBurgerMenu(): HTMLElement {
    const menuWrapper = new ElementCreator(headerParams.burgerMenuWrapper).getElement();
    const navLinks = this.navigationView.getElement().cloneNode(true);
    // maybe need to store logo for better perfomance
    const logo = new ElementCreator(headerParams.logo).getElement();
    menuWrapper.append(logo, navLinks);
    return menuWrapper;
  }

  private createBurgerButton(): HTMLElement {
    const BURGER_MENU_BARS_COUNT = 3;
    const burgerButtonWrapper = new ElementCreator(headerParams.burgerMenuButton).getElement();
    for (let i = 0; i < BURGER_MENU_BARS_COUNT; i += 1) {
      const burgerBar = new ElementCreator(headerParams.burgerMenuButtonBar).getElement();
      burgerButtonWrapper.append(burgerBar);
    }
    this.burgerMenuHandler(burgerButtonWrapper, this.burgerMenu);

    return burgerButtonWrapper;
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
