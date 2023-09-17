/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-escape */
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import cartParams from './cart-params';
import ClientAPI from '../../utils/Client';
import CartAsideView from './cartAsideView';
import '../../../assets/img/no-image-available.png';
import '../../../assets/img/pencil.svg';
import '../../../assets/img/shopping-basket-empty.svg';
import Router from '../../router/Router';

export default class CartView extends View {
  private clientAPI: ClientAPI;

  private CartAsideView: CartAsideView;

  private router: Router;

  constructor(clientApi: ClientAPI, router: Router) {
    super(cartParams.section);
    this.clientAPI = clientApi;
    this.CartAsideView = new CartAsideView();
    this.router = router;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected async configure(): Promise<void> {
    this.renderInnerWrapper();
    this.getCustomerCart();
    this.getDiscountCodes();
    this.getCartDiscounts();
    // this.addItem();
  }
  // TODO: IF THERE IS NO DISCOUNTED PRICE + fixed poition of aside menu

  private async renderInnerWrapper() {
    const cartWrapper = new ElementCreator(cartParams.wrapper);
    this.addInnerElement(cartWrapper);

    const topWrapper = new ElementCreator(cartParams.topWrapper);
    const cartHeading = new ElementCreator(cartParams.heading);
    const clearCartBtn = new ElementCreator(cartParams.clearCartBtn);
    clearCartBtn.addInnerElement(new ElementCreator(cartParams.clearCartBtnImg));

    topWrapper.addInnerElement([cartHeading, clearCartBtn]);
    const cartItemsWrapper = await this.createCartItemsWrapper();
    cartWrapper.addInnerElement([topWrapper, cartItemsWrapper]);
    console.log(cartItemsWrapper.getChildren()[0]);
    console.log(cartItemsWrapper.getChildren()[1]);
    clearCartBtn.getElement().addEventListener('click', async () => {
      clearCartBtn.getElement().classList.add('no-show');
      const customerID = this.getCustomerIDCookie() as string;
      const currentVersion = await this.getCartVersion(customerID);
      const getCartAPI = this.clientAPI.getCustomerCart(customerID);
      this.CartAsideView.getChildren()[2].remove();
      getCartAPI
        .then((data) => {
          const { lineItems } = data.body;
          const itemsArr: string[] = [];
          lineItems.forEach((el) => {
            itemsArr.push(el.id);
            const removeItemAPI = this.clientAPI.removeAllItemsFromCart(data.body.id, currentVersion, itemsArr);
            removeItemAPI.then((emptyCartData) => {
              console.log(emptyCartData.body);
              this.insertTotalCost(emptyCartData);
            });
          });
          cartItemsWrapper.getChildren()[0].classList.remove('no-show');
          cartItemsWrapper.getChildren()[1].replaceChildren();
          // update total cart price
        })
        .catch((error) => {
          console.log(error);
        });
      // const getEmptyCartAPI = this.clientAPI.getCustomerCart(customerID);
      // this.CartAsideView.getChildren()[2].remove();
      // getEmptyCartAPI.then((emptyCartData) => {
      //   console.log(emptyCartData.body);
      //   this.insertTotalCost(emptyCartData);
      // });
    });
    this.addInnerElement(this.CartAsideView);
  }

  private async createCartItemsWrapper() {
    const cartItemsWrapper = new ElementCreator(cartParams.itemsWrapper);

    const emptyCart = this.createEmptyCartScreen();
    const innerWrapper = new ElementCreator(cartParams.itemsInnerWrapper);
    cartItemsWrapper.addInnerElement([emptyCart, innerWrapper]);

    const customerID = this.getCustomerIDCookie() as string;
    const getCartAPI = this.clientAPI.getCustomerCart(customerID);

    getCartAPI.then(async (data) => {
      const { lineItems } = data.body;
      if (lineItems.length === 0) {
        emptyCart.getElement().classList.remove('no-show');
        console.log(this.getChildren()[0].children[0].children[1].classList.add('no-show'));
      }
      lineItems.forEach(async (element) => {
        const currPrice = element.price.discounted
          ? (element.price.discounted.value.centAmount / 100).toString()
          : (element.price.value.centAmount / 100).toString();
        const imgLink = element.variant.images ? element.variant.images[0].url : cartParams.noImageAvailablePath;
        const singer =
          element.variant.attributes && element.variant.attributes[0].name === 'singer'
            ? element.variant.attributes[0].value
            : '';
        // const currentVersion = await this.getCartVersion(customerID);
        innerWrapper.addInnerElement(
          this.assembleCartItem(
            imgLink,
            element.name['en-US'],
            `${singer} - ${element.name['en-US']}`,
            element.quantity,
            element.variant.availability?.availableQuantity as number,
            currPrice,
            // (element.totalPrice.centAmount / 100).toString(),
            element.id,
            data.body.id,
            customerID
            // data.body.version
          )
        );
      });
      this.insertTotalCost(data);
    });
    return cartItemsWrapper;
  }

  private insertTotalCost(data: ClientResponse<Cart>) {
    // let subtotalSum;
    const subtotal: number[] = [];
    data.body.lineItems.forEach((cartItem) => {
      if (cartItem.price.discounted) {
        subtotal.push((cartItem.price.discounted.value.centAmount / 100) * cartItem.quantity);
      }
    });
    const subtotalSum = subtotal.reduce((acc, value) => acc + value, 0).toString();
    const totalSum = data.body.totalPrice.centAmount / 100;

    const promoDiff = (Number(subtotal) - totalSum).toFixed(2);
    const totalCostEl = this.CartAsideView.createTotalCost(subtotalSum.toString(), promoDiff, totalSum.toString());
    this.CartAsideView.addInnerElement(totalCostEl);
  }

  private assembleCartItem(
    src: string,
    alt: string,
    title: string,
    quantity: number,
    maxQuantity: number,
    price: string,
    // totalPrice: string,
    lineItemId: string,
    cartID: string,
    customerID: string
    // cartVersion: number
  ): ElementCreator {
    const cartItem = new ElementCreator(cartParams.cartItem);
    const itemImage = new ElementCreator(cartParams.img);
    itemImage.setImageLink(src, alt);

    const itemName = new ElementCreator(cartParams.title);
    itemName.setTextContent(title);

    const counterWrapper = new ElementCreator(cartParams.counterWrapper);
    const minusBtn = new ElementCreator(cartParams.counterBtnMinus);
    minusBtn.setAttribute('disabled', 'true');

    const counterInput = new ElementCreator(cartParams.counterInput);
    counterInput.setAttribute('type', cartParams.counterInput.type);

    counterInput.setAttribute('min', '1');
    counterInput.setAttribute('disabled', 'true');
    counterInput.setAttribute('max', maxQuantity.toString());
    const inputEl = counterInput.getElement() as HTMLInputElement;
    inputEl.value = quantity.toString();

    const plusBtn = new ElementCreator(cartParams.counterBtnPlus);
    counterWrapper.addInnerElement([minusBtn, counterInput, plusBtn]);
    plusBtn.setAttribute('disabled', 'true');

    const itemPrice = new ElementCreator(cartParams.price);
    itemPrice.setTextContent(`${price}$`);

    // const itemTotalPrice = new ElementCreator(cartParams.itemTotalPrice);
    // itemTotalPrice.setTextContent(`${totalPrice}$`);

    const buttonsWrapper = new ElementCreator(cartParams.buttonsWrapper);

    const editBtn = this.createEditBtn();
    const confirmBtn = this.createConfirmBtn();
    const deleteBtn = this.createDeleteBtn();

    // listeners
    editBtn.getElement().addEventListener('click', () => {
      editBtn.getElement().classList.add('no-show');
      confirmBtn.getElement().classList.remove('no-show');
      if (!(Number(inputEl.value) - 1 < 1)) {
        this.enableEl(minusBtn);
      }
      if (maxQuantity > 1) {
        this.enableEl(counterInput);
      }
      if (!(Number(inputEl.value) + 1 > maxQuantity)) {
        this.enableEl(plusBtn);
      }
    });

    inputEl.addEventListener('input', () => {
      if (!this.isValid(Number(inputEl.value), maxQuantity)) {
        confirmBtn.setAttribute('disabled', 'true');
      } else confirmBtn.getElement().removeAttribute('disabled');
    });

    confirmBtn.getElement().addEventListener('click', async () => {
      editBtn.getElement().classList.remove('no-show');
      confirmBtn.getElement().classList.add('no-show');
      this.disableEl(minusBtn);
      this.disableEl(counterInput);
      this.disableEl(plusBtn);
      const currentVersion = await this.getCartVersion(customerID);
      const updateQuantity = this.clientAPI.updateItemInCart(
        lineItemId,
        cartID,
        currentVersion,
        Math.ceil(Number(inputEl.value))
      );
      updateQuantity
        .then((data) => {
          // update total cart price
          this.CartAsideView.getChildren()[2].remove();
          this.insertTotalCost(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    deleteBtn.getElement().addEventListener('click', async () => {
      const currentVersion = await this.getCartVersion(customerID);
      const deleteItem = this.clientAPI.removeItemFromCart(lineItemId, cartID, currentVersion);
      deleteItem
        .then((data) => {
          const { lineItems } = data.body;
          if (lineItems.length === 0) {
            const cartWrapper = cartItem.getElement().parentNode as ParentNode;
            cartWrapper.children[0].classList.remove('no-show');
          }
          cartItem.getElement().remove();
          // update total cart price
          this.CartAsideView.getChildren()[2].remove();
          this.insertTotalCost(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    minusBtn.getElement().addEventListener('click', () => {
      let inputValue = Number(inputEl.value);
      inputValue -= 1;
      inputEl.value = inputValue.toString();
      if (inputValue === 1) {
        minusBtn.getElement().setAttribute('disabled', 'true');
      }
      plusBtn.getElement().removeAttribute('disabled');
      // itemTotalPrice.getElement().textContent = '';
      // itemTotalPrice.setTextContent(`${(Number(price) * inputValue).toFixed(2)}$`);
    });

    plusBtn.getElement().addEventListener('click', () => {
      let inputValue = Number(inputEl.value);
      inputValue += 1;
      inputEl.value = inputValue.toString();
      if (inputValue === maxQuantity) {
        plusBtn.getElement().setAttribute('disabled', 'true');
      }
      minusBtn.getElement().removeAttribute('disabled');
      // itemTotalPrice.getElement().textContent = '';
      // itemTotalPrice.setTextContent(`${(Number(price) * inputValue).toFixed(2)}$`);
    });
    buttonsWrapper.addInnerElement([editBtn, confirmBtn, deleteBtn]);
    cartItem.addInnerElement([itemImage, itemName, counterWrapper, itemPrice, buttonsWrapper]);
    return cartItem;
  }

  private createEditBtn(): ElementCreator {
    const editBtn = new ElementCreator(cartParams.buttonEdit);
    editBtn.setAttribute('type', cartParams.buttonEdit.type);
    const btnImage = new ElementCreator(cartParams.buttonEditImg);
    btnImage.setAttribute('src', cartParams.buttonEditImg.src);
    btnImage.setAttribute('alt', cartParams.buttonEditImg.alt);
    editBtn.addInnerElement(btnImage);
    return editBtn;
  }

  private createDeleteBtn(): ElementCreator {
    const deleteBtn = new ElementCreator(cartParams.buttonDelete);
    deleteBtn.setAttribute('type', cartParams.buttonDelete.type);
    const btnImage = new ElementCreator(cartParams.buttonDeleteImg);
    btnImage.setAttribute('src', cartParams.buttonDeleteImg.src);
    btnImage.setAttribute('alt', cartParams.buttonDeleteImg.alt);
    deleteBtn.addInnerElement(btnImage);
    return deleteBtn;
  }

  private createConfirmBtn(): ElementCreator {
    const confirmBtn = new ElementCreator(cartParams.buttonUpdate);
    confirmBtn.setAttribute('type', cartParams.buttonUpdate.type);
    confirmBtn.setTextContent('UPDATE ✔');
    return confirmBtn;
  }

  private createEmptyCartScreen(): ElementCreator {
    const emptyCartWrapper = new ElementCreator(cartParams.emptyCart);
    const emptyCartImg = new ElementCreator(cartParams.emptyCartImg);
    emptyCartImg.setImageLink(cartParams.emptyCartImg.src, cartParams.emptyCartImg.alt);
    const emptyCartHeading = new ElementCreator(cartParams.emptyCartHeading);
    // const emptyCartText = new ElementCreator(cartParams.emptyCartText);
    const emptyCartBtn = new ElementCreator(cartParams.emptyCartBtn);
    emptyCartBtn.setAttribute('href', cartParams.emptyCartBtn.href);
    emptyCartBtn.getElement().addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLAnchorElement) {
        this.router.navigate(e.target.href);
      }
    });

    emptyCartWrapper.addInnerElement([emptyCartImg, emptyCartHeading, emptyCartBtn]);
    return emptyCartWrapper;
  }

  private clearEl(el: ElementCreator, newEl: ElementCreator) {
    el.getElement().replaceChildren(newEl.getElement());
  }

  private async getCartVersion(id: string) {
    const cart = (await this.clientAPI.getCustomerCart(id)).body;
    const { version } = cart;
    return version;
  }

  private getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private getCustomerIDCookie() {
    return this.getCookie('customer_id');
  }

  private async getCustomerCart() {
    const customerID = this.getCustomerIDCookie() as string;
    const getCustomerAPI = this.clientAPI.getCustomerCart(customerID);
    getCustomerAPI.then(async (data) => {
      console.log(data.body.lineItems);
    });
  }

  private async addItem() {
    const cartID = '4e49ab8d-5842-4ead-bd4f-9030adb8fa31';
    const getCustomerAPI = this.clientAPI.addItemToCart(cartID);
    getCustomerAPI.then(async (data) => {
      console.log(data.body);
    });
  }

  private async getDiscountCodes() {
    const codesAPI = this.clientAPI.getDiscountCodes();
    codesAPI.then(async (data) => {
      console.log(data.body);
    });
  }

  private async getCartDiscounts() {
    const codesAPI = this.clientAPI.getCartDiscounts();
    codesAPI.then(async (data) => {
      console.log(data.body);
    });
  }

  private isValid(num: number, max: number) {
    const isValid = !Number.isNaN(num) && num >= 1 && num <= max;
    return isValid;
  }

  private enableEl(el: ElementCreator) {
    if (el.getElement().getAttribute('disabled')) {
      el.getElement().removeAttribute('disabled');
    }
  }

  private disableEl(el: ElementCreator) {
    if (!el.getElement().getAttribute('disabled')) {
      el.getElement().setAttribute('disabled', 'true');
    }
  }
}
