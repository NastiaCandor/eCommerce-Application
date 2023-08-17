const EmailInputParams = {
  input: {
    type: 'email',
    minLength: '8',
    cssClassesInvalid: 'reg-form__input-invalid',
    // eslint-disable-next-line no-useless-escape, prettier/prettier
    // pattern: '^[^ ]+@[^ ]+\.[a-z]{2,3}$',
  },

  label: {
    for: 'email',
    textContent: 'Email',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default EmailInputParams;
