import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import authParams from './auth-params';
import '../../../../assets/img/signup-svgrepo-com.svg';
import '../../../../assets/img/login-svgrepo-com.svg';

export default class AuthenticationView extends View {
  constructor() {
    super(authParams.wrapper);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.injectAuthItems();
  }

  private injectAuthItems(): void {
    const authArray = this.createAuthItems(authParams.authItemsNames);
    this.addInnerElement(authArray);
  }

  private createAuthItems(names: string[]): ElementCreator[] {
    const itemsArray: ElementCreator[] = [];
    names.forEach((name, i) => {
      const item = new ElementCreator(authParams.authItem);
      const span = new ElementCreator(authParams.authItem.span);
      span.setTextContent(name);
      item.addInnerElement(span);
      const imageItem = new ElementCreator(authParams.authItem.itemImg);
      imageItem.setImageLink(authParams.authItemsSrc[i], authParams.authItemsAlt[i]);
      item.addInnerElement(imageItem);
      itemsArray.push(item);
    });
    return itemsArray;
  }
}
