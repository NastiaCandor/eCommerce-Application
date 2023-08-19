const EmailInputParams = {
  input: {
    type: 'email',
    minLength: '8',
    cssClassesInvalid: 'reg-form__input-invalid',
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
  errorText: 'User with this email address already exists. Please enter another email address',
};
export default EmailInputParams;
