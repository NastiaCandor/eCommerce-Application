const EmailInputParams = {
  input: {
    type: 'email',
    minLength: '8',
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
