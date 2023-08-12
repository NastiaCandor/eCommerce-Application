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

  labelNames: ['Email', 'First name', 'Last name', 'Date of birth', 'Street', 'City', 'Country', 'Postcode'],
  inputTypes: ['email', 'Text', 'Text', 'Date', 'Text', 'Text', 'Text', 'Text'],
  // inputPatterns: ['', '[A-Za-z]', '[A-Za-z]', '', 'Text', 'Text', 'Text', 'Text'],
};
export default EmailInputParams;
