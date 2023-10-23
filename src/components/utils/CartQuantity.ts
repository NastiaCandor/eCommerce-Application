import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import HeaderView from '../view/header/HeaderView';
import ClientAPI from './Client';

export default class CartQiantity {
  private header: HeaderView;

  private number: number;

  private clientAPI: ClientAPI;

  constructor(header: HeaderView, clientAPI: ClientAPI) {
    this.header = header;
    this.number = 0;
    this.clientAPI = clientAPI;
  }

  public updateCartSpan() {
    const collection = this.header.getUserIcons();
    const cart = collection.get('CART')?.children.namedItem('cart-span');
    if (cart !== null && cart !== undefined) {
      cart.textContent = `${this.number}`;
    }
  }

  public updateCartQuantity(data?: ClientResponse<Cart>): void {
    if (data !== undefined) {
      if (data.body.totalLineItemQuantity) {
        this.number = Number(data.body.totalLineItemQuantity);
      } else {
        this.number = 0;
      }
      this.updateCartSpan();
    } else {
      const response = this.clientAPI.getActiveCartData();
      response
        .then((cart) => {
          if (cart.body.totalLineItemQuantity) {
            this.number = Number(cart.body.totalLineItemQuantity);
          } else {
            this.number = 0;
          }
          this.updateCartSpan();
        })
        .catch((error) => console.error(`Error while fetching active cart data: ${error}`));
    }
  }
}
