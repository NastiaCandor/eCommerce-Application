import { PagesInterface } from '../../types';

const PAGES: PagesInterface = {
  INDEX: 'index',
  NOT_FOUND: 'not-found',
  ACCOUNT: {
    LOG_IN: 'login',
    SIGN_UP: 'registration',
    USER_PROFILE: 'profile',
    CART: 'cart',
  },

  CONTENT: {
    CATALOG: 'catalog',
    ABOUT_US: 'about',
    SHIPPING: 'shipping',
    CONTACT_US: 'contacts',
  },
};

export default PAGES;
