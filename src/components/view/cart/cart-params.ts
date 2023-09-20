const cartParams = {
  section: {
    tag: 'section',
    cssClasses: ['cart'],
  },

  wrapper: {
    tag: 'div',
    cssClasses: ['cart__wrapper'],
  },

  topWrapper: {
    tag: 'div',
    cssClasses: ['top__wrapper'],
  },

  heading: {
    tag: 'h2',
    cssClasses: ['cart__heading'],
    textContent: 'Your Shopping Cart',
  },

  clearCartBtn: {
    tag: 'button',
    cssClasses: ['clear-cart__btn'],
    textContent: 'Remove All Items',
  },

  clearCartBtnImg: {
    tag: 'img',
    cssClasses: ['clear-cart__btn__img'],
    alt: 'clear-cart-button',
    src: '../assets/img/delete.svg',
  },

  asideMenu: {
    tag: 'aside',
    cssClasses: ['aside__menu'],
  },

  itemsWrapper: {
    tag: 'div',
    cssClasses: ['cart-items__wrapper'],
  },

  itemsInnerWrapper: {
    tag: 'div',
    cssClasses: ['cart-items__inner-wrapper'],
  },

  cartItem: {
    tag: 'div',
    cssClasses: ['cart__item'],
  },

  img: {
    tag: 'img',
    cssClasses: ['cart-item__image'],
  },

  title: {
    tag: 'div',
    cssClasses: ['cart-item__title'],
  },

  info: {
    tag: 'p',
    cssClasses: ['cart-item__info'],
  },

  singer: {
    tag: 'a',
    cssClasses: ['cart-item__singer'],
  },

  priceWrapper: {
    tag: 'div',
    cssClasses: ['cart-item__prices'],
  },

  price: {
    tag: 'div',
    cssClasses: ['cart-item__price'],
  },

  itemTotalPrice: {
    tag: 'div',
    cssClasses: ['cart-item__price', 'cart-item__total-price'],
  },

  counterWrapper: {
    tag: 'div',
    cssClasses: ['cart-item__counter-wrapper'],
  },

  counterBtnMinus: {
    tag: 'button',
    cssClasses: ['cart-item__counter-btn', 'minus-btn'],
    // textContent: '‐',
  },

  counterInput: {
    tag: 'input',
    type: 'number',
    cssClasses: ['cart-item__counter-input'],
  },

  counterBtnPlus: {
    tag: 'button',
    cssClasses: ['cart-item__counter-btn', 'plus-btn'],
    // textContent: '+',
  },

  buttonsWrapper: {
    tag: 'div',
    cssClasses: ['buttons-wrapper'],
  },

  buttonDelete: {
    tag: 'button',
    cssClasses: ['delete-cart-item__btn'],
    type: 'button',
  },

  buttonDeleteImg: {
    tag: 'img',
    cssClasses: ['delete-cart-item-btn__img'],
    alt: 'delete-button',
    src: '../assets/img/delete.svg',
  },

  buttonUpdate: {
    tag: 'button',
    cssClasses: ['update-cart-item__btn', 'no-show'],
    type: 'submit',
  },

  buttonEdit: {
    tag: 'button',
    cssClasses: ['edit-item__btn'],
    type: 'button',
  },

  buttonEditImg: {
    tag: 'img',
    cssClasses: ['edit-item__img'],
    alt: 'edit-button',
    src: '../assets/img/pencil.svg',
  },

  asideHeading: {
    tag: 'h3',
    cssClasses: ['aside__heading'],
    textContent: 'Order Summary',
  },

  promoWrapper: {
    tag: 'form',
    cssClasses: ['promo-code__wrapper'],
  },

  promoText: {
    tag: 'label',
    cssClasses: ['promo-code__text'],
    textContent: 'Do you have a promo code?',
    for: 'promocode',
  },

  promoInput: {
    tag: 'input',
    cssClasses: ['promo-code__input'],
    placeholder: 'ENTER CODE HERE',
    type: 'text',
    id: 'promocode',
  },

  promoBtn: {
    tag: 'button',
    cssClasses: ['promo-code__btn'],
    textContent: 'APPLY',
    type: 'submit',
  },

  costWrapper: {
    tag: 'div',
    cssClasses: ['total-cost__wrapper'],
  },

  subtotalWrapper: {
    tag: 'div',
    cssClasses: ['subtotal__wrapper'],
  },

  subtotalText: {
    tag: 'span',
    cssClasses: ['subtotal__text'],
    textContent: 'Subtotal',
  },

  subtotalNumber: {
    tag: 'span',
    cssClasses: ['subtotal__number'],
  },

  discountWrapper: {
    tag: 'div',
    cssClasses: ['discount__wrapper'],
  },

  discountText: {
    tag: 'span',
    cssClasses: ['discount__text'],
    textContent: 'Promo discount',
  },

  discountNumber: {
    tag: 'span',
    cssClasses: ['discount__number'],
  },

  totalWrapper: {
    tag: 'div',
    cssClasses: ['total__wrapper'],
  },

  totalCostText: {
    tag: 'span',
    cssClasses: ['total-cost__text'],
    textContent: 'TOTAL COST',
  },

  totalCostNumber: {
    tag: 'span',
    cssClasses: ['total-cost__number'],
  },

  emptyCart: {
    tag: 'div',
    cssClasses: ['empty-cart__wrapper', 'no-show'],
  },

  emptyCartImg: {
    tag: 'img',
    cssClasses: ['empty-cart__img'],
    src: '../assets/img/shopping-basket-empty.svg',
    alt: 'shopping-basket-empty',
  },

  emptyCartHeading: {
    tag: 'h4',
    cssClasses: ['empty-cart__heading'],
    textContent: 'Your cart is currently empty',
  },

  // emptyCartText: {
  //   tag: 'div',
  //   cssClasses: ['empty-cart__text'],
  //   textContent: 'Fill Your Cart, Fill Your Soul: Start building your vinyl collection today!',
  // },

  emptyCartBtn: {
    tag: 'a',
    cssClasses: ['empty-cart__btn'],
    href: '/catalog',
    textContent: 'Start shopping',
  },

  checkoutBtn: {
    tag: 'button',
    cssClasses: ['checkout__btn'],
    type: 'button',
    textContent: 'Checkout  ➞',
  },

  promptWindow: {
    tag: 'div',
    cssClasses: ['prompt__window', 'no-show'],
    textContent: 'Would you like to remove all items from your cart?',
  },

  promptBtnWrapper: {
    tag: 'div',
    cssClasses: ['prompt__btn__wrapper'],
  },

  promptConfirmBtn: {
    tag: 'button',
    cssClasses: ['prompt__window__confirm-btn'],
    type: 'button',
    textContent: 'OK',
  },

  promptCancelBtn: {
    tag: 'button',
    cssClasses: ['prompt__window__cancel-btn'],
    type: 'button',
    textContent: 'Cancel',
  },

  popUpBack: {
    tag: 'div',
    cssClasses: ['cart__popup-back', 'no-show'],
  },

  wrongPromocode: "This promocode doesn't exist. Please try again",
  noPromocode: 'Please enter a promocode',
  clearCartMessage: 'Items are successfully removed!',
  noImageAvailablePath: '../assets/img/no-image-available.png',
};

export default cartParams;
