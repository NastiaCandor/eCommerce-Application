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
  CONTACT_US: string;
};

export type Route = {
  path: string;
  callback: () => void;
};

export type UserRequest = {
  path: string;
  resource: string;
};
