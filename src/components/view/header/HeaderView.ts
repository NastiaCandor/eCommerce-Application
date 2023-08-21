import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import UserIconsView from './user-icons-component/UserIconsView';
import headerParams from './header-params';
import NavigationView from './nav-component/NavView';
import '../../../assets/img/icons8-cheburashka-48.svg';
import Router from '../../router/Router';
import { PagesInterface } from '../../../types';
import navigationParams from './nav-component/nav-params';
import PAGES from '../../router/pages';

export default class HeaderView extends View {
  private navigationView: NavigationView;

  private userIconsView: UserIconsView;

  private burgerMenu: HTMLElement;

  private router: Router;

  private wrapper: ElementCreator;

  private linksCollection: Map<string, HTMLElement>;

  private burgerNavCollection: Map<string, HTMLElement>;

  public unnecessaryItems: Map<string, HTMLElement>; // remove after cross-check

  constructor(router: Router) {
    super(headerParams.header);
    this.router = router;
    this.wrapper = new ElementCreator(headerParams.innerWrapper);
    this.navigationView = new NavigationView();
    this.userIconsView = new UserIconsView();
    this.burgerNavCollection = this.navigationView.getBurgerNavCollection;
    this.unnecessaryItems = this.userIconsView.getUnnecessaryIconItems(); // remove after cross-check
    this.linksCollection = new Map([
      ...this.userIconsView.getIconsCollection,
      ...this.navigationView.getNavCollection,
      ...this.unnecessaryItems,
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
    this.injectLogoLink(this.wrapper);
    this.injectNavigationLinks(this.wrapper);
    this.injectUserLinks(this.wrapper);
    this.linksCallbackHandler(this.linksCollection);
    this.injectBurgerMenuButton(this.wrapper);
    this.injectBurgerMenu(this.wrapper);
    this.addInnerElement(this.wrapper);
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

  private burgerMenuHandler(btn: HTMLElement, menu: HTMLElement): void {
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
    menuWrapper.append(navLinks.getElement());
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

  private navigateToPage(page: string): void {
    const key = this.isBurgerItem(page) ? this.formatBurgerItemKey(page) : page;
    if (key in PAGES) {
      this.router.navigate(PAGES[key as keyof PagesInterface]);
    } else {
      this.router.navigate(PAGES.NOT_FOUND);
    }
  }

  private linksCallbackHandler(collection: Map<string, HTMLElement>): void {
    collection.forEach((value, key) => {
      const page = key as keyof PagesInterface;
      value.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.navigateToPage(page);
      });
    });
  }

  public updateIcons(): void {
    const previousIcons = this.wrapper.getElement().querySelector('.header__user-icons');
    const updatedIcons = new UserIconsView();
    const collection = updatedIcons.getIconsCollection;
    this.linksCallbackHandler(collection);
    collection.forEach((value, key) => this.linksCollection.set(key, value));
    if (previousIcons instanceof HTMLElement) {
      this.wrapper.getElement().replaceChild(updatedIcons.getElement(), previousIcons);
    }
    this.unnecessaryItems = updatedIcons.getUnnecessaryIconItems();
    this.linksCallbackHandler(this.unnecessaryItems);
  }

  public get getUnnItems(): Map<string, HTMLElement> {
    return this.unnecessaryItems;
  }

  public updateLinksStatus(page: string): void {
    const pageName = page.toUpperCase();
    this.linksCollection.forEach((value, key) => {
      value.classList.remove('active');
      if (key === pageName || `${key}_BG` === pageName || this.formatBurgerItemKey(key) === pageName) {
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
    if (key.includes('_BG')) return true;
    return false;
  }

  private appendToDOM(): void {
    document.body.appendChild(this.getElement());
  }
}