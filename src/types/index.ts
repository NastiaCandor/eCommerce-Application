export type ElementParamsType = {
  tag: string;
  cssClasses?: string[];
  textContent?: string;
  mouseEvent?: ((evt?: Event) => void) | null;
  id?: string;
  value?: string;
  link?: string;
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
};

// CONST

export const wrapperParams: ElementParamsType = {
  tag: 'div',
  cssClasses: ['wrapper'],
};
