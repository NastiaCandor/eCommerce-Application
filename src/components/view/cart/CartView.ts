import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import cartParams from './cart-params';

export default class CartView extends View {
  constructor() {
    super(cartParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.addInnerElement(new ElementCreator(cartParams.wrapper));
  }
}
