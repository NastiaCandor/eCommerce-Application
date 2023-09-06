// TYPES

export type ElementParamsType = {
  textContent?: string;
  cssClasses?: string[];
  value?: string;
  link?: string;
  src?: string;
  alt?: string;
  tag: string;
  id?: string;
  mouseEvent?: ((evt?: Event) => void) | null;
};

export type LoginParamsType = {
  section: ElementParamsType;
  innerWrapper: ElementParamsType;
  title: ElementParamsType;
  form: ElementParamsType;
  loginBox: ElementParamsType;
  inputBox: ElementParamsType;
  inputIcon: ElementParamsType;
  emailTitle: ElementParamsType;
  emailInput: ElementParamsType;
  passwordTitle: ElementParamsType;
  passwordInput: ElementParamsType;
  passwordEyeIcon: ElementParamsType;
  loginBtn: ElementParamsType;
  newCustomerText: ElementParamsType;
  newCustomerLink: ElementParamsType;
  inputError: ElementParamsType;
  loginErrorMessage: string;
  loginSuccessMessage: string;
  serverErrorMessage: string;
};

export type NotFoundType = {
  section: ElementParamsType;
  innerWrapper: ElementParamsType;
  title: ElementParamsType;
  subtitle: ElementParamsType;
  errorNumber: ElementParamsType;
  backToMainBtn: ElementParamsType;
};

// PAGE INTERFACES

export type PagesInterface = {
  INDEX: string;
  NOT_FOUND: string;

  LOG_IN: string;
  SIGN_UP: string;
  LOG_OUT: string;
  PROFILE: string;
  CART: string;

  PRODUCT: string;
  PRODUCTS: string;

  MAIN: string;
  CATALOG: string;
  SHIPPING: string;
  CONTACTS: string;

  CATEGORY: string;
  CATEGORIES: string;
};

export interface Route {
  path: string;
  callback: (id?: string, title?: string) => void;
}

export type UserRequest = {
  path: string;
  resource: string;
  category: string;
  id: string;
};

// PREFETCHED API CLIENT DATA

export type PrefetchedData = {
  genres: PrefetchedGenres[];
  attributes: PrefetchedAttributes<string>;
  prices: PrefetchedPrices;
  productsUrl: PrefetchedProductUrl;
};

export type PrefetchedProductUrl = {
  ids: Map<string, string>;
  keys: string[][];
};

export type PrefetchedPrices = {
  max: number;
  min: number;
  avg: number;
  maxFractured: number;
  minFractured: number;
};

export type PrefetchedGenres = {
  [key: string]: string;
  name: string;
  id: string;
  key: string;
};

export interface PrefetchedAttributes<T> {
  [key: string]: T[];
  condition: T[];
  label: T[];
  lp: T[];
}

export type EndPointsObject = {
  filter: string[];
};

export type ImageArr = {
  url?: string;
};

export interface QueryObject extends PrefetchedAttributes<string> {
  price: string[];
}

export type RouteCallbacks = {
  loadLoginPage: () => void;
  loadCartPage: () => void;
  loadContactsPage: () => void;
  loadSignupPage: () => void;
  loadProfilePage: () => void;
  loadMainPage: () => void;
  loadShippingPage: () => void;
  loadNotFoundPage: () => void;
  loadCatalogPage: () => void;
  loadCategoriesPage: () => void;
  logoutUser: () => void;
  loadProductPage: (id: string) => void;
  mountCategory: (id: string) => void;
};
