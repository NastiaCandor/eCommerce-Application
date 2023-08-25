// import { ProductParamsType } from '../../../types';

import { ElementParamsType } from '../../../types';

type ProductParamsType = {
  section: ElementParamsType;
  innerWrapper: ElementParamsType;
  productDisplay: ElementParamsType;
  photoSide: ElementParamsType;
  infoSide: ElementParamsType;
  productTitle: ElementParamsType;
  productSubtitle: ElementParamsType;
  productInfo: ElementParamsType;
  productInfoItem: ElementParamsType;
  productInfoItemLabel: ElementParamsType;
  productInfoItemText: ElementParamsType;
  productInfoItemLink: ElementParamsType;
  productPrice: ElementParamsType;
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
  productPrice: {
    tag: 'p',
    cssClasses: ['product__price'],
  },
};

export default productParams;
