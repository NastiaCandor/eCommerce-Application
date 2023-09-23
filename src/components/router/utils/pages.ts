import { PagesInterface } from '../../../types';

const PAGES: PagesInterface = {
  INDEX: '/',
  NOT_FOUND: '/not_found',

  LOG_IN: '/login',
  SIGN_UP: '/sign_up',
  LOG_OUT: '/log_out',
  PROFILE: '/profile',
  CART: '/cart',

  MAIN: '/main',
  CATALOG: '/catalog',
  ABOUT_US: '/about_us',

  CATEGORY: '/catalog/categories',
  CATEGORIES: 'catalog/categories',
  PRODUCTS: 'catalog/product',
  PRODUCT: '/catalog/product',
  FILTER: 'catalog/filtred',
  SEARCH: 'catalog/search',
};

export default PAGES;
