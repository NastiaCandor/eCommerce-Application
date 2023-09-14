import { Cart, ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import addToCartParams from './add-to-cart-component';
import View from '../../../View';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';

export default class AddToCartView extends View {
  private clientAPI: ClientAPI;

  private productID: string;

  private lineItemID: string;

  constructor(clientAPI: ClientAPI, productID: string) {
    super(addToCartParams.wrapper);
    this.clientAPI = clientAPI;
    this.productID = productID;
    this.lineItemID = '';
  }

  public render(body?: ProductProjection): void {
    this.configure(body);
  }

  public configure(body?: ProductProjection): void {
    this.renderInnerWrapper(body);
  }

  private renderInnerWrapper(bodyResevied?: ProductProjection): void {
    let body = bodyResevied;
    if (body === undefined) {
      body = this.getProductData();
    }
    this.getActiveCartInfo();
  }

  private async getActiveCartInfo() {
    const wrapper = super.getElement();
    const addToCartBtn = new ElementCreator(addToCartParams.addToCartBtn);
    const removeFromCartBtn = new ElementCreator(addToCartParams.removeFromCartBtn);
    this.addCartBtnFunctionality(wrapper, addToCartBtn, removeFromCartBtn);
    this.removeFromCartBtnFunctionality(wrapper, removeFromCartBtn, addToCartBtn);
    const activeCart = this.clientAPI.getActiveCartData();
    activeCart
      .then((data) => {
        const items = data.body.lineItems;
        const productInfo = items.filter((item) => item.productId === this.productID);
        if (productInfo.length > 0) {
          const { quantity } = productInfo[0];
          this.lineItemID = productInfo[0].id;
          console.log('quant', quantity);
          super.addInnerElement(removeFromCartBtn);
        } else {
          super.addInnerElement(addToCartBtn);
        }
      })
      .catch((error) => console.log(`Error while fetching active cart information: ${error}`));
  }

  private getLineItemID(data: ClientResponse<Cart>) {
    const items = data.body.lineItems;
    const productInfo = items.filter((item) => item.productId === this.productID);
    if (productInfo.length > 0) {
      this.lineItemID = productInfo[0].id;
    }
  }

  private displayButtons(wrapper: HTMLElement, displayBtn: ElementCreator, removeBtn: ElementCreator) {
    if (wrapper.children.length === 0) {
      wrapper.append(displayBtn.getElement());
    }
    wrapper.removeChild(removeBtn.getElement());
    wrapper.append(displayBtn.getElement());
  }

  private addCartBtnFunctionality(wrapper: HTMLElement, addBtn: ElementCreator, removeBtn: ElementCreator) {
    // const addToCartBtn = new ElementCreator(addToCartParams.addToCartBtn);
    const btn = addBtn.getElement();
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      this.clientAPI
        .addItemCart(this.productID)
        .then((data) => {
          this.getLineItemID(data);
          this.displayButtons(wrapper, removeBtn, addBtn);
        })
        .catch((error) => console.log(`Error while fetching adding product to the cart: ${error}`));
    });
    // console.log(removeBtn);
  }

  private removeFromCartBtnFunctionality(wrapper: HTMLElement, removeBtn: ElementCreator, addBtn: ElementCreator) {
    const btn = removeBtn.getElement();
    btn.addEventListener('click', (event) => {
      // this.clientAPI.addItemCart(this.productID);
      event.preventDefault();
      this.clientAPI.removeItemCart(this.lineItemID);
      this.displayButtons(wrapper, addBtn, removeBtn);
    });
    // console.log(addBtn);
  }

  private getProductData() {
    const getProduct = this.clientAPI.getProductById(this.productID);
    let body;
    getProduct
      .then((data) => {
        body = data.body;
      })
      .catch((error) => console.log(`Error while fetching product information: ${error}`));
    return body;
  }

  // TODO: plus minus and items generation
  public injectCartButtons() {
    const plusBtn = new ElementCreator(addToCartParams.plusItemBtn);
    const minusBtn = new ElementCreator(addToCartParams.minusItemBtn);
    const quantitySpan = new ElementCreator(addToCartParams.itemsInCart);

    console.log(plusBtn, minusBtn, quantitySpan);
  }
}
