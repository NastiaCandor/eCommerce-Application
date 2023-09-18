const catalogParams = {
  section: {
    tag: 'section',
    cssClasses: ['catalog'],
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
    cssClasses: ['filter-box__content__items'],
  },
  categoryListItem: {
    tag: 'li',
    cssClasses: ['filter-box__content_item'],
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
    id: 'products-content',
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

  mobileBtn: {
    tag: 'button',
    cssClasses: ['mobile-menu__btn', 'show-btn'],
  },

  mobileBtnImg: {
    tag: 'img',
    cssClasses: ['mobile-menu__btn__img'],
    alt: 'filter-settings',
    src: '../../../../assets/img/filter-svgrepo-com.svg',
  },
  noResults: {
    container: {
      tag: 'div',
      cssClasses: ['no-res__container'],
      id: 'no-results',
    },
    title: {
      tag: 'h4',
      cssClasses: ['no-res__title'],
      textContent: 'Sorry, no results found!',
    },
    message: {
      tag: 'p',
      cssClasses: ['no-res__text'],
    },
  },
  breadCrumbs: {
    wrapper: {
      tag: 'nav',
      cssClasses: ['catalog__bc-nav'],
    },
    linkContainer: {
      tag: 'div',
      cssClasses: ['bc-nav__wrapper'],
    },
    bcLink: {
      tag: 'a',
      cssClasses: ['bc-nav_item'],
    },
    bcLinkActive: {
      tag: 'a',
      cssClasses: ['bc-nav_item', 'active'],
    },
  },
  categoriesPage: {
    cardsContent: {
      tag: 'div',
      cssClasses: ['product__cards', 'category-view'],
      id: 'products-content',
    },
    overlay: {
      tag: 'a',
      cssClasses: ['category-overlay'],
    },
    overlayText: {
      tag: 'span',
      cssClasses: ['category-overlay_text', 'hidden'],
    },
    pageHeading: {
      tag: 'h3',
      cssClasses: ['heading'],
      textContent: 'Categories:',
    },
    categoryWrapper: {
      tag: 'div',
      cssClasses: ['card__content_category'],
    },
    categoryHeading: {
      tag: 'h4',
      cssClasses: ['category_heading', 'heading'],
    },
  },
};

export default catalogParams;
