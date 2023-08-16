import ElementCreator from '../../utils/element-creator';
import View from '../View';
import UserIconsView from './user-icons-component/user-icons-view';
import headerParams from './header-params';
import NavigationView from './nav-component/nav-view';
import '../../../assets/img/icons8-cheburashka-48.svg';
import Router from '../../router/router';
import { PagesAccountInterface, PagesContentInterface } from '../../../types';
import PAGES from '../../router/pages';
import navigationParams from './nav-component/nav-params';

export default class HeaderView extends View {
  private navigationView: NavigationView;

  private userIconsView: UserIconsView;

  private burgerMenu: HTMLElement;

  private router: Router;

  private linksCollection: Map<string, HTMLElement>;

  private burgerNavCollection: Map<string, HTMLElement>;

  constructor(router: Router) {
    super(headerParams.header);
    this.router = router;
    this.navigationView = new NavigationView();
    this.userIconsView = new UserIconsView();
    this.burgerNavCollection = this.navigationView.getBurgerNavCollection;
    this.linksCollection = new Map([
      ...this.userIconsView.getIconsCollection,
      ...this.navigationView.getNavCollection,
      ...this.burgerNavCollection,
    ]);
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
    const wrapper = new ElementCreator(headerParams.innerWrapper);
    this.injectLogoLink(wrapper);
    this.injectNavigationLinks(wrapper);
    this.injectUserLinks(wrapper);
    this.linksCallbackHandler(this.linksCollection);
    this.injectBurgerMenuButton(wrapper);
    this.injectBurgerMenu(wrapper);
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
    const navLinks = new ElementCreator(navigationParams.wrapper);
    this.burgerNavCollection.forEach((item) => navLinks.addInnerElement(item));
    const menuWrapper = new ElementCreator(headerParams.burgerMenuWrapper).getElement();
    const logo = new ElementCreator(headerParams.logo).getElement();
    menuWrapper.append(logo, navLinks.getElement());
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

  private navigateToPage(page: keyof PagesContentInterface | keyof PagesAccountInterface): void {
    const key = this.isBurgerItem(page) ? this.formatBurgerItemKey(page) : page;
    if (key in PAGES.CONTENT) {
      this.router.navigate(PAGES.CONTENT[key as keyof PagesContentInterface]);
    } else if (key in PAGES.ACCOUNT) {
      this.router.navigate(PAGES.ACCOUNT[key as keyof PagesAccountInterface]);
    } else {
      console.error(`Unable to handle ${key} path!`);
    }
  }

  private linksCallbackHandler(collection: Map<string, HTMLElement>): void {
    collection.forEach((value, key) => {
      const page = key as keyof PagesContentInterface | keyof PagesAccountInterface;
      value.addEventListener('click', () => {
        this.updateLinksStatus(page);
        this.navigateToPage(page);
      });
    });
  }

  private updateLinksStatus(page: string): void {
    this.linksCollection.forEach((value, key) => {
      value.classList.remove('active');
      if (key === page || `${key}_BG` === page || this.formatBurgerItemKey(key) === page) {
        value.classList.add('active');
      }
    });
  }

  private formatBurgerItemKey(key: string): string {
    const lastIndex = key.lastIndexOf('_BG');
    const formattedKey = key.slice(0, lastIndex);
    return formattedKey;
  }

  private isBurgerItem(key: string): boolean {
    if (key.includes('_BG')) {
      return true;
    }
    return false;
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}
