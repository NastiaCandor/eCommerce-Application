/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-escape */
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import cartParams from './cart-params';
import ClientAPI from '../../utils/Client';
import '../../../assets/img/no-image-available.png';
import '../../../assets/img/pencil.svg';

export default class CartView extends View {
  private clientAPI: ClientAPI;

  constructor() {
    super(cartParams.section);
    this.clientAPI = new ClientAPI();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected async configure(): Promise<void> {
    this.renderInnerWrapper();
    this.getCustomerCart();
    // this.addItem();
  }

  private async renderInnerWrapper() {
    const cartWrapper = new ElementCreator(cartParams.wrapper);
    this.addInnerElement(cartWrapper);

    const topWrapper = new ElementCreator(cartParams.topWrapper);
    const cartHeading = new ElementCreator(cartParams.heading);
    const clearCartBtn = new ElementCreator(cartParams.clearCartBtn);
    clearCartBtn.addInnerElement(new ElementCreator(cartParams.clearCartBtnImg));
    topWrapper.addInnerElement([cartHeading, clearCartBtn]);

    cartWrapper.addInnerElement([topWrapper, await this.createCartItemsWrapper()]);
    const cartAsideMenu = this.assembleAside();
    this.addInnerElement(cartAsideMenu);
  }

  private async createCartItemsWrapper() {
    const cartItemsWrapper = new ElementCreator(cartParams.itemsWrapper);

    const customerID = (await this.getCustomerIDCookie()) as string;
    const getCustomerAPI = this.clientAPI.getCustomerCart(customerID);

    getCustomerAPI.then(async (data) => {
      const { lineItems } = data.body;
      console.log(data.body);
      lineItems.forEach((element) => {
        const currPrice = element.price.discounted
          ? (element.price.discounted.value.centAmount / 100).toString()
          : (element.price.value.centAmount / 100).toString();
        const imgLink = element.variant.images ? element.variant.images[0].url : '../assets/img/no-image-available.png';
        const singer =
          element.variant.attributes && element.variant.attributes[0].name === 'singer'
            ? element.variant.attributes[0].value
            : '';

        cartItemsWrapper.addInnerElement(
          this.assembleCartItem(
            imgLink,
            element.name['en-US'],
            `${singer} - ${element.name['en-US']}`,
            element.quantity,
            element.variant.availability?.availableQuantity as number,
            currPrice,
            (element.totalPrice.centAmount / 100).toString(),
            element.id,
            data.body.id,
            data.body.version
          )
        );
      });
    });
    return cartItemsWrapper;
  }

  private assembleCartItem(
    src: string,
    alt: string,
    title: string,
    quantity: number,
    maxQuantity: number,
    price: string,
    totalPrice: string,
    lineItemId: string,
    cartID: string,
    cartVersion: number
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

    const itemTotalPrice = new ElementCreator(cartParams.itemTotalPrice);
    itemTotalPrice.setTextContent(`${totalPrice}$`);

    const buttonsWrapper = new ElementCreator(cartParams.buttonsWrapper);

    const editBtn = this.createEditBtn();
    const confirmBtn = this.createConfirmBtn();
    const deleteBtn = this.createDeleteBtn();

    // listeners
    editBtn.getElement().addEventListener('click', () => {
      editBtn.getElement().classList.add('no-show');
      confirmBtn.getElement().classList.remove('no-show');
      console.log(maxQuantity);

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

    confirmBtn.getElement().addEventListener('click', () => {
      editBtn.getElement().classList.remove('no-show');
      confirmBtn.getElement().classList.add('no-show');
      this.disableEl(minusBtn);
      this.disableEl(counterInput);
      this.disableEl(plusBtn);
      const updateQuantity = this.clientAPI.updateItemInCart(
        lineItemId,
        cartID,
        cartVersion,
        Math.ceil(Number(inputEl.value))
      );
      updateQuantity
        .then((data) => {
          console.log(data.body);
          // update total cart price
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
      itemTotalPrice.getElement().textContent = '';
      itemTotalPrice.setTextContent(`${(Number(price) * inputValue).toFixed(2)}$`);
    });

    plusBtn.getElement().addEventListener('click', () => {
      let inputValue = Number(inputEl.value);
      inputValue += 1;
      inputEl.value = inputValue.toString();
      if (inputValue === maxQuantity) {
        plusBtn.getElement().setAttribute('disabled', 'true');
      }
      minusBtn.getElement().removeAttribute('disabled');
      itemTotalPrice.getElement().textContent = '';
      itemTotalPrice.setTextContent(`${(Number(price) * inputValue).toFixed(2)}$`);
    });
    buttonsWrapper.addInnerElement([editBtn, confirmBtn, deleteBtn]);
    cartItem.addInnerElement([itemImage, itemName, counterWrapper, itemPrice, itemTotalPrice, buttonsWrapper]);
    return cartItem;
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
    // const btnImage = new ElementCreator(cartParams.buttonDeleteImg);
    // btnImage.setAttribute('src', cartParams.buttonDeleteImg.src);
    // btnImage.setAttribute('alt', cartParams.buttonDeleteImg.alt);
    // confirmBtn.addInnerElement(btnImage);
    return confirmBtn;
  }

  private assembleAside(): ElementCreator {
    const cartAsideMenu = new ElementCreator(cartParams.asideMenu);
    const asideHeading = new ElementCreator(cartParams.asideHeading);
    const totalCost = this.createtotalCost('50', '0', '50');
    cartAsideMenu.addInnerElement([asideHeading, this.createPromoCode(), totalCost]);
    return cartAsideMenu;
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

  private createtotalCost(subtotal: string, discount: string, cost: string): ElementCreator {
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
    const customerID = (await this.getCustomerIDCookie()) as string;
    const getCustomerAPI = this.clientAPI.getCustomerCart(customerID);
    getCustomerAPI.then(async (data) => {
      console.log(data.body.lineItems);
    });

    // const customer = await (await getCustomerAPI()).body;
    // console.log((await getCustomerAPI()).body);
    // return (await getCustomerAPI()).body;
  }

  private async addItem() {
    const cartID = '4e49ab8d-5842-4ead-bd4f-9030adb8fa31';
    const getCustomerAPI = this.clientAPI.addItemToCart(cartID);
    getCustomerAPI.then(async (data) => {
      console.log(data.body);
    });
  }

  // private createCartItem() {
  //   const itemImage = new ElementCreator(cartParams.itemsWrapper);
  // }
}
