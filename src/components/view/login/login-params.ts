import { LoginParamsType } from '../../../types';

const loginParams: LoginParamsType = {
  section: {
    tag: 'section',
    cssClasses: ['login'],
  },
  innerWrapper: {
    tag: 'div',
    cssClasses: ['login__section'],
  },
  title: {
    tag: 'h2',
    cssClasses: ['login__title'],
    textContent: 'Sign In',
  },
  form: {
    tag: 'form',
    cssClasses: ['login__form'],
  },
  loginBox: {
    tag: 'div',
    cssClasses: ['login__box'],
  },
  inputBox: {
    tag: 'div',
    cssClasses: ['login__input-box'],
  },
  inputIcon: {
    tag: 'i',
    cssClasses: ['login__icon'],
  },
  emailInput: {
    tag: 'input',
    cssClasses: ['login__input', 'login__email-input'],
  },
  emailTitle: {
    tag: 'label',
    cssClasses: ['login__email-label', 'login__form-label'],
    textContent: 'Email Address',
  },
  passwordInput: {
    tag: 'input',
    cssClasses: ['login__input', 'login__password-input'],
  },
  passwordTitle: {
    tag: 'label',
    cssClasses: ['login__password-label', 'login__form-label'],
    textContent: 'password',
  },
  passwordEyeIcon: {
    tag: 'i',
    cssClasses: ['login__password-eye', 'login__password-eye_closed'],
  },
  loginBtn: {
    tag: 'button',
    cssClasses: ['login__form-btn', 'button'],
    textContent: 'Sign In',
  },
  newCustomerText: {
    tag: 'p',
    cssClasses: ['login__new-customer-text'],
    textContent: 'Don`t have an account? ',
  },
  newCustomerLink: {
    tag: 'a',
    cssClasses: ['login__new-customer-link'],
    textContent: 'Creat one!',
    link: '#',
  },
};

export default loginParams;
