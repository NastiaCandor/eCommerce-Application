import View from '../../View';
import ElementCreator from '../../../utils/element-creator';
import navigationParams from './nav-params';

// TODO: Burger menu deserves his own class :)

export default class NavigationView extends View {
  private navCollection: Map<string, HTMLElement>;

  private burgerNavCollection: Map<string, HTMLElement>;

  constructor() {
    super(navigationParams.wrapper);
    this.navCollection = new Map();
    this.burgerNavCollection = new Map();
    this.createNavItems(navigationParams.navItemsNames);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectNavItems();
  }

  private injectNavItems(): void {
    this.navCollection.forEach((item) => this.addInnerElement(item));
  }

  private createNavItems(names: string[]): void {
    names.forEach((name) => {
      const item = new ElementCreator(navigationParams.navItem);
      const burgerClonedItem = new ElementCreator(navigationParams.navItem);
      item.setTextContent(name);
      burgerClonedItem.setTextContent(name);
      const key = this.formatKeyToUpperCase(name);
      const burgerKey = this.formatKeyToUpperCase(name, true);
      this.navCollection.set(key, item.getElement());
      this.burgerNavCollection.set(burgerKey, burgerClonedItem.getElement());
    });
  }

  private formatKeyToUpperCase(key: string, burger?: boolean): string {
    if (burger) {
      return `${key.replace(/\s/g, '_').toUpperCase()}_BG`;
    }
    return key.replace(/\s/g, '_').toUpperCase();
  }

  public get getNavCollection(): Map<string, HTMLElement> {
    return this.navCollection;
  }

  public get getBurgerNavCollection(): Map<string, HTMLElement> {
    return this.burgerNavCollection;
  }
}
