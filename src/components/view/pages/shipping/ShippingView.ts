import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import shippingParams from './shipping-params';

export default class ShippingView extends View {
  constructor() {
    super(shippingParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.addInnerElement(new ElementCreator(shippingParams.wrapper));
  }
}
