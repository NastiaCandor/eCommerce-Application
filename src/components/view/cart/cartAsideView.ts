/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-escape */
import Noty from 'noty';
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
    this.addInnerElement([this.createPromoCode()]);
  }

  private createPromoCode(): ElementCreator {
    const promoWrapper = new ElementCreator(cartParams.promoWrapper);
    const promoText = new ElementCreator(cartParams.promoText);
    promoText.setAttribute('for', cartParams.promoText.for);
    const formEl = promoWrapper.getElement() as HTMLFormElement;

    const promoInput = new ElementCreator(cartParams.promoInput);
    promoInput.setAttribute('type', cartParams.promoInput.type);
    promoInput.setAttribute('id', cartParams.promoInput.id);
    promoInput.setAttribute('placeholder', cartParams.promoInput.placeholder);
    const inputEl = promoInput.getElement() as HTMLInputElement;

    const promoBtn = new ElementCreator(cartParams.promoBtn);
    promoBtn.setAttribute('type', cartParams.promoBtn.type);

    formEl.addEventListener('submit', (el) => {
      el.preventDefault();
      if (inputEl.value === '') {
        this.showWrongPromocodeMessage(cartParams.noPromocode);
        return;
      }
      if (inputEl.value !== '') {
        const sendDiscount = this.clientAPI.applyPromoCode(inputEl.value);
        sendDiscount
          .then(async (response) => {
            const subtotal: number[] = [];
            response.body.lineItems.forEach((cartItem) => {
              if (cartItem.price.discounted) {
                subtotal.push((cartItem.price.discounted.value.centAmount / 100) * cartItem.quantity);
              } else if (!cartItem.price.discounted) {
                subtotal.push((cartItem.price.value.centAmount / 100) * cartItem.quantity);
              }
            });
            const subtotalSum = subtotal.reduce((acc, value) => acc + value, 0);
            const totalSum = response.body.totalPrice.centAmount / 100;
            const promoDiff = (subtotalSum - totalSum).toFixed(2);
            this.getChildren()[1].remove();
            this.addInnerElement(this.createTotalCost(subtotalSum.toFixed(2), promoDiff, totalSum.toFixed(2)));
          })
          .catch((error) => {
            if (error.code === 400) {
              this.showWrongPromocodeMessage(cartParams.wrongPromocode);
            } else {
              console.log(error.code, error.message);
            }
          });
      }
    });
    promoWrapper.addInnerElement([promoText, promoInput, promoBtn]);
    return promoWrapper;
  }

  public createTotalCost(subtotal: string, discount: string, cost: string): ElementCreator {
    const costWrapper = new ElementCreator(cartParams.costWrapper);
    const asideHeading = new ElementCreator(cartParams.asideHeading);
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

    const checkoutBtn = new ElementCreator(cartParams.checkoutBtn);
    checkoutBtn.setAttribute('type', cartParams.checkoutBtn.type);
    costWrapper.addInnerElement([asideHeading, subtotalWrapper, discountWrapper, totalWrapper, checkoutBtn]);
    return costWrapper;
  }

  private showWrongPromocodeMessage(message: string): void {
    new Noty({
      theme: 'mint',
      text: message,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
  }
}
