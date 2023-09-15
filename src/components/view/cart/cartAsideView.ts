/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-escape */
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import cartParams from './cart-params';
import ClientAPI from '../../utils/Client';

export default class CartAsideView extends View {
  private clientAPI: ClientAPI;

  constructor() {
    super(cartParams.asideMenu);
    this.clientAPI = new ClientAPI();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected async configure(): Promise<void> {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper() {
    const asideHeading = new ElementCreator(cartParams.asideHeading);
    // const totalCost = this.createTotalCost('50', '0', '50');
    this.addInnerElement([asideHeading, this.createPromoCode()]);
  }

  private createPromoCode(): ElementCreator {
    const promoWrapper = new ElementCreator(cartParams.promoWrapper);
    const promoText = new ElementCreator(cartParams.promoText);
    promoText.setAttribute('for', cartParams.promoText.for);

    const promoInput = new ElementCreator(cartParams.promoInput);
    promoInput.setAttribute('type', cartParams.promoInput.type);
    promoInput.setAttribute('id', cartParams.promoInput.id);
    promoInput.setAttribute('placeholder', cartParams.promoInput.placeholder);

    const promoBtn = new ElementCreator(cartParams.promoBtn);
    promoBtn.setAttribute('type', cartParams.promoBtn.type);

    promoWrapper.addInnerElement([promoText, promoInput, promoBtn]);
    return promoWrapper;
  }

  public createTotalCost(subtotal: string, discount: string, cost: string): ElementCreator {
    const costWrapper = new ElementCreator(cartParams.costWrapper);

    const subtotalWrapper = new ElementCreator(cartParams.subtotalWrapper);
    const subtotalText = new ElementCreator(cartParams.subtotalText);
    const subtotalNumber = new ElementCreator(cartParams.subtotalNumber);
    subtotalNumber.setTextContent(`${subtotal}$`);
    subtotalWrapper.addInnerElement([subtotalText, subtotalNumber]);

    const discountWrapper = new ElementCreator(cartParams.discountWrapper);
    const discountText = new ElementCreator(cartParams.discountText);
    const discountNumber = new ElementCreator(cartParams.discountNumber);
    discountNumber.setTextContent(`${discount}$`);
    discountWrapper.addInnerElement([discountText, discountNumber]);

    const totalWrapper = new ElementCreator(cartParams.totalWrapper);
    const totalCostText = new ElementCreator(cartParams.totalCostText);
    const totalCostNumber = new ElementCreator(cartParams.totalCostNumber);
    totalCostNumber.setTextContent(`${cost}$`);
    totalWrapper.addInnerElement([totalCostText, totalCostNumber]);

    costWrapper.addInnerElement([subtotalWrapper, discountWrapper, totalWrapper]);
    return costWrapper;
  }
}
