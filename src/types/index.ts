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

export type PagesInterface = {
  ACCOUNT: PagesAccountInterface;
  CONTENT: PagesContentInterface;
};

export interface PagesAccountInterface {
  INDEX: string;
  LOG_IN: string;
  SIGN_UP: string;
  USER_PROFILE: string;
  CART: string;
}

export interface PagesContentInterface {
  CATALOG: string;
  ABOUT_US: string;
  SHIPPING: string;
  CONTACT_US: string;
}
