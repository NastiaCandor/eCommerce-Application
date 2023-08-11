import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import userIconsParams from './user-icons-params';
import '../../../../assets/img/signup-svgrepo-com.svg';
import '../../../../assets/img/login-svgrepo-com.svg';
import '../../../../assets/img/cart-svgrepo-com.svg';

export default class UserIconsView extends View {
  constructor() {
    super(userIconsParams.wrapper);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectIconItems();
  }

  private injectIconItems(): void {
    const authArray = this.createIconsItems(userIconsParams.authItemsNames);
    this.addInnerElement(authArray);
  }

  private createIconsItems(names: string[]): ElementCreator[] {
    const itemsArray: ElementCreator[] = [];
    names.forEach((name, i) => {
      const item = new ElementCreator(userIconsParams.authItem);
      const span = new ElementCreator(userIconsParams.authItem.span);
      const imageItem = new ElementCreator(userIconsParams.authItem.itemImg);
      imageItem.setImageLink(userIconsParams.authItemsSrc[i], userIconsParams.authItemsAlt[i]);
      item.addInnerElement(imageItem);
      item.addInnerElement(span);
      span.setTextContent(name);
      itemsArray.push(item);
    });

    return itemsArray;
  }
}
