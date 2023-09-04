const catalogParams = {
  section: {
    tag: 'section',
  },
  aside: {
    tag: 'aside',
    cssClasses: ['catalog__aside'],
  },
  asideHeading: {
    tag: 'h3',
    cssClasses: ['heading'],
    textContent: 'Categories',
  },
  categoriesList: {
    tag: 'ul',
  },
  categoryListItem: {
    tag: 'li',
  },
  wrapper: {
    tag: 'div',
    cssClasses: ['catalog__wrapper'],
  },
  catalogContent: {
    tag: 'div',
    cssClasses: ['catalog__content'],
  },
  productCards: {
    tag: 'div',
    cssClasses: ['product__cards'],
  },
  categories: {
    wrapper: {
      tag: 'div',
      cssClasses: ['product__categories'],
    },
    categoryBox: {
      tag: 'div',
      cssClasses: ['filter-box'],
    },
    categoryLink: {
      tag: 'a',
      cssClasses: ['product__category_item'],
    },
  },
  card: {
    wrapper: {
      tag: 'div',
      cssClasses: ['card__content'],
    },
    img: {
      tag: 'img',
      cssClasses: ['card__content_image'],
    },
    title: {
      tag: 'a',
      cssClasses: ['card__content_title'],
    },
    info: {
      tag: 'p',
      cssClasses: ['card__content_info'],
    },
    singer: {
      tag: 'a',
      cssClasses: ['card__content_singer'],
    },
    priceWrapper: {
      tag: 'div',
      cssClasses: ['card__content_prices'],
    },
    price: {
      tag: 'p',
      cssClasses: ['card__content_price'],
    },
    condition: {
      tag: 'p',
      cssClasses: ['card__content_condition'],
    },
    addToCartBtn: {
      tag: 'button',
      cssClasses: ['product__add-to-cart-btn', 'button'],
    },
  },
  pagination: {
    container: {
      tag: 'div',
      cssClasses: ['pagination'],
    },
    pagiPrev: {
      tag: 'a',
      cssClasses: ['pagi-btn', 'pagi-prev'],
      textContent: '<',
    },
    pagiCurrPage: {
      tag: 'a',
      cssClasses: ['pagi-btn', 'pagi-counter'],
      textContent: '1',
    },
    pagiNext: {
      tag: 'a',
      cssClasses: ['pagi-btn', 'pagi-next'],
      textContent: '>',
    },
  },
  noResults: {
    container: {
      tag: 'div',
      cssClasses: ['no-res__container'],
    },
    title: {
      tag: 'h4',
      cssClasses: ['no-res__title'],
      textContent: 'Sorry, no result found',
    },
    message: {
      tag: 'p',
      cssClasses: ['no-res__text'],
    },
  },
};

export default catalogParams;
