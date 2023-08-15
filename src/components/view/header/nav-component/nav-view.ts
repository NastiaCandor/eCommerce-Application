import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import navigationParams from './nav-params';

export default class NavigationView extends View {
  constructor() {
    super(navigationParams.wrapper);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectNavItems();
  }

  private injectNavItems(): void {
    const items = this.createNavItems(navigationParams.navItemsNames);
    this.addInnerElement(items);
  }

  private createNavItems(names: string[]): ElementCreator[] {
    const itemsArray: ElementCreator[] = [];
    names.forEach((name) => {
      const item = new ElementCreator(navigationParams.navItem);
      item.setTextContent(name);
      itemsArray.push(item);
    });

    return itemsArray;
  }
}
