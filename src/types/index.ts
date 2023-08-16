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
  loginError: ElementParamsType;
};

export type NotFoundType = {
  section: ElementParamsType;
  innerWrapper: ElementParamsType;
  title: ElementParamsType;
  subtitle: ElementParamsType;
  errorNumber: ElementParamsType;
  backToMainBtn: ElementParamsType;
};

// CONST

export const wrapperParams: ElementParamsType = {
  tag: 'div',
  cssClasses: ['wrapper'],
};

export const EMAIL_VALIDATION_TEXT = 'Please Enter Valid Email Address';

export const PASSWORD_VALIDATION_TEXT = 'Please Enter Valid Password:';
