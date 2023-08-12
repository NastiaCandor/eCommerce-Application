const passwordInputParams = {
  input: {
    type: 'password',
    minLength: '8',
    cssClassesInvalid: 'reg-form__input-invalid',
  },

  label: {
    for: 'password',
    textContent: 'Password',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default passwordInputParams;
