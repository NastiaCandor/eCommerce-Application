// import { ProductParamsType } from '../../../types';

import { ElementParamsType } from '../../../types';

type ProductParamsType = {
  section: ElementParamsType;
  innerWrapper: ElementParamsType;
  productDisplay: ElementParamsType;
  photoSide: ElementParamsType;
  // Info side with ditails about producr
  infoSide: ElementParamsType;
  productTitle: ElementParamsType;
  productSubtitle: ElementParamsType;
  productInfo: ElementParamsType;
  productInfoItem: ElementParamsType;
  productInfoItemLabel: ElementParamsType;
  productInfoItemText: ElementParamsType;
  productInfoItemLink: ElementParamsType;
  // Aside section with price and Buy btn
  productAside: ElementParamsType;
  priceTitle: ElementParamsType;
  productPriceBox: ElementParamsType;
  productPriceCurrent: ElementParamsType;
  productPricePrevious: ElementParamsType;
  productPricePrevText: ElementParamsType;
  discountText: ElementParamsType;
  discountInfoBox: ElementParamsType;
  discountInfoTitle: ElementParamsType;
  discountInfoText: ElementParamsType;
  availabilityBox: ElementParamsType;
  availabilityLabel: ElementParamsType;
  availabilityText: ElementParamsType;
  addToCartBtn: ElementParamsType;
  // Aditional side
  additionalSide: ElementParamsType;
  additionalTitle: ElementParamsType;
  descriptionProduct: ElementParamsType;
  trackList: ElementParamsType;
  trackListTitle: ElementParamsType;
  trackListItem: ElementParamsType;
  // Modal
  modalConent: ElementParamsType;
  // Error message
  errorSection: ElementParamsType;
  errorTitle: ElementParamsType;
  errorText: ElementParamsType;
};

const productParams: ProductParamsType = {
  section: {
    tag: 'section',
    cssClasses: ['product'],
  },
  innerWrapper: {
    tag: 'div',
    cssClasses: ['product__section'],
  },
  productDisplay: {
    tag: 'div',
    cssClasses: ['product__display'],
  },
  // IMAGE SIDE
  photoSide: {
    tag: 'div',
    cssClasses: ['product__photo-side'],
  },
  // INFO SIDE
  infoSide: {
    tag: 'div',
    cssClasses: ['product__info-side'],
  },
  productTitle: {
    tag: 'h2',
    cssClasses: ['product__title'],
    textContent: 'Product',
  },
  productSubtitle: {
    tag: 'h3',
    cssClasses: ['product__subtitle'],
  },
  productInfo: {
    tag: 'ul',
    cssClasses: ['product__info-list'],
  },
  productInfoItem: {
    tag: 'li',
    cssClasses: ['product__info-item'],
  },
  productInfoItemLabel: {
    tag: 'p',
    cssClasses: ['product__info-label'],
  },
  productInfoItemText: {
    tag: 'p',
    cssClasses: ['product__info-text'],
  },
  productInfoItemLink: {
    tag: 'a',
    cssClasses: ['product__info-link'],
  },
  // ASIDE
  productAside: {
    tag: 'div',
    cssClasses: ['product__aside'],
  },
  priceTitle: {
    tag: 'h3',
    cssClasses: ['product__aside-title'],
    textContent: 'Price',
  },
  productPriceBox: {
    tag: 'div',
    cssClasses: ['product__price-box'],
  },
  productPriceCurrent: {
    tag: 'div',
    cssClasses: ['product__price_current'],
  },
  productPricePrevious: {
    tag: 'div',
    cssClasses: ['product__price_prev'],
  },
  productPricePrevText: {
    tag: 'p',
    cssClasses: ['product__price_prev-text'],
  },
  discountText: {
    tag: 'p',
    cssClasses: ['product__discount-text'],
    textContent: ' - discount',
  },
  discountInfoBox: {
    tag: 'div',
    cssClasses: ['product__discount-info'],
  },
  discountInfoTitle: {
    tag: 'h4',
    cssClasses: ['product__discount-info-title'],
  },
  discountInfoText: {
    tag: 'p',
    cssClasses: ['product__discount-info-text'],
  },
  availabilityBox: {
    tag: 'div',
    cssClasses: ['product__avail'],
  },
  availabilityLabel: {
    tag: 'p',
    cssClasses: ['product__avail-label'],
    textContent: 'available: ',
  },
  availabilityText: {
    tag: 'p',
    cssClasses: ['product__avail-text'],
  },
  addToCartBtn: {
    tag: 'button',
    cssClasses: ['product__add-to-cart-btn', 'button'],
    textContent: 'Add To Cart',
  },
  // ADDITIONAL SIDE
  additionalSide: {
    tag: 'div',
    cssClasses: ['product__additional'],
  },
  additionalTitle: {
    tag: 'h3',
    cssClasses: ['product__additional-title'],
    textContent: 'Additional information',
  },
  descriptionProduct: {
    tag: 'p',
    cssClasses: ['product__desription'],
  },
  trackListTitle: {
    tag: 'h4',
    cssClasses: ['product__track-list-title'],
    textContent: 'Track List',
  },
  trackList: {
    tag: 'ul',
    cssClasses: ['product__track-list'],
  },
  trackListItem: {
    tag: 'li',
    cssClasses: ['product__track-list-item'],
  },
  modalConent: {
    tag: 'div',
    cssClasses: ['modal__conent'],
  },
  errorSection: {
    tag: 'div',
    cssClasses: ['product__error'],
  },
  errorTitle: {
    tag: 'h3',
    cssClasses: ['product__error-title'],
    textContent: 'Not Found',
  },
  errorText: {
    tag: 'p',
    cssClasses: ['product__error-text'],
    textContent: 'The product you are looking for do not available right now',
  },
};

export default productParams;
