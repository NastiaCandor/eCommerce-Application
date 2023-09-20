import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import UserIconsView from './user-icons-component/UserIconsView';
import headerParams from './header-params';
import NavigationView from './nav-component/NavView';
import '../../../assets/img/icons8-cheburashka-48.svg';
import Router from '../../router/Router';
import { PagesInterface } from '../../../types';
import navigationParams from './nav-component/nav-params';
import PAGES from '../../router/utils/pages';
// import CartQiantity from '../../utils/CartQuantity';

export default class HeaderView extends View {
  private navigationView: NavigationView;

  private userIconsView: UserIconsView;

  private burgerMenu: HTMLElement;

  private router: Router;

  private wrapper: ElementCreator;

  private linksCollection: Map<string, HTMLElement>;

  private burgerNavCollection: Map<string, HTMLElement>;

  constructor(router: Router) {
    super(headerParams.header);
    this.router = router;
    this.wrapper = new ElementCreator(headerParams.innerWrapper);
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

  public getUserIcons() {
    return this.linksCollection;
  }

  public updateCartSpan(quant: number) {
    const collection = this.linksCollection;
    const cart = collection.get('CART')?.children.namedItem('cart-span');
    if (cart !== null && cart !== undefined) {
      cart.textContent = `${quant}`;
    }
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
    const logo = new ElementCreator(headerParams.logo).getElement();
    logo.addEventListener('click', () => this.router.navigate(PAGES.MAIN));
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
    window.addEventListener('click', (evt) => {
      const target = <HTMLElement>evt.target;
      if (!menu.contains(target) && (target !== btn || !btn.contains(target))) {
        menu.classList.add('hidden');
        btn.classList.remove('clicked');
      }
    });
    btn.addEventListener('click', () => {
      if (menu instanceof HTMLElement) {
        if (menu.classList.contains('hidden')) {
          menu.classList.remove('hidden');
          btn.classList.add('clicked');
        } else {
          menu.classList.add('hidden');
          btn.classList.remove('clicked');
        }
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
        const menu = document.body.querySelector('.header__menu');
        const btn = document.body.querySelector('.header__menu_btn');
        if (menu && btn) {
          menu.classList.add('hidden');
          btn.classList.remove('clicked');
        }
        this.navigateToPage(page);
      });
    });
  }

  public updateIcons(): void {
    const previousIcons = this.wrapper.getElement().querySelector('.header__user-icons');
    const updatedIcons = new UserIconsView();
    const collection = updatedIcons.getIconsCollection;
    this.linksCallbackHandler(collection);
    console.log(collection);
    collection.forEach((value, key) => this.linksCollection.set(key, value));
    if (previousIcons instanceof HTMLElement) {
      this.wrapper.getElement().replaceChild(updatedIcons.getElement(), previousIcons);
    }
  }

  public updateLinksStatus(page: string): void {
    const pageName = page.toUpperCase();
    this.linksCollection.forEach((value, key) => {
      value.classList.remove('active');
      if (`/${key}` === pageName || `/${key}_BG` === pageName || this.formatBurgerItemKey(key) === pageName) {
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
    document.body.replaceChildren(this.getElement());
  }
}
