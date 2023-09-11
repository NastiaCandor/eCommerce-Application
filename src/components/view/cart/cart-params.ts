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

  cartItem: {
    tag: 'div',
    cssClasses: ['cart__item'],
  },

  img: {
    tag: 'img',
    cssClasses: ['cart-item_image'],
  },

  title: {
    tag: 'div',
    cssClasses: ['cart-item_title'],
  },

  info: {
    tag: 'p',
    cssClasses: ['cart-item_info'],
  },

  singer: {
    tag: 'a',
    cssClasses: ['cart-item_singer'],
  },

  priceWrapper: {
    tag: 'div',
    cssClasses: ['cart-item_prices'],
  },

  price: {
    tag: 'div',
    cssClasses: ['cart-item_price'],
  },

  counterWrapper: {
    tag: 'div',
    cssClasses: ['cart-item_counter-wrapper'],
  },

  counterBtnMinus: {
    tag: 'button',
    cssClasses: ['cart-item_counter-btn'],
    textContent: '‐',
  },

  counterInput: {
    tag: 'input',
    type: 'number',
    cssClasses: ['cart-item_counter-input'],
  },

  counterBtnPlus: {
    tag: 'button',
    cssClasses: ['cart-item_counter-btn'],
    textContent: '+',
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
    // textContent: 'TOTAL COST',
  },
};

export default cartParams;
