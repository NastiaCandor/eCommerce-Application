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
    const cartWrapper = new ElementCreator(cartParams.wrapper);
    this.addInnerElement(cartWrapper);

    const topWrapper = new ElementCreator(cartParams.topWrapper);
    const cartHeading = new ElementCreator(cartParams.heading);
    const clearCartBtn = new ElementCreator(cartParams.clearCartBtn);
    clearCartBtn.addInnerElement(new ElementCreator(cartParams.clearCartBtnImg));
    topWrapper.addInnerElement([cartHeading, clearCartBtn]);

    cartWrapper.addInnerElement([topWrapper, this.createCartItemsWrapper()]);
    const cartAsideMenu = this.assembleAside();
    this.addInnerElement(cartAsideMenu);
  }

  private createCartItemsWrapper(): ElementCreator {
    const cartItemsWrapper = new ElementCreator(cartParams.itemsWrapper);
    cartItemsWrapper.addInnerElement(this.assembleCartItem('src', 'alt', 'Sample Title', '20', '80'));
    return cartItemsWrapper;
  }

  private assembleCartItem(src: string, alt: string, title: string, price: string, totalPrice: string): ElementCreator {
    const cartItem = new ElementCreator(cartParams.cartItem);
    // itemImage.setImageLink(data[0].url, name['en-US']);
    const itemImage = new ElementCreator(cartParams.img);
    itemImage.setImageLink(src, alt);

    const itemName = new ElementCreator(cartParams.title);
    itemName.setTextContent(title);

    const counterWrapper = new ElementCreator(cartParams.counterWrapper);
    const minusBtn = new ElementCreator(cartParams.counterBtnMinus);
    const counterInput = new ElementCreator(cartParams.counterInput);
    counterInput.setAttribute('type', cartParams.counterInput.type);
    const plusBtn = new ElementCreator(cartParams.counterBtnPlus);
    counterWrapper.addInnerElement([minusBtn, counterInput, plusBtn]);

    const itemPrice = new ElementCreator(cartParams.price);
    itemPrice.setTextContent(`${price}$`);

    const itemTotalPrice = new ElementCreator(cartParams.price);
    itemTotalPrice.setTextContent(`${totalPrice}$`);

    const deleteBtn = this.createDeleteBtn();

    cartItem.addInnerElement([itemImage, itemName, counterWrapper, itemPrice, itemTotalPrice, deleteBtn]);
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

  // private createCartItem() {
  //   const itemImage = new ElementCreator(cartParams.itemsWrapper);
  // }
}
