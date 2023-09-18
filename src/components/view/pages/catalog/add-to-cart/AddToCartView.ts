import Noty from 'noty';
import { Cart, ClientResponse, ProductProjection } from '@commercetools/platform-sdk';
import addToCartParams from './add-to-cart-component';
import View from '../../../View';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import SpinnerView from '../../../../utils/SpinnerView';
import { ADD_ITEM_TO_CART_TEXT, REMOVE_ITEM_TO_CART_TEXT } from '../../../../constants';
import CartQiantity from '../../../../utils/CartQuantity';

export default class AddToCartView extends View {
  private clientAPI: ClientAPI;

  private productID: string;

  private lineItemID: string;

  private spinner: SpinnerView;

  private productName: string;

  private cartQuantity: CartQiantity;

  constructor(clientAPI: ClientAPI, productID: string, cartQuantity: CartQiantity) {
    super(addToCartParams.wrapper);
    this.clientAPI = clientAPI;
    this.productID = productID;
    this.lineItemID = '';
    this.spinner = new SpinnerView();
    this.productName = '';
    this.cartQuantity = cartQuantity;
  }

  public render(body?: ProductProjection, activeCart?: ClientResponse<Cart>): void {
    this.configure(body, activeCart);
  }

  public configure(body?: ProductProjection, activeCart?: ClientResponse<Cart>): void {
    this.renderInnerWrapper(body, activeCart);
  }

  private async renderInnerWrapper(bodyResevied?: ProductProjection, cartBody?: ClientResponse<Cart>): Promise<void> {
    const addToCartBtn = new ElementCreator(addToCartParams.addToCartBtn);
    super.addInnerElement(addToCartBtn);
    let body = bodyResevied;
    if (body === undefined) {
      body = await this.getProductData();
    }
    if (body === undefined) return;
    this.productName = body.name['en-US'];
    let activeCart = cartBody;
    if (activeCart === undefined) {
      activeCart = await this.clientAPI.getActiveCartData();
    }
    if (activeCart === undefined) return;
    this.cartBtnFunctionality(addToCartBtn, activeCart);
  }

  private async cartBtnFunctionality(addToCartBtn: ElementCreator, activeCart: ClientResponse<Cart>) {
    super.addInnerElement(this.spinner.getElement());
    const wrapper = super.getElement();
    const removeFromCartBtn = new ElementCreator(addToCartParams.removeFromCartBtn);
    this.addItemFunctionality(wrapper, addToCartBtn, removeFromCartBtn);
    this.removeItemBtnFunctionality(wrapper, removeFromCartBtn, addToCartBtn);
    const items = activeCart.body.lineItems;
    const productInfo = items.filter((item) => item.productId === this.productID);
    if (productInfo.length > 0) {
      // const { quantity } = productInfo[0];
      this.lineItemID = productInfo[0].id;
      // console.log('quant', quantity);
      super.getElement().removeChild(addToCartBtn.getElement());
      super.addInnerElement(removeFromCartBtn);
      this.spinner.removeSelfFromNode();
    } else {
      this.spinner.removeSelfFromNode();
    }
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

  private addItemFunctionality(wrapper: HTMLElement, addBtn: ElementCreator, removeBtn: ElementCreator) {
    const btn = addBtn.getElement();
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      wrapper.append(this.spinner.getElement());
      this.clientAPI
        .addItemCart(this.productID)
        .then((data) => {
          this.getLineItemID(data);
          this.spinner.removeSelfFromNode();
          this.showSideBarMessage(`${this.productName}${ADD_ITEM_TO_CART_TEXT}`, 'add');
          this.displayButtons(wrapper, removeBtn, addBtn);
          this.cartQuantity.updateCartQuantity(data);
        })
        .catch((error) => console.log(`Error while fetching adding product to the cart: ${error}`));
    });
  }

  private removeItemBtnFunctionality(wrapper: HTMLElement, removeBtn: ElementCreator, addBtn: ElementCreator) {
    const btn = removeBtn.getElement();
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      wrapper.append(this.spinner.getElement());
      this.clientAPI
        .removeItemCart(this.lineItemID)
        .then((data) => {
          this.spinner.removeSelfFromNode();
          this.displayButtons(wrapper, addBtn, removeBtn);
          this.showSideBarMessage(`${this.productName}${REMOVE_ITEM_TO_CART_TEXT}`, 'remove');

          // test
          this.cartQuantity.updateCartQuantity(data);
        })
        .catch((error) => console.log(`Error while fetching removing product to the cart: ${error}`));
    });
  }

  private async getProductData() {
    try {
      const getProduct = await this.clientAPI.getProductById(this.productID);
      const body = await getProduct.body;
      return body;
    } catch (error) {
      console.log(`Error while fetching product information: ${error}`);
    }
  }

  private showSideBarMessage(messageText: string, typeTheme: string): void {
    new Noty({
      theme: typeTheme === 'add' ? 'light' : 'sunset',
      text: messageText,
      timeout: 3000,
      progressBar: true,
      type: 'information',
    }).show();
  }

  // TODO: plus minus and items generation
  private injectCartButtons() {
    const plusBtn = new ElementCreator(addToCartParams.plusItemBtn);
    const minusBtn = new ElementCreator(addToCartParams.minusItemBtn);
    const quantitySpan = new ElementCreator(addToCartParams.itemsInCart);

    console.log(plusBtn, minusBtn, quantitySpan);
  }
}
