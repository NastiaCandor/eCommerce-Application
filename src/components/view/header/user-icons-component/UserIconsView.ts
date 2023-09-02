import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import userIconsParams from './user-icons-params';
import '../../../../assets/img/signup-svgrepo-com.svg';
import '../../../../assets/img/login-svgrepo-com.svg';
import '../../../../assets/img/cart-svgrepo-com.svg';
import '../../../../assets/img/profile-svgrepo-com.svg';
import '../../../../assets/img/logout-svgrepo-com.svg';

export default class UserIconsView extends View {
  private iconsCollection: Map<string, HTMLElement>;

  constructor() {
    super(userIconsParams.wrapper);
    this.iconsCollection = new Map();
    this.createIconItems();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectIconItems(this.iconsCollection);
  }

  private checkToken(name: string): boolean {
    const allCookies = document.cookie.split(';');
    const isAccessTokenExist = allCookies.some((token) => token.startsWith(`${name}=`));
    return isAccessTokenExist;
  }

  public injectIconItems(collection: Map<string, HTMLElement>): void {
    collection.forEach((value) => this.addInnerElement(value));
  }

  private createIconItems(): void {
    const key = this.checkToken('access_token') ? 'auth' : 'anon';
    const names = userIconsParams[key].iconsNames;
    names.forEach((name, i) => {
      const item = new ElementCreator(userIconsParams.authItem);
      const span = new ElementCreator(userIconsParams.authItem.span);
      const imageItem = new ElementCreator(userIconsParams.authItem.itemImg);
      imageItem.setImageLink(userIconsParams[key].iconsSrc[i], userIconsParams[key].iconsAlt[i]);
      item.addInnerElement(imageItem);
      item.addInnerElement(span);
      span.setTextContent(name);
      const nameKey = this.formatKeyToUpperCase(name);
      const link = this.formatNameToLinkName(name);
      item.setAttribute('href', `#${link}`);
      this.iconsCollection.set(nameKey, item.getElement());
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
