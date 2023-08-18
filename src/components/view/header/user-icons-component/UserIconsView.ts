import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import userIconsParams from './user-icons-params';
import '../../../../assets/img/signup-svgrepo-com.svg';
import '../../../../assets/img/login-svgrepo-com.svg';
import '../../../../assets/img/cart-svgrepo-com.svg';

export default class UserIconsView extends View {
  private iconsCollection: Map<string, HTMLElement>;

  constructor() {
    super(userIconsParams.wrapper);
    this.iconsCollection = new Map();
    this.createIconItems(userIconsParams.authItemsNames);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectIconItems();
  }

  private injectIconItems(): void {
    this.iconsCollection.forEach((value) => this.addInnerElement(value));
  }

  private createIconItems(names: string[]): void {
    names.forEach((name, i) => {
      const item = new ElementCreator(userIconsParams.authItem);
      const span = new ElementCreator(userIconsParams.authItem.span);
      const imageItem = new ElementCreator(userIconsParams.authItem.itemImg);
      imageItem.setImageLink(userIconsParams.authItemsSrc[i], userIconsParams.authItemsAlt[i]);
      item.addInnerElement(imageItem);
      item.addInnerElement(span);
      span.setTextContent(name);
      const key = this.formatKeyToUpperCase(name);
      const link = this.formatNameToLinkName(name);
      item.setAttribute('href', link);
      this.iconsCollection.set(key, item.getElement());
    });
  }

  private formatKeyToUpperCase(key: string): string {
    return key.replace(/\s/g, '_').toUpperCase();
  }

  private formatNameToLinkName(name: string): string {
    return name.replace(/\s/g, '_').toLowerCase();
  }

  public get getIconsCollection(): Map<string, HTMLElement> {
    return this.iconsCollection;
  }
}
