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

  MAIN: string;
  CATALOG: string;
  SHIPPING: string;
  CONTACTS: string;

  CATEGORY: string;
};

export type Route = {
  path: string;
  callback: (key?: string) => void;
};

export type Path = {
  key: string | undefined;
  path: string | undefined;
};

export type UserRequest = {
  path: string;
  resource: string;
  category: string;
  id: string;
};

// ROUTES TYPES

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
  logoutUser: () => void;

  mountCategory: (key: string) => void;
};
