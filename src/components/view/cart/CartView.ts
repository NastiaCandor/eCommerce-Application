/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-escape */
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
// import Noty from 'noty';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import cartParams from './cart-params';
import ClientAPI from '../../utils/Client';
import CartAsideView from './cartAsideView';
import '../../../assets/img/no-image-available.png';
import '../../../assets/img/pencil.svg';
import '../../../assets/img/shopping-basket-empty.svg';
import Router from '../../router/Router';
import CartQiantity from '../../utils/CartQuantity';
import PAGES from '../../router/utils/pages';

export default class CartView extends View {
  private clientAPI: ClientAPI;

  private CartAsideView: CartAsideView;

  private router: Router;

  private cartQuantity: CartQiantity;

  constructor(clientApi: ClientAPI, router: Router, cartQuan: CartQiantity) {
    super(cartParams.section);
    this.clientAPI = clientApi;
    this.CartAsideView = new CartAsideView();
    this.cartQuantity = cartQuan;
    this.router = router;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected async configure(): Promise<void> {
    this.renderInnerWrapper();
  }

  private async renderInnerWrapper() {
    const cartWrapper = new ElementCreator(cartParams.wrapper);
    this.addInnerElement(cartWrapper);

    const topWrapper = new ElementCreator(cartParams.topWrapper);
    const cartHeading = new ElementCreator(cartParams.heading);
    const clearCartBtn = new ElementCreator(cartParams.clearCartBtn);
    clearCartBtn.addInnerElement(new ElementCreator(cartParams.clearCartBtnImg));

    topWrapper.addInnerElement([cartHeading, clearCartBtn]);
    const cartItemsWrapper = await this.createCartItemsWrapper();
    const popUpBack = this.createPopUpBack();
    const promptWindow = this.createPrompt(clearCartBtn, cartItemsWrapper, popUpBack);
    cartWrapper.addInnerElement([topWrapper, cartItemsWrapper, promptWindow, popUpBack]);
    clearCartBtn.getElement().addEventListener('click', async () => {
      promptWindow.getElement().classList.remove('no-show');
      popUpBack.getElement().classList.remove('no-show');
    });

    this.addInnerElement(this.CartAsideView);
  }

  private async createCartItemsWrapper() {
    const cartItemsWrapper = new ElementCreator(cartParams.itemsWrapper);

    const emptyCart = this.createEmptyCartScreen();
    const innerWrapper = new ElementCreator(cartParams.itemsInnerWrapper);
    cartItemsWrapper.addInnerElement([emptyCart, innerWrapper]);

    const getCartAPI = this.clientAPI.getActiveCartData();

    getCartAPI.then(async (data) => {
      const { lineItems } = data.body;
      if (lineItems.length === 0) {
        emptyCart.getElement().classList.remove('no-show');
        this.getChildren()[0].children[0].children[1].classList.add('no-show');
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
        innerWrapper.addInnerElement(
          this.assembleCartItem(
            imgLink,
            element.name['en-US'],
            `${singer} - ${element.name['en-US']}`,
            element.quantity,
            element.variant.availability?.availableQuantity as number,
            currPrice,
            element.id
          )
        );
      });
      this.insertTotalCost(data);
    });
    return cartItemsWrapper;
  }

  private insertTotalCost(data: ClientResponse<Cart>) {
    const subtotal: number[] = [];
    data.body.lineItems.forEach((cartItem) => {
      if (cartItem.price.discounted) {
        subtotal.push((cartItem.price.discounted.value.centAmount / 100) * cartItem.quantity);
      } else if (!cartItem.price.discounted) {
        subtotal.push((cartItem.price.value.centAmount / 100) * cartItem.quantity);
      }
    });

    const subtotalSum = subtotal.reduce((acc, value) => acc + value, 0);
    const totalSum = data.body.totalPrice.centAmount / 100;
    const promoDiff = (subtotalSum - totalSum).toFixed(2);

    const totalCostEl = this.CartAsideView.createTotalCost(subtotalSum.toFixed(2), promoDiff, totalSum.toFixed(2));
    this.CartAsideView.addInnerElement(totalCostEl);
  }

  private assembleCartItem(
    src: string,
    alt: string,
    title: string,
    quantity: number,
    maxQuantity: number,
    price: string,
    lineItemId: string
  ): ElementCreator {
    const cartItem = new ElementCreator(cartParams.cartItem);
    const itemImage = new ElementCreator(cartParams.img);
    itemImage.setImageLink(src, alt);

    const itemName = new ElementCreator(cartParams.title);
    itemName.setTextContent(title);

    const counterWrapper = new ElementCreator(cartParams.counterWrapper);
    const minusBtn = new ElementCreator(cartParams.counterBtnMinus);
    if (quantity === 1) {
      minusBtn.setAttribute('disabled', 'true');
    }

    const counterInput = new ElementCreator(cartParams.counterInput);
    counterInput.setAttribute('type', cartParams.counterInput.type);

    counterInput.setAttribute('min', '1');
    counterInput.setAttribute('readonly', 'true');
    counterInput.setAttribute('max', maxQuantity.toString());
    const inputEl = counterInput.getElement() as HTMLInputElement;
    inputEl.value = quantity.toString();

    const plusBtn = new ElementCreator(cartParams.counterBtnPlus);
    counterWrapper.addInnerElement([minusBtn, counterInput, plusBtn]);
    if (quantity === maxQuantity) {
      plusBtn.setAttribute('disabled', 'true');
    }

    const itemPrice = new ElementCreator(cartParams.price);
    itemPrice.setTextContent(`${price}$`);

    const buttonsWrapper = new ElementCreator(cartParams.buttonsWrapper);
    const deleteBtn = this.createDeleteBtn();

    deleteBtn.getElement().addEventListener('click', async () => {
      const deleteItem = this.clientAPI.removeItemFromCart(lineItemId);
      deleteItem
        .then((data) => {
          this.cartQuantity.updateCartQuantity(data);
          const { lineItems } = data.body;
          if (lineItems.length === 0) {
            this.getChildren()[0].children[0].children[1].classList.add('no-show');
            const cartWrapper = cartItem.getElement().parentNode?.parentNode as ParentNode;
            cartWrapper.children[0].classList.remove('no-show');
          }
          cartItem.getElement().remove();
          // update total cart price
          this.CartAsideView.getChildren()[1].remove();
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
      const updateQuantity = this.clientAPI.updateItemInCart(lineItemId, Math.ceil(Number(inputEl.value)));
      updateQuantity
        .then((data) => {
          this.cartQuantity.updateCartQuantity(data);
          // update total cart price
          this.CartAsideView.getChildren()[1].remove();
          this.insertTotalCost(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    plusBtn.getElement().addEventListener('click', () => {
      let inputValue = Number(inputEl.value);
      inputValue += 1;
      inputEl.value = inputValue.toString();
      if (inputValue === maxQuantity) {
        plusBtn.getElement().setAttribute('disabled', 'true');
      }
      minusBtn.getElement().removeAttribute('disabled');
      const updateQuantity = this.clientAPI.updateItemInCart(lineItemId, Math.ceil(Number(inputEl.value)));
      updateQuantity
        .then((data) => {
          this.cartQuantity.updateCartQuantity(data);
          // update total cart price
          this.CartAsideView.getChildren()[1].remove();
          this.insertTotalCost(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    buttonsWrapper.addInnerElement([deleteBtn]);
    cartItem.addInnerElement([itemImage, itemName, counterWrapper, itemPrice, buttonsWrapper]);
    return cartItem;
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

  private createPrompt(
    clearCartEl: ElementCreator,
    cartItemsWrapper: ElementCreator,
    popUpBack: ElementCreator
  ): ElementCreator {
    const promptWindow = new ElementCreator(cartParams.promptWindow);
    const btnWrapper = new ElementCreator(cartParams.promptBtnWrapper);
    const confirmBtn = new ElementCreator(cartParams.promptConfirmBtn);
    confirmBtn.setAttribute('type', cartParams.promptConfirmBtn.type);
    const cancelBtn = new ElementCreator(cartParams.promptCancelBtn);
    cancelBtn.setAttribute('type', cartParams.promptConfirmBtn.type);
    cancelBtn.getElement().addEventListener('click', () => {
      promptWindow.getElement().classList.add('no-show');
      popUpBack.getElement().classList.add('no-show');
    });
    btnWrapper.addInnerElement([confirmBtn, cancelBtn]);
    confirmBtn.getElement().addEventListener('click', async () => {
      clearCartEl.getElement().classList.add('no-show');
      promptWindow.getElement().classList.add('no-show');
      popUpBack.getElement().classList.add('no-show');
      try {
        const getCartAPI = await this.clientAPI.getActiveCartData();
        this.CartAsideView.getChildren()[1].remove();
        if (getCartAPI.statusCode === 200) {
          this.cartQuantity.updateCartQuantity(getCartAPI);
          const { lineItems } = getCartAPI.body;
          const promises = lineItems.map((el) => el.id);
          const itemsArr = await Promise.all(promises);
          const emptyCartData = await this.clientAPI.removeAllItemsFromCart(itemsArr);
          this.insertTotalCost(emptyCartData);
          this.cartQuantity.updateCartQuantity();
          cartItemsWrapper.getChildren()[0].classList.remove('no-show');
          cartItemsWrapper.getChildren()[1].replaceChildren();
        }
      } catch (e) {
        console.log(e);
      }
    });
    promptWindow.addInnerElement([btnWrapper]);
    return promptWindow;
  }

  private createPopUpBack() {
    const popUpBack = new ElementCreator(cartParams.popUpBack);
    return popUpBack;
  }

  private createEmptyCartScreen(): ElementCreator {
    const emptyCartWrapper = new ElementCreator(cartParams.emptyCart);
    const emptyCartImg = new ElementCreator(cartParams.emptyCartImg);
    emptyCartImg.setImageLink(cartParams.emptyCartImg.src, cartParams.emptyCartImg.alt);
    const emptyCartHeading = new ElementCreator(cartParams.emptyCartHeading);
    const emptyCartBtn = new ElementCreator(cartParams.emptyCartBtn);
    emptyCartBtn.setAttribute('href', cartParams.emptyCartBtn.href);
    emptyCartBtn.getElement().addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLAnchorElement) {
        this.router.requestCatalogReset(true);
        this.router.navigate(PAGES.CATALOG);
      }
    });

    emptyCartWrapper.addInnerElement([emptyCartImg, emptyCartHeading, emptyCartBtn]);
    return emptyCartWrapper;
  }
}
